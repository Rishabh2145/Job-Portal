import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'bottom-right'
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'bottom-right'
    })
}

export const removeInfo = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    localStorage.removeItem('email')
}

export const extractInfo = (res) => {
    localStorage.setItem("token", res.token)
    localStorage.setItem('id', res.user._id)
    localStorage.setItem('user', res.user.fullName)
    localStorage.setItem('role', res.user.role)
    localStorage.setItem('email', res.user.email)
}