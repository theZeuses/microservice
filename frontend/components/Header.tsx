import { isLoggedIn, roomId, memberId } from "../helpers/authHelper"
import { useEffect } from 'react';
import { useState } from 'react';

function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [member_id, setMemberId] = useState('');
  const [room_id, setRoomId] = useState('');

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    setMemberId(memberId());
    setRoomId(roomId());
  }, [])
  return (
    <div>
        <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light" >
            <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">
                <span className="text-xl text-white pr-2 font-semibold">Chat Room</span>
                { loggedIn ? <a className="nav-link text-red" href={`/room?room=${room_id}&member=${member_id}`}>Messages</a> : <a className="nav-link text-red" href="/">Join Room</a> }
                <a className="nav-link text-red ml-2" href="/create-room">Create Room</a>
                <a className="nav-link text-red ml-2" href="/logs">Logs</a>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Header