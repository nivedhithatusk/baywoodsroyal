import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { HOTEL_INFO, ROOMS, AMENITIES, TESTIMONIALS } from "@/lib/constants";
import exteriorImg from "@assets/generated_images/luxury_hotel_exterior_tamil_nadu.png";
import * as Icons from "lucide-react";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={exteriorImg} 
            alt="Hotel Exterior" 
            className="w-full h-full object-cover animate-in fade-in zoom-in duration-1000 scale-105"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm md:text-base uppercase tracking-[0.2em] mb-2 text-primary-foreground/90">
              Welcome to Tamil Nadu
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight mb-4">
              {HOTEL_INFO.name}
            </h1>
            <p className="text-lg md:text-2xl font-light text-white/90 max-w-2xl mx-auto font-sans">
              {HOTEL_INFO.tagline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8"
          >
            <Link href="/booking">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-none px-10 py-6 text-lg tracking-widest uppercase">
                Book Your Stay
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[1px] h-12 bg-white/50 mx-auto" />
          <span className="text-[10px] uppercase tracking-widest mt-2 block">Scroll</span>
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <span className="text-primary font-semibold tracking-widest uppercase text-sm">Discover</span>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">
                A Sanctuary of <br/> <span className="text-primary italic">Timeless Elegance</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Nestled in the cultural heart of Tamil Nadu, {HOTEL_INFO.name} brings together the grandeur of Chettinad heritage and contemporary luxury. Every corner tells a story, every room offers a sanctuary, and every meal is a celebration.
              </p>
              <div className="pt-4">
                <Link href="/about">
                  <Button variant="outline" className="border-foreground text-foreground hover:bg-foreground hover:text-background rounded-none px-8 py-6 uppercase tracking-wider text-xs">
                    Read Our Story
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-muted overflow-hidden relative z-10">
                <img 
                  src={ROOMS[2].image} 
                  alt="Hotel Interior" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/10 z-0 hidden md:block" />
              <div className="absolute -top-8 -right-8 w-40 h-40 border border-primary/30 z-0 hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Showcase */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-primary font-semibold tracking-widest uppercase text-sm">Accommodations</span>
            <h2 className="text-4xl md:text-5xl font-serif">Stay in Comfort</h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Choose from our selection of meticulously designed rooms and suites, each offering a unique blend of heritage charm and modern amenities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ROOMS.map((room) => (
              <div key={room.id} className="group relative bg-background/5 overflow-hidden hover:bg-background/10 transition-colors duration-300">
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-serif text-white">{room.name}</h3>
                    <span className="text-primary font-serif text-xl">{HOTEL_INFO.currency} {room.price}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                    {room.description}
                  </p>
                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <div className="text-xs text-white/50 uppercase tracking-wider flex gap-3">
                      <span>{room.capacity} Guests</span>
                      <span>•</span>
                      <span>{room.amenities[0]}</span>
                    </div>
                    <Link href={`/booking?room=${room.id}`}>
                      <span className="text-primary text-sm uppercase font-semibold tracking-wider cursor-pointer hover:text-white transition-colors">
                        Book
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <span className="text-primary font-semibold tracking-widest uppercase text-sm">Amenities</span>
              <h2 className="text-4xl md:text-5xl font-serif text-foreground">
                World-Class <br/> Services
              </h2>
              <p className="text-muted-foreground">
                We pride ourselves on providing exceptional service and amenities to ensure your stay is nothing short of perfect.
              </p>
              <Link href="/contact">
                <Button className="rounded-none bg-primary text-primary-foreground px-8 py-6 uppercase tracking-widest text-xs hover:bg-primary/90">
                  Contact Concierge
                </Button>
              </Link>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {AMENITIES.map((item, idx) => {
                const Icon = (Icons as any)[item.icon] || Icons.Star;
                return (
                  <div key={idx} className="flex gap-4 p-6 border border-border/50 hover:border-primary/50 transition-colors group">
                    <div className="h-12 w-12 shrink-0 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-serif font-semibold mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <Icons.Quote className="h-12 w-12 text-primary/30 mx-auto mb-8" />
          <h2 className="text-4xl font-serif mb-12">Guest Experiences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-background p-8 shadow-sm border border-border/50 text-left">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Icons.Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{t.text}"</p>
                <div>
                  <p className="font-serif font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-primary uppercase tracking-wider">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src={exteriorImg} className="w-full h-full object-cover grayscale" alt="Background" />
        </div>
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif text-white">Experience Royal Comfort</h2>
          <p className="text-white/70 max-w-xl mx-auto text-lg">
            Your journey into elegance and tradition begins here. Book your stay at {HOTEL_INFO.name} today.
          </p>
          <Link href="/booking">
            <Button size="lg" className="bg-white text-secondary hover:bg-white/90 rounded-none px-12 py-8 text-lg uppercase tracking-widest font-semibold">
              Book Now
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
