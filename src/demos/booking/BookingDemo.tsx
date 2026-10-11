import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  ThreeDCard,
  CardContainer,
  CardBody,
  CardItem,
  Carousel3D,
  InfiniteMovingCards,
  MovingBorderButton,
  GlassCard,
  GlowingBadge,
  TextReveal,
} from "../../components";
import { formatCurrency } from "../../lib/utils";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Sanctuary {
  id: string;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  bedrooms: number;
  guestsMax: number;
  amenities: string[];
  gradient: string;
  description: string;
  fullOverview: string;
}

export const BookingDemo: React.FC = () => {
  const [destination, setDestination] = useState("all");
  const [guests, setGuests] = useState(2);
  const [selectedSanctuary, setSelectedSanctuary] = useState<Sanctuary | null>(null);
  const [nights, setNights] = useState(4);
  const [checkInDate, setCheckInDate] = useState("2026-11-05");

  // Add-on Concierge Services
  const [addYacht, setAddYacht] = useState(false);
  const [addHelicopter, setAddHelicopter] = useState(false);
  const [addPrivateChef, setAddPrivateChef] = useState(true);

  // Checkout Modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  // Form Fields
  const [guestName, setGuestName] = useState("Lord Sterling Fairfax");
  const [guestEmail, setGuestEmail] = useState("sterling@fairfaxgroup.co.uk");
  const [guestPhone, setGuestPhone] = useState("+44 20 7946 0912");

  const sanctuaries: Sanctuary[] = [
    {
      id: "sanct-1",
      name: "Villa Terrazza Del Sole",
      location: "Positano, Amalfi Coast",
      pricePerNight: 1250,
      rating: 4.98,
      reviewsCount: 84,
      bedrooms: 4,
      guestsMax: 8,
      amenities: ["Infinity Pool", "Private Sea Dock", "Dedicated Butler", "Helipad Access", "Wine Cellar"],
      gradient: "from-amber-600/30 via-orange-900/20 to-zinc-950",
      description: "Carved into sheer sea cliffs overlooking Positano bay with private funicular down to the sapphire water.",
      fullOverview: "A 4-bedroom cliffside masterpiece suspended 150 meters above the Mediterranean. Features an automated seawater infinity pool, private funicular descending to a private mooring dock, and 24/7 dedicated butler service.",
    },
    {
      id: "sanct-2",
      name: "Komorebi Forest Pavilion",
      location: "Kyoto Highlands, Japan",
      pricePerNight: 980,
      rating: 5.0,
      reviewsCount: 62,
      bedrooms: 3,
      guestsMax: 6,
      amenities: ["Cedar Onsen", "Tea Pavilion", "Zen Garden", "Private Kaiseki Chef"],
      gradient: "from-emerald-600/30 via-teal-900/20 to-zinc-950",
      description: "Nestled amidst ancient cedar groves with geothermal hot spring baths and architectural cypress joinery.",
      fullOverview: "Surrounded by 400-year-old Japanese cedar forests. Built with traditional mortise-and-tenon joints without a single iron nail. Heated geothermal spring water feeds the indoor and outdoor hinoki wood onsen.",
    },
    {
      id: "sanct-3",
      name: "Solarium Desert Compound",
      location: "Joshua Tree, California",
      pricePerNight: 850,
      rating: 4.95,
      reviewsCount: 96,
      bedrooms: 2,
      guestsMax: 4,
      amenities: ["Stargazing Deck", "Plunge Pool", "Outdoor Firepit", "Solar Powered", "Sound System"],
      gradient: "from-rose-600/30 via-amber-900/20 to-zinc-950",
      description: "Minimalist rammed-earth compound with 360-degree desert panoramas and zero light pollution.",
      fullOverview: "Constructed entirely from stabilized rammed earth and low-iron solar glass. Situated on 80 private acres bordering the National Park with automated telescope observatory deck.",
    },
  ];

  const filteredSanctuaries =
    destination === "all"
      ? sanctuaries
      : sanctuaries.filter((s) => s.location.toLowerCase().includes(destination.toLowerCase()));

  // Price Calculation
  const baseCost = selectedSanctuary ? selectedSanctuary.pricePerNight * nights : 0;
  const yachtFee = addYacht ? 3200 : 0;
  const heliFee = addHelicopter ? 2400 : 0;
  const chefFee = addPrivateChef ? 1200 : 0;
  const subtotal = baseCost + yachtFee + heliFee + chefFee;
  const taxesAndFees = Math.round(subtotal * 0.12);
  const grandTotal = subtotal + taxesAndFees;

  const handleProcessReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSanctuary) return;
    setIsProcessing(true);

    const paymentResult = await processPayment({
      cardNumber: "4242 4242 4242 4242",
      cardHolder: guestName,
      expiry: "12/28",
      cvv: "892",
      amount: grandTotal,
      description: `Villa Sanctuary Stay: ${selectedSanctuary.name}`,
      customerEmail: guestEmail,
    });

    const bookingRef = `VEL-${Math.floor(Math.random() * 900000 + 100000)}`;

    await sendEmail({
      to: guestEmail,
      subject: `Luxury Stay Confirmed: ${selectedSanctuary.name} (${bookingRef})`,
      template: "booking_confirmation",
      data: {
        bookingRef,
        sanctuaryName: selectedSanctuary.name,
        location: selectedSanctuary.location,
        checkIn: checkInDate,
        duration: `${nights} Nights`,
        guests: `${guests} Guests`,
        totalPaid: formatCurrency(grandTotal),
        conciergeNotes: [
          addYacht ? "Private Yacht Charter" : null,
          addHelicopter ? "Helicopter Transfer" : null,
          addPrivateChef ? "In-Villa Private Chef" : null,
        ].filter(Boolean).join(", "),
      },
    });

    confetti({
      particleCount: 120,
      spread: 75,
      origin: { y: 0.6 },
    });

    setConfirmedBooking({
      ref: bookingRef,
      sanctuary: selectedSanctuary.name,
      total: grandTotal,
      checkIn: checkInDate,
      email: guestEmail,
    });

    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white">
      {/* Hero Section */}
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center">
            <GlowingBadge variant="amber">VELUM PRIVATE SANCTUARIES · BESPOKE STAYS</GlowingBadge>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif tracking-tight leading-[1.08]">
            Extraordinary Villas in the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
              <TextReveal text="World's Remote Sanctuaries." />
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Curated architectural estates, private islands, and alpine chalets staffed with bespoke Michelin private chefs and chauffeurs.
          </p>

          {/* Search Bar Widget */}
          <div className="max-w-3xl mx-auto p-3 rounded-2xl bg-zinc-900/90 border border-white/15 backdrop-blur-xl shadow-2xl grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                Destination Filter
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-zinc-900">All World Destinations</option>
                <option value="Amalfi" className="bg-zinc-900">Amalfi Coast, Italy</option>
                <option value="Kyoto" className="bg-zinc-900">Kyoto Highlands, Japan</option>
                <option value="Joshua Tree" className="bg-zinc-900">Joshua Tree, California</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                Stay Length
              </label>
              <select
                value={nights}
                onChange={(e) => setNights(Number(e.target.value))}
                className="w-full bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value={3} className="bg-zinc-900">3 Nights (Weekend)</option>
                <option value={4} className="bg-zinc-900">4 Nights (Standard)</option>
                <option value={7} className="bg-zinc-900">7 Nights (Full Week)</option>
                <option value={14} className="bg-zinc-900">14 Nights (Extended)</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                  Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
                >
                  <option value={2} className="bg-zinc-900">2 Guests</option>
                  <option value={4} className="bg-zinc-900">4 Guests</option>
                  <option value={6} className="bg-zinc-900">6 Guests</option>
                  <option value={8} className="bg-zinc-900">8 Guests</option>
                </select>
              </div>

              <button
                onClick={() => {
                  const target = document.getElementById("villas");
                  target?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs transition-colors shrink-0 shadow-md shadow-amber-500/20"
              >
                Find Stays
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sanctuary Cards with 3D Tilt */}
      <section id="villas" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Featured Residences
          </span>
          <h2 className="text-3xl font-bold font-serif">
            3D Tilt Residence Cards
          </h2>
          <p className="text-sm text-zinc-400">
            Hover to inspect architectural perspective and amenity specifications. Click to open reservation drawer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredSanctuaries.map((sanct) => (
            <CardContainer key={sanct.id} className="w-full">
              <CardBody className="w-full rounded-2xl p-6 bg-zinc-900/80 border border-white/10 hover:border-amber-500/40 backdrop-blur-xl flex flex-col justify-between h-[520px] group/card transition-all">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <CardItem translateZ={30}>
                      <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1">
                        <MapPin size={12} />
                        {sanct.location}
                      </span>
                    </CardItem>
                    <CardItem translateZ={20}>
                      <div className="flex items-center gap-1 text-xs text-amber-300">
                        <Star size={12} fill="currentColor" />
                        <span>{sanct.rating}</span>
                        <span className="text-zinc-500">({sanct.reviewsCount})</span>
                      </div>
                    </CardItem>
                  </div>

                  <CardItem translateZ={60} rotateX={8} className="w-full mb-6">
                    <div className={`h-44 w-full rounded-xl bg-gradient-to-tr ${sanct.gradient} border border-white/10 flex flex-col justify-between p-4 relative overflow-hidden group-hover/card:scale-105 transition-transform`}>
                      <div className="flex justify-between text-xs font-mono text-white/80">
                        <span>{sanct.bedrooms} Bedrooms</span>
                        <span>Up to {sanct.guestsMax} Guests</span>
                      </div>
                      <div className="text-xs font-mono text-amber-200">
                        Verified Luxury Retreat
                      </div>
                    </div>
                  </CardItem>

                  <CardItem translateZ={40} className="w-full">
                    <h3 className="text-xl font-bold font-serif text-white mb-2">
                      {sanct.name}
                    </h3>
                  </CardItem>

                  <CardItem translateZ={30} className="w-full">
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-4">
                      {sanct.description}
                    </p>
                  </CardItem>

                  <CardItem translateZ={40} className="w-full">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {sanct.amenities.slice(0, 4).map((a, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </CardItem>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <CardItem translateZ={30}>
                    <div>
                      <span className="text-lg font-bold font-mono text-white">
                        {formatCurrency(sanct.pricePerNight)}
                      </span>
                      <span className="text-xs text-zinc-500 font-mono"> / night</span>
                    </div>
                  </CardItem>

                  <CardItem translateZ={40}>
                    <button
                      onClick={() => {
                        setSelectedSanctuary(sanct);
                        setConfirmedBooking(null);
                        setIsCheckoutOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-transform active:scale-95"
                    >
                      Reserve Stay
                    </button>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* 3D Cylindrical Experience Carousel */}
      <section className="py-20 px-6 max-w-6xl mx-auto overflow-hidden">
        <div className="text-center mb-6 space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Concierge Catalog
          </span>
          <h2 className="text-3xl font-bold font-serif">
            Curated Estate Experiences
          </h2>
          <p className="text-sm text-zinc-400">
            Explore private charters and excursions included with every booking.
          </p>
        </div>

        <Carousel3D
          cards={[
            {
              title: "Private Riva Yacht Charter",
              subtitle: "Mediterranean Coast",
              badge: "Maritime",
              content: "Full-day captained Riva Dolceriva yacht charter exploring secluded sea caves and secluded coves.",
            },
            {
              title: "Helicopter Valley Transfer",
              subtitle: "Zero-Traffic Arrival",
              badge: "Aviation",
              content: "Direct rooftop or lawn helipad pickup from regional international airport terminals.",
            },
            {
              title: "Michelin Private Sommelier",
              subtitle: "In-Villa Cellar Tasting",
              badge: "Gastronomy",
              content: "Five-course multi-vintage wine pairing dinner prepared directly in your sanctuary kitchen.",
            },
            {
              title: "Thermal Saltwater Spa",
              subtitle: "Holistic Restoration",
              badge: "Wellness",
              content: "Private licensed massage therapists and on-call yoga master for daily sunrise cliff sessions.",
            },
          ]}
        />
      </section>

      {/* Guest Testimonial Marquee */}
      <section className="py-16 border-t border-white/10 bg-zinc-950/40 overflow-hidden">
        <div className="text-center mb-6">
          <p className="text-xs font-mono uppercase tracking-widest text-amber-400">
            Guest Endorsements
          </p>
        </div>
        <InfiniteMovingCards
          items={[
            { quote: "Villa Terrazza exceeded all expectations. The private dock and sunset dinners were life-changing.", name: "Lord Julian Sterling", title: "London" },
            { quote: "Komorebi Pavilion was the most peaceful retreat we have ever experienced.", name: "Dr. Kenji Takahashi", title: "Tokyo" },
            { quote: "The concierge booked a helicopter on 30 minutes notice. Absolute perfection.", name: "Claire Dupont", title: "Geneva" },
          ]}
          speed="normal"
        />
      </section>

      {/* Complete Reservation Checkout Modal with Stripe Simulation */}
      <AnimatePresence>
        {isCheckoutOpen && selectedSanctuary && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <GlowingBadge variant="amber">SANCTUARY RESERVATION</GlowingBadge>
                  <h3 className="text-xl font-bold font-serif text-white">
                    {selectedSanctuary.name}
                  </h3>
                  <p className="text-xs text-zinc-400 flex items-center gap-1 font-mono">
                    <MapPin size={11} /> {selectedSanctuary.location}
                  </p>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {confirmedBooking ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-2xl font-bold font-serif text-white">
                    Sanctuary Reserved!
                  </h4>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-1.5 text-left max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Booking Voucher:</span>
                      <strong className="text-amber-400">{confirmedBooking.ref}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Check-in:</span>
                      <span>{confirmedBooking.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Total Charged:</span>
                      <span className="text-emerald-400 font-bold">{formatCurrency(confirmedBooking.total)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400">
                    A confirmation voucher and gate access code have been dispatched to {confirmedBooking.email}.
                  </p>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs"
                  >
                    Return to Residences
                  </button>
                </div>
              ) : (
                <form onSubmit={handleProcessReservation} className="space-y-4">
                  {/* Summary math */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>{formatCurrency(selectedSanctuary.pricePerNight)} x {nights} nights</span>
                      <span>{formatCurrency(baseCost)}</span>
                    </div>

                    {/* Add-ons checkboxes */}
                    <div className="py-2 space-y-1.5 border-y border-white/5">
                      <label className="flex items-center justify-between text-[11px] text-zinc-300 cursor-pointer">
                        <span>Captained Riva Yacht (+$3,200)</span>
                        <input
                          type="checkbox"
                          checked={addYacht}
                          onChange={(e) => setAddYacht(e.target.checked)}
                          className="accent-amber-500"
                        />
                      </label>
                      <label className="flex items-center justify-between text-[11px] text-zinc-300 cursor-pointer">
                        <span>Airport Helicopter Transfer (+$2,400)</span>
                        <input
                          type="checkbox"
                          checked={addHelicopter}
                          onChange={(e) => setAddHelicopter(e.target.checked)}
                          className="accent-amber-500"
                        />
                      </label>
                      <label className="flex items-center justify-between text-[11px] text-zinc-300 cursor-pointer">
                        <span>Private Michelin Chef Service (+$1,200)</span>
                        <input
                          type="checkbox"
                          checked={addPrivateChef}
                          onChange={(e) => setAddPrivateChef(e.target.checked)}
                          className="accent-amber-500"
                        />
                      </label>
                    </div>

                    <div className="flex justify-between text-zinc-400">
                      <span>Concierge Service & Taxes (12%)</span>
                      <span>{formatCurrency(taxesAndFees)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                      <span>Total Reservation</span>
                      <span className="text-amber-400 font-mono">
                        {formatCurrency(grandTotal)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Primary Guest Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email for Confirmation Voucher"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
                      <Lock size={11} /> Stripe Secured Payment Card
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="4242 4242 4242 4242"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/25 transition-transform active:scale-95"
                    >
                      {isProcessing ? "Authorizing Stripe Payment..." : `Confirm Sanctuary Stay · ${formatCurrency(grandTotal)}`}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BookingDemo;
