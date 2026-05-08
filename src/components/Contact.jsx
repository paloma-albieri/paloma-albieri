import { useState } from 'react'

function Contact({ copy }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Função auxiliar para converter o objeto em URL-encoded
  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contato", ...formData })
    })
      .then(() => {
        console.log('Formulário enviado com sucesso!')
        setFormData({ name: '', company: '', email: '', message: '' })
      })
      .catch((error) => console.error('Erro no envio do formulário:', error))
  }

  return (
    <section id="contact" className="contact-section">
      <div className="section-wrap">
        <div className="section-bar reveal">
          <div className="section-label">
            <span className="dot" />• {copy.contactLabel}
          </div>
          <h2 className="display">
            {copy.contactTitle[0]}<em>{copy.contactTitle[1]}</em>{copy.contactTitle[2]}
          </h2>
        </div>

        <div className="contact-content reveal">
          <div className="contact-left">
            <p className="contact-lead">{copy.contactLead}</p>

            <div className="info-list">
              {copy.infoList.map(([label, value, link], i) => (
                <a
                  key={i}
                  href={link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-item"
                >
                  <span className="label">{label}</span>
                  <strong>{value}</strong>
                </a>
              ))}
            </div>
          </div>

          {/* Adicionado o name="contato" ao form */}
          <form
            name="contato"
            className="contact-form"
            data-netlify="true"
            onSubmit={handleSubmit}
          >
            {/* Input oculto obrigatório para o React + Netlify */}
            <input type="hidden" name="form-name" value="contato" />

            <div className="form-group">
              <label htmlFor="contact-name" className="sr-only">{copy.form.name}</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder={copy.form.name}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-company" className="sr-only">{copy.form.company}</label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  placeholder={copy.form.company}
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="contact-email" className="sr-only">{copy.form.email}</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder={copy.form.email}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="sr-only">{copy.form.message}</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder={copy.form.messagePh}
                value={formData.message}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <button type="submit" className="submit-btn">{copy.form.submit}</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
