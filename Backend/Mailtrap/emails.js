import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate.js";
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

export { sendVerificationEmail, sendWelcomeEmail };