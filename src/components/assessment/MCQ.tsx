import {  For } from 'solid-js';
import { type Question } from '../../constants/assessmentQuestions';

interface MCQProps {
    question: Question;
    answer: string | null;
    // setAnswer expects a string (the ID of the selected choice)
    setAnswer: (value: string) => void; 
}

export default function MCQ(props:MCQProps) {
    return (
        <fieldset class="space-y-3">
            <For each={props.question.responseMCQ}>
                {(detail) => (
                    <label class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors duration-150 hover:bg-indigo-50"
                           // Class binding for visual feedback on selection
                           classList={{'bg-indigo-100 border-indigo-500': props.answer === detail.id}}>
                        <input
                            type="radio"
                            name={props.question.focusArea}
                            value={detail.id}
                            checked={props.answer === detail.id}
                            // Call the setter function passed from the parent component
                            onInput={() => props.setAnswer(detail.id!)} 
                            class="form-radio h-5 w-5 text-indigo-600"
                        />
                        <span class="text-gray-800">{detail.choice}</span>
                    </label>
                )}
            </For>
        </fieldset>
    );
};

