import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => (
  <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
    {/* Logo Section */}
    <div className="flex flex-col items-center md:items-start gap-4 mb-8 md:mb-0">
      <Image
        src="/assets/brand/nomad-logo-full.svg"
        alt="Nomad"
        width={150}
        height={40}
        priority
      />
      <p className="text-sm text-base-content/70">
        Making visa applications simple and efficient
      </p>
    </div>

    <nav>
      <h6 className="footer-title">Services</h6>
      <Link href="#" className="link link-hover">Branding</Link>
      <Link href="#" className="link link-hover">Design</Link>
      <Link href="#" className="link link-hover">Marketing</Link>
      <Link href="#" className="link link-hover">Advertisement</Link>
    </nav>
    <nav>
      <h6 className="footer-title">Company</h6>
      <Link href="#" className="link link-hover">About us</Link>
      <Link href="#" className="link link-hover">Contact</Link>
      <Link href="#" className="link link-hover">Jobs</Link>
      <Link href="#" className="link link-hover">Press kit</Link>
    </nav>
    <nav>
      <h6 className="footer-title">Social</h6>
      <div className="grid grid-flow-col gap-4">
        <a href="#" aria-label="Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195a4.92 4.92 0 0 0-8.384 4.482C7.691 8.095 4.066 6.13 1.64 3.161c-.542.929-.856 2.01-.857 3.17 0 2.188 1.115 4.117 2.823 5.254a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.058 0 14.009-7.496 14.009-13.986 0-.21-.005-.423-.015-.634A9.936 9.936 0 0 0 24 4.557z" /></svg>
        </a>
        <a href="#" aria-label="YouTube">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184C21.403 3.633 22.5 5.01 22.5 7.5v9c0 2.49-1.097 3.867-2.885 4.316C17.09 21.5 12 21.5 12 21.5s-5.09 0-7.615-.684C3.097 20.367 2 18.99 2 16.5v-9c0-2.49 1.097-3.867 2.885-4.316C6.91 2.5 12 2.5 12 2.5s5.09 0 7.615.684zM10 9.5v5l5-2.5-5-2.5z" /></svg>
        </a>
        <a href="#" aria-label="Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.729 0 1.326-.597 1.326-1.326V1.326C24 .597 23.403 0 22.675 0" /></svg>
        </a>
      </div>
    </nav>
  </footer>
);

export default Footer; 