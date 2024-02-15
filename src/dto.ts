import { IUserData, IUserResult } from "./services"

export class UserDTO {
	email
	name
	constructor(data:IUserResult|IUserData) {
		this.email = data?.email
		this.name = data?.name
	}
}
