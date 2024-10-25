import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx"
import CartPage from "./pages/CartPage.jsx";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage.jsx";
import PurchaseCancelPage from "./pages/PurchaseCancelPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./store/useUserStore.js";
import { useCartStore } from "./store/useCartStore.js";
import { Home } from "lucide-react";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

function App() {
  
  const {user, checkAuth, checkingAuth} = useUserStore();
  const {getCartItems} = useCartStore();

  useEffect(()=> {
    checkAuth();
  }, [checkAuth]);

  useEffect(()=> {
    if (!user) return;
      getCartItems();
  }, [getCartItems, user]);


  if(checkingAuth) return <LoadingSpinner />

  return (
    <div className="min-h-screen bg-gray-600 text-white relative overflow-hidden">  
      {/* Background gradient */}
			<div className='absolute inset-0 overflow-hidden'>
				<div className='absolute inset-0'>
					<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
				</div>
			</div>

			<div className='relative z-50 pt-20'>

      <Navbar />
      <Routes> 

        <Route path = '/' element = {<HomePage />} />
        <Route path = '/signup' element = {!user ? <SignUpPage /> : <Navigate to='/' />}/>
        <Route path = '/login' element = {!user ? <LoginPage /> : <Navigate to='/' />} />
        <Route path = '/secret-dashboard' element = {user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />} />
        <Route path = '/category/:category' element = {<CategoryPage />} />
        <Route path = '/cart' element = {user ? <CartPage /> : <Navigate to='/login' />} />
        <Route path = '/purchase-success' element = {user ? <PurchaseSuccessPage /> : <Navigate to='/login' />} />
        <Route path = '/cancel-purchase' element = {user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
        <Route path = '/about' element = {user ? <AboutPage /> : <Navigate to='/login' />} />
        <Route path = '/privacy' element = {user ? <PrivacyPage /> : <Navigate to='/login' />} />
        <Route path = '/profile' element = {user ? <ProfilePage /> : <Navigate to='/login' />} />
        <Route path = '/settings' element = {user ? <SettingsPage /> : <Navigate to='/login' />} />
       </Routes>
    </div> 
    <Toaster />
    </div>
  );
}

export default App