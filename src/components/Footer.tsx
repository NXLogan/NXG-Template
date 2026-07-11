import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-2">
          <Logo size={44} />
          <p className="display text-4xl md:text-5xl mt-6 max-w-lg">
            We don't sell products. We distribute artifacts.
          </p>
        </div>
        <div>
          <div className="mono-label text-white/40 mb-4">INDEX</div>
          <div className="flex flex-col gap-2">
            <Link to="/" className="story-link w-fit">Home</Link>
            <Link to="/products" className="story-link w-fit">Products</Link>
            <Link to="/faq" className="story-link w-fit">FAQ</Link>
            <Link to="/doc" className="story-link w-fit">Doc</Link>
          </div>
        </div>
        <div>
          <div className="mono-label text-white/40 mb-4">ELSEWHERE</div>
          <div className="flex flex-col gap-2">
            <a className="story-link w-fit" href="#">Instagram</a>
            <a className="story-link w-fit" href="#">Discord</a>
            <a className="story-link w-fit" href="#">X / Twitter</a>
            <a className="story-link w-fit" href="#">Contact</a>
          </div>
        </div>
      </div>
      <div className="px-6 md:px-10 py-6 border-t border-white/10 flex flex-col md:flex-row justify-between mono-label text-white/40 gap-2">
        <span>© NØRMA® MMXXVI — ALL ARTIFACTS RESERVED</span>
        <span>NOT COMMERCE · CULTURE</span>
      </div>
    </footer>
  );
}
