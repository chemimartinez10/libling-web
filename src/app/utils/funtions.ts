export const templates = {
	forgotPassword: (name: string, url: string) => `
	<h2>Hello ${name}</h2>
	<p>Here is your url to change password</p>
	<a href="${url}">Change password</a>
	`,
	immo: (name: string, url: string) => `
	<h2>${name} wants to comunicate with you</h2>
	<p>I'm interested on this property</p>
	<a href="${url}">Click here to see the property</a>
	<br>
	<br>
	
	`,
	contactUs: (name:string, message:string) => `
	<h2>You got a new message from ${name}: </h2>
	<p>${message}</p>
	
	`
}
export const subjects = {
	forgotPassword: `Change your password`,
	immo: `Someone is asking for a property`,
}
