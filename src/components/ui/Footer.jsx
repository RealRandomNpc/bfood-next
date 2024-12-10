import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer({ footerSettings }) {
  return (
    <footer className="bg-b-text-900 text-b-bg-primary rounded-t-2xl pt-4 pb-16 px-5">
      <div className="mx-auto max-w-5xl flex flex-col gap-3">
        <Image
          src={footerSettings.footer_logo?.url}
          height={footerSettings.footer_logo?.height}
          width={footerSettings.footer_logo?.width}
          className="rounded-lg w-10 h-10"
          alt={footerSettings.footer_logo?.alt}
        />
        <div className="w-10 h-1 rounded-full bg-b-primary-default"></div>
        <div className="flex gap-4 flex-wrap">
          {footerSettings.links.map(l => <Link key={l.id} className="opacity-85 hover:opacity-100 hover:underline" href={l.link}>{l.label}</Link>)}
        </div>
        <div dir="ltr">
        © B1 Market
        </div>

      </div>
    </footer>
  );
}

export default Footer;
