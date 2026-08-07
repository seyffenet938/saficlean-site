import { Hero } from "@/components/sections/hero"
import { SocialProof } from "@/components/sections/social-proof"
import { Services } from "@/components/sections/services"
import { Process } from "@/components/sections/process"
import { Testimonials } from "@/components/sections/testimonials"
import { WhySaficlean } from "@/components/sections/why-saficlean"
import { FAQ } from "@/components/sections/faq"
import { CTAFinal } from "@/components/sections/cta-final"
import { getReviews } from "@/lib/reviews"

export default async function Home() {
  const reviews = await getReviews()

  return (
    <>
      <Hero />
      <SocialProof />
      <Services />
      <Process />
      <Testimonials googleReviews={reviews} />
      <WhySaficlean />
      <FAQ />
      <CTAFinal />
    </>
  )
}
