"use client";

import { useState } from "react";

const TabMenu = () => {
  const [activeTab, setActiveTab] = useState("account");

  return (
    <div className="flex border-b border-gray-600 mb-4 -mx-6">
      {/* Account Settings Tab */}
      <button
        className={`px-6 py-2 ${
          activeTab === "account"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab("account")}
      >
        Account Settings
      </button>

      {/* Payment Methods Tab */}
      <button
        className={`px-4 py-2 ${
          activeTab === "payment"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-400"
        }`}
        onClick={() => setActiveTab("payment")}
      >
        Payment Methods
      </button>
    </div>
  );
};

export default TabMenu;
