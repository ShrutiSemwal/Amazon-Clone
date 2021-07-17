//axios are fetching library

import axios from "axios";

const instance = axios.create({
    baseURL: 'Your_cloud_function_url'
      //the API (cloud function) url
});

export default instance;

//"npm --prefix \"$RESOURCE_DIR\" run lint"
