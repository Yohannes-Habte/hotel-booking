import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './views/loginPage/Login';
import Home from './views/homePage/Home';
import UserList from './views/listPage/UserList';
import HotelList from './views/listPage/HotelList';
import NewUser from './views/newPage/newUser/NewUser';
import NewHotel from './views/newPage/newHotel/NewHotel';
import Single from './views/singlePage/Single';
import { useContext } from 'react';
import { BackgroundContext } from './context/background/BgProvider';
import { AdminContext } from './context/admin/AdminProvider';
import './styles/DarkBG.scss';
import './styles/GrayBG.scss';
import RoomList from './views/listPage/RoomList';
import NewRoom from './views/newPage/newRoom/NewRoom';

const App = () => {
  // Global variable
  const { darkMode, grayMode } = useContext(BackgroundContext);
  const { user } = useContext(AdminContext);

  // Route Protection function from accessing non-admin users
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to={'/login'} />;
    }
    return children;
  };

  return (
    <div className={darkMode ? 'app dark' : grayMode ? 'app gray' : 'app'}>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            {/* Users nested routes */}
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <UserList />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewUser />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Hotels nested routes */}
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <HotelList />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":hotelId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Hotels nested routes */}
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <RoomList />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":roomId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
