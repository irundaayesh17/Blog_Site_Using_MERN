import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplate.js";
import { client, sender } from "./mailtrap_config.js";

const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
		const response = await client.send({
			from: sender,
			to: recipient,
			subject: "Verify your email",
			html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
			category: "Email Verification",
		});

		console.log("Email sent successfully", response);
	} catch (error) {
		console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
	}
};
const sendWelcomeEmail = async (email, firstname) => {
        const recipient = [{ email }];

        try{
            const response = await client.send({
                from: sender,
                to: recipient,
                template_uuid:"20c772f3-8a0e-4ecb-a64d-e80b2877125a",
                template_variables:{
                    name: firstname,
                    company_info_name: "Knowledge",
                },
            });
            console.log("Welcome Email sent successfully", response);

        }
        catch(error){
            console.error(`Error sending welcome email`, error);
            throw new Error(`Error sending welcome email: ${error}`);
        }
};

const sendResetPasswordEmail = async (email, resetToken) => {
    const recipient = [{ email }];

    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetToken}", resetToken),
            category: "Password Reset",
        });

        console.log("Password reset email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset email`, error);

        throw new Error(`Error sending password reset email: ${error}`);
    }
};

const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await client.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });

        console.log("Password reset success email sent successfully", response);
    } catch (error) {
        console.error(`Error sending password reset success email`, error);

        throw new Error(`Error sending password reset success email: ${error}`);
    }
};

export { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetSuccessEmail};