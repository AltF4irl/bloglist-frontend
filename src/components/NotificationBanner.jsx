import { useSelector } from "react-redux"
import { Alert } from "react-bootstrap"

const NotificationBanner = () => {
    const notification = useSelector((state) => state.notification)

    return <div className='container' ><Alert variant={notification.class}>{notification.message}</Alert></div>
}

export default NotificationBanner