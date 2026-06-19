import { useState, useRef, useEffect, useCallback } from "react";
import { useScrollWordReveal } from "../../app/hooks/useScrollWordReveal";
import svgPaths from "./svg-3adkfsqeqb";
import socialSvgPaths from "../svg-ejvbwqgg01";
import imgContactPage from "../../assets/afae93e180d21f30c2ae138886efb63bc064a5e6.webp";
import imgCard from "../../assets/3c69fed734b46e09bcbca5fd64d204e588c1d31e.webp";
import imgFrame2106258506 from "../../assets/75226685f4f76f704b886f96c7d3f66fad2ea681.webp";
import imgComponent20 from "../../assets/ef5789f32fa9b15364e39033c5d7cb0a9747ec22.webp";
import imgVector51 from "../../assets/dfe77762c7f21e4ac4da56b57873c0aeb4b24ca3.webp";
import imgTexture from "../../assets/texture.webp";
import imgDrawerTexture from "../../assets/adbe511abb684cf81f1cb3187f8b71a3a00b3c31.webp";
import imgDrawerTexture2 from "../../assets/f0cedf09760f97dc4e595fe82650e46b83a6e013.jpg";
import { useNavigate, useLocation } from "react-router-dom";

/* ─── DESIGN TOKENS ────────────────────────────────────────────────────────── */
const COLOR = {
  label: "#90341c",
  labelStar: "#8e3118",
  border: "#DE8269",
  dropdownText: "#ad523c",
  dropdownBorder: "#AD523C",
  fieldBg: "transparent",
  errorRed: "#c0392b",
  focusBorder: "#8e3219",
};

/* ─── DROPDOWN OPTIONS ─────────────────────────────────────────────────────── */
const PROJECT_TYPES = [
  "New Build & Interiors",
  "Renovation & Interiors",
  "Furnishings/Interior Styling Only",
];

const BUDGET_OPTIONS = [
  "$50,000–$150,000",
  "$150,000–$300,000",
  "$500,000–$1,000,000",
  "$1,000,000+",
];

/* ─── WEB3FORMS CONFIG ─────────────────────────────────────────────────────── */
// TODO: Replace the empty string below with your Web3Forms Access Key when ready.
// Get yours free at https://web3forms.com — no backend required.
const WEB3FORMS_ACCESS_KEY = "082ba6bc-aaa0-484b-a76a-2f2d1645bbf3";

/* ─── TOAST NOTIFICATION ───────────────────────────────────────────────────── */
// Self-contained toast that inherits the project's exact design language.
// Colors, fonts, and radii are sourced from the existing COLOR tokens above.
type ToastType = "success" | "error";
interface ToastState { visible: boolean; type: ToastType; message: string; }

function Toast({ toast, onDismiss }: { toast: ToastState; onDismiss: () => void }) {
  useEffect(() => {
    if (!toast.visible) return;
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [toast.visible, onDismiss]);

  if (!toast.visible) return null;

  const isSuccess = toast.type === "success";
  const bg       = isSuccess ? "#dacdac" : "#f5ede8";
  const border   = isSuccess ? "#82853D" : "#c0392b";
  const textMain = isSuccess ? "#5c5d36"  : "#c0392b";
  const icon     = isSuccess
    ? ( // checkmark circle
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="10" cy="10" r="9" stroke={textMain} strokeWidth="1"/>
          <path d="M6 10.5l2.8 2.8 5.2-5.6" stroke={textMain} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    : ( // x circle
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <circle cx="10" cy="10" r="9" stroke={textMain} strokeWidth="1"/>
          <path d="M7 7l6 6M13 7l-6 6" stroke={textMain} strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      );

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        background: bg,
        border: `0.5px solid ${border}`,
        borderRadius: 10,
        padding: "16px 20px",
        maxWidth: 360,
        boxShadow: "0 8px 32px rgba(142,50,25,0.15), 0 2px 8px rgba(142,50,25,0.08)",
        animation: "toast-in 0.28s cubic-bezier(0.34,1.56,0.64,1) both",
      }}
    >
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
      <div style={{ flexShrink: 0, marginTop: 1 }}>{icon}</div>
      <p style={{
        fontFamily: "'Hanken Grotesk', sans-serif",
        fontSize: 14,
        color: textMain,
        lineHeight: 1.5,
        letterSpacing: "-0.1px",
        flex: 1,
        margin: 0,
      }}>
        {toast.message}
      </p>
      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        style={{
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          color: textMain,
          opacity: 0.6,
          flexShrink: 0,
          marginTop: 1,
          lineHeight: 1,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

/* ─── CUSTOM DROPDOWN ──────────────────────────────────────────────────────── */
function CustomDropdown({ label, required, options, value, onChange, error, lineWidth }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const lw = lineWidth || 284;
  const lwStyle = `min(${lw}px, 100%)`;

  return (
    <div
      ref={ref}
      className="content-stretch flex flex-col items-start relative shrink-0"
      style={{ width: lwStyle, gap: 8 }}
    >
      <p
        className="font-['Hanken_Grotesk',sans-serif] not-italic tracking-[0.2px]"
        style={{ fontSize: 0, lineHeight: 0, color: COLOR.label }}
      >
        <span style={{ fontSize: 16, lineHeight: "normal" }}>{label}</span>
        <span style={{ fontSize: 16, lineHeight: "normal" }}>{" "}</span>
        {required && <span style={{ fontSize: 16, lineHeight: "normal", color: COLOR.labelStar }}>*</span>}
      </p>

      <div style={{ width: "100%", position: "relative" }}>
        <div
          className="content-stretch flex items-center justify-between relative shrink-0 cursor-pointer select-none"
          style={{ width: "100%", paddingBottom: 10 }}
          onClick={() => setOpen((o) => !o)}
        >
          <p
            className="font-['Hanken_Grotesk',sans-serif] not-italic leading-normal tracking-[-0.1px] whitespace-nowrap"
            style={{
              fontSize: 18,
              color: value ? COLOR.focusBorder : COLOR.dropdownText,
              fontWeight: value ? 500 : 400,
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value || "Select an option"}
          </p>
          <div
            style={{
              width: 18,
              height: 10,
              flexShrink: 0,
              transition: "transform 0.2s ease",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <svg width="18.74" height="11.08" viewBox="0 0 18.7433 11.0819" fill="none">
              <path d={svgPaths.p21239780} stroke={COLOR.dropdownBorder} />
            </svg>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 0.5 }}>
          <svg width="100%" height="0.5" style={{ display: "block", overflow: "visible" }}>
            <line
              x1="0" y1="0.25" x2="100%" y2="0.25"
              stroke={error ? COLOR.errorRed : open ? COLOR.focusBorder : COLOR.dropdownBorder}
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {open && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              zIndex: 100,
              background: "#f5ede0",
              border: `1px solid ${COLOR.dropdownBorder}`,
              borderRadius: 4,
              minWidth: "100%",
              boxShadow: "0 8px 24px rgba(142,50,25,0.13)",
              overflow: "hidden",
            }}
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                style={{
                  padding: "12px 16px",
                  fontSize: 16,
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  color: value === opt ? "#8e3219" : COLOR.dropdownText,
                  background: value === opt ? "rgba(142,50,25,0.07)" : "transparent",
                  cursor: "pointer",
                  borderBottom: `0.5px solid rgba(173,82,60,0.18)`,
                  transition: "background 0.15s",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(142,50,25,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = value === opt ? "rgba(142,50,25,0.07)" : "transparent"; }}
              >
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>

      {error && (
        <p style={{ fontSize: 12, color: COLOR.errorRed, fontFamily: "'Hanken Grotesk', sans-serif", marginTop: 2 }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── TEXT INPUT FIELD ─────────────────────────────────────────────────────── */
function TextInput({ label, required, value, onChange, error, placeholder, fullWidth, width }) {
  const [focused, setFocused] = useState(false);
  const w = fullWidth ? "100%" : (width || 284);
  const wStyle = fullWidth ? "100%" : `min(${w}px, 100%)`;

  return (
    <div
      className="content-stretch flex flex-col items-start relative shrink-0"
      style={{ width: wStyle, gap: 8 }}
    >
      <p
        className="font-['Hanken_Grotesk',sans-serif] not-italic tracking-[0.2px]"
        style={{ fontSize: 0, lineHeight: 0, color: COLOR.label, width: "100%" }}
      >
        <span style={{ fontSize: 16, lineHeight: "normal" }}>{label}</span>
        {required && (
          <>
            <span style={{ fontSize: 16, lineHeight: "normal" }}>{" "}</span>
            <span style={{ fontSize: 16, lineHeight: "normal", color: COLOR.labelStar }}>*</span>
          </>
        )}
      </p>

      <div style={{ width: "100%", position: "relative" }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder || ""}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            borderBottom: "none",
            fontSize: 16,
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: "#8e3219",
            padding: "0 0 10px 0",
            caretColor: "#8e3219",
            boxSizing: "border-box",
          }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 0.5 }}>
          <svg width="100%" height="0.5" style={{ display: "block", overflow: "visible" }}>
            <line
              x1="0" y1="0.25" x2="100%" y2="0.25"
              stroke={error ? COLOR.errorRed : focused ? COLOR.focusBorder : COLOR.border}
              strokeWidth={focused ? "1" : "0.5"}
            />
          </svg>
        </div>
      </div>

      {error && (
        <p style={{ fontSize: 12, color: COLOR.errorRed, fontFamily: "'Hanken Grotesk', sans-serif", marginTop: 2 }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── TEXTAREA FIELD ───────────────────────────────────────────────────────── */
function TextAreaField({ label, required, value, onChange, error }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" style={{ gap: 8 }}>
      <p
        className="font-['Hanken_Grotesk',sans-serif] not-italic tracking-[0.2px]"
        style={{ fontSize: 16, lineHeight: "normal", color: COLOR.label, width: "100%" }}
      >
        {label}{" "}
        {required && <span style={{ color: COLOR.labelStar }}>*</span>}
      </p>

      <div style={{ width: "100%", position: "relative" }}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={1}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            fontSize: 16,
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: "#8e3219",
            padding: "0 0 10px 0",
            caretColor: "#8e3219",
            boxSizing: "border-box",
            lineHeight: 1.5,
          }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 0.5 }}>
          <svg width="100%" height="0.5" style={{ display: "block", overflow: "visible" }}>
            <line
              x1="0" y1="0.25" x2="100%" y2="0.25"
              stroke={error ? COLOR.errorRed : focused ? COLOR.focusBorder : COLOR.border}
              strokeWidth={focused ? "1" : "0.5"}
            />
          </svg>
        </div>
      </div>

      {error && (
        <p style={{ fontSize: 12, color: COLOR.errorRed, fontFamily: "'Hanken Grotesk', sans-serif", marginTop: 2 }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── DATE PICKER FIELD ────────────────────────────────────────────────────── */
function DateField({ value, onChange, error }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" style={{ gap: 8 }}>
      <p
        className="font-['Hanken_Grotesk',sans-serif] not-italic tracking-[0.2px] leading-normal"
        style={{ fontSize: 16, color: COLOR.label, width: "100%" }}
      >
        Desired Start Date
      </p>

      <div style={{ width: "100%", position: "relative" }}>
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          min={new Date().toISOString().split("T")[0]}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            fontSize: 16,
            fontFamily: "'Hanken Grotesk', sans-serif",
            color: value ? "#8e3219" : COLOR.label,
            padding: "0 0 10px 0",
            caretColor: "#8e3219",
            boxSizing: "border-box",
            colorScheme: "light",
            cursor: "pointer",
          }}
        />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 0.5 }}>
          <svg width="100%" height="0.5" style={{ display: "block", overflow: "visible" }}>
            <line
              x1="0" y1="0.25" x2="100%" y2="0.25"
              stroke={error ? COLOR.errorRed : focused ? COLOR.focusBorder : COLOR.border}
              strokeWidth={focused ? "1" : "0.5"}
            />
          </svg>
        </div>
      </div>

      {error && (
        <p style={{ fontSize: 12, color: COLOR.errorRed, fontFamily: "'Hanken Grotesk', sans-serif", marginTop: 2 }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── YES/NO FIELD ─────────────────────────────────────────────────────────── */
function YesNoField({ label, required, value, onChange, error }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const options = ["Yes", "No", "It was a while ago"];

  return (
    <div ref={ref} className="content-stretch flex flex-col items-start relative shrink-0 w-full" style={{ gap: 8 }}>
      <p
        className="font-['Hanken_Grotesk',sans-serif] not-italic tracking-[0.2px]"
        style={{ fontSize: 16, lineHeight: "normal", color: COLOR.label, width: "100%", whiteSpace: "pre-wrap" }}
      >
        {label}{"   "}
        {required && <span style={{ color: COLOR.labelStar }}>*</span>}
      </p>
      <div style={{ width: "100%", position: "relative" }}>
        <div
          className="content-stretch flex items-center justify-between relative shrink-0 cursor-pointer select-none"
          style={{ width: "100%", paddingBottom: 10 }}
          onClick={() => setOpen((o) => !o)}
        >
          <p className="font-['Hanken_Grotesk',sans-serif] not-italic leading-normal tracking-[-0.1px] whitespace-nowrap"
            style={{ fontSize: 18, color: value ? COLOR.focusBorder : COLOR.dropdownText, fontWeight: value ? 500 : 400, flex: 1 }}>
            {value || "Select an option"}
          </p>
          <div style={{ width: 18, height: 10, flexShrink: 0, transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
            <svg width="18.74" height="11.08" viewBox="0 0 18.7433 11.0819" fill="none">
              <path d={svgPaths.p21239780} stroke={COLOR.dropdownBorder} />
            </svg>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 0.5 }}>
          <svg width="100%" height="0.5" style={{ display: "block", overflow: "visible" }}>
            <line x1="0" y1="0.25" x2="100%" y2="0.25" stroke={error ? COLOR.errorRed : open ? COLOR.focusBorder : COLOR.dropdownBorder} strokeWidth="0.5" />
          </svg>
        </div>
        {open && (
          <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 100, background: "#f5ede0", border: `1px solid ${COLOR.dropdownBorder}`, borderRadius: 4, minWidth: "100%", boxShadow: "0 8px 24px rgba(142,50,25,0.13)", overflow: "hidden" }}>
            {options.map((opt) => (
              <div key={opt} onClick={() => { onChange(opt); setOpen(false); }}
                style={{ padding: "12px 16px", fontSize: 16, fontFamily: "'Hanken Grotesk', sans-serif", color: value === opt ? "#8e3219" : COLOR.dropdownText, background: value === opt ? "rgba(142,50,25,0.07)" : "transparent", cursor: "pointer", borderBottom: `0.5px solid rgba(173,82,60,0.18)`, transition: "background 0.15s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(142,50,25,0.1)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = value === opt ? "rgba(142,50,25,0.07)" : "transparent"; }}>
                {opt}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p style={{ fontSize: 12, color: COLOR.errorRed, fontFamily: "'Hanken Grotesk', sans-serif", marginTop: 2 }}>{error}</p>}
    </div>
  );
}

/* ─── VALIDATION ───────────────────────────────────────────────────────────── */
function validate(fields) {
  const errors = {};
  if (!fields.firstName.trim()) errors.firstName = "First name is required.";
  if (!fields.lastName.trim()) errors.lastName = "Last name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.address.trim()) errors.address = "Project address is required.";
  if (!fields.projectType) errors.projectType = "Please select a project type.";
  if (!fields.budget) errors.budget = "Please select a budget range.";
  if (!fields.projectDescription.trim()) errors.projectDescription = "Please describe your project.";
  return errors;
}

/* ─── FORM COMPONENT ───────────────────────────────────────────────────────── */
const EMPTY_FIELDS = { firstName: "", lastName: "", email: "", address: "", projectType: "", budget: "", startDate: "", projectDescription: "" };

function ContactForm() {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>({ visible: false, type: "success", message: "" });

  const set = (key: string) => (val: string) => setFields((f) => ({ ...f, [key]: val }));
  const dismissToast = useCallback(() => setToast((t) => ({ ...t, visible: false })), []);

  async function handleSubmit() {
    // Prevent double-submit while a request is in flight
    if (isLoading) return;

    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);

    try {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "New Project Inquiry",
        name: `${fields.firstName} ${fields.lastName}`,
        email: fields.email,
        "Project Address": fields.address,
        "Project Type": fields.projectType,
        "Budget Range": fields.budget,
        "Preferred Start Date": fields.startDate || "Not specified",
        "Project Description": fields.projectDescription,
      };

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        setFields(EMPTY_FIELDS);
        setErrors({});
        setToast({ visible: true, type: "success", message: "Message sent successfully. We'll get back to you soon." });
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch {
      setToast({ visible: true, type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toast toast={toast} onDismiss={dismissToast} />
      <div
        className="bg-[#dacdac] content-stretch flex flex-col items-center justify-center p-[28px] relative rounded-[12px] shrink-0 w-full max-w-[708px]"
        style={{ gap: 28 }}
        data-name="Card"
      >
        <div aria-hidden className="absolute border border-[#88331c] border-solid inset-[-1px] pointer-events-none rounded-[13px]" />

        {submitted ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, padding: "40px 20px", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-instrument-serif)", fontSize: 48, color: "#8e3219", lineHeight: 1 }}>Thank you!</p>
            <p style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 18, color: "#90341c", lineHeight: 1.5 }}>
              Your inquiry has been received.<br />We'll be in touch within 2–3 business days.
            </p>
            <button
              onClick={() => { setSubmitted(false); setErrors({}); }}
              style={{ marginTop: 8, background: "transparent", border: `0.5px solid #8e3219`, borderRadius: 4, padding: "10px 28px", fontFamily: "'Hanken Grotesk', sans-serif", fontSize: 16, color: "#8e3219", cursor: "pointer", letterSpacing: "-0.3px" }}
            >
              Submit another inquiry
            </button>
          </div>
        ) : (
          <>
            <div className="content-stretch flex flex-wrap gap-x-[52px] gap-y-[20px] items-start relative shrink-0 w-full">
              <TextInput label="First Name" required value={fields.firstName} onChange={set("firstName")} error={errors.firstName} width={284} />
              <TextInput label="Last Name" required value={fields.lastName} onChange={set("lastName")} error={errors.lastName} width={302} />
            </div>
            <TextInput label="Email" required value={fields.email} onChange={set("email")} error={errors.email} fullWidth />
            <TextInput label="Project Address" required value={fields.address} onChange={set("address")} error={errors.address} fullWidth />
            <div className="content-stretch flex flex-wrap gap-x-[52px] gap-y-[20px] items-start relative shrink-0 w-full">
              <CustomDropdown label="Type of project" required options={PROJECT_TYPES} value={fields.projectType} onChange={set("projectType")} error={errors.projectType} lineWidth={284} />
              <CustomDropdown label="Project Budget" required options={BUDGET_OPTIONS} value={fields.budget} onChange={set("budget")} error={errors.budget} lineWidth={302} />
            </div>
            <DateField value={fields.startDate} onChange={set("startDate")} error={errors.startDate} />
            <TextAreaField label="Tell us about your project" required value={fields.projectDescription} onChange={set("projectDescription")} error={errors.projectDescription} />

            {/* Submit button — visually identical; pointer-events and opacity signal loading state */}
            <div
              className="relative rounded-[4px] shrink-0 w-full mt-5"
              style={{ cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? 0.75 : 1, transition: "opacity 0.2s ease" }}
              onClick={handleSubmit}
              role="button"
              tabIndex={0}
              aria-disabled={isLoading}
              aria-label={isLoading ? "Sending inquiry…" : "Send Inquiry"}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleSubmit(); } }}
            >
              <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[4px]">
                <div className="absolute bg-[#8e3219] inset-0 rounded-[4px]" />
                <img loading="lazy" decoding="async" alt="" className="absolute max-w-none object-cover opacity-11 rounded-[4px] size-full" src={imgFrame2106258506} />
              </div>
              <div aria-hidden className="absolute border border-[#e4d6c3] border-solid inset-0 pointer-events-none rounded-[4px]" />
              <div className="flex flex-row items-center justify-center size-full">
                <div className="content-stretch flex items-center justify-center px-[28px] py-[14px] relative size-full">
                  {isLoading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {/* Minimal spinner that matches the button's existing text color */}
                      <svg
                        width="18" height="18" viewBox="0 0 18 18" fill="none"
                        style={{ animation: "spin 0.8s linear infinite", flexShrink: 0 }}
                        aria-hidden
                      >
                        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                        <circle cx="9" cy="9" r="7" stroke="#dacdac" strokeWidth="1.5" strokeOpacity="0.3"/>
                        <path d="M9 2a7 7 0 0 1 7 7" stroke="#dacdac" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                      <p className="font-['Inter:Medium',sans-serif] font-medium leading-normal not-italic relative shrink-0 text-[#dacdac] text-[18px] tracking-[-0.6px] whitespace-nowrap">
                        Sending…
                      </p>
                    </span>
                  ) : (
                    <p className="font-['Inter:Medium',sans-serif] font-medium leading-normal not-italic relative shrink-0 text-[#dacdac] text-[18px] tracking-[-0.6px] whitespace-nowrap">
                      Send Inquiry
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ─── UNCHANGED UPPER SECTION COMPONENTS ──────────────────────────────────── */

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
      <p className="[word-break:break-word] col-1 [font-family:var(--font-instrument-serif)] not-italic leading-[0.9] ml-0 mt-0 relative row-1 text-[#dacdac] whitespace-nowrap" style={{ fontSize: "clamp(72px, 9.44vw, 136px)" }}>
        Let's<br aria-hidden />build your<br aria-hidden />dream<br aria-hidden />home
      </p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[25px] items-center relative shrink-0 w-full">
      <div className="h-0 relative shrink-0 w-[193px]">
        <div className="absolute inset-[-0.6px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 193 0.6">
            <line stroke="var(--stroke-0, #D8CAAD)" strokeWidth="0.6" x2="193" y1="0.3" y2="0.3" />
          </svg>
        </div>
      </div>
      <p className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#fffcdf] text-[15px] tracking-[-0.48px] whitespace-pre-wrap" style={{ minWidth: 0 }}>{`R O O T E D  .  A U T H E N T I C  .  Y O U R S`}</p>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-auto">
      <p className="[word-break:break-word] font-['Hanken_Grotesk',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#dacdac] text-[18px] tracking-[0.2px] whitespace-nowrap">
        Studio Inside Eye<br aria-hidden />San Jose, California
      </p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col font-['Hanken_Grotesk',sans-serif] gap-[6px] items-start leading-[normal] not-italic relative shrink-0 text-[#dacdac] text-[18px] tracking-[0.2px] w-full">
      <p className="min-w-full relative shrink-0 w-[min-content]">Email</p>
      <p className="relative shrink-0 whitespace-nowrap">hello@studioinsideeye.com</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[153px]">
      <Frame29 />
    </div>
  );
}


function Frame28() {
  return (
  <div
  className="content-stretch flex items-center md:justify-between gap-2 relative shrink-0 flex-wrap"
  style={{ width: "min(473px, 100%)" }}
>
      <Frame26 />
      <div className="flex h-[59px] items-center justify-center relative shrink-0 w-0">
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[59px]">
            <div className="absolute inset-[-0.6px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 59 0.6">
                <line stroke="var(--stroke-0, #D8CAAD)" strokeWidth="0.6" x2="59" y1="0.3" y2="0.3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Frame27 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[65px] items-start relative shrink-0" style={{ width: "clamp(340px, 40vw, 576px)", minWidth: 0 }}>
      <Group />
      <Frame25 />
      <Frame28 />
    </div>
  );
}

function Card() {
  return (
    <div className="content-stretch flex flex-col h-auto items-center justify-start p-[28px] relative rounded-[12px] shrink-0" style={{ width: "clamp(300px, 52.1vw, 750px)", minWidth: 0 }} data-name="Card">
      <img decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgCard} style={{ height: "100%", objectFit: "cover" }} />
      <ContactForm />
    </div>
  );
}

function Frame32() {
  return (
    <div
      className="relative content-stretch flex items-start"
      style={{
        paddingTop: 168,
        paddingBottom: 80,
        paddingLeft: "clamp(20px, 2.36vw, 34px)",
        paddingRight: "clamp(20px, 2.36vw, 34px)",
        gap: "clamp(16px, 2vw, 34px)",
        justifyContent: "space-between",
      }}
    >
      <Frame31 />
      <Card />
    </div>
  );
}

// ─── Contact Page Mobile Drawer ───────────────────────────────────────────────
// Rendered at root (Frame38) level — no transformed/relative parent — so
// position:fixed works correctly across the full page height.
// Styled to match the shared Navbar.tsx / ProjectPage mobile drawer:
// 4-column scaleY reveal animation, staggered link fade-in, bottom logo.
const CONTACT_DRAWER_BG = "#8d2d1b";

function ContactMobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navLinks = [
    { label: "Home", to: "/home" },
    { label: "About", to: "/about" },
    { label: "Projects", to: "/projects/project-1" },
    { label: "Journal", to: "/journal" },
    { label: "Moodboard", to: "/" },
    { label: "Contact", to: "/contact" },
  ];

  function isNavActive(label: string): boolean {
    if (label === "Home") return pathname === "/home";
    if (label === "Projects") return pathname.startsWith("/projects");
    if (label === "About") return pathname === "/about";
    if (label === "Journal") return pathname.startsWith("/journal");
    if (label === "Moodboard") return pathname === "/";
    if (label === "Contact") return pathname === "/contact";
    return false;
  }

  const columns = [
    { delay: 0,    duration: 0.65 },
    { delay: 0.1,  duration: 0.65 },
    { delay: 0.2,  duration: 0.65 },
    { delay: 0.3,  duration: 0.65 },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: isOpen ? "all" : "none",
        overflow: "hidden",
        opacity: isOpen ? 1 : 0,
        transition: isOpen ? "opacity 0s 0s" : "opacity 0.35s ease 0s",
      }}
    >
      {/* 4-column scaleY reveal */}
      {columns.map((col, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${i * 25}%`,
            width: i < columns.length - 1 ? "calc(25% + 1px)" : "25%",
            background: CONTACT_DRAWER_BG,
            transform: isOpen ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "bottom",
            transition: isOpen
              ? `transform ${col.duration}s cubic-bezier(0.76, 0, 0.24, 1) ${col.delay}s`
              : "none",
            overflow: "hidden",
          }}
        />
      ))}

      {/* Texture overlay on drawer background */}
 {/* Texture layer 1 - multiply 0.6 */}
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgDrawerTexture2}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: isOpen ? 0.3 : 0,
    pointerEvents: "none",
    transition: isOpen ? "opacity 0.3s ease 0.65s" : "opacity 0.2s ease 0s",
    zIndex: 2,
  }}
/>
{/* Texture layer 2 - multiply 0.6 */}
<div
  aria-hidden
  style={{
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${imgDrawerTexture2}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    mixBlendMode: "multiply",
    opacity: isOpen ? 0.7 : 0,
    pointerEvents: "none",
    transition: isOpen ? "opacity 0.3s ease 0.65s" : "opacity 0.2s ease 0s",
    zIndex: 3,
  }}
/>

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        style={{
          position: "absolute",
          top: 24,
          left: 24,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 8,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: isOpen ? 1 : 0,
          transition: isOpen ? "opacity 0.3s ease 0.85s" : "none",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <line x1="3" y1="3" x2="17" y2="17" stroke="#DAD0AD" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="17" y1="3" x2="3" y2="17" stroke="#DAD0AD" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {/* Nav links */}
      <nav
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          padding: "84px 32px 0",
          gap: 0,
        }}
      >
        {navLinks.map((item, index) => (
          <a
            key={item.label}
            href={item.to}
            onClick={(e) => {
              e.preventDefault();
              onClose();
              navigate(item.to);
            }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 22,
              fontWeight: 400,
              lineHeight: 1.4,
              letterSpacing: "0",
              color: "#DAD0AD",
              textDecoration: isNavActive(item.label) ? "underline" : "none",
              textDecorationColor: "#DAD0AD",
              textUnderlineOffset: "4px",
              padding: "14px 0",
              borderBottom: index < navLinks.length - 1 ? "1px solid #DAD0AD" : "none",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(24px)",
              transition: isOpen
                ? `opacity 0.45s ease ${0.85 + index * 0.07}s, transform 0.45s ease ${0.85 + index * 0.07}s`
                : "none",
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Bottom logo */}
      <div
        style={{
          position: "absolute",
          bottom: 25,
          left: 0,
          right: 0,
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          padding: "0 32px",
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "scale(1)" : "scale(0.92)",
          transition: isOpen
            ? `opacity 1.4s ease ${0.85 + navLinks.length * 0.07}s`
            : "none",
        }}
      >
        <img
          src={imgComponent20}
          alt="Studio Inside Eye"
          style={{
            width: "auto",
            maxWidth: "300px",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}

function Frame() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const desktopNavItems = [
    { label: "MENU",      to: null },
    { label: "Home",      to: "/home" },
    { label: "Projects",  to: "/projects/project-1" },
    { label: "About",     to: "/about" },
    { label: "Journal",   to: "/journal" },
    { label: "Moodboard", to: "/" },
  ] as const;

  function isContactDesktopActive(label: string): boolean {
    if (label === "Home")      return pathname === "/home";
    if (label === "Projects")  return pathname.startsWith("/projects");
    if (label === "About")     return pathname === "/about";
    if (label === "Journal")   return pathname.startsWith("/journal");
    if (label === "Moodboard") return pathname === "/";
    return false;
  }

  return (
    <div className="absolute content-stretch flex gap-[16px] items-center left-[25px] top-[16px]">
      {desktopNavItems.map((item, index) => {
        const active = isContactDesktopActive(item.label);
        if (index === 0) {
          // MENU label — not a link
          return (
            <p
              key={item.label}
              className="[word-break:break-word] leading-[1.21] tracking-[0em] not-italic relative shrink-0 text-[#8e3219] text-[14px] whitespace-nowrap"
              style={{ fontWeight: 450, opacity: 0.75 }}
            >
              {item.label}
            </p>
          );
        }
        if (index === 1) {
          // Separator + first link
          return (
            <div key={item.label} className="flex items-center gap-[16px]">
              <div className="flex h-[32px] items-center justify-center relative shrink-0 w-0">
                <div className="flex-none rotate-90">
                  <div className="h-0 relative w-[32px]">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 1">
                        <line stroke="var(--stroke-0, #8E3219)" x2="32" y1="0.5" y2="0.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <a
                href={item.to ?? "#"}
                onClick={item.to ? (e) => { e.preventDefault(); navigate(item.to!); } : undefined}
                className="[word-break:break-word] leading-[1.21] tracking-[0em] not-italic relative shrink-0 text-[#8e3219] text-[14px] whitespace-nowrap hover:opacity-80 transition-opacity"
                style={{
                  fontWeight: 450,
                  textDecoration: active ? "underline" : "none",
                  textDecorationColor: "#8e3219",
                  textUnderlineOffset: "3px",
                }}
              >
                {item.label}
              </a>
            </div>
          );
        }
        return (
          <a
            key={item.label}
            href={item.to ?? "#"}
            onClick={item.to ? (e) => { e.preventDefault(); navigate(item.to!); } : undefined}
            className="[word-break:break-word] leading-[1.21] tracking-[0em] not-italic relative shrink-0 text-[#8e3219] text-[14px] whitespace-nowrap hover:opacity-80 transition-opacity"
            style={{
              fontWeight: 450,
              textDecoration: active ? "underline" : "none",
              textDecorationColor: "#8e3219",
              textUnderlineOffset: "3px",
            }}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}

function Frame1() {
  return (
    <div className="contact-nav-pill h-[63px] relative shrink-0 w-[420px]">
      <svg aria-hidden focusable="false" className="pointer-events-none absolute select-none left-0 top-0" width="420" height="63" viewBox="0 0 420 63" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="navClipContact">
            <path d="M 12,1 L 408,1 L 419,12 L 419,51 L 408,62 L 12,62 L 1,51 L 1,12 Z" />
          </clipPath>
        </defs>
        <path d="M 12,1 L 408,1 L 419,12 L 419,51 L 408,62 L 12,62 L 1,51 L 1,12 Z" fill="#DACDAC" stroke="#7B4A1E" strokeWidth="2" />
        <image href={imgTexture} x="0" y="0" width="420" height="63" clipPath="url(#navClipContact)" preserveAspectRatio="xMidYMid slice" style={{ mixBlendMode: "screen", opacity: 0.4 }} />
        <path d="M 12,1 L 408,1 L 419,12 L 419,51 L 408,62 L 12,62 L 1,51 L 1,12 Z" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
      </svg>
      <Frame />
    </div>
  );
}

// onOpenDrawer prop se state lift karke Frame38 mein le jaate hain
function Frame37({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  const navigate = useNavigate();

  return (
    <>
      {/* ── Desktop/tablet navbar: visible from 750px and above ─────────────── */}
      <div className="contact-navbar contact-navbar-full absolute content-stretch flex items-center justify-between left-0 right-0 top-[23px] px-[34px]" style={{ zIndex: 10 }}>
        <div
          data-name="Component 20"
          onClick={() => navigate("/")}
          style={{ flexShrink: 0, cursor: "pointer" }}
        >
          <img decoding="async"
            alt="Studio Inside Eye"
            src={imgComponent20}
            style={{ display: "block", width: 98, height: 49, objectFit: "contain", pointerEvents: "none" }}
          />
        </div>
        <Frame1 />
      </div>

      {/* ── Mobile: logo (top-left) + hamburger button (top-right) ─────────── */}
      <div className="contact-navbar-mobile" style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "none" }}>
        {/* Logo */}
        <div
          data-name="Component 20"
          onClick={() => navigate("/")}
          style={{ position: "absolute", top: 22, left: 12, flexShrink: 0, cursor: "pointer" }}
        >
          <img decoding="async"
            alt="Studio Inside Eye"
            src={imgComponent20}
            style={{ display: "block", width: 78, height: 39, objectFit: "contain", pointerEvents: "none" }}
          />
        </div>
        {/* Hamburger button — matches shared Navbar.tsx / ProjectPage mobile style */}
        <button
          onClick={onOpenDrawer}
          aria-label="Open menu"
          style={{
            position: "absolute",
            top: 20,
            right: 16,
            zIndex: 200,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(218,208,173,0.12)",
            border: "1.5px solid rgba(218,208,173,0.3)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="16" height="12" viewBox="0 0 18 14" fill="none">
            <line x1="0" y1="1" x2="18" y2="1" stroke="#DAD0AD" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="7" x2="18" y2="7" stroke="#DAD0AD" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="13" x2="18" y2="13" stroke="#DAD0AD" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {/* NOTE: ContactMobileDrawer is NOT here — it lives in Frame38 at root level */}
    </>
  );
}

function ContactPage({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  return (
    <div className="relative shrink-0 w-full" data-name="Contact Page">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#8d2d1b] inset-0" />
        <img decoding="async" alt="" className="absolute max-w-none object-cover opacity-8 size-full" src={imgContactPage} />
      </div>
      <Frame37 onOpenDrawer={onOpenDrawer} />
      <Frame32 />
    </div>
  );
}

/* ─── MOBILE FOOTER COMPONENTS ──────────────────────────────────────────────── */

// "in" glyph (LinkedIn) — drawn without its own background, since the
// surrounding tile already supplies the beige square.
const LINKEDIN_PATH =
  "M5.46 7.43h-.02c-1.22 0-2-.83-2-1.87 0-1.06.81-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM7.27 20.1H3.65V9h3.62v11.1zM20.34 20.1h-3.62v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.86 1.33-.1.23-.12.55-.12.88v6.04h-3.62s.05-9.79 0-10.8h3.62v1.53a3.6 3.6 0 0 1 3.26-1.79c2.39 0 4.18 1.56 4.18 4.89v6.17z";

function MobileFooterSocialIcon({ path, href }: { path: string; href?: string }) {
  const tile = (
    <div
      className="flex items-center justify-center rounded-[8px] flex-shrink-0"
      style={{ backgroundColor: "#dad0ad", width: 48, height: 48 }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d={path} fill="#5C593E" />
      </svg>
    </div>
  );
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex" }}>
        {tile}
      </a>
    );
  }
  return tile;
}

/* ─── FOOTER COLUMN COMPONENTS (unchanged) ─────────────────────────────────── */

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-[231px]">
      <p className="leading-none relative shrink-0 text-[36px] w-full">Contact</p>
      <p className="leading-[1.4] relative shrink-0 text-[19px] w-full">
        hello@studioinsideeye.com<br aria-hidden />San Jose, California
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 text-[19px] w-full">
      <p className="relative shrink-0 w-full">Home</p>
      <p className="relative shrink-0 w-full">Moodboard</p>
      <p className="relative shrink-0 w-full">Philosophy</p>
      <p className="relative shrink-0 w-full">Services</p>
      <p className="relative shrink-0 w-full">Projects</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center leading-none relative shrink-0 w-[181px]">
      <p className="relative shrink-0 text-[32px] w-full">Menu</p>
      <Frame3 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-center justify-center relative shrink-0 text-[19px] w-full">
      <p className="relative shrink-0 w-full">Echo</p>
      <p className="relative shrink-0 w-full">Villa</p>
      <p className="relative shrink-0 w-full">Luxhill</p>
      <p className="relative shrink-0 w-full">Remeos</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center leading-none relative shrink-0 w-[181px]">
      <p className="relative shrink-0 text-[32px] w-full">Projects</p>
      <Frame6 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 text-[19px] w-full">
      <a href="https://www.linkedin.com/in/haritha-prasad-a5b526208?utm_source=share_via&utm_content=profile&utm_medium=member_ios" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
        <p className="relative shrink-0 w-full">Linkedin</p>
      </a>
      <a href="https://www.instagram.com/studioinsideeye?igsh=MWxvZ281YmhudTNv" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
        <p className="relative shrink-0 w-full">Instagram</p>
      </a>
      <p className="relative shrink-0 w-full">X</p>
      <a href="https://m.yelp.com/biz/the-inside-eye-design-studio-san-jose?dd_referrer=https%3A%2F%2Fwww.google.com%2F" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
        <p className="relative shrink-0 w-full">Yelp</p>
      </a>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center leading-none relative shrink-0 w-[181px]">
      <p className="relative shrink-0 text-[32px] w-full">Socials</p>
      <Frame10 />
    </div>
  );
}

/* ─── FOOTER (ContactPage1) ─────────────────────────────────────────────────── */
function ContactPage1() {
  const navigate = useNavigate();

  // Desktop accent paragraph — per-character scroll-colour fill
  // lightColor: muted dim tone barely visible on the dark #8d2d1b bg
  // darkColor:  full accent #d5c9a8 (the element's own colour)
  const accentRef = useScrollWordReveal<HTMLParagraphElement>({
    lightColor: "#7a5048",
    darkColor:  "#d5c9a8",
    band:   3,
    start:  0.92,
    end:    0.3,
    smooth: 0.07,
    forceMotion: true,
  });

  // Mobile tagline — same effect
  const mobileTaglineRef = useScrollWordReveal<HTMLParagraphElement>({
    lightColor: "#7a5048",
    darkColor:  "#decfae",
    band:   2,
    start:  0.9,
    end:    0.6,
    smooth: 0.07,
    forceMotion: true,
  });

  return (
    <div className="footer-section relative shrink-0 w-full" data-name="Contact Page">

      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#8d2d1b] inset-0" />
        <img decoding="async" alt="" className="absolute max-w-none object-cover opacity-8 size-full" src={imgContactPage} />
      </div>

      <div className="absolute h-0 left-0 top-px w-full" style={{ zIndex: 1 }}>
        <div className="absolute inset-[-0.8px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1440 0.8">
            <line stroke="var(--stroke-0, #DACDAC)" strokeWidth="0.8" x2="1440" y1="0.4" y2="0.4" />
          </svg>
        </div>
      </div>

      <div className="absolute left-[calc(50%-11.5px)] size-[23px] top-[-11px]" style={{ zIndex: 2 }}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 23">
          <path d={svgPaths.p25b23d00} fill="var(--fill-0, #DAD0AD)" />
        </svg>
      </div>

      <div className="footer-desktop-layout" style={{ height: 774 }}>
        <p ref={accentRef} className="[word-break:break-word] absolute font-['P22GrosvenorW00-Regular',sans-serif] leading-[1.1] left-[40px] not-italic text-[#d5c9a8] text-[40px] top-[53px] tracking-[1.2px] w-[561px]">
          Designing thoughtful residential interiors across San Jose and the Bay Area, California.
        </p>
        <div className="absolute h-[138px] left-[calc(50%-138px)] top-[248px] w-[276px]" data-name="Component 20">
          <img decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgComponent20} />
        </div>
        <div className="[word-break:break-word] absolute content-stretch flex font-['Hanken_Grotesk',sans-serif] gap-[82px] items-start left-[calc(8.33%+102px)] not-italic text-[#d5c9a8] top-[472px]">
          <Frame4 /><Frame7 /><Frame5 /><Frame9 />
        </div>
      </div>

      <div className="footer-mobile-layout font-['Hanken_Grotesk',sans-serif] text-[#d5c9a8] not-italic [word-break:break-word]">
        <div className="footer-logo-wrap" data-name="Component 20">
          <img decoding="async" alt="Studio Inside Eye" className="size-full object-contain pointer-events-none" src={imgComponent20} />
        </div>

        {/* Small star */}
        <svg width="15" height="15" viewBox="0 0 23 23" fill="none">
          <path d={svgPaths.p25b23d00} fill="#DAD0AD" />
        </svg>

        {/* Tagline */}
        <p
          ref={mobileTaglineRef}
          className="footer-tagline text-center"
          style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 400, color: "#decfae", letterSpacing: "0.12em" }}
        >
          R O O T E D . A U T H E N T I C . Y O U R S
        </p>

        {/* Vertical divider */}
        <div className="w-px" style={{ height: 56, background: "rgba(218,205,172,0.4)" }} />

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 w-full">
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 400, color: "#dacdac", letterSpacing: "-0.3px", textAlign: "center" }}>
            Lets shape your space.
          </p>
          <button
            className="flex items-center justify-center rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity w-full"
            style={{ backgroundColor: "#dad0ad", padding: "15px 24px", fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 500, color: "#504d39", letterSpacing: "-0.4px", border: "none" }}
            onClick={() => navigate('/contact')}
          >
            Start your project
          </button>
        </div>

        {/* Horizontal divider with star, centered */}
        <div className="relative flex justify-center w-full">
          <div className="w-full h-px" style={{ background: "rgba(218,205,172,0.4)" }} />
          <div className="absolute" style={{ top: "50%", transform: "translateY(-50%)" }}>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
              <path d={svgPaths.p25b23d00} fill="#DAD0AD" />
            </svg>
          </div>
        </div>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-4 w-full">
          <MobileFooterSocialIcon path={socialSvgPaths.p2ea55bf0} href="https://www.instagram.com/studioinsideeye?igsh=MWxvZ281YmhudTNv" />
          <MobileFooterSocialIcon path={LINKEDIN_PATH} href="https://www.linkedin.com/in/haritha-prasad-a5b526208?utm_source=share_via&utm_content=profile&utm_medium=member_ios" />
          <MobileFooterSocialIcon path={socialSvgPaths.p1dbc3000} />
        </div>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: "rgba(218,205,172,0.5)" }} />

        {/* Copyright */}
        <p
          className="text-center w-full"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontSize: "12px", fontWeight: 300, color: "#fef4db", letterSpacing: "-0.1px" }}
        >
          ©️2025 Studio Inside Eye. All rights reserved
        </p>
      </div>

    </div>
  );
}

/* ─── RESPONSIVE STYLES ─────────────────────────────────────────────────────── */
const responsiveStyles = `
  input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0.5;
    filter: invert(25%) sepia(60%) saturate(600%) hue-rotate(340deg);
    cursor: pointer;
  }
  input[type="date"]::-webkit-datetime-edit-fields-wrapper { color: #8e3219; }
  input[type="date"]::-webkit-datetime-edit-text { color: #ad523c; padding: 0 2px; }
  input[type="date"]::-webkit-datetime-edit-month-field,
  input[type="date"]::-webkit-datetime-edit-day-field,
  input[type="date"]::-webkit-datetime-edit-year-field { color: #8e3219; }
  input[type="date"]:focus::-webkit-datetime-edit { color: #8e3219; }
  input::placeholder { color: rgba(173,82,60,0.4); font-family: 'Hanken Grotesk', sans-serif; }

  /* ── Footer: desktop shows absolute layout, hides mobile layout ── */
  .footer-desktop-layout { display: block; position: relative; }
  .footer-mobile-layout  { display: none; }

  /* ── Contact hero: ensure no overflow at any width ── */
  [data-name="Contact Page"]:first-of-type {
    overflow: hidden;
    width: 100%;
  }

  /* ── MacBook zoom fix: 1101px–1280px ── */
  /* ── Responsive fixes: 1101px–1290px (laptop / MacBook-zoom band) ── */
  @media (max-width: 1290px) and (min-width: 1101px) {
    /* Issue 4 — Email block overlap in Frame28 */
    [class*="gap-\\[65px\\]"] [class*="w-\\[153px\\]"] {
      width: auto !important;
      min-width: 0 !important;
      flex-shrink: 1 !important;
    }
    [class*="gap-\\[65px\\]"] [class*="w-\\[473px\\]"],
    [class*="gap-\\[65px\\]"] > div:last-child {
      flex-wrap: wrap !important;
      row-gap: 8px !important;
    }
    /* Issue 1 — Navbar pill.
       The old rule shrank the pill's SVG (width:100% on a clamped container)
       while the absolutely-positioned links kept their fixed size, so the
       links overflowed the pill. The links fit fine inside the natural 420px
       pill, so we stop shrinking it and instead ease the logo + outer padding
       down fluidly (both land on their natural values at 1290 → no jump). */
    .contact-navbar-full {
      padding-left: clamp(24px, 2.64vw, 34px) !important;
      padding-right: clamp(24px, 2.64vw, 34px) !important;
    }
    .contact-navbar-full [data-name="Component 20"] img {
      width: clamp(84px, 7.6vw, 98px) !important;
      height: auto !important;
    }

    /* Issue 3 — Hero left column (Frame31).
       Floor the column width at 466px so the studio-info row (Frame28) and the
       email stop clipping, then trim Frame32's gap + side padding so the wider
       column still fits beside the card. All three ease to their natural
       values at 1290. */
    [class*="gap-\\[65px\\]"] {
      width: max(40vw, 466px) !important;
    }
    [data-name="Contact Page"]:first-of-type
      > div:not([aria-hidden]):not(.contact-navbar-full):not(.contact-navbar-mobile) {
      gap: clamp(16px, calc(5.18vw - 41px), 34px) !important;
      padding-left: clamp(20px, calc(5.5vw - 40px), 34px) !important;
      padding-right: clamp(20px, calc(5.5vw - 40px), 34px) !important;
    }

    /* Issue 2 — Footer columns.
       Contact / Menu / Projects / Socials are absolutely positioned with an
       82px gap + left offset (~1020px total), which runs past the viewport
       below ~1224px. Shrink only the inter-column gap (back to 82px at 1290)
       so they fit with no other repositioning. */
    .footer-desktop-layout [class*="gap-\\[82px\\]"] {
      gap: clamp(24px, calc(25.4vw - 246px), 82px) !important;
    }
  }
  /* ── Autofill background fix — browser apna white box inject karta hai,
  ise transparent-looking inset box-shadow se override karo ── */
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
 -webkit-box-shadow: 0 0 0 1000px #dacdac inset !important;
 box-shadow: 0 0 0 1000px #dacdac inset !important;
 -webkit-text-fill-color: #8e3219 !important;
 caret-color: #8e3219 !important;
 transition: background-color 5000s ease-in-out 0s !important;
}
  /* ── Navbar: 1100px–751px — full pill visible, gap narrows responsively ── */
  @media (max-width: 1100px) and (min-width: 751px) {
    .contact-navbar-full {
      padding-left: 20px !important;
      padding-right: 20px !important;
    }
    .contact-navbar-full [data-name="Component 20"] img {
      width: 82px !important;
      height: 41px !important;
    }
  }

  @media (max-width: 900px) and (min-width: 751px) {
    .contact-navbar-full {
      padding-left: 14px !important;
      padding-right: 14px !important;
    }
  }

  /* ── Navbar: ≤750px — hide full navbar, show mobile logo + hamburger ── */
  @media (max-width: 750px) {
    .contact-navbar-full { display: none !important; }
    .contact-navbar-mobile { display: block !important; }
  }

  @media (max-width: 1100px) {
    /* Tab view — Start your project button cap */
.footer-mobile-layout button {
  width: auto !important;
  min-width: 200px !important;
  max-width: 320px !important;
  align-self: center !important;
}
    /* ── Upper hero section ── */
    [data-name="Contact Page"]:first-of-type { height: auto !important; min-height: 100dvh; }
    [data-name="Contact Page"]:first-of-type > div:not([aria-hidden]):not(.contact-navbar-full):not(.contact-navbar-mobile) {
      position: relative !important; left: auto !important; right: auto !important; top: auto !important;
      display: flex !important; flex-direction: column !important; align-items: flex-start !important;
      gap: 40px !important; padding: 80px 20px 48px !important; width: 100% !important;
    }
    [data-name="Contact Page"]:first-of-type > div:not([aria-hidden]):not(.contact-navbar-full):not(.contact-navbar-mobile) > div:first-child { width: 100% !important; }
    [data-name="Contact Page"]:first-of-type [class*="w-\\[193px\\]"] { width: 80px !important; min-width: 0 !important; }
    [data-name="Card"]:last-of-type { width: min(600px, 100%) !important; height: auto !important; align-self: center !important; }
    [data-name="Card"]:last-of-type [data-name="Card"] { width: 100% !important; }
    [data-name="Card"] [class*="gap-\\[52px\\]"] { flex-wrap: wrap !important; gap: 28px !important; }

    /* ── Footer: swap to mobile layout ── */
    .footer-section { height: auto !important; }
    .footer-desktop-layout { display: none !important; }
    .footer-mobile-layout {
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      gap: 24px !important;
      padding: 48px 24px 56px !important;
      position: relative !important;
      z-index: 1 !important;
    }
    .footer-logo-wrap {
      width: clamp(110px, 18vw, 220px) !important;
      aspect-ratio: 2 / 1 !important;
      align-self: center !important;
    }

    body, html { overflow-x: hidden !important; max-width: 100% !important; }
  }


  @media (max-width: 600px) {
    [data-name="Contact Page"]:first-of-type [class*="w-\\[193px\\]"] { display: none !important; }

    .footer-mobile-layout button {
      width: 100% !important;
      max-width: none !important;
    }
  
    [data-name="Card"]:last-of-type {
      padding: 14px !important;
      width: 100% !important;
      min-width: 0 !important;
    }
  
    [data-name="Card"] [data-name="Card"] {
      padding: 16px !important;
      width: 100% !important;
      max-width: 100% !important;
    }
  
    /* ✅ First Name / Last Name aur Type of Project / Budget — full width stack */
    [data-name="Card"] [data-name="Card"] .flex.flex-wrap > div {
      width: 100% !important;
      min-width: 0 !important;
    }
  
    .footer-mobile-layout { padding: 36px 20px 48px !important; gap: 20px !important; }
    .footer-logo-wrap { width: 110px !important; }
  }
`;

// ─── ROOT EXPORT ──────────────────────────────────────────────────────────────
// drawerOpen state aur ContactMobileDrawer dono yahan hain — DOM ka topmost
// level, koi transformed/relative parent nahi — isliye position:fixed
// correctly puri page ki height cover karta hai.
export default function Frame38() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <style>{responsiveStyles}</style>
      {/* Drawer at root — outside any relative/transformed container */}
      <ContactMobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <div className="content-stretch flex flex-col items-start relative size-full" style={{ overflowX: "hidden" }}>
        <ContactPage onOpenDrawer={() => setDrawerOpen(true)} />
        <ContactPage1 />
      </div>
    </>
  );
}