import LoginForm from "@/components/admin/LoginForm";
import { buildNoIndexMetadata } from "@/libs/seo";

export const metadata = buildNoIndexMetadata("Admin Login");

export default function LoginPage() {
  return <LoginForm />;
}
