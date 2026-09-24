import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { LangSwitch } from "../lang-switch";
import { navLinks } from "./constants/nav-links";

export function SiteNav() {
  const { t } = useTranslation();

  return (
    <header className='sticky top-0 z-40 border-b border-border/60 glass-panel'>
      <nav className='mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4'>
        <Link to='/' className='font-title neon-text text-lg font-bold tracking-[0.3em] uppercase'>
          &lt;dev/&gt;
        </Link>

        <div className='hidden flex-wrap items-center gap-3 md:flex'>
          <ul className='flex flex-wrap items-center gap-1 text-sm tracking-widest uppercase'>
            {navLinks.map((link) => (
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
                  {t(link.labelKey)}
                </NavLink>
              </li>
            ))}
          </ul>
          <LangSwitch />
        </div>

        <Sheet>
          <SheetTrigger
            aria-label={t("nav.openMenu")}
            className='inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-accent md:hidden'
          >
            <Menu className='h-5 w-5' />
          </SheetTrigger>

          <SheetContent side='left' className='flex w-72 flex-col p-0'>
            <SheetHeader className='border-b border-border/60'>
              <SheetTitle className='font-title neon-text text-base font-bold tracking-[0.3em] uppercase'>
                &lt;dev/&gt;
              </SheetTitle>
            </SheetHeader>

            <ul className='flex flex-1 flex-col gap-3 p-4 text-base tracking-widest uppercase'>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <SheetClose asChild>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-md px-3 py-3 text-muted-foreground transition-colors hover:text-accent",
                          isActive && "neon-text text-primary",
                        )
                      }
                    >
                      {t(link.labelKey)}
                    </NavLink>
                  </SheetClose>
                </li>
              ))}
            </ul>

            <SheetFooter className='items-start border-t border-border/60'>
              <LangSwitch />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
