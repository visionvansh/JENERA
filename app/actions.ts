// app/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getDropStatus() {
  const settings = await prisma.globalSettings.findFirst();
  return settings?.isDropActive ?? false;
}

export async function toggleDropStatus() {
  const settings = await prisma.globalSettings.findFirst();

  if (!settings) {
    // Create if doesn't exist
    await prisma.globalSettings.create({
      data: { isDropActive: true },
    });
  } else {
    // Toggle
    await prisma.globalSettings.update({
      where: { id: settings.id },
      data: { isDropActive: !settings.isDropActive },
    });
  }

  // ⚡️ Purge cache so users see the change immediately
  revalidatePath("/");
  return !settings?.isDropActive;
}