import { Suspense } from "react";
import ScholarshipDetailClient from "./ScholarshipDetailClient";

export const instant = false;

export function generateStaticParams() {
  return [
    { slug: "ltse" },
    { slug: "fast" },
  ];
}

async function ScholarshipDetailWrapper({ params }) {
  const { slug } = await params;
  return <ScholarshipDetailClient slug={slug} />;
}

export default function ScholarshipDetailPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#f7f8fc] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#C8102E] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ScholarshipDetailWrapper params={params} />
    </Suspense>
  );
}
