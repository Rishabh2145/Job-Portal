import {io} from 'socket.io-client'

const socket = io(`${process.env.NEXT_PUBLIC_API}`, {
    withCredentials: true,
    autoConnect: false
})

export default socket;