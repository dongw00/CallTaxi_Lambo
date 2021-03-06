'use strict';

const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      "id": 0
    },
    UpdateExpression: "set cLat=:cLat, cLon=:cLon",
    ExpressionAttributeValues: {
      ":cLat": event.cLat,
      ":cLon": event.cLon
    },
    ReturnValues: "UPDATED_NEW"
  };
  
  dynamodb.update(params, (err, data) => {
    if (err) {
      console.error('Unable to update item. Error JSON:', JSON.stringify(err, null, 2));
    } else {
      console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
};