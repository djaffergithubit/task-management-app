import axios from "axios"
import { useDispatch } from "react-redux"
import { setUser } from "../state"
import { useEffect } from "react"
import { socket } from "../socket/socket"

const getCurrentUser = (token) => {
    const dispatch = useDispatch()

    const getUserInfo = async () => {
        if (token && token.length > 0) {
            axios.get('http://localhost:3500/users/get-user', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                dispatch(setUser(res.data))
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        getUserInfo()
        socket.on('edit profile', (message) =>{
            getUserInfo()
        })

        return () => {
            socket.off('edit profile')
        }
    }, [token])
}

export { getCurrentUser }