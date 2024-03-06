export interface User {
	id: number
	email: string // Unique constraint
	name?: string
	password: string
	properties?: Property[] // One-to-Many relationship with Property
}

export interface Property {
	id: number
	title: string
	content?: string
	address: string
	thumbnail?: string
	longitude?: number
	latitude?: number
	area?: number
	bedrooms?: number
	bathrooms?: number
	price?: number
	heatingType?: string
	heatingMedium?: string
	heatingEnergy?: string
	view?: string
	furnished: boolean
	active: boolean
	type: boolean // Might be better represented by an enum
	frecuency?: string
	publishedBy: User // Many-to-One relationship with User
	publishedById: number
	country: Country // Many-to-One relationship with Country
	countryId: number
	currency: Currency // Many-to-One relationship with Currency
	currencyId: number
	propertyType: PropertyType // Many-to-One relationship with PropertyType
	propertyTypeId: number
	PropertyImage: PropertyImage[] // One-to-Many relationship with PropertyImage
	Surface: Surface[] // One-to-Many relationship with Surface
	Benefits: Benefits[] // One-to-Many relationship with Benefits
	NearPlace: NearPlace[] // One-to-Many relationship with NearPlace
	LegalNotice: LegalNotice[] // One-to-Many relationship with LegalNotice
	createdAt: Date
	updatedAt: Date
}
export interface PropertyCreate {
	title: string
	content?: string
	address: string
	thumbnail?: string
	longitude?: number
	latitude?: number
	area?: number
	bedrooms?: number
	bathrooms?: number
	price?: number
	heatingType?: string
	heatingMedium?: string
	heatingEnergy?: string
	view?: string
	furnished: boolean
	active: boolean
	type: boolean // Might be better represented by an enum
	frecuency?: string
	publishedById: number
	countryId: number
	currencyId: number
	propertyTypeId: number
}

export interface PropertyType {
	id: number
	name: string
	code: string // Unique constraint
	Property: Property[] // Many-to-Many relationship with Property (through another table?)
}

export interface PropertyImage {
	id: number
	name: string
	description: string
	path: string
	property: Property // Many-to-One relationship with Property
	propertyId: number
}
export interface PropertyImageCreate {
	name: string
	description: string
	path: string
	propertyId: number
}

export interface Surface {
	id: number
	name: string
	description: string
	quantity: string
	property: Property // Many-to-One relationship with Property
	propertyId: number
}
export interface SurfaceCreate {
	name: string
	description: string
	quantity: string
	propertyId: number
}
export interface Benefits {
	id: number
	name: string
	property: Property // Many-to-One relationship with Property
	propertyId: number
}
export interface BenefitsCreate {
	name: string
	propertyId: number
}
export interface LegalNotice {
	id: number
	name: string
	property: Property // Many-to-One relationship with Property
	propertyId: number
}
export interface LegalNoticeCreate {
	name: string
	propertyId: number
}
export interface NearPlace {
	id: number
	name: string
	description: string
	property: Property // Many-to-One relationship with Property
	propertyId: number
}
export interface NearPlaceCreate {
	name: string
	description: string
	propertyId: number
}
export interface Currency {
	id: number
	symbol: string
	name: string
	nativeSymbol: string
	decimalDigits: number
	round: number
	code: string // Unique constraint
	pluralName: string
	Property: Property[] // Many-to-Many relationship with Property (through another table?)
}
export interface Country {
	id: number
	name: string
	code: string // Unique constraint
	capital: string
	phone: string
	currency: string
	Property: Property[] // Many-to-Many relationship with Property (through another table?)
}
