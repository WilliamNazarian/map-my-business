const axios = require('axios');

const handler = async (event) => {

  const config = {
    method: 'get',
    url: 'https://discord.com/api/v9/channels/1066469784742527106/messages',
    headers: {
      'Authorization': 'Bot MTA2NjQ2Nzg5MzMyMTE1ODY5Ng.Gf2Kc0.7gL6mbWaTwI_Ni39VZCa7ZIL1bogPpd92vurRg',
    },
  };

  return axios(config)
    .then((res) => {
      const response = res.data.map(message => {
        return {
          content: message.content
        }
      })

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ data: response })
      }

    })
    .catch((err) => {
      console.log(err)
      return {
        statusCode: 400,
        body: "Something went wrong!"
      };
    });
}

module.exports = { handler }
