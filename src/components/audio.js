import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  audioUrl: PropTypes.string.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onLoadStart: PropTypes.func.isRequired,
  onLoadedMetadata: PropTypes.func.isRequired,
  onTimeUpdate: PropTypes.func.isRequired
};

const audio = InnerComponent => {
  class Audio extends Component {
    constructor(props) {
      super(props);

      this.audio = null;

      this.onPlay = this.onPlay.bind(this);
      this.onPause = this.onPause.bind(this);
      this.onTogglePlay = this.onTogglePlay.bind(this);
      this.onLoadStart = this.onLoadStart.bind(this);
      this.onLoadedMetadata = this.onLoadedMetadata.bind(this);
      this.onTimeUpdate = this.onTimeUpdate.bind(this);
    }

    onLoadStart() {
      const { onLoadStart } = this.props;
      onLoadStart();
    }

    onLoadedMetadata() {
      const { audio, props } = this;
      const { onLoadedMetadata } = props;
      onLoadedMetadata(Math.floor(audio.duration));
    }

    onTimeUpdate() {
      const { audio, props } = this;
      const { onTimeUpdate, player } = props;
      const { currentPlayingTime } = player;
      const currentTimeAudio = Math.floor(audio.currentTime);
      if (currentPlayingTime !== currentTimeAudio) {
        onTimeUpdate(currentTimeAudio);
      }
    }

    onPlay() {
      const { onPlay } = this.props;
      onPlay();
    }

    onPause() {
      const { onPause } = this.props;
      onPause();
    }

    onTogglePlay() {
      const { audio } = this;
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    render() {
      const { audioUrl } = this.props;

      return (
        <div>
          <audio
            id="audio"
            crossOrigin="anonymous"
            src={audioUrl}
            ref={element => (this.audio = element)}
            onLoadStart={this.onLoadStart}
            onLoadedMetadata={this.onLoadedMetadata}
            onTimeUpdate={this.onTimeUpdate}
            onPlay={this.onPlay}
            onPause={this.onPause}
            autoPlay
          />
          <InnerComponent {...this.props} togglePlay={this.onTogglePlay} />
        </div>
      );
    }
  }

  Audio.propTypes = propTypes;

  return Audio;
};

export default audio;