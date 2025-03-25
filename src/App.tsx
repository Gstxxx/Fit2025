import React, { useState } from 'react';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import PublicDashboard from './components/PublicDashboard';
import ViewSelector from './components/ViewSelector';
import { ProtectedRoute } from './middleware/AuthMiddleware';

type View = 'selector' | 'public' | 'login' | 'editor';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState<View>('selector');

  if (isAuthenticated && currentView === 'login') {
    setCurrentView('editor');
  }

  const handleViewSelect = (view: 'public' | 'login') => {
    setCurrentView(view);
  };

  const handleBackToSelector = () => {
    setCurrentView('selector');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'selector':
        return <ViewSelector onSelectView={handleViewSelect} />;
      case 'public':
        return <PublicDashboard />;
      case 'login':
        return <LoginForm />;
      case 'editor':
        return (
          <ProtectedRoute fallback={<LoginForm />}>
            <Dashboard />
          </ProtectedRoute>
        );
      default:
        return <ViewSelector onSelectView={handleViewSelect} />;
    }
  };

  const getNavbarView = (): 'login' | 'editor' | 'public' | undefined => {
    switch (currentView) {
      case 'public':
        return 'public';
      case 'login':
        return 'login';
      case 'editor':
        return 'editor';
      default:
        return undefined;
    }
  };

  return (
    <>
      <Navbar
        currentView={getNavbarView()}
        onBackToSelector={currentView !== 'selector' ? handleBackToSelector : undefined}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 pt-20">
        {renderContent()}
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;