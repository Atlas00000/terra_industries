"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const leadershipData = [
  {
    id: 1,
    name: "His Imperial Majesty, the Ooni of Ife",
    title: "Board of Directors",
    image: "/stories/Ooni_to_Board1.jpeg",
    description: "One of Africa's most powerful kings, bringing deep passion for Nigeria's industrial and economic prosperity. His royal authority enhances our credibility and government relations, with a global vision to turn Nigeria into a global drone producer.",
    highlights: [
      "Royal Authority & Influence",
      "Economic Development Vision", 
      "Government Relations"
    ],
    color: "purple"
  },
  {
    id: 2,
    name: "Retired Air Vice Marshal Ayoola Jolasinmi",
    title: "Board of Directors",
    image: "/stories/Ayoola_Jolasinmi_Joins_Board.jpeg",
    description: "Distinguished career in the Nigerian Air Force with key positions including Director of Operations, Chief of Defence Space Administration, and Chief of Defence Policy & Plans at Defence Headquarters.",
    highlights: [
      "Military Leadership",
      "Strategic Defense Planning",
      "Space Administration"
    ],
    color: "blue"
  },
  {
    id: 3,
    name: "Engr. Mansur Ahmed",
    title: "Board of Directors", 
    image: "/stories/Addition_Engr_Mansur_Ahmed.jpeg",
    description: "Former Director General of the Manufacturers Association of Nigeria (MAN) with extensive experience in industrial development and manufacturing policy. Brings deep understanding of Nigeria's manufacturing landscape and economic development.",
    highlights: [
      "Industrial Development",
      "Manufacturing Policy",
      "Economic Development"
    ],
    color: "green"
  }
]

export function MobileLeadershipSection() {
  return (
    <section className="relative py-16 bg-gradient-to-b from-background to-charcoal">
      {/* Static background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(74, 144, 226, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-foreground">
            Leadership Excellence
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our distinguished board of directors brings together royal authority, military expertise, and industrial leadership to guide Terrahaptix Industries toward unprecedented success.
          </p>
        </motion.div>

        {/* Leadership Cards */}
        <div className="space-y-8">
          {leadershipData.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32 mx-auto md:mx-0">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">
                      {leader.name}
                    </h3>
                    <p className="text-primary font-medium">
                      {leader.title}
                    </p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {leader.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Key Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {leader.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
