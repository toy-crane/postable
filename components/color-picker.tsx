"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [selectedTab, setSelectedTab] = useState<"solid" | "gradient">("solid");

  const solids = [
    "#FFFFFF",
    "#E2E2E2",
    "#ff75c3",
    "#ffa647",
    "#ffe83f",
    "#9fff5b",
    "#70e2ff",
    "#cd93ff",
  ];
  const gradients = [
    "linear-gradient(to top left,#accbee,#e7f0fd)",
    "linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)",
    "linear-gradient(to top left,#000000,#434343)",
    "linear-gradient(to top left,#09203f,#537895)",
    "linear-gradient(to top left,#AC32E4,#7918F2,#4801FF)",
    "linear-gradient(to top left,#f953c6,#b91d73)",
    "linear-gradient(to top left,#ee0979,#ff6a00)",
    "linear-gradient(to top left,#F00000,#DC281E)",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !color && "text-muted-foreground"
          )}
        >
          <div
            className="w-4 h-4 rounded-full mr-2 shrink-0"
            style={{ background: color }}
          />
          {color ? color : "Pick a color"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs
          defaultValue="solid"
          value={selectedTab}
          onValueChange={(value) =>
            setSelectedTab(value as "solid" | "gradient")
          }
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="solid">Solid</TabsTrigger>
            <TabsTrigger value="gradient">Gradient</TabsTrigger>
          </TabsList>
          <TabsContent value="solid" className="mt-3 space-y-2">
            <div className="grid grid-cols-4 gap-2">
              {solids.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="w-10 h-10 rounded-md cursor-pointer active:scale-105"
                  onClick={() => onChange(s)}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="gradient" className="mt-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {gradients.map((g) => (
                <div
                  key={g}
                  style={{ background: g }}
                  className="w-full h-10 rounded-md cursor-pointer active:scale-105"
                  onClick={() => onChange(g)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
}
