import { NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { auth } from "@/auth"
import { getUser } from "@/services"
import { sendMessage } from "@/app/utils/emails"
import { subjects, templates } from "@/app/utils/funtions"

const BASE_URL =
	process.env.VERCEL_ENV === "production"
		? "https://libling.lu"
		: "http://localhost:3000"

export async function POST(request: NextRequest, response: NextResponse) {
	try {
		console.log(request)
		//@ts-ignore
		const { email } = await request.json()
		const user = await getUser(email)
		if (!user) {
			return NextResponse.json({ message: "user not found" }, { status: 404 })
		}
		const tokenData = {
			email,
			id: user.id,
			name: user.name,
		}
		const token = jwt.sign(
			{ data: tokenData },
			process.env.AUTH_TOKEN || "secreto",
			{
				expiresIn: 86400,
			}
		)

		const url = `${BASE_URL}/auth/change-password?token=${token}`
		console.log("send this url to email", url)
		//send an email
		await sendMessage(
			email,
			templates.forgotPassword(user.name || "user", url),
			subjects.forgotPassword
		)
		return NextResponse.json(
			{
				message: token,
			},
			{
				status: 200,
			}
		)
	} catch (e: any) {
		return NextResponse.json(
			{
				message: e.message,
			},
			{
				status: 500,
			}
		)
	}
}
