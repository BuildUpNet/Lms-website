import { Suspense } from "react";
import CourseDetailClient from "./CourseDetailClient";

export const instant = false;

async function CourseDetailWrapper({ params }) {
  const { slug } = await params;
  return <CourseDetailClient slug={slug} />;
}

export default function CourseDetailPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f7f8fc]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#C8102E] border-t-transparent" />
        </div>
      }
    >
      <CourseDetailWrapper params={params} />
    </Suspense>
  );
}
