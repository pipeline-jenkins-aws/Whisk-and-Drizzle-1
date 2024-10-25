import {create} from "zustand";
import axios from "../lib/axios.js";
import {toast} from "react-hot-toast";

export const useUserStore = create((set,get) => ({
    user: null,
    loading: false,
    checkingAuth : true,

    signup : async({name, email, password, confirmPassword}) => {
        set({loading: true});

        if(password!=confirmPassword) {
            set({loading: false});
            return toast.error("Passwords do not match");
        }

        try {
            const res = await axios.post("/auth/signup", {name, email, password});
            set({user: res.data, loading : false});
            
        } catch (error) {
            set({loading: false});
            toast.error(error.response.data.message || "An error occured");
        }
    },

    login : async({email, password}) => {
        set({loading: true});

        try {
            const res = await axios.post("/auth/login", {email, password});
            set({user: res.data, loading : false});
            
        } catch (error) {
            set({loading: false});
            toast.error(error.response.data.message || "An error occured");
        }
    }, 
 
    logout : async() => {
        try {
            await axios.post("auth/logout");
            set({user: null}) ;
        } catch (error) {   
            toast.error(error.response?.data?.message || "An error occured during logout");
        }
    },
    checkAuth : async() => {
        set({checkingAuth : true});
        try {
            const response = await axios.post("/auth/profile");
            set({user: response.data, checkingAuth : false});
        } catch (error) {
            console.log(error.message);
            set({checkingAuth: false, user : null})  
        }
    },

    togglePrivacy: async () => {
        set({ loading: true });
    
        try {
            const res = await axios.post("/auth/privacy");
            
            // Update user state
            set(prevState => ({
                user: { ...prevState.user, ...res.data }, // Merge the updated user data
                loading: false
            }));
    
            // Use get to access the updated user state if your store supports it
            const updatedUser = get().user; // This assumes you have a `get` function to retrieve the state
            console.log(updatedUser.privacy); // Now you can log the updated user state
    
        } catch (error) {
            set({ loading: false });
            toast.error(error.response?.data?.message || "An error occurred");
            console.log(error.message);
        }
    },
    

    refreshToken : async() => {
        
        // Prevent multiple simultaneous refresh attempts 

        if(get().checkingAuth) return;

        set({ checkingAuth : true});

            try {
                const response = axios.post("/auth/refresh-token");
                set({checkingAuth : false});
                return response.data;

            } catch (error) {
                set({user : null, checkingAuth : false});
                throw error;
            }
    },
   

    // Change Username logic
  changeUsername: async (newName) => {
    set({ loading: true });

    try {
      const res = await axios.put("/auth/changename", { newName });
      set((prevState) => ({
        user: { ...prevState.user, name: newName }, // Update name in store
        loading: false,
      }));
      toast.success("Username updated successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error updating name");
    }
  },

  // Change Password logic
  changePassword: async (currentPassword, newPassword) => {
    set({ loading: true });

    try {
      const res = await axios.put("/auth/changepassword", { currentPassword, newPassword });
      set({ loading: false });
      toast.success("Password updated successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Error updating password");
    }
  },
}));


 
    // Refresh Token Axios Interceptor

    let refreshPromise = null;

    axios.interceptors.response.use(
        (response) => response,
        
        async(error) => {
            const originalRequest = error.config;
            if(error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // If a refresh is already in progress, wait for it to complete
                    if(refreshPromise) {
                        await refreshPromise;
                        return axios(originalRequest);
                    }

                    // Start a new refresh process
                    refreshPromise = useUserStore.getState().refreshToken();
                    await refreshPromise;
                    refreshPromise = null;

                    return axios(originalRequest);

                } catch (error) {
                    // if refresh fails, then redirect to login or handle as needed
                    useUserStore.getState().logout();
                    return Promise.reject(refreshError);
                    
                }
            }

            return Promise.reject(error);
        }
    )