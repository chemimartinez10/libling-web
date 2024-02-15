import { PrismaClient } from "@prisma/client"
const saltRounds = 12

const prisma = new PrismaClient()

export interface IUserData {
	id?: number
	name: string
	email: string
	password: string
}
export interface IUserResult {
	id: number
	email: string
	name: string | null
	password: string
}
export async function getUser(email: string) {
	try {
		const user = prisma.user.findFirstOrThrow({
			where: {
				email,
			},
		})
		await prisma.$disconnect()
		return user
	} catch (e) {
		console.error("Error getting user")
		await prisma.$disconnect()
		return undefined
	}
}
export async function createUser(data: IUserData) {
	try {
		const user = await prisma.user.create({ data })
		console.log(user)
		await prisma.$disconnect()
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
