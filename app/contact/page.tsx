'use client';
import { useState } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', mobile: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');

    // Submit to Google Forms or custom endpoint
    // Replace YOUR_FORM_ID and entry IDs with your Google Form entry IDs
    const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_CONTACT_FORM_URL || '';

    try {
      if (GOOGLE_FORM_URL) {
        const body = new FormData();
        body.append('entry.NAME_FIELD_ID', form.name);
        body.append('entry.EMAIL_FIELD_ID', form.email);
        body.append('entry.MOBILE_FIELD_ID', form.mobile);
        body.append('entry.MESSAGE_FIELD_ID', form.message);
        await fetch(GOOGLE_FORM_URL, { method: 'POST', mode: 'no-cors', body });
      }
      setStatus('sent');
      setForm({ name: '', email: '', mobile: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="py-10" style={{ background: 'linear-gradient(135deg, var(--primary-dark), var(--primary))' }}>
        <div className="container-main text-white text-center">
          <h1 className="text-3xl font-black mb-2">Contact Us</h1>
          <p className="opacity-70">Have questions? We are here to help you.</p>
        </div>
      </div>

      <div className="container-main py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-black mb-4" style={{ color: 'var(--primary)' }}>Get In Touch</h2>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
                Have questions about government jobs, exam updates, or our portal? Drop us a message and we will get back to you within 24 hours.
              </p>
            </div>

            {[
              { icon: MapPin, label: 'Address', value: 'Dehradun, Uttarakhand, India', color: '#1a3c6e' },
              { icon: Mail, label: 'Email', value: 'contact@jobscholar.in', color: '#7c3aed' },
              { icon: Phone, label: 'Phone', value: '+91-XXXX-XXXXXX', color: '#059669' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid var(--border)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: color + '15' }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <div>
                  <div className="text-xs font-semibold mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</div>
                  <div className="text-sm font-medium" style={{ color: 'var(--text)' }}>{value}</div>
                </div>
              </div>
            ))}

            {/* FAQ Box */}
            <div className="p-5 rounded-xl" style={{ background: '#eff6ff', border: '1px solid #bfdbfe' }}>
              <div className="font-bold text-sm mb-3" style={{ color: 'var(--primary)' }}>📌 Frequently Asked</div>
              <ul className="space-y-2 text-xs" style={{ color: '#1e40af' }}>
                <li>• How do I apply for government jobs?</li>
                <li>• Where can I download admit cards?</li>
                <li>• How to check exam results?</li>
                <li>• How to get exam updates on WhatsApp?</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid var(--border)', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <h3 className="text-xl font-black mb-6" style={{ color: 'var(--primary)' }}>Send Us a Message</h3>

              {status === 'sent' ? (
                <div className="text-center py-12">
                  <CheckCircle size={56} className="mx-auto mb-4" style={{ color: '#059669' }} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#059669' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Thank you for contacting us. We will reply within 24 hours.</p>
                  <button onClick={() => setStatus('idle')}
                    className="mt-6 px-6 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--primary)' }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
                        Full Name <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="text" placeholder="Enter your full name"
                        value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{ border: '1.5px solid var(--border)', background: '#f8fafc' }}
                        onFocus={e => e.target.style.borderColor = '#2d5ba3'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
                        Email Address <span style={{ color: '#dc2626' }}>*</span>
                      </label>
                      <input
                        type="email" placeholder="Enter your email"
                        value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{ border: '1.5px solid var(--border)', background: '#f8fafc' }}
                        onFocus={e => e.target.style.borderColor = '#2d5ba3'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
                      Mobile Number
                    </label>
                    <input
                      type="tel" placeholder="Enter your mobile number"
                      value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{ border: '1.5px solid var(--border)', background: '#f8fafc' }}
                      onFocus={e => e.target.style.borderColor = '#2d5ba3'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
                      Message <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <textarea
                      rows={5} placeholder="Write your message here..."
                      value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all resize-none"
                      style={{ border: '1.5px solid var(--border)', background: '#f8fafc' }}
                      onFocus={e => e.target.style.borderColor = '#2d5ba3'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-sm" style={{ color: '#dc2626' }}>Something went wrong. Please try again or email us directly.</p>
                  )}

                  <button onClick={handleSubmit} disabled={status === 'sending'}
                    className="w-full py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-light))' }}>
                    {status === 'sending' ? 'Sending...' : <><Send size={16} /> Send Message</>}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
