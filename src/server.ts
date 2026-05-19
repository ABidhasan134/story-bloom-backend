import app from "./app.js";
import { prisma } from "./lib/prisma.js";


const PORT = process.env.PORT || 3000;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
