import React, {Component} from "react";
import {Link,withRouter} from "react-router-dom";
import {connect} from "react-redux";

import { loginUser } from "../../actions/AuthActions";

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

class Login extends Component {

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
		const {email, password} = this.state;
		this.props.loginUser({email, password});
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.isAuthenticated){
			this.props.history.push("/dashboard");
		}
	}

	render() {
		return (
			<div className="container">
				<div className="row">
                    <div className="col-4"></div>
                    <div>
                        <br/>
                        <form onSubmit={this.onSubmit} className="text-center">
                            <br/>
                            <br/>
                            <Link to="/" style={{marginBottom:50}}>
                                <img className="img-fluid logo " src="./img/weather.png" height="100" alt="" />
                            </Link>
                            <br/><br/><br/>
                            <p>Welcome to <strong>The Weather App :p</strong> !<br/><br/>
                                If you don't have an account create it from <Link to={"/sign-up"}>here</Link>.
                            </p>
                            <br/>
                            <Error val={this.props.error.message} />
                            <div className="form-group">
                                <input value={this.state.email} type="email" name="email"  onChange={this.onChange} className="form-control formlog"  placeholder="Email"/>
                            </div>
                            <br/>
                            <div className="form-group">
                                <input value={this.state.password} type="password" onChange={this.onChange} className="form-control formlog" name="password" placeholder="Password"/>
                            </div>
                            <br/>
                            <div className="custom-control custom-checkbox mr-sm-2">
                                <div className="btnlogin">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </div>

                        </form>
					</div>
                    <div></div>
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

export default withRouter(connect(mapStateToProps,{loginUser}) (Login));