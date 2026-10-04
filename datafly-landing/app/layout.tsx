import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataFly | Precision Drone Mapping & Geospatial Data",
  description:
    "DataFly provides professional drone mapping, agricultural data, and 3D geospatial models for land, infrastructure, and development sites.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#121212] text-white antialiased">{children}</body>
    </html>
  );
}