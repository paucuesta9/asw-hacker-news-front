import axios from "axios";

export const CommentsDataProvider = (type, params, urlAPI) => {
  switch (type) {
    case "GET_COMMENTS":
      let uri = urlAPI + "/comments";
      let url = new URL(uri);
      if (!!params && !!params.user_id)
        url.searchParams.append("user_id", params.user_id);
      if (!!params && !!params.post_id)
        url.searchParams.append("post_id", params.post_id);
      let options = {
        method: "GET",
        url: url.toString(),
      };
      return axios(options)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });

    case "GET_COMMENT":
      if (!!params && !!params.comment_id) {
        uri = urlAPI + "/comments/" + params.comment_id;
        options = {
          method: "GET",
          url: uri,
        };
        return axios(options)
          .then((res) => {
            return res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
      break;

    //case "LOGOUT":
    //    console.log(urlAPIAuth);
    //    break;

    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }
};
