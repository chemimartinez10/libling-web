export interface ISelectElement {
	key: string | number
	value: string | number
	description?: string | number
}

export interface IInputTextSelect {
	label: string
	placeholder: string
	list: ISelectElement[]
	onAdd: (el: string) => void
	touched?: boolean
	error?: string
	onChange?: (e: string) => void
	description?: string
	name?: string
	initialValue?: string | number
	lang: "es" | "en" | "fr"
}
export interface IInputSelect {
	label?: string
	placeholder: string
	list: ISelectElement[]
	touched?: boolean
	error?: string
	onChange?: (e: string) => void
	description?: string
	name?: string
	initialValue?: string | number
}
export interface IInputRadio {
	label: string
	onChange?: (e: boolean) => void
	description?: string
	option_1: string
	option_2: string
	initialValue?: boolean
}
export interface IInputSwitch {
	onChange?: (e: string | number) => void
	list: ISelectElement[]
	initialValue?: string | number
	label?:string
	mainColor?:string
	textColor?:string
}
export interface IInputPhoto {
	description?: string
	facename: string
	onChange?: (files: any[], faceIndex:number) => void
	initialValues: any[]
}
export interface ITextInput {
	touched?: boolean
	error?: string
	placeholder?: string
	label?: string
	description?: string
	Icon?: React.ComponentType<any>
	name?: string
	value?: string
	onChange?: (e: string | React.ChangeEvent<any>) => void
}
