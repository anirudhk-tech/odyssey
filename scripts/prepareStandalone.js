import { cpSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const src = join(".next", "static");
const dest = join(".next", "standalone", ".next", "static");

if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
