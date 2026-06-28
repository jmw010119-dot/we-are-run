import { notFound } from "next/navigation";
import { CourseDescription } from "@/components/courses/detail/CourseDescription";
import { CourseDetailCTA } from "@/components/courses/detail/CourseDetailCTA";
import { CourseDetailHero } from "@/components/courses/detail/CourseDetailHero";
import { CourseDetailMap } from "@/components/courses/detail/CourseDetailMap";
import { CourseInfoPanel } from "@/components/courses/detail/CourseInfoPanel";
import { CourseReviewPreview } from "@/components/courses/detail/CourseReviewPreview";
import { CourseSummaryCards } from "@/components/courses/detail/CourseSummaryCards";
import { Section } from "@/components/common/ui/Section";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { courseDetails } from "@/lib/mock";

type CourseDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return courseDetails.map((course) => ({ id: String(course.id) }));
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const course = courseDetails.find((item) => item.id === Number(id));

  if (!course) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-run-bg text-run-text">
      <Header />
      <CourseDetailHero course={course} />
      <Section spacing="md" className="border-b-0 pt-0" containerClassName="max-w-[1320px]">
        <div className="grid gap-5 md:gap-6">
          <CourseSummaryCards course={course} />
          <CourseDetailMap course={course} />
          <CourseDescription course={course} />
          <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <CourseInfoPanel course={course} />
            <CourseReviewPreview course={course} />
          </div>
          <CourseDetailCTA course={course} />
        </div>
      </Section>
      <Footer />
    </main>
  );
}
