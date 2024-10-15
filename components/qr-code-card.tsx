import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeCardProps {
  data: {
    networkName: string;
    password: string;
    securityType: string;
    backgroundColor: string;
    label: string;
    brandName: string;
  };
}

export default function QRCodeCard({ data }: QRCodeCardProps) {
  const qrCodeValue = `WIFI:S:${data.networkName};T:${data.securityType};P:${data.password};;`;

  return (
    <Card
      className="w-full max-w-sm mx-auto"
      style={{ backgroundColor: data.backgroundColor }}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-2">
          {data.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="bg-white w-full aspect-square mb-4 p-4">
          <QRCodeSVG value={qrCodeValue} size={256} />
        </div>
        <div className="text-sm flex flex-col items-end">
          <div className="font-medium">{data.brandName}</div>
          <div className="text-muted-foreground">by postable</div>
        </div>
      </CardContent>
    </Card>
  );
}
