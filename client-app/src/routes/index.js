import React from "react";
import {Route, Switch} from "react-router-dom";

import Home from "../components/home";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Dashboard from "../components/dashboard/dashboard";
import Details from "../components/details/details";
import requireAuth from "../utils/requireAuth";

export default () => (

	<Switch>
		<Route path="/" exact component={Home} />
		<Route path="/login" exact component={Login} />
		<Route path="/sign-up" exact component={Register} />

        <Route path="/dashboard" exact component={requireAuth(Dashboard)} />

        <Route path="/details" exact component={Details} />


	</Switch>

);

// <Route path="/dashboard" exact component={requireAuth(Dashboard)} />