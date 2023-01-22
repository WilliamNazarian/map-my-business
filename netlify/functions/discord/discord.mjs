const axios = require('axios');

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const handler = async (event) => {

  const config = {
    method: 'get',
    url: 'https://discord.com/api/v9/channels/1066469784742527106/messages',
    headers: {
      'Authorization': 'Bot MTA2NjQ2Nzg5MzMyMTE1ODY5Ng.GTPh_F.YyNb6mCzq1mwtmt3_mF6jqTt9zjbBDxFyD8xzI',
    },
  };

  return axios(config)
    .then((res) => {
      const response = res.data.map(message => {
        return {
          content: message.content,
          author: message.author.username,
          timestamp: (timeAgo.format(new Date(message.timestamp))),
          image: message.attachments
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
