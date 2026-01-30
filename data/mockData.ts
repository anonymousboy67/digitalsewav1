
import type { Project, Freelancer, Client } from '../types';

export const projectsData: Project[] = [
  {
    id: '1',
    title: { en: 'E-commerce Website Design', np: 'ई-कमर्स वेबसाइट डिजाइन' },
    description: {
      en: 'We are looking for a talented UI/UX designer to create a modern and user-friendly design for our new e-commerce platform. The project involves creating wireframes, mockups, and a complete design system in Figma.',
      np: 'हामी हाम्रो नयाँ ई-कमर्स प्लेटफर्मको लागि एक आधुनिक र प्रयोगकर्ता-मैत्री डिजाइन सिर्जना गर्न एक प्रतिभाशाली UI/UX डिजाइनर खोजिरहेका छौं। परियोजनामा ​​वायरफ्रेमहरू, मकअपहरू, र फिग्मामा पूर्ण डिजाइन प्रणाली सिर्जना गर्ने समावेश छ।'
    },
    budget: 25000,
    deadline: '2 Weeks',
    location: 'Kathmandu',
    skills: ['UI/UX', 'Figma', 'Web Design'],
    isUrgent: true,
    status: 'Open',
    difficulty: 'Medium',
  },
  {
    id: '2',
    title: { en: 'Mobile App for Restaurant', np: 'रेस्टुरेन्टको लागि मोबाइल एप' },
    description: {
        en: 'Develop a cross-platform mobile application for a restaurant chain. Features should include menu browsing, online ordering, table reservations, and a loyalty program. Backend API will be provided.',
        np: 'एक रेस्टुरेन्ट श्रृंखलाको लागि क्रस-प्लेटफर्म मोबाइल अनुप्रयोग विकास गर्नुहोस्। सुविधाहरूमा मेनु ब्राउजिङ, अनलाइन अर्डरिङ, टेबल आरक्षण, र एक लोयल्टी कार्यक्रम समावेश हुनुपर्छ। ब्याकइन्ड एपीआई प्रदान गरिनेछ।'
    },
    budget: 50000,
    deadline: '1 Month',
    location: 'Pokhara',
    skills: ['React Native', 'Firebase', 'API'],
    isUrgent: false,
    status: 'In Progress',
    difficulty: 'Hard',
  },
   {
    id: '3',
    title: { en: 'Content Writing for Travel Blog', np: 'यात्रा ब्लगको लागि सामग्री लेखन' },
    description: {
        en: 'Need a creative content writer to produce 10 high-quality blog posts (1000-1500 words each) for a travel blog focused on destinations in Nepal. SEO knowledge is a must.',
        np: 'नेपालका गन्तव्यहरूमा केन्द्रित ट्राभल ब्लगको लागि १० उच्च-गुणस्तरको ब्लग पोस्टहरू (प्रत्येक १०००-१५०० शब्दहरू) उत्पादन गर्न एक रचनात्मक सामग्री लेखक आवश्यक छ। एसईओ ज्ञान अनिवार्य छ।'
    },
    budget: 10000,
    deadline: '3 Weeks',
    location: 'Chitwan',
    skills: ['SEO', 'Content', 'Nepali'],
    isUrgent: false,
    status: 'Completed',
    difficulty: 'Easy',
  },
  {
    id: '4',
    title: { en: 'Hotel Booking System API', np: 'होटल बुकिंग प्रणाली एपीआई' },
    description: {
        en: 'Build a robust and scalable REST API for a hotel booking system. The API should handle room management, bookings, user authentication, and payment gateway integration.',
        np: 'होटल बुकिंग प्रणालीको लागि एक बलियो र स्केलेबल REST API बनाउनुहोस्। एपीआईले कोठा व्यवस्थापन, बुकिङ, प्रयोगकर्ता प्रमाणीकरण, र भुक्तानी गेटवे एकीकरण ह्यान्डल गर्नुपर्छ।'
    },
    budget: 45000,
    deadline: '5 Weeks',
    location: 'Lalitpur',
    skills: ['Node.js', 'Express', 'MongoDB'],
    isUrgent: false,
    status: 'In Progress',
    difficulty: 'Hard',
  },
  {
    id: '5',
    title: { en: 'Brand Logo and Identity', np: 'ब्रान्ड लोगो र पहिचान' },
    description: {
        en: 'Create a unique and memorable logo and complete brand identity package for a new tech startup. Deliverables should include logo variations, color palette, typography guidelines, and social media kit.',
        np: 'नयाँ टेक स्टार्टअपको लागि एक अद्वितीय र अविस्मरणीय लोगो र पूर्ण ब्रान्ड पहिचान प्याकेज सिर्जना गर्नुहोस्। डेलिभरेबलहरूमा लोगो भिन्नताहरू, रङ प्यालेट, टाइपोग्राफी दिशानिर्देशहरू, र सोशल मिडिया किट समावेश हुनुपर्छ।'
    },
    budget: 15000,
    deadline: '1 Week',
    location: 'Kathmandu',
    skills: ['Illustrator', 'Branding', 'Logo Design'],
    isUrgent: true,
    status: 'Open',
    difficulty: 'Medium',
  },
  {
    id: '6',
    title: { en: 'Social Media Marketing Campaign', np: 'सामाजिक मिडिया मार्केटिङ अभियान' },
    description: {
        en: 'Plan and execute a 3-month social media marketing campaign for a fashion brand. The goal is to increase brand awareness and drive online sales. Must be experienced with Facebook/Instagram Ads.',
        np: 'एक फेसन ब्रान्डको लागि ३-महिनाको सामाजिक मिडिया मार्केटिङ अभियानको योजना र कार्यान्वयन गर्नुहोस्। लक्ष्य ब्रान्ड जागरूकता बढाउनु र अनलाइन बिक्री बढाउनु हो। फेसबुक/इन्स्टाग्राम विज्ञापनमा अनुभवी हुनुपर्छ।'
    },
    budget: 30000,
    deadline: '1 Month',
    location: 'Online',
    skills: ['Facebook Ads', 'Content Strategy', 'Analytics'],
    isUrgent: false,
    status: 'Completed',
    difficulty: 'Medium',
  },
];

export const clientData: Client = {
    id: 'c1',
    name: 'Ram K.C.',
    avatarUrl: 'https://picsum.photos/id/1005/200/200',
    postedJobsHistory: [
        { projectId: '1', budget: 25000, freelancerRating: 5 },
        { projectId: '2', budget: 50000, freelancerRating: 4 },
        { projectId: '3', budget: 10000, freelancerRating: 5 },
    ]
};

export const freelancersData: Freelancer[] = [
  {
    id: '1',
    name: 'Sita Sharma',
    avatarUrl: 'https://picsum.photos/id/1027/200/200',
    title: { en: 'Senior UI/UX Designer', np: 'वरिष्ठ UI/UX डिजाइनर' },
    hourlyRate: 1200,
    isVerified: true,
    isOnline: true,
    skills: ['UI/UX', 'Figma', 'Web Design', 'Branding', 'Illustrator'],
    completedJobsHistory: [
        { projectId: '1', budget: 25000, difficulty: 'Medium', isUrgent: true, clientRating: 5 },
        { projectId: '5', budget: 15000, difficulty: 'Medium', isUrgent: true, clientRating: 4 },
        { projectId: 'p-design-1', budget: 8000, difficulty: 'Easy', isUrgent: false, clientRating: 5 },
        { projectId: 'p-design-2', budget: 22000, difficulty: 'Hard', isUrgent: false, clientRating: 5 },
    ]
  },
  {
    id: '2',
    name: 'Hari Thapa',
    avatarUrl: 'https://picsum.photos/id/1005/200/200',
    title: { en: 'Full Stack Developer', np: 'फुल स्ट्याक डेभलपर' },
    hourlyRate: 1500,
    isVerified: true,
    isOnline: false,
    skills: ['React Native', 'Firebase', 'API', 'Node.js', 'MongoDB', 'Express'],
    completedJobsHistory: [
        { projectId: '2', budget: 50000, difficulty: 'Hard', isUrgent: false, clientRating: 4 },
        { projectId: '4', budget: 45000, difficulty: 'Hard', isUrgent: false, clientRating: 5 },
    ]
  },
   {
    id: '3',
    name: 'Anjali Rai',
    avatarUrl: 'https://picsum.photos/id/1011/200/200',
    title: { en: 'Digital Marketing Expert', np: 'डिजिटल मार्केटिङ विशेषज्ञ' },
    hourlyRate: 1000,
    isVerified: true,
    isOnline: true,
    skills: ['Facebook Ads', 'Content Strategy', 'Analytics', 'SEO'],
    completedJobsHistory: [
        { projectId: '6', budget: 30000, difficulty: 'Medium', isUrgent: false, clientRating: 5 },
    ]
  },
  {
    id: '4',
    name: 'Bishal Thapa',
    avatarUrl: 'https://picsum.photos/id/64/200/200',
    title: { en: 'Video Editor & Animator', np: 'भिडियो सम्पादक र एनिमेटर' },
    hourlyRate: 1100,
    isVerified: false,
    isOnline: true,
    skills: ['Premiere Pro', 'After Effects', 'Animation', 'Video Editing'],
    completedJobsHistory: []
  },
  {
    id: '5',
    name: 'Gita Gurung',
    avatarUrl: 'https://picsum.photos/id/1012/200/200',
    title: { en: 'SEO Content Writer', np: 'एसईओ सामग्री लेखक' },
    hourlyRate: 800,
    isVerified: true,
    isOnline: false,
    skills: ['SEO', 'Content', 'Nepali', 'Copywriting', 'Blogging'],
    completedJobsHistory: [
        { projectId: '3', budget: 10000, difficulty: 'Easy', isUrgent: false, clientRating: 5 },
    ]
  },
  {
    id: '6',
    name: 'Hari Pandey',
    avatarUrl: 'https://picsum.photos/id/1013/200/200',
    title: { en: 'DevOps Engineer', np: 'DevOps इन्जिनियर' },
    hourlyRate: 2000,
    isVerified: true,
    isOnline: true,
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    completedJobsHistory: []
  },
];

// NEW: Expanded data for dynamic analytics
const generateDate = (year: number, month: number, day: number) => new Date(year, month - 1, day).toISOString().slice(0, 10);
const currentYear = new Date().getFullYear();

export const projectHistoryData = [
    // Last year's data
    { date: generateDate(currentYear - 1, 10, 15), amount_spent: 35000, category: 'Development' },
    { date: generateDate(currentYear - 1, 11, 20), amount_spent: 12000, category: 'Design' },
    { date: generateDate(currentYear - 1, 12, 5), amount_spent: 18000, category: 'Writing' },
    
    // This year's monthly data
    { date: generateDate(currentYear, 1, 10), amount_spent: 25000, category: 'Design' },
    { date: generateDate(currentYear, 2, 5), amount_spent: 45000, category: 'Development' },
    { date: generateDate(currentYear, 2, 22), amount_spent: 10000, category: 'Marketing' },
    { date: generateDate(currentYear, 3, 18), amount_spent: 15000, category: 'Design' },
    { date: generateDate(currentYear, 4, 12), amount_spent: 30000, category: 'Development' },
    { date: generateDate(currentYear, 4, 28), amount_spent: 8000, category: 'Writing' },
    { date: generateDate(currentYear, 5, 20), amount_spent: 55000, category: 'Development' },
    { date: generateDate(currentYear, 6, 9), amount_spent: 20000, category: 'Design' },
    { date: generateDate(currentYear, 6, 25), amount_spent: 5000, category: 'Writing' },
    { date: generateDate(currentYear, 7, 3), amount_spent: 32000, category: 'Marketing' },
    
    // Recent daily data for the last 30 days
    ...Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i);
        if (d.getDay() % 2 === 0 && d.getDate() > 3) return null; // Sporadic spending
        
        const categories = ['Design', 'Development', 'Writing', 'Marketing'];
        return {
            date: d.toISOString().slice(0, 10),
            amount_spent: Math.floor(Math.random() * (5000 - 1000 + 1) + 1000),
            category: categories[Math.floor(Math.random() * categories.length)],
        }
    }).filter(Boolean) as { date: string, amount_spent: number, category: string }[],
];