import { StreamChat } from 'stream-chat';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    throw new Error('STREAM_API_KEY and STREAM_API_SECRET must be set in the environment variables');
}
// Initialize the StreamChat client with the API key and secret
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

//Upsert (update or insert) a user in Stream
export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]);
        return userData;
    } catch (error) {
        console.error('Error upserting Stream user:', error);
        throw new Error('Failed to upsert Stream user');
    }
}