import React from 'react'

class Host extends React.Component {

  constructor(props) {
    super(props);
    this.state = { muted: false, noVideo: false };
    this.toggleAudio = this.toggleAudio.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
  }

  toggleAudio () {
    this.setState(state => ({
      muted: !state.muted
    }));
  }

  toggleVideo () {
    this.setState(state => ({
      noVideo: !state.noVideo
    }));
  }

  render() {
    return (
      <div className="host">
        <div className="video-stream centered">
          Your video stream
        </div>
        <div className="controls">
          <div className={ this.state.muted ? 'centered clicked' : 'centered'} onClick={this.toggleAudio}>
            { this.state.muted ? '🔇 Muted ' : '🔈 Mute'}
          </div>
          <div className={ this.state.noVideo ? 'centered clicked' : 'centered'} onClick={this.toggleVideo}>
            
            { this.state.noVideo ? '😵 Camera Disabled' : '😳 Disable Camera'}
          </div>
        </div>
        <div className="centered">
          📊 1000 viewers watching this stream
        </div>
      </div>
    )
  }
}

export default Host;

