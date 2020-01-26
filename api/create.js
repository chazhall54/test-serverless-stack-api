import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {

    // Request body is passed in as a JSON encoded string in 'event.body'
    const data = JSON.parse(event.body);

    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId, // from cognito
            noteId: uuid.v1(), // unique
            content: data.content, // parsed from req body
            attachment: data.attachment, // parsed from req body
            createdAt: Date.now() // current unix timestamp
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (error) {
        console.log(error);
        return failure({ status: false });
    }

}