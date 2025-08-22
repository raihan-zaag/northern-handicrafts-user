'use client';

import { Button } from '@/common/components';
import Typography from '@/common/components/Typography';
import { LOGIN_URL } from '@/common/config/constants/routes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const SuccessfullyChanged = () => {
  const router = useRouter();
  return (
    <div>
      <div className="w-full md:w-600px bg-background p-8 rounded border border-border">
        <div className="w-full flex justify-center pb-16 pt-9 sm:pt-12">
          <Image
            width={1000}
            height={1000}
            alt="successfullyChanged"
            src={'/images/collaboration.png'}
            quality={100}
            className="w-40 h-40"
          />
        </div>

        <Typography.Title1 className="mb-3 text-center">
          Password Reset Successfully
        </Typography.Title1>

        <Typography.Description className="text-center mt-2 mb-6">
          Your password has been reset successfully. Please go back to sign in
          page and try to log in again with the new password.
        </Typography.Description>

        <Button
          type="submit"
          className="w-full mt-9"
          onClick={() => router.push(LOGIN_URL)}
        >
          Go Back to Sign In
        </Button>
      </div>
    </div>
  );
};

export default SuccessfullyChanged;
