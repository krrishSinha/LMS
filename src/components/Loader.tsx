"use client";

import React from "react";


export default function FullScreenLoader() {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070A10] ">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
        </div>
    );
}
