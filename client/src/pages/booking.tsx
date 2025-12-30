import { Layout } from "@/components/layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ROOMS, HOTEL_INFO } from "@/lib/constants";
import { format, differenceInDays } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { useToast } from "@/hooks/use-toast";

const bookingSchema = z.object({
  checkIn: z.date({ required_error: "Check-in date is required" }),
  checkOut: z.date({ required_error: "Check-out date is required" }),
  adults: z.string(),
  roomType: z.string({ required_error: "Please select a room" }),
  guests: z.string(),
});

export default function Booking() {
  const [location, setLocation] = useLocation();
  const searchString = useSearch();
  const params = new URLSearchParams(searchString);
  const initialRoom = params.get("room") || "";
  
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      roomType: initialRoom,
      guests: "2",
    },
  });

  const watchRoom = form.watch("roomType");
  const watchCheckIn = form.watch("checkIn");
  const watchCheckOut = form.watch("checkOut");
  
  const selectedRoom = ROOMS.find(r => r.id === watchRoom);
  
  // Calculate total
  const [totalPrice, setTotalPrice] = useState(0);
  const [nights, setNights] = useState(0);

  useEffect(() => {
    if (watchCheckIn && watchCheckOut && selectedRoom) {
      const dayDiff = differenceInDays(watchCheckOut, watchCheckIn);
      const n = dayDiff > 0 ? dayDiff : 0;
      setNights(n);
      setTotalPrice(n * selectedRoom.price);
    } else {
      setTotalPrice(0);
      setNights(0);
    }
  }, [watchCheckIn, watchCheckOut, selectedRoom]);

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Store booking data in session storage to pass to payment page
      sessionStorage.setItem("bookingData", JSON.stringify({
        ...values,
        roomName: selectedRoom?.name,
        pricePerNight: selectedRoom?.price,
        totalPrice,
        nights,
        currency: HOTEL_INFO.currency
      }));
      setLocation("/payment");
    }, 1500);
  }

  return (
    <Layout>
      <div className="bg-secondary py-12 text-center text-white">
        <h1 className="text-4xl font-serif">Reserve Your Stay</h1>
        <p className="text-white/60 mt-2">Best rates guaranteed</p>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-card p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-serif mb-6">Booking Details</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Check-in Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal rounded-none h-12",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date()
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Check-out Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal rounded-none h-12",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < (watchCheckIn || new Date())
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="roomType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none h-12">
                                <SelectValue placeholder="Select a room" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ROOMS.map((room) => (
                                <SelectItem key={room.id} value={room.id}>
                                  {room.name} ({HOTEL_INFO.currency} {room.price}/night)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guests</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rounded-none h-12">
                                <SelectValue placeholder="Number of guests" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Guest</SelectItem>
                              <SelectItem value="2">2 Guests</SelectItem>
                              <SelectItem value="3">3 Guests</SelectItem>
                              <SelectItem value="4">4 Guests</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {selectedRoom && (
                    <div className="p-4 bg-muted/50 border border-border mt-4 flex gap-4 items-start">
                      <div className="h-20 w-20 bg-gray-200 shrink-0 overflow-hidden">
                         <img src={selectedRoom.image} className="w-full h-full object-cover" alt="Room" />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-lg">{selectedRoom.name}</h4>
                        <p className="text-sm text-muted-foreground">{selectedRoom.description}</p>
                        <div className="flex gap-2 mt-2">
                          {selectedRoom.amenities.slice(0,3).map((a, i) => (
                            <span key={i} className="text-[10px] bg-white border border-border px-2 py-1 uppercase tracking-wider">{a}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-6">
                    <Button 
                      type="submit" 
                      className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white rounded-none uppercase tracking-widest"
                      disabled={!selectedRoom || !watchCheckIn || !watchCheckOut || isSubmitting}
                    >
                      {isSubmitting ? <Loader2 className="animate-spin" /> : "Proceed to Payment"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                      You won't be charged yet.
                    </p>
                  </div>

                </form>
              </Form>
            </div>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 shadow-lg border-t-4 border-primary sticky top-24">
              <h3 className="text-xl font-serif mb-6 pb-4 border-b border-border">Booking Summary</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="font-medium">{watchCheckIn ? format(watchCheckIn, "MMM dd, yyyy") : "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Check-out</span>
                  <span className="font-medium">{watchCheckOut ? format(watchCheckOut, "MMM dd, yyyy") : "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Nights</span>
                  <span className="font-medium">{nights}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Room Type</span>
                  <span className="font-medium text-right max-w-[120px]">{selectedRoom?.name || "-"}</span>
                </div>
                
                <div className="pt-4 border-t border-border mt-4">
                  <div className="flex justify-between items-end">
                    <span className="font-serif text-lg">Total</span>
                    <div className="text-right">
                      <span className="block text-2xl font-serif font-bold text-primary">
                        {HOTEL_INFO.currency} {totalPrice}
                      </span>
                      <span className="text-xs text-muted-foreground">Includes taxes & fees</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted/50 text-xs text-muted-foreground">
                <h4 className="font-bold mb-2 uppercase tracking-wider">Cancellation Policy</h4>
                <p>Free cancellation until 24 hours before check-in. Late cancellations are subject to one night's charge.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
