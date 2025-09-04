"use client"

import React from 'react'
import { SidebarInset, SidebarTrigger } from '@/Components/ui/sidebar'
import { Separator } from '@/Components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/Components/ui/breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card'
import { Progress } from '@/Components/ui/progress'
import { Badge } from '@/Components/ui/badge'
import {
  IconTrophy,
  IconCode,
  IconBook,
  IconPresentation,
  IconUsers,
  IconCalendar,
  IconTrendingUp,
  IconTarget,
  IconStar,
  IconCertificate
} from '@tabler/icons-react'

export default function InternProgress() {
  const overallProgress = {
    percentage: 65,
    daysCompleted: 89,
    totalDays: 135,
    skillsAcquired: 12,
    projectsCompleted: 8,
    certificationsEarned: 3
  }

  const skillProgress = [
    { skill: 'HTML/CSS', level: 90, category: 'Frontend' },
    { skill: 'JavaScript', level: 75, category: 'Frontend' },
    { skill: 'React', level: 65, category: 'Frontend' },
    { skill: 'Node.js', level: 45, category: 'Backend' },
    { skill: 'Git/GitHub', level: 80, category: 'Tools' },
    { skill: 'Responsive Design', level: 85, category: 'Frontend' },
    { skill: 'REST APIs', level: 55, category: 'Backend' },
    { skill: 'Testing', level: 30, category: 'Quality' }
  ]

  const achievements = [
    {
      title: 'First Code Commit',
      description: 'Made your first contribution to the project repository',
      date: '2024-01-20',
      icon: IconCode,
      type: 'milestone'
    },
    {
      title: 'React Fundamentals',
      description: 'Completed React basics course with 95% score',
      date: '2024-02-15',
      icon: IconCertificate,
      type: 'certification'
    },
    {
      title: 'Team Player',
      description: 'Collaborated effectively on team project',
      date: '2024-03-01',
      icon: IconUsers,
      type: 'collaboration'
    },
    {
      title: 'Problem Solver',
      description: 'Resolved critical bug in production',
      date: '2024-03-10',
      icon: IconTrophy,
      type: 'achievement'
    },
    {
      title: 'Presentation Pro',
      description: 'Delivered excellent weekly presentation',
      date: '2024-03-15',
      icon: IconPresentation,
      type: 'communication'
    }
  ]

  const weeklyProgress = [
    { week: 'Week 1', hours: 32, tasks: 3, completed: 2 },
    { week: 'Week 2', hours: 35, tasks: 4, completed: 4 },
    { week: 'Week 3', hours: 38, tasks: 5, completed: 3 },
    { week: 'Week 4', hours: 40, tasks: 4, completed: 4 },
    { week: 'Week 5', hours: 36, tasks: 6, completed: 5 },
    { week: 'Week 6', hours: 42, tasks: 5, completed: 5 }
  ]

  const learningGoals = [
    { goal: 'Master React Hooks', progress: 80, target: '100%', deadline: '2024-09-15' },
    { goal: 'Build Full-Stack App', progress: 45, target: '100%', deadline: '2024-10-01' },
    { goal: 'Learn Testing Framework', progress: 25, target: '100%', deadline: '2024-09-30' },
    { goal: 'Improve Code Quality', progress: 60, target: '90%', deadline: '2024-09-20' }
  ]

  const getSkillLevelColor = (level) => {
    if (level >= 80) return 'bg-green-500'
    if (level >= 60) return 'bg-blue-500'
    if (level >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getAchievementIcon = (type) => {
    switch (type) {
      case 'milestone': return IconTarget
      case 'certification': return IconCertificate
      case 'collaboration': return IconUsers
      case 'achievement': return IconTrophy
      case 'communication': return IconPresentation
      default: return IconStar
    }
  }

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
                <BreadcrumbPage>My Progress</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Overall Progress */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconTrendingUp className="w-6 h-6" />
              Overall Internship Progress
            </CardTitle>
            <CardDescription className="text-blue-100">
              Your journey so far - {overallProgress.daysCompleted} of {overallProgress.totalDays} days completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">{overallProgress.percentage}%</span>
                </div>
                <Progress value={overallProgress.percentage} className="h-3 bg-blue-200" />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{overallProgress.skillsAcquired}</div>
                  <div className="text-sm text-blue-100">Skills Acquired</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{overallProgress.projectsCompleted}</div>
                  <div className="text-sm text-blue-100">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{overallProgress.certificationsEarned}</div>
                  <div className="text-sm text-blue-100">Certifications</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Skills Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconCode className="w-5 h-5" />
                Skills Development
              </CardTitle>
              <CardDescription>Your technical skills progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {skillProgress.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{skill.skill}</span>
                        <Badge variant="outline" className="text-xs">
                          {skill.category}
                        </Badge>
                      </div>
                      <span className="text-sm font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all ${getSkillLevelColor(skill.level)}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IconTarget className="w-5 h-5" />
                Learning Goals
              </CardTitle>
              <CardDescription>Current objectives and targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learningGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium">{goal.goal}</span>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                          <IconCalendar className="w-3 h-3" />
                          Due: {new Date(goal.deadline).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-sm font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconTrophy className="w-5 h-5" />
              Achievements & Milestones
            </CardTitle>
            <CardDescription>Your accomplishments during the internship</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement, index) => {
                const IconComponent = getAchievementIcon(achievement.type)
                return (
                  <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <IconComponent className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <IconCalendar className="w-3 h-3" />
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCalendar className="w-5 h-5" />
              Weekly Performance
            </CardTitle>
            <CardDescription>Your weekly hours and task completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weeklyProgress.map((week, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">{week.week}</div>
                    <div className="text-sm text-gray-600">
                      {week.hours} hours logged
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      Tasks: {week.completed}/{week.tasks}
                    </div>
                    <div className="w-20">
                      <Progress value={(week.completed / week.tasks) * 100} className="h-2" />
                    </div>
                    <Badge variant={week.completed === week.tasks ? "default" : "secondary"}>
                      {Math.round((week.completed / week.tasks) * 100)}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  )
}
