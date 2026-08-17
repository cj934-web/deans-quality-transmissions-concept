export const formKinds = ["appointment", "quote", "question", "contact", "referral", "feedback"] as const;

export type FormKind = (typeof formKinds)[number];
export type FormTheme = "dark" | "shade";

type FieldOption = { label: string; value: string };

export type FormField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "textarea" | "select" | "radio";
  required?: boolean;
  autocomplete?: string;
  placeholder?: string;
  maxlength?: number;
  options?: FieldOption[];
  wide?: boolean;
};

export type FormDefinition = {
  title: string;
  shortTitle: string;
  eyebrow: string;
  intro: string;
  subject: string;
  fields: FormField[];
  note?: string;
};

const contactPreference: FieldOption[] = [
  { label: "Phone", value: "Phone" },
  { label: "Email", value: "Email" },
  { label: "Either is fine", value: "Either phone or email" },
];

const satisfaction: FieldOption[] = [
  { label: "Excellent", value: "Excellent" },
  { label: "Good", value: "Good" },
  { label: "Fair", value: "Fair" },
  { label: "Poor", value: "Poor" },
];

export const formDefinitions: Record<FormKind, FormDefinition> = {
  appointment: {
    title: "Request an appointment",
    shortTitle: "Appointment",
    eyebrow: "Diagnosis request",
    intro: "Tell Dean’s what the vehicle is doing and when you are available. The shop will need to reply to confirm a time.",
    subject: "Appointment request",
    fields: [
      { name: "firstName", label: "First name", type: "text", required: true, autocomplete: "given-name" },
      { name: "lastName", label: "Last name", type: "text", required: true, autocomplete: "family-name" },
      { name: "phone", label: "Phone", type: "tel", required: true, autocomplete: "tel", placeholder: "801-555-0123" },
      { name: "email", label: "Email", type: "email", required: true, autocomplete: "email" },
      { name: "vehicleYear", label: "Vehicle year", type: "text", required: true, autocomplete: "off", maxlength: 4, placeholder: "2018" },
      { name: "vehicleMake", label: "Vehicle make", type: "text", required: true, autocomplete: "off", placeholder: "Ford" },
      { name: "vehicleModel", label: "Vehicle model", type: "text", required: true, autocomplete: "off", placeholder: "F-150" },
      { name: "preferredContact", label: "Preferred reply", type: "select", required: true, options: contactPreference },
      { name: "concern", label: "What changed?", type: "textarea", required: true, maxlength: 1200, wide: true, placeholder: "Describe the slip, leak, warning light, noise or other concern." },
      { name: "availability", label: "Days or times that work for you", type: "textarea", required: true, maxlength: 600, wide: true, placeholder: "Example: weekday mornings next week" },
    ],
  },
  quote: {
    title: "Request a rapid quote",
    shortTitle: "Rapid quote",
    eyebrow: "Repair estimate request",
    intro: "Share the vehicle details and concern. Dean’s may need to inspect or diagnose the vehicle before giving a firm price.",
    subject: "Rapid quote request",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, autocomplete: "name" },
      { name: "phone", label: "Phone", type: "tel", required: true, autocomplete: "tel" },
      { name: "email", label: "Email", type: "email", required: true, autocomplete: "email" },
      { name: "vehicleYear", label: "Vehicle year", type: "text", required: true, maxlength: 4, placeholder: "2018" },
      { name: "vehicleMake", label: "Vehicle make", type: "text", required: true, placeholder: "Chevrolet" },
      { name: "vehicleModel", label: "Vehicle model", type: "text", required: true, placeholder: "Silverado" },
      { name: "engine", label: "Engine, if known", type: "text", placeholder: "5.3L V8" },
      { name: "driveType", label: "Drive type", type: "select", options: [
        { label: "Not sure", value: "Not sure" }, { label: "2WD", value: "2WD" }, { label: "4WD", value: "4WD" }, { label: "AWD", value: "AWD" },
      ] },
      { name: "transmissionType", label: "Transmission", type: "select", options: [
        { label: "Not sure", value: "Not sure" }, { label: "Automatic", value: "Automatic" }, { label: "Manual", value: "Manual" }, { label: "CVT", value: "CVT" },
      ] },
      { name: "concern", label: "Concern and quote request", type: "textarea", required: true, maxlength: 1400, wide: true, placeholder: "Describe the symptoms, any diagnosis already completed, and the work you want quoted." },
    ],
  },
  question: {
    title: "Ask a technician",
    shortTitle: "Technician question",
    eyebrow: "Straight-answer request",
    intro: "Send a general transmission or drivetrain question. A message cannot replace an in-person diagnosis, but it can help identify the next step.",
    subject: "Question for a technician",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, autocomplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autocomplete: "email" },
      { name: "phone", label: "Phone (optional)", type: "tel", autocomplete: "tel" },
      { name: "vehicle", label: "Vehicle year, make and model (optional)", type: "text", wide: true, placeholder: "2016 Toyota Tacoma" },
      { name: "question", label: "Your question", type: "textarea", required: true, maxlength: 1400, wide: true },
    ],
  },
  contact: {
    title: "Contact the shop",
    shortTitle: "Contact",
    eyebrow: "General message",
    intro: "Use this for a general question about Dean’s, shop hours, an existing repair or the best next step.",
    subject: "Website contact request",
    fields: [
      { name: "name", label: "Name", type: "text", required: true, autocomplete: "name" },
      { name: "email", label: "Email", type: "email", required: true, autocomplete: "email" },
      { name: "phone", label: "Phone", type: "tel", autocomplete: "tel" },
      { name: "preferredContact", label: "Preferred reply", type: "select", required: true, options: contactPreference },
      { name: "message", label: "Message", type: "textarea", required: true, maxlength: 1400, wide: true },
    ],
  },
  referral: {
    title: "Refer a friend",
    shortTitle: "Referral",
    eyebrow: "Word-of-mouth introduction",
    intro: "Tell Dean’s who you referred without sharing that person’s phone number or email. Your friend can contact the shop when they are ready.",
    subject: "Customer referral",
    note: "This form intentionally does not request your friend’s contact details. Please do not include private information in the comments.",
    fields: [
      { name: "yourName", label: "Your name", type: "text", required: true, autocomplete: "name" },
      { name: "yourEmail", label: "Your email", type: "email", required: true, autocomplete: "email" },
      { name: "yourPhone", label: "Your phone (optional)", type: "tel", autocomplete: "tel" },
      { name: "friendName", label: "Friend’s name", type: "text", required: true, autocomplete: "off" },
      { name: "comments", label: "Anything Dean’s should know?", type: "textarea", maxlength: 900, wide: true },
    ],
  },
  feedback: {
    title: "Share customer feedback",
    shortTitle: "Feedback",
    eyebrow: "Service follow-up",
    intro: "Tell Dean’s about a recent visit. Contact details are optional unless you would like the shop to follow up.",
    subject: "Customer feedback",
    fields: [
      { name: "name", label: "Name (optional)", type: "text", autocomplete: "name" },
      { name: "email", label: "Email (optional)", type: "email", autocomplete: "email" },
      { name: "serviceDate", label: "Approximate service date", type: "date" },
      { name: "vehicle", label: "Vehicle (optional)", type: "text", placeholder: "Year, make and model" },
      { name: "overall", label: "Overall experience", type: "radio", required: true, options: satisfaction, wide: true },
      { name: "communication", label: "Communication", type: "radio", required: true, options: satisfaction, wide: true },
      { name: "quality", label: "Quality of work", type: "radio", required: true, options: satisfaction, wide: true },
      { name: "returnLikelihood", label: "Would you return or recommend Dean’s?", type: "radio", required: true, options: [
        { label: "Yes", value: "Yes" }, { label: "Maybe", value: "Maybe" }, { label: "No", value: "No" },
      ], wide: true },
      { name: "comments", label: "Comments", type: "textarea", required: true, maxlength: 1400, wide: true },
    ],
  },
};

export function isFormKind(value: string): value is FormKind {
  return formKinds.includes(value as FormKind);
}

