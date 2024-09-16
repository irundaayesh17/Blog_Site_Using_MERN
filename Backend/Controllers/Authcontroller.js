import User from '../Models/Usermodels.js';
import bcrypt from 'bcryptjs';
import generateVerificationAndSetCookies from '../Utils/GenerateVerificationAndSetCookies.js';
import sendVerificationEmail from '../Mailtrap/emails.js';


export const signup = async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    try {
        if(!email || !password || !firstname || !lastname) {
            return res.status(400).json({error: "All fields are required"});
        }
        const userAlreadyExists = await User.findOne({email});
        console.log(userAlreadyExists);
        if(userAlreadyExists) {
            return res.status(400).json({error: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const vertificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User({
            email,
            password: hashedPassword,
            firstname,
            lastname,
            vertificationToken,
            vertificationExpire: Date.now() + 24 * 60 * 60 * 1000,
        });

        await user.save();

        generateVerificationAndSetCookies(res,user._id);
        await sendVerificationEmail(user.email, vertificationToken);
        res.status(201).json({
            message: "User Registered Successfully",
            user:{
                user:{
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    lastlogin: user.lastlogin,
                    vertificationToken: user.vertificationToken,
                    vertificationExpire: user.vertificationExpire,
                }
            },
        });
    }
    catch (error) {
        console.log(error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Server error" });
        }    }
}

export const signin = (req, res) => {
    res.send('Signin Route');
}

export const signout = (req, res) => {
    res.send('Signout Route');
}