import { useState, useRef, useEffect } from "react";
import svgPaths from "./svg-3adkfsqeqb";
import imgContactPage from "../../assets/afae93e180d21f30c2ae138886efb63bc064a5e6.png";
import imgCard from "../../assets/3c69fed734b46e09bcbca5fd64d204e588c1d31e.png";
import imgFrame2106258506 from "../../assets/75226685f4f76f704b886f96c7d3f66fad2ea681.png";
import imgComponent20 from "../../assets/ef5789f32fa9b15364e39033c5d7cb0a9747ec22.png";
import imgVector51 from "../../assets/dfe77762c7f21e4ac4da56b57873c0aeb4b24ca3.png";
import imgTexture from "../../assets/texture.png";
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
function ContactForm() {
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    projectType: "",
    budget: "",
    startDate: "",
    projectDescription: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (val) => setFields((f) => ({ ...f, [key]: val }));

  function handleSubmit() {
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    console.log("📋 Contact Form Submission:", fields);
    setSubmitted(true);
  }

  return (
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
            onClick={() => { setSubmitted(false); setFields({ firstName:"",lastName:"",email:"",address:"",projectType:"",budget:"",startDate:"",projectDescription:"" }); setErrors({}); }}
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

          <div className="relative rounded-[4px] shrink-0 w-full cursor-pointer mt-5" onClick={handleSubmit}>
            <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[4px]">
              <div className="absolute bg-[#8e3219] inset-0 rounded-[4px]" />
              <img alt="" className="absolute max-w-none object-cover opacity-11 rounded-[4px] size-full" src={imgFrame2106258506} />
            </div>
            <div aria-hidden className="absolute border border-[#e4d6c3] border-solid inset-0 pointer-events-none rounded-[4px]" />
            <div className="flex flex-row items-center justify-center size-full">
              <div className="content-stretch flex items-center justify-center px-[28px] py-[14px] relative size-full">
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-normal not-italic relative shrink-0 text-[#dacdac] text-[18px] tracking-[-0.6px] whitespace-nowrap">Send Inquiry</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
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
      <p className="relative shrink-0 whitespace-nowrap">contactsie@sie.com</p>
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
    <div className="content-stretch flex items-center justify-between relative shrink-0" style={{ width: "min(473px, 100%)" }}>
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
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgCard} style={{ height: "100%", objectFit: "cover" }} />
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

const contactNavItems = [
  { label: "MENU",      to: null },
  { label: "Home",      to: "/home" },
  { label: "Projects",  to: "/projects/project-1" },
  { label: "About",     to: "/about" },
  { label: "Journal",   to: "/journal" },
  { label: "Moodboard", to: "/" },
] as const;

// ─── Contact Page Mobile Drawer ───────────────────────────────────────────────
// Rendered at root (Frame38) level — no transformed/relative parent — so
// position:fixed works correctly across the full page height.
function ContactMobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(90, 20, 10, 0.35)",
          zIndex: 9998,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "opacity 0.3s ease",
          backdropFilter: "blur(2px)",
        }}
      />

      {/* Drawer panel — fixed, right-side, full height, partial width */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(280px, 80vw)",
          background: "#DACDAC",
          zIndex: 9999,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 40px rgba(90,20,10,0.22)",
          borderLeft: "1.5px solid #7B4A1E",
        }}
      >
        {/* Texture overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${imgTexture})`,
            backgroundSize: "cover",
            mixBlendMode: "screen",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close menu"
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="3" y1="3" x2="17" y2="17" stroke="#8e3219" strokeWidth="2" strokeLinecap="round" />
            <line x1="17" y1="3" x2="3" y2="17" stroke="#8e3219" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* Nav links */}
        <nav
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "72px 32px 32px",
            gap: 0,
          }}
        >
          {contactNavItems.map((item, index) => {
            const route = item.to;
            const isContactActive = item.label === "Contact";
            return (
            <a
              key={item.label}
              href={route ?? "#"}
              onClick={
                route
                  ? (e) => { e.preventDefault(); onClose(); navigate(route); }
                  : onClose
              }
              style={{
                fontSize: index === 0 ? 11 : 22,
                fontWeight: index === 0 ? 600 : 400,
                lineHeight: 1.2,
                letterSpacing: index === 0 ? "0.12em" : "-0.01em",
                color: "#8e3219",
                textDecoration: isContactActive ? "underline" : "none",
                textDecorationColor: "#8e3219",
                textUnderlineOffset: "3px",
                padding: "12px 0",
                borderBottom: index < contactNavItems.length - 1 ? "1px solid rgba(142,50,25,0.15)" : "none",
                opacity: index === 0 ? 0.6 : 1,
                transition: "opacity 0.18s",
              }}
            >
              {item.label}
            </a>
            );
          })}
        </nav>
      </div>
    </>
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
          <img
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
          <img
            alt="Studio Inside Eye"
            src={imgComponent20}
            style={{ display: "block", width: 78, height: 39, objectFit: "contain", pointerEvents: "none" }}
          />
        </div>
        {/* Hamburger button */}
        <button
          onClick={onOpenDrawer}
          aria-label="Open menu"
          style={{
            position: "absolute",
            top: 20,
            right: 16,
            zIndex: 200,
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#DACDAC",
            border: "1.5px solid #7B4A1E",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 12px rgba(90,20,10,0.18)",
          }}
        >
          <svg width="13" height="10" viewBox="0 0 18 14" fill="none">
            <line x1="0" y1="1" x2="18" y2="1" stroke="#8e3219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="7" x2="18" y2="7" stroke="#8e3219" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="0" y1="13" x2="18" y2="13" stroke="#8e3219" strokeWidth="1.8" strokeLinecap="round" />
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
        <div className="absolute bg-[#8a2a10] inset-0" />
        <img alt="" className="absolute max-w-none object-cover opacity-8 size-full" src={imgContactPage} />
      </div>
      <Frame37 onOpenDrawer={onOpenDrawer} />
      <Frame32 />
    </div>
  );
}

/* ─── FOOTER COLUMN COMPONENTS (unchanged) ─────────────────────────────────── */

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center justify-center relative shrink-0 w-[231px]">
      <p className="leading-none relative shrink-0 text-[36px] w-full">Contact</p>
      <p className="leading-[1.4] relative shrink-0 text-[20px] w-full">
        (831) 234-2532<br aria-hidden />3265 Whipple Rd<br aria-hidden />Union City, California(CA), 94587
      </p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 text-[20px] w-full">
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
    <div className="content-stretch flex flex-col gap-[11px] items-center justify-center relative shrink-0 text-[20px] w-full">
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
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 text-[20px] w-full">
      <p className="relative shrink-0 w-full">Linkedin</p>
      <p className="relative shrink-0 w-full">Instagram</p>
      <p className="relative shrink-0 w-full">X</p>
      <p className="relative shrink-0 w-full">Yelp</p>
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
  return (
    <div className="footer-section relative shrink-0 w-full" data-name="Contact Page">

      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#8a2a10] inset-0" />
        <img alt="" className="absolute max-w-none object-cover opacity-8 size-full" src={imgContactPage} />
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
        <p className="[word-break:break-word] absolute font-['P22GrosvenorW00-Regular',sans-serif] leading-[1.1] left-[40px] not-italic text-[#d5c9a8] text-[40px] top-[53px] tracking-[1.2px] w-[561px]">
          Designing thoughtful residential interiors across San Jose and the Bay Area, California.
        </p>
        <div className="absolute h-[138px] left-[calc(50%-138px)] top-[248px] w-[276px]" data-name="Component 20">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgComponent20} />
        </div>
        <div className="[word-break:break-word] absolute content-stretch flex font-['Hanken_Grotesk',sans-serif] gap-[82px] items-start left-[calc(8.33%+102px)] not-italic text-[#d5c9a8] top-[472px]">
          <Frame4 /><Frame7 /><Frame5 /><Frame9 />
        </div>
      </div>

      <div className="footer-mobile-layout font-['Hanken_Grotesk',sans-serif] text-[#d5c9a8] not-italic [word-break:break-word]">
        <p className="footer-tagline font-['P22GrosvenorW00-Regular',sans-serif] leading-[1.1] tracking-[1.2px]">
          Designing thoughtful residential interiors across San Jose and the Bay Area, California.
        </p>
        <div className="footer-logo-wrap" data-name="Component 20">
          <img alt="Studio Inside Eye" className="size-full object-contain pointer-events-none" src={imgComponent20} />
        </div>
        <div className="footer-columns">
          <Frame4 /><Frame7 /><Frame5 /><Frame9 />
        </div>
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
    /* ── Upper hero section ── */
    [data-name="Contact Page"]:first-of-type { height: auto !important; min-height: 100dvh; }
    [data-name="Contact Page"]:first-of-type > div:not([aria-hidden]):not(.contact-navbar-full):not(.contact-navbar-mobile) {
      position: relative !important; left: auto !important; right: auto !important; top: auto !important;
      display: flex !important; flex-direction: column !important; align-items: flex-start !important;
      gap: 40px !important; padding: 80px 20px 48px !important; width: 100% !important;
    }
    [data-name="Contact Page"]:first-of-type > div:not([aria-hidden]):not(.contact-navbar-full):not(.contact-navbar-mobile) > div:first-child { width: 100% !important; }
    [data-name="Contact Page"]:first-of-type [class*="w-\\[193px\\]"] { width: 80px !important; min-width: 0 !important; }
    [data-name="Card"]:last-of-type { width: 100% !important; height: auto !important; }
    [data-name="Card"]:last-of-type [data-name="Card"] { width: 100% !important; }
    [data-name="Card"] [class*="gap-\\[52px\\]"] { flex-wrap: wrap !important; gap: 28px !important; }

    /* ── Footer: swap to mobile layout ── */
    .footer-section { height: auto !important; }
    .footer-desktop-layout { display: none !important; }
    .footer-mobile-layout {
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 40px !important;
      padding: 48px 24px 56px !important;
      position: relative !important;
      z-index: 1 !important;
    }
    .footer-tagline {
      font-size: clamp(20px, 4vw, 40px) !important;
      max-width: 90vw !important;
    }
    .footer-logo-wrap {
      width: clamp(110px, 18vw, 220px) !important;
      aspect-ratio: 2 / 1 !important;
      align-self: center !important;
    }
    .footer-columns {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 32px 40px !important;
      width: 100% !important;
      align-items: flex-start !important;
    }
    .footer-columns > * { width: auto !important; min-width: 130px !important; }

    body, html { overflow-x: hidden !important; max-width: 100% !important; }
  }

  @media (max-width: 600px) {
    [data-name="Contact Page"]:first-of-type [class*="w-\\[193px\\]"] { display: none !important; }
    [data-name="Card"] [data-name="Card"] { padding: 16px !important; }

    .footer-mobile-layout { padding: 36px 20px 48px !important; gap: 32px !important; }
    .footer-tagline { font-size: clamp(18px, 5vw, 28px) !important; }
    .footer-logo-wrap { width: 110px !important; }
    .footer-columns { gap: 28px 32px !important; }
    .footer-columns [class*="text-\\[32px\\]"],
    .footer-columns [class*="text-\\[36px\\]"] { font-size: 22px !important; }
    .footer-columns [class*="text-\\[20px\\]"] { font-size: 15px !important; }
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