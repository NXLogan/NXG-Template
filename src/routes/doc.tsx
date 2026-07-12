import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/layout/Footer";
import { useI18n } from "@/lib/i18n/context";

export const Route = createFileRoute("/doc")({
  head: () => ({
    meta: [
      { title: "Documentation — NAME®" },
      { name: "description", content: "Installation as an art form. The NAME catalogue essay." },
      { property: "og:title", content: "Documentation — NAME®" },
      { property: "og:description", content: "The NAME catalogue essay." },
    ],
  }),
  component: Doc,
});

function Doc() {
  const { t, ti } = useI18n();
  const chapters = t.doc.chapters;

  return (
    <main className="page-offset-top">
      <section className="page-gutter-x pb-12 md:pb-16 border-b border-border">
        <h1 className="page-display-title">
          <span className="silver-text">{t.doc.title1}</span><br/>
          <span className="text-foreground/40">{t.doc.title2}</span>
        </h1>
        <p className="mt-8 max-w-lg text-foreground/60">{t.doc.intro}</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 page-gutter-x py-12 md:py-20">
        <aside className="md:col-span-3">
          <div className="md:hidden mb-6">
            <nav className="doc-toc-chips" aria-label="Chapters">
              {chapters.map((ch) => (
                <a key={ch.id} href={`#${ch.id}`} className="doc-toc-chip">
                  {ch.title}
                </a>
              ))}
            </nav>
          </div>
          <div className="hidden md:block md:sticky md:top-28 surface-glass rounded-sm p-6">
            <ul className="space-y-3">
              {chapters.map((ch) => (
                <li key={ch.id}>
                  <a href={`#${ch.id}`} className="story-link text-foreground text-sm">{ch.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className="md:col-span-8 md:col-start-5 space-y-20 max-w-2xl">
          {chapters.map((ch) => (
            <section key={ch.id} id={ch.id} className="scroll-mt-32">
              <h2 className="display text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 md:mb-8 text-balance">{ch.title}</h2>
              <div className="space-y-6 text-foreground/75 text-lg leading-relaxed">
                {ch.paragraphs.map((p, i) => (
                  <p key={i}>{ti(p)}</p>
                ))}

                {"list" in ch && ch.list && (
                  <ol className="list-decimal list-outside pl-6 space-y-3">
                    {ch.list.map((item, i) => <li key={i}>{item}</li>)}
                  </ol>
                )}

                {"note" in ch && ch.note && (
                  <p className="text-foreground/50 text-sm border-l border-foreground/20 pl-4">
                    {ti(ch.note)}
                  </p>
                )}

                {"bullets" in ch && ch.bullets && (
                  <ul className="list-disc list-outside pl-6 space-y-3">
                    {ch.bullets.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                )}

                {"closing1" in ch && ch.closing1 && (
                  <p className="display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight pt-4 text-balance">
                    {ch.closing1}<br/>{ch.closing2}
                  </p>
                )}
              </div>
            </section>
          ))}
        </article>
      </section>

      <Footer />
    </main>
  );
}
