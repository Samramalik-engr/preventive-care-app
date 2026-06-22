
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import api from '../services/api';

export function PatientsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
  const response = await api.get('/patients');

  console.log("PATIENT RESPONSE =", response);
  console.log("PATIENT DATA =", response.data);

  setPatients(response.data);

} catch (error) {
  console.error("PATIENT ERROR =", error);
}
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Patients</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage and view patient records
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search patients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <p className="text-red-500 font-bold">
  Total Patients: {patients.length}
</p> 

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredPatients.map((patient) => (
          <Link key={patient.id} to={`/patients/${patient.id}`}>
            <Card className="hover:shadow-md transition-all duration-200 hover:border-cyan-200">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-white font-semibold">
                    {patient.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {patient.name}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {patient.age} yrs, {patient.gender}
                    </p>

                    <div className="mt-3 space-y-1 text-sm text-slate-600">
                      <p>BMI: {patient.bmi}</p>
                      <p>Height: {patient.height} cm</p>
                      <p>Weight: {patient.weight} kg</p>
                      <p>{patient.race_ethnicity}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))} 
      </div>
    </div>
  );
}