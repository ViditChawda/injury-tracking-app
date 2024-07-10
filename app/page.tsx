'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import NavBar from '../components/nav-bar';
import Hero from '../components/hero';
import FeaturesSection from '../components/features';
import Footer from '../components/footer';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  if (error) return <div>{error.message}</div>;

  return (
    <div className='min-h-[100vh] bg-[#effffd] text-white'>
      <NavBar />
      <Hero />
      <FeaturesSection />
      <Footer />
    </div>
  );
}