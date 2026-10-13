import { redirect } from "next/navigation";

/** Legacy menu/CTA href — consultation lives on Contact. */
export default function ConsultationRedirectPage() {
  redirect("/contact");
}
