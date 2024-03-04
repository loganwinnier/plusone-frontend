import {  MouseClickEvent, ProfileImagesComponent } from "../types";
import { useState } from "react";

/**
 *  Component, Displays images in  grid format for viewing and deleting.
 *
 * Props:
 *  images: Array of Image objects.
 *  removed: Array of removed images url.
 *  removeImage: Function to remove a image from the grid.
 * 
 * State: 
 *  toBeDisplayed: Array of url strings to display in the grid
 *  idx: index position
 * 
 * ProfileForm, EventForm, Profile -> DisplayImages
 */
function DisplayImages({ images = [], removed = [], removeImage=null } : ProfileImagesComponent) {
    const [toBeDisplayed, setDisplayed] = useState<Array<string | null>>([])
    const [idx, setIdx] = useState<number>(0)

    if( idx < 6) {
                if (images[idx] && !removed.includes(images[idx].url)) {
                        setDisplayed(display => ([...display, images[idx].url]))
                } else {
                    setDisplayed(display => ([...display, null])) 
                }
                setIdx(i => i+1)
            }

    if(!removeImage) {
        return (      
        <div className=" bg-base-200 grid grid-rows-2 lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-6">
            {toBeDisplayed.map((img, i) => img ? <img key={img} className={`card bg-neutral object-cover w-48 h-64`} src={`https://plus-one.s3.amazonaws.com/${img}`} alt="profile image"/> 
            : <div key={i} className="card bg-neutral object-cover w-48 h-64 opacity-15"></div>)}
        </div>)
        } 
    return  (      
        <>
        <label 
            htmlFor="remove images" 
            className="label-text font-semibold mb-1">
            Click on image to delete
        </label>
        <div className="grid grid-rows-2 grid-cols-3 gap-6">
            {toBeDisplayed.map((img, i) => img ? (
            <img
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={(evt: MouseClickEvent |any) => removeImage(evt)} 
                id={img}
                key={img} 
                className={`card bg-white-500 object-cover w-32 h-40 hover:opacity-70 hover:scale-105  hover:animate-pulse transition-all`} 
                src={`https://plus-one.s3.amazonaws.com/${img}`} 
                alt="profile image"/>)
            : <div key={i} className="card bg-neutral object-cover w-32 h-40 opacity-15"></div>)}
        </div>
        </>
    )
} 

export default DisplayImages;