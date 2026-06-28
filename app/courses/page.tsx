import { CoursesClient } from "@/components/courses/CoursesClient";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <CoursesClient />
      <Footer />
    </main>
  );
}
