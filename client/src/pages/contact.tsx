import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HOTEL_INFO } from "@/lib/constants";
import { MapPin, Phone, Mail } from "lucide-react";
import exteriorImg from "@assets/generated_images/luxury_hotel_exterior_tamil_nadu.png";

export default function Contact() {
  return (
    <Layout>
      <div className="relative h-[40vh]">
         <div className="absolute inset-0">
           <img src={exteriorImg} className="w-full h-full object-cover" alt="Contact" />
           <div className="absolute inset-0 bg-black/60" />
         </div>
         <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
           <h1 className="text-5xl font-serif mb-4">Contact Us</h1>
           <p className="text-lg font-light">We are here to assist you</p>
         </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-4xl font-serif text-foreground">Get in Touch</h2>
            <p className="text-muted-foreground leading-relaxed">
              Whether you have a question about your booking, need help planning your stay, or want to organize an event, our dedicated team is ready to assist you.
            </p>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold mb-1">Address</h4>
                  <p className="text-muted-foreground">{HOTEL_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold mb-1">Phone</h4>
                  <p className="text-muted-foreground">{HOTEL_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-semibold mb-1">Email</h4>
                  <p className="text-muted-foreground">{HOTEL_INFO.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-muted/30 p-8 border border-border">
            <h3 className="text-2xl font-serif mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input className="rounded-none h-12 bg-background" placeholder="Your Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input className="rounded-none h-12 bg-background" placeholder="Your Email" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input className="rounded-none h-12 bg-background" placeholder="Inquiry about..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea className="rounded-none min-h-[150px] bg-background" placeholder="How can we help you?" />
              </div>
              <Button className="w-full h-12 bg-primary text-white rounded-none uppercase tracking-widest">
                SendMessage
              </Button>
            </form>
          </div>
        </div>

        {/* Map Embed Placeholder */}
        <div className="mt-24 w-full h-[400px] bg-muted relative flex items-center justify-center border border-border">
          <div className="text-center space-y-2">
            <MapPin className="h-12 w-12 text-primary mx-auto" />
            <p className="font-serif text-xl">Google Maps Embed</p>
            <p className="text-sm text-muted-foreground">Location: {HOTEL_INFO.address}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
