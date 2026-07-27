import { Hero } from "@/components/sections/hero"
import { SocialProof } from "@/components/sections/social-proof"
import { Services } from "@/components/sections/services"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { FAQ } from "@/components/sections/faq"
import { CTAFinal } from "@/components/sections/cta-final"

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Services />
      <Process />
      <Testimonials />
      <WhySaficlean />
      <FAQ />
      <CTAFinal />
    </>
  )
}
