import React from "react";

const NavigationBar = () => {
  return (
    <header className="h-full px-5 py-4 shadow-sm border-b-[1px] flex">
      <h1 className="font-bold text-xl flex-none flex items-center justify-center">
        InstaResume
      </h1>
      <div className="grow flex items-center justify-center gap-x-5">
        <h2>Templates</h2>
        <h2>Contribute</h2>
      </div>
      <div className="flex-none flex items-center justify-center gap-x-2">
        <p className="py-1 px-4">Sign In</p>
        <button className="px-4 py-1 border-2 border-black bg-white">
          Register
        </button>
      </div>
    </header>
  );
};

export default NavigationBar;
