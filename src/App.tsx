import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Dashboard } from '@/pages/Dashboard';
import { PatientsList } from '@/pages/PatientsList';
import { PatientProfile } from '@/pages/PatientProfile';
import { AIRecommendations } from '@/pages/AIRecommendations';
import { ReminderCenter } from '@/pages/ReminderCenter';
import { AIAssistant } from '@/pages/AIAssistant';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="patients/:id" element={<PatientProfile />} />
          <Route path="recommendations" element={<AIRecommendations />} />
          <Route path="reminders" element={<ReminderCenter />} />
          <Route path="assistant" element={<AIAssistant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
