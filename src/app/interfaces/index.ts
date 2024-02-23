export interface ISelectElement {
	key: string | number
	value: string | number
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
	label: string
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
