import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

// Sample data
const monthlyData = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
  { name: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
  { name: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
  { name: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
  { name: 'Jul', revenue: 3490, expenses: 4300, profit: -810 },
];

const pieData = [
  { name: 'Product A', value: 400 },
  { name: 'Product B', value: 300 },
  { name: 'Product C', value: 300 },
  { name: 'Product D', value: 200 },
];

// Colors that work well in both light and dark modes
const COLORS = ['#4f46e5', '#0ea5e9', '#f59e0b', '#ef4444'];

export default function Charts() {
  const { mode } = useTheme();
  const [data] = useState({
    monthly: monthlyData,
    pie: pieData,
  });

  // Theme-aware colors
  const axisColor = mode === 'dark' ? '#94a3b8' : '#64748b'; // slate-400 for dark, slate-500 for light
  const gridColor = mode === 'dark' ? 'rgba(148, 163, 184, 0.15)' : 'rgba(100, 116, 139, 0.15)';
  const tooltipBg = mode === 'dark' ? 'hsl(220 10% 15%)' : 'hsl(0 0% 100%)';
  const tooltipBorder = mode === 'dark' ? 'hsl(220 10% 25%)' : 'hsl(0 0% 90%)';
  const tooltipText = mode === 'dark' ? 'hsl(0 0% 99%)' : 'hsl(0 0% 9%)';

  return (
    <div className="flex-1 space-y-6 p-4">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Revenue Line Chart */}
        <Card className="border-border/50 shadow-md shadow-primary/5 overflow-hidden">
          <CardHeader className="pb-3 border-b border-border/30 px-6">
            <CardTitle className="text-lg text-foreground font-semibold">Monthly Revenue</CardTitle>
            <CardDescription>Revenue trends over the past 7 months</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.monthly}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  padding={{ left: 10, right: 10 }} 
                  tick={{ fill: axisColor }}
                  stroke={axisColor}
                />
                <YAxis 
                  tick={{ fill: axisColor }}
                  stroke={axisColor}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: `1px solid ${tooltipBorder}`,
                    color: tooltipText
                  }}
                  itemStyle={{ color: tooltipText }}
                  labelStyle={{ color: tooltipText }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px' }} 
                  formatter={(value) => <span style={{ color: axisColor }}>{value}</span>}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#4f46e5" 
                  strokeWidth={2}
                  activeDot={{ r: 8, fill: '#4f46e5', stroke: mode === 'dark' ? '#1e1e2f' : '#ffffff', strokeWidth: 2 }}
                  dot={{ r: 4, fill: '#4f46e5', stroke: mode === 'dark' ? '#1e1e2f' : '#ffffff', strokeWidth: 2 }}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#0ea5e9" 
                  strokeWidth={2}
                  activeDot={{ r: 8, fill: '#0ea5e9', stroke: mode === 'dark' ? '#1e1e2f' : '#ffffff', strokeWidth: 2 }}
                  dot={{ r: 4, fill: '#0ea5e9', stroke: mode === 'dark' ? '#1e1e2f' : '#ffffff', strokeWidth: 2 }}
                  fillOpacity={1} 
                  fill="url(#colorExpenses)" 
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Profit Bar Chart */}
        <Card className="border-border/50 shadow-md shadow-primary/5 overflow-hidden">
          <CardHeader className="pb-3 border-b border-border/30 px-6">
            <CardTitle className="text-lg text-foreground font-semibold">Monthly Profit</CardTitle>
            <CardDescription>Profit/loss analysis for each month</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.monthly}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  padding={{ left: 10, right: 10 }} 
                  tick={{ fill: axisColor }}
                  stroke={axisColor}
                />
                <YAxis 
                  tick={{ fill: axisColor }}
                  stroke={axisColor}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: `1px solid ${tooltipBorder}`,
                    color: tooltipText
                  }}
                  itemStyle={{ color: tooltipText }}
                  labelStyle={{ color: tooltipText }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px' }} 
                  formatter={(value) => <span style={{ color: axisColor }}>{value}</span>}
                />
                <Bar 
                  dataKey="profit" 
                  fill="url(#colorProfit)" 
                  radius={[4, 4, 0, 0]} 
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Product Distribution Pie Chart */}
        <Card className="border-border/50 shadow-md shadow-primary/5 overflow-hidden">
          <CardHeader className="pb-3 border-b border-border/30 px-6">
            <CardTitle className="text-lg text-foreground font-semibold">Product Distribution</CardTitle>
            <CardDescription>Sales distribution by product category</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.pie}
                  cx="50%"
                  cy="45%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                  strokeWidth={1}
                  stroke="var(--background)"
                >
                  {data.pie.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: `1px solid ${tooltipBorder}`,
                    color: tooltipText
                  }}
                  itemStyle={{ color: tooltipText }}
                  labelStyle={{ color: tooltipText }}
                />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value) => <span style={{ color: axisColor }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Stacked Revenue and Expenses */}
        <Card className="border-border/50 shadow-md shadow-primary/5 overflow-hidden">
          <CardHeader className="pb-3 border-b border-border/30 px-6">
            <CardTitle className="text-lg text-foreground font-semibold">Revenue vs Expenses</CardTitle>
            <CardDescription>Comparative analysis of income and expenditure</CardDescription>
          </CardHeader>
          <CardContent className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data.monthly}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 10,
                }}
              >
                <defs>
                  <linearGradient id="colorStacked1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.2}/>
                  </linearGradient>
                  <linearGradient id="colorStacked2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  padding={{ left: 10, right: 10 }} 
                  tick={{ fill: axisColor }}
                  stroke={axisColor}
                />
                <YAxis 
                  tick={{ fill: axisColor }}
                  stroke={axisColor}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: tooltipBg,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: `1px solid ${tooltipBorder}`,
                    color: tooltipText
                  }}
                  itemStyle={{ color: tooltipText }}
                  labelStyle={{ color: tooltipText }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '10px' }} 
                  formatter={(value) => <span style={{ color: axisColor }}>{value}</span>}
                />
                <Bar dataKey="revenue" stackId="a" fill="url(#colorStacked1)" radius={[4, 4, 0, 0]} barSize={35} />
                <Bar dataKey="expenses" stackId="a" fill="url(#colorStacked2)" radius={[4, 4, 0, 0]} barSize={35} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
