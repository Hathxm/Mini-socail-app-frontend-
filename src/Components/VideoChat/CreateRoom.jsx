import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from 'react-redux';

function CreateRoom() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const userName = useSelector((state) => state.user_basic_details.name);
  const userID = useSelector((state) => state.user_basic_details.id);
  const zpRef = useRef(null);

  useEffect(() => {
    const initializeZego = () => {
    

      try {
        const roomID = Math.floor(Math.random() * 10000) + ""; // Generate a unique room ID
        const appID = 1952418776;
        const serverSecret = "ae7cd6278f1fa3f6d2d2438e6cd329e6";
        const userIDStr = String(userID);
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userIDStr, userName);

       

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zpRef.current = zp; // Store the instance in the ref

        zp.joinRoom({
          container: document.querySelector(".myCallContainer"),
          sharedLinks: [{
            name: 'Personal link',
            url: 'roomID=' + roomID,
          }],
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
          turnOnMicrophoneWhenJoining: true,
          turnOnCameraWhenJoining: true,
          showMyCameraToggleButton: true,
          showMyMicrophoneToggleButton: true,
          showAudioVideoSettingsButton: true,
          showScreenSharingButton: true,
          showTextChat: true,
          showUserList: true,
          maxUsers: 2,
          layout: "Auto",
          showLayoutButton: false,
        });

        console.log(`Room created with ID: ${roomID}`);
        setLoading(false);
      } catch (error) {
        console.error("Failed to initialize Zego UIKit:", error);
        // setError("Failed to create the room. Please try again.");
        setLoading(false);
      }
    };

    initializeZego();

    return () => {
      if (zpRef.current) {
        // zpRef.current.leaveRoom(); // Clean up the Zego instance properly
        zpRef.current = null; // Clear the reference
      }
    };
  }, [userName, userID]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message or spinner
  }

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div className="myCallContainer" style={{ width: '100%', height: '80%' }}></div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreateRoom;
