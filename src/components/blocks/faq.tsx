import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Context Management",
    questions: [
      {
        question: "How does NIO OS handle context persistence across agent sessions?",
        answer:
          "NIO OS maintains persistent memory for AI agents, allowing them to retain context, learn from interactions, and evolve their decision-making capabilities across multiple sessions.",
      },
      {
        question: "Can I integrate NIO OS with my existing agent workflows?",
        answer:
          "Yes, NIO OS provides seamless integration APIs that allow you to connect your existing agent workflows with our advanced context management system for enhanced intelligence.",
      },
      {
        question: "How does context memory improve agent performance?",
        answer:
          "Context memory enables agents to learn from past interactions, adapt to user preferences, and make more informed decisions, resulting in more intelligent and reliable agent behavior.",
      },
    ],
  },
  {
    title: "Agent Workflows",
    questions: [
      {
        question: "What types of agents work best with NIO OS?",
        answer:
          "NIO OS works with any AI agent that benefits from persistent context, including chatbots, autonomous systems, recommendation engines, and complex workflow agents.",
      },
      {
        question: "How do I set up context management for my agents?",
        answer:
          "NIO OS provides simple setup workflows and comprehensive documentation to help you integrate context management into your existing agent architecture quickly and easily.",
      },
    ],
  },
  {
    title: "Support & Features",
    questions: [
      {
        question: "What level of context storage do I need?",
        answer:
          "Context storage needs vary by use case. Our free tier provides basic storage for simple workflows, while professional and enterprise tiers offer advanced and unlimited context management.",
      },
      {
        question: "How secure is my context data with NIO OS?",
        answer:
          "NIO OS employs enterprise-grade security with encrypted storage, access controls, and compliance features to ensure your context data remains private and secure.",
      },
    ],
  },
];

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Got Questions?
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              If you can't find what you're looking for,{" "}
              <Link href="/contact" className="underline underline-offset-4">
                get in touch
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
