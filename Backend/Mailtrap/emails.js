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

export default sendVerificationEmail;