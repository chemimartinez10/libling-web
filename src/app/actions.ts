'use server'
import { auth, signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"


export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	try {
		await signIn("credentials", formData)
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "Invalid credentials."
				default:
					return "Invalid credentials."
			}
		}
		throw error
	}
}
export async function logOut() {
	try {
		await signOut()
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				default:
					return "Some error."
			}
		}
		throw error
	}
}
export async function getSession() {
	try {
		await auth()
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				default:
					return "Some error."
			}
		}
		throw error
	}
}
