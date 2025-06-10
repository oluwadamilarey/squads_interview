'use client'

import ScrollReveal from '@/components/motion/ScrollReveal'

export function Ecosystem() {
  return (
    <section className="py-20 bg-gray-800 text-white">
      <div className="container mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="text-4xl font-bold mb-8">
            Join an Ecosystem That Keeps Giving
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Be part of a community where your success drives collective rewards
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
