'use client';

import NavBar from '@/components/nav-bar';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { Menu } from "antd";
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import FeaturesSection from '@/components/features';
import { BodyMap } from '@/components/bodyMap/BodyMap';

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