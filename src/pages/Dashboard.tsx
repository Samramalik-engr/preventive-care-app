

import {
  Users,
  ClipboardList,
  Syringe,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Clock,
  Activity,
  ChevronRight,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  screeningCompletionData,
  vaccinationCoverageData,
  aiAlerts,
  recentActivity,
} from '@/data/mockData';

import { useEffect, useState } from "react";
import api from "../services/api";  


const colorMap: Record<string, { bg: string; icon: string; text: string }> = {
  cyan: { bg: 'bg-cyan-50', icon: 'bg-cyan-500', text: 'text-cyan-600' },
  red: { bg: 'bg-red-50', icon: 'bg-red-500', text: 'text-red-600' },
  amber: { bg: 'bg-amber-50', icon: 'bg-amber-500', text: 'text-amber-600' },
  orange: { bg: 'bg-orange-50', icon: 'bg-orange-500', text: 'text-orange-600' },
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-500', text: 'text-emerald-600' },
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-500', text: 'text-blue-600' },
};

export function Dashboard() { 
  const [summary, setSummary] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const summaryRes = await api.get("/dashboard-summary");
        const analyticsRes = await api.get("/analytics");

        setSummary(summaryRes.data);
        setAnalytics(analyticsRes.data);

      } catch (error: any) {
  console.log("ERROR RESPONSE:", error?.response);
  console.log("ERROR DATA:", error?.response?.data);
  console.log("FULL ERROR:", error);
} 

    };

    fetchData();

  }, []);

  console.log("SUMMARY =", summary);
console.log("ANALYTICS =", analytics); 

  if (!summary || !analytics) {
    return <div>Loading...</div>;
  }

  const realStatCards = [
    {
      title: "Total Patients",
      value: summary.total_patients,
      icon: Users,
      trend: "",
      trendUp: true,
      color: "cyan",
    },
    {
      title: "Due Screenings",
      value: summary.due_screenings,
      icon: ClipboardList,
      trend: "",
      trendUp: true,
      color: "amber",
    },
    {
      title: "Vaccines Due",
      value: summary.vaccines_due,
      icon: Syringe,
      trend: "",
      trendUp: true,
      color: "emerald",
    },
  ];

  const riskData = [
    {
      name: "Low",
      value: analytics.risk_distribution.low,
      color: "#22c55e",
    },
    {
      name: "Medium",
      value: analytics.risk_distribution.medium,
      color: "#eab308",
    },
    {
      name: "High",
      value: analytics.risk_distribution.high,
      color: "#ef4444",
    },
  ];

  const bmiData = [
    {
      range: "Underweight",
      count: analytics.bmi_distribution.underweight,
    },
    {
      range: "Normal",
      count: analytics.bmi_distribution.normal,
    },
    {
      range: "Overweight",
      count: analytics.bmi_distribution.overweight,
    },
    {
      range: "Obese",
      count: analytics.bmi_distribution.obese,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {realStatCards.map((stat) => (
          <Card key={stat.title} className="overflow-hidden card-hover">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${colorMap[stat.color].bg}`}>
                  <stat.icon className={`w-5 h-5 ${colorMap[stat.color].text}`} />
                </div>
                <div className="flex items-center gap-1">
                  {stat.trendUp ? (
                    <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-red-500" />
                  )}
                  <span className={`text-xs font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900">Patient Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              {riskData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-slate-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900">BMI Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bmiData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="range" width={100} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0891b2" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900">Screening Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={screeningCompletionData}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" stackId="a" fill="#22c55e" name="Completed" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="due" stackId="a" fill="#eab308" name="Due" />
                  <Bar dataKey="overdue" stackId="a" fill="#ef4444" name="Overdue" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900">Vaccination Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vaccinationCoverageData.map((vaccine) => (
                <div key={vaccine.name} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-700 font-medium">{vaccine.name}</span>
                    <span className="text-slate-500">{vaccine.covered}%</span>
                  </div>
                  <Progress value={vaccine.covered} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 card-hover">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-500" />
                AI Alerts
              </CardTitle>
              <Link to="/reminders" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiAlerts.slice(0, 5).map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <div
                    className={`p-1.5 rounded-lg ${
                      alert.priority === 'high'
                        ? 'bg-red-100'
                        : alert.priority === 'medium'
                        ? 'bg-amber-100'
                        : 'bg-slate-100'
                    }`}
                  >
                    <AlertCircle
                      className={`w-4 h-4 ${
                        alert.priority === 'high'
                          ? 'text-red-600'
                          : alert.priority === 'medium'
                          ? 'text-amber-600'
                          : 'text-slate-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{alert.patientName}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      alert.priority === 'high'
                        ? 'border-red-200 text-red-700 bg-red-50'
                        : alert.priority === 'medium'
                        ? 'border-amber-200 text-amber-700 bg-amber-50'
                        : 'border-slate-200 text-slate-600'
                    }
                  >
                    {alert.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-2">
                  Recently Updated
                </p>
                <div className="space-y-2">
                  {recentActivity.recentlyUpdated.slice(0, 3).map((patient) => (
                    <div key={patient.id} className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                        {patient.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{patient.name}</p>
                        <p className="text-xs text-slate-500">Updated {patient.lastUpdated}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-2">
                  Upcoming Appointments
                </p>
                <div className="space-y-2">
                  {recentActivity.recentAppointments.slice(0, 3).map((apt) => (
                    <div key={apt.id} className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{apt.patientName}</p>
                        <p className="text-xs text-slate-500">{apt.date} at {apt.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
