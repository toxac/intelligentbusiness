import { createSignal, createMemo } from 'solid-js';
import MCQ from './MCQ';
import ScaleQuestion from './ScaleQuestion';
import { ascendAssessmentQuestions,type Question } from '../../constants/assessmentQuestions'; // Assuming AssessmentData.ts for constants

// Define the shape for storing the answers { focusArea: selectedValue }
type AnswersMap = Record<string, string | number | null>;

export default function AssessmentForm() {
    // State to track the current question index
    const [currentIndex, setCurrentIndex] = createSignal(0);
    
    // State to store all user answers
    const [answers, setAnswers] = createSignal<AnswersMap>({});

    // Memo to get the current question object
    const currentQuestion = createMemo(() => ascendAssessmentQuestions[currentIndex()]);
    
    // Memo to get the answer for the current question
    const currentAnswer = createMemo(() => answers()[currentQuestion().focusArea] || null);
    
    const totalQuestions = ascendAssessmentQuestions.length;

    // --- Core Handlers ---
    
    const handleSetAnswer = (value: string | number) => {
        setAnswers(prev => ({ ...prev, [currentQuestion().focusArea]: value }));
    };

    const handleNext = () => {
        // Validation: Must select an answer before moving forward
        if (currentAnswer() === null) {
            alert("Please select an answer before proceeding.");
            return;
        }

        if (currentIndex() < totalQuestions - 1) {
            setCurrentIndex(currentIndex() + 1);
        } else {
            // Final submission logic
            alert("Assessment Complete! Reviewing results...");
            console.log("Final Answers:", answers());
            // TODO: Implement scoring logic and navigate to results page
        }
    };
    
    const handlePrev = () => {
        if (currentIndex() > 0) {
            setCurrentIndex(currentIndex() - 1);
        }
    };

    // --- Dynamic Question Renderer ---
    
    const QuestionComponentRenderer = () => {
        const q = currentQuestion();
        const answer = currentAnswer();

        // Type checking and casting props for the specific components
        if (q.type === 'mcq') {
            return <MCQ
                question={q} 
                answer={answer as string | null} 
                setAnswer={handleSetAnswer as (value: string) => void} 
            />;
        }
        
        if (q.type === 'scale') {
            return <ScaleQuestion 
                question={q} 
                answer={answer as number | null} 
                setAnswer={handleSetAnswer as (value: number) => void} 
            />;
        }
        
        return <div>Unsupported Question Type.</div>;
    };


    return (
        <div class="max-w-xl mx-auto p-6 bg-gray-50 shadow-xl rounded-xl">
            <h1 class="text-3xl font-bold text-center text-indigo-800 mb-6">
                Value Ascent Readiness Assessment
            </h1>
            
            {/* Progress Bar */}
            <div class="mb-4 text-center">
                <span class="text-lg font-semibold text-gray-700">
                    Question {currentIndex() + 1} of {totalQuestions}
                </span>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div class="bg-indigo-600 h-2.5 rounded-full" 
                         style={{ width: `${((currentIndex() + 1) / totalQuestions) * 100}%` }}>
                    </div>
                </div>
            </div>

            {/* Question Card */}
            <div class="bg-white p-6 border border-gray-200 rounded-lg shadow-md mb-6 min-h-[300px] flex flex-col justify-between">
                <div>
                    <h2 class="text-xl font-semibold text-gray-900 mb-3">
                        {currentQuestion().question}
                    </h2>
                    <p class="text-sm text-indigo-600 italic mb-4">
                        Why this matters: {currentQuestion().explanation}
                    </p>
                    {QuestionComponentRenderer()}
                </div>
            </div>
            
            {/* Navigation Buttons */}
            <div class="flex justify-between mt-6">
                <button
                    onClick={handlePrev}
                    disabled={currentIndex() === 0}
                    class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg transition-colors disabled:opacity-50 hover:bg-gray-400"
                >
                    &larr; Previous
                </button>
                
                <button
                    onClick={handleNext}
                    // Disable next button if no answer is currently selected
                    class="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-colors hover:bg-indigo-700"
                >
                    {currentIndex() < totalQuestions - 1 ? 'Next Question \u2192' : 'Complete Assessment \u2713'}
                </button>
            </div>
            
            {/* Debug panel (keep this for testing!) */}
            <pre class="mt-8 text-xs bg-gray-100 p-4 rounded text-gray-700">
                Focus Area: {currentQuestion().focusArea} | Current Answer: {JSON.stringify(currentAnswer())}
            </pre>
        </div>
    );
}