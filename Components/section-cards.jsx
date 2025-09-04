"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card"

export function SectionCards() {
  const cards = [
    { title: "Total Users", value: "1,234", change: "+5%" },
    { title: "Active Sessions", value: "456", change: "+12%" },
    { title: "Revenue", value: "$12,345", change: "+8%" },
    { title: "Conversion Rate", value: "3.2%", change: "+0.5%" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">
              {card.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}