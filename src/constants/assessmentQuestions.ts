
export type ResponseDetail = {
    id?: string; 
    choice?: string;
    scale?: number;
    score: number;
    explanation: string
}


export type Question = {
    focusArea: string;
    question: string;
    explanation: string;
    type: string;
    maxScore: number;
    responseMCQ?: ResponseDetail[] ;
    responseScale?: ResponseDetail[] ;
    responsetext?: string;
}
export const ascendAssessmentQuestions: Question[] = [
    // === 1. VISION & STRATEGY READINESS (Total Max Score: 9) ===
    {
        focusArea: "goals",
        question: "Where are your growth efforts mainly focused for the next 12 months?",
        explanation: "Transformation is about creating value, not just cutting costs. We need to know if your goals align with this value-first approach.",
        type: "mcq",
        maxScore: 3,
        responseMCQ: [
            { id: "a", choice: "Primarily reducing operational expenses.", score: 1, explanation: "Focus needs to shift from cost-center to growth-center. The best AI ROI comes from value creation." },
            { id: "b", choice: "Primarily launching new products/services or radically improving customer experience.", score: 3, explanation: "High alignment with Value Ascent's value-first philosophy." },
            { id: "c", choice: "A 50/50 split between cost reduction and value creation.", score: 2, explanation: "Good balance. Ready for high-impact value projects." }
        ]
    },
    {
        focusArea: "alignment",
        question: "How unified is your leadership team on the priority of investing time and money into smart tools (AI/Automation)?",
        explanation: "Transformation requires a mandatory mandate (Stage 0). Lack of agreement will cause projects to stall or lose funding.",
        type: "scale",
        maxScore: 3,
        responseScale: [
            { scale: 1, score: 0, explanation: "Strong disagreement/no plan. Requires a mandatory Vision Platform Workshop (Stage 0)." },
            { scale: 2, score: 0, explanation: "Low commitment. High risk of project failure." },
            { scale: 3, score: 1, explanation: "Moderate commitment. A project may start, but risk of stalling is high." },
            { scale: 4, score: 2, explanation: "Strong commitment. Ready to begin Stage 1." },
            { scale: 5, score: 3, explanation: "Fully aligned and budgeted. Ready for immediate Ascent." }
        ]
    },
    {
        focusArea: "painPointClarity",
        question: "Can you clearly articulate the top 3 bottlenecks that slow down your team's ability to serve customers or produce goods?",
        explanation: "Defining the 'High-Value Target' (Stage 1) depends on clear problem recognition. Vague problems lead to vague technology solutions.",
        type: "mcq",
        maxScore: 3,
        responseMCQ: [
            { id: "a", choice: "Yes, clearly defined and quantified (e.g., 'Quotes take 48 hours').", score: 3, explanation: "Excellent clarity for Stage 1 scoping." },
            { id: "b", choice: "Mostly, but they are not fully quantified or prioritized.", score: 2, explanation: "Good starting point, but quantification will improve project focus." },
            { id: "c", choice: "No, we know we're slow but not exactly where or why.", score: 1, explanation: "Requires a Base Camp Discovery Session to identify a valid starting point." }
        ]
    },

    // === 2. OPERATIONAL & DATA FOUNDATION READINESS (Total Max Score: 9) ===
    {
        focusArea: "processDocumentation",
        question: "Are your core business processes (e.g., sales, service, fulfillment) clearly mapped and consistently followed by your team?",
        explanation: "Smart tools amplify existing processes. A messy process will just become a faster, messier process (Stage 3 concern).",
        type: "mcq",
        maxScore: 3,
        responseMCQ: [
            { id: "a", choice: "Yes, documented SOPs and training are regularly used.", score: 3, explanation: "Ideal foundation for rapid and effective integration." },
            { id: "b", choice: "Mostly documented, but often improvised by employees.", score: 2, explanation: "Good, but quality control points (Stage 3) will be crucial." },
            { id: "c", choice: "No, it relies on key people's institutional knowledge.", score: 1, explanation: "High risk of failure; need Process Mapping before tool selection." }
        ]
    },
    {
        focusArea: "dataAccessibility",
        question: "Is the critical data (customer history, sales, inventory) needed to run your business easily accessible in one or two main systems?",
        explanation: "Smart tools need consistent, centralized data to function effectively (Stage 2 concern). Fragmented data severely complicates integration.",
        type: "scale",
        maxScore: 3,
        responseScale: [
            { scale: 1, score: 0, explanation: "Data is scattered in spreadsheets/filing cabinets. Must prioritize Data Unification Project." },
            { scale: 2, score: 1, explanation: "Data is in multiple non-communicating systems. Integration will be complex." },
            { scale: 3, score: 2, explanation: "Most data is in a few systems, but manual export is often required." },
            { scale: 4, score: 3, explanation: "All key data is in one modern, integrated system (CRM/ERP)." },
            { scale: 5, score: 3, explanation: "All key data is in one modern, integrated system (CRM/ERP)." }
        ]
    },
    {
        focusArea: "measurementDiscipline",
        question: "How frequently do you track and review key metrics related to customer satisfaction or product quality (not just revenue)?",
        explanation: "Transformation must be measured by value creation (Stage 4). Without discipline, you won't know if the Ascent was successful.",
        type: "scale",
        maxScore: 3,
        responseScale: [
            { scale: 1, score: 0, explanation: "Annually or never. Need to implement a basic Scorecard Framework immediately." },
            { scale: 2, score: 0, explanation: "Only occasionally or when a problem arises." },
            { scale: 3, score: 1, explanation: "Monthly reviews. A good start, but slow to catch issues." },
            { scale: 4, score: 2, explanation: "Weekly reviews. Ready for rigorous tracking." },
            { scale: 5, score: 3, explanation: "Daily/weekly dashboards and team reviews. Excellent discipline." }
        ]
    },

    // === 3. TALENT & CULTURE READINESS (Total Max Score: 9) ===
    {
        focusArea: "changeTolerance",
        question: "How quickly and smoothly does your team typically adopt a new internal system (e.g., new CRM, new HR platform)?",
        explanation: "Adoption is the biggest hurdle. High resistance means you need substantial change management support (Stage 6).",
        type: "scale",
        maxScore: 3,
        responseScale: [
            { scale: 1, score: 0, explanation: "Very slow, high resistance, complaints. High adoption risk." },
            { scale: 2, score: 0, explanation: "Slow adoption, requires significant push from management." },
            { scale: 3, score: 1, explanation: "Average adoption rate, minor resistance." },
            { scale: 4, score: 2, explanation: "Smooth, relatively fast adoption." },
            { scale: 5, score: 3, explanation: "Quick, eager, and adaptable. Low adoption risk." }
        ]
    },
    {
        focusArea: "teamEmpowerment",
        question: "Are your front-line employees encouraged and trusted to suggest new, experimental ways of doing their work?",
        explanation: "New ways of working (Stage 3) require team buy-in. Empowered teams design better, more effective processes.",
        type: "mcq",
        maxScore: 3,
        responseMCQ: [
            { id: "a", choice: "Yes, we have a formal process to collect and act on ideas.", score: 3, explanation: "Ideal culture for successful pilot runs and process improvements." },
            { id: "b", choice: "Yes, informally, but rarely are the ideas acted upon.", score: 2, explanation: "The intent is there, but execution needs structure." },
            { id: "c", choice: "No, they primarily follow instructions from above.", score: 1, explanation: "Culture will resist new processes; need to involve teams in design (Stage 3)." }
        ]
    },
    {
        focusArea: "learningMindset",
        question: "Do you actively budget for and require employees to participate in skills training and professional development?",
        explanation: "Transformation requires Talent Re-skilling (Stage 6). A budget for learning shows readiness for cultural change.",
        type: "mcq",
        maxScore: 3,
        responseMCQ: [
            { id: "a", choice: "Yes, training is mandatory and budgeted.", score: 3, explanation: "High capacity for Talent Re-skilling (Stage 6)." },
            { id: "b", choice: "Yes, it's optional and available.", score: 2, explanation: "Sufficient to start, but needs to be mandatory for key roles." },
            { id: "c", choice: "No, or very rarely.", score: 1, explanation: "Need to introduce a Re-skilling Strategy immediately to future-proof the team." }
        ]
    },

    // === 4. AI FAMILIARITY & OPERATIONAL AGILITY (Total Max Score: 9) ===
    {
        focusArea: "aiFamiliarity",
        question: "Have you or your team successfully trialed or implemented simple AI-based services (e.g., ChatGPT, AI image generators, simple customer service chatbots)?",
        explanation: "This measures your organizational comfort level with the *concept* of smart tools, which lowers the barrier to adoption.",
        type: "mcq",
        maxScore: 3,
        responseMCQ: [
            { id: "a", choice: "Yes, multiple successful internal uses.", score: 3, explanation: "Already past the first mental hurdle and ready for application." },
            { id: "b", choice: "Yes, trialed a few but no formal use.", score: 2, explanation: "Familiarity is high, needs structure to become productive." },
            { id: "c", choice: "No, we haven't touched any AI tools.", score: 1, explanation: "Requires Foundational AI Introduction to demystify tools." }
        ]
    },
    {
        focusArea: "pilotCapacity",
        question: "Do you have a specific, small team that could dedicate 5-10 hours per week for 4 weeks to test a new process?",
        explanation: "The Value Ascent starts with a small, focused test (30-Day Sprint). This measures the immediate bandwidth for Stage 3.",
        type: "mcq",
        maxScore: 3,
        responseMCQ: [
            { id: "a", choice: "Yes, we can free up a small team for a pilot.", score: 3, explanation: "Ready to execute a pilot immediately (high agility)." },
            { id: "b", choice: "Not easily, everyone is at 100% capacity.", score: 1, explanation: "Need a Capacity Audit to free up time before starting any project." }
        ]
    },
    {
        focusArea: "investmentComfort",
        question: "Are you comfortable starting with small, monthly subscriptions for new software tools before committing to large enterprise systems?",
        explanation: "This measures alignment with the low-risk, iterative approach of the Value Ascent (Stage 2: Pick Your Gear).",
        type: "mcq",
        maxScore: 3,
        responseMCQ: [
            { id: "a", choice: "Yes, we prefer the low-risk, subscription approach.", score: 3, explanation: "Perfect fit for the framework's philosophy." },
            { id: "b", choice: "No, we only approve large annual/one-time capital expenditures.", score: 1, explanation: "Requires a detailed Cost-Benefit Analysis even for small tools." }
        ]
    }
];