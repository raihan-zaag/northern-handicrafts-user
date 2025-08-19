import { redirect } from 'next/navigation';
import { LANDING_URL } from '../common/config/constants/routes.js';

export default function HomePage() {
    redirect(LANDING_URL);
}
