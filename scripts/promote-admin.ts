import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient, UserRole } from "@prisma/client";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(fileName: string) {
  const filePath = resolve(process.cwd(), fileName);

  if (!existsSync(filePath)) {
    return;
  }

  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const rawValue = trimmed.slice(separatorIndex + 1).trim();
    const value = rawValue.replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function maskEmail(email: string) {
  const [localPart, domain] = email.split("@");

  if (!localPart || !domain) {
    return "***";
  }

  const visibleLocal = localPart.length <= 2 ? localPart[0] : localPart.slice(0, 2);

  return `${visibleLocal}${"*".repeat(Math.max(localPart.length - visibleLocal.length, 3))}@${domain}`;
}

async function main() {
  loadEnvFile(".env.local");
  loadEnvFile(".env");

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const databaseUrl = process.env.DATABASE_URL;

  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is required. Add ADMIN_EMAIL to .env.local before running this script.");
  }

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required. Check your local environment variables.");
  }

  const adapter = new PrismaNeon({ connectionString: databaseUrl });
  const prisma = new PrismaClient({ adapter });

  try {
    const user = await prisma.user.findUnique({
      where: { email: adminEmail },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      const recentUsers = await prisma.user.findMany({
        select: {
          email: true,
          role: true,
          accounts: {
            select: {
              provider: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      });

      console.log(`Target admin email: ${maskEmail(adminEmail)}`);

      if (recentUsers.length > 0) {
        console.log("Recent users in DB:");

        for (const recentUser of recentUsers) {
          const providers = recentUser.accounts.map((account) => account.provider).join(", ") || "-";
          console.log(
            `- ${maskEmail(recentUser.email ?? "")} / role=${recentUser.role} / providers=${providers}`,
          );
        }
      }

      throw new Error("User was not found. Check ADMIN_EMAIL or sign in with Google first.");
    }

    if (user.role === UserRole.ADMIN) {
      console.log(`Admin already exists: ${maskEmail(user.email ?? adminEmail)}`);
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { role: UserRole.ADMIN },
    });

    console.log(`Promoted to ADMIN: ${maskEmail(user.email ?? adminEmail)}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : "Unknown error";
  console.error(`Admin promotion failed: ${message}`);
  process.exit(1);
});
