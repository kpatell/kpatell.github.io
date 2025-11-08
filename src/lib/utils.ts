/**
 * Utility function to merge class names
 * Filters out falsy values and joins remaining classes
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Hardcoded resume text for AI assistant
 */
export const RESUME_TEXT = `
KRISHAN PATEL
krishanpatel00@gmail.com (571) 509-9536 github.com/kpatell US Citizen

EDUCATION
Georgia Institute of Technology, B.S. Computer Science | Graduated: May 2023 | GPA: 3.81/4.0
Skills & Technologies: Python, AWS (Lambda, ECS, DynamoDB, CloudWatch, Glue), Kubernetes/Docker, SQL/Postgres, Java, React, TypeScript, Node.js, NoSQL/MongoDB, Linux
Soft Skills: Problem-solving, attention to detail, verbal and written communication, teamwork, leadership, adaptability, time management, organizational skills

WORK EXPERIENCE:
Capital One | Senior Associate Software Engineer
August 2023 - Present
• Engineered enterprise-scale platform to streamline internal volunteer registrations and grant applications across 1,000+ employees and ~500 non-profit partner organizations.
• Architected and deployed a scalable AI-driven qualification platform using Selenium, BeautifulSoup, and Mistral 7B LLM. Implemented a Collaborative Filtering ML model to match applicants with skill-based volunteering opportunities, processing 200+ hours of automated matching workflows annually.
• Developed the Decrypt and Stream Lambda (DASL) Platform, a critical distributed systems service for daily transaction files, achieving 99.9% uptime through reliability engineering practices. Led multiple high-stakes demos for business leaders and stakeholders, expanding the platform's reach across the enterprise. Co-led the development of a full-stack replay tool, enabling downstream customers to efficiently recover failed transaction files.
• Established GitHub best practices across the organization, standardizing Conventional Commits across teams to enhance code quality, organization, and collaboration. These CI/CD checks are implemented enterprise-wide.
• Led efforts to onboard a vendor application using infrastructure automation and ETL pipelines with AWS Glue, designing for scalability across 3+ engineering teams enterprise-wide.
• TDP Program Council Lead (Aug 2024 Feb 2025), influencing program initiatives and mentoring new associates.

Goldman Sachs | Marcus Summer Analyst Intern
June 2022 August 2022
• Deployed an AWS scheduler that automates the start and stop of ECS instances, leveraging DynamoDB, AWS Lambda, and a Flask-based web framework, reducing AWS costs by 10% annually.
• Implemented monitoring and observability solutions, driving insights into cloud infrastructure performance.

KS Solutions LLC | Software Engineering Intern
April 2021 August 2021
• Developed an automated reporting solution using Java and SQL, generating on-demand PDF reports with uniform formatting, saving 10+ hours/week for the client that manually creates these reports.
• Enhanced user experience by implementing an autocomplete search function, improving efficiency and usability.
• Coordinated with business partners and tech team to ensure successful feature integration and launch.

PROJECTS:
Hit Your Macros (Python, Amazon Textract, Claude 4.0, Supabase, React Native)
December 2024 - Present
• A scalable full-stack nutrition intelligence platform, serving 100+ users to eat out while staying within their health goals.
• Architected scalable data pipeline using Amazon Textract and Claude 4.0, handling millions of restaurant menu items.
• Built optimized Supabase database with RESTful microservices, rate limiting, and monitoring capabilities for real-time location-based queries across thousands of restaurants.

Intelligent Tutoring Systems (JavaScript, MongoDB, REST, React, Node.js, Figma)
January 2021 - May 2022
• JavaScript learning platform with interactive challenges and progress tracking, partnering with Atlanta middle schools.
• Architected scalable database design using MongoDB with optimized schemas supporting real-time progress tracking.
• Created UI/UX designs in Figma, translating wireframes into a fully functional React and Node.js application.

ACHIEVEMENTS AND LEADERSHIP:
Board Member of Raas All-Stars | Non-Profit Organization
June 2023 - June 2025
Captain of Georgia Tech Ramblin' Raas | Collegiate Dance Team
May 2022 May 2023
Eagle Scout | Boy Scouts of America, Troop 1154, Ashburn, VA
March 5, 2019

Résumé - Krishan Patel
Page 1 of 1
`;
