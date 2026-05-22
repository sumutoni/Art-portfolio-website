import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../modules/home/HomePage";
import { GalleryPage } from "../modules/gallery/GalleryPage";
import { ArtworkPage } from "../modules/artwork/ArtworkPage";
import { AcquirePage } from "../modules/acquire/AcquirePage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/artwork" element={<ArtworkPage />} />
      <Route path="/acquire" element={<AcquirePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
