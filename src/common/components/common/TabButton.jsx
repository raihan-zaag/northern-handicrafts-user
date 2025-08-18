import React from "react";

const TabButton = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <div>
            <div className="flex items-center gap-4 border-b border-[#EBEDF0]">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`flex-grow border-b-2 duration-300 ${
                            activeTab.title === tab.title
                                ? "border-[#2A2A2A] text-[#2A2A2A]"
                                : "text-[#6A6A6A] border-transparent"
                        } py-3.5 text-[15px] font-semibold`}
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
