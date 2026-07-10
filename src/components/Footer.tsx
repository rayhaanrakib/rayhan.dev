import { motion } from "framer-motion";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/rayhaanrakib",
  },
  {
    label: "GitHub",
    href: "https://github.com/rayhaanrakib",
  },
  {
    label: "Email",
    href: "mailto:rayhaanrakib@gmail.com",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] text-white">
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.16),transparent_38%)]" />

        {/* <div className="absolute inset-0 opacity-[0.10] bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" /> */}

        {/* logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/images/logo.svg"
            alt=""
            aria-hidden="true"
            className="w-[400px] sm:w-[500px] lg:w-[600px] h-auto opacity-[0.02] select-none"
          />
        </div>

        {/* blur effect */}
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7dd3fc]/[0.03] blur-[120px]" />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
            {/* Left */}
            <motion.div
              className="border-b border-white/10 p-6 sm:p-8 md:p-10 lg:border-b-0 lg:border-r lg:p-14"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/55">
                  Open to opportunities
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/30">
                  Frontend / Full Stack
                </span>
              </div>

              <h2 className="text-center text-[clamp(2.6rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.06em] lg:text-left">
                Open to the right
                <br className="hidden sm:block" />
                opportunity<span className="text-white/35">.</span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-white/55 sm:text-base lg:mx-0 lg:text-left">
                If you're hiring for a frontend or full stack role, I'm open to
                opportunities where I can contribute through thoughtful UI,
                scalable development, and strong attention to performance and detail.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <a
                  href="mailto:rayhaanrakib@gmail.com"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:bg-[#7dd3fc] sm:w-auto"
                >
                  Contact Me
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 13L13 3M13 3H5.5M13 3V10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/rayhaanrakib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/12 px-6 py-3.5 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.04] sm:w-auto"
                >
                  View LinkedIn
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Right */}
            <motion.div
              className="p-6 sm:p-8 md:p-10 lg:p-14"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="space-y-8">
                <div className="border-b border-white/10 pb-6">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-white/30">
                    01 / Role Fit
                  </p>
                  <p className="text-sm leading-relaxed text-white/65 sm:text-base">
                    Frontend Developer, React Developer, Next.js Developer, and
                    Full Stack roles in product-focused teams.
                  </p>
                </div>

                <div className="border-b border-white/10 pb-6">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-white/30">
                    02 / Quick Facts
                  </p>
                  <div className="space-y-2 text-sm text-white/65 sm:text-base">
                    <p>
                      <span className="text-white/35">Location:</span> Dhaka,
                      Bangladesh
                    </p>
                    <p>
                      <span className="text-white/35">Availability:</span> Open
                      to full-time opportunities
                    </p>
                    <p>
                      <span className="text-white/35">Work Style:</span> Remote
                      / Hybrid / On-site
                    </p>
                  </div>
                </div>

                <div className="">
                  <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-white/30">
                    03 / Profiles
                  </p>

                  <div className="flex flex-col gap-3">
                    {links.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : "_self"}
                        rel={
                          item.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] hover:text-white"
                      >
                        <span>{item.label}</span>
                        <svg
                          className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M3 13L13 3M13 3H5.5M13 3V10.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom strip */}
          <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-5 text-[11px] uppercase tracking-[0.22em] text-white/35 sm:px-8 md:px-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-6">
            <p>© {new Date().getFullYear()} Rakibul Islam Rayhan</p>
            <p className="text-white/25">Open to opportunities worldwide</p>
            <a
              href="#top"
              className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-white/70"
            >
              Back to top
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 13V3M8 3L3.5 7.5M8 3L12.5 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}