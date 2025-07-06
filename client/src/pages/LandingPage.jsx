// LandingPage.jsx
import React from "react";
import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import CTAFooterSection from "../sections/CTAFooterSection";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-white">
            <HeroSection />
            <FeaturesSection />
            <CTAFooterSection />
        </div>
    );
}
