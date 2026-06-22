export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  raceEthnicity: string;
  height: string;
  weight: string;
  bmi: number;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  chronicDiseases: string[];
  previousSurgeries: string[];
  cancerHistory: string;
  familyHistory: string[];
  diabetes: boolean;
  cardiovascularDisease: boolean;
  weeklyExerciseMinutes: number;
  sedentaryTime: string;
  smokingStatus: 'Never' | 'Former' | 'Current';
  packYearHistory: number;
  alcoholConsumption: string;
  nutritionAssessment: string;
  screenings: Screening[];
  vaccinations: Vaccination[];
  mentalHealth: MentalHealth;
  lastUpdated: string;
}

export interface Screening {
  name: string;
  status: 'Completed' | 'Due' | 'Overdue' | 'Scheduled';
  dateCompleted?: string;
  nextDueDate?: string;
}

export interface Vaccination {
  name: string;
  status: 'Up to Date' | 'Due' | 'Overdue';
  lastDose?: string;
  nextDue?: string;
}

export interface MentalHealth {
  depressionScreeningStatus: 'Normal' | 'At Risk' | 'Not Screened';
  anxietyScreeningStatus: 'Normal' | 'At Risk' | 'Not Screened';
  nextScreeningDue: string;
}

export interface AIAlert {
  id: string;
  patientId: string;
  patientName: string;
  type: 'screening' | 'vaccine' | 'appointment' | 'follow-up';
  priority: 'high' | 'medium' | 'low';
  message: string;
  createdAt: string;
}

export interface Recommendation {
  id: string;
  patientId: string;
  recommendation: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  rationale: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  type: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Missed' | 'Cancelled';
}

export const patients: Patient[] = [
  {
    id: 'p1',
    name: 'Robert Johnson',
    age: 58,
    gender: 'Male',
    raceEthnicity: 'Caucasian',
    height: "5'10\"",
    weight: '195 lbs',
    bmi: 28.0,
    riskScore: 82,
    riskLevel: 'High',
    chronicDiseases: ['Hypertension', 'Type 2 Diabetes'],
    previousSurgeries: ['Appendectomy (1998)', 'Knee Arthroscopy (2015)'],
    cancerHistory: 'No personal history',
    familyHistory: ['Father - Colon Cancer', 'Mother - Breast Cancer'],
    diabetes: true,
    cardiovascularDisease: true,
    weeklyExerciseMinutes: 90,
    sedentaryTime: '8+ hours/day',
    smokingStatus: 'Former',
    packYearHistory: 25,
    alcoholConsumption: 'Moderate (1-2 drinks/week)',
    nutritionAssessment: 'Needs improvement - high sodium intake',
    screenings: [
      { name: 'Colonoscopy', status: 'Overdue', dateCompleted: '2019-06-15', nextDueDate: '2025-06-15' },
      { name: 'Lung Cancer Screening (LDCT)', status: 'Due', dateCompleted: undefined, nextDueDate: '2024-12-01' },
      { name: 'PSA Test', status: 'Completed', dateCompleted: '2025-01-10', nextDueDate: '2026-01-10' },
      { name: 'Blood Pressure Screening', status: 'Completed', dateCompleted: '2025-03-01', nextDueDate: '2025-06-01' },
      { name: 'Cholesterol Panel', status: 'Due', dateCompleted: '2024-06-20', nextDueDate: '2025-06-20' },
      { name: 'HbA1c Test', status: 'Completed', dateCompleted: '2025-02-15', nextDueDate: '2025-05-15' },
    ],
    vaccinations: [
      { name: 'Influenza', status: 'Overdue', lastDose: '2023-10-15', nextDue: '2024-10-01' },
      { name: 'COVID-19', status: 'Up to Date', lastDose: '2024-09-20', nextDue: '2025-09-20' },
      { name: 'Shingles (Shingrix)', status: 'Due', lastDose: undefined, nextDue: '2025-01-01' },
      { name: 'Pneumococcal', status: 'Up to Date', lastDose: '2023-05-10', nextDue: undefined },
      { name: 'Hepatitis A', status: 'Up to Date', lastDose: '2020-03-15', nextDue: undefined },
      { name: 'Hepatitis B', status: 'Up to Date', lastDose: '2020-04-20', nextDue: undefined },
      { name: 'RSV', status: 'Due', lastDose: undefined, nextDue: '2025-04-01' },
    ],
    mentalHealth: {
      depressionScreeningStatus: 'Normal',
      anxietyScreeningStatus: 'Normal',
      nextScreeningDue: '2025-06-01',
    },
    lastUpdated: '2025-03-15',
  },
  {
    id: 'p2',
    name: 'Maria Garcia',
    age: 45,
    gender: 'Female',
    raceEthnicity: 'Hispanic',
    height: "5'4\"",
    weight: '145 lbs',
    bmi: 24.9,
    riskScore: 35,
    riskLevel: 'Low',
    chronicDiseases: [],
    previousSurgeries: ['C-Section (2010)'],
    cancerHistory: 'No personal history',
    familyHistory: ['Mother - Thyroid Disorder'],
    diabetes: false,
    cardiovascularDisease: false,
    weeklyExerciseMinutes: 180,
    sedentaryTime: '5 hours/day',
    smokingStatus: 'Never',
    packYearHistory: 0,
    alcoholConsumption: 'Social (occasional)',
    nutritionAssessment: 'Good - balanced diet',
    screenings: [
      { name: 'Mammogram', status: 'Completed', dateCompleted: '2025-01-20', nextDueDate: '2026-01-20' },
      { name: 'Pap Smear', status: 'Completed', dateCompleted: '2024-08-15', nextDueDate: '2027-08-15' },
      { name: 'Colonoscopy', status: 'Due', dateCompleted: undefined, nextDueDate: '2025-12-01' },
      { name: 'Bone Density Test', status: 'Completed', dateCompleted: '2024-06-01', nextDueDate: '2029-06-01' },
      { name: 'Blood Pressure Screening', status: 'Completed', dateCompleted: '2025-02-28', nextDueDate: '2025-05-28' },
      { name: 'Cholesterol Panel', status: 'Completed', dateCompleted: '2024-11-10', nextDueDate: '2025-11-10' },
    ],
    vaccinations: [
      { name: 'Influenza', status: 'Up to Date', lastDose: '2024-11-01', nextDue: '2025-10-01' },
      { name: 'COVID-19', status: 'Up to Date', lastDose: '2024-09-15', nextDue: '2025-09-15' },
      { name: 'Shingles (Shingrix)', status: 'Up to Date', lastDose: '2023-08-20', nextDue: undefined },
      { name: 'Pneumococcal', status: 'Due', lastDose: undefined, nextDue: '2025-07-01' },
      { name: 'Hepatitis A', status: 'Up to Date', lastDose: '2019-06-10', nextDue: undefined },
      { name: 'Hepatitis B', status: 'Up to Date', lastDose: '2019-07-15', nextDue: undefined },
      { name: 'RSV', status: 'Up to Date', lastDose: '2024-10-01', nextDue: undefined },
    ],
    mentalHealth: {
      depressionScreeningStatus: 'Normal',
      anxietyScreeningStatus: 'Normal',
      nextScreeningDue: '2025-08-15',
    },
    lastUpdated: '2025-03-14',
  },
  {
    id: 'p3',
    name: 'James Williams',
    age: 62,
    gender: 'Male',
    raceEthnicity: 'African American',
    height: "6'1\"",
    weight: '245 lbs',
    bmi: 32.3,
    riskScore: 78,
    riskLevel: 'High',
    chronicDiseases: ['Hypertension', 'Chronic Kidney Disease Stage 2', 'Obesity'],
    previousSurgeries: ['Hernia Repair (2005)', 'Gallbladder Removal (2012)'],
    cancerHistory: 'Prostate Cancer (2018) - in remission',
    familyHistory: ['Father - Heart Disease', 'Brother - Diabetes'],
    diabetes: false,
    cardiovascularDisease: true,
    weeklyExerciseMinutes: 45,
    sedentaryTime: '9+ hours/day',
    smokingStatus: 'Current',
    packYearHistory: 40,
    alcoholConsumption: 'Heavy (4-5 drinks/week)',
    nutritionAssessment: 'Poor - high fat, low fiber diet',
    screenings: [
      { name: 'Colonoscopy', status: 'Completed', dateCompleted: '2024-03-10', nextDueDate: '2026-03-10' },
      { name: 'Lung Cancer Screening (LDCT)', status: 'Overdue', dateCompleted: '2023-01-15', nextDueDate: '2024-01-15' },
      { name: 'PSA Test', status: 'Completed', dateCompleted: '2025-02-20', nextDueDate: '2025-08-20' },
      { name: 'Blood Pressure Screening', status: 'Completed', dateCompleted: '2025-03-01', nextDueDate: '2025-04-01' },
      { name: 'Cholesterol Panel', status: 'Overdue', dateCompleted: '2024-01-10', nextDueDate: '2025-01-10' },
      { name: 'Kidney Function Test', status: 'Completed', dateCompleted: '2025-02-28', nextDueDate: '2025-05-28' },
    ],
    vaccinations: [
      { name: 'Influenza', status: 'Overdue', lastDose: '2023-09-20', nextDue: '2024-10-01' },
      { name: 'COVID-19', status: 'Due', lastDose: '2023-11-15', nextDue: '2024-11-15' },
      { name: 'Shingles (Shingrix)', status: 'Up to Date', lastDose: '2022-06-01', nextDue: undefined },
      { name: 'Pneumococcal', status: 'Up to Date', lastDose: '2024-01-10', nextDue: undefined },
      { name: 'Hepatitis A', status: 'Due', lastDose: undefined, nextDue: '2025-05-01' },
      { name: 'Hepatitis B', status: 'Up to Date', lastDose: '2021-08-20', nextDue: undefined },
      { name: 'RSV', status: 'Overdue', lastDose: undefined, nextDue: '2025-01-01' },
    ],
    mentalHealth: {
      depressionScreeningStatus: 'At Risk',
      anxietyScreeningStatus: 'Normal',
      nextScreeningDue: '2025-04-01',
    },
    lastUpdated: '2025-03-12',
  },
  {
    id: 'p4',
    name: 'Emily Chen',
    age: 38,
    gender: 'Female',
    raceEthnicity: 'Asian',
    height: "5'6\"",
    weight: '130 lbs',
    bmi: 21.0,
    riskScore: 22,
    riskLevel: 'Low',
    chronicDiseases: [],
    previousSurgeries: [],
    cancerHistory: 'No personal history',
    familyHistory: ['Mother - Osteoporosis'],
    diabetes: false,
    cardiovascularDisease: false,
    weeklyExerciseMinutes: 240,
    sedentaryTime: '4 hours/day',
    smokingStatus: 'Never',
    packYearHistory: 0,
    alcoholConsumption: 'None',
    nutritionAssessment: 'Excellent - plant-focused diet',
    screenings: [
      { name: 'Mammogram', status: 'Scheduled', dateCompleted: undefined, nextDueDate: '2025-04-15' },
      { name: 'Pap Smear', status: 'Completed', dateCompleted: '2024-10-01', nextDueDate: '2027-10-01' },
      { name: 'Colonoscopy', status: 'Due', dateCompleted: undefined, nextDueDate: '2028-12-01' },
      { name: 'Blood Pressure Screening', status: 'Completed', dateCompleted: '2025-03-01', nextDueDate: '2026-03-01' },
      { name: 'Cholesterol Panel', status: 'Completed', dateCompleted: '2025-01-15', nextDueDate: '2030-01-15' },
      { name: 'Thyroid Panel', status: 'Completed', dateCompleted: '2024-12-20', nextDueDate: '2025-12-20' },
    ],
    vaccinations: [
      { name: 'Influenza', status: 'Up to Date', lastDose: '2024-11-10', nextDue: '2025-10-01' },
      { name: 'COVID-19', status: 'Up to Date', lastDose: '2024-10-01', nextDue: '2025-10-01' },
      { name: 'Shingles (Shingrix)', status: 'Up to Date', lastDose: '2023-03-15', nextDue: undefined },
      { name: 'Pneumococcal', status: 'Up to Date', lastDose: '2020-05-20', nextDue: undefined },
      { name: 'Hepatitis A', status: 'Up to Date', lastDose: '2018-02-10', nextDue: undefined },
      { name: 'Hepatitis B', status: 'Up to Date', lastDose: '2018-03-15', nextDue: undefined },
      { name: 'RSV', status: 'Due', lastDose: undefined, nextDue: '2025-06-01' },
    ],
    mentalHealth: {
      depressionScreeningStatus: 'Normal',
      anxietyScreeningStatus: 'Normal',
      nextScreeningDue: '2025-10-01',
    },
    lastUpdated: '2025-03-15',
  },
  {
    id: 'p5',
    name: 'Michael Brown',
    age: 52,
    gender: 'Male',
    raceEthnicity: 'Caucasian',
    height: "5'9\"",
    weight: '210 lbs',
    bmi: 31.0,
    riskScore: 58,
    riskLevel: 'Medium',
    chronicDiseases: ['Pre-diabetes', 'Hyperlipidemia'],
    previousSurgeries: ['Appendectomy (2008)'],
    cancerHistory: 'No personal history',
    familyHistory: ['Father - Colon Cancer', 'Mother - Diabetes'],
    diabetes: false,
    cardiovascularDisease: false,
    weeklyExerciseMinutes: 120,
    sedentaryTime: '6 hours/day',
    smokingStatus: 'Former',
    packYearHistory: 15,
    alcoholConsumption: 'Moderate (3-4 drinks/week)',
    nutritionAssessment: 'Fair - needs more vegetables',
    screenings: [
      { name: 'Colonoscopy', status: 'Due', dateCompleted: undefined, nextDueDate: '2025-04-01' },
      { name: 'Lung Cancer Screening (LDCT)', status: 'Due', dateCompleted: undefined, nextDueDate: '2025-05-01' },
      { name: 'PSA Test', status: 'Completed', dateCompleted: '2024-12-15', nextDueDate: '2025-12-15' },
      { name: 'Blood Pressure Screening', status: 'Completed', dateCompleted: '2025-02-01', nextDueDate: '2025-05-01' },
      { name: 'Cholesterol Panel', status: 'Completed', dateCompleted: '2025-01-05', nextDueDate: '2026-01-05' },
      { name: 'HbA1c Test', status: 'Completed', dateCompleted: '2025-02-10', nextDueDate: '2025-05-10' },
    ],
    vaccinations: [
      { name: 'Influenza', status: 'Up to Date', lastDose: '2024-10-25', nextDue: '2025-10-01' },
      { name: 'COVID-19', status: 'Up to Date', lastDose: '2024-08-15', nextDue: '2025-08-15' },
      { name: 'Shingles (Shingrix)', status: 'Due', lastDose: undefined, nextDue: '2025-02-01' },
      { name: 'Pneumococcal', status: 'Up to Date', lastDose: '2022-12-10', nextDue: undefined },
      { name: 'Hepatitis A', status: 'Up to Date', lastDose: '2015-03-20', nextDue: undefined },
      { name: 'Hepatitis B', status: 'Up to Date', lastDose: '2015-04-25', nextDue: undefined },
      { name: 'RSV', status: 'Due', lastDose: undefined, nextDue: '2025-07-01' },
    ],
    mentalHealth: {
      depressionScreeningStatus: 'Normal',
      anxietyScreeningStatus: 'At Risk',
      nextScreeningDue: '2025-05-01',
    },
    lastUpdated: '2025-03-13',
  },
  {
    id: 'p6',
    name: 'Sarah Thompson',
    age: 67,
    gender: 'Female',
    raceEthnicity: 'Caucasian',
    height: "5'3\"",
    weight: '155 lbs',
    bmi: 27.5,
    riskScore: 72,
    riskLevel: 'High',
    chronicDiseases: ['Osteoporosis', 'Hypertension', 'Arthritis'],
    previousSurgeries: ['Hip Replacement (2019)', 'Cataract Surgery (2022)'],
    cancerHistory: 'Breast Cancer (2015) - survivor',
    familyHistory: ['Sister - Breast Cancer', 'Mother - Osteoporosis'],
    diabetes: false,
    cardiovascularDisease: true,
    weeklyExerciseMinutes: 60,
    sedentaryTime: '7 hours/day',
    smokingStatus: 'Never',
    packYearHistory: 0,
    alcoholConsumption: 'None',
    nutritionAssessment: 'Good - calcium-rich diet',
    screenings: [
      { name: 'Mammogram', status: 'Completed', dateCompleted: '2025-02-10', nextDueDate: '2026-02-10' },
      { name: 'Colonoscopy', status: 'Completed', dateCompleted: '2024-05-15', nextDueDate: '2029-05-15' },
      { name: 'Bone Density Test', status: 'Completed', dateCompleted: '2024-08-20', nextDueDate: '2026-08-20' },
      { name: 'Blood Pressure Screening', status: 'Completed', dateCompleted: '2025-03-05', nextDueDate: '2025-04-05' },
      { name: 'Cholesterol Panel', status: 'Due', dateCompleted: '2024-06-01', nextDueDate: '2025-06-01' },
      { name: 'DEXA Scan', status: 'Completed', dateCompleted: '2024-08-20', nextDueDate: '2026-08-20' },
    ],
    vaccinations: [
      { name: 'Influenza', status: 'Up to Date', lastDose: '2024-10-01', nextDue: '2025-10-01' },
      { name: 'COVID-19', status: 'Up to Date', lastDose: '2024-09-25', nextDue: '2025-09-25' },
      { name: 'Shingles (Shingrix)', status: 'Up to Date', lastDose: '2021-04-10', nextDue: undefined },
      { name: 'Pneumococcal', status: 'Up to Date', lastDose: '2020-11-15', nextDue: undefined },
      { name: 'Hepatitis A', status: 'Up to Date', lastDose: '2018-07-20', nextDue: undefined },
      { name: 'Hepatitis B', status: 'Up to Date', lastDose: '2018-08-25', nextDue: undefined },
      { name: 'RSV', status: 'Up to Date', lastDose: '2024-11-01', nextDue: undefined },
    ],
    mentalHealth: {
      depressionScreeningStatus: 'Normal',
      anxietyScreeningStatus: 'Normal',
      nextScreeningDue: '2025-09-01',
    },
    lastUpdated: '2025-03-14',
  },
];

export const aiAlerts: AIAlert[] = [
  { id: 'a1', patientId: 'p1', patientName: 'Robert Johnson', type: 'screening', priority: 'high', message: 'Colonoscopy overdue by 9 months', createdAt: '2025-03-15' },
  { id: 'a2', patientId: 'p3', patientName: 'James Williams', type: 'vaccine', priority: 'high', message: 'Influenza vaccine overdue', createdAt: '2025-03-14' },
  { id: 'a3', patientId: 'p1', patientName: 'Robert Johnson', type: 'screening', priority: 'high', message: 'Lung cancer screening recommended for former smoker', createdAt: '2025-03-13' },
  { id: 'a4', patientId: 'p5', patientName: 'Michael Brown', type: 'screening', priority: 'medium', message: 'Colonoscopy due - family history of colon cancer', createdAt: '2025-03-12' },
  { id: 'a5', patientId: 'p3', patientName: 'James Williams', type: 'appointment', priority: 'high', message: 'Follow-up appointment required for depression screening', createdAt: '2025-03-11' },
  { id: 'a6', patientId: 'p1', patientName: 'Robert Johnson', type: 'vaccine', priority: 'medium', message: 'Shingles vaccination due', createdAt: '2025-03-10' },
  { id: 'a7', patientId: 'p6', patientName: 'Sarah Thompson', type: 'screening', priority: 'medium', message: 'Cardiovascular risk assessment recommended', createdAt: '2025-03-09' },
  { id: 'a8', patientId: 'p3', patientName: 'James Williams', type: 'screening', priority: 'high', message: 'Lung cancer screening overdue', createdAt: '2025-03-08' },
];

export const recommendations: Recommendation[] = [
  { id: 'r1', patientId: 'p1', recommendation: 'Colonoscopy', priority: 'High', category: 'Screening', rationale: 'Overdue by 9 months, family history of colon cancer, age > 50' },
  { id: 'r2', patientId: 'p1', recommendation: 'Lung Cancer Screening (LDCT)', priority: 'High', category: 'Screening', rationale: 'Former smoker with 25 pack-year history, age 55-80' },
  { id: 'r3', patientId: 'p1', recommendation: 'Influenza Vaccine', priority: 'High', category: 'Vaccination', rationale: 'Overdue, diabetic patients at higher risk for complications' },
  { id: 'r4', patientId: 'p1', recommendation: 'Weight Management Program', priority: 'Medium', category: 'Lifestyle', rationale: 'BMI 28.0, Type 2 Diabetes, cardiovascular risk' },
  { id: 'r5', patientId: 'p1', recommendation: 'Smoking Cessation Support', priority: 'Medium', category: 'Lifestyle', rationale: 'Former smoker, continued cardiovascular risk' },
  { id: 'r6', patientId: 'p3', recommendation: 'Lung Cancer Screening (LDCT)', priority: 'High', category: 'Screening', rationale: 'Current smoker 40 pack-years, age > 50' },
  { id: 'r7', patientId: 'p3', recommendation: 'Depression Treatment Follow-up', priority: 'High', category: 'Mental Health', rationale: 'PHQ-9 score indicates at-risk status' },
  { id: 'r8', patientId: 'p3', recommendation: 'Smoking Cessation Program', priority: 'High', category: 'Lifestyle', rationale: 'Current smoker with CKD and CVD' },
  { id: 'r9', patientId: 'p5', recommendation: 'Colonoscopy', priority: 'High', category: 'Screening', rationale: 'Age > 50, family history of colon cancer' },
  { id: 'r10', patientId: 'p5', recommendation: 'Lung Cancer Screening', priority: 'Medium', category: 'Screening', rationale: 'Former smoker, 15 pack-year history' },
  { id: 'r11', patientId: 'p6', recommendation: 'Bone Health Reassessment', priority: 'Medium', category: 'Screening', rationale: 'Osteoporosis history, recent fractures risk' },
  { id: 'r12', patientId: 'p6', recommendation: 'Cardiovascular Risk Panel', priority: 'Medium', category: 'Screening', rationale: 'HTN, age > 65, breast cancer history' },
];

export const appointments: Appointment[] = [
  { id: 'ap1', patientId: 'p1', patientName: 'Robert Johnson', type: 'Annual Physical', date: '2025-03-20', time: '09:00 AM', status: 'Scheduled' },
  { id: 'ap2', patientId: 'p2', patientName: 'Maria Garcia', type: 'Wellness Visit', date: '2025-03-22', time: '10:30 AM', status: 'Scheduled' },
  { id: 'ap3', patientId: 'p3', patientName: 'James Williams', type: 'Follow-up', date: '2025-03-18', time: '02:00 PM', status: 'Scheduled' },
  { id: 'ap4', patientId: 'p4', patientName: 'Emily Chen', type: 'Mammogram', date: '2025-04-15', time: '11:00 AM', status: 'Scheduled' },
  { id: 'ap5', patientId: 'p5', patientName: 'Michael Brown', type: 'Colonoscopy', date: '2025-04-05', time: '08:00 AM', status: 'Scheduled' },
  { id: 'ap6', patientId: 'p6', patientName: 'Sarah Thompson', type: 'Cardiology Consult', date: '2025-03-25', time: '03:00 PM', status: 'Scheduled' },
  { id: 'ap7', patientId: 'p1', patientName: 'Robert Johnson', type: 'Diabetes Follow-up', date: '2025-03-10', time: '09:30 AM', status: 'Missed' },
  { id: 'ap8', patientId: 'p3', patientName: 'James Williams', type: 'Lab Work', date: '2025-03-05', time: '08:00 AM', status: 'Completed' },
];

export const reminderSummary = {
  upcomingScreenings: 8,
  overdueScreenings: 5,
  vaccinesDue: 6,
  vaccinesOverdue: 3,
  upcomingAppointments: 6,
  missedAppointments: 1,
  followUpReminders: 4,
};

export const riskDistribution = [
  { name: 'Low Risk', value: 2, color: '#22c55e' },
  { name: 'Medium Risk', value: 1, color: '#eab308' },
  { name: 'High Risk', value: 3, color: '#ef4444' },
];

export const screeningCompletionData = [
  { name: 'Colonoscopy', completed: 45, due: 20, overdue: 35 },
  { name: 'Mammogram', completed: 72, due: 18, overdue: 10 },
  { name: 'Lung Cancer', completed: 15, due: 45, overdue: 40 },
  { name: 'PSA Test', completed: 55, due: 25, overdue: 20 },
  { name: 'Cholesterol', completed: 68, due: 22, overdue: 10 },
];

export const vaccinationCoverageData = [
  { name: 'Influenza', covered: 78, notCovered: 22 },
  { name: 'COVID-19', covered: 85, notCovered: 15 },
  { name: 'Shingles', covered: 62, notCovered: 38 },
  { name: 'Pneumococcal', covered: 70, notCovered: 30 },
  { name: 'RSV', covered: 45, notCovered: 55 },
];

export const bmiDistribution = [
  { range: 'Underweight (<18.5)', count: 5 },
  { range: 'Normal (18.5-24.9)', count: 28 },
  { range: 'Overweight (25-29.9)', count: 35 },
  { range: 'Obese (30-34.9)', count: 22 },
  { range: 'Severe Obese (35+)', count: 10 },
];

export const kpiStats = {
  totalPatients: 1247,
  highRiskPatients: 187,
  dueScreenings: 324,
  overdueScreenings: 89,
  vaccinesDue: 156,
  upcomingAppointments: 42,
};

export const recentActivity = {
  recentlyUpdated: patients.slice(0, 4),
  recentRecommendations: recommendations.slice(0, 4),
  recentAppointments: appointments.filter(a => a.status === 'Scheduled').slice(0, 4),
};
