import {notification} from "antd"

class NotificationHelper { 
    static openNotificationSuccess(content) {
        notification["success"]({
            title: "Success",
            message: content ? content : "Action successfully made",
            duration : 2,
        });
    }

    static openNotificationError(content) {
        notification["error"]({
            title: "Action Fail",
            message: content ? content : "Unknown reason",
            duration : 2,
        });
    }

    static openNotificationWarning(content) {
        notification["warning"]({
            title: "Warning",
            message: content ? content : "Action may not be fully completed",
            duration : 2,
        });
    }

    static openNotificationInfo(content) {
        notification["info"]({
            title: "Message",
            message: content ? content : "Cannot load message",
            duration : 2,
        });
    }
}

export default NotificationHelper;
