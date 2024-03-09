import { IUserSession } from "@/services"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TypeInterfaceStore {
	showBar: boolean
	barContent?: React.ElementType<any> | null
    user?:IUserSession
    
	//actions
    setUser?:(user:IUserSession | undefined) => void
	setShowBar: (show: boolean) => void
	setBarContent: (item: React.ElementType<any>) => void
	resetBar: VoidFunction
}

export const useInterfaceStore = create<TypeInterfaceStore>()(
	persist(
		(set, get) => ({
			
			showBar: false,
			user: undefined,
			barContent: undefined,
			setUser: (user:IUserSession | undefined)=>set({user}),
			setShowBar: (showBar: boolean) => set({ showBar }),
			setBarContent: (contenido: React.ElementType<any>) =>
				set({ barContent: contenido }),
			resetBar: () => set({ barContent: undefined, showBar: false }),
		}),
		{
			name: "interface-libling-storage",
		}
	)
)
