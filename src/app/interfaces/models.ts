import { Decimal } from "@prisma/client/runtime/library"

export interface IMetaPaginate {
	page: number
	totalPages: number
	nextPage: number | null
	prevPage: number | null
	totalData: number
	dataPerPage: number
}
export interface IUser {
	id: number
	email: string
	name?: string
	password: string
	properties?: IProperty[]
}
export interface IUserData {
	id: number
	email: string
	name: string | null
	password: string
	properties?: IProperty[]
}

export interface IProperty {
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
	type: boolean
	frecuency?: string
	publishedBy: IUser
	publishedById: number
	country: ICountry
	countryId: number
	currency: ICurrency
	currencyId: number
	propertyType: IPropertyType
	propertyTypeId: number
	PropertyImage: IPropertyImage[]
	Surface: ISurface[]
	Benefits: IBenefits[]
	NearPlace: INearPlace[]
	LegalNotice: ILegalNotice[]
	createdAt: Date
	updatedAt: Date
}
export interface IPropertyData {
	id: number
	title: string
	content: string | null
	address: string
	thumbnail: string | null
	longitude?: number
	latitude?: number
	area?: number
	bedrooms?: number
	bathrooms?: number
	price?: number
	heatingType: string | null
	heatingMedium: string | null
	heatingEnergy: string | null
	view: string | null
	furnished: boolean
	active: boolean
	type: boolean
	frecuency: string | null
	publishedBy: IUserData
	publishedById: number
	country: ICountry
	countryId: number
	currency: ICurrency
	currencyId: number
	propertyType: IPropertyType
	propertyTypeId: number
	PropertyImage: IPropertyImage[]
	Surface: ISurface[]
	Benefits: IBenefits[]
	NearPlace: INearPlace[]
	LegalNotice: ILegalNotice[]
	createdAt: Date
	updatedAt: Date
}
export interface IPropertyCreate {
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
	type: boolean
	frecuency?: string
	publishedById: number
	countryId: number
	currencyId: number
	propertyTypeId: number
}
export interface INumberSearch{
	equals?: number,
	gt?: number,
	gte?: number,
	lt?: number,
	lte?: number,
}
export interface IPropertySearch {
	id?: number
	title?: string
	content?: string
	address?: string
	thumbnail?: string
	longitude?: number
	latitude?: number
	area?: number
	bedrooms?: number | INumberSearch
	bathrooms?: number | INumberSearch
	price?: number | INumberSearch
	heatingType?: string
	heatingMedium?: string
	heatingEnergy?: string
	view?: string
	furnished?: boolean
	active?: boolean
	type?: boolean
	frecuency?: string
	publishedById?: number
	countryId?: number
	currencyId?: number
	propertyTypeId?: number
}
export interface IPropertyOrderBy {
	id?: "asc" | "desc"
	title?: "asc" | "desc"
	content?: "asc" | "desc"
	address?: "asc" | "desc"
	thumbnail?: "asc" | "desc"
	longitude?: "asc" | "desc"
	latitude?: "asc" | "desc"
	area?: "asc" | "desc"
	bedrooms?: "asc" | "desc"
	bathrooms?: "asc" | "desc"
	price?: "asc" | "desc"
	heatingType?: "asc" | "desc"
	heatingMedium?: "asc" | "desc"
	heatingEnergy?: "asc" | "desc"
	view?: "asc" | "desc"
	furnished?: "asc" | "desc"
	active?: "asc" | "desc"
	type?: "asc" | "desc"
	frecuency?: "asc" | "desc"
	publishedById?: "asc" | "desc"
	countryId?: "asc" | "desc"
	currencyId?: "asc" | "desc"
	propertyTypeId?: "asc" | "desc"
}
export interface IPropertyCreateDTO extends IPropertyCreate {
	Surface?: ISurfaceCreate[]
	Benefits?: IBenefitsCreate[]
	NearPlace?: INearPlaceCreate[]
	LegalNotice?: ILegalNoticeCreate[]
}
export interface IPropertyUpdateDTO {
	title?: string
	content?: string
	address?: string
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
	furnished?: boolean
	active?: boolean
	type?: boolean
	frecuency?: string
	publishedById?: number
	countryId?: number
	currencyId?: number
	propertyTypeId?: number
	Surface?: ISurfaceCreate[]
	Benefits?: IBenefitsCreate[]
	NearPlace?: INearPlaceCreate[]
	LegalNotice?: ILegalNoticeCreate[]
}

export interface IPropertyType {
	id: number
	name: string
	code: string
	Property?: IPropertyData[]
}

export interface IPropertyImage {
	id: number
	name: string
	description: string
	path: string
	property?: IPropertyData
	propertyId: number
}
export interface IPropertyImageCreate {
	name: string
	description: string
	path: string
	propertyId: number
}

export interface ISurface {
	id: number
	name: string
	description: string
	quantity: string
	areaId: number
	property?: IPropertyData
	propertyId: number
}
export interface ISurfaceCreate {
	name: string
	description: string
	quantity: string
	areaId: number
	propertyId: number
}
export interface IBenefits {
	id: number
	name: string
	property?: IPropertyData
	propertyId: number
}
export interface IBenefitsCreate {
	name: string
	propertyId: number
}
export interface ILegalNotice {
	id: number
	name: string
	property?: IPropertyData
	propertyId: number
}
export interface ILegalNoticeCreate {
	name: string
	propertyId: number
}
export interface INearPlace {
	id: number
	name: string
	description: string
	property?: IPropertyData
	propertyId: number
}
export interface INearPlaceCreate {
	name: string
	description: string
	propertyId: number
}
export interface ICurrency {
	id: number
	symbol: string
	name: string
	nativeSymbol: string
	decimalDigits: number
	round: number
	code: string
	pluralName: string
	Property?: IPropertyData[]
}
export interface ICountry {
	id: number
	name: string
	code: string
	capital: string
	phone: string
	currency: string
	Property?: IPropertyData[]
}
