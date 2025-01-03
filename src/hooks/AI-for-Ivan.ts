import { useState } from "react";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

// mock skills list
const jobSkills = [
  "IT security and system protection",
  "Ethical hacking and vulnerability testing",
  "Network administration and troubleshooting",
  "Secure data management, encryption, and secure information transmission",
  "Equipment diagnostics and repair, including proficiency in diagnostic tools and manuals",
  "Preventive maintenance planning",
  "Operating and repairing mechanical and electrical systems",
  "Aircraft operation and drone piloting",
  "Air traffic coordination and navigation systems",
  "GPS and radar technology expertise",
  "Maintenance of flight systems and equipment",
  "Emergency medical response and first aid",
  "Health and safety training",
  "Medical equipment management",
  "Trauma care in high-pressure environments",
  "Blueprint interpretation and construction planning",
  "Operating construction equipment and tools",
  "Site safety and hazard management",
  "Infrastructure development and maintenance",
  "Installing and maintaining communication systems",
  "Managing radio",
  "Satellite",
  "Digital networks",
  "Signal monitoring and troubleshooting",
  "Operation of specialized equipment and machinery",
  "Conducting safety assessments and audits, ensuring compliance with safety regulations and protocols for technical systems",
  "Precision handling of advanced tools and technology",
  "Leading and coordinating multi-phase projects",
  "Budget planning, oversight, and resource allocation for efficiency",
  "Managing schedules and deadlines",
  "Proficiency in tools like MS Project or Trello",
  "Cost analysis and financial reporting",
  "Coordinating procurement and delivery schedules",
  "Inventory management and optimization",
  "Vendor negotiations and contract management",
  "Transportation planning and route optimization",
  "Identifying and mitigating operational risks",
  "Planning for contingencies and disaster recovery",
  "Monitoring standards and procedures",
  "Performance evaluations and reporting",
  "Implementing continuous improvement processes",
  "Supervising and managing diverse teams",
  "Setting clear objectives and measuring performance",
  "Creating a collaborative work environment, fostering collaboration and trust",
  "Designing and conducting employee training programs",
  "Coaching and mentoring team members",
  "Evaluating training outcomes and feedback",
  "Providing and receiving constructive feedback and appraisals",
  "Recognizing and addressing areas for improvement",
  "Fostering professional growth and engagement",
  "Coordinating disaster response efforts",
  "Developing emergency action plans",
  "Leading high-stakes decision-making processes",
  "Planning and executing operational strategies",
  "Analyzing and improving workflow efficiency",
  "Managing resources for optimal outcomes",
  "Gathering and interpreting critical data",
  "Preparing detailed reports and recommendations",
  "Informing strategic decisions with actionable insights",
  "Fluency in foreign languages for international business",
  "Translation and interpretation expertise",
  "Navigating cross-cultural interactions effectively",
  "Training teams in cultural awareness and sensitivity",
  "Managing access control, surveillance systems, and operating advanced monitoring tools",
  "Responding to security threats and vulnerabilities",
  "Inspiring and guiding teams toward goals",
  "Resolving team conflicts effectively",
  "Working across departments and with diverse groups",
  "Aligning individual efforts with organizational objectives",
  "Allocating time, people, and tools efficiently",
  "Balancing team workloads and priorities",
  "Writing concise and actionable reports",
  "Preparing presentations and delivering updates",
  "Facilitating discussions, mediating conflicts, and resolving team disputes effectively",
  "Demonstrating active listening skills",
  "Breaking down complex problems into manageable parts",
  "Evaluating data to identify root causes",
  "Proposing creative solutions to challenges",
  "Adapting strategies to meet unique needs",
  "Consistently delivering high-quality work on schedule and maintaining accountability",
  "Upholding ethical standards, demonstrating honesty and transparency",
  "Quickly mastering new systems, processes, and tools",
  "Adapting to dynamic work environments",
  "Adjusting to changing priorities and roles",
  "Thriving in ambiguous or evolving circumstances",
  "Understanding and addressing team members' needs",
  "Providing emotional support and helping teams navigate high-stress environments",
  "Identifying urgent and important tasks",
  "Allocating time effectively across responsibilities",
  "Planning, analyzing, and improving workflow efficiency",
  "Establishing clear and measurable objectives",
  "Aligning team activities with organizational goals",
  "Anticipating potential obstacles and opportunities",
  "Developing proactive strategies for success",
  "Maintaining precision in work and decision-making",
  "Identifying inconsistencies or errors",
  "Following established standards and guidelines",
  "Performing effectively under pressure",
  "Recovering quickly from setbacks",
  "Remaining focused on long-term objectives",
  "Encouraging persistence in challenging situations",
  "Knowledge of aviation regulations and compliance standards",
  "Understanding of aerodynamics and aircraft systems",
  "Calibration of aviation instruments",
  "Programming and configuring autopilot systems",
  "Document management and record-keeping",
  "Administrative coordination",
  "Knowledge of electrical storage systems",
  "Battery maintenance and repair techniques",
  "Monitoring and controlling industrial processes",
  "Understanding process parameters and adjustments",
  "Installation and tying of reinforcing steel bars (rebar)",
  "Using rebar cutting and bending tools",
  "Musical performance and mastery of musical instruments",
  "Sight-reading and interpreting musical scores",
  "Collaboration in ensemble and orchestra settings",
  "Stage presence and performance techniques",
  "Patient care and rehabilitation techniques",
  "Knowledge of human anatomy and physiology",
  "Assisting in physical therapy exercises",
  "Record-keeping for patient progress",
  "Organizing and maintaining archives",
  "Cataloging and indexing documents",
  "Preservation techniques for documents and artifacts",
  "Research and data retrieval",
  "Asphalt mixing and paving techniques",
  "Operating asphalt paving machinery",
  "Quality control in road construction",
  "Hospitality services and event coordination",
  "Managing supplies and provisions in hospitality settings",
  "Concrete mixing, pouring, and finishing techniques",
  "Setting up and dismantling concrete forms",
  "Cataloging and organizing library materials",
  "Assisting patrons with research and information retrieval",
  "Knowledge of library information systems",
  "Promoting literacy and educational programs",
  "Flight systems testing and evaluation",
  "Data collection and analysis during flight tests",
  "In-flight mechanical system monitoring and troubleshooting",
  "Communication with flight crew on technical matters",
  "Supervising deck operations and crew",
  "Ship maintenance and equipment management",
  "Knowledge of maritime safety procedures",
  "Handling ropes, cables, and anchoring equipment",
  "Bookkeeping and financial accounting",
  "Proficiency in accounting software (e.g., QuickBooks, SAP)",
  "Tax compliance and reporting",
  "Operating cupola furnaces and metal melting processes",
  "Knowledge of metallurgy and foundry practices",
  "Safety procedures in foundry operations",
  "Underwater communication systems operation",
  "Advanced diving techniques",
  "Radio communication in specialized environments",
  "Mine detection and demining techniques",
  "Safe vehicle operation in hazardous areas",
  "Operating forklift and material handling equipment",
  "Warehouse safety procedures",
  "Load handling and stacking techniques",
  "Managing classified information and security protocols",
  "Risk assessment and mitigation in information security",
  "Administrative support in publishing and editorial processes",
  "Managing editorial schedules and communications",
  "Document preparation and proofreading",
  "Operating and maintaining optical instruments",
  "Calibration of precision sighting devices",
  "Knowledge of optics and optical technology",
  "Secure document delivery and handling",
  "Route planning and time management",
  "Vehicle testing and evaluation techniques",
  "Mechanical diagnostics and troubleshooting",
  "Data recording and test reporting",
  "Parachute testing and evaluation techniques",
  "Knowledge of parachute systems and aerodynamics",
  "Safety procedures in parachute operations",
  "Safe vehicle operation and defensive driving",
  "Knowledge of traffic laws and regulations",
  "Basic vehicle maintenance skills",
  "Operating fuel transport vehicles",
  "Fuel handling and safety procedures",
  "Knowledge of hazardous materials transport regulations",
  "Electrical system maintenance and repair for vehicles",
  "Combining driving with electrical technician skills",
  "Operating mobile cranes and heavy vehicles",
  "Load handling and crane safety procedures",
  "Operating rail maintenance vehicles (draisines)",
  "Rail safety and operational procedures",
  "Knowledge of rail systems and infrastructure",
  "Professional diving skills and underwater operations",
  "Maintenance and repair of underwater structures",
  "Knowledge of diving equipment and safety protocols",
  "Training and handling service dogs, including understanding canine behavior and training methods",
  "Care and maintenance of working dogs",
  "Operating vulcanizing equipment and processes",
  "Tire repair and retreading techniques",
  "Knowledge of rubber processing and safety protocols",
  "Installation and maintenance of gas systems",
  "Safety procedures in gas handling",
  "Leak detection and gas appliance servicing",
  "Electroplating and surface finishing techniques",
  "Knowledge of plating chemicals and processes",
  "Quality control in electroplating",
  "Operating and maintaining hydroacoustic equipment",
  "Underwater sound analysis and sonar operation",
  "Interpreting hydroacoustic data",
  "Collecting and analyzing meteorological data",
  "Operating meteorological instruments",
  "Weather data recording and reporting",
  "Operating and maintaining gyroscopic instruments",
  "Understanding inertial navigation systems",
  "Calibration procedures for gyroscopes",
  "Nursing leadership and staff management",
  "Patient care coordination",
  "Compliance with healthcare regulations",
  "Staff supervision and training in medical settings",
  "Supervising shipboard operations at a senior level",
  "Advanced ship maintenance and crew management",
  "Training and mentoring maritime personnel",
  "Discipline enforcement and personnel management",
  "Training coordination and team leadership",
  "Instructional skills and curriculum development",
  "Training program management in educational settings",
  "Mentoring and coaching students",
  "Strategic leadership and policy development",
  "High-level communication and advisory skills",
  "Operating rangefinding and distance measurement equipment",
  "Knowledge of optics and precision measurement",
  "Operating degassing equipment and processes",
  "Knowledge of chemical gas removal techniques",
  "Inspecting materials and products for defects",
  "Using non-destructive testing methods",
  "Quality control and assurance techniques",
  "Data decoding and signal interpretation",
  "Understanding of cryptographic techniques",
  "Signal processing skills",
  "Repair and maintenance of diesel engines",
  "Diagnostic techniques for diesel systems",
  "Knowledge of fuel injection and engine components",
  "Flight planning and coordination",
  "Air traffic communication protocols",
  "Weather analysis for aviation",
  "Aviation regulatory compliance",
  "Scheduling and operational coordination",
  "Communication with staff and clients",
  "Proficiency in dispatch software systems",
  "Emergency response coordination",
  "Personnel data management and record-keeping",
  "Basic statistical analysis",
  "Confidential handling of personal information",
  "Measuring and monitoring radiation levels",
  "Operating dosimetry equipment",
  "Radiation safety and protection protocols",
  "Precise measurement and dispensing of materials",
  "Understanding material properties for accurate dosing",
  "Animal training and behavioral modification",
  "Positive reinforcement training techniques",
  "Typing and data entry proficiency",
  "Operating printing and copying equipment",
  "Logistics and supply chain coordination",
  "Shipment tracking and documentation",
  "Communication with suppliers and carriers",
  "Installation and maintenance of electrical systems",
  "Reading and interpreting electrical schematics",
  "Electrical troubleshooting and repair",
  "Compliance with electrical safety codes",
  "Proficiency in welding techniques (MIG, TIG, Arc)",
  "Metal fabrication and repair",
  "Reading technical drawings for welding",
  "Welding safety procedures",
  "Leadership and administrative management",
  "Strategic planning and policy implementation",
  "Organizational management skills",
];

// mock vacancy data
const vacancyExample = {
  id: "88bd259f-6984-431a-832d-0bf55997353c",
  name: "Фахівець (оператор) відділення",
  logo: "https://company-logo-frankfurt.rabota.ua/cdn-cgi/image/w=250/477532_20210430122646.png",
  salary: 0,
  salaryFrom: 15000,
  salaryTo: 19000,
  cityName: "Полтава",
  companyName: "Нова пошта",
  shortDescription:
    "\t\t\t\t\t\t\t\t\t\tНова пошта — лідер експрес-доставки в Україні. Наша команда постійно зростає, і зараз ми шукаємо «оператора відділення». Хочеш стати обличчям Нової пошти та дарувати радість клієнтам, які поспішають у відділення за посилками? Любиш спілкува…",
  description:
    " <head></head><p><strong>Нова пошта</strong> — лідер експрес-доставки в Україні. Наша команда постійно зростає, і зараз ми шукаємо <strong>«оператора відділення»</strong>.</p><p> <strong>Хочеш стати обличчям Нової пошти та дарувати радість клієнтам, які поспішають у відділення за посилками? Любиш спілкуватися, посміхатися і з комп’ютером на «ти»? Вважай, що робота вже твоя!</strong> </p><p><strong>Ми пропонуємо тобі:</strong></p><ul><li>Офіційну заробітну плату, оплачувані відпустки, лікарняні та відрядження.</li><li>Роботу для чоловіків та жінок.</li><li>Навчання всім тонкощам роботи з обслуговування клієнтів по стандартам Нової пошти.</li><li>Молодий дружній колектив.</li><li>Медичне страхування та страхування життя.</li><li>Можливість кар'єрного зростання.</li></ul><p><strong>Що потрібно робити: </strong></p><ul><li>Вносити дані в інформаційну систему.</li><li>Здійснювати взаєморозрахунки з клієнтами.</li><li>Сканувати, палетувати вантаж у відділенні.</li><li>Завантажувати й розвантажувати посилки.</li></ul><p><strong>Ми очікуємо від тебе:</strong></p><ul><li>Відсутність протипоказань щодо фізичних навантажень.</li><li>Володіння ПК.</li><li>Швидкий набір тексту.</li><li>Середню спеціальну освіту.</li><li>Бажаний досвід роботи з клієнтами.</li><li>Вільне володіння українською мовою.</li></ul><p><strong>Якщо все це про тебе і ти бажаєш стати частиною великої родини Нової пошти – надсилай резюме або телефонуй за номером: </strong><strong><span data-vacancyphone>067 571 84 49</span></strong></p> ",
  schedule: "FULL_TIME",
  vacancy_category_id: "16a0caa6-f3c7-49ac-89f9-84c12c4ab4df",
  publish_at: "2024-08-27 08:19:53.001318",
};

// Custom hook for interacting with AI to analyze job skills
export const useAI = () => {
  // State for tracking loading status, errors, and AI response
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string>("");

  // System message that defines the AI assistant's role and response format
  const systemMessage: Message = {
    role: "system",
    content:
      "You are a helpful AI assistant for defining job skills from the vacancy description. Your task is to analyze the job vacancy and define the professional soft and hard skills that match the vacancy. We will give you a list of skills and you will need to choose the most relevant ones. Reply containts 1 to 10 skills, but 10 is maximum. Does not makeup your own skills, only the ones we defined, validate response. Your response is in JSON format where there is an array of skills. Your response should have this structure: {'skills': ['skill1', 'skill2', 'skill3']}",
  };

  // Function to make API call to OpenAI
  const callAI = async (text: string) => {
    setIsLoading(true);
    setError(null);

    // Log the messages being sent to AI
    console.log(111, [systemMessage, { role: "user", content: text }]);

    try {
      // Make POST request to OpenAI API
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [systemMessage, { role: "user", content: text }],
            temperature: 0.1, // Lower temperature for more focused responses
            response_format: { type: "json_object" }, // Ensure JSON response
          }),
        }
      );

      // Handle unsuccessful API responses
      if (!response.ok) {
        throw new Error("Failed to generate response");
      }

      // Parse and store the AI response
      const data: ChatResponse = await response.json();
      const content = data.choices[0]?.message?.content || "";
      setResponse(content);
      return content;
    } catch (err) {
      // Error handling with type checking
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      return "";
    } finally {
      setIsLoading(false);
    }
  };

  // Return hook interface
  return {
    callAI,
    isLoading,
    error,
    response,
  };
};

// USE CODE BELOW ELSEWHERE IN THE CODE
const { name, shortDescription, description, schedule } = vacancyExample;

// Initialize the AI hook
// const { callAI } = useAI();

// Make API call with formatted vacancy data
// const response = await callAI(
//   `Analyze following vacancy data. Name: ${name}. Employer Description: ${shortDescription} ${description}. Work type: ${schedule}. Analyze our skills list: ${jobSkills}. Give me a list of skills that are required for this vacancy.`
// );
