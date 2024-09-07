import React, { useState } from 'react';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from 'react-redux';

function JoinRoom() {
  const [roomID, setRoomID] = useState('');
  const [error, setError] = useState('');
  const userID = useSelector((state) => state.user_basic_details.id);
  const userName = useSelector((state) => state.user_basic_details.name);

  const initializeZego = (roomID) => {
    try {
      const appID = 1952418776;
      const serverSecret = "ae7cd6278f1fa3f6d2d2438e6cd329e6";
      const userIDStr = String(userID);
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userIDStr, userName);

      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: document.querySelector("#root"),
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
    } catch (error) {
      console.error("Failed to initialize Zego UIKit:", error);
      setError("Failed to join the room. Please try again.");
    }
  };

  const handleJoinClick = () => {
    if (!roomID) {
      setError("Room ID is required");
      return;
    }
    setError('');
    initializeZego(roomID);
  };

  return (
    <div style={styles.container}>
      <div id="root" style={styles.videoContainer}></div>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Join a Room</h2>
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomID}
          onChange={(e) => setRoomID(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleJoinClick} style={styles.button}>Join Room</button>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f2f5',
  },
  videoContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  formContainer: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  input: {
    width: '250px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    fontSize: '16px',
  },
  button: {
    width: '250px',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    border: 'none',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default JoinRoom;
