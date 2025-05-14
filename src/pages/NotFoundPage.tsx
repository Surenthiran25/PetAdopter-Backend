import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Home, Search } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container-custom py-16 min-h-[60vh] flex items-center">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <PawPrint className="h-20 w-20 text-primary-400" />
        </div>
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! Looks like this page has run away. Don't worry, our other furry friends are still here.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary flex items-center justify-center">
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Link>
          <Link to="/pets" className="btn-outline flex items-center justify-center">
            <Search className="mr-2 h-5 w-5" />
            Find Pets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;