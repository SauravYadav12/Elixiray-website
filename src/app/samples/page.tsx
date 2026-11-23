import type { Metadata } from "next";
import SampleSwitcher from "@/components/samples/SampleSwitcher";

export const metadata: Metadata = {
  title: "Landing samples — Elixiray",
  description: "Alternative hero directions for the Elixiray landing page.",
};

export default function SamplesPage() {
  return <SampleSwitcher />;
}
