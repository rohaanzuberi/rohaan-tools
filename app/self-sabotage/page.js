'use client';

import { useState } from "react";

const questions = [
  {
    id: 1,
    hook: "Be honest with yourself for the next 2 minutes.",
    question: "You set a goal you genuinely care about. What usually happens?",
    options: [
      { text: "I start strong but fade out before it gets hard", types: { E: 2 } },
      { text: "I plan obsessively but struggle to actually begin", types: { P: 2 } },
      { text: "I begin but quietly convince myself it's not the right time", types: { I: 2 } },
      { text: "I go all in, burn out, then disappear on myself", types: { Pr: 2 } },
    ],
  },
  {
    id: 2,
    question: "When you imagine actually achieving what you want — your honest gut reaction is:",
    options: [
      { text: "Excitement, then a quiet voice saying 'you won't last'", types: { E: 2, I: 1 } },
      { text: "Fear that it won't be good enough even if I get there", types: { P: 2 } },
      { text: "Doubt that someone like me actually deserves that life", types: { I: 2 } },
      { text: "Pure excitement — until reality sets in and I go quiet", types: { Pr: 2, E: 1 } },
    ],
  },
  {
    id: 3,
    question: "The moment you're most likely to quit is:",
    options: [
      { text: "When it stops feeling good and starts feeling like work", types: { E: 2 } },
      { text: "When I realize it might not turn out perfect", types: { P: 2 } },
      { text: "When people start to notice and expect things from me", types: { I: 2, Pr: 1 } },
      { text: "When I hit a wall and don't know the next step", types: { Pr: 2, P: 1 } },
    ],
  },
  {
    id: 4,
    question: "If you're being brutally honest, the story you tell yourself most is:",
    options: [
      { text: "'I'll feel more motivated tomorrow'", types: { E: 2 } },
      { text: "'I need to figure out the perfect plan first'", types: { P: 2 } },
      { text: "'People like me don't really get to have that'", types: { I: 2 } },
      { text: "'I just need a break, then I'll go harder'", types: { Pr: 2, E: 1 } },
    ],
  },
  {
    id: 5,
    question: "When you let yourself down, what do you feel most?",
    options: [
      { text: "Frustration — then I distract myself until the feeling passes", types: { E: 2 } },
      { text: "Shame — like I should have known better than to try", types: { P: 2, I: 1 } },
      { text: "A quiet sense that this is just who I am", types: { I: 2 } },
      { text: "Guilt — then I make a new plan to make up for it", types: { Pr: 2, P: 1 } },
    ],
  },
  {
    id: 6,
    question: "Your relationship with discomfort is:",
    options: [
      { text: "I avoid it by staying busy with easier things", types: { E: 2, P: 1 } },
      { text: "I overthink it until the window of action closes", types: { P: 2 } },
      { text: "I tolerate it until someone notices — then I pull back", types: { I: 2 } },
      { text: "I push through it recklessly until I crash", types: { Pr: 2 } },
    ],
  },
  {
    id: 7,
    question: "Deep down, what do you think the real problem is?",
    options: [
      { text: "I know what to do. I just can't make myself do it consistently", types: { E: 2, Pr: 1 } },
      { text: "I set impossible standards then punish myself for not meeting them", types: { P: 2 } },
      { text: "Some part of me doesn't believe I'm capable of being that person", types: { I: 2 } },
      { text: "I go too hard, burn out, and lose trust in myself every time", types: { Pr: 2 } },
    ],
  },
];

const typeNames = {
  E: "The Escapist",
  P: "The Perfectionist",
  I: "The Impostor",
  Pr: "The Protector",
};

const results = {
  E: {
    type: "The Escapist",
    headline: "You're not lazy. You're running from the moment it gets real.",
    villain: "The Fade",
    villainDesc: "The version of you that shows up when the excitement wears off. Not dramatic. Just quiet. It doesn't say 'I quit' — it says 'I'll start again tomorrow.' And tomorrow never quite comes.",
    whatIsHappening: [
      "You've confused motivation with capability — so when the feeling disappears, you think your ability has too",
      "Discomfort triggers an exit response — your brain has learned that hard = danger, so it finds relief before you consciously decide to quit",
      "Every restart costs you trust — each time you fade out, you send yourself the message 'I can't rely on me'",
    ],
    wayForward: [
      { step: "Name the fade before it happens", detail: "You already know the moment it comes — when the excitement dips and the work gets unglamorous. Write down exactly what that moment looks and feels like. Naming it means you see it coming instead of waking up inside it." },
      { step: "Shrink the window", detail: "Stop committing to 90-day goals you can't feel yet. Commit to showing up for 7 days only. Then 7 more. You don't have a consistency problem — you have a time-horizon problem." },
      { step: "Make discomfort the metric", detail: "Stop measuring progress by results. Start measuring it by how many times you stayed when you wanted to leave. That's the actual muscle you're building." },
    ],
    truth: "You don't have a discipline problem. You have a tolerance problem. And tolerance is trainable.",
  },
  P: {
    type: "The Perfectionist",
    headline: "You're not preparing. You're hiding behind the plan.",
    villain: "The Standard",
    villainDesc: "The version of you that raises the bar every time you get close. Not because you're ambitious — but because an impossible standard means you never have to jump. It looks like high expectations. It's actually armour.",
    whatIsHappening: [
      "Preparation has become a substitute for action — the planning feels productive enough to quieten the guilt",
      "Your bar is calibrated to be unreachable — unconsciously, because reaching it would mean you'd have to do it again, bigger, with more at stake",
      "Perfectionism is fear wearing a work ethic — it's not about quality, it's about control",
    ],
    wayForward: [
      { step: "Set a 'good enough' standard before you start", detail: "Literally write it down: 'This will be good enough when ___.' Not great. Not perfect. Good enough. Then hold yourself to that ceiling, not the sky." },
      { step: "Publish before you're ready", detail: "Whatever you're working on — send the email, post the content, start the conversation — at 80% of where you want it to be. The discomfort of imperfection is the rep." },
      { step: "Separate self-worth from output", detail: "Your work is not a referendum on your value. The plan isn't imperfect because you're imperfect. Everything is imperfect. Do it badly first." },
    ],
    truth: "Perfectionism isn't about quality. It's about control. And the life you want is on the other side of letting go of it.",
  },
  I: {
    type: "The Impostor",
    headline: "You already know what to do. You just don't think you're allowed to do it.",
    villain: "The Ceiling",
    villainDesc: "The version of you that keeps you small right before you'd be seen. It doesn't say 'you're not good enough' out loud — it just manufactures reasons to stay invisible. It's been protecting you for years. It's also been keeping you stuck.",
    whatIsHappening: [
      "You've built an identity around almost — getting close but not quite, so you never have to find out what happens if you fully try and it doesn't work",
      "Other people's success feels like evidence against you — like the universe has a limited supply and yours got taken",
      "You self-sabotage before anyone else can — making yourself small before the world gets the chance to",
    ],
    wayForward: [
      { step: "Audit the identity you're protecting", detail: "Ask yourself: who would I have to stop being if this worked? What story about myself would I have to give up? The sabotage is protecting that story. Name it first." },
      { step: "Collect evidence deliberately", detail: "Your brain keeps score of every failure and ignores every win. Start a running document of every small proof that you're capable. Not quotes. Actual receipts of your own competence." },
      { step: "Do it while feeling like a fraud", detail: "The feeling of being an impostor doesn't go away before you act — it goes away because you act. Stop waiting to feel ready. Readiness is retrospective." },
    ],
    truth: "You're not an impostor pretending to be capable. You're a capable person pretending to be an impostor. The difference is everything.",
  },
  Pr: {
    type: "The Protector",
    headline: "You're not afraid of failure. You're afraid of what it looks like to fully try.",
    villain: "The Crash",
    villainDesc: "The version of you that burns so bright it burns out. It goes all in — then disappears. Not because you're weak, but because you've never learned to sustain. The crash isn't failure. It's your system doing exactly what it was built to do — protect you from the exposure of caring too much.",
    whatIsHappening: [
      "You cycle between all-in and gone — because moderate, consistent effort feels worse than doing nothing. It never feels like enough.",
      "The burnout isn't accidental — it's a subconscious exit before the thing gets real enough to actually hurt",
      "Every crash erodes self-trust — and low self-trust makes the next cycle shorter, until showing up consistently feels genuinely impossible",
    ],
    wayForward: [
      { step: "Lower the intensity on purpose", detail: "Your version of showing up is unsustainable by design. Cut your effort in half — not because you're lazy, but because 50% consistently beats 100% occasionally every single time." },
      { step: "Build a circuit breaker", detail: "Identify your pre-crash warning signs — the irritability, the feeling that you need to do everything at once. Write them down. When you see them, that's the signal to slow down, not push harder." },
      { step: "Redefine what showing up looks like", detail: "Right now showing up means going hard. Rewrite the definition. Showing up is doing the minimum viable thing on the days you don't want to. That's the rep that builds self-trust." },
    ],
    truth: "The version of you that goes all in and stays — even when it's slow, even when nobody's watching — that's the version that changes everything.",
  },
};

const secondaryInsights = {
  "E+P": "You escape through planning. The research, the frameworks, the perfect conditions — they're your most sophisticated exit strategy.",
  "E+I": "You fade out right before you'd be seen. The timing is never accidental.",
  "E+Pr": "You alternate between paralysis and explosions of effort. Neither feels sustainable because neither is.",
  "P+I": "You set impossible standards so you never have to find out what happens when you fully try.",
  "P+Pr": "You plan intensely, execute in bursts, then crash when reality doesn't match the vision.",
  "I+Pr": "You protect yourself by burning out before anyone sees what you're actually capable of.",
};

const COLORS = {
  bg: "#f5f2ed",
  card: "#faf8f5",
  dark: "#1c1c1c",
  muted: "rgba(28,28,28,0.5)",
  faint: "rgba(28,28,28,0.28)",
  border: "rgba(28,28,28,0.08)",
};

export default function SelfSabotageAudit() {
  const [screen, setScreen] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [primaryResult, setPrimaryResult] = useState(null);
  const [secondaryResult, setSecondaryResult] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const getTopTwo = (ans) => {
    const counts = { E: 0, P: 0, I: 0, Pr: 0 };
    ans.forEach(a => Object.entries(a).forEach(([k, v]) => counts[k] += v));
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return [sorted[0][0], sorted[1][0]];
  };

  const getSecondaryKey = (p, s) => {
    return [`${p}+${s}`, `${s}+${p}`].find(c => secondaryInsights[c]) || null;
  };

  const handleSelect = (types) => setSelected(types);

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    if (current < questions.length - 1) {
      setAnswers(newAnswers);
      setSelected(null);
      setCurrent(current + 1);
    } else {
      const [primary, secondary] = getTopTwo(newAnswers);
      setPrimaryResult(results[primary]);
      setSecondaryResult({ key: secondary, insight: secondaryInsights[getSecondaryKey(primary, secondary)] });
      setScreen("result");
      setTimeout(() => setRevealed(true), 100);
    }
  };

  const handleBack = () => {
    if (current === 0) return;
    setAnswers(answers.slice(0, -1));
    setSelected(null);
    setCurrent(current - 1);
  };

  const handleStart = () => {
    setScreen("quiz");
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
    setRevealed(false);
    setPrimaryResult(null);
    setSecondaryResult(null);
  };

  const progress = (current / questions.length) * 100;

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", color: COLORS.dark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "52px 20px 80px" }}>

        {/* INTRO */}
        {screen === "intro" && (
          <div style={{ animation: "fadeUp 0.7s ease both" }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.26em", color: COLORS.faint, textTransform: "uppercase", marginBottom: "20px", fontWeight: "600" }}>
              The self-sabotage audit
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(30px, 7vw, 48px)",
              fontWeight: "600", lineHeight: "1.12",
              margin: "0 0 8px", color: COLORS.dark,
            }}>
              You know you're capable of more.
            </h1>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(30px, 7vw, 48px)",
              fontWeight: "600", lineHeight: "1.12",
              margin: "0 0 28px", color: COLORS.dark,
              fontStyle: "italic", opacity: 0.32,
            }}>
              So why do you keep getting in your own way?
            </h1>

            <div style={{ width: "32px", height: "1.5px", background: COLORS.dark, opacity: 0.2, marginBottom: "28px" }} />

            <div style={{ fontSize: "15px", lineHeight: "1.9", color: COLORS.muted }}>
              <p style={{ margin: "0 0 16px" }}>
                You know the feeling. It's 1am. You're fired up, clearer than you've been in months. You make the plan, mean every word of it. This time is different.
              </p>
              <p style={{ margin: "0 0 16px" }}>
                And then you wake up.
              </p>
              <p style={{ margin: "0 0 16px" }}>
                The same invisible wall. The same quiet voice that finds a reason to wait. The same you — talking yourself out of the thing you talked yourself into the night before.
              </p>
              <p style={{ margin: "0 0 32px" }}>
                It's not laziness. Lazy people don't lie awake thinking about who they could be. This audit will show you exactly what's running underneath it. And how to stop it.
              </p>
            </div>

            <p style={{
              fontSize: "12px", color: COLORS.faint,
              letterSpacing: "0.1em", textAlign: "center",
              marginBottom: "16px", textTransform: "uppercase", fontWeight: "600",
            }}>
              7 questions &nbsp;·&nbsp; 2 minutes &nbsp;·&nbsp; no generic advice
            </p>

            <button onClick={handleStart} style={{
              width: "100%", background: COLORS.dark, color: COLORS.bg,
              border: "none", borderRadius: "100px", padding: "16px",
              fontSize: "14px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.06em",
            }}>
              Find out why →
            </button>

            <p style={{ textAlign: "center", color: COLORS.faint, fontSize: "12px", marginTop: "14px", fontStyle: "italic" }}>
              Be honest. Nobody's watching.
            </p>
          </div>
        )}

        {/* QUIZ */}
        {screen === "quiz" && (
          <div style={{ animation: "fadeUp 0.35s ease both" }} key={current}>
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: COLORS.faint, fontWeight: "600" }}>
                  {current + 1} of {questions.length}
                </div>
                <div style={{ fontSize: "11px", color: COLORS.faint }}>
                  {Math.round(progress)}% done
                </div>
              </div>
              <div style={{ height: "2px", background: "rgba(28,28,28,0.08)", borderRadius: "2px" }}>
                <div style={{ height: "100%", borderRadius: "2px", background: COLORS.dark, width: `${progress}%`, transition: "width 0.4s ease" }} />
              </div>
            </div>

            {questions[current].hook && (
              <p style={{ fontSize: "12px", color: COLORS.faint, letterSpacing: "0.06em", fontStyle: "italic", marginBottom: "10px" }}>
                {questions[current].hook}
              </p>
            )}

            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(22px, 5vw, 30px)",
              fontWeight: "600", lineHeight: "1.3",
              margin: "0 0 28px", color: COLORS.dark,
            }}>
              {questions[current].question}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
              {questions[current].options.map((opt, i) => {
                const isSelected = JSON.stringify(selected) === JSON.stringify(opt.types);
                return (
                  <button key={i} onClick={() => handleSelect(opt.types)} style={{
                    background: isSelected ? COLORS.dark : COLORS.card,
                    color: isSelected ? COLORS.bg : COLORS.dark,
                    border: `1px solid ${isSelected ? COLORS.dark : COLORS.border}`,
                    borderRadius: "12px", padding: "16px 20px",
                    fontSize: "14px", lineHeight: "1.55",
                    textAlign: "left", cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>
                    {opt.text}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {current > 0 && (
                <button onClick={handleBack} style={{
                  flex: "0 0 auto",
                  background: "transparent",
                  border: `1.5px solid ${COLORS.border}`,
                  borderRadius: "100px", padding: "14px 22px",
                  fontSize: "13px", color: COLORS.faint,
                  cursor: "pointer", letterSpacing: "0.04em",
                }}>
                  ← Back
                </button>
              )}
              <button onClick={handleNext} disabled={!selected} style={{
                flex: 1,
                background: selected ? COLORS.dark : "rgba(28,28,28,0.07)",
                color: selected ? COLORS.bg : COLORS.faint,
                border: "none", borderRadius: "100px", padding: "15px",
                fontSize: "14px", fontWeight: "600",
                cursor: selected ? "pointer" : "default",
                letterSpacing: "0.05em", transition: "all 0.25s ease",
              }}>
                {current < questions.length - 1 ? "Next →" : "Show me the truth →"}
              </button>
            </div>
          </div>
        )}

        {/* RESULT */}
        {screen === "result" && primaryResult && (
          <div style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}>
            <div style={{ fontSize: "10px", letterSpacing: "0.26em", color: COLORS.faint, textTransform: "uppercase", marginBottom: "8px", fontWeight: "600" }}>
              Your pattern
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "12px", letterSpacing: "0.1em", color: COLORS.faint, textTransform: "uppercase", marginBottom: "10px", fontWeight: "600" }}>
              {primaryResult.type}{secondaryResult?.key && ` + ${typeNames[secondaryResult.key]}`}
            </div>

            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(26px, 6vw, 40px)",
              fontWeight: "600", lineHeight: "1.15",
              margin: "0 0 24px", color: COLORS.dark,
            }}>
              {primaryResult.headline}
            </h1>

            <div style={{ width: "32px", height: "1.5px", background: COLORS.dark, opacity: 0.2, marginBottom: "28px" }} />

            {secondaryResult?.insight && (
              <div style={{ background: COLORS.dark, borderRadius: "12px", padding: "18px 20px", marginBottom: "16px" }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,242,237,0.35)", fontWeight: "600", marginBottom: "8px" }}>
                  Your specific combination
                </div>
                <p style={{ fontSize: "15px", color: "#f5f2ed", lineHeight: "1.7", margin: 0, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontWeight: "500" }}>
                  "{secondaryResult.insight}"
                </p>
              </div>
            )}

            <div style={{ background: COLORS.card, borderRadius: "16px", padding: "24px", border: `1px solid ${COLORS.border}`, marginBottom: "12px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.faint, fontWeight: "600", marginBottom: "10px" }}>
                Meet your villain
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "700", color: COLORS.dark, marginBottom: "10px" }}>
                {primaryResult.villain}
              </div>
              <p style={{ fontSize: "14px", lineHeight: "1.75", color: COLORS.muted, margin: 0 }}>
                {primaryResult.villainDesc}
              </p>
            </div>

            <div style={{ background: COLORS.card, borderRadius: "16px", padding: "24px", border: `1px solid ${COLORS.border}`, marginBottom: "12px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.faint, fontWeight: "600", marginBottom: "16px" }}>
                What's actually happening
              </div>
              {primaryResult.whatIsHappening.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: i < primaryResult.whatIsHappening.length - 1 ? "14px" : 0 }}>
                  <div style={{ minWidth: "6px", height: "6px", borderRadius: "50%", background: COLORS.dark, marginTop: "8px", flexShrink: 0 }} />
                  <p style={{ fontSize: "14px", lineHeight: "1.75", color: COLORS.muted, margin: 0 }}>{item}</p>
                </div>
              ))}
            </div>

            <div style={{ background: COLORS.card, borderRadius: "16px", padding: "24px", border: `1px solid ${COLORS.border}`, marginBottom: "20px" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: COLORS.faint, fontWeight: "600", marginBottom: "16px" }}>
                Your way forward
              </div>
              {primaryResult.wayForward.map((item, i) => (
                <div key={i} style={{ marginBottom: i < primaryResult.wayForward.length - 1 ? "20px" : 0 }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "8px" }}>
                    <span style={{
                      minWidth: "22px", height: "22px", borderRadius: "50%",
                      background: COLORS.dark, color: COLORS.bg,
                      fontSize: "11px", fontWeight: "700",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: "2px",
                    }}>{i + 1}</span>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "17px", fontWeight: "700", color: COLORS.dark, lineHeight: "1.3" }}>
                      {item.step}
                    </div>
                  </div>
                  <p style={{ fontSize: "14px", lineHeight: "1.75", color: COLORS.muted, margin: "0 0 0 34px" }}>
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ borderLeft: "2px solid #1c1c1c", paddingLeft: "18px", marginBottom: "36px" }}>
              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "18px", lineHeight: "1.6",
                color: COLORS.dark, fontWeight: "600",
                fontStyle: "italic", margin: 0,
              }}>
                "{primaryResult.truth}"
              </p>
            </div>

            <div style={{ background: COLORS.dark, borderRadius: "16px", padding: "28px", marginBottom: "12px", textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 4vw, 22px)", color: "#f5f2ed", lineHeight: "1.5", margin: "0 0 8px", fontWeight: "500" }}>
                Someone you know just did this to themselves.
              </p>
              <p style={{ fontSize: "13px", color: "rgba(245,242,237,0.4)", lineHeight: "1.7", margin: "0 0 22px" }}>
                Send it to the person whose face just came to mind.
              </p>
              <button onClick={() => {
                const text = encodeURIComponent(`I just did this audit on why I keep self-sabotaging and it was uncomfortably accurate. Try it: https://tools.rohaanzuberi.com/self-sabotage`);
                window.open(`https://wa.me/?text=${text}`, "_blank");
              }} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                width: "100%", background: "#f5f2ed", color: "#1c1c1c",
                border: "none", borderRadius: "100px", padding: "14px",
                fontSize: "13px", fontWeight: "600", cursor: "pointer", letterSpacing: "0.05em",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Send to someone who needs this
              </button>
            </div>

            <button onClick={handleStart} style={{
              width: "100%", background: "transparent",
              border: `1.5px solid ${COLORS.border}`,
              borderRadius: "100px", padding: "13px",
              fontSize: "13px", color: COLORS.faint,
              cursor: "pointer", letterSpacing: "0.04em", marginBottom: "32px",
            }}>
              Retake the audit
            </button>

            <div style={{ textAlign: "center" }}>
              <a href="https://www.instagram.com/rohaanzuberi" target="_blank" rel="noreferrer"
                style={{ color: COLORS.faint, fontSize: "11px", letterSpacing: "0.1em", textDecoration: "none", borderBottom: `1px solid rgba(28,28,28,0.12)`, paddingBottom: "2px" }}>
                a free tool, made with love — by rohaan zuberi
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
