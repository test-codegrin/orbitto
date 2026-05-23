import RegisterForm from "@/components/admin/RegisterForm";
import { buildNoIndexMetadata } from "@/libs/seo";

export const metadata = buildNoIndexMetadata("Admin Registration");

export default function AdminRegisterPage() {
  return <RegisterForm />;
}
