import './App.css'
import React from 'react'
import AgoraRTC from 'agora-rtc-sdk'
import qs from 'query-string'

class App extends React.Component {

  constructor(props) {
    super(props)
    const client = AgoraRTC.createClient({
      mode: "rtc",
      codec: "vp8",
    })
    const hosts = {
      guest1: null,
      guest2: null,
    }
    const qry = qs.parse(window.location.search)
    const localStream = AgoraRTC.createStream({
      audio: true,
      video: true,
    })
    this.state = { 
      muted: false, 
      noVideo: false,
      client,
      hosts,
      localStream,
      qry
    }
    client.init(process.env.REACT_APP_APP_ID, () => {
      console.log("client initialized")
    }, (err) => {
      console.log("client init failed ", err)
    })
    client.join(process.env.REACT_APP_API_KEY, process.env.REACT_APP_CHANNEL, qry.host || null, (uid)=>{
      if ('host' in qry) {
        localStream.init(()=>{
          this.setState(state => ({
            localStream
          }))
          localStream.play("me")
          client.publish(localStream, (err) => {})
        }, (err) => {})
      }
    }, (err) => {})
    client.on("stream-added", function(evt){
      client.subscribe(evt.stream, (err) => {});
    });
    client.on("stream-subscribed", function(evt){
      console.log(evt)
      const stream = evt.stream;
      const guest1 = document.getElementById('guest1');
      const guest2 = document.getElementById('guest2');
      if (guest1 && !guest1.innerHTML) {
        stream.play('guest1')
      }
      if (!guest2.innerHTML) {
        stream.play('guest2')
      }
    });
    client.on("stream-removed", function(evt){
    });
    client.on("peer-leave", function(evt){
    });
    this.toggleAudio = this.toggleAudio.bind(this)
    this.toggleVideo = this.toggleVideo.bind(this)
  }

  toggleAudio () {
    if (this.state.muted) {
      this.state.localStream.unmuteAudio()
    } else {
      this.state.localStream.muteAudio()
    }
    this.setState(state => ({
      muted: !this.state.muted
    }));
  }

  toggleVideo () {
    if (this.state.noVideo) {
      this.state.localStream.unmuteVideo()
    } else {
      this.state.localStream.muteVideo()
    }
    this.setState(state => ({
      noVideo: !state.noVideo
    }));
  }
  render() {
    const isHost = 'host' in qs.parse(window.location.search)
    return (
      <div className="app">
        { isHost ?
          <div className="host">
            <div className="video-stream centered" id="me" />
            <div className="controls">
              <div className={ this.state.muted ? 'centered clicked' : 'centered'} onClick={this.toggleAudio}>
                { this.state.muted ? '🔇 Muted ' : '🔈 Mute'}
              </div>
              <div className={ this.state.noVideo ? 'centered clicked' : 'centered'} onClick={this.toggleVideo}>
                { this.state.noVideo ? '😵 Camera Disabled' : '😳 Disable Camera'}
              </div>
            </div>
            <div className="centered view-count">
              📊 1000 viewers watching this stream
            </div>
          </div>
          :
          <div className="guest centered" id="guest1" />
        }
        <div className="guest centered" id="guest2" />
      </div>
    )
  }
}
export default App
