# Form email handoff

The concept includes six request types in both visual directions:

- Appointment request
- Rapid quote request
- Technician question
- General contact
- Customer referral
- Customer feedback

## Delivery boundary

The forms do not post to a server and do not store visitor data. After the
visitor completes required fields and accepts the acknowledgment, the browser
opens the visitor's configured email application with a message addressed to
`deansqt@gmail.com`. The visitor must review the message and press Send.

The interface does not show a successful-submission state. It says that nothing
has been sent yet and that Dean's must reply before an appointment, quote, or
service request is confirmed.

## Data choices

- Appointment and quote forms ask only for contact, vehicle, symptom, and
  scheduling or estimate context.
- The referral form intentionally omits the referred person's phone and email.
- The feedback form makes customer identity and contact information optional.
- No form requests payment information, documents, account credentials, or
  other sensitive records.

## Future server delivery

If Dean's approves a transactional email provider, the same fields can be sent
through a server-side endpoint with abuse protection, validation, a privacy
notice, and an explicit success/failure response. Until then, the email-app
handoff is the only delivery path represented by this concept.

