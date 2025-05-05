import React from 'react';
import Link from 'next/link';

const Navbar = () => (
  <div className="navbar bg-base-100 shadow">
    <div className="flex-1">
      <Link href="/" className="btn btn-ghost text-xl lowercase">nomad</Link>
    </div>
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-square lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link href="#">Home</Link></li>
          <li><Link href="#">About</Link></li>
          <li><Link href="#">Services</Link></li>
          <li><Link href="#">Contact</Link></li>
        </ul>
      </div>
      <ul className="menu menu-horizontal px-1 hidden lg:flex">
        <li><Link href="#">Home</Link></li>
        <li><Link href="#">About</Link></li>
        <li><Link href="#">Services</Link></li>
        <li><Link href="#">Contact</Link></li>
      </ul>
    </div>
  </div>
);

export default Navbar; 