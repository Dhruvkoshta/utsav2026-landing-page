import React, { useState } from 'react';
import type { SetStateAction } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ShinyText from '@/components/ShinyText';

const items = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format',
    title: 'Misty Mountain Majesty',
    description:
      'A breathtaking view of misty mountains shrouded in clouds, creating an ethereal landscape.',
    tags: ['Misty', 'Mountains', 'Clouds', 'Ethereal', 'Landscape'],
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1548192746-dd526f154ed9?q=80&w=1200&auto=format',
    title: 'Winter Wonderland',
    description:
      "A serene winter scene with snow-covered trees and mountains, showcasing nature's pristine beauty.",
    tags: ['Winter', 'Snow', 'Trees', 'Mountains', 'Serene'],
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format',
    title: 'Autumn Mountain Retreat',
    description:
      'A cozy cabin nestled in the mountains, surrounded by the vibrant colors of autumn foliage.',
    tags: ['Autumn', 'Cabin', 'Mountains', 'Foliage', 'Cozy'],
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1584043204475-8cc101d6c77a?q=80&w=1200&auto=format',
    title: 'Tranquil Lake Reflection',
    description:
      'A calm mountain lake perfectly reflecting the surrounding peaks and sky, creating a mirror-like surface.',
    tags: ['Lake', 'Reflection', 'Mountains', 'Tranquil', 'Mirror'],
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1200&auto=format',
    title: 'Misty Mountain Peaks',
    description:
      "Majestic mountain peaks emerging from a sea of clouds, showcasing nature's grandeur.",
    tags: ['Misty', 'Peaks', 'Clouds', 'Majestic', 'Nature'],
  },
];

const article = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

type Item = {
  id: number;
  url: string;
  title: string;
  description: string;
  tags?: string[];
};

interface GalleryProps {
  items: Item[];
  setIndex: React.Dispatch<SetStateAction<number>>;
  index: number | undefined;
}

function Gallery({ items, setIndex, index }: GalleryProps) {
  return (
    <>
    <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mb-30 text-center font-cinzel text-3xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 drop-shadow-[0_0_15px_rgba(147,51,234,0.3)] sm:text-4xl"
      >
        <ShinyText
          text="Gallery"
          speed={4}
          color="rgba(209,213,219,0.8)"
          shineColor="#ffffff"
          spread={120}
          yoyo
        />
      </motion.h2>
    <div className="w-full md:w-fit mx-auto gap-2 flex flex-col md:flex-row pb-20 pt-10">
       
      {items.slice(0, 5).map((item: Item, i: number) => (
        <motion.div
          whileTap={{ scale: 0.95 }}
          className={`rounded-xl relative shrink-0 overflow-hidden transition-all ease-in-linear duration-500 origin-center ${
            index === i 
              ? 'w-full h-72 md:w-150 lg:w-200 md:h-125' 
              : 'w-full h-16 md:w-20 md:h-125'
          }`}
          key={i}
          onClick={() => setIndex(i)}
          onMouseEnter={() => setIndex(i)}
        >
          <motion.img
            src={item.url}
            className={`${
              index === i ? 'cursor-default' : 'cursor-pointer'
            } w-full rounded-xl h-full object-cover`}
          />
          <AnimatePresence mode="wait">
            {index === i && (
              <motion.article
                variants={article}
                initial="hidden"
                animate="show"
                className="absolute flex rounded-xl flex-col justify-end h-full top-0 p-3 md:p-5 space-y-2 overflow-hidden bg-linear-to-t dark:from-neutral-900/60 from-neutral-100/60 from-20% to-transparent to-80%"
              >
                <motion.h1
                  variants={article}
                  className="text-xl md:text-2xl font-semibold text-white"
                >
                  {item.title}
                </motion.h1>
                <motion.p
                  variants={article}
                  className="leading-[120%] text-sm md:text-base text-white/80"
                >
                  {item.description}
                </motion.p>
              </motion.article>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
        </>

  );
}

export default function GallerySection() {
  const [index, setIndex] = useState(2);

  return (
    <section className="relative py-16 px-4">
      <Gallery items={items} index={index} setIndex={setIndex} />
    </section>
  );
}
