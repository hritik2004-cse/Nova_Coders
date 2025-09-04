"use client"

import React from 'react'
import { SidebarInset, SidebarTrigger } from '@/Components/ui/sidebar'
import { Separator } from '@/Components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/Components/ui/breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Progress } from '@/Components/ui/progress'
import { Badge } from '@/Components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar'
import {
  IconCalendar,
  IconClock,
  IconTrophy,
  IconTarget,
  IconBook,
  IconCode,
  IconUsers,
  IconMessage,
  IconTrendingUp,
  IconCircleCheck,
  IconAlertCircle
} from '@tabler/icons-react'

export default function InternDashboard() {
  // Mock data for the intern dashboard
  const internInfo = {
    name: "John Doe",
    internshipType: "Frontend Development",
    duration: "6 months",
    startDate: "January 15, 2024",
    mentor: "Sarah Johnson",
    progress: 65,
    daysRemaining: 89,
    completedTasks: 12,
    totalTasks: 18
  }

  const weeklyGoals = [
    { title: "Complete React Hook Tutorial", status: "completed" },
    { title: "Submit Weekly Report", status: "pending" },
    { title: "Code Review with Mentor", status: "in-progress" },
    { title: "Team Meeting Presentation", status: "pending" }
  ]

  const recentActivities = [
    { action: "Completed", item: "CSS Grid Layout Assignment", time: "2 hours ago" },
    { action: "Submitted", item: "Weekly Progress Report", time: "1 day ago" },
    { action: "Attended", item: "Team Standup Meeting", time: "2 days ago" },
    { action: "Started", item: "React Components Project", time: "3 days ago" }
  ]

  const upcomingEvents = [
    { title: "Mentor 1:1 Meeting", date: "Today", time: "2:00 PM" },
    { title: "Code Review Session", date: "Tomorrow", time: "10:00 AM" },
    { title: "Team Sprint Planning", date: "Friday", time: "9:00 AM" },
    { title: "Monthly Intern Presentation", date: "Next Week", time: "3:00 PM" }
  ]

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
                <BreadcrumbPage>Intern Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Welcome Section */}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white p-6 md:col-span-2">
              <div className="flex items-center justify-between h-full">
                <div>
                  <h1 className="text-2xl font-bold mb-2">Welcome back, {internInfo.name}!</h1>
                  <p className="text-blue-100 mb-4">{internInfo.internshipType} Intern</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <IconCalendar className="w-4 h-4" />
                      <span>{internInfo.daysRemaining} days remaining</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <IconTrendingUp className="w-4 h-4" />
                      <span>{internInfo.progress}% completed</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{internInfo.progress}%</div>
                  <div className="text-blue-100">Overall Progress</div>
                </div>
              </div>
            </div>
            
            {/* Quick Stats Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconCircleCheck className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Tasks Completed</span>
                  </div>
                  <span className="font-semibold">{internInfo.completedTasks}/{internInfo.totalTasks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconClock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Duration</span>
                  </div>
                  <span className="font-semibold">{internInfo.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconUsers className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Mentor</span>
                  </div>
                  <span className="font-semibold text-sm">{internInfo.mentor}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Progress Overview */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
                <CardDescription>Your internship journey so far</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{internInfo.progress}%</span>
                    </div>
                    <Progress value={internInfo.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <IconTrophy className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="font-semibold text-green-700">Achievements</div>
                      <div className="text-2xl font-bold text-green-600">8</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <IconBook className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-semibold text-blue-700">Courses</div>
                      <div className="text-2xl font-bold text-blue-600">12</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Goals</CardTitle>
                <CardDescription>This week&apos;s objectives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyGoals.map((goal, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {goal.status === 'completed' ? (
                        <IconCircleCheck className="w-4 h-4 text-green-500" />
                      ) : goal.status === 'in-progress' ? (
                        <IconClock className="w-4 h-4 text-blue-500" />
                      ) : (
                        <IconAlertCircle className="w-4 h-4 text-gray-400" />
                      )}
                      <span className={`text-sm ${goal.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                        {goal.title}
                      </span>
                      <Badge 
                        variant={goal.status === 'completed' ? 'default' : goal.status === 'in-progress' ? 'secondary' : 'outline'}
                        className="ml-auto text-xs"
                      >
                        {goal.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your latest actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span> {activity.item}
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your schedule ahead</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <IconCalendar className="w-4 h-4 text-gray-600" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <IconCode className="w-6 h-6 text-blue-600" />
                    <span className="text-xs font-medium">Submit Code</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <IconBook className="w-6 h-6 text-green-600" />
                    <span className="text-xs font-medium">View Tasks</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                    <IconMessage className="w-6 h-6 text-purple-600" />
                    <span className="text-xs font-medium">Message Mentor</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                    <IconTarget className="w-6 h-6 text-orange-600" />
                    <span className="text-xs font-medium">Set Goals</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    )
  }
