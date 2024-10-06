import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';

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
        setActiveIndex(prevState => (prevState === images.length - 1 ? 0 : prevState + 1));
    };

    const prev = () => {
        setActiveIndex(prevState => (prevState === 0 ? 0 : prevState - 1));
    };

    const itemTemplate = (item: Image) => {
        return <img src={item.imageUrl} alt={item.title} style={{ width: '100%', display: 'block' }} />;
    };

    const thumbnailTemplate = (item: Image) => {
        return <img src={item.imageUrl} alt={item.title} style={{ display: 'block' }} />;
    };

    return (
        <div className="card">
            <div className="mb-3">
                <Button icon="pi pi-minus" onClick={prev} />
                <Button icon="pi pi-plus" onClick={next} className="p-button-secondary ml-2" />
            </div>

            <Galleria
                value={images}
                activeIndex={activeIndex}
                onItemChange={(e) => setActiveIndex(e.index)}
                numVisible={5}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
                style={{ maxWidth: '640px' }}
            />
        </div>
    );
};

export default Gallery;
