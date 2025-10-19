import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const About = () => {
  return (
    <section className="container mt-10 flex max-w-5xl flex-col-reverse gap-8 md:mt-14 md:gap-14 lg:mt-20 lg:flex-row lg:items-end">
      {/* Images Left - Text Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <ImageSection
          images={[
            { src: "/about/1.webp", alt: "Context management interface" },
            { src: "/about/2.webp", alt: "Agent workflow management" },
          ]}
          className="xl:-translate-x-10"
        />

        <TextSection
          title="The vision"
          paragraphs={[
            "We started building NIO OS in 2023 to solve the fundamental challenge of context management in AI agents. Every interaction, decision, and evolution point has been designed from the ground up — with no technical debt or legacy constraints. We are purpose-built to power seamless context management for the next generation of intelligent agents.",
            "We are 100% founder and team-owned, focused solely on context management innovation. Over time, this platform will become the standard for AI context management, but for now, we're focused on delivering reliable context solutions for agent builders.",
            "If you're interested in building the future of AI context management, our platform provides the foundation for intelligent agent workflows.",
          ]}
          ctaButton={{
            href: "/contact",
            text: "Learn more",
          }}
        />
      </div>

      {/* Text Left - Images Right */}
      <div className="flex flex-col gap-8 lg:gap-16 xl:gap-20">
        <TextSection
          paragraphs={[
            "At NIO OS, we are dedicated to transforming the way AI agents manage and utilize context. Our mission is to provide seamless context management that enables agents to operate with unprecedented intelligence and reliability. We'll stop at nothing to give AI systems the contextual awareness they need to make autonomous decisions across complex workflows.",
            "We're context-obsessed — investing the time to understand every aspect of agent workflows so that we can help them operate with unprecedented intelligence and reliability. We're all in this together because when AI agents succeed with proper context management, so do we.",
          ]}
        />
        <ImageSection
          images={[
            { src: "/about/3.webp", alt: "Intelligent context processing" },
            { src: "/about/4.webp", alt: "Agent context collaboration" },
          ]}
          className="hidden lg:flex xl:translate-x-10"
        />
      </div>
    </section>
  );
};

export default About;

interface ImageSectionProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageSection({ images, className }: ImageSectionProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[2/1.5] overflow-hidden rounded-2xl"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

interface TextSectionProps {
  title?: string;
  paragraphs: string[];
  ctaButton?: {
    href: string;
    text: string;
  };
}

export function TextSection({
  title,
  paragraphs,
  ctaButton,
}: TextSectionProps) {
  return (
    <section className="flex-1 space-y-4 text-lg md:space-y-6">
      {title && <h2 className="text-foreground text-4xl">{title}</h2>}
      <div className="text-muted-foreground max-w-xl space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      {ctaButton && (
        <div className="mt-8">
          <Link href={ctaButton.href}>
            <Button size="lg">{ctaButton.text}</Button>
          </Link>
        </div>
      )}
    </section>
  );
}
