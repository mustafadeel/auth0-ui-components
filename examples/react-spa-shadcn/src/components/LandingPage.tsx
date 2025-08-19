import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Secure Authentication Components
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Beautiful, secure, and customizable authentication components built with React,
                TypeScript, and Shadcn UI. Perfect for modern web applications.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button asChild size="lg" className="bg-gray-900 hover:bg-gray-800 text-white">
                  <Link to="/profile">Get Started</Link>
                </Button>
                <a
                  href="https://auth0.com/docs"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
