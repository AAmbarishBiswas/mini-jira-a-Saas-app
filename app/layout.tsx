import Providers from "./providers";
import "./globals.css";

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body className="bg-gray-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}