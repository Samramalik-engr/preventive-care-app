import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { patients } from '@/data/mockData';

import { useEffect, useState } from 'react';
import api from '../services/api'; 

const riskBadgeStyles: Record<string, string> = {
  High: 'bg-red-100 text-red-700 border-red-200',
  Medium: 'bg-amber-100 text-amber-700 border-amber-200',
  Low: 'bg-green-100 text-green-700 border-green-200',
};

const screeningStatusStyles: Record<string, string> = {
  Completed: 'bg-green-100 text-green-700',
  Due: 'bg-amber-100 text-amber-700',
  Overdue: 'bg-red-100 text-red-700',
  Scheduled: 'bg-blue-100 text-blue-700',
};

// const vaccineStatusStyles: Record<string, string> = {
//   'Up to Date': 'bg-green-100 text-green-700',
//   Due: 'bg-amber-100 text-amber-700',
//   Overdue: 'bg-red-100 text-red-700',
// };

// const mentalHealthStyles: Record<string, string> = {
//   Normal: 'bg-green-100 text-green-700',
//   'At Risk': 'bg-amber-100 text-amber-700',
//   'Not Screened': 'bg-slate-100 text-slate-700',
// };

  // const { id } = useParams();
  // const patient = patients.find((p) => p.id === id);

  export function PatientProfile() {

  const { id } = useParams();

  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {

    const fetchPatient = async () => {

      try {

        const response = await api.get(`/patients/${id}`);

        setPatient(response.data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchPatient();

  }, [id]); 

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-slate-500">Patient not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/patients"
        className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Patients
      </Link>

      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2" />
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-xl font-semibold shadow-lg">
                {patient.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-slate-900">{patient.name}</h1>
                  <Badge variant="outline" className={riskBadgeStyles[patient.risk_Level]}>
                    {patient.risk_Level} Risk
                  </Badge>
                </div>
                <p className="text-slate-500 mt-1">
                  {patient.age} years old, {patient.gender}, {patient.race_ethnicity} 
                </p>
              </div>
            </div>

            <div className="flex-1 lg:flex lg:justify-end">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
                <div className="text-center lg:text-right">
                  <p className="text-sm text-slate-500">Height</p>
                  <p className="text-lg font-semibold text-slate-900">{patient.height}</p>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-sm text-slate-500">Weight</p>
                  <p className="text-lg font-semibold text-slate-900">{patient.weight}</p>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-sm text-slate-500">BMI</p>
                  <p className={`text-lg font-semibold ${patient.bmi >= 30 ? 'text-red-600' : patient.bmi >= 25 ? 'text-amber-600' : 'text-green-600'}`}>
                    {patient.bmi}
                  </p>
                </div>
                <div className="text-center lg:text-right">
                  <p className="text-sm text-slate-500">Risk Score</p>
                  <p className={`text-lg font-semibold ${patient.risk_Score >= 70 ? 'text-red-600' : patient.risk_Score >= 40 ? 'text-amber-600' : 'text-green-600'}`}>
                    {patient.risk_Score}/100
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-500">Overall Risk Score</span>
              <span className="font-medium text-slate-700">{patient.risk_Score}%</span>
            </div>
            <Progress
              value={patient.risk_Score}
              className={`h-2 ${patient.risk_Score >= 70 ? '[&>div]:bg-red-500' : patient.riskScore >= 40 ? '[&>div]:bg-amber-500' : '[&>div]:bg-green-500'}`}
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList className="bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
          <TabsTrigger value="screenings">Screenings</TabsTrigger>
          <TabsTrigger value="vaccinations">Vaccinations</TabsTrigger>
          {/* <TabsTrigger value="mental">Mental Health</TabsTrigger> */}
        </TabsList>

        <TabsContent value="demographics">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Demographics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoItem label="Full Name" value={patient.name} />
                <InfoItem label="Age" value={`${patient.age} years`} />
                <InfoItem label="Gender" value={patient.gender} />
                <InfoItem label="Race/Ethnicity" value={patient.race_ethnicity} /> 
                <InfoItem label="Height" value={patient.height} />
                <InfoItem label="Weight" value={patient.weight} />
                <InfoItem label="BMI" value={patient.bmi.toFixed(1)} highlight />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Medical History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">

  <StatusIndicator
    label="Diabetes"
    status={patient.medical_history?.diabetes}
  />

  <StatusIndicator
    label="Cardiovascular Disease"
    status={patient.medical_history?.cardiovascular_disease}
  />

  <StatusIndicator
    label="Cancer History"
    status={patient.medical_history?.cancer_history}
  />

  <StatusIndicator
    label="Family Cancer History"
    status={patient.medical_history?.family_cancer_history}
  />

</div> 
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifestyle">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lifestyle Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

  <InfoItem
    label="Exercise Minutes"
    value={patient.lifestyle?.exercise_minutes || 0}
  />

  <InfoItem
    label="Sedentary Time"
    value={patient.lifestyle?.sedentary_time || 0}
  />

  <InfoItem
    label="Smoking Status"
    value={
      patient.lifestyle?.smoking_status
        ? "Smoker"
        : "Non-Smoker"
    }
  />

  <InfoItem
    label="Pack Year History"
    value={patient.lifestyle?.pack_year_history || 0}
  />

  <InfoItem
    label="Alcohol Use"
    value={patient.lifestyle?.alcohol_use || "None"}
  />

</div> 
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="screenings">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preventive Screenings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Screening</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Date Completed</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-slate-500">Next Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {patient.screenings ?.map((screening : any) => (
                      <tr key={screening.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-900">{screening.screening_name}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className={screeningStatusStyles[screening.status]}>
                            {screening.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500">{screening.date_completed || '-'}</td>
                        <td className="py-3 px-4 text-sm text-slate-500">{screening.next_due || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vaccinations">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Vaccination Record</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {patient.vaccinations?.map((vaccine: any) => (
                  <div
                    key={vaccine.id}
                    className="border border-slate-100 rounded-lg p-4 hover:border-slate-200 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-slate-900">{vaccine.vaccine_name}</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {vaccine.last_adminstered ? `Last: ${vaccine.last_adminstered}` : 'Not administered'}
                        </p>
                      </div>
                      <Badge variant="secondary" className={vaccineStatusStyles[vaccine.status]}>
                        {vaccine.status}
                      </Badge>
                    </div>
                    {vaccine.next_due && (
                      <p className="text-xs text-slate-500 mt-2">Next due: {vaccine.next_due}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* <TabsContent value="mental">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mental Health Screenings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-slate-100 rounded-lg p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-slate-900">Depression Screening</p>
                      <p className="text-sm text-slate-500 mt-1">PHQ-9 Assessment</p>
                    </div>
                    <Badge variant="secondary" className={mentalHealthStyles[patient.mentalHealth.depressionScreeningStatus]}>
                      {patient.mentalHealth.depressionScreeningStatus}
                    </Badge>
                  </div>
                </div>
                <div className="border border-slate-100 rounded-lg p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-slate-900">Anxiety Screening</p>
                      <p className="text-sm text-slate-500 mt-1">GAD-7 Assessment</p>
                    </div>
                    <Badge variant="secondary" className={mentalHealthStyles[patient.mentalHealth.anxietyScreeningStatus]}>
                      {patient.mentalHealth.anxietyScreeningStatus}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500">
                  <Calendar className="w-4 h-4 inline-block mr-2 -mt-0.5" />
                  Next screening due: {patient.mentalHealth.nextScreeningDue}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  );
}

function InfoItem({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`text-base font-medium mt-0.5 ${highlight ? 'text-red-600' : 'text-slate-900'}`}>{value}</p>
    </div>
  );
}

function InfoSection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm text-slate-500 mb-2">{title}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} variant="secondary" className="bg-slate-100 text-slate-700">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function StatusIndicator({ label, status }: { label: string; status: boolean }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
      {status ? (
        <AlertTriangle className="w-5 h-5 text-amber-500" />
      ) : (
        <CheckCircle className="w-5 h-5 text-green-500" />
      )}
      <div>
        <p className="font-medium text-slate-900">{label}</p>
        <p className={`text-sm ${status ? 'text-amber-600' : 'text-green-600'}`}>
          {status ? 'Diagnosed' : 'No diagnosis'}
        </p>
      </div>
    </div>
  );
}
