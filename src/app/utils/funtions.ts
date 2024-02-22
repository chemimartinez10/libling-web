import emailjs from "@emailjs/browser"
import { toast } from "react-toastify"
import { dict } from "."

export const sendEmail = (
	templateParams: {
		reply_to: string
		from_name: string
		subject: string
		message: string
	},
	lang: "es" | "en" | "fr"
) => {
	const mailMessages = dict[lang]?.mail
	return emailjs
		.send(
			process.env.MAIL_SERVICE_ID || "service",
			process.env.MAIL_TEMPLATE_ID || "template",
			templateParams,
			process.env.MAIL_PUBLIC_KEY || "api_key"
		)
		.then(
			(response) => {
				console.log("SUCCESS!", response.status, response.text)
				toast.success(mailMessages.notify)
			},
			(err) => {
				console.log("FAILED...", err)
				toast.success(mailMessages.failed)
			}
		)
}

export const templates = {
	forgotPassword: (name: string, url: string) => `
	<h2>Hello ${name}</h2>
	<p>Here is your url to change password</p>
	<a href="${url}">Change password</a>
	`,
}
export const subjects = {
	forgotPassword: `Change your password`,
}
