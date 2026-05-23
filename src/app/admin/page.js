import AdminPanel from "@/components/admin/AdminPanel";
import { buildNoIndexMetadata } from "@/libs/seo";

export const metadata = buildNoIndexMetadata("Admin Panel");

export default function AdminPage() {
  return <AdminPanel />;
}
