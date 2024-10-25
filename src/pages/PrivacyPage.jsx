import { useState, useEffect } from "react";
import { useUserStore } from "../store/useUserStore";

const PrivacyPage = () => {
    const { user, togglePrivacy } = useUserStore();
    const [cookiesEnabled, setCookiesEnabled] = useState(false); 
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        console.log("User object on mount:", user); 
        if (user) {
            setCookiesEnabled(user.privacy);
        }
    }, [user]);
    
    const handleToggle = async () => {
        setLoading(true); 
        try {
            const response = await togglePrivacy(); 
            setCookiesEnabled(response.privacy); 
        } catch (error) {
            console.error("Error toggling privacy:", error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-center text-emerald-400 mb-8">Data & Privacy Policy</h1>

            <div className="text-white text-lg space-y-6">
                <p>
                    At <strong>Whisk and Drizzle</strong>, we are committed to protecting your privacy and ensuring the safety of your personal information. This Data & Privacy Policy outlines how we collect, use, and safeguard the information you provide when using our website and services.
                </p>

                <h2 className="text-2xl font-semibold text-emerald-400 mt-8">Information We Collect</h2>
                <p>
                    To provide you with a seamless shopping experience, we collect various types of personal data, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>Personal Information:</strong> When you create an account, place an order, or sign up for our newsletter, we collect personal details such as your name, email address, shipping address, and payment information.
                    </li>
                    <li>
                        <strong>Order Information:</strong> We track details related to your purchases to ensure accurate delivery and customer support.
                    </li>
                    <li>
                        <strong>Cookies and Tracking:</strong> We use cookies to enhance your browsing experience, remembering your preferences, and offering personalized recommendations.
                    </li>
                </ul>

                {/* Custom Toggle Button */}
                <div className="flex items-center space-x-3 mt-6">
                    <label className="text-white font-medium">
                        Privacy Mode
                    </label>
                    <button
                        onClick={handleToggle}
                        className={`relative inline-flex items-center w-12 h-6 transition-colors duration-300 ease-in-out rounded-full ${
                            cookiesEnabled ? 'bg-emerald-600' : 'bg-gray-400'
                        }`}
                        disabled={loading} 
                    >
                        <span
                            className={`absolute left-0 w-6 h-6 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${
                                cookiesEnabled ? 'translate-x-6' : 'translate-x-0'
                            }`}
                        />
                    </button>
                </div>

                {cookiesEnabled ? (
                    <p className="mt-2 text-sm text-emerald-600">Non-essential cookies are currently enabled to improve your experience.</p>
                ) : (
                    <p className="mt-2 text-sm text-red-600">Non-essential cookies are disabled. Some features may not work properly.</p>
                )}
            </div>
        </div>
    );
};

export default PrivacyPage;
