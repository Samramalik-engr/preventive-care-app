import { Link } from 'react-router-dom';
import {
  Bell,
  Calendar,
  Syringe,
  AlertTriangle,
  Clock,
  XCircle,
  ArrowRight,
  ClipboardList,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { reminderSummary, appointments } from '@/data/mockData';

const statusStyles: Record<string, string> = {
  Scheduled: 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
  Missed: 'bg-red-100 text-red-700',
  Cancelled: 'bg-slate-100 text-slate-700',
};

const vaccineData = [
  { name: 'Influenza', patient: 'Robert Johnson', dueDate: '2024-10-01', status: 'Overdue', patientId: 'p1' },
  { name: 'Influenza', patient: 'James Williams', dueDate: '2024-10-01', status: 'Overdue', patientId: 'p3' },
  { name: 'Shingles', patient: 'Robert Johnson', dueDate: '2025-01-01', status: 'Due', patientId: 'p1' },
  { name: 'COVID-19', patient: 'James Williams', dueDate: '2024-11-15', status: 'Due', patientId: 'p3' },
  { name: 'RSV', patient: 'Robert Johnson', dueDate: '2025-04-01', status: 'Due', patientId: 'p1' },
  { name: 'RSV', patient: 'Michael Brown', dueDate: '2025-07-01', status: 'Due', patientId: 'p5' },
];

const screeningReminders = [
  { name: 'Colonoscopy', patient: 'Robert Johnson', dueDate: '2025-06-15', status: 'Overdue', patientId: 'p1' },
  { name: 'Lung Cancer Screening', patient: 'James Williams', dueDate: '2024-01-15', status: 'Overdue', patientId: 'p3' },
  { name: 'Cholesterol Panel', patient: 'James Williams', dueDate: '2025-01-10', status: 'Overdue', patientId: 'p3' },
  { name: 'Colonoscopy', patient: 'Michael Brown', dueDate: '2025-04-01', status: 'Due', patientId: 'p5' },
  { name: 'Lung Cancer Screening', patient: 'Michael Brown', dueDate: '2025-05-01', status: 'Due', patientId: 'p5' },
  { name: 'Mammogram', patient: 'Emily Chen', dueDate: '2025-04-15', status: 'Scheduled', patientId: 'p4' },
  { name: 'Cholesterol Panel', patient: 'Sarah Thompson', dueDate: '2025-06-01', status: 'Due', patientId: 'p6' },
  { name: 'Colonoscopy', patient: 'Maria Garcia', dueDate: '2025-12-01', status: 'Due', patientId: 'p2' },
];

const followUpReminders = [
  { patient: 'James Williams', type: 'Depression Screening Follow-up', dueDate: '2025-04-01', patientId: 'p3' },
  { patient: 'Michael Brown', type: 'Anxiety Screening Follow-up', dueDate: '2025-05-01', patientId: 'p5' },
  { patient: 'Robert Johnson', type: 'Diabetes Management Review', dueDate: '2025-05-15', patientId: 'p1' },
  { patient: 'Sarah Thompson', type: 'Cardiology Follow-up', dueDate: '2025-03-25', patientId: 'p6' },
];

export function ReminderCenter() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-7 h-7 text-cyan-500" />
          Reminder Center
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track and manage all upcoming screenings, vaccinations, and appointments
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <SummaryCard
          title="Upcoming Screenings"
          value={reminderSummary.upcomingScreenings}
          icon={ClipboardList}
          color="cyan"
        />
        <SummaryCard
          title="Overdue Screenings"
          value={reminderSummary.overdueScreenings}
          icon={AlertTriangle}
          color="red"
        />
        <SummaryCard
          title="Vaccines Due"
          value={reminderSummary.vaccinesDue}
          icon={Syringe}
          color="amber"
        />
        <SummaryCard
          title="Vaccines Overdue"
          value={reminderSummary.vaccinesOverdue}
          icon={AlertTriangle}
          color="orange"
        />
        <SummaryCard
          title="Appointments"
          value={reminderSummary.upcomingAppointments}
          icon={Calendar}
          color="blue"
        />
        <SummaryCard
          title="Missed"
          value={reminderSummary.missedAppointments}
          icon={XCircle}
          color="red"
        />
        <SummaryCard
          title="Follow-ups"
          value={reminderSummary.followUpReminders}
          icon={Clock}
          color="purple"
        />
      </div>

      <Tabs defaultValue="screenings" className="space-y-4">
        <TabsList className="bg-slate-100 p-1 rounded-lg">
          <TabsTrigger value="screenings" className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            Screenings
          </TabsTrigger>
          <TabsTrigger value="vaccines" className="flex items-center gap-2">
            <Syringe className="w-4 h-4" />
            Vaccinations
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Appointments
          </TabsTrigger>
          <TabsTrigger value="followups" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Follow-ups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="screenings">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-slate-900">
                Screening Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Screening</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Patient</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Due Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {screeningReminders.map((item, index) => (
                      <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">{item.name}</td>
                        <td className="py-3 px-4">
                          <Link
                            to={`/patients/${item.patientId}`}
                            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                          >
                            {item.patient}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500">{item.dueDate}</td>
                        <td className="py-3 px-4">
                          <Badge className={item.status === 'Overdue' ? 'bg-red-100 text-red-700' : item.status === 'Due' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-cyan-600">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccines">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-slate-900">
                Vaccination Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Vaccine</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Patient</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Due Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-slate-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccineData.map((item, index) => (
                      <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">{item.name}</td>
                        <td className="py-3 px-4">
                          <Link
                            to={`/patients/${item.patientId}`}
                            className="text-sm text-cyan-600 hover:text-cyan-700 font-medium"
                          >
                            {item.patient}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500">{item.dueDate}</td>
                        <td className="py-3 px-4">
                          <Badge className={item.status === 'Overdue' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-cyan-600">
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appointments">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-slate-900">
                Appointment Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Patient</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Time</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((apt) => (
                      <tr key={apt.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                        <td className="py-3 px-4">
                          <Link
                            to={`/patients/${apt.patientId}`}
                            className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
                          >
                            {apt.patientName}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-900">{apt.type}</td>
                        <td className="py-3 px-4 text-sm text-slate-500">{apt.date}</td>
                        <td className="py-3 px-4 text-sm text-slate-500">{apt.time}</td>
                        <td className="py-3 px-4">
                          <Badge className={statusStyles[apt.status]}>{apt.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="followups">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold text-slate-900">
                Follow-up Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {followUpReminders.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-amber-50">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{item.type}</p>
                      <Link
                        to={`/patients/${item.patientId}`}
                        className="text-sm text-cyan-600 hover:text-cyan-700"
                      >
                        {item.patient}
                      </Link>
                    </div>
                    <div className="text-sm text-slate-500">Due: {item.dueDate}</div>
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-cyan-600">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
}) {
  const colorClasses: Record<string, { bg: string; icon: string; text: string }> = {
    cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', text: 'text-cyan-700' },
    red: { bg: 'bg-red-50', icon: 'text-red-600', text: 'text-red-700' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', text: 'text-amber-700' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', text: 'text-orange-700' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', text: 'text-blue-700' },
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', text: 'text-purple-700' },
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex flex-col items-center text-center">
          <div className={`p-2 rounded-lg ${colorClasses[color].bg} mb-2`}>
            <Icon className={`w-5 h-5 ${colorClasses[color].icon}`} />
          </div>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
}
