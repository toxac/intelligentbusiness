import { createSignal, Show } from "solid-js";

const questions = [
  { id: 'q1', text: 'Do you have a clear business goal you want AI to help with (e.g., reduce churn, cut costs)?', weight: 0.15 },
  { id: 'q2', text: 'Do you have data for the target area (customer records, sales logs, inventory) that is reasonably complete?', weight: 0.2 },
  { id: 'q3', text: 'Do you use a system (POS, CRM, or spreadsheet) that stores the data centrally?', weight: 0.15 },
  { id: 'q4', text: 'Is there a staff member who will own this project (even part-time)?', weight: 0.1 },
  { id: 'q5', text: 'Have you tried AI tools in any part of the business already (chat, automation, forecasting)?', weight: 0.1 },
  { id: 'q6', text: 'Are your core processes documented or consistently followed?', weight: 0.1 },
  { id: 'q7', text: 'Do you have KPIs tied to money, time, or customer experience for the area you want to improve?', weight: 0.1 },
  { id: 'q8', text: 'Do you have budget or willingness to pay for an initial pilot in the next 60 days?', weight: 0.1 }
];

export default function AssessmentForm() {
  const [answers, setAnswers] = createSignal<Record<string, number>>({});
  const [result, setResult] = createSignal<{ heading: string; summary: string; score: number } | null>(null);
  const [email, setEmail] = createSignal('');
  const [sending, setSending] = createSignal(false);
  const [message, setMessage] = createSignal('');

  function setAnswer(id: string, value: number) {
    setAnswers(prev => ({ ...prev, [id]: value }));
  }

  function allAnswered() {
    return questions.every(q => typeof answers()[q.id] !== 'undefined');
  }

  function computeScore() {
    if (!allAnswered()) {
      setMessage('Please answer all questions.');
      return;
    }
    setMessage('');
    let total = 0;
    let weightSum = 0;
    for (const q of questions) {
      const val = Number(answers()[q.id] ?? 0);
      total += val * q.weight;
      weightSum += 2 * q.weight;
    }
    const normalized = Math.round((total / weightSum) * 100);

    let heading = '';
    let summary = '';
    if (normalized >= 75) {
      heading = 'Pilot-Ready (Good fit for a quick pilot)';
      summary = `Your score: ${normalized}. You have the core pieces to run a short pilot (30-60 days). Consider a focused paid workshop or a small consulting pilot.`;
    } else if (normalized >= 45) {
      heading = 'Needs Planning (Start with Base Camp)';
      summary = `Your score: ${normalized}. You have some foundations but should clarify goals and data before a pilot. Start with the free webinar and the Ascent Map.`;
    } else {
      heading = 'Exploring (Begin at Base Camp)';
      summary = `Your score: ${normalized}. We recommend a short guided planning session: define the goal and gather the right data.`;
    }

    setResult({ heading, summary, score: normalized });
  }

  async function sendEmail() {
    const r = result();
    if (!r) return;
    if (!email() || !email().includes('@')) { setMessage('Please enter a valid email'); return; }
    setSending(true);
    setMessage('');
    try {
      const res = await fetch('/api/save-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email(), score: r.score, responses: answers() })
      });
      if (!res.ok) throw new Error('save failed');
      const body = await res.json();
      // Expecting saved assessment row in body.data
      const saved = body.data && Array.isArray(body.data) ? body.data[0] : (body.data ? body.data : null);
      const assessmentId = saved?.id || (body.saved && body.saved[0]?.id) || null;
      if (assessmentId) {
        // Redirect to the saved assessment page (persistent link)
        window.location.href = `/assessment/${assessmentId}`;
      } else {
        setMessage('Saved. We will email your action plan shortly.');
      }
      setEmail('');
    } catch (e) {
      console.error(e);
      setMessage('There was an error saving your result. Please try again later.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        {questions.map((q, i) => (
          <div class="mb-4">
            <label class="font-medium">{i + 1}. {q.text}</label>
            <div class="mt-2 text-gray-700">
              <label class="block mb-2">
                <div class="flex items-center gap-3">
                  <input type="radio" name={q.id} value="2" onChange={() => setAnswer(q.id, 2)} />
                  <span class="ml-2">Yes — ready</span>
                </div>
              </label>
              <label class="block mb-2">
                <div class="flex items-center gap-3">
                  <input type="radio" name={q.id} value="1" onChange={() => setAnswer(q.id, 1)} />
                  <span class="ml-2">Partially — some work needed</span>
                </div>
              </label>
              <label class="block mb-2">
                <div class="flex items-center gap-3">
                  <input type="radio" name={q.id} value="0" onChange={() => setAnswer(q.id, 0)} />
                  <span class="ml-2">No — not started</span>
                </div>
              </label>
            </div>
          </div>
        ))}

        <div class="mt-6 flex gap-3">
          <button type="button" onClick={computeScore} class="bg-primary text-white px-5 py-3 rounded-lg">Get my score</button>
          <button type="reset" onClick={() => { setAnswers({}); setResult(null); setMessage(''); }} class="border px-5 py-3 rounded-lg">Reset</button>
        </div>
      </form>

      <Show when={message()}>
        <p class="text-sm text-red-600 mt-3">{message()}</p>
      </Show>

      <Show when={result()}>
        <div class="mt-6 bg-blue-50 p-4 rounded">
          <h3 class="font-semibold text-lg">{result()?.heading}</h3>
          <p class="text-gray-700 mt-2">{result()?.summary}</p>

          <div class="mt-4">
            <p class="text-sm text-gray-600">Enter your email to receive a tailored one-page action plan:</p>
            <div class="mt-2 flex gap-2 items-start">
              <input type="email" value={email()} onInput={e => setEmail(e.currentTarget.value)} placeholder="you@company.com" class="border px-3 py-2 rounded w-full max-w-sm" />
              <button type="button" onClick={sendEmail} class="bg-primary text-white px-4 py-2 rounded" disabled={sending()}>Send</button>
            </div>
            <p class="text-sm text-gray-600 mt-2">We store results securely and will email your action plan. You can opt out anytime.</p>
          </div>
        </div>
      </Show>
    </div>
  );
}
