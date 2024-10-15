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
      className="mx-auto w-[256px]"
      style={{ backgroundColor: data.backgroundColor }}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl flex items-center gap-2 justify-center text-white">
          {data.label}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 flex flex-col gap-4">
        <div className="aspect-square p-2 bg-white rounded-lg flex items-center justify-center">
          <QRCodeSVG value={qrCodeValue} size={200} className="self-center" />
        </div>
        <div className="text-sm flex flex-col">
          <div className="font-medium text-white self-end">
            {data.brandName}
          </div>
          <div className="text-muted-foreground/40 self-end">by postable</div>
        </div>
      </CardContent>
    </Card>
  );
}
