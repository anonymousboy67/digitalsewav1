
import React, { useState } from 'react';
import type { Language } from '../../types';

interface PieChartProps {
    language: Language;
    data: {
        name: { en: string; np: string };
        value: number;
        color: string;
    }[];
}

const PieChart: React.FC<PieChartProps> = ({ data, language }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercent = 0;

    const getCoordinatesForPercent = (percent: number) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);
        return [x, y];
    };
    
    const activeSlice = hoveredIndex !== null ? data[hoveredIndex] : null;

    return (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="relative w-40 h-40 flex-shrink-0">
                <svg viewBox="-1 -1 2 2" className="transform -rotate-90">
                    {data.map((item, index) => {
                        const percent = item.value / total;
                        const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
                        cumulativePercent += percent;
                        const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
                        const largeArcFlag = percent > 0.5 ? 1 : 0;
                        
                        const pathData = [
                            `M ${startX} ${startY}`, // Move
                            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                            `L 0 0`, // Line
                        ].join(' ');

                        return (
                            <path
                                key={item.name[language]}
                                d={pathData}
                                fill={item.color}
                                className="stroke-white"
                                style={{
                                    strokeWidth: 0.05,
                                    transform: hoveredIndex === index ? 'scale(1.06)' : 'scale(1)',
                                    transformOrigin: 'center',
                                    transition: 'all 0.2s ease-out',
                                    opacity: (hoveredIndex === null || hoveredIndex === index) ? 1 : 0.7,
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <title>{`${item.name[language]}: ${item.value} ${language === 'en' ? 'projects' : 'परियोजनाहरू'}`}</title>
                            </path>
                        );
                    })}
                </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    {activeSlice ? (
                        <>
                            <span className="text-2xl font-bold text-gray-800">
                                {((activeSlice.value / total) * 100).toFixed(0)}%
                            </span>
                            <span className="text-xs text-gray-600 px-1">{activeSlice.name[language]}</span>
                        </>
                    ) : (
                        <>
                             <span className="text-2xl font-bold text-gray-800">{total}</span>
                             <span className="text-xs font-semibold text-gray-500">{language === 'en' ? 'Projects' : 'परियोजनाहरू'}</span>
                        </>
                    )}
                </div>
            </div>
            <div className="flex flex-col space-y-2">
                {data.map((item, index) => (
                    <div 
                        key={item.name[language]} 
                        className="flex items-center text-sm cursor-pointer"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: item.color }}></span>
                        <span className={`transition-colors ${hoveredIndex === index ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>{item.name[language]}</span>
                        <span className={`ml-auto font-medium transition-colors ${hoveredIndex === index ? 'text-gray-800' : 'text-gray-500'}`}>
                            {((item.value / total) * 100).toFixed(0)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;