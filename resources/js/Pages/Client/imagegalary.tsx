import React from 'react';
import { Galleria } from 'primereact/galleria';

interface AutoPlayDemoProps {
    images: string[];
}

const ImageGallery: React.FC<AutoPlayDemoProps> = ({ images }) => {
    const responsiveOptions = [
        {
            breakpoint: '991px',
            numVisible: 4
        },
        {
            breakpoint: '767px',
            numVisible: 3
        },
        {
            breakpoint: '575px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item: string) => {
        const src = item.length > 0 ? `/storage/${item.replace("public/", "")}` : "fallback_image_url.jpg";
        return <img src={src} className='rounded-t-md min-h-[22vh] max-h-[22vh]' alt="item" style={{ display: 'block' }} />;
    }

    const thumbnailTemplate = (item: string) => {
        const src = item.length > 0 ? `/storage/${item.replace("public/", "")}` : "fallback_image_url.jpg";
        return <img src={src} alt="thumbnail" style={{ display: 'block' ,width: '10vh', height: 'auto' }} />;
    }

    return (
            <Galleria value={images} responsiveOptions={responsiveOptions} numVisible={5} style={{ maxWidth: '400px' }} 
                item={itemTemplate} thumbnail={thumbnailTemplate} circular autoPlay transitionInterval={2000} />
    )
}

export default ImageGallery;
