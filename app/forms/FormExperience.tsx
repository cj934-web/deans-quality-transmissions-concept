"use client";

import { useState, type FormEvent } from "react";
import { formDefinitions, formKinds, type FormField, type FormKind, type FormTheme } from "./form-config";
import styles from "./FormExperience.module.css";

const recipient = "deansqt@gmail.com";

function Field({ field }: { field: FormField }) {
  const id = `field-${field.name}`;

  if (field.type === "radio") {
    return (
      <fieldset className={`${styles.field} ${styles.wide} ${styles.choiceField}`}>
        <legend>{field.label}{field.required ? <span aria-hidden="true"> *</span> : null}</legend>
        <div className={styles.choiceRow}>
          {field.options?.map((option) => (
            <label key={option.value}>
              <input type="radio" name={field.name} value={option.value} required={field.required} />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <div className={`${styles.field} ${field.wide ? styles.wide : ""}`}>
      <label htmlFor={id}>{field.label}{field.required ? <span aria-hidden="true"> *</span> : null}</label>
      {field.type === "textarea" ? (
        <textarea id={id} name={field.name} required={field.required} maxLength={field.maxlength} placeholder={field.placeholder} rows={5} />
      ) : field.type === "select" ? (
        <select id={id} name={field.name} required={field.required} defaultValue="">
          <option value="" disabled>Select one</option>
          {field.options?.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
        </select>
      ) : (
        <input id={id} name={field.name} type={field.type} required={field.required} autoComplete={field.autocomplete} maxLength={field.maxlength} placeholder={field.placeholder} />
      )}
    </div>
  );
}

export default function FormExperience({ kind, theme }: { kind: FormKind; theme: FormTheme }) {
  const definition = formDefinitions[kind];
  const [status, setStatus] = useState("");
  const routePrefix = theme === "shade" ? "/shade/forms" : "/forms";
  const homeHref = theme === "shade" ? "/shade" : "/";

  function handleKindChange(value: string) {
    window.location.assign(`${routePrefix}/${value}`);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = definition.fields
      .map((field) => [field.label.replace(" (optional)", ""), String(data.get(field.name) ?? "").trim()] as const)
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`);

    lines.push("", `Prepared from: ${window.location.href}`, "", "Please reply to the customer to confirm the next step.");
    const subject = `${definition.subject} — ${String(data.get("name") ?? data.get("firstName") ?? data.get("yourName") ?? "Website visitor")}`;
    const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    setStatus("Your email app should open. Review the message, then press Send. Nothing has been sent yet.");
    window.location.href = mailto;
  }

  return (
    <main className={`${styles.page} ${theme === "shade" ? styles.shade : styles.dark}`} data-form-theme={theme}>
      <a className={styles.skip} href="#request-form">Skip to form</a>
      <div className={styles.disclosure}>
        <p><strong>Independent concept form</strong><span> · </span>Email handoff to Dean&apos;s Quality Transmissions</p>
        <a href={homeHref}>Back to concept</a>
      </div>

      <header className={styles.header}>
        <a className={styles.brand} href={homeHref}><strong>Dean&apos;s</strong><span>Quality Transmissions</span></a>
        <div className={styles.contact}><a href="tel:+18017981664">801-798-1664</a><span>590 N Main · Spanish Fork, Utah</span></div>
      </header>

      <section className={styles.intro} aria-labelledby="form-title">
        <div>
          <p>{definition.eyebrow}</p>
          <h1 id="form-title">{definition.title}</h1>
          <p className={styles.lede}>{definition.intro}</p>
        </div>
        <aside aria-label="Email delivery details">
          <span>What happens next</span>
          <strong>1. Complete this form</strong>
          <strong>2. Review it in your email app</strong>
          <strong>3. Press Send</strong>
          <p>Dean&apos;s must reply before an appointment, quote or other request is confirmed.</p>
        </aside>
      </section>

      <section className={styles.formShell}>
        <div className={styles.formNav}>
          <label htmlFor="request-kind">Choose a request</label>
          <select id="request-kind" value={kind} onChange={(event) => handleKindChange(event.target.value)}>
            {formKinds.map((item) => <option value={item} key={item}>{formDefinitions[item].shortTitle}</option>)}
          </select>
        </div>

        <form id="request-form" className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.boundary}>
            <strong>Email handoff</strong>
            <p>This concept site does not store or silently send form data. Submitting opens your email app with a formatted message addressed to <a href={`mailto:${recipient}`}>{recipient}</a>.</p>
          </div>
          <p className={styles.required}><span aria-hidden="true">*</span> Required fields</p>
          <div className={styles.fields}>
            {definition.fields.map((field) => <Field field={field} key={field.name} />)}
          </div>
          {definition.note ? <p className={styles.formNote}>{definition.note}</p> : null}
          <label className={styles.consent}>
            <input type="checkbox" name="emailHandoffAcknowledged" required />
            <span>I understand this opens my email app and does not reserve an appointment or confirm service until Dean&apos;s replies.</span>
          </label>
          <div className={styles.submitRow}>
            <button type="submit">Review in email app <span aria-hidden="true">↗</span></button>
            <p aria-live="polite">{status || "You will have a chance to review the message before sending."}</p>
          </div>
        </form>
      </section>

      <footer className={styles.footer}>
        <p>Prefer to contact the shop directly?</p>
        <div><a href="tel:+18017981664">Call 801-798-1664</a><a href={`mailto:${recipient}`}>Email {recipient}</a></div>
      </footer>
    </main>
  );
}

