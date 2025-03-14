import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { SigninInput, SignupInput } from "@abhishek85805/medium";
import {BACKEND_URL} from "./../config";

function Auth({type}: {type: "signin" | "signup"}) {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    const sendRequest = async () => {
        try {
            const signinInputs: SigninInput= {
                email: postInputs.email,
                password: postInputs.password
            }
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, type==="signup" ? postInputs : signinInputs);
            const jwt = response.data.jwt;
            localStorage.setItem('token', jwt);
            navigate('/blogs');
        } catch (error) {
            console.log("Error while signing up user", error);
        }
    }
  return (
    <div>
        <h1 className="text-3xl font-bold text-center pb-[10px]">{type==="signup" ? "Create An Account" : "Sign In To Your Account"}</h1>
        <p className="text-center text-slate-500 pb-[25px]">
            {type==="signup" ? "Already have an account" :"Don't have an account"} <span className="cursor-pointer underline" onClick={()=>{type==="signup" ? navigate('/signin'): navigate('/signup')}}>{type==="signup" ? "Signin" : "Signup"}</span>
        </p>
        <div>
            <div className={type==="signin" ? "hidden" : "block"}>
                <LabelledInput 
                    label="Username"
                    placeholder="Enter your username"
                    onChange={(e) => {
                        setPostInputs({
                            ...postInputs,
                            name: e.target.value
                        });
                    }}
                />
            </div>

            <LabelledInput
                label="Email"
                placeholder="m@example.com"
                onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    });
                }}
            />

            <LabelledInput
                label="Password"
                placeholder="Enter your password"
                type="password"
                onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    });
                }}
            />

            <button 
            className="bg-black text-white w-full py-[4px] rounded cursor-pointer"
            onClick={sendRequest}
            >
                {type === "signup" ? "Signup" : "Signin"}
            </button>
        </div>
    </div>
  )
}

interface LabelledInputType {
    label: string;
    placeholder: string;
    type?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function LabelledInput({label, placeholder, type, onChange}: LabelledInputType){
    return (
        <div className="flex flex-col pb-[15px]">
            <label htmlFor={label} className="font-semibold pb-[5px]">{label}</label>
            <input
             id={label} 
             type={type || "text"} 
             placeholder={placeholder}
             onChange={onChange}
             className="border-[1px] border-slate-200 rounded pl-[5px] py-[3px]"
            />
        </div>
    )
}

export default Auth