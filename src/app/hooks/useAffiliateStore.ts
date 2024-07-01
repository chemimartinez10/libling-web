import { create } from "zustand"
import { persist } from "zustand/middleware"

// the store itself does not need any change
interface IForm1 {
	name?: string
	phone?: string
	email?: string
	country?: string
	note?: string
}
interface TypeAffiliateStore {
	form_1: IForm1 | undefined
	frecuency: number | string | undefined
	plan: number | string | undefined
	//actions
	setForm_1: (form: IForm1) => void
	setFrecuency: (frecuency: number | string) => void
	setPlan: (plan: number | string) => void
	resetForm: VoidFunction
}

export const useAffiliateStore = create<TypeAffiliateStore>()(
	persist(
		(set, get) => ({
			form_1: undefined,
			frecuency:1,
			plan:undefined,
			//Actions
			setForm_1: (form: IForm1) => set({ form_1: form }),
			setFrecuency: (frecuency: number | string) => set({ frecuency }),
			setPlan: (plan: number | string) => set({ plan }),
			resetForm: () =>
				set({
					form_1: undefined,
				})
		}),
		{
			name: "affiliate-libling-storage",
		}
	)
)
