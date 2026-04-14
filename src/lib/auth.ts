import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins: ["http://localhost:4000"],
    user:{
      additionalFields:{
        role:{
          type:"string",
          defaultValue:"user",
          required: false
        },
        phone:{
          type:"string",
          required: false,
        },
        status:{
          type:"string",
          defaultValue: "ACTIVE",
          required: false
        }
      }
    },
     emailAndPassword: { 
    enabled: true, 
  }, 
});