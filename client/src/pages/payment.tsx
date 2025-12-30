import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HOTEL_INFO } from "@/lib/constants";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2, CheckCircle, CreditCard } from "lucide-react";

export default function Payment() {
  const [location, setLocation] = useLocation();
  const [bookingData, setBookingData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const data = sessionStorage.getItem("bookingData");
    if (!data) {
      setLocation("/booking");
      return;
    }
    setBookingData(JSON.parse(data));
  }, [setLocation]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      // In a real app, clear session or keep for receipt
    }, 2000);
  };

  if (!bookingData) return null;

  if (paymentSuccess) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center bg-muted/20">
          <div className="bg-white p-12 max-w-lg w-full text-center shadow-lg border-t-4 border-green-600 animate-in zoom-in duration-500">
            <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif text-foreground mb-4">Payment Successful</h1>
            <p className="text-muted-foreground mb-8">
              Thank you, {bookingData.name || "Guest"}. Your reservation at {HOTEL_INFO.name} is confirmed.
            </p>
            
            <div className="bg-muted p-6 text-left space-y-3 mb-8 rounded-sm">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Booking Ref</span>
                <span className="font-mono font-bold">#RC-{Math.floor(Math.random() * 10000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Check-in</span>
                <span className="font-medium">{new Date(bookingData.checkIn).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount Paid</span>
                <span className="font-bold text-primary">{HOTEL_INFO.currency} {bookingData.totalPrice}</span>
              </div>
            </div>

            <Button onClick={() => setLocation("/")} className="w-full rounded-none bg-primary h-12">
              Return Home
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl font-serif mb-8 text-center">Secure Payment</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Payment Form */}
          <div className="bg-white p-8 border border-border shadow-sm">
            <h2 className="text-xl font-serif mb-6 flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Payment Method
            </h2>
            
            <form onSubmit={handlePayment} className="space-y-6">
              <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <RadioGroupItem value="card" id="card" className="peer sr-only" />
                  <Label
                    htmlFor="card"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <CreditCard className="mb-2 h-6 w-6" />
                    Card
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
                  <Label
                    htmlFor="paypal"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    <span className="mb-2 text-lg font-bold">Pay</span>
                    PayPal
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Cardholder Name</Label>
                  <Input id="name" placeholder="John Doe" className="rounded-none h-12" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="number">Card Number</Label>
                  <Input id="number" placeholder="0000 0000 0000 0000" className="rounded-none h-12" required />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry</Label>
                    <Input id="expiry" placeholder="MM/YY" className="rounded-none h-12" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" className="rounded-none h-12" required />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 bg-primary text-white rounded-none text-lg mt-4 uppercase tracking-wider"
                disabled={isProcessing}
              >
                {isProcessing ? <Loader2 className="animate-spin mr-2" /> : `Pay ${HOTEL_INFO.currency} ${bookingData.totalPrice}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
             <div className="bg-muted/30 p-8 border border-border">
                <h2 className="text-xl font-serif mb-6">Booking Review</h2>
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-border pb-4">
                    <div>
                      <p className="font-serif font-bold text-lg">{bookingData.roomName}</p>
                      <p className="text-sm text-muted-foreground">{bookingData.nights} Night(s), {bookingData.guests} Guests</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{HOTEL_INFO.currency} {bookingData.pricePerNight * bookingData.nights}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes (12%)</span>
                    <span>{HOTEL_INFO.currency} {Math.round(bookingData.totalPrice * 0.12)}</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="font-serif text-xl font-bold">Total</span>
                    <span className="font-serif text-2xl font-bold text-primary">
                       {HOTEL_INFO.currency} {bookingData.totalPrice}
                    </span>
                  </div>
                </div>
             </div>
             <p className="text-xs text-muted-foreground text-center">
               By proceeding, you agree to our Terms and Conditions and Privacy Policy.
             </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
