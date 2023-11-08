//@ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications';

const InitNotification = (
    <NotificationContainer />
)

const ShowNotification = {
    info(content: string, title: string = "", timeout: number = 3000, callback: void = undefined) {
        NotificationManager.info(content, title, timeout, callback);
    },
    error(content: string, title: string = "", timeout: number = 3000, callback: void = undefined) {
        NotificationManager.error(content, title, timeout, callback);
    },
    warning(content: string, title: string = "", timeout: number = 3000, callback: void = undefined) {
        NotificationManager.warning(content, title, timeout, callback);
    },
    success(content: string, title: string = "", timeout: number = 3000, callback: void = undefined) {
        NotificationManager.success(content, title, timeout, callback);
    }
}

export {
    InitNotification,
    ShowNotification,
}