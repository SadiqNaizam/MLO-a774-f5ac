import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react'; // Icon for logout

interface HeaderProps {
  appName?: string;
  onLogout: () => void; // Callback function for logout action
}

const Header: React.FC<HeaderProps> = ({ appName = "Dashboard", onLogout }) => {
  console.log("Rendering Header component");

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* App Name / Logo */}
          <div className="flex items-center">
            <span className="font-semibold text-xl text-foreground">
              {appName}
            </span>
          </div>

          {/* Navigation / Actions */}
          <div className="flex items-center space-x-4">
            {/* Placeholder for other navigation items if needed */}
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;