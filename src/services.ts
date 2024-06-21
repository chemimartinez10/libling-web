"use server"
import { PrismaClient } from "@prisma/client"
import {
	IAffiliateData,
	IAffiliateOrderBy,
	IAffiliateSearch,
	IMetaPaginate,
	IPayOrderBy,
	IPaySearch,
	IPropertyCreateDTO,
	IPropertyData,
	IPropertyImageCreate,
	IPropertyOrderBy,
	IPropertySearch,
	IPropertyUpdateDTO,
	IUpdateAffiliateData,
	IUpdatePay,
} from "./app/interfaces/models"
import { PropertyCreate, PropertyUpdate } from "./app/classes"
import { cookies } from "next/headers"
import countries from '@/app/utils/countries.json'
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
export async function findPropertyType(id: number) {
	try {
		const propertyType = await prisma.propertyType.findFirst({ where: { id } })
		await prisma.$disconnect()
		return propertyType
	} catch (e) {
		console.error("Error getting propertyType")
		await prisma.$disconnect()
		return undefined
	}
}
export async function findPropertyTypeByCode(code: string) {
	try {
		const propertyType = await prisma.propertyType.findFirst({ where: { code } })
		await prisma.$disconnect()
		return propertyType
	} catch (e) {
		console.error("Error getting propertyType")
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
export async function getStatesByCode(code:string) {
	try {
		const states = countries.find(el=>el?.code2 === code)?.states
		return states?.map(el=>({
			key:el.code,
			value:el.name,
			description:el.code,
		}))
	} catch (e) {
		console.error("Error getting states", e)
		return undefined
	}
}
export async function findCountryByCode(code: string) {
	try {
		const country = await prisma.country.findFirst({
			where: {
				code,
			},
		})
		await prisma.$disconnect()
		return country
	} catch (e) {
		console.error("Error getting Country", e)
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
export async function indexProperty(
	filters: IPropertySearch = {},
	orderBy: IPropertyOrderBy = {},
	page: number = 1,
	limit: number = 15,
	country: boolean = true
) {
	console.log("index request", filters, orderBy, page, limit, country)
	let countryFilter
	if (country) {
		countryFilter = await getCountryFilter()
	}
	const properties = await prisma.property.findMany({
		where: {
			...filters,
			address: filters.address ? { contains: filters.address } : undefined,
			countryId: countryFilter,
		},
		orderBy,
		include: {
			publishedBy: true,
			country: true,
			currency: true,
			propertyType: true,
			Surface: true,
			NearPlace: true,
			LegalNotice: true,
			PropertyImage: true,
			Benefits: true,
		},
	})
	const fromResult = (page - 1) * limit
	const toResult = fromResult + limit
	console.log("properties found:", properties.length, fromResult, toResult)
	const data: IPropertyData[] = properties
		.slice(fromResult, toResult)
		.map((el) => ({
			...el,
			longitude: el.longitude?.toNumber(),
			latitude: el.latitude?.toNumber(),
			area: el.area?.toNumber(),
			bedrooms: el.bedrooms?.toNumber(),
			bathrooms: el.bathrooms?.toNumber(),
			price: el.price?.toNumber(),
		}))
	const totalPages = Math.ceil(properties.length / limit)
	const newPage = page > totalPages ? totalPages : page
	const meta: IMetaPaginate = {
		page: newPage,
		prevPage: newPage <= 1 ? null : newPage - 1,
		nextPage: newPage >= totalPages ? null : newPage + 1,
		dataPerPage: properties.length >= limit ? limit : properties.length,
		totalData: properties.length,
		totalPages,
	}
	return {
		data,
		meta,
	}
}
export async function showProperty(filters: IPropertySearch) {
	const property = await prisma.property.findFirst({
		where: filters,
		include: {
			publishedBy: true,
			country: true,
			currency: true,
			propertyType: true,
			Surface: true,
			NearPlace: true,
			LegalNotice: true,
			PropertyImage: true,
			Benefits: true,
		},
	})
	return property
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
export async function deleteProperty(id: number) {
	try {
		const propertyDeleted = await prisma.property.delete({ where: { id } })
		console.log(propertyDeleted)
		await prisma.$disconnect()
		return propertyDeleted
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
export async function activeMultipleProperty(ids: number[]) {
	try {
		let updatedProperties: any[] = []
		await Promise.all(
			ids.map(async (el) => {
				const updatedProperty = await prisma.property.update({
					where: { id: el },
					data: { active: true },
				})
				updatedProperties.push(updatedProperty)
			})
		)
		console.log(updatedProperties)
		await prisma.$disconnect()
		return updatedProperties
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
export async function deactivateMultipleProperty(ids: number[]) {
	try {
		let updatedProperties: any[] = []
		await Promise.all(
			ids.map(async (el) => {
				const updatedProperty = await prisma.property.update({
					where: { id: el },
					data: { active: false },
				})
				updatedProperties.push(updatedProperty)
			})
		)
		console.log(updatedProperties)
		await prisma.$disconnect()
		return updatedProperties
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

export const getCountryFilter = async () => {
	const countryCookie = cookies().get("immo-country")?.value
	if (!countryCookie) {
		return (await findCountryByCode("LU"))?.id
	}
	if (!!countryCookie && countryCookie === "ALL") {
		return undefined
	}
	if (!!countryCookie && countryCookie !== "ALL") {
		return (await findCountryByCode(countryCookie))?.id
	}
}
export const createPay = async(data:IUpdatePay)=>{
	try {
		const pay = await prisma.pay.create({ data })
		console.log(pay)
		await prisma.$disconnect()
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
export const updatePay = async(data: IUpdatePay)=>{
	try {
		const pay = await prisma.pay.update({ where: { id:data.id }, data })
		console.log(pay)
		await prisma.$disconnect()
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
export const createAffiliate = async(data: IUpdateAffiliateData)=>{
	try {
		const affiliate = await prisma.affiliate.create({ data })
		console.log(affiliate)
		await prisma.$disconnect()
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
export const updateAffiliate = async(data: IUpdateAffiliateData)=>{
	try {
		const affiliate = await prisma.affiliate.update({ where: { id:data.id }, data })
		console.log(affiliate)
		await prisma.$disconnect()
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}

export const getAffiliates = async(
	filters: IAffiliateSearch = {},
	orderBy: IAffiliateOrderBy = {},
	page: number = 1,
	limit: number = 15,
)=>{
	console.log("index request", filters, orderBy, page, limit)
	const affiliates = await prisma.affiliate.findMany({
		where: {
			...filters,
		},
		orderBy,
		include: {
			country:true,
			Pay:true
		},
	})
	const fromResult = (page - 1) * limit
	const toResult = fromResult + limit
	console.log("affiliates found:", affiliates.length, fromResult, toResult)
	const data = affiliates
		.slice(fromResult, toResult)
		.map((el) => ({
			...el,
			Pay:el.Pay.map(element => ({...element, quantity:element.quantity?.toNumber()}))
		}))
	const totalPages = Math.ceil(affiliates.length / limit)
	const newPage = page > totalPages ? totalPages : page
	const meta: IMetaPaginate = {
		page: newPage,
		prevPage: newPage <= 1 ? null : newPage - 1,
		nextPage: newPage >= totalPages ? null : newPage + 1,
		dataPerPage: affiliates.length >= limit ? limit : affiliates.length,
		totalData: affiliates.length,
		totalPages,
	}
	return {
		data,
		meta,
	}
}
export const getPays = async(
	filters: IPaySearch = {},
	orderBy: IPayOrderBy = {},
	page: number = 1,
	limit: number = 15,
)=>{
	console.log("index request", filters, orderBy, page, limit)
	const pays = await prisma.pay.findMany({
		where: {
			...filters,
		},
		orderBy,
		include: {
			affiliate:true
		},
	})
	const fromResult = (page - 1) * limit
	const toResult = fromResult + limit
	console.log("pays found:", pays.length, fromResult, toResult)
	const data = pays
		.slice(fromResult, toResult)
		.map((el) => ({
			...el,
			quantity:el.quantity?.toNumber()
		}))
	const totalPages = Math.ceil(pays.length / limit)
	const newPage = page > totalPages ? totalPages : page
	const meta: IMetaPaginate = {
		page: newPage,
		prevPage: newPage <= 1 ? null : newPage - 1,
		nextPage: newPage >= totalPages ? null : newPage + 1,
		dataPerPage: pays.length >= limit ? limit : pays.length,
		totalData: pays.length,
		totalPages,
	}
	return {
		data,
		meta,
	}
}
export const showAffiliate = async(filters:IAffiliateSearch)=>{
	const affiliate = await prisma.affiliate.findFirst({
		where: filters,
		include: {
			country:true,
			Pay:true
		},
	})
	return affiliate
}


