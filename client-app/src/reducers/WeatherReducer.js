import {WEATHER_ATTEMPT, WEATHER_FAILED, WEATHER_SUCCESS} from "../actions/types";

const INITIAL_STATE = {
    error:"",
    data:null
};

export default (state=INITIAL_STATE, action) => {
    switch (action.type){
        case WEATHER_ATTEMPT:{
            return{...state};
        }
        case WEATHER_FAILED:{
            return{...INITIAL_STATE,error:action.error};
        }
        case WEATHER_SUCCESS:{
            return{...INITIAL_STATE,data:action.data};
        }

        default:
            return state;
    }
};