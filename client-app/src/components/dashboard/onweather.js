import React, { Component } from 'react';
import axios from "axios";
import {APPID} from "../../actions/types";
import {Link} from "react-router-dom";
class OneWeather extends Component {

    constructor(props){
        super(props);
        this.state = {
            city:props.city,
            error: "",
            data: {name:"",weather:[{},{id:1,main:"",description:"description"}],main:{temp:0}}
        };
    }

    componentDidMount() {
        this.getdata(this.state.city);

    }

    getdata(city){
        let url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + APPID;
        axios.get(url)
            .then((response)=> {
                this.setState({data: response.data});
            })
            .catch((err)=>{
                console.log(err.message);
                this.setState({error:err});
            });
    }

    getpos(){
        if(this.state.data.weather[0]!==undefined){
            return this.state.data.weather[0].description;
        }
        return ""
    }

    render() {
        return (
            <div className="col-4 box-shadow">
                <div className="card-header">
                    <h4 className="my-0 font-weight-normal">{this.state.data.name}</h4>
                </div>
                <div className="card-body">
                    <h1 className="card-title pricing-card-title">{(this.state.data.main.temp - 273.15).toFixed(2)} C</h1>
                    <ul className="list-unstyled mt-3 mb-4">
                        <li><strong>{this.getpos()}</strong></li>
                        <br/>
                        <li><img src={"http://simpleicon.com/wp-content/uploads/cloud-11.png"} height="30" alt={"cloud"} /> </li>
                    </ul>
                    <Link exact to="/details">
                        <button type="button" className="btn btn-md btn-block btn-outline-primary">Details</button>
                    </Link>
                </div>
            </div>
        );
    }
}



export default OneWeather;