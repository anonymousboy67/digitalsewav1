
import React, { useState, useMemo } from 'react';
import type { Language } from '../types';
import { projectHistoryData } from '../data/mockData';
import BarChart from './charts/BarChart';
import PieChart from './charts/PieChart';

interface ProjectAnalyticsProps {
    language: Language;
}

type TimeRange = 'daily' | 'monthly' | 'yearly';
type AnalyticsView = 'spending' | 'category';

const ProjectAnalytics: React.FC<ProjectAnalyticsProps> = ({ language }) => {
    const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
    const [analyticsView, setAnalyticsView] = useState<AnalyticsView>('spending');
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

    const monthOptions = useMemo(() => {
        const fullNepaliMonths = [
            "जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"
        ];
        return Array.from({ length: 12 }, (_, i) => ({
            value: i,
            label: {
                en: new Date(0, i).toLocaleString('en-US', { month: 'long' }),
                np: fullNepaliMonths[i],
            }
        }));
    }, []);

    const processedData = useMemo(() => {
        const now = new Date();
        const currentYear = now.getFullYear();
        let filteredProjects = projectHistoryData;

        // Filter projects based on the selected time range for the 'Category' view.
        // 'Spending' view has its own filtering logic.
        if (timeRange === 'daily') {
             filteredProjects = projectHistoryData.filter(p => {
                const projectDate = new Date(p.date);
                return projectDate.getFullYear() === currentYear && projectDate.getMonth() === selectedMonth;
            });
        } else if (timeRange === 'monthly') {
            filteredProjects = projectHistoryData.filter(p => new Date(p.date).getFullYear() === currentYear);
        }
        
        if (analyticsView === 'spending') {
            const spendingMap = new Map<string, number>();
            if (timeRange === 'daily') {
                const daysInMonth = new Date(currentYear, selectedMonth + 1, 0).getDate();
                const dailyProjects = projectHistoryData.filter(p => {
                    const projectDate = new Date(p.date);
                    return projectDate.getFullYear() === currentYear && projectDate.getMonth() === selectedMonth;
                });

                for (let i = 1; i <= daysInMonth; i++) {
                    const d = new Date(Date.UTC(currentYear, selectedMonth, i));
                    spendingMap.set(d.toISOString().slice(0, 10), 0);
                }

                dailyProjects.forEach(p => {
                    spendingMap.set(p.date, (spendingMap.get(p.date) || 0) + p.amount_spent);
                });

                return Array.from(spendingMap.entries()).map(([date, value]) => ({ 
                    label: { 
                        en: new Date(date).getUTCDate().toString(),
                        np: new Date(date).toLocaleDateString('ne-NP', { day: 'numeric' }) 
                    }, 
                    value 
                }));

            } else if (timeRange === 'monthly') {
                const months = Array.from({length: 12}, (_, i) => new Date(0, i).toLocaleString('en-US', {month: 'short'}));
                const nepaliMonths = ['माघ', 'फागुन', 'चैत', 'वैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पुष'];
                months.forEach(m => spendingMap.set(m, 0));
                
                const monthlyProjects = projectHistoryData.filter(p => new Date(p.date).getFullYear() === currentYear);
                monthlyProjects.forEach(p => {
                    const month = new Date(p.date).toLocaleString('en-US', { month: 'short' });
                    spendingMap.set(month, (spendingMap.get(month) || 0) + p.amount_spent);
                });
                return months.map((m, i) => ({ label: { en: m, np: nepaliMonths[i] }, value: spendingMap.get(m) || 0 }));

            } else { // yearly
                projectHistoryData.forEach(p => {
                    const year = new Date(p.date).getFullYear().toString();
                    spendingMap.set(year, (spendingMap.get(year) || 0) + p.amount_spent);
                });
                return Array.from(spendingMap.entries())
                    .map(([year, value]) => ({ label: { en: year, np: year }, value }))
                    .sort((a,b) => a.label.en.localeCompare(b.label.en));
            }
        } else { // category
            const categoryMap = new Map<string, { value: number, name: { en: string; np: string }, color: string }>();
            const categoryColors: { [key: string]: string } = {
                Design: '#34D399', Development: '#60A5FA', Writing: '#FBBF24', Marketing: '#F87171'
            };
            const nepaliCategories: { [key: string]: string } = {
                 Design: 'डिजाइन', Development: 'विकास', Writing: 'लेखन', Marketing: 'मार्केटिङ'
            };

            filteredProjects.forEach(p => {
                const category = p.category;
                if (!categoryMap.has(category)) {
                    categoryMap.set(category, { value: 0, name: { en: category, np: nepaliCategories[category] }, color: categoryColors[category] || '#A78BFA' });
                }
                categoryMap.get(category)!.value += 1;
            });
            return Array.from(categoryMap.values());
        }

    }, [timeRange, analyticsView, selectedMonth, language]);

    const viewOptions = [
        { id: 'spending', label: { en: 'Spending Overview', np: 'खर्च अवलोकन' } },
        { id: 'category', label: { en: 'Category Distribution', np: 'श्रेणी वितरण' } },
    ];
    
    const timeRangeOptions: {id: TimeRange, label: {en: string, np: string}}[] = [
        { id: 'daily', label: { en: 'Daily', np: 'दैनिक' } },
        { id: 'monthly', label: { en: 'Monthly', np: 'मासिक' } },
        { id: 'yearly', label: { en: 'Yearly', np: 'वार्षिक' } },
    ];

    const currentViewLabel = viewOptions.find(v => v.id === analyticsView)?.label[language];
    
    const subtitle = useMemo(() => {
        const currentTimeRangeLabel = timeRangeOptions.find(t => t.id === timeRange)?.label[language];
        if (timeRange === 'daily') {
            const monthName = monthOptions.find(m => m.value === selectedMonth)?.label[language];
            const year = new Date().getFullYear().toLocaleString('ne-NP');
            return language === 'en' ? `Showing daily data for ${monthName}` : `${year} ${monthName} को लागि दैनिक डाटा`;
        }
        return `${language === 'en' ? 'Showing' : ''} ${currentTimeRangeLabel} ${language === 'en' ? 'data' : 'डाटा देखाउँदै'}`;
    }, [timeRange, selectedMonth, language, timeRangeOptions, monthOptions]);


    return (
        <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                     <h2 className="text-2xl font-bold text-gray-800">{currentViewLabel}</h2>
                     <p className="text-sm text-gray-500">{subtitle}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="bg-gray-100 p-1 rounded-lg flex items-center">
                        {timeRangeOptions.map(opt => (
                            <button 
                                key={opt.id}
                                onClick={() => setTimeRange(opt.id)}
                                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors ${
                                    timeRange === opt.id
                                        ? 'bg-white text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                {opt.label[language]}
                            </button>
                        ))}
                    </div>

                    {timeRange === 'daily' && analyticsView === 'spending' && (
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}
                            className="bg-gray-100 p-2 rounded-lg text-sm font-semibold text-gray-700 border-transparent focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            aria-label={language === 'en' ? 'Select month' : 'महिना चयन गर्नुहोस्'}
                        >
                            {monthOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label[language]}</option>
                            ))}
                        </select>
                    )}
                    
                    <select
                        value={analyticsView}
                        onChange={(e) => setAnalyticsView(e.target.value as AnalyticsView)}
                        className="bg-gray-100 p-2 rounded-lg text-sm font-semibold text-gray-700 border-transparent focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        {viewOptions.map(opt => (
                            <option key={opt.id} value={opt.id}>{opt.label[language]}</option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className="h-72">
                 {analyticsView === 'spending' && <BarChart data={processedData as any} language={language} />}
                 {analyticsView === 'category' && <PieChart data={processedData as any} language={language} />}
            </div>
        </section>
    );
};

export default ProjectAnalytics;
