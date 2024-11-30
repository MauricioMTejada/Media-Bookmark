import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import VideoBookmarks from './components/VideoBookmarks/VideoBookmarks';

const App = () => {
  const playerRef = useRef<ReactPlayer>(null); // Referencia para el reproductor de video
  const [currentTime, setCurrentTime] = useState(0); // Tiempo actual del video

  return (
    <>
      <VideoPlayer
        playerRef={playerRef}
        onProgress={(time: number) => setCurrentTime(time)} // Sincronizar tiempo actual
      />
      <VideoBookmarks
        playerRef={playerRef}
        currentTime={currentTime} // Pasar tiempo actual al componente de marcas
      />
    </>
  );
};

export default App;
