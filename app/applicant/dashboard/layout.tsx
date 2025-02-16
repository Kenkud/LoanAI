// app/applicant/dashboard/layout.tsx

/**
 * Mark the route as force-dynamic so Next.js never pre-renders or SSRs
 * it, and skip revalidate for any static generation.
 */
export const dynamic = "force-dynamic";
export const revalidate = false;

/**
 * This layout wraps only the /applicant/dashboard route.
 * All child pages in this folder will use this layout config.
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
