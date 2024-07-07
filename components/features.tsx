import { useUser } from '@auth0/nextjs-auth0/client';
import React from 'react';

const FeaturesSection = () => {
    const { user, error, isLoading } = useUser();

    return (
        <section id='features' className="bg-[#F0F4F7] py-20 px-4 sm:px-6 lg:px-8 pb-40">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold leading-tight mb-8 text-[#054145]">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4 text-[#054145]">Create, View, Update, Delete Injury Reports</h3>
                        <p className="text-lg mb-4 text-[#054145]">
                            Users can create, view, update, and delete injury reports. Each report includes details like the name of the reporter and date & time of injury.
                        </p>
                        {!user ? (
                            <button className="bg-[#A5D8CC] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                                Login / Sign Up
                            </button>
                        ) : (
                            <button className="bg-[#A5D8CC] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                                Manage Reports
                            </button>
                        )}
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4 text-[#054145]">Body Map Integration</h3>
                        <p className="text-lg mb-4 text-[#054145]">
                            Users can encircle different areas of injury on a body map image, with automatic numbering labels. Detailed injury information can be provided for each encircled area.
                        </p>
                        {!user ? (
                            <button className="bg-[#A5D8CC] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                                Login / Sign Up
                            </button>
                        ) : (
                            <button className="bg-[#A5D8CC] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                                Use Body Map
                            </button>
                        )}
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4 text-[#054145]">List of Reports</h3>
                        <p className="text-lg mb-4 text-[#054145]">
                            Users can view a table of all reported injuries, sortable by name, date & time of injury, and date of report. Search and filter options are available based on name and date ranges.
                        </p>
                        {!user ? (
                            <button className="bg-[#A5D8CC] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                                Login / Sign Up
                            </button>
                        ) : (
                            <button className="bg-[#A5D8CC] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                                View Reports
                            </button>
                        )}
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-4 text-[#054145]">User Authentication</h3>
                        <p className="text-lg mb-4 text-[#054145]">
                            Users can register with username and password, and optionally login with Google. Authentication is handled securely with Auth0. Users can manage their account and log in/out.
                        </p>
                        {!user ? (
                            <button className="bg-[#A5D8CC] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                                Login / Sign Up
                            </button>
                        ) : (
                            <button className="bg-[#A5D8CC] text-white py-2 px-6 rounded-md shadow-md hover:bg-[#054145] hover:text-white transition duration-300 ease-in-out">
                                Manage Account
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
