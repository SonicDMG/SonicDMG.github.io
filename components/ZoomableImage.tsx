'use client';

import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

interface ZoomableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function ZoomableImage({ src, alt, width = 800, height = 600 }: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span
        className="block cursor-zoom-in my-8 rounded-lg overflow-hidden border border-border hover:opacity-90 transition-opacity mx-auto max-w-fit"
        onClick={() => setOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </span>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src, alt }]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
      />
    </>
  );
}

// Made with Bob
