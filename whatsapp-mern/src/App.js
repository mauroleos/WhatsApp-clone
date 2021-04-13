import React, { useEffect, useState } from "react";
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  const [messages, setMessages] = useState([]);
  
  useEffect(()=> {
    //responsible for fetching all the initial info
    axios.get("/messages/sync")
      .then(response => {
        setMessages(response.data)
      })
  }, [])

  useEffect(() => {
    //When app component loads run this piece of code once
    const pusher = new Pusher('c802ed5d6d54df981a02', {
      cluster: 'us2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]); 

  console.log(messages)

  return (
    <div className="app">
      <div className = "app__body">
        <Router>
          <Sidebar />
          
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat messages={messages}/>
            </Route>

            <Route path="/">
              <Chat messages={messages}/>
            </Route>

          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
