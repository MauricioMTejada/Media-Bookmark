import { useState } from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  playerRef: React.RefObject<ReactPlayer>;
  onProgress: (time: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playerRef, onProgress }) => {
  const [playbackRate, setPlaybackRate] = useState(1); // Velocidad inicial
  const [videoURL, setVideoURL] = useState<string | null>(null); // URL del video cargado

  const handleSeek = (seconds: number) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + seconds, 'seconds');
    }
  };

  const handleChangePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const videoURL = URL.createObjectURL(file); // Generar una URL temporal para el archivo
      setVideoURL(videoURL);
    }
  };

  return (
    <div
      className="video-container"
      tabIndex={0} // Necesario para capturar eventos de teclado
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') handleSeek(10); // Adelantar 10 segundos
        if (e.key === 'ArrowLeft') handleSeek(-10); // Retroceder 10 segundos
      }}
    >
      <div className="file-upload">
        <input
          type="file"
          accept="video/*" // Acepta solo archivos de video
          onChange={handleFileUpload}
        />
        {!videoURL && <p>Seleccione un video para cargar.</p>}
      </div>
      {videoURL && (
        <>
          <ReactPlayer
            ref={playerRef}
            url={videoURL}
            controls
            width="640px"
            height="360px"
            playbackRate={playbackRate}
            onProgress={(state) => onProgress(state.playedSeconds)}
          />
          <div className="video-controls">
            <button onClick={() => handleSeek(-10)}>Retroceder 10s</button>
            <button onClick={() => handleSeek(10)}>Avanzar 10s</button>
          </div>
          <div className="playback-controls">
            <span>Velocidad:</span>
            <button onClick={() => handleChangePlaybackRate(0.25)}>0.25x</button>
            <button onClick={() => handleChangePlaybackRate(0.5)}>0.5x</button>
            <button onClick={() => handleChangePlaybackRate(0.75)}>0.75x</button>
            <button onClick={() => handleChangePlaybackRate(1)}>1x (Normal)</button>
            <button onClick={() => handleChangePlaybackRate(1.25)}>1.25x</button>
            <button onClick={() => handleChangePlaybackRate(1.5)}>1.5x</button>
            <button onClick={() => handleChangePlaybackRate(2)}>2x</button>
            <button onClick={() => handleChangePlaybackRate(2.5)}>2.5x</button>
            <button onClick={() => handleChangePlaybackRate(3)}>3x</button>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
