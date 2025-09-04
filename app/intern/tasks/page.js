"use client"

import React, { useState } from 'react'
import { SidebarInset, SidebarTrigger } from '@/Components/ui/sidebar'
import { Separator } from '@/Components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/Components/ui/breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs'
import {
  IconClock,
  IconCircleCheck,
  IconAlertCircle,
  IconCalendar,
  IconUser,
  IconFlag,
  IconPlayerPlay,
  IconCheck
} from '@tabler/icons-react'

export default function InternTasks() {
  const [tasks] = useState([
    {
      id: 1,
      title: "Complete React Hooks Tutorial",
      description: "Learn useState, useEffect, and custom hooks",
      status: "completed",
      priority: "high",
      dueDate: "2024-09-01",
      assignedBy: "Sarah Johnson",
      estimatedHours: 8,
      completedHours: 8,
      category: "learning"
    },
    {
      id: 2,
      title: "Build User Profile Component",
      description: "Create a reusable user profile component with avatar, name, and bio",
      status: "in-progress",
      priority: "medium",
      dueDate: "2024-09-05",
      assignedBy: "Mike Wilson",
      estimatedHours: 12,
      completedHours: 6,
      category: "development"
    },
    {
      id: 3,
      title: "Write Weekly Progress Report",
      description: "Document this week&apos;s learning and achievements",
      status: "pending",
      priority: "low",
      dueDate: "2024-09-06",
      assignedBy: "Sarah Johnson",
      estimatedHours: 2,
      completedHours: 0,
      category: "documentation"
    },
    {
      id: 4,
      title: "Code Review: Navigation Component",
      description: "Review and provide feedback on the new navigation component",
      status: "pending",
      priority: "high",
      dueDate: "2024-09-04",
      assignedBy: "Alex Rodriguez",
      estimatedHours: 3,
      completedHours: 0,
      category: "review"
    },
    {
      id: 5,
      title: "Prepare Monthly Presentation",
      description: "Create slides showcasing projects and learning progress",
      status: "in-progress",
      priority: "medium",
      dueDate: "2024-09-15",
      assignedBy: "Sarah Johnson",
      estimatedHours: 6,
      completedHours: 2,
      category: "presentation"
    }
  ])

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <IconCircleCheck className="w-4 h-4 text-green-500" />
      case 'in-progress':
        return <IconPlayerPlay className="w-4 h-4 text-blue-500" />
      case 'pending':
        return <IconClock className="w-4 h-4 text-gray-400" />
      default:
        return <IconAlertCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'learning':
        return 'bg-blue-100 text-blue-800'
      case 'development':
        return 'bg-purple-100 text-purple-800'
      case 'documentation':
        return 'bg-orange-100 text-orange-800'
      case 'review':
        return 'bg-indigo-100 text-indigo-800'
      case 'presentation':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filterTasks = (status) => {
    if (status === 'all') return tasks
    return tasks.filter(task => task.status === status)
  }

  const TaskCard = ({ task }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}
            <CardTitle className="text-lg">{task.title}</CardTitle>
          </div>
          <div className="flex gap-2">
            <Badge className={getPriorityColor(task.priority)}>
              <IconFlag className="w-3 h-3 mr-1" />
              {task.priority}
            </Badge>
            <Badge variant="outline" className={getCategoryColor(task.category)}>
              {task.category}
            </Badge>
          </div>
        </div>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <IconCalendar className="w-4 h-4 text-gray-500" />
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <IconUser className="w-4 h-4 text-gray-500" />
                <span>{task.assignedBy}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{task.completedHours}h / {task.estimatedHours}h</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all" 
                style={{ width: `${(task.completedHours / task.estimatedHours) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            {task.status === 'pending' && (
              <Button size="sm" className="flex-1">
                <IconPlayerPlay className="w-4 h-4 mr-1" />
                Start Task
              </Button>
            )}
            {task.status === 'in-progress' && (
              <Button size="sm" className="flex-1">
                <IconCheck className="w-4 h-4 mr-1" />
                Mark Complete
              </Button>
            )}
            {task.status === 'completed' && (
              <Button size="sm" variant="outline" className="flex-1" disabled>
                <IconCircleCheck className="w-4 h-4 mr-1" />
                Completed
              </Button>
            )}
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <SidebarInset>
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Tasks & Assignments</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-full">
                  <IconClock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{filterTasks('pending').length}</p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <IconPlayerPlay className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{filterTasks('in-progress').length}</p>
                  <p className="text-sm text-gray-600">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-full">
                  <IconCircleCheck className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{filterTasks('completed').length}</p>
                  <p className="text-sm text-gray-600">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-full">
                  <IconAlertCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{tasks.length}</p>
                  <p className="text-sm text-gray-600">Total Tasks</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Tasks</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterTasks('pending').map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterTasks('in-progress').map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filterTasks('completed').map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SidebarInset>
  )
}
