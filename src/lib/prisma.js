"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
require("dotenv/config");
var adapter_pg_1 = require("@prisma/adapter-pg");
var prisma_1 = require("../../generated/prisma");
var adapter = new adapter_pg_1.PrismaPg(process.env.DATABASE_URL);
var prisma = new prisma_1.PrismaClient({ adapter: adapter });
exports.prisma = prisma;
