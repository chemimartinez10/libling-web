import { createPropertyImage, updateProperty } from "@/services"
import { put } from "@vercel/blob"
import { NextResponse } from "next/server"

export async function POST(request: Request): Promise<NextResponse> {
	const { searchParams } = new URL(request.url)
	const propertyId = searchParams.get("propertyId")
	const ext = searchParams.get("type")
	const face = searchParams.get("face")

	if (request.body) {
		const blob = await put(`file.${ext || "jpg"}`, request.body, {
			access: "public",
		})
		const newImage = await createPropertyImage({
			name: blob.pathname,
			description: "",
			path: blob.url,
			propertyId: parseInt(propertyId || "0"),
		})
		if (face == "1") {
			await updateProperty(parseInt(propertyId || "0"), { thumbnail: blob.url })
		}
		return NextResponse.json(newImage)
	}

	return NextResponse.json({ message: "nothing" })
}
