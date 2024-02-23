import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
const saltRounds = 12

const prisma = new PrismaClient()

export async function main() {
	try {
		const users: {
			id: number
			email: string
			name: string | null
			password: string
		}[] = []
		const data = [
			{
				name: "Chemi",
				email: "chemi@huskydevs.com",
				password: await bcrypt.hash("chemitofeliz", saltRounds),
			},
			{
				name: "Javier",
				email: "nunezgomezjavier@gmail.com",
				password: await bcrypt.hash("password", saltRounds),
			},
			{
				name: "Lidiz",
				email: "lidizcruz@libling.lu",
				password: await bcrypt.hash("Libling.123", saltRounds),
			},
		]
		data.forEach(async (el) => {
			let user = await prisma.user.upsert({
				where: { email: el.email },
				update: el,
				create: el,
			})
			users.push(user)
		})
		console.log(users)

		const propertyTypes: {
			id: number
			name: string
			code: string
		}[] = []
		const dataPropertyTypes = [
			{
				name: "Apartamento",
				code: "APARTMENT",
			},
			{
				name: "Casa",
				code: "HOUSE",
			},
			{
				name: "Ático",
				code: "BASEMENT",
			},
			{
				name: "Duplex",
				code: "DUPLEX",
			},
			{
				name: "Triplex",
				code: "TRIPLEX",
			},
		]
		dataPropertyTypes.forEach(async (el) => {
			let propertyType = await prisma.propertyType.upsert({
				where: { code: el.code },
				update: el,
				create: el,
			})
			propertyTypes.push(propertyType)
		})
		console.log(propertyTypes)
		await prisma.$disconnect()
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
main()
