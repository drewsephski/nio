import Image from 'next/image';
import Link from 'next/link';

import { ChevronRight } from 'lucide-react';

import { DashedLine } from '../dashed-line';
import { Card, CardContent } from '../ui/card';

const items = [
  {
    title: 'Purpose-built for product development',
    image: '/features/triage-card.svg',
  },
  {
    title: 'Manage projects end-to-end',
    image: '/features/overview-card.svg',
  },
  {
    title: 'Build momentum and healthy habits',
    image: '/features/cycle-card.svg',
  },
];

export const Features = () => {
  return (
    <section id="feature-modern-teams" className="pb-28 lg:pb-32">
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="absolute bg-muted px-3 font-mono text-sm font-medium tracking-wide text-muted-foreground max-md:hidden">
            MEASURE TWICE. CUT ONCE.
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 grid max-w-5xl gap-3 lg:mt-24 lg:grid-cols-2">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
            Made for modern product teams
          </h2>
          <p className="font-medium leading-snug text-muted-foreground">
            Mainline is built on the habits that make the best product teams
            successful: staying focused, moving quickly, and always aiming for
            high-quality work.
          </p>
        </div>

        {/* Features Card */}
        <Card className="mt-8 md:mt-12 lg:mt-20">
          <CardContent className="flex p-0 max-md:flex-col">
            {items.map((item, i) => (
              <div key={i} className="flex flex-1 max-md:flex-col">
                <div className="flex-1 p-4 pe-0! md:p-6">
                  <div className="relative aspect-[1.28/1] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.title} interface`}
                      fill
                      className="object-cover object-left-top ps-4 pt-2"
                    />
                  </div>
                  <Link
                    href="#"
                    className={
                      'group flex items-center justify-between gap-4 pe-4 pt-4 md:pe-6 md:pt-6'
                    }
                  >
                    <h3 className="text-2xl font-semibold leading-tight tracking-tight">
                      {item.title}
                    </h3>
                    <div className="rounded-full border p-2">
                      <ChevronRight className="size-6 transition-transform group-hover:translate-x-1 lg:size-9" />
                    </div>
                  </Link>
                </div>
                {i < items.length - 1 && (
                  <div className="relative hidden md:block">
                    <DashedLine orientation="vertical" />
                  </div>
                )}
                {i < items.length - 1 && (
                  <div className="relative block md:hidden">
                    <DashedLine orientation="horizontal" />
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
