import React, { useState, useEffect } from 'react';
import { useUserStore } from '../store/useUserStore';

const ProfilePage = () => {
  const { user } = useUserStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/orders`, {
          headers: {
            'Authorization': `Bearer ${user.token}`, // Assuming you have a token in user object
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center text-emerald-400 mb-8">Profile</h1>

      <div className="bg-grey shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        {/* User Details */}
        <h2 className="text-2xl font-semibold text-emerald-400 mb-8">Your Details</h2>
        <div className="space-y-4 text-lg">
          <p><strong>Name:</strong> {user.name || 'N/A'}</p>
          <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        </div>

        {/* Orders Section */}
        <h2 className="text-2xl font-semibold text-emerald-400 mt-12">Your Orders</h2>

        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="mt-8 space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border p-4 rounded-lg shadow-sm">
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                <p><strong>Products:</strong></p>
                <ul className="list-disc pl-5">
                  {order.products.map((item) => (
                    <li key={item.product._id}>
                      {item.product.name} (x{item.quantity}) - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
