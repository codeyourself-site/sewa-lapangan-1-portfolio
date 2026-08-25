import { HeroStack } from "@/app/components/hero-stack";
import { Intro } from "@/app/components/intro";
import { BookingSteps } from "@/app/components/booking-steps";
import { FieldListing } from "@/app/components/field-listing";
import { HowItWorks } from "@/app/components/how-it-works";
import { Testimonials } from "@/app/components/testimonials";
import { Faq } from "@/app/components/faq";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroStack />
      <div className="relative z-10 flex flex-col">
        <div className="-mt-[100svh]">
          <Intro />
        </div>
        <BookingSteps />
        <FieldListing />
        <HowItWorks />
        <Testimonials />
        <Faq />
      </div>
    </main>
  );
}
