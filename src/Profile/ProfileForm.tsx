import React, {  useState,useContext } from "react";
import userContext from "../userContext";
import { useNavigate, Link } from 'react-router-dom';
import {InitialProfile, MouseClickEvent, ProfileFormComponent } from "../types";
import Alert from "../Shared/Alert";
import DisplayImages from "../Shared/DisplayImages";
import LoadingScreen from "../Shared/LoadingScreen";

/**
 *  Component, Form for creating or editing profile.
 *
 * Props:
 * updateOrCreate: Function updates or creates a profile. 
 * eventId: Id for the event if any -> default null.
 * 
 * State: 
 *  isLoading: Loading state to display loading page while chat is being fetched.
 *  errors: Array of error objects created when submitting an profile.
 *  formData: data input from form. Matches initial state fields
 * 
 * Context: 
 *  user: userContext
 * 
 * RouteList -> ProfileForm
 */
function ProfileForm({ updateOrCreate, editing }: ProfileFormComponent) {
    const user = useContext(userContext)!;
        
    const initialState: InitialProfile = {
        bio: user.profile?.bio || "",
        age: user.profile?.age || 0,
        gender: user.profile?.gender || "",
        city: user.profile?.city || "",
        state: user.profile?.state || "",
        removeImages: [],
        images: [],
        range:user.profile?.range || 1
    };
        
    const navigate = useNavigate();
    const [formData, setFormData] = useState<InitialProfile>(initialState);
    const [errors, setErrors] = useState<null | Array<string>>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /** handleChange: Handles change of form field.*/
    function handleChange(evt : React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name , value } = evt.target as HTMLInputElement
        setFormData(oldData => ({...oldData ,[name]:value}));
    }

    /** handleSubmit: Handles submission of form. Creates or updates profile.*/
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setIsLoading(true)
        try {
            if(!editing) delete formData.removeImages
            await updateOrCreate(formData);
            setFormData(initialState);
            editing ? navigate(`/profile/${user.email}`) : navigate("/events")
        } catch (err) {
            if (err instanceof Array) {  
                setErrors(err);
            }
        }
        setIsLoading(false)
    }

    /** handleFile: handles file field of form*/
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleFile(evt: (any)) {
        const files = Array.from(evt.target.files)
        setFormData(oldData => ({ ...oldData, "images": files }));
    }

    /** removeImages: Adds images to removeImages formDate.  */
    function removeImage(evt: MouseClickEvent):void {
        const element = evt.target.id
        setFormData(oldData => ({ 
            ...oldData, 
            "removeImages": [...oldData.removeImages!, element]}
        ))   
        }
    
    return isLoading ? <LoadingScreen/> : (
        <div className="mx-auto mt-3 h-fill mb-4" style={{ width: '400px' }}>
            <div>
                {errors?.length && <Alert alerts={errors} type="warning" />}
            </div>
            <form 
                onSubmit={handleSubmit}
                className="grid auto-rows-auto grid-cols-2 gap-4">


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

                <div className="form-control col-span-1">
                <label 
                    className="label-text font-semibold mb-1"
                    htmlFor="gender">Gender</label>
                    <input 
                        className="input input-bordered input-primary"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-control col-span-1">
                <label 
                    className="label-text font-semibold mb-1"
                    htmlFor="age">Age</label>
                <input
                    min="18"
                    max="110"
                    type="number"
                    className="input input-bordered input-primary"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-control col-span-2">
                <label 
                    className="label-text font-semibold mb-1"
                    htmlFor="bio">Bio</label>
                <textarea
                    maxLength={250}
                    className="textarea textarea-primary text-sm input-primary h-40 resize-none"
                    name="bio"
                    value={formData.bio}
                    onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>,) => handleChange(evt)}
                    required
                />
                    <div className="label">
                        <span></span>
                        <span className="label-text">{`${250 - formData.bio.length}`}</span>
                    </div>
                </div>
                <div className="form-control col-span-2 mb-4">
                    <div className="flex justify-between">
                        <label 
                        className="label-text font-semibold mb-1"
                        htmlFor="range">Search Range:</label>
                        <p className="label-text">{`Miles: ${formData.range}`}</p>
                    </div>
                    <input 
                        type="range" 
                        name="range"
                        min="1"
                        max="100" 
                        value={formData.range}
                        onChange={handleChange}
                        className="range range-secondary" 
                        step="1" />
                    <div className="w-full flex justify-between text-xs px-2">
                        <span>1</span>
                        <span>25</span>
                        <span>50</span>
                        <span>75</span>
                        <span>100</span>
                    </div>
                </div>
                { editing &&
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
                { editing &&
                <Link 
                className="btn btn-outline mt-3 col-span-1" to={`/profile/${user.email}`}>
                Cancel</Link> }
                
                <button 
                type="submit" 
                className="btn btn-primary mt-3 col-span-1">
                {editing ? "Edit" : "Create Profile"}</button>

            </form>
        </div>
     );
}

export default ProfileForm;