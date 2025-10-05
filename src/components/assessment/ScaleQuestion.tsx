import {  createMemo } from 'solid-js';
import { type Question } from '../../constants/assessmentQuestions';

interface ScaleProps {
    question: Question;
    answer: number | null;
    // setAnswer expects a number (the scale value 1-5)
    setAnswer: (value: number) => void;
}

export default function ScaleQuestion (props: ScaleProps) {
    const min = 1;
    const max = 5;
    
    // Memo to provide user-friendly explanation based on the current slider value
    const currentExplanation = createMemo(() => {
        const value = props.answer;
        if (value === null) return "Drag the slider to select your position.";
        
        // Find the best matching explanation based on the scale value
        const detail = props.question.responseScale?.find(d => d.scale === value);
        return detail ? detail.explanation : `Selected value: ${value}`;
    });

    // Handler to safely update the number state from the string input value
    const handleSliderInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        props.setAnswer(parseInt(target.value));
    };

    return (
        <div class="space-y-4">
            <div class="flex justify-between text-sm font-medium">
                <span>1 (Low Readiness)</span>
                <span>5 (High Readiness)</span>
            </div>
            
            <input
                type="range"
                min={min}
                max={max}
                step="1"
                // Default to 1 if no answer is set, for smooth slider UX
                value={props.answer || 1} 
                onInput={handleSliderInput}
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            
            <div class="mt-2 p-3 bg-white border border-gray-300 rounded-lg shadow-inner text-sm text-gray-700">
                <p>Current Score: <strong class="text-indigo-600">{props.answer || '?'}</strong></p>
                <p class="italic">{currentExplanation()}</p>
            </div>
        </div>
    );
};
