import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react';

const Hero = () => {
    const { user, error, isLoading } = useUser();
    return (
        <section className="hero container bg-[#A5D8CC] text-white py-20 md:pt-40 min-h-[70vh]">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4 text-[#054145]">
                    Streamline Injury Tracking with <br /> <span>Vidit Chawda</span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl mb-8 text-[#054145]">
                    Easily manage injury reports with detailed documentation and user-friendly tools.
                </p>
                {!user ?
                    <div className="flex space-x-4">
                        <button className="bg-[#E0fefe] text-[#054145] py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                            Login / Sign Up
                        </button>
                        <button className="bg-[#E0fefe] text-[#054145] py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                            Learn More
                        </button>
                    </div>
                    :
                    <div>
                        <button className="bg-[#E0fefe] text-[#054145] py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                            Reports
                        </button>
                    </div>
                }
            </div>
        </section>
    );
}

export default Hero;
