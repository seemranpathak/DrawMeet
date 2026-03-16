import { Whiteboard } from './Whiteboard';
import { Toaster } from 'sonner'; // For toasts/notifications
import WebRTC from './webrtc';
import { BrowserRouter } from 'react-router-dom';
import { Register } from './pages/Register';
import { Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';



const App: React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />

{/* protected routes */}
          <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
 <div className="min-h-screen bg-gray-50 font-inter antialiased">
     
    
      {/* The core Whiteboard component */}
      <WebRTC/>
      <Whiteboard />
      
      {/* Toaster for displaying notifications */}
      <Toaster position="bottom-right" richColors />
    </div>

            </ProtectedRoute>
          }
          >
            </Route>    

    </Routes>
    
    </BrowserRouter>
   
  );
};

export default App;
