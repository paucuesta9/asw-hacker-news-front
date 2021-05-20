import axios from 'axios';

export const UsersDataProvider = (type,params,urlAPI) => {

    let uri = false;
    let url = false;
    let options = false;

    switch (type) {

        case "GET_USER":
            uri = urlAPI + '/users/'+params;
            options = {
                method: 'GET',
                url: uri,
            }
            return axios(options).then((res) => {
                return res.data;
            }).catch((error) => {
                console.log(error);
            });
    
        case "PUT_USER":
            uri = urlAPI + '/users';
            options = {
                method: 'PUT',
                url: uri,
                data: params
            }
            return axios(options).then((res) => {
                return res.data;
            }).catch((error) => {
                console.log(error);
            });
         
        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

};
