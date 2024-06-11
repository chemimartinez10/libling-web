import { create } from "zustand"
import { persist } from "zustand/middleware"

// the store itself does not need any change
interface IForm1 {
	name?: string
	phone?: string
	email?: string
	country?: number
	note?: string
}
interface TypeAffiliateStore {
	lastStep: number
	form_1: IForm1 | undefined
	//actions
	setForm_1: (form: IForm1) => void
	resetForm: VoidFunction
}

export const useAffiliateStore = create<TypeAffiliateStore>()(
	persist(
		(set, get) => ({
			lastStep: 1,
			form_1: undefined,
			form_2: undefined,
			form_3: undefined,
			form_4: undefined,
			form_5: undefined,
			//Actions
			setForm_1: (form: IForm1) => set({ form_1: form }),
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
