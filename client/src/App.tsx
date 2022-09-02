import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import axios from "axios";

const host = "http://localhost:3002" as const;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 24px 32px;
`;

const LeftSideLogo = styled.div`
  width: 32px;
  height: 32px;
  background-color: gray;
`;

const RightSideModule = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Bell = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  border-radius: 40%;
  background-color: #b7b7b7;
  cursor: pointer;
`;
const BellCount = styled.div`
  position: absolute;
  left: 24px;
  top: 0px;
  padding: 4px 6px;
  border-radius: 100%;
  background-color: #2f2fd2;
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

const Body = styled.body`
  height: 100%;
`;

const InputMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 56px;
  input {
    width: 70%;
  }
  button {
    width: 40%;
  }
`;

const WrapperMassages = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > :nth-child(n):not(:last-child) {
    margin-bottom: 24px;
  }
`;

const MessageBox = styled.div`
  padding: 16px 24px;
  max-width: 80%;
  background-color: #ff83e2;
  border: 3px solid #ea6bcc;
  border-radius: 16px;
`;

function App() {
  const [newMessageInput, setNewMessageInput] = useState("");
  const [allMessages, setAllMessages] = useState<{ message: any; id: any }[]>(
    []
  );

  async function connectEventSource() {
    const eventSource = new EventSource(`${host}/connect`);
    eventSource.onmessage = function (e) {
      const result = JSON.parse(e.data);
      console.log("result", result);
      setAllMessages((prevState) => [result, ...prevState]);
    };
  }

  async function sendMessage() {
    await axios.post(`${host}/send-message`, {
      message: newMessageInput,
      id: Date.now(),
    });
  }

  useEffect(() => {
    connectEventSource();
  }, []);

  return (
    <div className="App">
      <Header>
        <LeftSideLogo />
        <RightSideModule>
          <Bell>
            <BellCount>{allMessages?.length ?? 0}</BellCount>
          </Bell>
        </RightSideModule>
      </Header>
      <Body>
        <InputMessage>
          <input
            value={newMessageInput}
            onChange={(e) => setNewMessageInput(e.target.value)}
            type="text"
          />
          <button onClick={sendMessage}>Отправить</button>
        </InputMessage>
        <WrapperMassages>
          {allMessages.map((m) => (
            <MessageBox key={m.id}>{m.message}</MessageBox>
          ))}
        </WrapperMassages>
      </Body>
    </div>
  );
}

export default App;
