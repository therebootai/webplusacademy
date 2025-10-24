"use client";

export default function Studentlogin({ onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#FFFBF2] bg-opacity-50 z-[60]">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-red-600">
          Student Login
        </h2>

      
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Registration No
            </label>
            <input
              type="text"
              placeholder="Enter Registration No"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
