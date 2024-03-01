'use server'
import { PrismaClient } from "@prisma/client"
const saltRounds = 12

const prisma = new PrismaClient()

export interface IPropertyTypeData {
	id?: number
	name: string
	code: string
}
export interface IUserData {
	id?: number
	name: string
	email: string
	password: string
}
export interface IUserUpdateData {
	name?: string
	email?: string
	password?: string
}
export interface IUserResult {
	id: number
	email: string
	name: string | null
	password: string
}
export interface IUserSession {
	name?: string | null | undefined
	email?: string | null | undefined
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
export async function getUserById(id: number) {
	try {
		const user = prisma.user.findFirstOrThrow({
			where: {
				id,
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
export async function updateUser(id: number, data: IUserUpdateData) {
	try {
		const user = await prisma.user.update({ where: { id }, data })
		console.log(user)
		await prisma.$disconnect()
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
export async function getPropertyTypes() {
	try {
		const propertyTypes = await prisma.propertyType.findMany()
		await prisma.$disconnect()
		return propertyTypes
	} catch (e) {
		console.error("Error getting propertyTypes")
		await prisma.$disconnect()
		return undefined
	}
}
export async function getCountries() {
	try {
		const countries = await prisma.country.findMany({orderBy:{name:"asc"}})
		await prisma.$disconnect()
		return countries
	} catch (e) {
		console.error("Error getting Countries", e)
		await prisma.$disconnect()
		return undefined
	}
}
export async function getCurrencies() {
	try {
		const currencies = await prisma.currency.findMany()
		await prisma.$disconnect()
		return currencies
	} catch (e) {
		console.error("Error getting Currencies")
		await prisma.$disconnect()
		return undefined
	}
}

export async function createPropertyType(data: IPropertyTypeData) {
	try {
		const propertyType = await prisma.propertyType.create({ data })
		console.log(propertyType)
		await prisma.$disconnect()
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
