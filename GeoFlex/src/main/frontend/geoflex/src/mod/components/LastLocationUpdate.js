import axios from 'axios';

export default function LastLocationUpdate(data) {    
    alert("LastLocationUpdateCall")
    
        /**
        *API call PATCH to update a location in the moderator edit view
        */
        var config = {
          method: "patch",
          url: "/moderator/location",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
    
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
    
          })
          .catch(function (error) {
            console.log(error);
          });

  return;
}
