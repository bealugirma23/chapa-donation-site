"use client";

import { useState } from "react";

export default function Switch() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center space-x-4">
      <div
        className={`relative inline-flex h-[28px] w-[56px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
          isOpen
            ? "bg-[#ffb30038] border"
            : "bg-muted hover:bg-muted-foreground/20 dark:bg-muted-foreground/20"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-accent shadow-lg ring-0 transition duration-200 ease-in-out ${
            isOpen
              ? "translate-x-[28px] bg-accent"
              : "translate-x-0 bg-muted-foreground"
          }`}
        />
      </div>
      <span className="text-muted-foreground">
        {isOpen ? "Transfer" : "Default"}
      </span>
    </div>
  );
}
