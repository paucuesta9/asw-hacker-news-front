import {PostsDataProvider} from './PostsDataProvider';
import {CommentsDataProvider} from './CommentsDataProvider';
import {RepliesDataProvider} from './RepliesDataProvider';
import {UsersDataProvider} from './UsersDataProvider';

const urlAPI = "https://hacker-news-fib.herokuapp.com/api/v1"

let data = null;

export const DataProvider = (providerType, type, params) => {
   
    switch (providerType) {

        case "POSTS":
            data = PostsDataProvider(type,params,urlAPI);
            break;
        
        case "USERS":
            data = UsersDataProvider(type,params,urlAPI);
            break;

        case "COMMENTS":
            data = CommentsDataProvider(type,params,urlAPI);
            break;
        
        case "REPLIES":
            data = RepliesDataProvider(type,params,urlAPI);
            break;

        default:
            throw new Error(`Unsupported Data Provider type ${providerType}`);
    }

    return data;

};
