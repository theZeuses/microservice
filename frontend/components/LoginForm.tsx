import React, { useState } from 'react'
import authService from '../services/AuthService';
import { useRouter } from 'next/router';
import memberService from '../services/MemberService';
import { useEffect } from 'react';

function LoginForm() {
    const [room_key, setRoomKey] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');

    const [error_message, setErrorMessage] = useState('');

    const route = useRouter()

    async function register(e: any){
        e.preventDefault();
        if(room_key.length > 0 && nickname.length > 0 && password.length > 0){
            try{
                const res = await memberService.insertMember({
                    room_uuid: room_key,
                    nickname: nickname,
                    password: password
                });
                if(res.status == 'failed'){
                    setErrorMessage('Something Went Wrong');
                }else{
                    await tryLogin();
                }
            }catch(err: any){
                if(!err?.internal){
                    const error = err.errors ? err.errors[0] : null;
                    if(error){
                        if( error.code == 'DUPLICATE_NICKNAME' ) setErrorMessage("Nickname Already Taken");
                        else setErrorMessage("Invalid Credentials");
                    }else setErrorMessage("Something went wrong");
                }else{console.log(err)
                    setErrorMessage('Service Unavailable');
                }
            }
        }else{
            setErrorMessage('All field must be provided');
        }
    }

    async function tryLogin(e?: any){
        e?.preventDefault();
        if(room_key.length > 0 && nickname.length > 0 && password.length > 0){
            try{
                const res = await authService.login({
                    room_uuid: room_key,
                    nickname: nickname,
                    password: password
                });
                if(res.status == 'failed'){
                    setErrorMessage('Something Went Wrong');
                }else{ 
                    await route.push(`http://localhost:3000/room?room=${room_key}&member=${res.data.data.uuid}`)
                }
            }catch(err: any){
                if(!err?.internal){
                    const error = err.errors ? err.errors[0] : null;
                    if(error){
                        if( error.code == 'INVALID_ROOM_ID' ) setErrorMessage("Room couldn't be located");
                        else if( error.code == 'INVALID_MEMBER_ID' ){
                            setErrorMessage("NO_USER");
                        }else setErrorMessage("Invalid Credentials");
                    }else setErrorMessage("Invalid Credentials");
                }else{console.log(err)
                    setErrorMessage('Service Unavailable');
                }
            }
        }else{
            setErrorMessage('All field must be provided');
        }
    }

    useEffect(() => {
        setErrorMessage('');
    }, [nickname, room_key, password]);
    
    return (
        <section className="h-screen">
            <div className="container px-6 py-12 h-full">
                <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                    <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                            className="w-full"
                            alt="Phone image"
                        />
                    </div>
                    <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                        <form>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Room Key"
                                    value={room_key}
                                    onChange={(e)=>setRoomKey(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Nickname"
                                    value={nickname}
                                    onChange={(e)=>setNickname(e.target.value)}
                                />
                            </div>
                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={(e)=>tryLogin(e)}
                                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                            >
                                Get In
                            </button>
                            { error_message ? (error_message != 'NO_USER' ?                           
                                <div role="alert">
                                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 my-2 text-red-700">
                                        <p>{error_message}</p>
                                    </div>
                                </div> 
                                :
                                 <div role="alert">
                                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 my-2 text-red-700">
                                        <p>
                                            User doesn't exist in this room.
                                            <button
                                                onClick={(e)=>register(e)}
                                                className="inline-block px-7 py-3 bg-green-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                                data-mdb-ripple="true"
                                                data-mdb-ripple-color="light"
                                            >
                                                Register & Get In
                                            </button>
                                        </p>
                                    </div>
                                </div>) : <></> }
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginForm