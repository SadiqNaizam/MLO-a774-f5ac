import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header'; // Custom Header
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // Keep for completeness, though Header handles logout

const DashboardPage: React.FC = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Logout action triggered');
    // Clear auth state (e.g., from localStorage)
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };
  
  // Simple check for authentication, redirect if not authenticated
  // In a real app, this would be handled by a protected route mechanism
  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate]);


  return (
    <div className="flex flex-col min-h-screen">
      <Header appName="My Application" onLogout={handleLogout} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Welcome to your Dashboard!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300">
              This is your protected dashboard area. You have successfully logged in.
              From here, you can manage your account, view application data, or access other features.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c7da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhbSUyMG1lZXRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60" 
              alt="Dashboard illustration" 
              className="mt-6 rounded-lg shadow-md"
            />
          </CardContent>
        </Card>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-800 text-center py-4 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} Your Application. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardPage;