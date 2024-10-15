'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { Paintbrush } from 'lucide-react'
import { useMemo, useState } from 'react'

interface GradientPickerProps {
  background: string
  setBackground: (value: string) => void
  className?: string
}

export function GradientPicker({ background, setBackground, className }: GradientPickerProps) {
  const solids = ['#E2E2E2', '#ff75c3', '#ffa647', '#ffe83f', '#9fff5b', '#70e2ff', '#cd93ff', '#09203f']
  const gradients = [
    'linear-gradient(to top left,#accbee,#e7f0fd)',
    'linear-gradient(to top left,#d5d4d0,#d5d4d0,#eeeeec)',
    'linear-gradient(to top left,#000000,#434343)',
    'linear-gradient(to top left,#09203f,#537895)',
    'linear-gradient(to top left,#ac32e4,#7918f2,#4801ff)',
    'linear-gradient(to top left,#f953c6,#b91d73)',
    'linear-gradient(to top left,#ee0979,#ff6a00)',
    'linear-gradient(to top left,#f00000,#dc281e)',
  ]

  const defaultTab = useMemo(() => {
    if (background.includes('url')) return 'image'
    if (background.includes('gradient')) return 'gradient'
    return 'solid'
  }, [background])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-[220px] justify-start text-left font-normal', className)}
        >
          <div className="w-full flex items-center gap-2">
            <Paintbrush className="h-4 w-4" />
            <div className="w-full flex items-center gap-2">
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
              <div className="truncate flex-1">
                {background === '' ? 'Pick a color' : background}
              </div>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full mb-4">
            <TabsTrigger className="flex-1" value="solid">
              Solid
            </TabsTrigger>
            <TabsTrigger className="flex-1" value="gradient">
              Gradient
            </TabsTrigger>
          </TabsList>
          <TabsContent value="solid" className="flex flex-wrap gap-1 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>
          <TabsContent value="gradient" className="mt-0">
            <div className="flex flex-wrap gap-1 mb-2">
              {gradients.map((s) => (
                <div
                  key={s}
                  style={{ background: s }}
                  className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                  onClick={() => setBackground(s)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Input
          id="custom"
          value={background}
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  )
}
