'use client';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';


interface FormData {
    username: string;
    password: string;
}

const SigninForm: React.FC = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    console.log({ session, status });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    useEffect(() => {
        if (status === "authenticated") {
            router.push('/sports');
        }
    }, [status])

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        console.log({ data });
        setLoading(true);
        const result = await signIn('credentials', {
            ...data,
            redirect: false
        })
        setLoading(false);
        if(result && !result.ok){
            
            
            setErrorMessage("Wrong username or password")
        }else{
            setErrorMessage("")
            setSuccessMessage("Login Success!")

        }
    };



    return (
        <div className='flex h-100vh w-full justify-center'>
            <div className=" flex flex-col w-[320px] mt-[100px] mx-auto text-base items-center text-black bg-white p-4 rounded-sm">
                <div className=" font-bold text-lg mb-2">Login</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-2 flex flex-col text-sm'>
                        <label>Username</label>
                        <Controller
                            name="username"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Username is required' }}
                            render={({ field }) => <input {...field} type="text" className='border-[1px] border-solid border-gray-600 rounded-sm py-1 px-2' />}
                        />
                        {errors.username && <span style={{ color: 'red' }}>{errors.username.message}</span>}
                    </div>
                    <div className='mb-2 flex flex-col text-sm'>
                        <label>Password</label>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{ required: 'Password is required' }}
                            render={({ field }) => <input {...field} type="password" className='border-[1px] border-solid border-gray-600 rounded-sm py-1 px-2' />}
                        />
                        {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
                    </div>
                    <div className='mb-2 flex text-sm'>
                        <div className='mx-auto w-[60px] flex items-center justify-center bg-yellow-400 p-1 rounded-md hover:bg-yellow-300'>
                            <button type="submit">{loading ? <CircularProgress className="" size={24} /> : "Login"}</button>
                        </div>

                    </div>
                    <div className="">
                        {errorMessage !== "" ? 
                            <div className="text-red-400">{errorMessage}</div>: ""
                        }
                    </div>
                    <div className="">
                        {successMessage !== "" ? 
                            <div className="flex justify-center text-green-400">{successMessage} <CircularProgress color="success" className="text-green-400" size={24}/></div>: ""
                        }
                    </div>
                </form>
            </div>
        </div>

    );
};

export default SigninForm;
