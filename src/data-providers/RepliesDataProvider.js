import axios from 'axios';

export const RepliesDataProvider = (type,params,urlAPI) => {

    let uri = false;
    let url = false;
    let options = false;

    switch (type) {

        case "GET_REPLIES":
            uri = urlAPI + '/replies';
            url = new URL(uri);
            if(!!params && !!params.parent_id) url.searchParams.append("parent_id", params.parent_id);
            if(!!params && !!params.parent_type) url.searchParams.append("parent_type", params.parent_type);
            options = {
                method: 'GET',
                url: url.toString(),
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
