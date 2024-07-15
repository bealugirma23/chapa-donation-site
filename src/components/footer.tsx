import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p className="text-xs text-muted-foreground">
      &copy; 2024 Charity Foundation. All rights reserved.
    </p>
    <nav className="sm:ml-auto flex gap-4 sm:gap-6">
      <Link
        href="#"
        className="text-xs hover:underline underline-offset-4 text-muted-foreground"
        prefetch={false}
      >
        Privacy
      </Link>
      <Link
        href="#"
        className="text-xs hover:underline underline-offset-4 text-muted-foreground"
        prefetch={false}
      >
        Terms
      </Link>
    </nav>
  </footer>
  )
}

export default Footer