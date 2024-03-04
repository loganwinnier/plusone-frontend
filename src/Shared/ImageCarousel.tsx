import { useState } from "react";
import { Image } from "../types";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from '@heroicons/react/16/solid';

/**
 * ImageCarousel: Image Carousel for cards to allow to view all images
 * 
 * Props:
 *  images: Array of images.
 * 
 * {FindEventCard, EventDetailCard, MyEventCard ,FindUserCard -> ImageCarousel
 */
function ImageCarousel({ images } : {images: Image[]}) {
    const [idx, setIdx] = useState<number>(0)

    function increment(right:boolean):unknown {
        if(right && idx +1 < images.length) {
            setIdx(prev => prev +1 )
        } else if (idx >= 0) {
             setIdx(prev => prev -1 )
        }
        return
    }

    return ( 
        <figure>
            { idx !== 0 &&
                <ArrowLeftCircleIcon 
                className="w-16 opacity-65 text-secondary absolute left-5 
                hover:opacity-80 hover:scale-110 transition-all  active:scale-90"
                onClick={() => increment(false)}/>
            }
            <img 
                className="bg-base-200 object-cover w-full 
                min-h-[28rem] max-h-[28rem] min-w-[32rem] max-w-[32rem]"
                src={`https://plus-one.s3.amazonaws.com/${images[idx].url}`} 
                alt={`${images[idx].id}`}
            />
            {
                idx !== images.length -1 &&
                <ArrowRightCircleIcon 
                    className="w-16 opacity-65 text-secondary absolute right-5 
                    hover:opacity-80 hover:scale-110 transition-all active:scale-90"
                    onClick={() => increment(true)}/> 
            }
        
        </figure> )

  

}
export default ImageCarousel;