import axios from 'axios';

export const PostsDataProvider = (type,params,urlAPI) => {

    switch (type) {

        case "GET_POSTS":
            let uri = urlAPI + '/posts';
            let url = new URL(uri);
            if(!!params && !!params.user_id) url.searchParams.append("user_id", params.user_id);
            if(!!params && !!params.order_by) url.searchParams.append("order_by", params.order_by);
            let  options = {
                method: 'GET',
                url: url.toString(),
            }
            return axios(options).then((res) => {
                return res.data;
            }).catch((error) => {
                console.log(error);
            });

        //case "LOGOUT":
        //    console.log(urlAPIAuth);
        //    break;
         
        default:
            throw new Error(`Unsupported Data Provider request type ${type}`);
    }

};
