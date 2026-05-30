import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hook/useAuth';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './page/Home';
import Login from './page/Login';
import Signup from './page/Signup';
import ScheduleList from './component/ScheduleList';
import CustomerDashboard from './page/Customer/CustomerDashboard';
import AdminDashboard from './page/Admin/AdminDashboard';
import TrainerDashboard from './page/Trainer/TrainerDashboard';
import AdminProtectedRoute from './protected/AdminProtectedRoute';
import TrainerProtectedRoute from './protected/TrainerProtectedRoute';
import CustomerProtectedRoute from './protected/CustomerProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/class" element={<CustomerProtectedRoute><ScheduleList /></CustomerProtectedRoute>} />
              <Route path="/dashboard" element={<CustomerProtectedRoute><CustomerDashboard /></CustomerProtectedRoute>} />
              <Route path="/admin" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
              <Route path="/trainer" element={<TrainerProtectedRoute><TrainerDashboard /></TrainerProtectedRoute>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;