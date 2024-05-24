const NotificationsModal = ({ isOpen, onClose, notifications }) => {
    return (
        <div className={`dog-detail-overlay transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="bg-white p-4 rounded shadow-lg w-80">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <button className="text-red-500" onClick={onClose}>Close</button>
                </div>
                <div className="space-y-2">
                    {notifications.length > 0 ? (
                        notifications.map(notification => (
                            <div key={notification._id} className="p-2 border-b">
                                <h3 className="text-md font-medium text-gray-800">{notification.title}</h3>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No notifications available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NotificationsModal;


