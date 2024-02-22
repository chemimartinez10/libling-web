"use server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_SERVER || "test.net",
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
	transporter.verify(function (error, success) {
		if (error) {
			console.log(error)
		} else {
			console.log("Server is ready to take our messages")
		}
	})
	console.log(
		"sending email... ",
		process.env.SMTP_SERVER,
		process.env.MAIL_USER,
		process.env.MAIL_PWD
	)
	console.log('env variables... ',to,subject,message)
	const info = await transporter.sendMail({
		from: '"Libling solutions" <info@libling.lu>', // sender address
		to: to, // list of receivers
		subject: subject, // Subject line
		html: `${message}`, // html body
	})
	return info
}
