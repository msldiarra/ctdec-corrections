import React from 'react'
import Relay from 'react-relay'
import AppMessage from './common/AppMessage';
import moment from 'moment';

class Adult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message : ""
        } ;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {

        const text = this.state.message;

        var status = <div>
            <div className='page-header col-md-6 center-block row'>

            </div>
            <div className='page-content row'>
                <div className='col-md-6 center-block text-center opacity-54'>
                    <img src='/images/oops.jpg' width='90px' height='90px' />
                    <h2>Désolé. Nous ne sommes pas en mesure de vous fournir le statut de la demande de correction NINA avec les informations fournies.</h2>
                </div>
            </div>
            </div>;


        if(this.props.viewer.correction) {

            let correction = this.props.viewer.correction;


            let statusText = correction.status == 1 ? 
            <div className='col-md-12 row'>
                <h1 className='text-center'><i className='fa run fa-check animated fa-2x green' /></h1>
                <br/>
                <br/>
                <h4 className="text-center">La demande de correction a été <b>acceptée</b> et est en cours de traitement.</h4>
            </div> : 
            <div className='col-md-12 row'>
                <h1 className='text-center'><i className='fa fa-ban fa-2x red' /></h1>
                <br/>
                <br/>
                <h4 className="text-center">La demande de correction a été <b>refusée</b>.</h4>
            </div> ;

            status = <div>
                <div className="page-header col-md-6 center-block row">

                </div>
                <div className="page-content row">
                
                <div className="col-md-6 center-block">
                    {statusText}
                </div>
            </div>
            </div>
        }

        return (
            <div className="">
                <div className="page-header col-md-6 center-block row">
                    <br/>
                </div>

                {text? <AppMessage message={text} /> : ''}

                {status}
            </div>
        );
    }
}


Adult.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(Adult, {


    initialVariables: {ninaNumber: "" },

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
               id
               correction(search: $ninaNumber) {
                  status
                  identication_number
               }
          }
    `,
    }
});
