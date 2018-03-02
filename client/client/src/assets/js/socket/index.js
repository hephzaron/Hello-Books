import socket from './config';

/**
 * @description This emits a notification
 * @param {object} options -options for getting new notfications
 * @returns {void}
 */

const ioGetNotifications = options => {
        socket.emit('GET_NOTIFICATIONS', options);
    }
    /**
     * @description This emits JOIN event and get the most
     *  recent notifications
     * @param {void}
     * @returns {undefined}
     */

const ioJoin = () => {
    socket.on('connect', () => {
        socket.emit('JOIN')
    });
}

socket.on('GET_ALL_NOTIFICATIONS', () => {
    ioGetNotifications()
});

/**
 * @description Get new notification from server
 * @param {func} callback - this callback function resolves new notifications
 * @returns {uundefined}
 */

const ioNewNotifications = callback => {
    socket.on('NEW_NOTIFICATIONS', data => {
        if (data.notifications.length >= 1) {
            return callback(null, data)
        }
        callback(null);
    });
};

export { ioGetNotifications, ioJoin, ioNewNotifications };