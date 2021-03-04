import React, { useState } from 'react';
import './MarvelChat.css';
import SendIcon from '@material-ui/icons/Send';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { dataBase } from '../../firebase';
import firebase from 'firebase/app';



const MarvelChat = () => {

  const [value, setValue] = useState('');

  const { currentUser } = useAuth();
  const [messages, loading] = useCollectionData(
    dataBase.collection('messages').orderBy('createdAt')
  );

  const sendMessage = async () => {
    await dataBase.collection('messages').add({
      name: currentUser.name,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      id: Date.now()
    })
    setValue('');
  }

  return (
    <div className="chat-section">
      <div className="chat-wrapper">
        <div className="chat-inner">
          <div className="chat-message-block">
            {messages?.map(item => (
              <div key={item.id} className="message-inner">
                <div className="message-name">{item.name}</div>
                <div className="message-text">
                  {item.text}
              </div>
              </div>
            ))}
          </div>
          <div className="chat-message-input">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type="text" placeholder="Type your message"
            />
            <SendIcon
              onClick={() => sendMessage()}
              className="send-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarvelChat;