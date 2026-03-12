'use client'

import { useState, useEffect } from "react";

const LIFE_EXPECTANCY = 80;
const WEEKS_PER_YEAR = 52;
const TOOL_URL = "https://tools.rohaanzuberi.com/people-grid";
const SHARE_TEXT = "I just counted how many times I'll actually see the people I love most. The number hit different. Try it yourself...";

const DEFAULT_PEOPLE = [
  { id: "parent1", label: "Parent", emoji: "🫂", name: "", age: "", visitsPerYear: "", visitLabel: "visits", isChild: false },
  { id: "parent2", label: "Other parent", emoji: "🫂", name: "", age: "", visitsPerYear: "", visitLabel: "visits", isChild: false },
  { id: "child", label: "Child", emoji: "🧒", name: "", age: "", visitsPerYear: "", visitLabel: "visits", isChild: true },
  { id: "friend", label: "Close friend", emoji: "🤝", name: "", age: "", visitsPerYear: "", visitLabel: "meetups", isChild: false },
  { id: "partner", label: "Partner", emoji: "❤️", name: "", age: "", visitsPerYear: "", visitLabel: "days", isChild: false },
];

const SOCIALS = [
  {
    name: "WhatsApp", color: "#25D366",
    getUrl: () => `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + " " + TOOL_URL)}`,
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
  },
  {
    name: "X", color: "#000000",
    getUrl: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(TOOL_URL)}`,
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
  },
  {
    name: "LinkedIn", color: "#0A66C2",
    getUrl: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(TOOL_URL)}`,
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
  },
  {
    name: "Facebook", color: "#1877F2",
    getUrl: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(TOOL_URL)}`,
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>,
  },
  {
    name: "Telegram", color: "#26A5E4",
    getUrl: () => `https://t.me/share/url?url=${encodeURIComponent(TOOL_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`,
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>,
  },
  {
    name: "Copy link", color: "#1c1c1c",
    getUrl: () => null,
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
  },
];

function WeeksGrid({ totalWeeks, livedWeeks }) {
  const capped = Math.min(totalWeeks, 4160);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2px" }}>
      {Array.from({ length: capped }).map((_, i) => (
        <div key={i} style={{
          width: "5px", height: "5px", borderRadius: "1px", flexShrink: 0,
          backgroundColor: i < livedWeeks ? "#2c2c2c" : "rgba(44,44,44,0.1)",
        }} />
      ))}
    </div>
  );
}

function ShareBar() {
  const [copied, setCopied] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const handleShare = (social) => {
    if (social.name === "Copy link") {
      navigator.clipboard.writeText(TOOL_URL).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
      return;
    }
    window.open(social.getUrl(), "_blank", "noopener,noreferrer");
  };
  return (
    <div style={{ background: "#faf8f5", borderRadius: "20px", padding: "28px 24px", border: "1px solid rgba(28,28,28,0.07)", marginBottom: "12px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(28,28,28,0.35)", fontWeight: "600", marginBottom: "8px" }}>Share with someone who needs to see this</div>
        <p style={{ color: "rgba(28,28,28,0.45)", fontSize: "13px", lineHeight: "1.65", margin: 0 }}>Someone in your life needs this moment. Pass it on.</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center", marginBottom: "16px" }}>
        {SOCIALS.map((social, i) => {
          const isHovered = hoveredIndex === i;
          const isCopied = social.name === "Copy link" && copied;
          return (
            <button key={social.name} onClick={() => handleShare(social)}
              onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: "flex", alignItems: "center", gap: "7px",
                background: isHovered ? social.color : "rgba(28,28,28,0.04)",
                color: isHovered ? "#fff" : "#1c1c1c",
                border: `1px solid ${isHovered ? social.color : "rgba(28,28,28,0.09)"}`,
                borderRadius: "100px", padding: "8px 16px", fontSize: "12px", fontWeight: "600",
                cursor: "pointer", letterSpacing: "0.03em", transition: "all 0.2s ease",
                fontFamily: "'DM Sans', sans-serif",
              }}>
              {social.icon}{isCopied ? "Copied!" : social.name}
            </button>
          );
        })}
      </div>
      <p style={{ color: "rgba(28,28,28,0.22)", fontSize: "11px", textAlign: "center", margin: 0, lineHeight: "1.6" }}>
        For Instagram & TikTok — copy the link and paste in your bio or story
      </p>
    </div>
  );
}

function PersonCard({ person, onUpdate, onRemove, index }) {
  const [messageSent, setMessageSent] = useState(false);

  const age = Number(person.age) || 0;
  const visitsPerYear = Number(person.visitsPerYear) || 0;
  const isYoungChild = person.isChild && age > 0 && age < 18;
  const isAdultChild = person.isChild && age >= 18;

  const totalWeeks = Math.round(LIFE_EXPECTANCY * WEEKS_PER_YEAR);
  const livedWeeks = Math.round(age * WEEKS_PER_YEAR);
  const weeksLeft = Math.max(0, Math.round((LIFE_EXPECTANCY - age) * WEEKS_PER_YEAR));
  const pct = age ? Math.round((livedWeeks / totalWeeks) * 100) : 0;

  // Determine what to show
  let touchpointLabel;
  let activeVisitLabel;

  if (isYoungChild) {
    const weekendsLeft = Math.round(Math.max(0, 18 - age) * WEEKS_PER_YEAR);
    touchpointLabel = age ? `${weekendsLeft.toLocaleString()} weekends left before they turn 18.` : "Enter their age.";
    activeVisitLabel = null; // no visits input for young children
  } else {
    activeVisitLabel = isAdultChild ? "visits" : person.visitLabel;
    const count = Math.round((weeksLeft / WEEKS_PER_YEAR) * visitsPerYear);
    touchpointLabel = age && visitsPerYear
      ? `${count.toLocaleString()} more ${activeVisitLabel}. Ever.`
      : "Enter their age and visits per year.";
  }

  const displayName = person.name.trim() || person.label;
  const waMessage = `Hey. I don't say this enough, but I love you. I was just thinking about you and wanted you to know that. That's it. No reason. Just love.`;

  return (
    <div style={{
      background: "#faf8f5", border: "1px solid rgba(44,44,44,0.1)", borderRadius: "16px",
      padding: "22px", marginBottom: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      animation: "fadeUp 0.5s ease both", animationDelay: `${index * 0.08}s`,
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "17px" }}>{person.emoji}</span>
          <input value={person.name} onChange={e => onUpdate({ ...person, name: e.target.value })}
            placeholder="Their name..."
            style={{ background: "transparent", border: "none", outline: "none", color: "#1c1c1c", fontSize: "16px", fontFamily: "'Cormorant Garamond', serif", fontWeight: "700", width: "150px", letterSpacing: "0.01em" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {age > 0 && (
            <span style={{ fontSize: "11px", color: "#1c1c1c", letterSpacing: "0.08em", background: "rgba(28,28,28,0.07)", borderRadius: "20px", padding: "4px 10px", fontWeight: "500" }}>
              {pct}% lived
            </span>
          )}
          <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(0,0,0,0.18)", fontSize: "18px", padding: "0", lineHeight: 1 }}>×</button>
        </div>
      </div>

      {/* Sublabel */}
      <div style={{ paddingLeft: "28px", marginBottom: "14px" }}>
        <span style={{ fontSize: "11px", color: "rgba(28,28,28,0.28)", letterSpacing: "0.04em", fontStyle: "italic" }}>
          {person.label}{isYoungChild ? " · under 18" : isAdultChild ? " · adult" : ""}
        </span>
      </div>

      {/* Grid */}
      {age > 0 && (
        <div style={{ background: "#f0ede8", borderRadius: "10px", padding: "14px 14px 12px", marginBottom: "16px" }}>
          <WeeksGrid totalWeeks={Math.min(totalWeeks, 4160)} livedWeeks={livedWeeks} />
        </div>
      )}

      {/* Count */}
      <div style={{ borderLeft: "2px solid #2c2c2c", paddingLeft: "14px", marginBottom: "16px" }}>
        <div style={{ color: "#1c1c1c", fontSize: "15px", fontFamily: "'Cormorant Garamond', serif", fontWeight: "600", lineHeight: "1.4" }}>
          {touchpointLabel}
        </div>
      </div>

      {/* Inputs + Button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          {/* Age — always shown */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <label style={{ color: "rgba(28,28,28,0.35)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "600" }}>Age</label>
            <input type="number" value={person.age}
              onChange={e => onUpdate({ ...person, age: e.target.value === "" ? "" : Math.max(0, Math.min(100, Number(e.target.value))) })}
              placeholder="—"
              style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", color: "#1c1c1c", padding: "5px 10px", width: "64px", fontSize: "13px", outline: "none" }} />
          </div>

          {/* Visits — hidden for young children, shown for everyone else */}
          {!isYoungChild && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <label style={{ color: "rgba(28,28,28,0.35)", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: "600" }}>
                {isAdultChild ? "visits" : person.visitLabel} / yr
              </label>
              <input type="number" value={person.visitsPerYear}
                onChange={e => onUpdate({ ...person, visitsPerYear: e.target.value === "" ? "" : Math.max(0, Math.min(365, Number(e.target.value))) })}
                placeholder="—"
                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", color: "#1c1c1c", padding: "5px 10px", width: "64px", fontSize: "13px", outline: "none" }} />
            </div>
          )}
        </div>

        <button onClick={() => { window.open(`https://wa.me/?text=${encodeURIComponent(waMessage)}`, "_blank"); setMessageSent(true); }}
          style={{
            display: "flex", alignItems: "center", gap: "7px",
            background: messageSent ? "rgba(28,28,28,0.05)" : "#1c1c1c",
            color: messageSent ? "rgba(28,28,28,0.4)" : "#f5f2ed",
            border: "none", borderRadius: "100px", padding: "8px 16px",
            fontSize: "12px", fontWeight: "600", cursor: messageSent ? "default" : "pointer",
            letterSpacing: "0.04em", transition: "all 0.25s ease", whiteSpace: "nowrap",
          }}>
          {messageSent ? "Sent ✓" : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Tell {displayName} you love them
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function PeopleGrid() {
  const [people, setPeople] = useState(DEFAULT_PEOPLE);
  const [revealed, setRevealed] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("👤");

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  const updatePerson = (i, u) => setPeople(p => p.map((x, idx) => idx === i ? u : x));
  const removePerson = (i) => setPeople(p => p.filter((_, idx) => idx !== i));
  const addPerson = () => {
    if (!newName.trim()) return;
    setPeople(p => [...p, { id: `custom-${Date.now()}`, label: "Person", emoji: newEmoji, name: newName, age: "", visitsPerYear: "", visitLabel: "visits", isChild: false }]);
    setNewName(""); setNewEmoji("👤"); setAdding(false);
  };

  const totalMoments = people.reduce((acc, p) => {
    const age = Number(p.age) || 0;
    const visitsPerYear = Number(p.visitsPerYear) || 0;
    const weeksLeft = Math.max(0, Math.round((LIFE_EXPECTANCY - age) * WEEKS_PER_YEAR));
    if (p.isChild && age > 0 && age < 18) return acc + Math.round(Math.max(0, 18 - age) * WEEKS_PER_YEAR);
    return acc + Math.round((weeksLeft / WEEKS_PER_YEAR) * visitsPerYear);
  }, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f2ed", color: "#1c1c1c", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{
        maxWidth: "580px", margin: "0 auto", padding: "52px 20px 80px",
        opacity: revealed ? 1 : 0, transform: revealed ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ fontSize: "10px", letterSpacing: "0.26em", color: "rgba(28,28,28,0.4)", textTransform: "uppercase", marginBottom: "18px", fontWeight: "600" }}>The people grid</div>
          <h1 style={{ fontSize: "clamp(28px, 6.5vw, 46px)", fontFamily: "'Cormorant Garamond', serif", fontWeight: "600", lineHeight: "1.15", margin: "0 0 24px", color: "#1c1c1c" }}>
            How much time do you have left with the people who matter most to you?
          </h1>
          <div style={{ width: "32px", height: "1.5px", background: "#1c1c1c", marginBottom: "24px", opacity: 0.2 }} />
          <div style={{ color: "rgba(28,28,28,0.55)", fontSize: "15px", lineHeight: "1.85" }}>
            <p style={{ margin: "0 0 16px" }}>Nobody decides to take the people they love for granted. It just happens... the calls got shorter. The visits got rarer. We told ourselves there'd be more time... and suddenly, there wasn't.</p>
            <p style={{ margin: "0 0 16px" }}>We assume time is something we still have plenty of. And in that assumption, we drift away. Not because we don't care. But because we never stopped to look at the actual number.</p>
            <p style={{ margin: "0 0 24px" }}>The real count of times you'll sit across from them, hear them laugh, be in the same room. This grid will put things into perspective.</p>
            <div style={{ background: "#faf8f5", borderRadius: "12px", padding: "20px 22px", border: "1px solid rgba(28,28,28,0.07)" }}>
              <div style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(28,28,28,0.35)", fontWeight: "600", marginBottom: "14px" }}>How to use it</div>
              {["Enter the name and age of someone you love", "Set how often you see them in a year", "Read the number. Let it sit.", "Hit the WhatsApp button. Tell them."].map((step, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: i < 3 ? "10px" : 0 }}>
                  <span style={{ minWidth: "20px", height: "20px", borderRadius: "50%", background: "#1c1c1c", color: "#f5f2ed", fontSize: "10px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "1px", flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: "14px", color: "rgba(28,28,28,0.65)", lineHeight: "1.6" }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        {people.map((person, i) => (
          <PersonCard key={person.id} person={person} index={i} onUpdate={(u) => updatePerson(i, u)} onRemove={() => removePerson(i)} />
        ))}

        {/* Add person */}
        {adding ? (
          <div style={{ background: "#faf8f5", border: "1px solid rgba(28,28,28,0.12)", borderRadius: "16px", padding: "20px", marginBottom: "12px" }}>
            <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
              <input value={newEmoji} onChange={e => setNewEmoji(e.target.value)}
                style={{ width: "48px", background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", color: "#1c1c1c", padding: "8px", fontSize: "18px", textAlign: "center", outline: "none" }} />
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Their name..."
                style={{ flex: 1, background: "#fff", border: "1px solid rgba(0,0,0,0.1)", borderRadius: "8px", color: "#1c1c1c", padding: "8px 12px", fontSize: "14px", outline: "none" }} />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={addPerson} style={{ background: "#1c1c1c", border: "none", borderRadius: "8px", color: "#f5f2ed", padding: "9px 22px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Add</button>
              <button onClick={() => setAdding(false)} style={{ background: "rgba(0,0,0,0.05)", border: "none", borderRadius: "8px", color: "rgba(0,0,0,0.4)", padding: "9px 22px", fontSize: "13px", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAdding(true)} style={{ width: "100%", background: "transparent", border: "1.5px dashed rgba(28,28,28,0.15)", borderRadius: "16px", color: "rgba(28,28,28,0.35)", padding: "14px", fontSize: "13px", cursor: "pointer", marginBottom: "12px", letterSpacing: "0.04em" }}>
            + add someone
          </button>
        )}

        {/* Total */}
        <div style={{ background: "#1c1c1c", borderRadius: "16px", padding: "32px 24px", margin: "8px 0 12px", textAlign: "center" }}>
          <div style={{ color: "rgba(245,242,237,0.35)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px", fontWeight: "600" }}>Total moments left across everyone</div>
          <div style={{ fontSize: "clamp(52px, 13vw, 76px)", fontFamily: "'Cormorant Garamond', serif", fontWeight: "700", color: "#f5f2ed", lineHeight: 1, marginBottom: "8px" }}>
            {totalMoments.toLocaleString()}
          </div>
          <div style={{ color: "rgba(245,242,237,0.28)", fontSize: "12px", letterSpacing: "0.05em" }}>combined visits, days & moments</div>
        </div>

        <div style={{ height: "12px" }} />
        <ShareBar />

        {/* Footer */}
        <div style={{ background: "#faf8f5", borderRadius: "20px", padding: "40px 28px", border: "1px solid rgba(28,28,28,0.07)", textAlign: "center", marginTop: "12px" }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 5vw, 28px)", fontWeight: "600", color: "#1c1c1c", lineHeight: "1.35", margin: "0 0 14px" }}>Don't let it just be a number.</p>
          <p style={{ color: "rgba(28,28,28,0.45)", fontSize: "14px", lineHeight: "1.8", margin: "0 0 10px", maxWidth: "360px", marginLeft: "auto", marginRight: "auto" }}>The people you just counted are waiting for a message that never comes.</p>
          <p style={{ color: "rgba(28,28,28,0.32)", fontSize: "14px", lineHeight: "1.7", margin: 0, maxWidth: "340px", marginLeft: "auto", marginRight: "auto", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
            Go back up. Hit the button. Right now, while it still feels like something.
          </p>
          <div style={{ width: "32px", height: "1px", background: "rgba(28,28,28,0.15)", margin: "28px auto 20px" }} />
          <a href="https://www.instagram.com/rohaanzuberi" target="_blank" rel="noreferrer"
            style={{ color: "rgba(28,28,28,0.28)", fontSize: "11px", letterSpacing: "0.1em", textDecoration: "none", borderBottom: "1px solid rgba(28,28,28,0.12)", paddingBottom: "2px" }}>
            a free tool, made with love — by rohaan zuberi
          </a>
        </div>
      </div>
    </div>
  );
}
