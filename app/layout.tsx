import "./global.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import BootstrapClient from "../components/BootstrapClient";

export const metadata = {
  title: "Ri.fiuto",
  description: "Software gestionale pre-rentri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="h-100">
      <body className="h-100">
        {children}
      </body>
      <BootstrapClient />
    </html>
  );
}
