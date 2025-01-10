"use client";

import React, { useState } from "react";
import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import Image from "next/image";

// Define an interface for the image
interface Image {
  title: string;
  imageUrl: string;
}

// Define the props for the Gallery component
interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => {
    setActiveIndex((prevState) =>
      prevState === images.length - 1 ? 0 : prevState + 1
    );
  };

  const prev = () => {
    setActiveIndex((prevState) => (prevState === 0 ? 0 : prevState - 1));
  };

  const itemTemplate = (item: Image) => {
    return (
      <div style={{ position: "relative", width: "100%", height: "360px" }}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  };

  const thumbnailTemplate = (item: Image) => {
    return (
      <div style={{ position: "relative", width: "120px", height: "80px" }}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  };

  return (
    <div className="card">
      <div className="mb-3">
        <Button icon="pi pi-minus" onClick={prev} />
        <Button
          icon="pi pi-plus"
          onClick={next}
          className="p-button-secondary ml-2"
        />
      </div>

      <Galleria
        value={images}
        activeIndex={activeIndex}
        onItemChange={(e) => setActiveIndex(e.index)}
        numVisible={5}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        style={{ maxWidth: "640px" }}
      />
    </div>
  );
};

export default Gallery;
