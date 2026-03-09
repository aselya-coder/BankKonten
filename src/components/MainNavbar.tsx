import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { defaultNavLinks } from "@/modules/admin/data/mockContent";
import { fetchContent } from "@/lib/cms";

const MainNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navLinks, setNavLinks] = useState(defaultNavLinks);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const run = async () => {
      const data = await fetchContent("navLinks", defaultNavLinks);
      if (Array.isArray(data)) {
        setNavLinks(data);
      }
    };
    run();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3",
        scrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-xl font-bold text-primary">
          BankKonten<span className="text-foreground">.id</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button size="sm" asChild>
            <a href="#pricing">Mulai Sekarang</a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-foreground focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 bg-background border-b shadow-lg md:hidden transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col p-4 gap-4">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              className="text-lg font-medium hover:text-primary transition-colors py-2 border-b border-border last:border-0"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button className="w-full mt-2" asChild onClick={() => setIsOpen(false)}>
            <a href="#pricing">Mulai Sekarang</a>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
