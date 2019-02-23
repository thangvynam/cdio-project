import axios from 'axios';
import * as config from './../constants/config/configURL';

export default function callApi(endpoint, method='GET', body, headers){
    return axios({
        // headers: { 
        //     x_accesstoken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN0YWZmQGdtYWlsLmNvbSIsImlhdCI6MTU0Njc3NDE2MiwiZXhwIjoxNTQ2OTQ2OTYyfQ.yAFUTSAVQhhMVC3pMMO-9oPTOTOohE53V6pBFYo2Vqk'
        // },
        headers,
        method: method,
        url: `${config.API_URL}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
};