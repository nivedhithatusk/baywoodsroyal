import { Layout } from "@/components/layout";
import { HOTEL_INFO } from "@/lib/constants";
import exteriorImg from "@assets/generated_images/luxury_hotel_exterior_tamil_nadu.png";
import standardRoomImg from "@assets/generated_images/standard_luxury_room.png";

export default function About() {
  return (
    <Layout>
      {/* Header */}
      <div className="h-[60vh] relative flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={exteriorImg} alt="Hotel Exterior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white space-y-4 px-4">
          <h1 className="text-5xl md:text-7xl font-serif">Our Story</h1>
          <p className="text-lg md:text-xl font-light max-w-2xl mx-auto">
            A legacy of hospitality in the heart of Tamil Nadu
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif text-foreground">Tradition Meets Luxury</h2>
            <div className="w-20 h-1 bg-primary" />
            <p className="text-muted-foreground leading-relaxed text-lg">
              {HOTEL_INFO.name} was established with a singular vision: to bring the world-class luxury of international hospitality while preserving the rich cultural heritage of Chettinad.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Located in {HOTEL_INFO.location}, our property is a tribute to the architectural brilliance of the region. From the intricate woodwork to the spacious courtyards, every element has been thoughtfully designed to transport you to a royal era, while ensuring every modern comfort is at your fingertips.
            </p>
          </div>
          <div className="relative p-4 border border-primary/20">
            <img src={standardRoomImg} alt="Hotel Interior" className="w-full h-full object-cover shadow-lg" />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-secondary text-secondary-foreground p-12 space-y-4">
            <h3 className="text-2xl font-serif text-primary">Our Mission</h3>
            <p className="text-white/80 leading-relaxed">
              To provide an unforgettable experience where every guest feels like royalty. We strive to offer personalized service, impeccable cleanliness, and a warm atmosphere that feels like a home away from home.
            </p>
          </div>
          <div className="bg-muted p-12 space-y-4">
            <h3 className="text-2xl font-serif text-foreground">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To be the premier destination in Tamil Nadu for travelers seeking a perfect blend of culture, comfort, and luxury. We aim to set the benchmark for hospitality in the region.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl font-serif">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-serif text-2xl font-bold">1</div>
              <h4 className="text-xl font-serif mb-2">Guest First</h4>
              <p className="text-muted-foreground text-sm">Your comfort and satisfaction are our only priorities.</p>
            </div>
            <div className="p-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-serif text-2xl font-bold">2</div>
              <h4 className="text-xl font-serif mb-2">Authenticity</h4>
              <p className="text-muted-foreground text-sm">We stay true to the rich traditions of Tamil Nadu hospitality.</p>
            </div>
            <div className="p-6">
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary font-serif text-2xl font-bold">3</div>
              <h4 className="text-xl font-serif mb-2">Excellence</h4>
              <p className="text-muted-foreground text-sm">We pursue perfection in every detail of your stay.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
