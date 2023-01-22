const axios = require('axios');

const handler = async (event) => {
  // const config = {
  //   method: 'get',
  //   url: 'https://discord.com/api/v9/channels/1066469784742527106/messages',
  //   headers: {
  //     'Authorization': 'Bot MTA2NjQ2Nzg5MzMyMTE1ODY5Ng.Gf2Kc0.7gL6mbWaTwI_Ni39VZCa7ZIL1bogPpd92vurRg',
  //   },
  // };

  // axios(config)
  //   .then( res => {
  //     console.log(JSON.stringify(response.data));

  //     return {
  //       statusCode: 200,
  //       body: "Success!"
  //     }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  return {
    statusCode: 200,
    body: "Success!"
  }
}

module.exports = { handler }
