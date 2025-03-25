import React, { useState } from 'react';
// import arrowSearchInput from "../images/icon/arrow-search-ip.svg";
import ServiceDetails from '../components/Modals/ServiceDetails';

const allTopicsArray = [
    { id: 1, name: "Entity Management" },
    { id: 2, name: "Accounting and Tax" },
    { id: 3, name: "Compliance" },
    { id: 4, name: "Business Expansion" },
];

const servicesArray = [
    {
        id: 1,
        topicId: 1,
        title: "Legal Entity Formation",
        description: "Set up your Dutch business entity hassle-free with complete documentation preparation and registration with the Chamber of Commerce (KvK).",
        price: "Starting from €1,200",
        detailedDescription: "This service includes multiple entity types (e.g., B.V., N.V.), preparation of complete documentation, and registration with the Chamber of Commerce (KvK). Benefits include limited liability protection, enhanced credibility with Dutch partners, and access to local business opportunities."
    },
    {
        id: 2,
        topicId: 1,
        title: "Director Management",
        description: "Seamlessly manage appointments and resignations of directors with full compliance with Dutch corporate governance.",
        price: "Included in eBranch Membership (€65 normal rate)",
        detailedDescription: "This service ensures quick processing of director changes, UBO (Ultimate Beneficial Owner) registration, and compliance with Dutch corporate governance. It provides flexibility in management structure and transparent leadership changes."
    },
    {
        id: 3,
        topicId: 1,
        title: "Share Transfer",
        description: "Effortlessly transfer shares compliant with Dutch law, including preparation of documents and shareholder agreement updates.",
        price: "Starting from €450 per transfer",
        detailedDescription: "Preparation of transfer documents, registration of changes with authorities, and updates to shareholder agreements. This service ensures smooth ownership transitions and adherence to local regulations."
    },
    {
        id: 4,
        topicId: 2,
        title: "AI-Powered Accounting Suite",
        description: "Automate bookkeeping, financial reporting, and tax compliance with AI-driven tools, offering real-time financial insights.",
        price: "Starting from €35/month",
        detailedDescription: "This service automates bookkeeping, financial reporting, and tax compliance while adhering to Dutch GAAP. Benefits include AI-powered efficiency, real-time insights, and cost reductions through automation."
    },
    {
        id: 5,
        topicId: 2,
        title: "Tax Consulting",
        description: "Optimize your tax position and maintain compliance with comprehensive tax planning and preparation services.",
        price: "€195 per hour",
        detailedDescription: "Includes tax planning and optimization, preparation of tax returns, compliance monitoring, and audit support. This service reduces tax liabilities, ensures compliance, and provides stress-free management of your tax affairs."
    },
    {
        id: 6,
        topicId: 2,
        title: "VAT Registration",
        description: "Navigate Dutch VAT regulations with ease, including number acquisition and initial VAT return filing guidance.",
        price: "Included in eBranch Membership (€250 normal rate)",
        detailedDescription: "This service helps acquire a VAT number, register with Dutch Tax Authorities, and offers guidance on initial VAT return filing. Benefits include simplified cross-border transactions and compliance with Dutch tax laws."
    },
    {
        id: 7,
        topicId: 3,
        title: "Compliance Calendar",
        description: "AI-driven compliance tracking and notifications ensure your business remains in good standing with Dutch laws.",
        price: "Included in eBranch Membership",
        detailedDescription: "Proactively tracks compliance requirements with an AI-powered calendar. Receive alerts for deadlines and step-by-step guidance for fulfilling compliance obligations."
    },
    {
        id: 8,
        topicId: 3,
        title: "Annual Report Submission",
        description: "Stay compliant with Dutch regulations by submitting accurate and timely annual reports to the KvK.",
        price: "Included in eBranch Membership",
        detailedDescription: "Provides guidance and preparation for annual report submissions to the KvK. Ensures your company remains in good standing with Dutch regulatory authorities."
    },
    {
        id: 9,
        topicId: 3,
        title: "Corporate Governance Management",
        description: "Efficiently handle updates to shareholders, directors, and UBO registrations with proactive guidance.",
        price: "Included in eBranch Membership",
        detailedDescription: "Assists with updates to shareholders, directors, and UBO (Ultimate Beneficial Owner) registrations. This service ensures compliance with Dutch governance laws."
    },
    {
        id: 10,
        topicId: 4,
        title: "Virtual Office Suite",
        description: "Elevate your business presence with a prestigious address, mail handling, and Google My Business optimization.",
        price: "Starting from €99/month",
        detailedDescription: "Provides a prestigious Dutch business address, mail handling, and Google My Business optimization. Benefits include enhanced credibility, improved local SEO, and cost-effective expansion into new markets."
    },
    {
        id: 11,
        topicId: 4,
        title: "Startup Visa Application",
        description: "Streamline your entrepreneurial journey in the Netherlands with comprehensive visa application assistance.",
        price: "€1,500",
        detailedDescription: "Helps meet the Dutch Startup Visa requirements, including business plan preparation, facilitator coordination, and application submission. Ensures compliance with Dutch regulations for innovative startups."
    },
    {
        id: 12,
        topicId: 4,
        title: "EORI Registration",
        description: "Facilitate cross-border trade by obtaining your Economic Operator Registration and Identification (EORI) number.",
        price: "Free for eBranch members (€150 normal rate)",
        detailedDescription: "Streamlines EORI registration with Dutch customs authorities. Benefits include seamless international trade operations, compliance with EU regulations, and reduced delays or penalties."
    },
];

const Services = () => {
    const [services, setServices] = useState(servicesArray);
    const [selectedTopic, setSelectedTopic] = useState(0);
    const [showServiceDetails, setShowServiceDetails] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const onClose = () => {
        setShowServiceDetails(false);
        setSelectedService(null);
    };

    const handleClick = (topicId) => {
        setSelectedTopic(topicId);
        const filteredServices = servicesArray.filter((service) => service.topicId === topicId);
        setServices(filteredServices);
    };

    const handleLearnMoreClick = (service) => {
        setSelectedService(service);
        setShowServiceDetails(true);
    };

    return (
        <div>
            <div className="m-3 lg:ml-0">
                <div className="flex flex-col gap-4 text-textcolor bg-primary rounded-lg">
                    <div className="flex flex-row md:flex-row w-full bg-layerWhite p-4 rounded-xl sm:p-8">
                        <div className='w-full'>
                            <div>
                                <span className='text-2xl font-semibold'>Services</span>
                            </div>
                            <br />
                            <div>
                                <span className='text-lg font-medium'>What would you  like to do today?</span>
                            </div>
                            <br />
                            <div className='w-full relative'>
                                <input
                                    className="w-full bg-primary text-[#929292] placeholder-[#929292] placeholder:  rounded-2xl h-9 px-4 outline-none focus:ring-2 focus:ring-secondary"
                                    type="text"
                                    placeholder="Enter Your Next Service"
                                />
                                <svg className='absolute right-3 top-3' width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.22 0.21934C10.3606 0.0788894 10.5512 0 10.75 0C10.9488 0 11.1394 0.0788894 11.28 0.21934L17.28 6.21934C17.4205 6.35997 17.4993 6.55059 17.4993 6.74934C17.4993 6.94809 17.4205 7.13871 17.28 7.27934L11.28 13.2793C11.2113 13.353 11.1285 13.4121 11.0365 13.4531C10.9445 13.4941 10.8452 13.5162 10.7445 13.5179C10.6438 13.5197 10.5438 13.5012 10.4504 13.4635C10.357 13.4257 10.2722 13.3696 10.201 13.2984C10.1297 13.2272 10.0736 13.1423 10.0359 13.0489C9.99816 12.9555 9.97963 12.8555 9.98141 12.7548C9.98318 12.6541 10.0052 12.5548 10.0462 12.4628C10.0872 12.3708 10.1463 12.288 10.22 12.2193L14.94 7.49934H0.75C0.551088 7.49934 0.360322 7.42032 0.21967 7.27967C0.0790175 7.13902 0 6.94825 0 6.74934C0 6.55043 0.0790175 6.35966 0.21967 6.21901C0.360322 6.07836 0.551088 5.99934 0.75 5.99934H14.94L10.22 1.27934C10.0795 1.13871 10.0007 0.948091 10.0007 0.74934C10.0007 0.550589 10.0795 0.359965 10.22 0.21934Z" fill="#929292" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    {/* <div className="relative flex items-center min-w-full">
                        <input
                            className="w-full bg-white rounded-2xl py-2 px-4 border border-transparent focus:border-2 focus:border-secondary outline-none"
                            type="text"
                            placeholder="Enter your next task or goal"
                        />
                        <img
                            className="absolute right-3 w-4 h-4 text-textcolor"
                            src={arrowSearchInput}
                            alt="Search icon"
                        />
                    </div> */}
                    <div>
                        <div className='flex flex-wrap gap-4'>
                            <button className={`px-18 py-2 text-xs rounded-full font-medium ${selectedTopic === 0 ? "bg-secondary text-white font-semibold" : "bg-white text-textcolor"}`}
                                onClick={() => {
                                    setSelectedTopic(0);
                                    setServices(servicesArray);
                                }}
                            >View all</button>
                            {allTopicsArray.map((topic, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleClick(topic.id)}
                                    className={`font-medium px-12 py-2 text-xs rounded-full ${selectedTopic === topic.id ? "bg-secondary text-white font-semibold" : "bg-white text-textcolor"}`}>
                                    {topic.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {services.map((service, index) => (
                            <div key={index} className='bg-white flex flex-col gap-6 px-6 py-5 rounded-3xl'>
                                <div>
                                    <span className='font-bold'>{service.title}</span>
                                </div>
                                <div className='max-w-[60%]'>
                                    <span className='font-medium'>{service.description}</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className='max-w-[50%]'>
                                        <span className='font-bold'>{service.price}</span>
                                    </div>
                                    <div className='flex gap-2 justify-center items-center'>
                                        <div>
                                            <span className='text-sm font-semibold cursor-pointer'
                                                onClick={() => handleLearnMoreClick(service)}
                                            >Learn More</span>
                                        </div>
                                        <div>
                                            <button className='bg-secondary text-textsecondary px-6 py-2 text-sm font-semibold rounded-full'>Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {
                showServiceDetails &&
                <ServiceDetails isOpen={showServiceDetails} onClose={onClose} service={selectedService} />
            }
        </div>
    );
};

export default Services;


// import React, { useState } from 'react';
// import arrowSearchInput from "../images/icon/arrow-search-ip.svg";
// import ServiceDetails from '../components/Modals/ServiceDetails';

// const allTopicsArray = [
//     { id: 1, name: "Entity Management" },
//     { id: 2, name: "Accounting and Tax" },
//     { id: 3, name: "Compliance" },
//     { id: 4, name: "Business Expansion" },
// ];

// const servicesArray = [
//     { id: 1, topicId: 1, title: "Legal Entity Formation", description: "Set up your Dutch business entity hassle-free with complete documentation preparation and registration with the Chamber of Commerce (KvK).", price: "Starting from €1,200" },
//     { id: 2, topicId: 1, title: "Director Management", description: "Seamlessly manage appointments and resignations of directors with full compliance with Dutch corporate governance.", price: "Included in eBranch Membership (€65 normal rate)" },
//     { id: 3, topicId: 1, title: "Share Transfer", description: "Effortlessly transfer shares compliant with Dutch law, including preparation of documents and shareholder agreement updates.", price: "Starting from €450 per transfer" },
    
//     { id: 4, topicId: 2, title: "AI-Powered Accounting Suite", description: "Automate bookkeeping, financial reporting, and tax compliance with AI-driven tools, offering real-time financial insights.", price: "Starting from €35/month" },
//     { id: 5, topicId: 2, title: "Tax Consulting", description: "Optimize your tax position and maintain compliance with comprehensive tax planning and preparation services.", price: "€195 per hour" },
//     { id: 6, topicId: 2, title: "VAT Registration", description: "Navigate Dutch VAT regulations with ease, including number acquisition and initial VAT return filing guidance.", price: "Included in eBranch Membership (€250 normal rate)" },

//     { id: 7, topicId: 3, title: "Compliance Calendar", description: "AI-driven compliance tracking and notifications ensure your business remains in good standing with Dutch laws.", price: "Included in eBranch Membership" },
//     { id: 8, topicId: 3, title: "Annual Report Submission", description: "Stay compliant with Dutch regulations by submitting accurate and timely annual reports to the KvK.", price: "Included in eBranch Membership" },
//     { id: 9, topicId: 3, title: "Corporate Governance Management", description: "Efficiently handle updates to shareholders, directors, and UBO registrations with proactive guidance.", price: "Included in eBranch Membership" },

//     { id: 10, topicId: 4, title: "Virtual Office Suite", description: "Elevate your business presence with a prestigious address, mail handling, and Google My Business optimization.", price: "Starting from €99/month" },
//     { id: 11, topicId: 4, title: "Startup Visa Application", description: "Streamline your entrepreneurial journey in the Netherlands with comprehensive visa application assistance.", price: "€1,500" },
//     { id: 12, topicId: 4, title: "EORI Registration", description: "Facilitate cross-border trade by obtaining your Economic Operator Registration and Identification (EORI) number.", price: "€150 normal rate (Free eBranch members)" },
// ];



// const Services = () => {

//     const [services, setServices] = useState(servicesArray);
//     const [selectedTopic, setSelectedTopic] = useState(0);
//     const [showServiceDetails, setShowServiceDetails] = useState(false);
//     const onClose = () => {
//         setShowServiceDetails(false)
//     }

//     const handleClick = (topicId) => {
//         setSelectedTopic(topicId)
//         const filteredServices = servicesArray.filter((service) => service.topicId === topicId)
//         setServices(filteredServices);
//     }

//     return (
//         <div>

//             <div className="m-3 lg:ml-0">
//                 <div className="flex flex-col gap-4 text-textcolor bg-primary rounded-lg ">
//                     <div className="flex flex-col gap-5">
//                         <div className="relative flex items-center min-w-full">
//                             <input
//                                 className="w-full bg-white rounded-2xl py-2 px-4 border border-transparent focus:border-2 focus:border-secondary outline-none"
//                                 type="text"
//                                 placeholder="Enter your next task or goal"
//                             />
//                             <img
//                                 className="absolute right-3 w-4 h-4 text-textcolor"
//                                 src={arrowSearchInput}
//                                 alt="Search icon"
//                             />
//                         </div>
//                         <div className='bg-white p-4 rounded-lg flex flex-col gap-4'>
//                             <div>
//                                 <span className='text-textcolor font-semibold text-2xl'>Services</span>
//                             </div>
//                             <div>
//                                 <span className='text-textcolor font-medium text-lg'>Entrepreneurs like you purchased...</span>
//                             </div>
//                         </div>
//                         <div>
//                             <div className='flex flex-wrap gap-4'>
//                                 <button className={`px-18 py-2 text-xs rounded-full font-medium ${selectedTopic === 0 ? "bg-secondary text-white font-semibold" : "bg-white text-textcolor"}`}
//                                     onClick={() => {
//                                         setSelectedTopic(0)
//                                         setServices(servicesArray)
//                                     }}
//                                 >View all</button>
//                                 {allTopicsArray.map((topic, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => handleClick(topic.id)}
//                                         className={`font-medium px-12 py-2 text-xs rounded-full ${selectedTopic === topic.id ? "bg-secondary text-white font-semibold" : "bg-white text-textcolor"}`}>
//                                         {topic.name}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//                             {services.map((service, index) => (
//                                 <div key={index} className='bg-white flex flex-col gap-6 p-4 rounded-3xl'>
//                                     <div>
//                                         <span className='font-bold'>{service.title}</span>
//                                     </div>
//                                     <div className=''>
//                                         <span className='font-medium'>{service.description}</span>
//                                     </div>
//                                     <div className='flex justify-between items-center'>
//                                         <div>
//                                             <span className='font-bold'>{service.price}</span>
//                                         </div>
//                                         <div className='flex gap-2 justify-center items-center'>
//                                             <div>
//                                                 <span className='text-sm font-semibold cursor-pointer'
//                                                     onClick={() => setShowServiceDetails(true)}
//                                                 >Learn More</span>
//                                             </div>
//                                             <div>
//                                                 <button className='bg-secondary text-textsecondary px-6 py-2 text-sm font-semibold rounded-full'>Buy Now</button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {
//                 showServiceDetails &&
//                 <ServiceDetails isOpen={showServiceDetails} onClose={onClose} />
//             }
//         </div>
//     );
// };

// export default Services;


// const allTopicsArray = [
//     { id: 1, name: "Tax and Accounting" },
//     { id: 2, name: "Local Branding" },
//     { id: 3, name: "Filing" },
//     { id: 4, name: "Legal" },
// ];

// const servicesArray = [
//     { id: 1, topicId: 1, title: "Annual State Filings", description: "Let HOC manage your annual state compliance filings to keep your business in good standing.", price: "$199/year" },
//     { id: 2, topicId: 1, title: "Annual Tax Filing", description: "HOC will prepare and file your annual tax return with the Internal Revenue Service (IRS) to ensure compliance.", price: "$150/year" },
//     { id: 3, topicId: 1, title: "CPA Consultation", description: "Access one-on-one consultations with a Certified Public Accountant, tailored to your unique business needs.", price: "$150/year" },
//     { id: 4, topicId: 1, title: "Total Compliance Advisory", description: "Receive expert guidance on tax planning and ensure full compliance with regulations.", price: "$150/year" },
//     { id: 5, topicId: 1, title: "Accounting Services", description: "Benefit from comprehensive bookkeeping and financial statement services to maintain accurate financial records.", price: "$200/month" },
//     { id: 6, topicId: 1, title: "ITIN Registration in Netherlands", description: "Get assistance with ITIN (Individual Taxpayer Identification Number) registration in the Netherlands, ensuring smooth tax compliance for non-residents.", price: "$150" },

//     { id: 7, topicId: 2, title: "Brand Strategy", description: "Develop a compelling brand identity that resonates with your target audience and drives business growth.", price: "$500/project" },
//     { id: 8, topicId: 2, title: "Social Media Marketing", description: "Launch targeted social media campaigns to boost your brand's online presence and engagement.", price: "$300/month" },

//     { id: 9, topicId: 3, title: "Document Filing", description: "Enjoy efficient and secure document filing services, ensuring easy storage and quick retrieval.", price: "$100/year" },
//     { id: 10, topicId: 3, title: "Tax Filing Services", description: "Stay compliant with tax laws through our reliable tax filing services tailored to your needs.", price: "$200/year" },

//     { id: 11, topicId: 4, title: "Contract Review", description: "Obtain professional legal advice and thorough review of contracts to protect your interests.", price: "$250/project" },
//     { id: 12, topicId: 4, title: "Business Incorporation Assistance", description: "Receive guidance and support for setting up your business structure, including incorporation paperwork.", price: "$500" },
// ];