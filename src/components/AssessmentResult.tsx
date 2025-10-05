import { createSignal, onMount } from 'solid-js';

export default function AssessmentResult(props: { assessment: any; lead: any }) {
  const [recommendation, setRecommendation] = createSignal('');

  onMount(() => {
    const score = props.assessment?.score ?? 0;
    if (score >= 75) setRecommendation('You are pilot-ready. Start with a focused 30-60 day pilot on a high-impact use case.');
    else if (score >= 45) setRecommendation('You need planning: clarify goals, clean the data, and take the free webinar.');
    else setRecommendation('Begin at Base Camp: define the goal and gather the data. Consider a planning workshop.');
  });

  return (
    <div>
      <div class="bg-white p-6 rounded shadow-sm">
        <h2 class="text-2xl font-semibold">Your Assessment</h2>
        <p class="mt-2">Score: <strong>{props.assessment?.score}</strong></p>
        <p class="mt-2">Taken: <strong>{new Date(props.assessment?.created_at).toLocaleString()}</strong></p>
        <div class="mt-4">
          <h3 class="font-semibold">Recommendation</h3>
          <p class="text-gray-700 mt-2">{recommendation()}</p>
        </div>
        <div class="mt-4">
          <h3 class="font-semibold">Details</h3>
          <pre class="text-sm bg-gray-50 p-3 rounded mt-2">{JSON.stringify(props.assessment?.responses, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}
