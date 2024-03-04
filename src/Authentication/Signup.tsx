import React, {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SignupFormComponent } from "../types";
import Alert from "../Shared/Alert";

/**
 *  Component, Form for signing up an user.
 *
 * Props:
 * signup: Function for signup a user.
 * 
 * State: 
 *  errors: Array of error objects created when submitting form.
 *  formData: data input from form. Matches initial state fields
 * 
 * RouteList -> LoginForm
 */
function SignupForm({ signup }: SignupFormComponent) {

    const initialState = {
        phoneNumber: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    };

    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState<null | Array<string>>(null);


    /** handleChange: Handles change of form field.*/
    function handleChange(evt : React.FormEvent<HTMLInputElement>) {
        const { name , value } = evt.target as HTMLInputElement
        setFormData(oldData => ({...oldData ,[name]:value}));
    }

    /** handleSubmit: Handles submission of form. Creates or updates profile.*/
    async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
        evt.preventDefault();
        try {
            await signup(formData);
            setFormData(initialState);
            navigate("/create-profile");
        } catch (err) {
            console.log(err)
            if (err instanceof Array) {
            setErrors(err);
            }
        }
    }

  return (  
    <div className="mt-16 w-screen h-fill flex flex-col items-center">

        <h2 className="text-3xl font-bold">Create an Account</h2>

        <form onSubmit={handleSubmit} 
            className="grid auto-rows-auto grid-cols-2 gap-4">
                <div className="col-span-2">
                    {(errors && errors!.length) && <Alert alerts={errors!} type="warning" />}
                </div>
            
            <div className="form-control">
            <label 
                className="label-text font-semibold mb-1"
                htmlFor="firstName">First Name</label>
            <input type="firstName"
                className="input input-bordered input-primary"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
            </div>

            <div className="form-control">
            <label className="label-text font-semibold mb-1" htmlFor="lastName">Last Name</label>
            <input type="lastName"
                className="input input-bordered input-primary "
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
            </div>

            <div className="form-control col-span-2">
            <label 
                className="label-text font-semibold mb-1"
                htmlFor="email">Email</label>
            <input type="email"
                className="input input-bordered input-primary"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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

            <div className="form-control col-span-2 ">
            <label 
                className="label-text font-semibold mb-1 "
                htmlFor="password">Password</label>
            <input type="password"
                className="input input-bordered input-primary "
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            </div>

            <button 
                type="submit" 
                className="btn btn-primary mt-3 col-span-2">Sign up</button>

        </form>
    </div>

  );
}


export default SignupForm;