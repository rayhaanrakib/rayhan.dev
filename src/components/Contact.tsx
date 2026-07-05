import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './icons';
import { getContact, type ContactData } from '@/lib/api';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [contact, setContact] = useState<ContactData | null>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getContact().then(setContact);
  }, []);

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }
    if (message.length < 10) {
      setErrorMessage('Message must be at least 10 characters');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    // TODO: Wire to Formspree/Web3Forms/EmailJS
    // Expects env var: VITE_FORM_ENDPOINT
    try {
      // Simulated - replace with real form service
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Example with Formspree:
      // const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
      // if (!endpoint) throw new Error('Form endpoint not configured');
      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      //   body: JSON.stringify({ email, message }),
      // });
      // if (!response.ok) throw new Error('Failed to send');

      setStatus('success');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setErrorMessage(`Something went wrong. Try emailing directly at ${contact?.email}`);
    }
  };

  if (!contact) {
    return (
      <section id="contact" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-white/5 rounded w-24" />
            <div className="h-8 bg-white/5 rounded w-48" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="section-number">05</span>
            <span className="section-label">// connect</span>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl sm:text-4xl font-bold text-white mb-4"
            >
              Let's Connect
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-xl mx-auto"
          >
            Have a project in mind or want to collaborate? Drop me a message and I'll get back to you soon.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {/* Status */}
            <div className="glass-card rounded-xl p-5">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ade80] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4ade80]" />
                </span>
                <span className="text-[#4ade80] text-sm">Available for work</span>
              </div>
            </div>

            {/* Contact Methods */}
            <motion.a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 p-4 glass-card rounded-xl group"
              whileHover={{ y: -2 }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Mail className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-white/25">Email</p>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{contact.email}</p>
              </div>
            </motion.a>

            <motion.a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-4 p-4 glass-card rounded-xl group"
              whileHover={{ y: -2 }}
            >
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Phone className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-white/25">Phone</p>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{contact.phone}</p>
              </div>
            </motion.a>

            <motion.a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 glass-card rounded-xl group"
              whileHover={{ y: -2 }}
            >
              <div className="w-10 h-10 rounded-lg bg-[#25d366]/10 flex items-center justify-center group-hover:bg-[#25d366]/20 transition-colors">
                <WhatsAppIcon className="w-5 h-5 text-[#25d366]" />
              </div>
              <div>
                <p className="text-xs text-white/25">WhatsApp</p>
                <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">Message me</p>
              </div>
            </motion.a>

            {/* Social Links */}
            <div className="glass-card rounded-xl p-5">
              <h4 className="font-mono text-xs text-white/25 uppercase tracking-wider mb-4">
                Find me online
              </h4>
              <div className="flex gap-3">
                <motion.a
                  href={contact.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/[0.03] rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all"
                  aria-label="GitHub"
                  whileHover={{ y: -2 }}
                >
                  <GithubIcon className="w-5 h-5" />
                  <span className="text-sm">GitHub</span>
                </motion.a>
                <motion.a
                  href={contact.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/[0.03] rounded-lg text-white/40 hover:text-white/70 hover:bg-white/[0.06] transition-all"
                  aria-label="LinkedIn"
                  whileHover={{ y: -2 }}
                >
                  <LinkedinIcon className="w-5 h-5" />
                  <span className="text-sm">LinkedIn</span>
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm text-white/40 mb-2">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-white/40 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); setErrorMessage(''); }}
                  placeholder="Tell me about your project or idea..."
                  required
                  minLength={10}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-lg text-white placeholder-white/20 text-sm focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-all resize-none"
                />
              </div>

              {/* Error Message */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-[#f87171] text-sm p-3 bg-[#f87171]/10 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              {/* Success Message */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-[#4ade80] text-sm p-3 bg-[#4ade80]/10 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Message sent — I'll get back to you soon!</span>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-black font-semibold rounded-lg hover:bg-[#a5e0fc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: status === 'sending' ? 1 : 1.01 }}
                whileTap={{ scale: status === 'sending' ? 1 : 0.99 }}
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-xs text-white/20 text-center">
                Or email directly at{' '}
                <a href={`mailto:${contact.email}`} className="text-accent hover:underline">
                  {contact.email}
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
