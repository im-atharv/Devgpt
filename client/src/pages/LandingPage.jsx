// client/src/pages/LandingPage.jsx

import React from "react";
import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import CTAFooterSection from "../sections/CTAFooterSection";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
            <HeroSection />
            <FeaturesSection />
            <CTAFooterSection />
        </div>
    );
}
