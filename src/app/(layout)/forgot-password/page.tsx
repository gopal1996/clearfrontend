import { redirect } from "next/navigation";
import { routes } from "@/lib/common/routes";
import { getLoggedInUser } from "@/lib/server/actions/auth";

export const dynamic = "force-dynamic";

export default async function ForgotPasswordPage() {
  const user = await getLoggedInUser();

  if (user) {
    redirect(routes.profile);
  }

  return <>{/* TBD */}</>;
}
