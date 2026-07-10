import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';
import { LinkedinIcon, WhatsAppIcon } from './icons';
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

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const clearFeedback = () => {
    if (errorMessage) setErrorMessage('');
    if (status === 'error' || status === 'success') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (message.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Message must be at least 10 characters.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus('success');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setErrorMessage(
        `Something went wrong. Email me directly at ${contact?.email}`
      );
    }
  };

  if (!contact) {
    return (
      <section id="contact" className="py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="space-y-4 animate-pulse">
            <div className="h-4 w-28 rounded bg-white/5" />
            <div className="h-10 w-64 rounded bg-white/5" />
            <div className="h-[400px] rounded-[28px] bg-white/5" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden py-24 sm:py-32"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">05</span>
            <span className="section-label">// connect</span>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
            >
              Let's Connect
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/40 max-w-xl text-sm sm:text-base"
          >
            Have a project in mind or want to collaborate? Drop me a message
            and I'll get back to you soon.
          </motion.p>
        </motion.div>

        {/* Main Panel */}
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <div className="grid lg:grid-cols-2">
            {/* Left — Reach me */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10"
            >
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/30">
                  Reach me directly
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Contact channels
                </h3>
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="space-y-3">
                  {/* Email */}
                  <motion.a
                    href={`mailto:${contact.email}`}
                    whileHover={{ x: 4 }}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                          Email
                        </p>
                        <p className="truncate text-sm text-white/70 group-hover:text-white transition-colors">
                          {contact.email}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white/20 transition-all group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>

                  {/* Phone */}
                  <motion.a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    whileHover={{ x: 4 }}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Phone className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                          Phone
                        </p>
                        <p className="text-sm text-white/70 group-hover:text-white transition-colors">
                          {contact.phone}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white/20 transition-all group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>

                  {/* WhatsApp */}
                  <motion.a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#25d366]/10 text-[#25d366]">
                        <WhatsAppIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                          WhatsApp
                        </p>
                        <p className="text-sm text-white/70 group-hover:text-white transition-colors">
                          Message me directly
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white/20 transition-all group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>

                  {/* LinkedIn */}
                  <motion.a
                    href={`${contact.linkedin.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 transition-all hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#0a66c2]/10 text-[#0a66c2]">
                        <LinkedinIcon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                          LinkedIn
                        </p>
                        <p className="text-sm text-white/70 group-hover:text-white transition-colors">
                          View my profile
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-white/20 transition-all group-hover:text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.a>
                </div>

                {/* Response hint */}
                <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs leading-relaxed text-white/35">
                    I typically respond within{' '}
                    <span className="text-white/55">24 hours</span>. For
                    urgent inquiries, WhatsApp works best.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right — Send a message */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.05 }}
              className="flex flex-col p-6 sm:p-8 lg:p-10"
            >
              <div className="mb-8">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/30">
                  Send a message
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Drop me a note
                </h3>
              </div>

              <form
                onSubmit={handleSubmit}
                className="flex flex-1 flex-col justify-between"
              >
                <div className="space-y-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/35"
                    >
                      Your Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        clearFeedback();
                      }}
                      placeholder="name@company.com"
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-accent/40 focus:bg-white/[0.05] focus:ring-1 focus:ring-accent/25"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/35"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        clearFeedback();
                      }}
                      placeholder="Tell me about the role, your team, or what you're looking for..."
                      required
                      minLength={10}
                      rows={8}
                      className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-all focus:border-accent/40 focus:bg-white/[0.05] focus:ring-1 focus:ring-accent/25"
                    />
                  </div>

                  {/* Feedback */}
                  {errorMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 rounded-2xl border border-[#f87171]/20 bg-[#f87171]/10 px-4 py-3 text-sm text-[#fca5a5]"
                    >
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 rounded-2xl border border-[#4ade80]/20 bg-[#4ade80]/10 px-4 py-3 text-sm text-[#86efac]"
                    >
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span>Message sent — I'll get back to you soon.</span>
                    </motion.div>
                  )}
                </div>

                {/* Submit */}
                <div className="mt-6">
                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{
                      scale: status === 'sending' ? 1 : 1.01,
                    }}
                    whileTap={{
                      scale: status === 'sending' ? 1 : 0.99,
                    }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[#a5e0fc] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="mt-4 text-center text-xs text-white/25">
                    Prefer direct email?{' '}
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-accent transition-colors hover:text-[#a5e0fc]"
                    >
                      {contact.email}
                    </a>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}