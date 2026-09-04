import { Link, NavLink } from "react-router-dom";
import { m } from "@/paraglide/messages";
import { cn } from "@/lib/utils";
import { LangSwitch } from "./lang-switch";

export function SiteNav() {
  const links = [{ to: "/", label: m["nav.home"](), end: true }] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 glass-panel">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <Link
          to="/"
          className="font-title neon-text text-lg font-bold tracking-[0.3em] uppercase"
        >
          &lt;dev/&gt;
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <ul className="flex flex-wrap items-center gap-1 text-sm tracking-widest uppercase">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    cn(
                      "rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-accent",
                      isActive && "neon-text text-primary",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <LangSwitch />
        </div>
      </nav>
    </header>
  );
}
