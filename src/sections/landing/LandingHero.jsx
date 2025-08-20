'use client'
import HeroSection from './HeroSection';

const LandingHero = () => {
    const handleViewProducts = () => {
        // Handle navigation to products page
        // This can be replaced with actual navigation logic
        // e.g., router.push('/products') or window.location.href = '/products'
    };

    return (
        <HeroSection
            backgroundImage="https://images.unsplash.com/photo-1755216007736-9920ec4d07f3?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your actual image path
            title="Bring Nature Into Your Home"
            description="Discover handcrafted decor made by empowered women — sustainably made to brighten your space and support a greener future."
            buttonText="View all product"
            onButtonClick={handleViewProducts}
        />
    );
};

export default LandingHero;
