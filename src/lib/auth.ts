import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.APP_USER_GMAIL,
    pass: process.env.APP_PASSWORD_GMAIL,
  },
});
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: ["http://localhost:4000","http://localhost:3000","http://localhost:5000"],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationURL = `${process.env.FONTEND_APP_URL}/verify-email/${token}`;
        const info = await transporter.sendMail({
          from: '"Story Bloom" <storyBloom@gmail.com>', // sender address
          to: "abeydhasan134@gmail.com", // list of recipients
          subject: "story Blooming", // subject line
          text: "Hello world?", // plain text body
          html: `<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#6366f1; padding:20px; text-align:center; color:#ffffff;">
              <h1 style="margin:0;">🌸 Story Bloom</h1>
            </td> 
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px; color:#333333;">
              <h2 style="margin-top:0;">Verify Your Email Address</h2>

              <p>Hello,</p>

              <p>
                Welcome to <strong>Story Bloom</strong>!  
                Please confirm your email address by clicking the button below.
              </p>

              <!-- Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href="{{VERIFICATION_URL}}"
                   style="background:#6366f1; color:#ffffff; padding:14px 28px; text-decoration:none; border-radius:6px; font-weight:bold; display:inline-block;">
                  Verify Email
                </a>
              </div>

              <p>If the button doesn't work, copy and paste this link:</p>

              <p style="word-break:break-all; color:#6366f1;">
                {{VERIFICATION_URL}}
              </p>

              <p>This link will expire soon for security reasons.</p>

              <p>Thanks,<br/>Story Bloom Team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; text-align:center; padding:15px; font-size:12px; color:#888;">
              © 2026 Story Bloom. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>`,
        });

        console.log("Message sent: %s", info.messageId);
      } catch (error) {
        console.log("*****Email sent for verifytion of story bloom app******");
        throw error;
      }
    },
    socialProviders: {
      google: {
        prompt: "select_account consent",
        accessType: "offline", 
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
    },
  },
});
