"use client";

import {
  Users,
  CheckCircle,
  Star,
  Flame,
  TrendingUp,
  ArrowUpRight,
  MoreVertical,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    label: "Total Interviews",
    value: "24",
    icon: Users,
    color: "text-blue-400",
  },
  {
    label: "Completed",
    value: "18",
    icon: CheckCircle,
    color: "text-teal-400",
  },
  { label: "Avg. Score", value: "76%", icon: Star, color: "text-amber-400" },
  {
    label: "Current Streak",
    value: "5 days",
    icon: Flame,
    color: "text-orange-400",
  },
];

const performanceData = [
  { name: "INT 1", score: 30 },
  { name: "INT 2", score: 45 },
  { name: "INT 3", score: 38 },
  { name: "INT 4", score: 62 },
  { name: "INT 5", score: 55 },
  { name: "INT 6", score: 78 },
  { name: "INT 7", score: 72 },
];

const skillScores = [
  { name: "System Design", score: 82 },
  { name: "Behavioral", score: 74 },
  { name: "Problem Solving", score: 68 },
  { name: "Communication", score: 85 },
  { name: "Technical Depth", score: 71 },
];

const recentInterviews = [
  {
    role: "Software Engineer",
    company: "Google",
    type: "Technical",
    level: "Senior",
    date: "Mar 18, 2025",
    score: 88,
    status: "COMPLETED",
  },
  {
    role: "Product Manager",
    company: "Meta",
    type: "Behavioral",
    level: "Senior",
    date: "Mar 15, 2025",
    score: 74,
    status: "COMPLETED",
  },
  {
    role: "Frontend Developer",
    company: "Amazon",
    type: "Technical",
    level: "Mid",
    date: "Mar 12, 2025",
    score: 61,
    status: "COMPLETED",
  },
  {
    role: "Backend Engineer",
    company: "Netflix",
    type: "Technical",
    level: "Senior",
    date: "Mar 10, 2025",
    score: 90,
    status: "COMPLETED",
  },
  {
    role: "Data Scientist",
    company: "Uber",
    type: "Technical",
    level: "Junior",
    date: "Mar 5, 2025",
    score: 55,
    status: "COMPLETED",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-(--surface-container-low) border border-(--outline-variant)/10 p-6 rounded-2xl hover:border-(--primary)/20 transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-3 rounded-xl bg-(--surface-container-high) ${stat.color}`}
              >
                <stat.icon size={20} />
              </div>
              <button className="text-(--on-surface-variant) hover:text-(--on-surface)">
                <MoreVertical size={16} />
              </button>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-(--on-surface-variant)">
                {stat.label}
              </span>
              <span className="text-3xl font-bold text-(--on-surface) mt-1">
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        {/* <div className="lg:col-span-2 bg-(--surface-container-low) border border-(--outline-variant)/10 p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-(--on-surface)">Performance Over Time</h3>
              <p className="text-sm text-(--on-surface-variant)">Based on your last 7 interview sessions</p>
            </div>
            <div className="flex items-center gap-2 bg-(--surface-container-high) px-3 py-1.5 rounded-lg text-xs font-medium text-(--on-surface-variant)">
               <TrendingUp size={14} className="text-(--primary)" />
               <span>+12% vs last month</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'var(--on-surface-variant)', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: 'var(--on-surface-variant)', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--surface-container-highest)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: '#fff'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="var(--primary)" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: 'var(--primary)', strokeWidth: 2, stroke: 'var(--surface)' }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div> */}

        {/* Skill Scores */}
        {/* <div className="bg-(--surface-container-low) border border-(--outline-variant)/10 p-8 rounded-2xl">
          <h3 className="text-lg font-bold text-(--on-surface) mb-8">
            Skill Scores
          </h3>
          <div className="space-y-6">
            {skillScores.map((skill, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-(--on-surface-variant) font-medium">
                    {skill.name}
                  </span>
                  <span className="text-(--primary) font-bold">
                    {skill.score}%
                  </span>
                </div>
                <div className="h-2 w-full bg-(--surface-container-highest) rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-gradient rounded-full"
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Recent Interviews Table */}
      {/* <div className="bg-(--surface-container-low) border border-(--outline-variant)/10 rounded-2xl overflow-hidden">
        <div className="p-8 pb-4 flex items-center justify-between border-b border-(--outline-variant)/5">
          <h3 className="text-lg font-bold text-(--on-surface)">
            Recent Interviews
          </h3>
          <button className="text-sm font-bold text-(--primary) hover:underline flex items-center gap-1">
            View All <ArrowUpRight size={14} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-(--on-surface-variant) border-b border-(--outline-variant)/10">
                <th className="px-8 py-5 font-bold">Role & Company</th>
                <th className="px-8 py-5 font-bold">Type · Level</th>
                <th className="px-8 py-5 font-bold">Date</th>
                <th className="px-8 py-5 font-bold">Score</th>
                <th className="px-8 py-5 font-bold">Status</th>
                <th className="px-8 py-5 font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--outline-variant)/5">
              {recentInterviews.map((interview, i) => (
                <tr
                  key={i}
                  className="hover:bg-(--surface-container-high)/50 transition-colors group"
                >
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-bold text-(--on-surface)">
                        {interview.role} @
                      </span>
                      <span className="text-sm text-(--on-surface-variant)">
                        {interview.company}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-(--on-surface)">
                        {interview.type}
                      </span>
                      <span className="text-xs text-(--on-surface-variant)">
                        {interview.level}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-(--on-surface-variant)">
                    {interview.date}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span
                      className={`text-lg font-bold ${interview.score >= 80 ? "text-teal-400" : interview.score >= 60 ? "text-amber-400" : "text-rose-400"}`}
                    >
                      {interview.score}%
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-teal-400/10 text-teal-400 border border-teal-400/20">
                      {interview.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <button className="text-sm font-bold text-(--on-surface-variant) hover:text-(--on-surface) hover:bg-(--surface-container-highest) px-4 py-2 rounded-lg transition-all border border-(--outline-variant)/10">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}
