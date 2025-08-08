import jwt from 'jsonwebtoken';


export const createToken = async ({ user }: any) => {

    const token = jwt.sign(
        user,
        process.env.ACTIVATION_TOKEN_SECRET!,
        { expiresIn: '5m' })

    return token;
}