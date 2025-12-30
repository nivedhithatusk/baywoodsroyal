import { Link, useLocation } from "wouter";
import { HOTEL_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X, Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/booking", label: "Book a Stay" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b border-transparent",
        isScrolled || location !== "/" 
          ? "bg-background/95 backdrop-blur-md border-border/40 py-4 shadow-sm" 
          : "bg-transparent py-6 text-white"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/">
          <a className="text-2xl md:text-3xl font-serif font-bold tracking-tight hover:opacity-80 transition-opacity">
            {HOTEL_INFO.name}
          </a>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cn(
                  "text-sm font-medium tracking-wide uppercase hover:text-primary transition-colors relative group",
                  location === link.href ? "text-primary" : ""
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                  location === link.href ? "w-full" : ""
                )} />
              </a>
            </Link>
          ))}
          <Link href="/booking">
            <Button 
              variant="outline" 
              className={cn(
                "border-primary text-primary hover:bg-primary hover:text-white rounded-none uppercase tracking-widest text-xs font-semibold px-6",
                !isScrolled && location === "/" ? "border-white text-white hover:bg-white hover:text-black" : ""
              )}
            >
              Book Now
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col space-y-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a 
                className="block text-lg font-serif p-2 hover:bg-muted/50 rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <Link href="/booking">
            <Button className="w-full rounded-none bg-primary text-primary-foreground">
              Book Your Stay
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-3xl font-serif font-bold text-primary">{HOTEL_INFO.name}</h3>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              {HOTEL_INFO.tagline}. Discover a world of refined luxury and timeless heritage in Tamil Nadu.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold tracking-wide text-primary uppercase">Contact</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>{HOTEL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href={`tel:${HOTEL_INFO.phone}`} className="hover:text-white transition-colors">{HOTEL_INFO.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href={`mailto:${HOTEL_INFO.email}`} className="hover:text-white transition-colors">{HOTEL_INFO.email}</a>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-serif font-semibold tracking-wide text-primary uppercase">Explore</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/about"><a className="hover:text-white transition-colors">Our Story</a></Link></li>
              <li><Link href="/booking"><a className="hover:text-white transition-colors">Rooms & Suites</a></Link></li>
              <li><Link href="/booking"><a className="hover:text-white transition-colors">Special Offers</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-white transition-colors">Get in Touch</a></Link></li>
            </ul>
            <div className="flex gap-4 pt-4">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-white transition-colors"><Twitter className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {HOTEL_INFO.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
