import DashboardLayout from './layouts/dashboard';
import Student from './pages/student';
import { StudentContextProvider } from './contexts/studentContext';

export default function App() {
  return (
    <DashboardLayout>
      <StudentContextProvider>
        <Student />
      </StudentContextProvider>
    </DashboardLayout>
  );
}
