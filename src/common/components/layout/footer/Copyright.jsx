import Image from 'next/image';
const Copyright = () => {
    return (
        <div className="mt-12 text-center text-sm border-t border-border-dark pt-6 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
            <p className="text-xs sm:text-base">
                © All rights reserved
            </p>

            <div className='flex items-center justify-center gap-3 md:gap-6'>
                <Image
                    src="/certification/ethical_certification.png"
                    alt="payment with stripe"
                    height={60}
                    width={60}
                    quality={100}
                    className='size-15'
                />
                <Image
                    src="/certification/lin_six_certification.png"
                    alt="payment with stripe"
                    height={60}
                    width={60}
                    quality={100}
                    className='size-15'
                />
                <Image
                    src="/certification/ai_certification.png"
                    alt="payment with stripe"
                    height={60}
                    width={60}
                    quality={100}
                    className='size-15'
                />
                <Image
                    src="/certification/ethical_certification.png"
                    alt="payment with stripe"
                    height={60}
                    width={60}
                    quality={100}
                    className='size-15'
                />
            </div>


            <div className="flex items-center justify-center gap-3 md:gap-6">
                <p className="text-xs sm:text-base ">
                    Payment Securely with
                </p>
                <Image
                    src="/icons/Stripe_Logo.svg"
                    alt="payment with stripe"
                    height={48}
                    width={20}
                    quality={100}
                    className='w-12 h-5'
                />

            </div>
        </div>
    );
};

export default Copyright;