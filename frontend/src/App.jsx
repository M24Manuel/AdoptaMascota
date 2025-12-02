import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ListaMascotas from "./components/ListaMascotas";
import { UserProvider } from "./context/UserContext";

// Páginas por rol
import AdminInicio from "./pages/AdminInicio";
import PublicadorInicio from "./pages/PublicadorInicio";
import AdoptanteInicio from "./pages/AdoptanteInicio";
import RegistrarMascota from "./pages/RegistrarMascota";
import RegistrarEspecie from "./pages/RegistrarEspecie";

export default function App() {

  return (
    <UserProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          
          <Navbar />

          <main className="flex-grow bg-pink-50 p-6">
            <Routes>
              {/* Páginas generales */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              <Route path="/galeria" element={<ListaMascotas />} />
              <Route path="/publicar" element={<RegistrarMascota />} />

              {/* Páginas por rol */}
              <Route path="/admin" element={<AdminInicio />} />
              <Route path="/publicador" element={<PublicadorInicio />} />
              <Route path="/adoptante" element={<AdoptanteInicio />} />
              <Route path="/registrar-especie" element={<RegistrarEspecie />} />

              {/* Rutas legacy (mantener por compatibilidad) */}
              <Route path="/register" element={<Register />} />
              <Route path="/mascotas" element={<ListaMascotas />} />
              <Route path="/registrar-mascota" element={<RegistrarMascota />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}
