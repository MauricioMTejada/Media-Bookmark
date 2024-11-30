import React from 'react';

interface SaveBookmarksProps {
  bookmarks: { time: number; label: string }[]; // Recibe las marcas como prop
}

const SaveBookmarks: React.FC<SaveBookmarksProps> = ({ bookmarks }) => {
  const handleSaveToFile = () => {
    if (bookmarks.length === 0) {
      alert('No hay marcas de tiempo para guardar.');
      return;
    }

    const fileData = JSON.stringify(bookmarks, null, 2); // Formatea el JSON para mayor legibilidad
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'video_bookmarks.json'; // Nombre predeterminado del archivo
    link.click();

    URL.revokeObjectURL(url); // Limpia el objeto URL creado
  };

  return (
    <div className="save-bookmarks">
      <button onClick={handleSaveToFile}>Guardar Marcas</button>
    </div>
  );
};

export default SaveBookmarks;
