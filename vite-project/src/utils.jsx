import { toast } from 'react-toastify'

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right', // corrected position
        autoClose: 3000,       // optional: closes after 3 seconds
        pauseOnHover: true,
        draggable: true
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right', // corrected position
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true
    })
}
