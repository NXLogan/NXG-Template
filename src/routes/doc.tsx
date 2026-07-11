import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/doc")({
  head: () => ({
    meta: [
      { title: "Documentation — NØRMA®" },
      { name: "description", content: "Installation as an art form. The NØRMA catalogue essay." },
      { property: "og:title", content: "Documentation — NØRMA®" },
      { property: "og:description", content: "The NØRMA catalogue essay." },
    ],
  }),
  component: Doc,
});

const TOC = [
  { id: "prologue", label: "00 — Prologue" },
  { id: "install", label: "01 — Installation" },
  { id: "conduct", label: "02 — Conduct" },
  { id: "epilogue", label: "03 — Epilogue" },
];

function Doc() {
  return (
    <main className="pt-28">
      <section className="px-6 md:px-10 pb-16 border-b border-white/10">
        <div className="mono-label text-white/50 mb-6">DOCUMENT / CATALOGUE ESSAY</div>
        <h1 className="display text-white text-6xl md:text-[9rem] leading-none">
          Instructions<br/><span className="text-white/40">for keeping.</span>
        </h1>
        <p className="mt-8 max-w-lg text-white/60">
          The following pages document the handling, installation, and cultural
          conduct expected of the artifact bearer.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-10 py-20">
        <aside className="md:col-span-3">
          <div className="md:sticky md:top-28">
            <div className="mono-label text-white/50 mb-4">CONTENTS</div>
            <ul className="space-y-3">
              {TOC.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="story-link text-white text-sm">{t.label}</a>
                </li>
              ))}
            </ul>
            <div className="mt-10 mono-label text-white/40">
              EDITION 001<br/>REV. MMXXVI.01
            </div>
          </div>
        </aside>

        <article className="md:col-span-8 md:col-start-5 space-y-20 max-w-2xl">
          <Chapter id="prologue" num="00" title="Prologue">
            <p>
              You are reading a document that accompanies an object which does not,
              in the traditional sense, exist. An artifact issued by NØRMA is a
              gesture — a decision — that has been rendered legible by the medium
              of software.
            </p>
            <p>
              The pages that follow describe how to receive that gesture,
              how to install it upon your instrument of choice, and how to
              conduct yourself as its temporary custodian.
            </p>
          </Chapter>

          <Chapter id="install" num="01" title="Installation">
            <p>
              Locate the transmission in your account ledger. The file will
              present itself as an archive marked <em>N/</em> followed by the
              artifact's edition number.
            </p>
            <ol className="list-decimal list-outside pl-6 space-y-3">
              <li>Extract the archive to a location free of ceremony.</li>
              <li>Consult the enclosed manifest — a plain-text confession of every included file.</li>
              <li>Move the payload directory into your platform's designated addons folder.</li>
              <li>Restart the host application. The artifact will announce itself, silently, upon next launch.</li>
            </ol>
            <p className="text-white/50 text-sm border-l border-white/20 pl-4">
              Note. NØRMA does not distribute installers. Automation would remove
              the last remaining ritual and we consider ritual essential.
            </p>
          </Chapter>

          <Chapter id="conduct" num="02" title="Conduct">
            <p>
              As a bearer of a NØRMA artifact, you are asked, though not
              required, to observe the following:
            </p>
            <ul className="list-disc list-outside pl-6 space-y-3">
              <li>Do not describe the artifact in the language of ownership.</li>
              <li>Do not attempt to redistribute it. Scarcity is meaning.</li>
              <li>Do not photograph it against decorative backgrounds.</li>
              <li>If asked what it is, respond truthfully: <em>a decision I made.</em></li>
            </ul>
          </Chapter>

          <Chapter id="epilogue" num="03" title="Epilogue">
            <p>
              We thank you for your participation in this document. Should the
              artifact one day cease to function — through the passage of platforms,
              the mutation of software, or your own change of heart — you are
              asked to file it, not delete it.
            </p>
            <p className="display text-3xl md:text-5xl text-white leading-tight pt-4">
              An artifact is a decision.<br/>
              Yours has already been made.
            </p>
          </Chapter>
        </article>
      </section>

      <Footer />
    </main>
  );
}

function Chapter({ id, num, title, children }: { id: string; num: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-32">
      <div className="mono-label text-white/40 mb-2">{num}</div>
      <h2 className="display text-white text-4xl md:text-6xl mb-8">{title}</h2>
      <div className="space-y-6 text-white/75 text-lg leading-relaxed">{children}</div>
    </section>
  );
}
