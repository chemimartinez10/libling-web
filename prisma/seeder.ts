import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import countries from "./paises.json"
import currency from "./currency.json"
const saltRounds = 12

const countryArray = Object.values(countries).map((el) => ({
	name: el.name,
	code: el.siglas,
	capital: el.capital,
	phone: el.phone,
	currency: el.currency,
}))
const currencyArray = Object.values(currency).map((el) => ({
	symbol: el.symbol,
	name: el.name,
	nativeSymbol: el.symbol_native,
	decimalDigits: el.decimal_digits,
	round: el.rounding,
	code: el.code,
	pluralName: el.name_plural,
}))

const prisma = new PrismaClient()

export async function main() {
	try {
		//property users
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

		//property types

		const propertyTypes: {
			id: number
			name: string
			code: string
		}[] = []
		const dataPropertyTypes = [
			{
				name: "Apartment",
				code: "APARTMENT",
			},
			{
				name: "Commercial Premise",
				code: "COMMERCIAL_PREMISE",
			},
			{
				name: "Office",
				code: "OFFICE",
			},
			{
				name: "Apartment",
				code: "APARTMENT",
			},
			{
				name: "House",
				code: "HOUSE",
			},
			{
				name: "Basement",
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

		//countries
		
		countryArray.forEach(async (el) => {
			await prisma.country.upsert({
				where: { code: el.code },
				update: el,
				create: el,
			})
		})
		
		//currencies
		currencyArray.forEach(async (el) => {
			await prisma.currency.upsert({
				where: { code: el.code },
				update: el,
				create: el,
			})
		})
		await prisma.$disconnect()
	} catch (e) {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	}
}
main()
