import React, { Component } from 'react';
import {logout} from "../../../actions/AuthActions";
import {connect} from "react-redux";
import {NavLink,withRouter} from "react-router-dom";


class Menu extends Component {

    logout(e) {
        e.preventDefault();
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <div
                    className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
                    <h5 className="my-0 mr-md-auto font-weight-normal">Weather App</h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <NavLink className="p-2 text-dark"  exact to="/dashboard" >Dashboard</NavLink>
                    </nav>
                    <a onClick={this.logout.bind(this)} href="/logout" className="btn btn-outline-primary" href="#">Logout</a>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default withRouter(connect(mapStateToProps, { logout })(Menu));