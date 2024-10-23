import { getUser } from "@/utils/auth";
import fs from "fs";

export async function PATCH(req: Request) {
  const data: FormData = await req.formData();

  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const delegateId = data.get("id") as string;
  const file = data.get("file") as File;

  if (file && delegateId) {
    const uploadDir = "./public/uploads/";

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const reader = file.stream().getReader();
    const writer = fs.createWriteStream(`./public/uploads/${delegateId}.jpg`);

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      writer.write(value);
    }

    writer.end();
  }

  return new Response("OK");
}
