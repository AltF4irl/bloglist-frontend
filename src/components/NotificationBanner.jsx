import { useSelector } from "react-redux"

const NotificationBanner = () => {
    const notification = useSelector((state) => state.notification)

    return <div className={notification.class}>{notification.message}</div>
}

export default NotificationBanner