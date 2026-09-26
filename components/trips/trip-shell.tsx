import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export function TripHeader({ detail = false }: { detail?: boolean }) {
  return <header className="tr-header">
    <Link href={detail ? "/trips" : "/"} className="tr-back"><ArrowLeft size={14} /><span>{detail ? "All trips" : "Home"}</span></Link>
    <Link className="wordmark" href="/" aria-label="Travel and LIV Collective home"><span>TRAVEL <i>&</i> LIV</span><small>C O L L E C T I V E</small></Link>
    <Link className="tr-story-link" href="/about">Our story <ArrowUpRight size={14} /></Link>
  </header>;
}
export function TripFooter() {
  return <footer className="tr-footer tr-wrap"><Link href="/" className="tr-footer-name">TRAVEL <i>&</i> LIV</Link><nav aria-label="Footer navigation"><Link href="/trips">All trips</Link><Link href="/about">Our story</Link><a href="mailto:Info@travelnliv.com">Get in touch</a></nav><span>© {new Date().getFullYear()} Travel & LIV Collective</span></footer>;
}
