import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
const saltRounds = 12

const prisma = new PrismaClient()

export async function main() {
	try {
		const user = await prisma.user.create({
			data: {
				name: "Chemi",
				email: "chemi@huskydevs.com",
				password: await bcrypt.hash("chemitofeliz", saltRounds),
			},
		})
		console.log(user)
		await prisma.$disconnect()
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
