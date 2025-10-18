import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AccountsList from './pages/AccountsList';
import AccountTimeline from './pages/AccountTimeline';
import Analytics from './pages/AnalyticsDashboard';
import { BarChart3, Home } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600">TouchTrack</span>
                </Link>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Accounts
                </Link>
                <Link
                  to="/analytics"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<AccountsList />} />
          <Route path="/accounts/:id" element={<AccountTimeline />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;