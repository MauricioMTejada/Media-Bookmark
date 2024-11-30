import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import SaveBookmarks from '../SaveBookmarks/SaveBookmarks';
import LoadBookmarks from '../LoadBookmarks/LoadBookmarks';

interface Bookmark {
  time: number;
  label: string;
}

interface VideoBookmarksProps {
  playerRef: React.RefObject<ReactPlayer>;
  currentTime: number;
}

// Función de utilidad para formatear segundos a hh:mm:ss
const formatTime = (timeInSeconds: number): string => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  const pad = (num: number): string => num.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const VideoBookmarks: React.FC<VideoBookmarksProps> = ({ playerRef, currentTime }) => {
  const [textInput, setTextInput] = useState('');
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const handleAddBookmark = () => {
    if (!textInput.trim()) return;
    setBookmarks((prev) => [...prev, { time: currentTime, label: textInput }]);
    setTextInput('');
  };

  const handleSeekToBookmark = (time: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, 'seconds');
    }
  };

  const handleLoadBookmarks = (loadedBookmarks: Bookmark[]) => {
    setBookmarks(loadedBookmarks);
  };

  return (
    <div className="video-bookmarks">
      <div>
        <span>[{formatTime(currentTime)} ]</span>
        <input
          type="text"
          placeholder="Ingrese descripción de la marca"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <button onClick={handleAddBookmark}>Agregar Marca</button>
      </div>
      <ul>
        {bookmarks.map((bookmark, index) => (
          <li key={index}>
            <button onClick={() => handleSeekToBookmark(bookmark.time)}>
              [ {formatTime(bookmark.time)} ] {bookmark.label}
            </button>
          </li>
        ))}
      </ul>
      <SaveBookmarks bookmarks={bookmarks} /> {/* Componente para guardar */}
      <LoadBookmarks onLoad={handleLoadBookmarks} /> {/* Componente para cargar */}
    </div>
  );
};

export default VideoBookmarks;