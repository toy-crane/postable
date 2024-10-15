import { Metadata } from "next";
import QRCodeGenerator from "@/components/qr-code-generator";

export const metadata: Metadata = {
  title: "Generate QR Code | Postable",
  description: "Generate a customized QR code for your Wi-Fi network",
};

export default function GenerateQRCodePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Generate QR Code</h1>
      <QRCodeGenerator />
    </div>
  );
}
