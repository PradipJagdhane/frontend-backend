import axios from "axios";

class DataService {
    constructor(){
        this._baseUrl = process.env.REACT_APP_BACKEND_DEV_URL;
        axios.defaults.withCredentials = true;
    }

    _generateUrl(relativeUrl){
        return `${this._baseUrl}/${relativeUrl}`;
    }

    async get(relativeUrl, config = {}){
        console.log("user table data from dataservices GET...",relativeUrl)
        try{
            return await axios.get(this._generateUrl(relativeUrl), config);
            
        } catch (error){
            console.error("GET Error:", error);
            throw error;
        }
    }

    async post(relativeUrl, data = null, config = {}){
        console.log("post data from signup component.... ",data);
        try {
            return await axios.post(this._generateUrl(relativeUrl), data, config);
        } catch (error) {
            console.error("POST Error:", error);
            throw error;
        }
    }

    async put(relativeUrl, data = null, config = {}){
        try{
            return await axios.put(this._generateUrl(relativeUrl), data, config);
        } catch (error) {
            console.error("PUT Error:", error);
            throw error;
        }
    }

    async delete(relativeUrl, config = {}){
        try{
            return await axios.delete(this._generateUrl(relativeUrl), config);
        } catch (error) {

            console.error("DELETE Error:", error);
            throw error;
        }
    }
}

export default DataService;