
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import InvoiceDashboard from './pages/InvoiceDashboard';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/invoices" element={<InvoiceDashboard />} />
        <Route path="/users" element={<UserDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
