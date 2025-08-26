import React from 'react';
import Card from '../ui/Card';
import { demoStudent, demoPrefs } from '../../lib/demoData';
import { Camera } from 'lucide-react';

const ProfileSection = () => {
    // A simple, decorative illustration for the bottom-right corner.
    const DecorativeIllustration = () => (
        <div className="absolute -bottom-8 -right-8 text-muted/50 pointer-events-none" aria-hidden="true">
            <svg width="160" height="157" viewBox="0 0 160 157" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M160 78.5C160 121.851 124.183 157 80 157C35.8172 157 0 121.851 0 78.5C0 35.1492 35.8172 0 80 0C124.183 0 160 35.1492 160 78.5Z" fill="currentColor"/>
            </svg>
        </div>
    );

    return (
        <Card className="p-4 md:p-5 h-full flex flex-col relative overflow-hidden">
            <h3 className="text-xl font-semibold mb-4">Profile</h3>
            {/* Top section: Avatar, Name, and Subtitle */}
            <div className="flex items-center gap-4 lg:gap-5 mb-6">
                <button className="relative group flex-shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                    <img
                        src={demoPrefs.avatarUrl}
                        alt="Student Avatar"
                        className="w-28 h-28 lg:w-32 lg:h-32 rounded-full ring-4 ring-surface shadow-md object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
                        <Camera size={24} />
                        <span className="text-xs font-semibold mt-1">Change avatar</span>
                    </div>
                </button>
                
                <div className="flex-grow">
                    <h2 className="text-h2 font-bold text-text">{demoStudent.name}</h2>
                    <p className="small mt-1">
                        {demoStudent.year} &bull; {demoStudent.school} &bull; {demoStudent.id}
                    </p>
                </div>
            </div>

            {/* Identity Rows - using grid for alignment to prevent label wrapping */}
            <div className="grid grid-cols-[100px_1fr] items-center gap-x-4 gap-y-2 text-body">
                {[
                    { label: 'Year group', value: demoStudent.year },
                    { label: 'School', value: demoStudent.school },
                    { label: 'District', value: demoStudent.district },
                    { label: 'Student ID', value: demoStudent.id },
                ].map(({ label, value }) => (
                    <React.Fragment key={label}>
                        <p className="font-semibold text-subtext text-right">{label}</p>
                        <p className="text-text">{value}</p>
                    </React.Fragment>
                ))}
            </div>

            {/* Spacer to push content up and illustration to the corner */}
            <div className="flex-grow" />
            
            <DecorativeIllustration />
        </Card>
    );
};

export default ProfileSection;