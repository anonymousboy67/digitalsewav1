
import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 62 51" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.6842 1.57143L0.526306 10.1429V20.7143L15.9474 25L22.6842 1.57143Z" fill="#4ade80" />
        <path d="M22.6842 1.57143L34.5263 23.5714V50.4286L22.6842 28.4286V1.57143Z" fill="#22C55E" />
        <path d="M22.6842 28.4286L34.5263 50.4286H49.9474L61.7895 28.4286H22.6842Z" fill="#374151" />
        <path d="M34.5263 23.5714L61.7895 0L49.9474 23.5714H34.5263Z" fill="#374151" />
        <circle cx="16" cy="11.5" r="2.5" fill="#111827"/>
    </svg>
);

export default LogoIcon;
