import User from '../Models/Usermodels.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import generateVerificationAndSetCookies from '../Utils/GenerateVerificationAndSetCookies.js';
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessEmail} from '../Mailtrap/emails.js';
import { send } from 'process';

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

export const verifyEmail = async (req, res) => {
    const {code} = req.body;
    try{
        const user = await User.findOne({
            vertificationToken: code,
            vertificationExpire: { $gt: Date.now() },
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid or expired Verification Code" });
        }
        user.isVerified = true;
        user.vertificationToken = undefined;
        user.vertificationExpire = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.firstname);
        res.status(200).json({
            success: true,
            message: "Email Verified Successfully",
            user : {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                lastlogin: user.lastlogin,
                password: undefined,
                vertificationToken: undefined,
            },
        });
    }
    catch(error){
        console.log(error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Server error" });
        }
    }
}

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
        generateVerificationAndSetCookies(res, user._id);
        user.lastlogin = Date.now();
        await user.save();

        res.status(200).json({
            success: true,
            message: "Logged in Successfully",
            user: {
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                lastlogin: user.lastlogin,
                isVerified: user.isVerified,
            },
        });
    }
    catch(error){
        console.log(error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Login Error Funtion" });
        }
    }
}

export const signout = (req, res) => {
    res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: "User not found"});
        }
        //genenerate token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetpasswordExpire = Date.now() + 1 * 60 * 60 * 1000;//1hour

        user.resetpasswordToken = resetToken;
        user.resetpasswordExpire = resetpasswordExpire;

        await user.save();

        //send email
        await sendResetPasswordEmail(user.email, `${req.protocol}://${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(200).json({success: true, message: "Reset Password Email Sent"});
    }catch(error){
        console.log(error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Server error" });
        }
    }
}

export const resetPassword = async (req, res) => {
    try{
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetpasswordToken: token,
            resetpasswordExpire: { $gt: Date.now() },
        });

        if(!user){
            return res.status(400).json({error: "Invalid or expired token"});
        }
        //update password
        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.resetpasswordToken = undefined;
        user.resetpasswordExpire = undefined;

        await user.save();
        await sendResetSuccessEmail(user.email);
        res.status(200).json({success: true, message: "Password Reset Successfully"});
    }catch(error){
        console.log(error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Error occur while reseting password!" });
        }
    }

}

export const checkAuth = async (req, res) => {
    try{
        const user = await User.findById(req.userid).select("-password");
        if(!user){
            return res.status(400).json({error: "User not found"});
        }
        res.status(200).json({
            success: true,
            message: "User Found",
            user: user,
        });
            
    }
    catch(error){
        console.log(error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Server error" });
        }
    }
}