export const bearerToken = () => localStorage ? (localStorage.getItem('logged_in_info') ? JSON.parse(localStorage.getItem('logged_in_info') as string).bearerToken : null) : null;
export const memberId = () => (localStorage?.getItem('logged_in_info') ? JSON.parse(localStorage.getItem('logged_in_info') as string).memberId : null);
export const roomId = () => (localStorage?.getItem('logged_in_info') ? JSON.parse(localStorage.getItem('logged_in_info') as string).roomId : null);
export const login = (data: { memberId: string, roomId: string, bearerToken: string }) => {
    localStorage.setItem('logged_in_info', JSON.stringify(data));
};
export const logout = () => {
    localStorage.removeItem('logged_in_info');
};

export const isLoggedIn = () => {
    const logged_in_info = localStorage.getItem('logged_in_info');
    if (logged_in_info) {
        return true;
    } else {
        return false;
    }
};
