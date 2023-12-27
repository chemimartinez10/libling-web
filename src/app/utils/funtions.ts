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
			process.env.MAIL_SERVICE_ID || "service_qhp1f0h",
			process.env.MAIL_TEMPLATE_ID || "template_klc96ba",
			templateParams,
			process.env.MAIL_PUBLIC_KEY || "D5UQeT_KAv0WV3RZr"
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
