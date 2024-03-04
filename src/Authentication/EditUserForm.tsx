import React, {  useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import userContext from "../userContext";
import { Link} from "react-router-dom";
import {UpdateUserComponent } from "../types";
import Alert from "../Shared/Alert";

/**
 *  Component, Form for editing User details.
 *
 * Props:
 * updateUser: Function updates user.
 * deleteUser: Function deletes user.
 * 
 * State: 
 *  modalShown: Boolean for showing delete user warning modal.
 *  isLoading: Loading state to display loading page while chat is being fetched.
 *  errors: Array of error objects create when submitting an user.
 *  formData: data input from form. Matches initial state fields.
 * 
 * Context: 
 *  user: userContext
 * 
 * RouteList -> UserEditForm
 */
function UserEditForm({ updateUser, deleteUser }: UpdateUserComponent ) {
    const {phoneNumber ,firstName, lastName, email } = useContext(userContext)!;

    const initialState = {
        phoneNumber: phoneNumber || "",
        password: "",
        newPassword: "",
        repeatNewPassword: "",
        firstName: firstName || "",
        lastName: lastName || "",
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [modalShown, setModal] = useState<boolean>(false);
    const [errors, setErrors] = useState<null | Array<string>>(null);


    /** handleChange: Handles change of form field.*/
    function handleChange(evt : React.FormEvent<HTMLInputElement>) {
    const { name , value } = evt.target as HTMLInputElement
    setFormData(oldData => ({...oldData ,[name]:value}));
    }

    /** handleDelete: Handles deletion of a user. */
    async function handleDelete(evt : React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
         try {
                await deleteUser();
                navigate("/");
            } catch (err) {
                if (err instanceof Array) {  
                    setErrors(err);
                }   
            }
    }

    /** toggleModal: Toggles delete user modal visibility. */
    function toggleModal(evt : React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        setModal((modal) => !modal)
    }

    /** handleSubmit: Handles submission of form. Creates or updates profile.*/
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        if(formData.newPassword 
            && (formData.newPassword !== formData.repeatNewPassword)) {
            setErrors(["New passwords must match "])
        } else {
            try {
                await updateUser(formData);
                setFormData(initialState);
                navigate(`/profile/${email}`);
            } catch (err) {
                if (err instanceof Array) {  
                    setErrors(err);
                }   
            }
        }
    }

    return (
    <div className="mt-16 w-screen h-screen bg-base-200 flex flex-col items-center justify-start">

        <h2 className="text-3xl font-bold">Edit User Info</h2>

        <form 
            onSubmit={handleSubmit} 
            className="grid auto-rows-auto grid-cols-2 gap-4">
                <div className="w-full col-span-2">
                    {(errors && errors!.length) && <Alert alerts={errors!} type="warning" />}
                </div>
            
            <div className="form-control">
            <label 
                className="label-text font-semibold mb-1"
                htmlFor="firstName">First Name</label>
            <input 
                className="input input-bordered input-primary"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            </div>

            <div className="form-control">
            <label className="label-text font-semibold mb-1" htmlFor="lastName">Last Name</label>
            <input type="lastName"
                className="input input-bordered input-primary "
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            </div>

            <div className="form-control col-span-2">
            <label 
                className="label-text font-semibold mb-1"
                htmlFor="phoneNumber">Phone #</label>
            <input className="input input-bordered input-primary"
                placeholder="(optional)"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
            />
            </div>

            <div className="form-control col-span-2">
                <label 
                    className="label-text font-semibold mb-1"
                    htmlFor="password">Old Password</label>
                <input type="password"
                    className="input input-bordered input-primary"                    
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>

            <div className="form-control col-span-2">
                <label 
                    className="label-text font-semibold mb-1"
                    htmlFor="password">New Password</label>
                <input type="password"
                    className="input input-bordered input-primary"                    
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                />
            </div>

            <div className="form-control col-span-2">
                <label 
                    className="label-text font-semibold mb-1"
                    htmlFor="password">Repeat New Password</label>
                <input type="password"
                    className="input input-bordered input-primary"                    
                    name="repeatNewPassword"
                    value={formData.repeatNewPassword}
                    onChange={handleChange}
                />
            </div>

            <button 
                type="submit" 
                className="btn btn-primary mt-3 col-span-2">
            Edit</button>
            <Link className="btn btn-outline mt-3 col-span-2" to={`/`}>Cancel</Link>
        </form>
        <form onSubmit={toggleModal}>
            <button 
            type="submit"
            className="btn btn-error mt-3 col-start-2">
            Delete User</button>
        </form>
        
        <div className={`modal ${modalShown ? "opacity-100 pointer-events-auto" : ""}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">You've entered the danger zone!</h3>
                <p className="py-4">Deleting a profile is permanent. </p>
                <p>All user data will be lost.</p>
                <div className="modal-action justify-between">
                    <form onSubmit={handleDelete}> 
                        <button className="btn btn-error">Delete User</button>
                    </form>
                    <form method="dialog" onSubmit={toggleModal}>
                        <button className="btn w-40">Close</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}


export default UserEditForm;