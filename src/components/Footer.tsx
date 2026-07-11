import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "./Logo";

export function Footer() {
  const [audio, setAudio] = useState(false);
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

      <div className="px-6 md:px-10 py-4 border-t border-white/10 flex items-center justify-between">
        <button
          onClick={() => setAudio((a) => !a)}
          className="group flex items-center gap-3 mono-label text-white"
          aria-pressed={audio}
        >
          <span className="relative inline-flex items-center h-4 w-8 border border-white/40">
            <span
              className={`absolute top-0 bottom-0 w-3 bg-white transition-all duration-300 ${
                audio ? "left-[calc(100%-0.75rem)]" : "left-0"
              }`}
            />
          </span>
          <span>{audio ? "AUDIO ENABLED" : "ENABLE AUDIO"}</span>
          <span className="text-white/40">·</span>
          <span className="text-white/40">EXPERIMENTAL</span>
        </button>
        <div className="mono-label text-white/40 hidden md:flex items-center gap-3">
          <span className="inline-block h-2 w-2 rounded-full bg-white/60 animate-pulse" />
          SIGNAL ACTIVE
        </div>
      </div>

      <div className="px-6 md:px-10 py-6 border-t border-white/10 flex flex-col md:flex-row justify-between mono-label text-white/40 gap-2">
        <span>© NØRMA® MMXXVI — ALL ARTIFACTS RESERVED</span>
        <span>NOT COMMERCE · CULTURE</span>
      </div>
    </footer>
  );
}
