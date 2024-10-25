import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getUser } from "@/utils/auth";
import { z } from "zod";
import prisma from "@/utils/db";
import { utapi } from "@/utils/server";

const f = createUploadthing();

export const fileRouter = {
  upload: f({ image: { maxFileCount: 1, minFileCount: 1 } })
    .input(
      z.object({
        delegateId: z.string().nullish(),
        userId: z.string().nullish(),
      }),
    )
    .middleware(async ({ input }) => {
      const { user } = await getUser();

      if (!input.delegateId && !input.userId) {
        throw new UploadThingError("MISSING_DATA");
      }

      if (!user) throw new UploadThingError("Unauthorized");

      return { userId: user.id, input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      if (metadata.input.delegateId) {
        const delegate = await prisma.delegate.findUnique({
          where: { id: metadata.input.delegateId },
          select: {
            imageUrl: true,
          },
        });

        if (delegate?.imageUrl) await utapi.deleteFiles([delegate?.imageUrl]);

        await prisma.delegate.update({
          where: { id: metadata.input.delegateId },
          data: { imageUrl: file.key },
        });
      } else if (metadata.input.userId) {
        const user = await prisma.user.findUnique({
          where: { id: metadata.input.userId },
          select: {
            imageUrl: true,
          },
        });

        if (user?.imageUrl) await utapi.deleteFiles([user?.imageUrl]);

        await prisma.user.update({
          where: { id: metadata.input.userId },
          data: { imageUrl: file.key },
        });
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof fileRouter;
