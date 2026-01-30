
import React, { useMemo } from 'react';
import type { Language } from '../types';

interface PasswordStrengthIndicatorProps {
    password: string;
    language: Language;
}

const strengthLevels = {
    0: { label: { en: '', np: '' }, color: 'bg-gray-200', width: '0%' },
    1: { label: { en: 'Weak', np: 'कमजोर' }, color: 'bg-red-500', width: '33.33%' },
    2: { label: { en: 'Medium', np: 'मध्यम' }, color: 'bg-yellow-500', width: '66.66%' },
    3: { label: { en: 'Strong', np: 'बलियो' }, color: 'bg-green-500', width: '100%' },
};

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ password, language }) => {
    const strength = useMemo(() => {
        let score = 0;
        if (!password) {
            return 0;
        }

        const checks = [
            /[a-z]/.test(password), // lowercase
            /[A-Z]/.test(password), // uppercase
            /[0-9]/.test(password), // numbers
            /[^a-zA-Z0-9]/.test(password) // symbols
        ];

        const passedChecks = checks.filter(Boolean).length;

        if (password.length > 0 && password.length < 8) {
            return 1; // Always weak if less than 8 characters but not empty
        }
        
        if (passedChecks >= 3 && password.length >= 8) {
            score = 3; // Strong
        } else if (passedChecks >= 2 && password.length >= 8) {
            score = 2; // Medium
        } else if (password.length >= 8) {
            score = 1; // Weak
        }
        
        return score;

    }, [password]);

    const currentStrength = strengthLevels[strength as keyof typeof strengthLevels];

    if (!password) {
        return null;
    }

    return (
        <div className="mt-2" aria-live="polite">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentStrength.color}`}
                    style={{ width: currentStrength.width }}
                    role="progressbar"
                    aria-valuenow={strength}
                    aria-valuemin={0}
                    aria-valuemax={3}
                    aria-valuetext={currentStrength.label[language]}
                ></div>
            </div>
            {currentStrength.label.en && (
                <p className={`text-xs mt-1 font-semibold ${
                    strength === 1 ? 'text-red-500' : 
                    strength === 2 ? 'text-yellow-500' : 
                    strength === 3 ? 'text-green-500' : 'text-gray-500'
                }`}>
                    {currentStrength.label[language]}
                </p>
            )}
        </div>
    );
};

export default PasswordStrengthIndicator;
