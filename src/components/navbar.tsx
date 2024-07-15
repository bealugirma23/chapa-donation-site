import React from 'react'
import { HeartIcon } from "@/components/some";
import Link from 'next/link';
import { CrossIcon } from 'lucide-react';


function NavBar() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b">
    <Link href="#" className="flex items-center justify-center" prefetch={false}>
      <CrossIcon className="h-6 w-6 text-accent" />
      <span className="sr-only">Charity Foundation</span>
    </Link>
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground"
        prefetch={false}
      >
        About
      </Link>
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground"
        prefetch={false}
      >
        Donate
      </Link>
      <Link
        href="#"
        className="text-sm font-medium hover:underline underline-offset-4 text-primary-foreground"
        prefetch={false}
      >
        Contact
      </Link>
    </nav>
  </header>
  )
}

export default NavBar