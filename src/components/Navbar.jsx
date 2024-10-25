import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, User, Settings, Menu} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../store/useUserStore.js";
import { useCartStore } from "../store/useCartStore.js";
import { useState } from "react";

const Navbar = () => {

  const {user, logout} = useUserStore();
  const {cart} = useCartStore();
  const isAdmin = user?.role === "admin";
  const [isOpen, setIsOpen] = useState(false);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-md shadow-lg z-40 transition-all duration-300 border-b border-emerald-800">
    <div className="container mx-auto px-4 py-3">
    <div className="flex flex-wrap justify-between items-centers">

        <Link to='/' className = "text-2xl font-bold text-emerald-400 items-center space-x-2 flex">
          Whisk and Drizzle
        </Link>
      
      <nav className="flex flex-wrap items-center gap-4">  

        <Link to = {"/"} className='text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'> Home </Link>

        {user && (
          <Link to={"/cart"} className = 'relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out'>
              <ShoppingCart className='inline-block mr-1 group-hover:text-emerald-400' size = {20} />
              <span className="hidden sm:inline"> Cart </span>
              { cart.length > 0 && <span 
                className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'>
                  {cart.length}
                </span>}
          </Link>  
        )}

      {isAdmin && (
        <Link 
          className='bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-1 rounded-md font-medium transition duration-300 ease-in-out flex items-center'
          to = {"/secret-dashboard"}>
          <Lock className='inline-block mr-1' size={18}  />
          <span className='hidden sm:inline'>Dashboard</span>
        </Link>
      )}

{user ? (
              <div className="relative inline-block text-left">
                <button onClick={toggleDropdown}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out">
                 {/*  <LogOut size={18} />
                  <span className="hidden sm:inline ml-2"> Log Out</span>  */}
                  <Menu size={24} />
                </button>

                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className=" w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                        <User className="mr-2" size={18} />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className=" w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                        <Settings className="mr-2" size={18} />
                        Settings
                      </Link>

                      <Link
                        to="/privacy"
                        className=" w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                        <Settings className="mr-2" size={18} />
                        Privacy & Data
                      </Link>
                      <Link
                        to="/about"
                        className=" w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                        <Settings className="mr-2" size={18} />
                        About Us
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center">
                        <LogOut className="mr-2" size={18} />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div> ): (
        <>
        <Link 
          to={"/signup"}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out">

          <UserPlus className="mr-2" size = {18} />
            Sign up
          </Link>

          <Link 
          to={"/login"}
          className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md flex items-center transition duration-300 ease-in-out">

          <LogIn className="mr-2" size = {18} />
            Login
          </Link>
        </>
      )}
      </nav>
      </div>  
      </div>
    </header>
  );
};

export default Navbar;