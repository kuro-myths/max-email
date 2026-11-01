import type {Metadata} from "next";import "./globals.css";
export const metadata:Metadata={title:"Max Email",description:"Unified multi-provider inbox"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="id"><body>{children}</body></html>}
