import React from "react";

const TabButton = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div>
            <div className="flex items-center gap-4 border-b border-border-gray">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`flex-grow border-b-2 duration-300 ${
                            activeTab.title === tab.title
                                ? "border-gray-dark text-gray-dark"
                                : "text-gray border-transparent"
                        } py-3.5 text-md2 font-semibold`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabButton;
