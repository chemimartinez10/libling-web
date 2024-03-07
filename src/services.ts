"use server"
import { PrismaClient } from "@prisma/client"
import {
	IPropertyCreateDTO,
	IPropertyImageCreate,
	IPropertyUpdateDTO,
} from "./app/interfaces/models"
import { PropertyCreate, PropertyUpdate } from "./app/classes"
import { revalidatePath } from "next/cache"
import { PutBlobResult, put } from "@vercel/blob"
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
		const countries = await prisma.country.findMany({
			orderBy: { name: "asc" },
		})
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

export async function createProperty(data: IPropertyCreateDTO) {
	try {
		const newProperty = new PropertyCreate(data)
		const createdProperty = await prisma.property.create({ data: newProperty })
		console.log(createdProperty)
		const surfaces = data.Surface?.map(async (el) => {
			return await prisma.surface.create({
				data: {
					...el,
					propertyId: createdProperty.id,
				},
			})
		})
		const benefits = data.Benefits?.map(async (el) => {
			return await prisma.benefits.create({
				data: {
					...el,
					propertyId: createdProperty.id,
				},
			})
		})
		const nearPlaces = data.NearPlace?.map(async (el) => {
			return await prisma.nearPlace.create({
				data: {
					...el,
					propertyId: createdProperty.id,
				},
			})
		})
		const legalNotes = data.LegalNotice?.map(async (el) => {
			return await prisma.legalNotice.create({
				data: {
					...el,
					propertyId: createdProperty.id,
				},
			})
		})
		await prisma.$disconnect()
		return createdProperty
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
export async function updateProperty(id: number, data: IPropertyUpdateDTO) {
	try {
		const newProperty = new PropertyUpdate(data)
		const createdProperty = await prisma.property.update({
			where: { id },
			data: newProperty,
		})
		console.log(createdProperty)
		//continous revision
		//to add other modules
		await prisma.$disconnect()
		return createdProperty
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
export async function createPropertyType(data: IPropertyTypeData) {
	try {
		const propertyType = await prisma.propertyType.create({ data })
		console.log(propertyType)
		await prisma.$disconnect()
		return propertyType
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
export async function createPropertyImage(data: IPropertyImageCreate) {
	try {
		const propertyImage = await prisma.propertyImage.create({ data })
		console.log(propertyImage)
		await prisma.$disconnect()
		return propertyImage
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
export async function deletePropertyImage(id: number) {
	try {
		const propertyImage = await prisma.propertyImage.delete({ where: { id } })
		console.log(propertyImage)
		await prisma.$disconnect()
		return propertyImage
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
