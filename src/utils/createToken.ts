import jwt from 'jsonwebtoken';


export const createToken = async (email: string, activationCode: any) => {

    const token = jwt.sign(
        { email, activationCode },
        process.env.ACTIVATION_TOKEN_SECRET!,
        { expiresIn: '5m' })

    return token;
}