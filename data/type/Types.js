import { GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLFloat, GraphQLScalarType, GraphQLError, Kind } from 'graphql';
import { connectionArgs, connectionFromPromisedArray, globalIdField, nodeDefinitions, fromGlobalId, connectionDefinitions} from 'graphql-relay';
import { DB, CorrectionStatus }from '../database';
import { Viewer, getViewer } from '../store/UserStore';
import moment from 'moment';


export const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {

        let {type, id} = fromGlobalId(globalId);

        //console.log("globalId of " + type + " : " + globalId)
        //console.log("id of " + type + " : " + id)

        if (type === 'CorrectionStatus') { return DB.models.correction.findOne({where: {id: id}}); }

        if (type === 'Viewer') { return getViewer(id)}
        else { return null; }
    },
    (obj) => {

        //console.log("in interface obj: " + JSON.stringify(obj))

        
        if (obj instanceof CorrectionStatus.Instance) { return adltType; }
        else if (obj.id.startsWith('me')) { return viewerType; }
        else {
            return null;
        }
    }
);

export const correctionStatusType = new GraphQLObjectType({
    name: 'CorrectionStatus',
    fields: () => {
        return {
            id: globalIdField('CorrectionStatus'),
            status : { type: GraphQLString, resolve(correction) { return correction.status } },
            identication_number : { type: GraphQLString, resolve(correction) { return correction.identication_number } }
        }
    },
    interfaces: () => [nodeInterface]
});


export const GraphQLMoment = new GraphQLScalarType({
    name: 'Date',
    serialize: function (value) {
        let date = moment(value);
        if(!date.isValid()) {
            throw new GraphQLError('Field serialize error: value is an invalid Date');
        }
        return date.format();
    },
    parseValue: function (value) {
        let date = moment(value);
        if(!date.isValid()) {
            throw new GraphQLError('Field parse error: value is an invalid Date');
        }
        return date;
    },

    parseLiteral: (ast) => {
        if(ast.kind !== Kind.STRING) {
            throw new GraphQLError('Query error: Can only parse strings to date but got: ' + ast.kind);
        }
        let date = moment(ast.value);
        if(!date.isValid()) {
            throw new GraphQLError('Query error: Invalid date');
        }
        return date;
    }
});

export const viewerType = new GraphQLObjectType({
    name: 'Viewer',
    description: 'Application viewer',
    fields: () => {
        return {
            id: globalIdField('Viewer'),
            correction: {
                type: correctionStatusType,
                description: "status of correction",
                args: {
                    ...connectionArgs,
                    search: {
                        name: 'search',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (_, args) => {
                    var term = args.search? args.search : '';
                    return DB.models.correction.findOne({where: {identication_number: {$eq: term} }})
                }
            }
        }
    },
    interfaces: [nodeInterface]
});

