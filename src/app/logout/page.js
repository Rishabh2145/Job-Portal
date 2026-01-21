export default function Logout() {
    localStorage.removeItem('token')
    return (
        <div>Logged Out</div>
    )
}