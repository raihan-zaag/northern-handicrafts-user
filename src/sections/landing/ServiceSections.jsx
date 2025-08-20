
import { Container } from '@/common/components';
import Typography from '@/common/components/Typography';

const ServiceSections = () => {
    const services = [
        {
            id: 1,
            icon: '🚚',
            title: 'Fast Delivery',
            description: 'Get Fast and hassle-free delivery of your orders to your doorstep.'
        },
        {
            id: 2,
            icon: '🤝',
            title: 'Super Deals',
            description: 'Stay updated on all our latest news, offers, and campaigns.'
        },
        {
            id: 3,
            icon: '🛍️',
            title: 'Free Shopping',
            description: 'Nothing to Lose, Everything to Gain'
        },
        {
            id: 4,
            icon: '📦',
            title: '03 days Return',
            description: 'Unlock a world of exciting benefits with Never End loyalty program.'
        }
    ];

    return (
        <Container className="py-16 md:py-20 lg:py-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
                {services.map((service) => (
                    <div 
                        key={service.id}
                        className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300"
                    >
                        {/* Icon Container */}
                        <div className="w-16 h-16 md:w-20 md:h-20 mb-4 md:mb-6 flex items-center justify-center bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                            <span className="text-2xl md:text-3xl">{service.icon}</span>
                        </div>
                        
                        {/* Service Title */}
                        <Typography.Title3 className="mb-3 text-gray-dark group-hover:text-primary transition-colors duration-300">
                            {service.title}
                        </Typography.Title3>
                        
                        {/* Service Description */}
                        <Typography.BodyText className="text-gray-medium leading-relaxed max-w-xs">
                            {service.description}
                        </Typography.BodyText>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default ServiceSections;