import React from 'react'
import Relay from 'react-relay'
import AppMessage from './common/AppMessage';


class IdentityNumber extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message : "",
            document : 0
        } ;
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        const text = this.state.message;


        return (
            <div className="">
                <div className="page-header col-md-6 center-block row">

                </div>

                {text? <AppMessage message={text} /> : ''}

                <form className="form-horizontal padding-20" name="add-property">
                    <div className="page-content row">
                        <div className="col-md-6 center-block">
                            <div className="form-group">
                                <div className="col-md-12">
                                    <h2 className={"text-center"}>BIENVENUE !</h2>
                                    <p className="headline">
                                        <br/>
                                        Ici, vous pouvez retrouver <span className={"blue-bold"}>le statut de votre demande de correction de vos données NINA</span>.
                                        <br/><br/>
                                        La recherche se fait par <span className={"blue-bold"}>NINA</span> ou numéro de formulaire <span className={"blue-bold"}>RAVEC</span>.
                                        <br/><br/>
                                    </p>
                                    <p className={"text-center"}>
                                        <i className="fa fa-2x fa-arrow-circle-o-down blue v-middle" aria-hidden="true"></i>
                                    </p>
                                </div>
                            </div>
                            <div className="">
        	                    <div className="form-group">
        	                        <div className="btn-group btn-group-justified col-md-12" role="group" >
        	                            <div className="btn-group" role="group">
        	                                <button onClick={() => this.context.router.push('/search/nina')} type="button" className={"btn btn-default " + (this.state.document ==  1? "active" : "")} value="3">
        	                                    <b className="hidden-xs">Commencer la recherche</b>
        	                                    <b className="visible-xs">Commencer la recherche</b>
        	                                </button>
        	                            </div>
        	                        </div>
        	                    </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


IdentityNumber.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(IdentityNumber, {

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
               id
          }
    `,
    }
});
