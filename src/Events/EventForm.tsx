/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {  useState,useContext, useEffect } from "react";
import userContext from "../userContext";
import { useNavigate, Link } from 'react-router-dom';
import { MouseClickEvent, EventFormComponent, CreateOrEditEvent, Event } from "../types";
import Alert from "../Shared/Alert";
import PlusOneApi from "../api";
import LoadingScreen from "../Shared/LoadingScreen";
import DisplayImages from "../Shared/DisplayImages";
import { DatePicker } from 'antd'
import dayjs from 'dayjs'
import "antd/lib/button/style/token"

/**
 *  Component, Form for creating or editing event.
 *
 * Props:
 * updateOrCreate: Function updates or create a event. 
 * eventId: Id for the event if any -> default null.
 * 
 * State: 
 *  event: event object if applicable.
 *  isLoading: Loading state to display loading page while chat is being fetched.
 *  errors: Array of error objects create when submitting an event.
 *  formData: data input from form. Matches initial state fields
 * 
 * Context: 
 *  user: userContext
 * 
 * RouteList -> EventForm
 */
function EventForm({ updateOrCreate, eventId = null }: EventFormComponent) {
    const user = useContext(userContext)!;
    const [event, setEvent] = useState<Event | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);    
    const [errors, setErrors] = useState<null | Array<string>>(null);
    const navigate = useNavigate();
    
    /** useEffect: Gets event if updating. */
    useEffect(function () {
        async function getEvent() {
            setIsLoading(true);
            if (eventId) {
                try {
                    const fetchedEvent = await PlusOneApi.getEvent(eventId)
                    setEvent(fetchedEvent);
                } catch (err) {
                    console.error(err);
                }
            }            
        setIsLoading(false);
    }
    getEvent();
    }, []);

    const initialState: CreateOrEditEvent = {
        title: event?.title || "",
        description: event?.description || "",
        dateTime: event?.dateTime || "",
        city: event?.city || "",
        state: event?.state || "",
        removeImages: [],
        images: [],
        payment:  event?.payment || 0
    }

    const [formData, setFormData] = useState<CreateOrEditEvent>(initialState);

    /** handleChange: Handles change of form field.*/
    function handleChange(
        evt : React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) : void {
        const { name , value } = evt.target as HTMLInputElement
        setFormData(oldData => ({...oldData ,[name]:value}));
    }

    /** handleDate: Converts Date to string object.*/
    function handleDate(date: dayjs.Dayjs) :void {
        const formattedDate = date.toString()
        setFormData(oldData => ({...oldData ,["dateTime"]:formattedDate}));
    }

    /** handleSubmit: Handles submission of form. Creates or updates event.*/
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) :Promise<void> {
        evt.preventDefault();
        try {
            setIsLoading(true)
            if(!eventId) delete formData.removeImages
            await updateOrCreate(formData);
            setFormData(initialState);
            eventId ? navigate(`/events/${eventId}`) : navigate("/my-events")
        } catch (err) {
            setIsLoading(false)
            if (err instanceof Array) {  
                setErrors(err);
            }
        }
    }

    const disabledDate = (current : any) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
    };


    /** handleFile: handles file field of form*/
    function handleFile(evt: any) {
        const files = Array.from(evt.target.files)
        setFormData(oldData => ({ ...oldData, "images": files }));
    }

    /** handleFile: For updates, allows to click to remove Image from user*/
    function removeImage(evt: MouseClickEvent):void {
        const element = evt.target.id
        setFormData(oldData => ({ 
            ...oldData, 
            "removeImages": [...oldData.removeImages!, element]}
        ))
    }
    
    return (isLoading || (!user) ? <LoadingScreen/>
  : (
        <div className="mx-auto mt-3 h-fill" style={{ width: '400px' }}>
            <div>
                {errors?.length && <Alert alerts={errors} type="warning" />}
            </div>
            <form 
                onSubmit={handleSubmit}
                className="grid auto-rows-auto grid-cols-2 gap-4">

                <div className="form-control col-span-2">
                <label 
                    className="label-text font-semibold mb-1"
                    htmlFor="title">Title</label>
                    <input 
                        className="input input-bordered input-primary"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-control col-span-1">
                <label 
                    className="label-text font-semibold mb-1"
                    htmlFor="city">City</label>
                <input 
                    className="input input-bordered input-primary"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required

                />
                </div>

                <div className="form-control col-span-1">
                <label
                    className="label-text font-semibold mb-1"
                    htmlFor="state">State</label>
                <input 
                    className="input input-bordered input-primary"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />
                </div>


                <div className="form-control col-span-2">
                <label 
                    className="label-text font-semibold mb-1"
                    htmlFor="age">Date</label>
                    <DatePicker
                        className="input input-bordered input-primary"
                        format="YYYY-MM-DD HH:mm:ss"
                        disabledDate={disabledDate}
                        variant="borderless"
                        showTime={{ defaultValue:  dayjs('00:00:00', 'HH:mm:ss')}}
                        onChange={(date) => handleDate(date)}
                    />
                </div>

                <div className="form-control col-span-2">
                <label 
                    className="label-text font-semibold mb-1"
                    htmlFor="description">Description</label>
                <textarea
                    maxLength={250}
                    className="textarea textarea-primary text-sm input-primary h-40 resize-none"
                    name="description"
                    value={formData.description}
                    onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>,) => handleChange(evt)}
                    required
                />
                    <div className="label">
                        <span></span>
                        <span className="label-text">{`${250 - formData.description.length}`}</span>
                    </div>
                </div>
                { event &&
                <div className="col-span-2">
                <DisplayImages 
                    key={String(formData.removeImages)}
                    images={user?.profile?.images} 
                    removed={formData.removeImages}
                    removeImage={removeImage}/>
                </div>
                }

                <div className="form-control col-span-2 mt-4">
                <label 
                    className="label-text font-semibold mb-1" 
                    htmlFor="Image">Images</label>
                <input 
                    className="file-input file-input-secondary"
                    type="file"
                    multiple
                    name="image"
                    onChange={(evt): void => handleFile(evt)}
                />
                </div>
               
                <Link 
                className="btn btn-outline mt-3 col-span-1" to={`/profile/${user.email}`}>
                Cancel</Link> 
                <button 
                type="submit" 
                className="btn btn-primary  mt-3 col-span-1">
                {event ? "Edit" : "Create Event"}</button>

            </form>
        </div>
     ));
}
export default EventForm;