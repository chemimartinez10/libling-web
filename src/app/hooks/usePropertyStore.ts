import { create } from "zustand"
import { persist } from "zustand/middleware"

// the store itself does not need any change
interface IForm1 {}
interface IForm2 {}
interface IForm3 {}
interface IForm4 {}
interface IForm5 {}
interface TypePropertyStore {
	lastStep: number
	form_1: IForm1 | undefined
	form_2: IForm2 | undefined
	form_3: IForm3 | undefined
	form_4: IForm4 | undefined
	form_5: IForm5 | undefined
	//actions
	setForm_1: (form: IForm1) => void
	setForm_2: (form: IForm2) => void
	setForm_3: (form: IForm3) => void
	setForm_4: (form: IForm4) => void
	setForm_5: (form: IForm5) => void
	addStep: VoidFunction
	removeStep: VoidFunction
	setStep: (step: number) => void
	resetStep: VoidFunction
	resetForm: VoidFunction
}

export const usePropertyStore = create<TypePropertyStore>()(
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
			setForm_2: (form: IForm2) => set({ form_2: form }),
			setForm_3: (form: IForm3) => set({ form_3: form }),
			setForm_4: (form: IForm4) => set({ form_4: form }),
			setForm_5: (form: IForm5) => set({ form_5: form }),
			resetForm: () =>
				set({
					form_1: undefined,
					form_2: undefined,
					form_3: undefined,
					form_4: undefined,
					form_5: undefined,
				}),
			addStep: () => set({ lastStep: get().lastStep + 1 }),
			removeStep: () => set({ lastStep: get().lastStep - 1 }),
			setStep: (step: number) => set({ lastStep: step }),
			resetStep: () => set({ lastStep: 1 }),
		}),
		{
			name: "property-libling-storage",
		}
	)
)
