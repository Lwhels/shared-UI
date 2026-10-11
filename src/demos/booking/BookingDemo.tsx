import React, { useState } from "react";
import confetti from "canvas-confetti";
import { processPayment } from "../../services/paymentService";
import { sendEmail } from "../../services/emailService";
import {
  Calendar,
  Users,
  MapPin,
  Star,
  Check,
  Wifi,
  Waves,
  Coffee,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  X,
  CheckCircle2,
  Lock,
  Compass,
  Sun,
  Anchor,
  Palmtree,
  ArrowRight,
  Map,
  Grid,
  Heart,
  SlidersHorizontal,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Sanctuary {
  id: string;
  name: string;
  region: "amalfi" | "santorini" | "kyoto" | "antibes";
  locationTitle: string;
  country: string;
  gpsCoords: string;
  pricePerNightEUR: number;
  rating: number;
  reviewsCount: number;
  bedrooms: number;
  bathrooms: number;
  guestsMax: number;
  landAreaAcres: number;
  amenities: string[];
  description: string;
  architecturalOverview: string;
  climateNow: string;
}

export const BookingDemo: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [nights, setNights] = useState<number>(5);
  const [checkInDate, setCheckInDate] = useState<string>("2026-10-28");
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedSanctuary, setSelectedSanctuary] = useState<Sanctuary | null>(null);

  // Add-ons
  const [addYachtCharter, setAddYachtCharter] = useState<boolean>(false);
  const [addHeliTransfer, setAddHeliTransfer] = useState<boolean>(false);
  const [addPrivateChef, setAddPrivateChef] = useState<boolean>(true);

  // Checkout Modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Guest details
  const [guestName, setGuestName] = useState("Lady Alistair Pembroke");
  const [guestEmail, setGuestEmail] = useState("alistair.pembroke@retreats.eu");
  const [guestPhone, setGuestPhone] = useState("+33 6 40 92 11 80");
  const [specialRequests, setSpecialRequests] = useState("Arriving via private helicopter at 16:00. Chilled vintage Dom Pérignon in master salon.");

  const sanctuaries: Sanctuary[] = [
    {
      id: "sanct-1",
      name: "Villa Terrazza Del Sole",
      region: "amalfi",
      locationTitle: "Positano, Amalfi Coast",
      country: "Italy",
      gpsCoords: "40.6281° N, 14.4850° E",
      pricePerNightEUR: 1650,
      rating: 4.98,
      reviewsCount: 88,
      bedrooms: 5,
      bathrooms: 6,
      guestsMax: 10,
      landAreaAcres: 3.2,
      amenities: ["Heated Seawater Infinity Pool", "Private Funicular to Ocean", "Dedicated 24/7 Butler", "Helipad Access", "Wine Cellar Vault"],
      description: "Carved into the sheer limestone cliffs of Positano with panoramic views across the turquoise Tyrrhenian Sea.",
      architecturalOverview: "An architectural marvel constructed across three cascading terraces of hand-dressed Roman travertine. Features floor-to-ceiling guillotine glass apertures that open fully to Mediterranean sea breezes and citrus orchards.",
      climateNow: "25°C · Sunny",
    },
    {
      id: "sanct-2",
      name: "Komorebi Cypress Pavilion",
      region: "kyoto",
      locationTitle: "Arashiyama Highlands, Kyoto",
      country: "Japan",
      gpsCoords: "35.0116° N, 135.6778° E",
      pricePerNightEUR: 1380,
      rating: 5.0,
      reviewsCount: 64,
      bedrooms: 4,
      bathrooms: 4,
      guestsMax: 8,
      landAreaAcres: 5.8,
      amenities: ["Volcanic Cedar Onsen", "Traditional Sukiya Tea Room", "Moss Rock Garden", "Master Kaiseki Chef", "Bamboo Forest Walkway"],
      description: "A sanctuary of acoustic silence nestled among centuries-old red maples and geothermal mountain springs.",
      architecturalOverview: "Crafted entirely using mortise-and-tenon joinery with aged Hinoki cypress wood and handmade shoji screens. Geothermal volcanic waters feed indoor and open-air granite bathing pools overlooking the private valley.",
      climateNow: "21°C · Clear Sky",
    },
    {
      id: "sanct-3",
      name: "Aegis Caldera Monolith",
      region: "santorini",
      locationTitle: "Imerovigli Cliffside, Santorini",
      country: "Greece",
      gpsCoords: "36.4328° N, 25.4228° E",
      pricePerNightEUR: 1820,
      rating: 4.97,
      reviewsCount: 94,
      bedrooms: 4,
      bathrooms: 5,
      guestsMax: 8,
      landAreaAcres: 2.4,
      amenities: ["Cantilevered Caldera Pool", "Sunset Observation Deck", "Private Catamaran Mooring", "Sommelier Cellar", "Subterranean Spa"],
      description: "Perched at the highest ridge of the volcanic caldera with unobstructed 360-degree sunset panoramas.",
      architecturalOverview: "Sculpted from white lime plaster and volcanic pumice in minimalist cycladic geometry. The cantilevered lap pool appears suspended directly between Aegean azure water and starlit sky.",
      climateNow: "27°C · Sea Breeze",
    },
    {
      id: "sanct-4",
      name: "Cap D'Azur Coastal Bastide",
      region: "antibes",
      locationTitle: "Cap d'Antibes, French Riviera",
      country: "France",
      gpsCoords: "43.5513° N, 7.1264° E",
      pricePerNightEUR: 2100,
      rating: 4.96,
      reviewsCount: 72,
      bedrooms: 6,
      bathrooms: 7,
      guestsMax: 12,
      landAreaAcres: 4.5,
      amenities: ["Private Mediterranean Cove", "Olympic Lap Pool", "Clay Tennis Court", "Chauffeured Riva Aquarama", "Private Security Quarters"],
      description: "A Belle Époque estate set within centuries-old umbrella pine groves touching the crystal waters of the Riviera.",
      architecturalOverview: "Restored by French architectural conservationists, this historic coastal bastide pairs antique herringbone parquet floors with minimalist Italian marble baths and a private deep-water dock for superyacht tenders.",
      climateNow: "24°C · Starlit",
    },
  ];

  const filteredSanctuaries = sanctuaries.filter(
    (s) => selectedRegion === "all" || s.region === selectedRegion
  );

  // Pricing Calculation
  const activeSanctuary = selectedSanctuary || sanctuaries[0];
  const baseAccommodationEUR = activeSanctuary.pricePerNightEUR * nights;
  const yachtCostEUR = addYachtCharter ? 1600 : 0;
  const heliCostEUR = addHeliTransfer ? 950 : 0;
  const chefCostEUR = addPrivateChef ? 380 * nights : 0;
  const grandTotalEUR = baseAccommodationEUR + yachtCostEUR + heliCostEUR + chefCostEUR;

  const handleBookingConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    const bookingRef = `AURA-RES-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    try {
      await processPayment({
        cardNumber: "4242 4242 4242 4242",
        cardHolder: guestName,
        expiry: "09/29",
        cvv: "882",
        amount: grandTotalEUR,
        currency: "EUR",
        description: `Aura Sanctuary Stay: ${activeSanctuary.name} (${nights} Nights)`,
        customerEmail: guestEmail,
      });

      await sendEmail({
        to: guestEmail,
        subject: `Sanctuary Reservation Confirmed: ${bookingRef} — ${activeSanctuary.name}`,
        template: "order_confirmation",
        data: {
          customerName: guestName,
          shippingAddress: `${activeSanctuary.locationTitle} (${activeSanctuary.gpsCoords})`,
          amountPaid: `€${grandTotalEUR.toLocaleString()}`,
          chargeId: bookingRef,
          last4: "VILLA-VIP",
          items: [
            `${activeSanctuary.name} (${nights} Nights: ${checkInDate})`,
            addPrivateChef ? "Dedicated Michelin In-Villa Private Chef" : "",
            addYachtCharter ? "Sunset Riva Yacht Charter" : "",
            addHeliTransfer ? "Private Helicopter Airport Transfer" : "",
          ].filter(Boolean),
        },
      });

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#C25E42", "#1B3B52", "#EAE4D9", "#FFFFFF"],
      });

      setConfirmedBooking({
        ref: bookingRef,
        villa: activeSanctuary.name,
        location: activeSanctuary.locationTitle,
        nights,
        checkIn: checkInDate,
        guests: guestCount,
        total: grandTotalEUR,
        email: guestEmail,
      });

      setIsProcessing(false);
    } catch (err: any) {
      setIsProcessing(false);
      alert(err.message || "Booking authorization failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#2C2825] font-sans selection:bg-[#C25E42]/20 selection:text-[#2C2825]">
      {/* Sun-Drenched Weather & Resort Telemetry Header */}
      <div className="bg-[#EDE6DC] border-b border-[#E4DCD3] px-4 sm:px-8 py-2 text-[11px] font-mono tracking-wider flex items-center justify-between text-stone-600">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#C25E42] font-bold">
            <Sun size={13} />
            <span>AURA SANCTUARIES · AUTUMN SUN RETREATS</span>
          </span>
          <span className="hidden md:inline text-stone-400">|</span>
          <span className="hidden md:inline">
            Amalfi Coast: 25°C · Water Temp: 23°C
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">Concierge Service: 24/7 Available</span>
          <span className="px-2 py-0.5 rounded-full bg-[#C25E42] text-white text-[10px] font-bold">
            LUXE VERIFIED
          </span>
        </div>
      </div>

      {/* Main Luxury Resort Header */}
      <header className="sticky top-0 z-40 bg-[#F7F4EE]/90 backdrop-blur-md border-b border-[#E4DCD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#2C2825] tracking-tight italic">
              Aura Sanctuaries
            </h1>
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500">
              Architectural Private Estates & Ocean Retreats
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="flex items-center bg-[#EDE6DC] p-1 rounded-full border border-stone-300">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === "grid" ? "bg-[#2C2825] text-white" : "text-stone-500 hover:text-stone-900"
                }`}
                title="Grid Gallery View"
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === "map" ? "bg-[#2C2825] text-white" : "text-stone-500 hover:text-stone-900"
                }`}
                title="Interactive Coordinates Map"
              >
                <Map size={15} />
              </button>
            </div>

            <button
              onClick={() => {
                setSelectedSanctuary(sanctuaries[0]);
                setIsCheckoutOpen(true);
              }}
              className="px-5 py-2.5 rounded-full bg-[#C25E42] hover:bg-[#b05036] text-white text-xs font-mono font-bold tracking-wider transition-all shadow-md active:scale-95"
            >
              Reserve Sanctuary
            </button>
          </div>
        </div>
      </header>

      {/* Sun-Drenched Architectural Hero */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 border-b border-[#E4DCD3] overflow-hidden bg-gradient-to-b from-[#F2ECE2] to-[#F7F4EE]">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-[#EDE6DC] border border-stone-300 text-stone-700">
            <Palmtree size={13} className="text-[#C25E42]" />
            <span>PRIVATE WATERFRONT ESTATES · ZERO PROXIMITY TO CROWDS</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-[#2C2825]">
            Where Ancient Land Meets <br />
            <span className="italic text-[#C25E42] font-light">Sculpted Light.</span>
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
            Private cliffside villas, secluded island pavilions, and alpine thermal estates designed by Pritzker-winning architects. Fully serviced with dedicated culinary teams and private ocean docks.
          </p>

          {/* Interactive Search Bar Widget */}
          <div className="pt-4 max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-[#E4DCD3] p-4 grid grid-cols-1 sm:grid-cols-4 gap-4 text-left font-mono text-xs">
            <div>
              <label className="block text-[10px] text-stone-400 uppercase tracking-wider mb-1">
                Destination
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-[#F7F4EE] border border-stone-200 rounded-lg px-2.5 py-2 text-stone-800 font-semibold focus:outline-none focus:border-[#C25E42]"
              >
                <option value="all">All Sanctuaries</option>
                <option value="amalfi">Amalfi Coast, Italy</option>
                <option value="santorini">Santorini, Greece</option>
                <option value="kyoto">Kyoto Highlands, Japan</option>
                <option value="antibes">Cap d'Antibes, France</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-stone-400 uppercase tracking-wider mb-1">
                Check-in Date
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="w-full bg-[#F7F4EE] border border-stone-200 rounded-lg px-2.5 py-2 text-stone-800 font-semibold focus:outline-none focus:border-[#C25E42]"
              />
            </div>

            <div>
              <label className="block text-[10px] text-stone-400 uppercase tracking-wider mb-1">
                Stay Length
              </label>
              <select
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full bg-[#F7F4EE] border border-stone-200 rounded-lg px-2.5 py-2 text-stone-800 font-semibold focus:outline-none focus:border-[#C25E42]"
              >
                {[3, 4, 5, 7, 10, 14].map((n) => (
                  <option key={n} value={n}>
                    {n} Nights
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-stone-400 uppercase tracking-wider mb-1">
                Guests
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full bg-[#F7F4EE] border border-stone-200 rounded-lg px-2.5 py-2 text-stone-800 font-semibold focus:outline-none focus:border-[#C25E42]"
              >
                {[1, 2, 4, 6, 8, 10].map((g) => (
                  <option key={g} value={g}>
                    {g} Guests Max
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Grid or Interactive Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        {viewMode === "map" ? (
          /* Interactive Architectural Coordinates Map */
          <div className="bg-white rounded-2xl border border-[#E4DCD3] p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200 font-mono text-xs">
              <span className="text-stone-500 uppercase tracking-wider">
                ARCHITECTURAL COORDINATES ATLAS // SATELLITE RADAR
              </span>
              <span className="text-[#C25E42] font-bold">
                {filteredSanctuaries.length} Monolithic Estates Plotted
              </span>
            </div>

            <div className="h-96 w-full rounded-xl bg-[#EDE6DC] relative overflow-hidden border border-stone-300 flex items-center justify-center">
              {/* Simulated Map Topography Lines */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(194,94,66,0.1),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(27,59,82,0.1),transparent_50%)]" />

              {/* Simulated Pins */}
              {filteredSanctuaries.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedSanctuary(s)}
                  className="absolute cursor-pointer group"
                  style={{
                    top: `${25 + idx * 18}%`,
                    left: `${20 + idx * 22}%`,
                  }}
                >
                  <div className="flex items-center gap-2 bg-[#2C2825] text-white px-3 py-1.5 rounded-full shadow-2xl hover:scale-105 transition-transform border border-white/20">
                    <MapPin size={13} className="text-[#C25E42]" />
                    <span className="text-[11px] font-mono font-bold">{s.name}</span>
                    <span className="text-[10px] font-mono text-[#EAE4D9]">
                      €{s.pricePerNightEUR}/nt
                    </span>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 left-4 text-[11px] font-mono text-stone-500 bg-white/80 px-3 py-1 rounded-md backdrop-blur">
                Click any coordinate pin to view architectural case file.
              </div>
            </div>
          </div>
        ) : (
          /* Architectural Villa Grid */
          <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-[#E4DCD3] font-mono text-xs text-stone-500">
              <span>SHOWING {filteredSanctuaries.length} PRIVATE ESTATES</span>
              <span>RATES QUOTED IN EUR (€) · INCLUSIVE OF TAX & PRIVATE BUTLER</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredSanctuaries.map((sanct) => {
                const totalForStay = sanct.pricePerNightEUR * nights;

                return (
                  <div
                    key={sanct.id}
                    className="bg-white rounded-2xl border border-[#E4DCD3] hover:border-stone-400 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Visual Frame */}
                    <div className="relative aspect-[16/10] bg-[#EAE4D9] flex items-center justify-center p-8 overflow-hidden">
                      <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#2C2825] text-white">
                        {sanct.locationTitle}
                      </div>

                      <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-mono font-bold text-stone-800 shadow-sm">
                        <Star size={12} className="fill-amber-500 text-amber-500" />
                        <span>{sanct.rating.toFixed(2)}</span>
                        <span className="text-stone-400">({sanct.reviewsCount})</span>
                      </div>

                      {/* Graphic Graphic Icon Representation */}
                      <div className="text-center space-y-2 transform group-hover:scale-105 transition-transform duration-500">
                        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-stone-800 to-black text-amber-100 flex items-center justify-center shadow-2xl border border-stone-700">
                          <Palmtree size={36} />
                        </div>
                        <p className="text-[11px] font-mono uppercase tracking-widest text-stone-500">
                          GPS: {sanct.gpsCoords}
                        </p>
                      </div>

                      <div className="absolute bottom-4 left-4 text-[11px] font-mono text-stone-700 bg-white/80 px-2.5 py-1 rounded-full backdrop-blur">
                        Current Weather: {sanct.climateNow}
                      </div>
                    </div>

                    {/* Content Box */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <h3
                          onClick={() => setSelectedSanctuary(sanct)}
                          className="font-serif text-2xl text-[#2C2825] hover:text-[#C25E42] cursor-pointer transition-colors font-normal"
                        >
                          {sanct.name}
                        </h3>

                        <p className="text-xs text-stone-600 font-light leading-relaxed">
                          {sanct.description}
                        </p>

                        {/* Specs Pill Strip */}
                        <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono text-stone-600">
                          <span className="px-2.5 py-1 rounded-md bg-[#F7F4EE] border border-stone-200">
                            {sanct.bedrooms} Suites
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-[#F7F4EE] border border-stone-200">
                            {sanct.bathrooms} Baths
                          </span>
                          <span className="px-2.5 py-1 rounded-md bg-[#F7F4EE] border border-stone-200">
                            {sanct.landAreaAcres} Private Acres
                          </span>
                        </div>
                      </div>

                      {/* Pricing & CTA */}
                      <div className="pt-4 border-t border-[#EAE4D9] flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1 font-mono">
                            <span className="text-xl font-bold text-[#2C2825]">
                              €{sanct.pricePerNightEUR.toLocaleString()}
                            </span>
                            <span className="text-xs text-stone-400">/night</span>
                          </div>
                          <span className="text-[11px] font-mono text-[#C25E42] font-semibold block">
                            €{totalForStay.toLocaleString()} for {nights} nights
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedSanctuary(sanct);
                            setIsCheckoutOpen(true);
                          }}
                          className="px-5 py-2.5 rounded-full bg-[#2C2825] hover:bg-stone-800 text-white text-xs font-mono tracking-wider font-semibold transition-transform active:scale-95 shadow-md flex items-center gap-1.5"
                        >
                          <span>Reserve Stay</span>
                          <ChevronRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Turnkey Booking & Concierge Modal */}
      <AnimatePresence>
        {isCheckoutOpen && selectedSanctuary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !confirmedBooking && setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#F7F4EE] rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#E4DCD3] z-10 max-h-[92vh] overflow-y-auto text-[#2C2825]"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[#E4DCD3] mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#2C2825]">
                    Sanctuary Reservation File
                  </h3>
                  <p className="text-xs font-mono text-[#C25E42] mt-0.5">
                    {selectedSanctuary.name} · {selectedSanctuary.locationTitle}
                  </p>
                </div>
                {!confirmedBooking && (
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-800"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {!confirmedBooking ? (
                <form onSubmit={handleBookingConfirm} className="space-y-6 text-xs font-mono">
                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-white border border-[#E4DCD3] space-y-2">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Reserved Dates:</span>
                      <strong>{checkInDate} ({nights} Nights)</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Base Estate Rate:</span>
                      <strong>€{baseAccommodationEUR.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Curated Luxury Add-ons */}
                  <div className="space-y-2.5">
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 font-bold block">
                      Curated Concierge Services
                    </span>

                    <label className="p-3 rounded-xl bg-white border border-[#E4DCD3] flex items-center justify-between cursor-pointer">
                      <div className="space-y-0.5">
                        <strong className="block text-stone-900">
                          Dedicated In-Villa Michelin Chef (+€380/day)
                        </strong>
                        <span className="text-[11px] text-stone-500">
                          Private breakfast, ocean lunch, and 5-course bespoke dinner.
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={addPrivateChef}
                        onChange={(e) => setAddPrivateChef(e.target.checked)}
                        className="w-4 h-4 accent-[#C25E42]"
                      />
                    </label>

                    <label className="p-3 rounded-xl bg-white border border-[#E4DCD3] flex items-center justify-between cursor-pointer">
                      <div className="space-y-0.5">
                        <strong className="block text-stone-900">
                          Sunset Riva Yacht Charter (+€1,600)
                        </strong>
                        <span className="text-[11px] text-stone-500">
                          4-hour coastal cruise with champagne service and swimming stop.
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={addYachtCharter}
                        onChange={(e) => setAddYachtCharter(e.target.checked)}
                        className="w-4 h-4 accent-[#C25E42]"
                      />
                    </label>

                    <label className="p-3 rounded-xl bg-white border border-[#E4DCD3] flex items-center justify-between cursor-pointer">
                      <div className="space-y-0.5">
                        <strong className="block text-stone-900">
                          Private Helicopter Airport Transfer (+€950)
                        </strong>
                        <span className="text-[11px] text-stone-500">
                          Direct landing on estate private helipad pad.
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={addHeliTransfer}
                        onChange={(e) => setAddHeliTransfer(e.target.checked)}
                        className="w-4 h-4 accent-[#C25E42]"
                      />
                    </label>
                  </div>

                  {/* Guest Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-500 mb-1">Primary Guest Name</label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-white border border-[#E4DCD3] rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-[#C25E42]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-stone-500 mb-1">Email For Voucher</label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-white border border-[#E4DCD3] rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-[#C25E42]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-500 mb-1">Special Concierge Instructions</label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-white border border-[#E4DCD3] rounded-lg px-3 py-2 text-stone-800 focus:outline-none focus:border-[#C25E42]"
                    />
                  </div>

                  {/* Grand Total */}
                  <div className="pt-2 border-t border-[#E4DCD3] flex items-center justify-between">
                    <span className="text-stone-500">Grand Total Authorization:</span>
                    <span className="font-serif text-2xl text-[#C25E42]">
                      €{grandTotalEUR.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 rounded-full bg-[#C25E42] hover:bg-[#b05036] text-white font-bold tracking-wider transition-all shadow-xl shadow-[#C25E42]/20 disabled:opacity-50"
                  >
                    {isProcessing ? "Transmitting Reservation File..." : "Authorize Sanctuary Stay"}
                  </button>
                </form>
              ) : (
                /* Confirmed Stay Voucher */
                <div className="text-center py-6 space-y-4 font-mono">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>

                  <h4 className="font-serif text-2xl text-stone-900">
                    Sanctuary Confirmed
                  </h4>

                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Your arrival packet and access dossier have been transmitted to{" "}
                    <strong>{confirmedBooking.email}</strong>.
                  </p>

                  <div className="bg-white p-4 rounded-xl text-left text-xs text-stone-700 space-y-1.5 border border-[#E4DCD3]">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Reservation Ref:</span>
                      <strong className="text-stone-900">{confirmedBooking.ref}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Sanctuary:</span>
                      <strong>{confirmedBooking.villa}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Duration:</span>
                      <strong>{confirmedBooking.nights} Nights ({confirmedBooking.checkIn})</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Grand Total:</span>
                      <strong className="text-[#C25E42]">€{confirmedBooking.total.toLocaleString()}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setConfirmedBooking(null);
                      setIsCheckoutOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#2C2825] text-white text-xs font-bold"
                  >
                    Return to Atlas
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
