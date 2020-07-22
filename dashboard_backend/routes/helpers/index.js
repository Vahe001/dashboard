import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export const verify = async (token) => {
    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const {email, name, picture } = ticket.getPayload();
        return { email, name, picture }
    } catch (err) {
        console.log('Error: ', err)
        throw new Error('Invalid token')
    }
};
