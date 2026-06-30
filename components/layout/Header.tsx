import { auth } from "@/auth";
import { HeaderClient } from "@/components/layout/HeaderClient";

export async function Header() {
  const session = await auth();
  const user = session?.user
    ? {
        name: session.user.name ?? null,
        email: session.user.email ?? null,
        image: session.user.image ?? null,
      }
    : null;

  return <HeaderClient user={user} />;
}
