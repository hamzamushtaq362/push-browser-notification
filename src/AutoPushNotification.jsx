import React, { useEffect } from "react";

const AutoPushNotification = () => {
  let intervalId = null; // A flag to track if the interval is already set

  useEffect(() => {
    // Ask for notification permission when the component mounts
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");

          // Check if the interval is already set
          if (!intervalId) {
            console.log("Setting interval");
            intervalId = setInterval(() => {
              console.log("Sending");
              sendNotification();
            }, 60000); // 60000 ms = 1 minute
          }
        }
      });
    }

    // Cleanup function to clear interval on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null; // Reset the flag
      }
    };
  }, []); // Empty dependency array to ensure this effect runs only once

  const sendNotification = () => {
    if (Notification.permission === "granted") {
      // Customize your notification here
      new Notification("Hello!", {
        body: "This is an automatic notification every minute.",
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRBlr9nmDwG7kYOIKpEVLwj-99AUlYoiohLA&s", // Optional icon for the notification
      });
    }
  };

  return (
    <div>
      <h1>Auto Push Notification Example</h1>
      <p>Notifications will be triggered automatically every minute.</p>
    </div>
  );
};

export default AutoPushNotification;
