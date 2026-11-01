import {createCipheriv,createDecipheriv,randomBytes} from "node:crypto";
const key=()=>Buffer.from(process.env.TOKEN_ENCRYPTION_KEY||"","base64");
export function encrypt(s:string){const k=key();if(k.length!==32)throw Error("TOKEN_ENCRYPTION_KEY must decode to 32 bytes");const iv=randomBytes(12),c=createCipheriv("aes-256-gcm",k,iv),d=Buffer.concat([c.update(s,"utf8"),c.final()]);return [iv.toString("base64"),c.getAuthTag().toString("base64"),d.toString("base64")].join(".")}
export function decrypt(s:string){const [iv,tag,data]=s.split("."),d=createDecipheriv("aes-256-gcm",key(),Buffer.from(iv,"base64"));d.setAuthTag(Buffer.from(tag,"base64"));return Buffer.concat([d.update(Buffer.from(data,"base64")),d.final()]).toString("utf8")}
