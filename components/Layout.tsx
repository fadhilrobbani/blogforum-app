import Head from 'next/head';
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
  pageTitle: string;
}
export default function Layout({ children, pageTitle }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Navbar />
      <main className="pt-[65px]">{children}</main>
    </>
  );
}
