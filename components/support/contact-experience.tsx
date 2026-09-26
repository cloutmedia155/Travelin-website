"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { trips } from "@/lib/trips";
import { SupportFooter, SupportHeader } from "./support-shell";
import { useContactMotion } from "./use-contact-motion";

const TOPICS = [
  ["choosing-a-trip", "Choosing a trip"],
  ["existing-booking", "Existing booking"],
  ["general-question", "General question"],
  ["partnership", "Partnership"],
] as const;

type Topic = typeof TOPICS[number][0];
type DeliveryState = "checking" | "ready" | "unconfigured";
type SubmitState = "idle" | "sending" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "topic" | "message", string>>;

const topicValues = new Set<string>(TOPICS.map(([value]) => value));

export function ContactExperience() {
  const root = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const errorSummary = useRef<HTMLDivElement>(null);
  const [topic, setTopic] = useState<Topic>("choosing-a-trip");
  const [delivery, setDelivery] = useState<DeliveryState>("checking");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  useContactMotion(root);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("topic");
    if (requested && topicValues.has(requested)) setTopic(requested as Topic);

    const controller = new AbortController();
    fetch("/api/contact", { method: "GET", cache: "no-store", signal: controller.signal })
      .then(response => response.json())
      .then(data => setDelivery(data?.configured === true ? "ready" : "unconfigured"))
      .catch(error => {
        if (error?.name !== "AbortError") setDelivery("unconfigured");
      });
    return () => controller.abort();
  }, []);

  const validate = (data: FormData) => {
    const next: FieldErrors = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const selectedTopic = String(data.get("topic") || "");

    if (!name) next.name = "Enter your name.";
    if (!email) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address.";
    if (!topicValues.has(selectedTopic)) next.topic = "Choose what you need help with.";
    if (!message) next.message = "Tell us how we can help.";
    return next;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (delivery !== "ready") {
      setSubmitState("error");
      setSubmitMessage("Online form delivery is not connected yet. Please email Info@travelnliv.com.");
      return;
    }

    const data = new FormData(event.currentTarget);
    const validationErrors = validate(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setSubmitState("idle");
      requestAnimationFrame(() => errorSummary.current?.focus());
      return;
    }

    setSubmitState("sending");
    setSubmitMessage("");

    const payload = {
      topic: String(data.get("topic") || ""),
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      trip: String(data.get("trip") || "").trim(),
      bookingReference: String(data.get("bookingReference") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (response.ok && result?.accepted === true) {
        setSubmitState("success");
        setSubmitMessage("Your enquiry has been received.");
        setErrors({});
        form.current?.reset();
        setTopic("choosing-a-trip");
      } else {
        setSubmitState("error");
        setSubmitMessage(
          result?.code === "delivery_unconfigured"
            ? "Online form delivery is not connected yet. Please email Info@travelnliv.com."
            : "Your enquiry couldn’t be sent. Please try again or email Info@travelnliv.com.",
        );
      }
    } catch {
      setSubmitState("error");
      setSubmitMessage("Your enquiry couldn’t be sent. Please try again or email Info@travelnliv.com.");
    }
  };

  const needsTrip = topic === "choosing-a-trip" || topic === "existing-booking";

  return (
    <div className="support-page contact-page" ref={root}>
      <a className="skip-link" href="#contact-form">Skip to enquiry form</a>
      <SupportHeader current="contact" />

      <main>
        <section className="contact-intro support-wrap" aria-labelledby="contact-title">
          <div className="contact-intro-copy">
            <span className="support-label">CONTACT</span>
            <h1 id="contact-title">
              <span className="support-line-mask"><span data-contact-title>Let’s</span></span>
              <span className="support-line-mask"><em data-contact-title>talk.</em></span>
            </h1>
            <p>Ask about a trip, or get help with an existing booking.</p>
            <a className="contact-email" href="mailto:Info@travelnliv.com">
              Info@travelnliv.com <ArrowUpRight size={16} />
            </a>

            <div className="contact-visuals">
              <figure className="contact-photo-main">
                <img src="/media/olivia.webp" alt="Olivia Owen, Travel & LIV founder and host" fetchPriority="high" />
                <figcaption>Olivia Owen · Founder & host</figcaption>
              </figure>
              <figure className="contact-photo-small">
                <img src="/media/moment-7.webp" alt="Travel & LIV travelers together on a previous trip" loading="lazy" />
                <figcaption>A previous Travel & LIV trip.</figcaption>
              </figure>
            </div>
          </div>

          <div className="contact-form-shell" id="contact-form">
            <div className="contact-form-heading">
              <span className="support-label">SEND YOUR QUESTION</span>
              <h2>What can we<br /><em>help with?</em></h2>
            </div>

            {delivery === "unconfigured" && (
              <div className="contact-config-note" role="status">
                <strong>Online delivery isn’t connected yet.</strong>
                <p>The form is ready, but there is no confirmed inbox/webhook configuration in the project. For now, email <a href="mailto:Info@travelnliv.com">Info@travelnliv.com</a>.</p>
              </div>
            )}

            {Object.keys(errors).length > 0 && (
              <div className="contact-error-summary" ref={errorSummary} tabIndex={-1} role="alert" aria-labelledby="contact-error-title">
                <strong id="contact-error-title">Please check the highlighted fields.</strong>
                <ul>
                  {Object.entries(errors).map(([field, message]) => <li key={field}><a href={`#contact-${field}`}>{message}</a></li>)}
                </ul>
              </div>
            )}

            <form ref={form} onSubmit={handleSubmit} noValidate>
              <div className="contact-field contact-field-wide">
                <label htmlFor="contact-topic">What can we help with? <span aria-hidden="true">*</span></label>
                <select id="contact-topic" name="topic" value={topic} onChange={event => { setTopic(event.target.value as Topic); setSubmitState("idle"); }} aria-invalid={Boolean(errors.topic)} aria-describedby={errors.topic ? "contact-topic-error" : undefined}>
                  {TOPICS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                </select>
                {errors.topic && <small className="contact-field-error" id="contact-topic-error">{errors.topic}</small>}
              </div>

              <div className="contact-field">
                <label htmlFor="contact-name">Name <span aria-hidden="true">*</span></label>
                <input id="contact-name" name="name" type="text" autoComplete="name" maxLength={120} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} />
                {errors.name && <small className="contact-field-error" id="contact-name-error">{errors.name}</small>}
              </div>

              <div className="contact-field">
                <label htmlFor="contact-email">Email <span aria-hidden="true">*</span></label>
                <input id="contact-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} />
                {errors.email && <small className="contact-field-error" id="contact-email-error">{errors.email}</small>}
              </div>

              {needsTrip && (
                <div className="contact-field contact-field-wide contact-conditional">
                  <label htmlFor="contact-trip">Trip <span className="contact-optional">optional</span></label>
                  <select id="contact-trip" name="trip" defaultValue="">
                    <option value="">Not sure yet</option>
                    {trips.map(trip => <option value={trip.name} key={trip.slug}>{trip.name}</option>)}
                  </select>
                </div>
              )}

              {topic === "existing-booking" && (
                <div className="contact-field contact-field-wide contact-conditional">
                  <label htmlFor="contact-booking-reference">Booking reference <span className="contact-optional">optional</span></label>
                  <input id="contact-booking-reference" name="bookingReference" type="text" maxLength={120} />
                  <small className="contact-field-note">Use the same email address you booked with where possible.</small>
                </div>
              )}

              <div className="contact-field contact-field-wide">
                <label htmlFor="contact-message">Your message <span aria-hidden="true">*</span></label>
                <textarea id="contact-message" name="message" rows={6} maxLength={5000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : "contact-message-note"} />
                {errors.message ? <small className="contact-field-error" id="contact-message-error">{errors.message}</small> : <small className="contact-field-note" id="contact-message-note">Please don’t send passport details, card information or sensitive documents here.</small>}
              </div>

              <div className="contact-submit-row">
                <button className="support-button support-button-dark" type="submit" disabled={submitState === "sending" || delivery !== "ready"}>
                  {submitState === "sending" ? "Sending…" : "Send enquiry"} <ArrowUpRight size={16} />
                </button>
                {delivery !== "ready" && <a className="support-text-link" href="mailto:Info@travelnliv.com">Email instead <ArrowUpRight size={14} /></a>}
              </div>

              {submitMessage && (
                <p className={`contact-submit-status is-${submitState}`} role={submitState === "error" ? "alert" : "status"} aria-live="polite">
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </section>

        <section className="contact-routes" aria-labelledby="routes-title">
          <div className="support-wrap contact-routes-layout">
            <div className="contact-routes-intro" data-contact-reveal>
              <span className="support-label">OTHER USEFUL ROUTES</span>
              <h2 id="routes-title">Maybe the answer<br /><em>is already here.</em></h2>
              <p>Go straight to the information you need instead of filling in a form.</p>
            </div>

            <nav className="contact-route-list" aria-label="Useful routes" data-contact-reveal>
              <a href="/#questions">
                <span><small>QUICK ANSWERS</small><strong>Common questions</strong></span>
                <ArrowRight size={20} />
              </a>
              <Link href="/trips">
                <span><small>FINDING YOUR TRIP</small><strong>Explore the trips</strong></span>
                <ArrowRight size={20} />
              </Link>
              <a href="mailto:Info@travelnliv.com?subject=Partnership%20enquiry">
                <span><small>WORKING TOGETHER</small><strong>Partnership enquiry</strong></span>
                <ArrowRight size={20} />
              </a>
            </nav>

            <figure className="contact-routes-photo" data-contact-reveal>
              <img src="/media/moment-5.webp" alt="Olivia and the Travel & LIV group on a previous trip" loading="lazy" />
              <figcaption>Travel & LIV Collective.</figcaption>
            </figure>
          </div>
        </section>
      </main>

      <SupportFooter />
    </div>
  );
}
