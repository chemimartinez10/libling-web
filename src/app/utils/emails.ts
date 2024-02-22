"use server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
	host: "smtp.forwardemail.net",
	port: 465,
	secure: true,
	auth: {
		user: process.env.MAIL_USER || "REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM",
		pass: process.env.MAIL_PWD || "REPLACE-WITH-YOUR-GENERATED-PASSWORD",
	},
})

export const sendMessage = async (
	to: string,
	message: string,
	subject: string
) => {
	const info = await transporter.sendMail({
		from: '"Libling solutions" <info@libling.lu>', // sender address
		to: to, // list of receivers
		subject: subject, // Subject line
		html: `${message}`, // html body
	})
	return info
}
