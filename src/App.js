import './App.css'
import Host from './components/Host.js'
import Guest from './components/Guest.js'
import React from 'react'
import AgoraRTC from 'agora-rtc-sdk'

class App extends React.Component {
  constructor(props) {
    super(props)
    const client = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    })
    client.init("4a41501b1b8f44b6acd3bc3d319dff02", () => {
      console.log("client initialized");
    }, (err) => {
      console.log("client init failed ", err);
    });
    this.state = { 
      client 
    }
  }
  render() {
    return (
      <div className="app">
        <Host />
        <Guest />
      </div>
    )
  }
}

export default App;

