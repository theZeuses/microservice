import { useRouter } from 'next/router';
import { logout } from '../helpers/authHelper';

const Nav = () => {
    const route = useRouter();
    
    async function leaveRoom(e: any){
        e.preventDefault();
        logout();
        route.push('http://localhost:3000');
    }
    return (
        <div>
            <nav className="relative w-full flex flex-wrap items-center justify-between py-3 bg-gray-900 text-gray-200 shadow-lg navbar navbar-expand-lg navbar-light" >
                <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                    <div className="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent1">
                    <span className="text-xl text-white pr-2 font-semibold">Chat Room</span>
                    <button className="nav-link text-red" onClick={e => leaveRoom(e)}>Leave Room</button>
                    <a className="nav-link text-red ml-2" href="/logs">Logs</a>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;