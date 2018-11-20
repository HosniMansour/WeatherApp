import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {registerUser} from "../../actions/AuthActions";

const Error = (props) => {
    if(props.val){
        return(
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                {props.val}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );
    }
    return <div></div>;
};

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const { email, password} = this.state;
        this.props.registerUser({email, password});
    }

    componentWillReceiveProps(nextProps){
    	console.log(nextProps);
        if(nextProps.isRegistred){
            this.props.history.push("/login");
        }
    }


    render() {
		return (
			<div className="container">
				<div className="row">
                    <div className="col-4"></div>
					<div>
                        <form onSubmit={this.onSubmit} className="login align-middle elemnt text-center">
                            <br/><br/>
                            <Link to="/" style={{marginBottom:50}}>
                                <img className="img-fluid logo " src="./img/weather.png" height="100" alt=""/>
                            </Link>
                            <br/><br/><br/>
                            <p>Welcome to <strong>The Weather App :p</strong> ! <br/>
                                <br/>Already have an account ! Sign in from <Link to={"/login"}>here</Link>.
                            </p>
                            <br/>
                            <Error val={this.props.error.message} />
                            <div className="form-group align-middle">
                                <div className="form-group">
                                    <input name="email" type="email" value={this.state.email} onChange={this.onChange} className="form-control formlog"  placeholder="Email"/>
                                </div>
                                <br/>
                                <div className="form-group">
                                    <input name="password" type="password" value={this.state.password} onChange={this.onChange} className="form-control formlog"  placeholder="Password"/>
                                </div>
                                <div className="btnlogin">
                                    <button type="submit" className="btn btn-primary">Sign up</button>
                                </div>
                            </div>
                        </form>
                    </div>

				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isRegistred: state.auth.isRegistred,
        error: state.auth.error,
        loading:state.auth.loading,
        user:state.auth.user
    };
};


export default connect(mapStateToProps,{registerUser})(Register);

