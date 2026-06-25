// ─────────────────────────────────────────────────────────────────────────────
// ErrorBoundary — App-level crash guard (Studio Inside Eye)
// ─────────────────────────────────────────────────────────────────────────────
// React error boundaries MUST be class components — there is no Hook equivalent
// for getDerivedStateFromError / componentDidCatch. This wraps the whole app in
// App.tsx so a render-time crash anywhere shows a calm, on-brand recovery screen
// instead of a blank white page.
//
// Fallback design matches the 404 / site language:
//   • Instrument Serif display · Hanken Grotesk body
//   • Cream ground · deep-brown ink · #703000 CTA
//
// Two recovery paths:
//   • "Reload page"  → window.location.reload()  (re-runs the whole app fresh)
//   • "Back to Home" → hard nav to "/" (works even if the router itself faulted)
//
// In development the actual error message is shown (collapsed) to speed up
// debugging; in production it stays hidden so visitors never see a stack trace.
// ─────────────────────────────────────────────────────────────────────────────
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Optional custom fallback — overrides the default screen entirely. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const COLOR = {
  cream:     "#dcd1b1",
  creamDeep: "#d5c9a8",
  ink:       "#442b00",
  inkSoft:   "rgba(68,43,0,0.62)",
  rust:      "#8e3219",
  cta:       "#703000",
  hair:      "rgba(68,43,0,0.18)",
};

/**
 * Dev-mode detection that is safe in every environment (Vite, test, SSR).
 * Reads import.meta.env.DEV when available, otherwise falls back to NODE_ENV,
 * and never throws if neither exists.
 */
function isDevEnv(): boolean {
  try {
    const meta = import.meta as unknown as { env?: { DEV?: boolean } };
    if (typeof meta?.env?.DEV === "boolean") return meta.env.DEV;
  } catch {
    /* import.meta unavailable — ignore */
  }
  try {
    return typeof process !== "undefined" && process.env?.NODE_ENV !== "production";
  } catch {
    return false;
  }
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    // Flip to the fallback UI on the next render.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Hook for a real logging service (Sentry / LogRocket) later.
    // Kept as console.error so it's visible in dev tooling without adding deps.
    if (isDevEnv()) {
      // eslint-disable-next-line no-console
      console.error("[ErrorBoundary] Uncaught render error:", error, info);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleHome = () => {
    // Hard navigation — intentionally bypasses the router in case it crashed.
    window.location.assign("/");
  };

  render() {
    if (!this.state.hasError) return this.props.children;
    if (this.props.fallback) return this.props.fallback;

    const isDev = isDevEnv();

    return (
      <main
        role="alert"
        aria-labelledby="eb-heading"
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 24px",
          boxSizing: "border-box",
          background:
            `radial-gradient(120% 90% at 50% 0%, ${COLOR.cream} 0%, ${COLOR.creamDeep} 100%)`,
          fontFamily: "var(--font-hanken), 'Hanken Grotesk', sans-serif",
        }}
      >
        <style>{`
          @keyframes eb-rise {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .eb-anim { animation: eb-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
          .eb-btn {
            transition: transform 0.25s cubic-bezier(0.22,1,0.36,1),
                        box-shadow 0.25s ease, border-color 0.2s ease, opacity 0.2s ease;
          }
          .eb-btn:hover  { transform: translateY(-2px); }
          .eb-btn:active { transform: translateY(0); }
          .eb-btn:focus-visible { outline: 2px solid ${COLOR.ink}; outline-offset: 3px; }
          .eb-primary:hover { box-shadow: 0 10px 28px rgba(112,48,0,0.28); }
          .eb-ghost:hover   { opacity: 1; border-color: ${COLOR.ink}; }
          @media (prefers-reduced-motion: reduce) {
            .eb-anim { animation: none !important; opacity: 1 !important; transform: none !important; }
            .eb-btn  { transition: none !important; }
          }
        `}</style>

        {/* Small rust mark instead of the big "404" — signals "something broke",
            not "page missing" */}
        <div
          aria-hidden
          className="eb-anim"
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: `1.5px solid ${COLOR.rust}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 8v5" stroke={COLOR.rust} strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="16.4" r="0.9" fill={COLOR.rust} />
          </svg>
        </div>

        <h1
          id="eb-heading"
          className="eb-anim"
          style={{
            fontFamily: "var(--font-instrument-serif), 'Instrument Serif', serif",
            fontSize: 36,
            fontWeight: 400,
            lineHeight: 1.15,
            color: COLOR.rust,
            margin: 0,
            maxWidth: 540,
          }}
        >
          Something went wrong
        </h1>

        <p
          className="eb-anim"
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: COLOR.inkSoft,
            margin: "14px 0 0",
            maxWidth: 440,
          }}
        >
          An unexpected error interrupted this page. You can reload to try again,
          or head back to the homepage.
        </p>

        {/* Dev-only error detail — hidden entirely in production builds */}
        {isDev && this.state.error && (
          <details
            className="eb-anim"
            style={{
              marginTop: 22,
              maxWidth: 560,
              width: "100%",
              textAlign: "left",
              fontSize: 13,
              color: COLOR.inkSoft,
            }}
          >
            <summary style={{ cursor: "pointer", color: COLOR.ink, marginBottom: 8 }}>
              Error details (dev only)
            </summary>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                background: "rgba(68,43,0,0.06)",
                border: `1px solid ${COLOR.hair}`,
                borderRadius: 8,
                padding: "12px 14px",
                margin: 0,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                lineHeight: 1.5,
              }}
            >
              {this.state.error.message}
              {this.state.error.stack ? `\n\n${this.state.error.stack}` : ""}
            </pre>
          </details>
        )}

        <div
          className="eb-anim"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 34,
          }}
        >
          <button
            type="button"
            onClick={this.handleReload}
            className="eb-btn eb-primary"
            style={{
              fontFamily: "var(--font-hanken), 'Hanken Grotesk', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "#fff",
              background: COLOR.cta,
              border: "none",
              borderRadius: 6,
              padding: "13px 28px",
              cursor: "pointer",
            }}
          >
            Reload page
          </button>

          <button
            type="button"
            onClick={this.handleHome}
            className="eb-btn eb-ghost"
            style={{
              fontFamily: "var(--font-hanken), 'Hanken Grotesk', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: COLOR.ink,
              background: "transparent",
              border: `1px solid ${COLOR.hair}`,
              borderRadius: 6,
              padding: "13px 24px",
              cursor: "pointer",
              opacity: 0.85,
            }}
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }
}