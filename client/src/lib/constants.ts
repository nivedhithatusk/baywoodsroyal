import exteriorImg from "@assets/generated_images/luxury_hotel_exterior_tamil_nadu.png";
import standardRoomImg from "@assets/generated_images/standard_luxury_room.png";
import deluxeRoomImg from "@assets/generated_images/deluxe_room_with_view.png";
import premiumRoomImg from "@assets/generated_images/royal_suite_interior.png";

export const HOTEL_INFO = {
  name: "The Royal Chettinad",
  location: "Tamil Nadu, India",
  tagline: "Heritage Luxury in the Heart of Tamil Nadu",
  description: "Experience the timeless elegance of Chettinad heritage fused with modern luxury. Located amidst the cultural grandeur of Tamil Nadu, The Royal Chettinad offers a sanctuary of peace, comfort, and royal hospitality.",
  address: "12 Heritage Road, Karaikudi, Tamil Nadu 630001",
  phone: "+91 4565 223344",
  email: "reservations@royalchettinad.com",
  currency: "OMR"
};

export const ROOMS = [
  {
    id: "standard",
    name: "Heritage Classic",
    type: "Standard",
    price: 35, // OMR
    description: "A cozy retreat featuring traditional wooden accents and modern amenities.",
    image: standardRoomImg,
    amenities: ["King Bed", "City View", "Free Wi-Fi", "Rain Shower"],
    capacity: 2
  },
  {
    id: "deluxe",
    name: "Temple View Deluxe",
    type: "Deluxe",
    price: 55, // OMR
    description: "Spacious luxury with breathtaking views of the historic temples.",
    image: deluxeRoomImg,
    amenities: ["King Bed", "Balcony", "Temple View", "Bathtub", "Mini Bar"],
    capacity: 3
  },
  {
    id: "premium",
    name: "Royal Maharaja Suite",
    type: "Premium",
    price: 95, // OMR
    description: "The epitome of luxury living with a separate living area and royal decor.",
    image: premiumRoomImg,
    amenities: ["King Bed", "Living Room", "Panoramic View", "Jacuzzi", "Butler Service"],
    capacity: 4
  }
];

export const AMENITIES = [
  { icon: "Wifi", title: "High-Speed Wi-Fi", description: "Stay connected seamlessly throughout the property." },
  { icon: "Utensils", title: "Fine Dining", description: "Authentic Chettinad cuisine and international delicacies." },
  { icon: "Car", title: "Valet Parking", description: "Secure and convenient parking for all guests." },
  { icon: "Clock", title: "24/7 Room Service", description: "Round-the-clock service for your comfort." },
  { icon: "Sparkles", title: "Daily Housekeeping", description: "Impeccable cleanliness and hygiene standards." },
  { icon: "Shield", title: "24/7 Security", description: "Your safety is our utmost priority." }
];

export const TESTIMONIALS = [
  {
    name: "Priya Sundaram",
    location: "Chennai",
    text: "An absolute gem in Tamil Nadu. The architecture is stunning and the service is impeccable.",
    rating: 5
  },
  {
    name: "James Wilson",
    location: "London",
    text: "The perfect blend of traditional Indian culture and modern luxury. The Royal Suite is breathtaking.",
    rating: 5
  },
  {
    name: "Rahul Mehta",
    location: "Mumbai",
    text: "The food, the ambiance, the rooms - everything was perfect. Highly recommended for a peaceful stay.",
    rating: 5
  }
];
