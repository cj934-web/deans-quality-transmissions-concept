import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FormExperience from "../../../forms/FormExperience";
import { formDefinitions, formKinds, isFormKind } from "../../../forms/form-config";

export function generateStaticParams() {
  return formKinds.map((kind) => ({ kind }));
}

export async function generateMetadata({ params }: { params: Promise<{ kind: string }> }): Promise<Metadata> {
  const { kind } = await params;
  if (!isFormKind(kind)) return {};
  const title = `${formDefinitions[kind].title} | Dean's Shade Direction`;
  return {
    title,
    description: `${formDefinitions[kind].intro} This concept prepares an email to Dean's Quality Transmissions.`,
    alternates: { canonical: `/shade/forms/${kind}` },
    robots: { index: false, follow: false },
    openGraph: { title, url: `/shade/forms/${kind}`, images: [] },
    twitter: { card: "summary", title, images: [] },
  };
}

export default async function ShadeRequestFormPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!isFormKind(kind)) notFound();
  return <FormExperience kind={kind} theme="shade" />;
}

