
import React, { useState, useRef, useEffect } from 'react';
import type { Language } from '../../types';

interface BarChartProps {
    language: Language;
    data: {
        label: { en: string; np: string };
        value: number;
    }[];
}

const useContainerSize = (ref: React.RefObject<HTMLDivElement>) => {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const getObserver = () => {
            return new ResizeObserver(entries => {
                const entry = entries[0];
                if (entry) {
                    setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
                }
            });
        };
        
        const element = ref.current;
        if (!element) return;

        const observer = getObserver();
        observer.observe(element);
        
        return () => {
            if(element) {
                observer.unobserve(element);
            }
        };
    }, [ref]);

    return size;
};


const BarChart: React.FC<BarChartProps> = ({ data, language }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { width, height } = useContainerSize(containerRef);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    if (width === 0 || height === 0 || !data || data.length === 0) {
        return <div ref={containerRef} className="w-full h-full" />;
    }

    const padding = { top: 20, right: 10, bottom: 30, left: 40 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxValue = Math.max(...data.map(d => d.value), 1); // Avoid division by zero

    const totalBarSlotWidth = chartWidth / data.length;
    const barWidth = totalBarSlotWidth * 0.6; // Bar takes 60% of the slot
    
    // Logic to skip labels if too many bars
    const labelSkipThreshold = 15;
    const labelSkipRatio = Math.ceil(data.length / (chartWidth / 50)); // Approx 50px per label
    const shouldSkipLabels = data.length > labelSkipThreshold && labelSkipRatio > 1;

    return (
        <div ref={containerRef} className="w-full h-full" aria-label="Bar chart showing monthly spending">
            <svg width="100%" height="100%">
                <g transform={`translate(${padding.left}, ${padding.top})`}>
                    {/* Y-axis Lines and Labels */}
                    {[0, 0.25, 0.5, 0.75, 1].map(multiple => (
                        <g key={multiple}>
                            <line 
                                x1="0"
                                y1={chartHeight - (chartHeight * multiple)}
                                x2={chartWidth}
                                y2={chartHeight - (chartHeight * multiple)}
                                stroke="#E5E7EB"
                                strokeWidth="1"
                                strokeDasharray="2,2"
                            />
                            <text
                                x="-5"
                                y={chartHeight - (chartHeight * multiple) + 4}
                                fill="#6B7280"
                                fontSize="10"
                                textAnchor="end"
                            >
                                {(maxValue * multiple / 1000).toFixed(0)}k
                            </text>
                        </g>
                    ))}
                    
                    {/* Bars and X-axis Labels */}
                    {data.map((item, index) => {
                        const barHeight = (item.value / maxValue) * chartHeight;
                        const x = index * totalBarSlotWidth + (totalBarSlotWidth - barWidth) / 2;
                        const y = chartHeight - barHeight;

                        const showLabel = !shouldSkipLabels || index % labelSkipRatio === 0;

                        return (
                            <g 
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <title>{`${item.label[language]}: Rs. ${item.value.toLocaleString()}`}</title>
                                <rect
                                    x={x}
                                    y={y}
                                    width={barWidth}
                                    height={barHeight > 0 ? barHeight : 0}
                                    fill={hoveredIndex === index ? '#22C55E' : '#34D399'}
                                    rx="2"
                                    className="transition-all duration-200"
                                />
                                {showLabel && (
                                     <text
                                        x={x + barWidth / 2}
                                        y={chartHeight + 15}
                                        textAnchor="middle"
                                        fill="#6B7280"
                                        fontSize="10"
                                        fontWeight="medium"
                                    >
                                        {item.label[language]}
                                    </text>
                                )}
                            </g>
                        );
                    })}

                     {/* Tooltip */}
                     {hoveredIndex !== null && data[hoveredIndex] && (
                        <g 
                            pointerEvents="none" 
                            style={{ transition: 'opacity 0.2s ease-in-out' }}
                        >
                             {(() => {
                                const item = data[hoveredIndex];
                                const barHeight = (item.value / maxValue) * chartHeight;
                                const x = hoveredIndex * totalBarSlotWidth + totalBarSlotWidth / 2;
                                let y = chartHeight - barHeight - 15;
                                
                                const tooltipWidth = 70;
                                const tooltipHeight = 22;

                                let tooltipX = x - (tooltipWidth / 2);
                                if (tooltipX < 0) tooltipX = 0;
                                if (tooltipX + tooltipWidth > chartWidth) tooltipX = chartWidth - tooltipWidth;

                                return (
                                    <g transform={`translate(${tooltipX}, ${y - tooltipHeight})`}>
                                        <rect
                                            width={tooltipWidth}
                                            height={tooltipHeight}
                                            fill="rgba(17, 24, 39, 0.85)"
                                            rx="4"
                                        />
                                        <text
                                            x={tooltipWidth / 2}
                                            y={tooltipHeight / 2 + 4}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize="11"
                                            fontWeight="bold"
                                        >
                                            Rs. {item.value.toLocaleString()}
                                        </text>
                                        <path 
                                            d={`M ${x - tooltipX - 4} ${tooltipHeight} L ${x - tooltipX + 4} ${tooltipHeight} L ${x - tooltipX} ${tooltipHeight + 5}`}
                                            fill="rgba(17, 24, 39, 0.85)"
                                        />
                                    </g>
                                );
                            })()}
                        </g>
                    )}
                </g>
            </svg>
        </div>
    );
};

export default BarChart;
