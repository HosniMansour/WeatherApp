import React, {Component} from "react";
import Menu from "./menu/Menu"
import OneWeather from "./onweather"
import {connect} from "react-redux";
import {Addcity,GetCities} from "../../actions/WeatherAction";


class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            city: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();
        const {city} = this.state;
        this.props.Addcity({city});
    }

    render(){
        console.log(this.props.user.cities)
		return (
            <div>
                <Menu />
                <div className = "pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center" >
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group align-middle">
                            <div className="row">
                                <div className="col-2"><h4> Add city : </h4></div>
                                <div className="col-6">
                                    <input name="city" value={this.state.city} onChange={this.onChange}   type="text" className="form-control formlog"  placeholder="City name..."/>
                                </div>
                                <div className="col-2">
                                    <button type="submit" className="btn btn-primary">+</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <hr/>
                <br/>
                <div className="container">
                    <div className="row text-center">
                        {
                            this.props.user.cities.map(function(a) {
                                return (
                                    <OneWeather key={a} city={a} />
                                );
                            })
                        }
                    </div>
                </div>
                <br/>
			</div>
		);
	}
}

const mapStateToProps = state => {
    return {
        data: state.wth.data,
        user: state.auth.user
    };
};

export default connect(mapStateToProps,{Addcity,GetCities}) (Dashboard);