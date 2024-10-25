import { getUser } from "@/utils/auth";
import prisma from "@/utils/db";
import fs from "fs";

export async function GET() {
  const { user } = await getUser();

  return new Response(JSON.stringify(user));
}

export async function PATCH(req: Request) {
  const data: FormData = await req.formData();

  const { user } = await getUser();

  if (!user) {
    return new Response(null, { status: 401 });
  }

  const firstName = data.get("firstName") as string;
  const lastName = data.get("lastName") as string;
  const file = data.get("file") as File;

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      firstName,
      lastName,
    },
  });

  if (file) {
    const uploadDir = "/public/uploads/";

    if (!fs.existsSync(process.cwd() + uploadDir)) {
      fs.mkdirSync(process.cwd() + uploadDir, { recursive: true });
    }

    const reader = file.stream().getReader();
    const writer = fs.createWriteStream(
      process.cwd() + `/public/uploads/${user.id}.jpg`,
    );

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
