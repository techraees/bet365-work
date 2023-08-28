'use client';
import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { signIn, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

interface FormData {
    username: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const router = useRouter();
    const { data: session, status } = useSession();
    console.log({ session, status });
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = async(data: FormData) => {
        console.log(data);
        const result = await signIn('credentials', {
            ...data,
            redirect: false
        })
        console.log(result)
    };
    

    // if(session?.user && status === "authenticated"){
    //     router.push('/sports');  
    // }

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
                            <button type="submit">Login</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>

    );
};

export default LoginForm;
