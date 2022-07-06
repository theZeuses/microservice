import React, { useEffect } from 'react'
import { useState } from 'react';
import memberService from '../services/MemberService';
import chatRoomService from '../services/ChatRoomService';
import authService from '../services/AuthService';

function CreateRoomForm() {
    const [room_name, setRoomName] = useState('');
    const [room_uuid, setRoomUUID] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const [error_message, setErrorMessage] = useState('');
    async function register(e: any){
        e.preventDefault();
        if(room_name.length > 0 && nickname.length > 0 && password.length > 0 && password == confirm_password){
            try{
                const res1 = await chatRoomService.insertChatRoom({
                    name: room_name
                });
                if(res1.status == 'failed'){
                    setErrorMessage('Something Went Wrong');
                }else{
                    const res2 = await memberService.insertMember({
                        room_uuid: res1.data?.uuid,
                        nickname: nickname,
                        password: password
                    });
                    if(res2.status == 'failed'){
                        setErrorMessage('Something Went Wrong');
                    }else{
                        setRoomUUID(res1.data?.uuid ?? '');
                    }
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
        }else if(password != confirm_password){
            setErrorMessage("Confirm Password doesn't match with Password");
        }else{
            setErrorMessage('All field must be provided');
        }
    }
    async function hideModal(e: any){
        setRoomName('');
        setNickname('');
        setPassword('');
        setConfirmPassword('');
        setRoomUUID('');
    }
    useEffect(() => {
        setErrorMessage('');
    }, [nickname, room_name, password]);
    return (
        <>
            <div className="bg-grey-lighter min-h-screen flex flex-col">
                <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                    <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                        <h1 className="mb-8 text-3xl text-center">Create Room</h1>
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="room_name"
                            placeholder="Room Name" 
                            value={room_name}
                            onChange={(e)=>setRoomName(e.target.value)} />

                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="nickname"
                            placeholder="Your Nickname"
                            value={nickname}
                            onChange={(e)=>setNickname(e.target.value)} />

                        <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"                                 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)} />
                        <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="confirm_password"
                            placeholder="Confirm Password"
                            value={confirm_password}
                            onChange={(e)=>setConfirmPassword(e.target.value)} />

                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1"
                            onClick={e => register(e)}
                        >Create Room & Account</button>
                        { error_message ?                            
                            <div role="alert">
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 my-2 text-red-700">
                                    <p>{error_message}</p>
                                </div>
                            </div> 
                            : <></> }
                    </div>
                </div>
            </div>
            <div id="modal" className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-blue-500 bg-opacity-50 transform scale-0 transition-transform duration-300 ${ room_uuid ? 'scale-100' : ''}`} >
                <div className="bg-white w-1/2 h-1/2 p-12"> 
                    <button id="closebutton" type="button" className="focus:outline-none" onClick={(e) => hideModal(e)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <div>
                        Room Key: <strong>{ room_uuid }</strong>
                        <br />
                        <div className = 'text-red-400'>Please take a note of the key as it won't be displayed again.</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateRoomForm