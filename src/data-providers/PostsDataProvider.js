import axios from "axios";

export const PostsDataProvider = (type, params, urlAPI) => {
  let uri = false;
  let url = false;
  let options = false;

  switch (type) {
    case "GET_POSTS":
      uri = urlAPI + "/posts";
      url = new URL(uri);
      if (!!params && !!params.user_id)
        url.searchParams.append("user_id", params.user_id);
      if (!!params && !!params.order_by)
        url.searchParams.append("order_by", params.order_by);
      options = {
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
    case "GET_POST":
      if (!!params && !!params.post_id) {
        uri = urlAPI + "/posts/" + params.post_id;
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

    case "NEW_POST":
      uri = urlAPI + "/posts";
      options = {
        method: "POST",
        url: uri,
        data: params,
      };
      return axios(options)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });

    case "VOTE_POST":
      uri = urlAPI + "/posts/" + params + "/vote";
      options = {
        method: "POST",
        url: uri,
      };
      return axios(options)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });

    case "UNVOTE_POST":
      uri = urlAPI + "/posts/" + params + "/vote";
      options = {
        method: "DELETE",
        url: uri,
      };
      return axios(options)
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });

    case "GET_VOTED_POSTS":
      uri = urlAPI + "/posts/upvoted";
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

    default:
      throw new Error(`Unsupported Data Provider request type ${type}`);
  }
};
