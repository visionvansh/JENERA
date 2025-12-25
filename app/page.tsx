// app/page.tsx
import { getDropStatus } from "@/app/actions";
import HomePageClient from "@/components/HomePageClient";

// Force dynamic so it always checks the DB on request
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch global setting from DB before rendering
  const isDropActive = await getDropStatus();

  return <HomePageClient initialDropState={isDropActive} />;
}