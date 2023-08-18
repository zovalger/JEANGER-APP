import { PROXY } from "@/config";

export default async function handler(req: Request, res: Response) {
	if (req.method === "GET") {
		return await res.status(200).json({ PROXY });
	}
}
