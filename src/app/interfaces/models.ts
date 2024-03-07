export interface IUser {
	id: number
	email: string // Unique constraint
	name?: string
	password: string
	properties?: IProperty[] // One-to-Many relationship with Property
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
	type: boolean // Might be better represented by an enum
	frecuency?: string
	publishedBy: IUser // Many-to-One relationship with User
	publishedById: number
	country: ICountry // Many-to-One relationship with Country
	countryId: number
	currency: ICurrency // Many-to-One relationship with Currency
	currencyId: number
	propertyType: IPropertyType // Many-to-One relationship with PropertyType
	propertyTypeId: number
	PropertyImage: IPropertyImage[] // One-to-Many relationship with PropertyImage
	Surface: ISurface[] // One-to-Many relationship with Surface
	Benefits: IBenefits[] // One-to-Many relationship with Benefits
	NearPlace: INearPlace[] // One-to-Many relationship with NearPlace
	LegalNotice: ILegalNotice[] // One-to-Many relationship with LegalNotice
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
	type: boolean // Might be better represented by an enum
	frecuency?: string
	publishedById: number
	countryId: number
	currencyId: number
	propertyTypeId: number
}
export interface IPropertyCreateDTO extends IPropertyCreate{
    Surface?: ISurfaceCreate[] // One-to-Many relationship with Surface
	Benefits?: IBenefitsCreate[] // One-to-Many relationship with Benefits
	NearPlace?: INearPlaceCreate[] // One-to-Many relationship with NearPlace
	LegalNotice?: ILegalNoticeCreate[]
}
export interface IPropertyUpdateDTO{
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
	code: string // Unique constraint
	Property: IProperty[] // Many-to-Many relationship with Property (through another table?)
}

export interface IPropertyImage {
	id: number
	name: string
	description: string
	path: string
	property: IProperty // Many-to-One relationship with Property
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
	property: IProperty // Many-to-One relationship with Property
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
	property: IProperty // Many-to-One relationship with Property
	propertyId: number
}
export interface IBenefitsCreate {
	name: string
	propertyId: number
}
export interface ILegalNotice {
	id: number
	name: string
	property: IProperty // Many-to-One relationship with Property
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
	property: IProperty // Many-to-One relationship with Property
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
	code: string // Unique constraint
	pluralName: string
	Property: IProperty[] // Many-to-Many relationship with Property (through another table?)
}
export interface ICountry {
	id: number
	name: string
	code: string // Unique constraint
	capital: string
	phone: string
	currency: string
	Property: IProperty[] // Many-to-Many relationship with Property (through another table?)
}
