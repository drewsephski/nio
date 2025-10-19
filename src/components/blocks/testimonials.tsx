import React from "react";
import Image from "next/image";

import { ArrowRight } from "lucide-react";

import { DashedLine } from "../dashed-line";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const items = [
  {
    quote: "Arc Browser",
    author: "Modern Browser",
    role: "AI-Powered",
    company: "Fast & Private",
    image: "/logos/arc.svg",
  },
  {
    quote: "Asana",
    author: "Project Management",
    role: "Team Collaboration",
    company: "Work Management",
    image: "/logos/asana.svg",
  },
  {
    quote: "Claude AI",
    author: "AI Assistant",
    role: "Anthropic Model",
    company: "Advanced Reasoning",
    image: "/logos/claude.svg",
  },
  {
    quote: "Confluence",
    author: "Knowledge Base",
    role: "Documentation",
    company: "Team Wiki",
    image: "/logos/confluence.svg",
  },
  {
    quote: "Descript",
    author: "Video Editing",
    role: "AI-Powered",
    company: "Content Creation",
    image: "/logos/descript.svg",
  },
  {
    quote: "Google Drive",
    author: "Cloud Storage",
    role: "File Sharing",
    company: "Collaboration",
    image: "/logos/drive.svg",
  },
  {
    quote: "Microsoft Excel",
    author: "Spreadsheet",
    role: "Data Analysis",
    company: "Business Intelligence",
    image: "/logos/excel.svg",
  },
  {
    quote: "Jira",
    author: "Issue Tracking",
    role: "Agile Development",
    company: "Project Management",
    image: "/logos/jira.svg",
  },
  {
    quote: "Mercury",
    author: "Banking Platform",
    role: "Startup Banking",
    company: "Financial Services",
    image: "/logos/mercury.svg",
  },
  {
    quote: "Monday.com",
    author: "Work OS",
    role: "Project Management",
    company: "Team Collaboration",
    image: "/logos/monday.svg",
  },
  {
    quote: "Monzo",
    author: "Digital Bank",
    role: "Mobile Banking",
    company: "Financial Services",
    image: "/logos/monzo.svg",
  },
  {
    quote: "Notion",
    author: "All-in-One Workspace",
    role: "Notes & Docs",
    company: "Knowledge Management",
    image: "/logos/notion.svg",
  },
  {
    quote: "OpenAI",
    author: "AI Research",
    role: "Language Models",
    company: "GPT Technology",
    image: "/logos/openai.svg",
  },
  {
    quote: "Perplexity AI",
    author: "AI Search",
    role: "Answer Engine",
    company: "Intelligent Search",
    image: "/logos/perplexity.svg",
  },
  {
    quote: "Ramp",
    author: "Corporate Cards",
    role: "Expense Management",
    company: "Financial Operations",
    image: "/logos/ramp.svg",
  },
  {
    quote: "Raycast",
    author: "Productivity Tool",
    role: "Spotlight Alternative",
    company: "Mac Efficiency",
    image: "/logos/raycast.svg",
  },
  {
    quote: "Retool",
    author: "Internal Tools",
    role: "Low-Code Platform",
    company: "Application Development",
    image: "/logos/retool.svg",
  },
  {
    quote: "Watershed",
    author: "Climate Platform",
    role: "Carbon Accounting",
    company: "Sustainability",
    image: "/logos/watershed.svg",
  },
  {
    quote: "Microsoft Word",
    author: "Document Editor",
    role: "Word Processing",
    company: "Office Suite",
    image: "/logos/word.svg",
  },
];

export const Testimonials = ({
  className,
  dashedLineClassName,
}: {
  className?: string;
  dashedLineClassName?: string;
}) => {
  return (
    <>
      <section className={cn("overflow-hidden py-28 lg:py-32", className)}>
        <div className="container">
          <div className="space-y-4">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
              Integrate with leading platforms
            </h2>
            <p className="text-muted-foreground max-w-md leading-snug">
              Nio OS integrates seamlessly with leading platforms and services,
              from AI assistants and productivity tools to development platforms
              and financial services.
            </p>
            <Button variant="outline" className="shadow-md">
              Explore Integrations <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="relative mt-8 -mr-[max(3rem,calc((100vw-80rem)/2+3rem))] md:mt-12 lg:mt-20">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="">
                {items.map((testimonial, index: number) => (
                  <CarouselItem
                    key={index}
                    className="xl:basis-1/3.5 grow basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] 2xl:basis-[24%]"
                  >
                    <Card className="bg-muted h-full overflow-hidden border-none">
                      <CardContent className="flex h-full flex-col p-0">
                        <div className="relative h-[200px] lg:h-[240px]">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.quote}
                            fill
                            className="object-contain object-center p-8"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between gap-6 p-6">
                          <div className="space-y-2">
                            <h3 className="font-display text-xl font-semibold md:text-2xl">
                              {testimonial.quote}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {testimonial.author}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <div className="text-primary text-sm font-medium">
                              {testimonial.role}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex gap-3">
                <CarouselPrevious className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
                <CarouselNext className="bg-muted hover:bg-muted/80 static size-14.5 translate-x-0 translate-y-0 transition-colors [&>svg]:size-6 lg:[&>svg]:size-8" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>
      <DashedLine
        orientation="horizontal"
        className={cn("mx-auto max-w-[80%]", dashedLineClassName)}
      />
    </>
  );
};
