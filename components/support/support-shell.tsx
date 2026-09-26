"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

type SupportShellProps = {
  current?: "how-it-works" | "contact";
};

function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <Link className={`wordmark ${footer ? "wordmark-footer" : ""}`} href="/" aria-label="Travel and LIV Collective home">
      <span>TRAVEL <i>&</i> LIV</span>
      <small>C O L L E C T I V E</small>
    </Link>
  );
}

export function SupportHeader({ current }: SupportShellProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <header className="support-header">
        <nav className="support-desktop-nav" aria-label="Main navigation">
          <Link href="/trips">Trips</Link>
          <Link href="/how-it-works" aria-current={current === "how-it-works" ? "page" : undefined}>How it works</Link>
          <Link href="/about">Our story</Link>
          <Link href="/contact" aria-current={current === "contact" ? "page" : undefined}>Help</Link>
        </nav>

        <Wordmark />

        <div className="support-header-actions">
          <Link className="support-header-cta" href="/trips">
            Find your trip <ArrowUpRight size={15} />
          </Link>
          <button
            className="support-menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="support-mobile-menu"
            onClick={() => setOpen(value => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {open && (
        <nav id="support-mobile-menu" className="support-mobile-menu" aria-label="Mobile navigation">
          <Link href="/trips" onClick={close}>Trips <ArrowUpRight size={18} /></Link>
          <Link href="/how-it-works" aria-current={current === "how-it-works" ? "page" : undefined} onClick={close}>How it works <ArrowUpRight size={18} /></Link>
          <Link href="/about" onClick={close}>Our story <ArrowUpRight size={18} /></Link>
          <Link href="/contact" aria-current={current === "contact" ? "page" : undefined} onClick={close}>Contact <ArrowUpRight size={18} /></Link>
        </nav>
      )}
    </>
  );
}

export function SupportFooter() {
  return (
    <footer className="support-footer support-wrap">
      <div className="support-footer-main">
        <Wordmark footer />
        <nav aria-label="Footer navigation">
          <Link href="/trips">Trips</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/about">Our story</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <a className="support-follow-link" href="https://www.instagram.com/travelnlivcollective" target="_blank" rel="noreferrer">
          Follow the moments <ArrowUpRight size={14} />
        </a>
      </div>
      <div className="support-footer-bottom">
        <span>© {new Date().getFullYear()} Travel & LIV Collective</span>
        <a href="mailto:Info@travelnliv.com">Info@travelnliv.com</a>
        <span>Go somewhere. Feel something.</span>
      </div>
    </footer>
  );
}
