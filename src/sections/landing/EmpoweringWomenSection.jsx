import TwoColumnSection from "@/common/components/shared/TwoColumnSection";

const EmpoweringWomenSection = () => {
    // Default data if none provided
    const defaultData = {
        title: (
            <>
                Empowering Women,{" "}
                <span className="block">Preserving Tradition</span>
            </>
        ),
        description: `At Local Women's Handicrafts, our mission is to provide fair wages, education, and empowerment to women artisans. Through our sustainable and ethical entrepreneurial model, we create job opportunities in some of the world's most underprivileged communities. Our vision is to build a textile industry rooted in dignity, human rights, and environmental responsibility — where every product tells a story of resilience and hope.`,
        images: [
            {
                src: "https://images.unsplash.com/photo-1755216007736-9920ec4d07f3?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Woman artisan working on handicrafts"
            },
            {
                src: "https://images.unsplash.com/photo-1755216007736-9920ec4d07f3?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Woman artisan crafting traditional items"
            },
            {
                src: "https://images.unsplash.com/photo-1755216007736-9920ec4d07f3?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Woman artisan at work"
            },
            {
                src: "https://images.unsplash.com/photo-1755216007736-9920ec4d07f3?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Woman artisan weaving"
            },
            {
                src: "https://images.unsplash.com/photo-1755216007736-9920ec4d07f3?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Woman artisan creating handicrafts"
            },
            {
                src: "https://images.unsplash.com/photo-1755216007736-9920ec4d07f3?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Woman artisan working with textiles"
            },
            {
                src: "https://images.unsplash.com/photo-1755216007736-9920ec4d07f3?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Woman artisan in traditional dress working"
            },
            {
                src: "https://images.unsplash.com/photo-1755216007736-9920ec4d07f3?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Woman artisan crafting traditional products"
            },
            {
                src: "https://images.unsplash.com/photo-1755216007736-9920ec4d07f3?q=80&w=1075&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                alt: "Woman artisan working on handicrafts"
            }
        ]
    };

    // Merge provided data with defaults
    const sectionData = { ...defaultData };

    return (
        <TwoColumnSection
            title={sectionData.title}
            description={sectionData.description}
            images={sectionData.images}
            gridCols={3}
            showImageGrid={true}
            containerClassName="py-16 md:py-24"
        />
    );
};

export default EmpoweringWomenSection;
