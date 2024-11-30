import React, { useRef } from 'react';

interface Bookmark {
  time: number;
  label: string;
}

interface LoadBookmarksProps {
  onLoad: (bookmarks: Bookmark[]) => void; // Callback para cargar las marcas
}

const LoadBookmarks: React.FC<LoadBookmarksProps> = ({ onLoad }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result;
        if (typeof result === 'string') {
          const loadedBookmarks: Bookmark[] = JSON.parse(result);
          onLoad(loadedBookmarks); // Pasa las marcas cargadas al padre
        }
      } catch (error) {
        alert('Error al cargar el archivo. Asegúrese de que el formato sea JSON válido.');
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="load-bookmarks">
      <input
        type="file"
        accept="application/json"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <button onClick={() => fileInputRef.current?.click()}>Cargar Marcas</button>
    </div>
  );
};

export default LoadBookmarks;
