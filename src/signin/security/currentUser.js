import { useState } from 'react';

function useCurrentUser() {
    const [isLoggedOn, setLoggedOn] = useState(false);
    //
    // useEffect(() => {
    //     function handleStatusChange(status) {
    //         setIsOnline(status.isOnline);
    //     }
    //
    //     ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    //     return () => {
    //         ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    //     };
    // });
    //
    // return isOnline;
    return
}