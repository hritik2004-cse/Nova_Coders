"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

export function ChartAreaInteractive() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          Chart will be displayed here
        </div>
      </CardContent>
    </Card>
  )
}