import jwt from 'jsonwebtoken'


export const isAuthenticated = (token: any) => {
    try {

        const decode: any = jwt.verify(token, process.env.ACCESS_TOKEN || '')

        return decode

    } catch (error) {
        console.log('error in isAuthenticated Middleware');
        return error
    }
}