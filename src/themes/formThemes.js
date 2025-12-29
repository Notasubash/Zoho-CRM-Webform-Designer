export const formThemes = {
  /* ==================================================
     1️⃣ MODERN MINIMAL (Light gray, soft shadow, dark CTA)
  ================================================== */
  "modern-minimal": `
    #crmWebToEntityForm.zd-form .zcwf_title {
  color: #111827 !important;
  font-size: 22px !important;
  font-weight: 600 !important;
  margin-bottom: 20px !important;
}

#crmWebToEntityForm.zd-form {
  background: #f8fafc !important;
  padding: 28px !important;
  border-radius: 16px !important;
  font-family: Inter, system-ui, sans-serif !important;
}

#crmWebToEntityForm.zd-form .zd-input,
#crmWebToEntityForm.zd-form .zd-textarea,
#crmWebToEntityForm.zd-form .zd-select {
  width: 100% !important;
  background: #ffffff !important;
  border: 1px solid #e5e7eb !important;
  border-radius: 10px !important;
  padding: 10px 14px !important;
}

#crmWebToEntityForm.zd-form .zd-button {
  background: #111827 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  padding: 10px 24px !important;
  font-weight: 600 !important;
}
`,

  /* ==================================================
     2️⃣ BOLD GRADIENT (Pink → Purple → Orange)
  ================================================== */
  "bold-gradient": `
    #crmWebToEntityForm.zd-form .zcwf_title {
  background: linear-gradient(90deg,#9333ea,#db2777) !important;
  color: #ffffff !important;
  padding: 18px 26px !important;
  font-size: 24px !important;
  font-weight: 700 !important;
  margin: -30px -30px 26px -30px !important;
  border-radius: 18px 18px 0 0 !important;
}

#crmWebToEntityForm.zd-form {
  background: #fceeff !important;
  padding: 30px !important;
  border-radius: 18px !important;
  font-family: Poppins, system-ui, sans-serif !important;
  color: black !important;
}

#crmWebToEntityForm.zd-form label {
  color: black !important;
}

#crmWebToEntityForm.zd-form .zd-input,
#crmWebToEntityForm.zd-form .zd-textarea {
  background: #ffffff !important;
  border-radius: 12px !important;
  border: none !important;
  padding: 12px 14px !important;
}

#crmWebToEntityForm.zd-form .zd-button {
  background: linear-gradient(90deg,#9333ea,#db2777) !important;
  color: #ffffff !important;
  border-radius: 10px !important;
  padding: 12px 28px !important;
  font-weight: 600 !important;
}
`,

  /* ==================================================
     3️⃣ NATURE ORGANIC (Mint / Teal / Soft green)
  ================================================== */
  "nature-organic": `
    #crmWebToEntityForm.zd-form .zcwf_title {
  background: #10b981 !important;
  color: #ffffff !important;
  padding: 16px 24px !important;
  font-size: 22px !important;
  font-weight: 600 !important;
  margin: -30px -30px 24px -30px !important;
  border-radius: 20px 20px 0 0 !important;
}

#crmWebToEntityForm.zd-form {
  background: linear-gradient(135deg,#d1fae5,#ecfeff) !important;
  padding: 30px !important;
  border-radius: 20px !important;
  font-family: Nunito, system-ui, sans-serif !important;
}

#crmWebToEntityForm.zd-form .zd-input,
#crmWebToEntityForm.zd-form .zd-textarea {
  background: #ffffff !important;
  border: 1px solid #6ee7b7 !important;
  border-radius: 999px !important;
  padding: 10px 18px !important;
}

#crmWebToEntityForm.zd-form .zd-textarea {
  border-radius: 16px !important;
}

#crmWebToEntityForm.zd-form .zd-button {
  background: #10b981 !important;
  color: #ffffff !important;
  border-radius: 999px !important;
  padding: 10px 28px !important;
  font-weight: 600 !important;
}
`,

  /* ==================================================
     4️⃣ TECH DARK (Dark navy, blue neon)
  ================================================== */
  "tech-dark": `
    #crmWebToEntityForm.zd-form .zcwf_title {
  color: #f8fafc !important;
  font-size: 22px !important;
  font-weight: 600 !important;
  margin-bottom: 20px !important;
}

/* FORM WRAPPER */
#crmWebToEntityForm.zd-form {
  background: linear-gradient(135deg,#020617,#0f172a) !important;
  padding: 30px !important;
  border-radius: 18px !important;
  font-family: Inter, system-ui, sans-serif !important;
  color: #e5e7eb !important;
}

/* FORM TITLE (Lead) */
#crmWebToEntityForm.zd-form .zcwf_title {
  color: #f8fafc !important;
  font-size: 22px !important;
  margin-bottom: 20px !important;
}

/* LABELS */
#crmWebToEntityForm.zd-form label {
  color: #e5e7eb !important;
}

/* INPUTS */
#crmWebToEntityForm.zd-form .zd-input,
#crmWebToEntityForm.zd-form .zd-textarea {
  background: #020617 !important;
  border: 1px solid #1e293b !important;
  color: #e5e7eb !important;
  border-radius: 10px !important;
  padding: 10px 14px !important;
}

/* PLACEHOLDER */
#crmWebToEntityForm.zd-form .zd-input::placeholder,
#crmWebToEntityForm.zd-form .zd-textarea::placeholder {
  color: #94a3b8 !important;
}

/* FOCUS */
#crmWebToEntityForm.zd-form .zd-input:focus,
#crmWebToEntityForm.zd-form .zd-textarea:focus {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 2px rgba(59,130,246,0.4) !important;
  outline: none !important;
}

/* PRIVACY TEXT */
#crmWebToEntityForm.zd-form .zcwf_privacy_txt {
  color: #cbd5f5 !important;
}

/* PRIVACY ERROR */
#crmWebToEntityForm.zd-form [id^="privacyErr"] {
  color: #f87171 !important;
}

/* CHECKBOX */
#crmWebToEntityForm.zd-form input[type="checkbox"] {
  accent-color: #3b82f6 !important;
}

/* BUTTONS */
#crmWebToEntityForm.zd-form .zd-button {
  background: #2563eb !important;
  color: #ffffff !important;
  border-radius: 10px !important;
  padding: 10px 26px !important;
  font-weight: 600 !important;
}

/* RESET BUTTON */
#crmWebToEntityForm.zd-form input[type="reset"].zcwf_button {
  background: transparent !important;
  color: #e5e7eb !important;
  border: 1px solid #334155 !important;
  border-radius: 10px !important;
  padding: 10px 22px !important;
  margin-left: 10px !important;
  font-weight: 500 !important;
}

/* RESET HOVER */
#crmWebToEntityForm.zd-form input[type="reset"].zcwf_button:hover {
  background: #020617 !important;
  border-color: #3b82f6 !important;
  color: #ffffff !important;
}
`,

  /* ==================================================
     5️⃣ CORPORATE PROFESSIONAL (Clean blue / structured)
  ================================================== */
  "corporate-professional": `
#crmWebToEntityForm.zd-form {
  background: #f1f5f9 !important;
  padding: 30px !important;
  border-radius: 12px !important;
  font-family: "Segoe UI", system-ui, sans-serif !important;
}

#crmWebToEntityForm.zd-form .zd-input,
#crmWebToEntityForm.zd-form .zd-textarea {
  background: #ffffff !important;
  border: 1px solid #c7d2fe !important;
  border-radius: 6px !important;
  padding: 10px 12px !important;
}

#crmWebToEntityForm.zd-form .zd-button {
  background: #4f46e5 !important;
  color: #ffffff !important;
  border-radius: 6px !important;
  padding: 10px 24px !important;
  font-weight: 600 !important;
  outline: none !important;
  border: none !important;
}
  #crmWebToEntityForm.zd-form .zcwf_title {
  background: #4f46e5 !important;
  color: #ffffff !important;
  padding: 16px 24px !important;
  font-size: 22px !important;
  font-weight: 600 !important;
  margin: -30px -30px 24px -30px !important;
  border-radius: 12px 12px 0 0 !important;
}

`
};
