'use server'
import { PrismaClient } from "@prisma/client"
const saltRounds = 12

const prisma = new PrismaClient()
export interface IPropertyData{
		id: number; // Primary key with auto-increment
		title: string;
		content?: string; // Optional property for additional details
		address: string;
		thumbnail?: string; // Optional URL for the property's thumbnail image
	  
		// Location details
		longitude?: number;
		latitude?: number;
	  
		// Property specifications
		area?: number; // Total area of the property (e.g., square meters)
		bedrooms?: number;
		bathrooms?: number;
		price?: number;
	  
		// Heating details
		heatingType?: string; // Type of heating system (e.g., central heating)
		heatingMedium?: string; // Fuel used for heating (e.g., gas, oil)
		heatingEnergy?: string; // Energy efficiency rating of the heating system
	  
		// Additional features
		view?: string; // Description of the property's view (e.g., ocean view)
		furnished: boolean; // Indicates if the property is furnished
		active: boolean; // Indicates if the property is currently available (active)
	  
		// Property type (e.g., apartment, house) - Replace with actual enum type
		type: boolean; // Might be better represented by an enum (discuss with backend team)
		frecuency?: string; // Usage frequency (e.g., weekly, monthly) - Clarify purpose
	  
		// Relationships (Foreign Keys)
		publishedBy: User; // User who published the property
		publishedById: number;
	  
		country: Country; // Country where the property is located
		countryId: number;
	  
		currency: Currency; // Currency used for the property price
		currencyId: number;
	  
		propertyType: IPropertyTypeData; // Type of property (e.g., apartment, house)
		propertyTypeId: number;
	  
		// Arrays for related models (replace with actual model interfaces)
		PropertyImage: PropertyImage[];
		Surface: Surface[];
		Benefits: Benefits[];
		NearPlace: NearPlace[];
		LegalNotice: LegalNotice[];
	  
		createdAt: Date; // Property creation timestamp
		updatedAt: Date; // Property update timestamp
	  
}
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

export async function createProperty(data: I) {
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
