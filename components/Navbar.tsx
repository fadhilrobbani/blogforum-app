import Link from 'next/link';
import { NextRouter, useRouter } from 'next/router';

export default function Navbar() {
  const router: NextRouter = useRouter();
  return (
    <>
      <header className="shadow-lg fixed w-full bg-slate-50 text-slate-700  mx-auto flex flex-row gap-3 h-16 items-center px-5 justify-between">
        <p
          className="font-extrabold uppercase hover:cursor-pointer"
          onClick={() => router.push('/')}
        >
          Navbar
        </p>
        <ul className="flex flex-row gap-3">
          <li>
            <Link href="/users">users</Link>
          </li>
          <li>
            <Link href="/blogs">blogs</Link>
          </li>
        </ul>
      </header>
    </>
  );
}
