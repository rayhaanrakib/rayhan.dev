import { motion } from "framer-motion";
import ServiceRow from "./ServiceRow";

const services = [
  {
    title: "Frontend Engineering",
    tags: [
      "Responsive Design",
      "Accessibility",
      "SaaS",
      "User Interface (UI) Development",
      "Front-End Frameworks",
    ],
  },
  {
    title: "Backend Engineering",
    tags: [
      "REST APIs",
      "System Design",
      "Authentication",
      "Scalability",
      "Server-Side Logic",
    ],
  },
  {
    title: "Database Engineering",
    tags: [
      "PostgreSQL",
      "Prisma ORM",
      "Query Optimization",
      "Database Architecture",
      "Data Modeling",
    ],
  },
  {
    title: "Website Migration",
    tags: [
      "Web Migration",
      "Optimization",
      "Replatforming",
      "Content Transfer",
      "Performance Enhancement",
    ],
  },
  {
    title: "Cloud & Deployment",
    tags: [
      "Vercel",
      "CI/CD",
      "Performance Optimization",
      "Cloud Infrastructure",
      "DevOps",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle grain texture overlay */}
      {/* <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      /> */}

      {/* Ambient glow */}
      <div className="absolute top-1/2 -translate-y-1/2 -right-64 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="section-number">03</span>
            <span className="section-label">// services</span>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl sm:text-4xl font-bold text-white"
            >
              What I Offer
            </motion.h2>
          </div>
        </motion.div>

        {/* Service rows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  },
                },
              }}
            >
              <ServiceRow
                index={index}
                title={service.title}
                tags={service.tags}
                total={services.length}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
