import { Metadata } from "next";
import { AccountView } from "@/components/shop";

export const metadata: Metadata = {
  title: "Account - Shop",
  description: "Manage your Shop account, profile, orders, and saved preferences.",
};

export default function AccountPage() {
  return <AccountView />;
}
