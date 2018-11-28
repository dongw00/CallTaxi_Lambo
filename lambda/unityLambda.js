var AWS = require('aws-sdk'),
  documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  var params = {
    Key: {
      id: '2',
      cLat: event.cLat,
      cLon: event.cLon,
    },
    TableName: process.env.TABLE_NAME,
  };
  documentClient.update(params, (err, data) => {
    if (err) {
      console.error(
        'Unable to update item. Error JSON:',
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log('UpdateItem succeeded:', JSON.stringify(data, null, 2));
    }
  });
};
