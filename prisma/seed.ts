import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  {
    username: "test",
    password: "$2a$08$lif24rJMkfYoCsohMVHFYeeQzFkbYvm3WmmppsH4aHKdLHKclAIfO",
  },
];

async function main() {
  const upserts: any = users.map((user) =>
    prisma.user.upsert({
      where: { username: user.username },
      create: user,
      update: {},
    })
  );

  await prisma.$transaction([...upserts]);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
