import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";


export async function main(event, context) {


    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be retrieved
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId, // from cognito
            noteId: event.pathParameters.id,
        }
    };

    try {
        const result = await dynamoDbLib.call("get", params);
        if (result.Item) {
            // Returns the item
            return success(result.Item);
        } else {
            return failure({ status: false, error: "Item not found." });
        }
    } catch (error) {
        return failure({ status: false });
    }


}