import { CoursesClient } from "@/components/courses/CoursesClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { runningCourses } from "@/lib/mock";
import { getRunningCourses } from "@/lib/queries/courses";

export const dynamic = "force-dynamic";

export default async function CoursesPage() {
  let courses = runningCourses;

  try {
    courses = await getRunningCourses();
  } catch {
    courses = runningCourses;
  }

  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <CoursesClient courses={courses} />
      <Footer />
    </main>
  );
}
