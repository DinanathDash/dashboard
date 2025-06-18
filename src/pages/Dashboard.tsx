import { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const data = [
  { name: 'Jan', users: 4000, revenue: 2400 },
  { name: 'Feb', users: 3000, revenue: 1398 },
  { name: 'Mar', users: 2000, revenue: 9800 },
  { name: 'Apr', users: 2780, revenue: 3908 },
  { name: 'May', users: 1890, revenue: 4800 },
  { name: 'Jun', users: 2390, revenue: 3800 },
  { name: 'Jul', users: 3490, revenue: 4300 },
];

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon?: React.ReactNode;
}

const StatCard = ({ title, value, description, icon }: StatCardProps) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Card className="cursor-pointer overflow-hidden border-border/50 bg-card shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/80 to-primary/30 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-primary">{title}</CardTitle>
          {icon && <div className="h-4 w-4 text-primary/70">{icon}</div>}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </CardContent>
      </Card>
    </HoverCardTrigger>
    <HoverCardContent className="w-80 bg-popover border border-border shadow-lg">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-primary">{title}</h4>
        <p className="text-sm text-popover-foreground">
          Detailed statistics for {title.toLowerCase()}.
          {title === 'Total Users' && ' View user demographics, engagement metrics, and growth trends.'}
          {title === 'Revenue' && ' Analyze sales performance, conversion rates, and financial projections.'}
          {title === 'Tasks' && ' Monitor task completion rates, assignments, and productivity metrics.'}
          {title === 'Projects' && ' Track project deadlines, resource allocation, and delivery timelines.'}
        </p>
      </div>
    </HoverCardContent>
  </HoverCard>
);

export default function Dashboard() {
  const [chartData] = useState(data);

  return (
    <div className="flex-1 space-y-6 p-1 w-full">
      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="1,245" description="+12% from last month" />
        <StatCard title="Revenue" value="$42,900" description="+8% from last month" />
        <StatCard title="Tasks" value="284" description="32 completed today" />
        <StatCard title="Projects" value="12" description="3 delivered this month" />
      </div>
        
      {/* Chart */}
      <Card className="border border-border/50 shadow-sm w-full overflow-hidden">
        <CardHeader className="pb-3 border-b border-border/30">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <CardTitle className="text-lg text-foreground font-semibold">Monthly Revenue & User Growth</CardTitle>
              <CardDescription className="text-muted-foreground">Performance metrics for the current year</CardDescription>
            </div>
            <div className="text-sm text-muted-foreground hidden sm:block">
              Current year performance
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-80 pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false}
                stroke="var(--border)"
                opacity={0.6} 
              />
              <XAxis 
                dataKey="name" 
                stroke="var(--muted-foreground)" 
                tick={{ fill: "var(--muted-foreground)" }}
                tickLine={{ stroke: "var(--border)" }}
                axisLine={{ stroke: "var(--border)" }}
              />
              <YAxis 
                stroke="var(--muted-foreground)" 
                tick={{ fill: "var(--muted-foreground)" }}
                tickLine={{ stroke: "var(--border)" }}
                axisLine={{ stroke: "var(--border)" }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "var(--popover)",
                  color: "var(--popover-foreground)",
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  border: '1px solid var(--border)',
                  padding: '8px 12px'
                }}
                labelStyle={{
                  fontWeight: 'bold',
                  marginBottom: '4px',
                  color: "var(--popover-foreground)"
                }}
              />
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.7}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.7}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="users" 
                stackId="1" 
                stroke="#6366f1" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorUsers)" 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stackId="2" 
                stroke="#22c55e" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
