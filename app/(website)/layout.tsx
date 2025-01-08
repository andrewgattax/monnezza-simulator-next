import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header>header sito principale</header>
      <main>{children}</main>
      <footer>footer sito principale</footer>
    </div>
  );
}
