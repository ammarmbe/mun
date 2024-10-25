import prisma from "@/utils/db";
import { utapi } from "@/utils/server";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const interview = await prisma.interview.findUnique({
    where: { id },
    select: {
      delegate: {
        select: {
          id: true,
          imageUrl: true,
        },
      },
    },
  });

  if (interview?.delegate?.imageUrl) {
    await utapi.deleteFiles([interview.delegate.imageUrl]);

    await prisma.delegate.update({
      where: { id: interview.delegate.id },
      data: { imageUrl: null },
    });
  }

  return new Response("OK");
}
