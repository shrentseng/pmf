import Link from 'next/link';
import { LinkProvider } from './contexts/link/linkContext';

export default function Home() {
  return (
    <main>
      <Link href='link'>Go to Link page</Link>
    </main>
  );
}
