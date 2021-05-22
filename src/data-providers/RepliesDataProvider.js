import axios from "axios";

export const RepliesDataProvider = (type, params, urlAPI) => {
  let uri = false;
  let url = false;
  let options = false;

  switch (type) {
    case "GET_REPLIES":
      uri = urlAPI + "/replies";
      url = new URL(uri);
      if (!!params && !!params.parent_id)
        url.searchParams.append("parent_id", params.parent_id);
      if (!!params && !!params.parent_type)
        url.searchParams.append("parent_type", params.parent_type);
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
    
    case "GET_REPLY":
      if (!!params && !!params.reply_id) {
        uri = urlAPI + "/replies/" + params.reply_id;
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

      case "GET_POST":
        if (!!params && !!params.reply_id) {
          uri = urlAPI + "/posts";
          url = new URL(uri);
          url.searchParams.append("reply_id", params.reply_id);
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
        }
        break;

    case "NEW_REPLY":
      uri = urlAPI + "/replies";
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
      
    case "VOTE_REPLY":
      uri = urlAPI + '/replies/'+params+'/vote';
      options = {
          method: 'POST',
          url: uri,
      }
      return axios(options).then((res) => {
          return res.data;
      }).catch((error) => {
          console.log(error);
      });

    case "UNVOTE_REPLY":
      uri = urlAPI + '/replies/'+params+'/vote';
      options = {
          method: 'DELETE',
          url: uri,
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
