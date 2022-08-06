import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import io from 'socket.io-client'
import '../style/home.css'
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");

const Home = () => {
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState("")
  const [showChat, setShowChat] = useState(false);
  const [error, setError] = useState('')

  const joinRoom = () => {
    if ((username !== "" && username.length > 3) && group !== "") {
      const g = socket.emit("join_group", group);
      console.log(g);
      setShowChat(true);
      Navigate('/chatroom')
    } else {
      setError('Username and Group are required, and username must be at least 3 character ')
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Welcome to group chat </h3>
          <input type="text" placeholder="Type Your username..." onChange={(event) => { setUsername(event.target.value) }} />
          <select className='optionGroup' onChange={(event) => { setGroup(event.target.value) }} name="group" id="group">
            <option value=" ">.....Select Your Group.....</option>
            <option value="HR">HR</option>
            <option value="IT">IT</option>
            <option value="SALES">SALES</option>
          </select>
          <button onClick={joinRoom}>Join a Group</button>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
      ) : (
        <Chat socket={socket} username={username} group={group} />
      )}
    </div>
  );
}

export default Home