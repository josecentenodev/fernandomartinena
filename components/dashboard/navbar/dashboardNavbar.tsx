import Link from "next/link";
import React from "react";

function DashboardNavbar() {
  return (
    <>
      <Link href={"/dashboard/banners"} className="p-3 text-2xl">Banners</Link>
      <Link href={"/dashboard/illustrations"} className="p-3 text-2xl">Illustrations</Link>
      <Link href={"/dashboard/shop"} className="p-3 text-2xl">Shop</Link>
      <Link href={"/dashboard/blogandnews"} className="p-3 text-2xl">Blog and News</Link>
    </>
  );
}

export default DashboardNavbar;
