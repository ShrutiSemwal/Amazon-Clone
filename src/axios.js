//axios are fetching library

import axios from "axios";

const instance = axios.create({
    baseURL: 'https://us-central1-clone-e5f5d.cloudfunctions.net/api'
    //'http://localhost:5001/clone-e5f5d/us-central1/api'  //the API (cloud function) url
});

export default instance;

//"npm --prefix \"$RESOURCE_DIR\" run lint"