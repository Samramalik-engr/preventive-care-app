import { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  Target,
  Calendar,
  ArrowRight,
  Sparkles,
  Shield,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { patients, recommendations } from '@/data/mockData';

const priorityStyles: Record<string, { bg: string; text: string; border: string }> = {
  High: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200' },
  Medium: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200' },
  Low: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
};

const riskFactors = [
  { factor: 'Age > 50', present: true, impact: 'High' },
  { factor: 'Smoking History (25 pack-years)', present: true, impact: 'High' },
  { factor: 'BMI > 28', present: true, impact: 'Medium' },
  { factor: 'Family History of Cancer', present: true, impact: 'High' },
  { factor: 'Type 2 Diabetes', present: true, impact: 'Medium' },
  { factor: 'Hypertension', present: true, impact: 'Medium' },
  { factor: 'Sedentary Lifestyle', present: true, impact: 'Low' },
];

const actionPlan = [
  { action: 'Schedule Colonoscopy', priority: 'High', timeframe: 'Within 2 weeks', status: 'pending' },
  { action: 'Order Lung Cancer Screening', priority: 'High', timeframe: 'Within 1 week', status: 'pending' },
  { action: 'Administer Influenza Vaccine', priority: 'High', timeframe: 'Within 3 days', status: 'pending' },
  { action: 'Refer to Weight Management', priority: 'Medium', timeframe: 'Within 1 month', status: 'pending' },
  { action: 'Smoking Cessation Counseling', priority: 'Medium', timeframe: 'Within 2 weeks', status: 'pending' },
  { action: 'Cardiovascular Risk Assessment', priority: 'Medium', timeframe: 'Within 1 month', status: 'pending' },
  { action: 'Nutritional Counseling', priority: 'Low', timeframe: 'Within 3 months', status: 'pending' },
  { action: 'Exercise Program Referral', priority: 'Low', timeframe: 'Within 3 months', status: 'pending' },
];

export function AIRecommendations() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>('p1');
  const selectedPatient = patients.find((p) => p.id === selectedPatientId);
  const patientRecommendations = recommendations.filter((r) => r.patientId === selectedPatientId);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-cyan-500" />
            AI Recommendations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Personalized preventive care recommendations powered by AI analysis
          </p>
        </div>
        <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
          <SelectTrigger className="w-full sm:w-64">
            <SelectValue placeholder="Select patient" />
          </SelectTrigger>
          <SelectContent>
            {patients.map((patient) => (
              <SelectItem key={patient.id} value={patient.id}>
                {patient.name} - Risk: {patient.riskLevel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <div className={`h-1.5 ${selectedPatient?.riskLevel === 'High' ? 'bg-red-500' : selectedPatient?.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-green-500'}`} />
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-500" />
              Risk Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedPatient && (
              <div className="text-center py-4">
                <div className="relative inline-block">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#e2e8f0"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke={selectedPatient.riskScore >= 70 ? '#ef4444' : selectedPatient.riskScore >= 40 ? '#f59e0b' : '#22c55e'}
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${selectedPatient.riskScore * 3.52} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <span className={`text-3xl font-bold ${selectedPatient.riskScore >= 70 ? 'text-red-600' : selectedPatient.riskScore >= 40 ? 'text-amber-600' : 'text-green-600'}`}>
                        {selectedPatient.riskScore}
                      </span>
                      <span className="text-lg text-slate-400">/100</span>
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`mt-4 ${selectedPatient.riskLevel === 'High' ? 'bg-red-50 text-red-700 border-red-200' : selectedPatient.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-green-50 text-green-700 border-green-200'}`}
                >
                  {selectedPatient.riskLevel} Risk Level
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Risk Factors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskFactors.filter(f => f.present).map((factor, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className={`p-1.5 rounded-full ${factor.impact === 'High' ? 'bg-red-100' : factor.impact === 'Medium' ? 'bg-amber-100' : 'bg-slate-100'}`}>
                    <AlertTriangle className={`w-4 h-4 ${factor.impact === 'High' ? 'text-red-600' : factor.impact === 'Medium' ? 'text-amber-600' : 'text-slate-600'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{factor.factor}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs ${factor.impact === 'High' ? 'border-red-200 text-red-700' : factor.impact === 'Medium' ? 'border-amber-200 text-amber-700' : 'border-slate-200 text-slate-600'}`}>
                    {factor.impact}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-500" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientRecommendations.map((rec) => (
              <div
                key={rec.id}
                className={`p-4 rounded-lg border ${
                  rec.priority === 'High'
                    ? 'border-red-200 bg-red-50/50'
                    : rec.priority === 'Medium'
                    ? 'border-amber-200 bg-amber-50/50'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className={`${priorityStyles[rec.priority].bg} ${priorityStyles[rec.priority].text}`}>
                      {rec.priority}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {rec.category}
                    </Badge>
                  </div>
                </div>
                <h4 className="font-semibold text-slate-900 mb-1">{rec.recommendation}</h4>
                <p className="text-sm text-slate-600">{rec.rationale}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-500" />
            Preventive Action Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {actionPlan.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-100 text-cyan-700 font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{item.action}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    {item.timeframe}
                  </p>
                </div>
                <Badge className={`${priorityStyles[item.priority].bg} ${priorityStyles[item.priority].text}`}>
                  {item.priority}
                </Badge>
                <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 hover:text-cyan-600 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
