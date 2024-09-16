import jwt from 'jsonwebtoken';

const generateVerificationAndSetCookies = (res, user) => {
    try{
        const token = jwt.sign({ id: user }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 60 * 60 * 24 * 1000,
        });
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export default generateVerificationAndSetCookies;