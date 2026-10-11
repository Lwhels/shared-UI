import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  BubbleReveal,
  MovingBorderButton,
  Spotlight,
  GlassCard,
  Magnetic,
  GlowingBadge,
  TextReveal,
} from "../../components";
import { sendEmail } from "../../services/emailService";
import {
  UtensilsCrossed,
  Wine,
  Clock,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Flame,
  Award,
  Filter,
  X,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Dish {
  id: string;
  name: string;
  course: string;
  category: "starter" | "main" | "dessert" | "wine";
  description: string;
  ingredients: string;
  price: string;
  pairing: string;
  dietary: string[];
  highlight?: boolean;
}

export const RestaurantDemo: React.FC = () => {
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>("all");
  const [dietaryFilter, setDietaryFilter] = useState<string>("all");
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  // Reservation details
  const [guestCount, setGuestCount] = useState(2);
  const [reservationDate, setReservationDate] = useState("2026-10-18");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("19:30");
  const [seatingArea, setSeatingArea] = useState("Chef's Counter");
  const [guestName, setGuestName] = useState("Lady Eleanor Fairfax");
  const [guestEmail, setGuestEmail] = useState("eleanor@fairfaxestate.com");
  const [guestPhone, setGuestPhone] = useState("+33 1 42 68 55 00");
  const [dietaryNotes, setDietaryNotes] = useState("No shellfish for 1 guest, anniversary celebration");
  const [reservationConfirmed, setReservationConfirmed] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);

  const menuItems: Dish[] = [
    {
      id: "d1",
      course: "PRELUDE",
      category: "starter",
      name: "Hokkaido Sea Urchin & Smoked Dashi",
      description: "Hokkaido uni nestled over crisp kelp pastry with oscietra caviar and yuzu emulsion.",
      ingredients: "Hokkaido Uni, Sturia Caviar, Wild Kombu, Finger Lime",
      price: "$45",
      pairing: "Champagne Krug Grande Cuvée 170th Edition",
      dietary: ["pescatarian"],
      highlight: true,
    },
    {
      id: "d2",
      course: "EARTH",
      category: "starter",
      name: "Charred Morel & Roasted Bone Marrow",
      description: "Forest-foraged spring morels stuffed with veal sweetbreads, glazed in 48-hour black truffle reduction.",
      ingredients: "Morel Mushrooms, Périgord Black Truffle, Vin Jaune, Aged Brioche",
      price: "$52",
      pairing: "Domaine Leflaive Puligny-Montrachet 2020",
      dietary: ["gluten-free available"],
    },
    {
      id: "d3",
      course: "OCEAN",
      category: "main",
      name: "Butter-Poached Brittany Blue Lobster",
      description: "Tail gently poached in seaweed butter, charred baby leeks, and fermented bisque emulsion.",
      ingredients: "Blue Lobster, White Asparagus, Fermented Citrus, Saffron Oil",
      price: "$68",
      pairing: "Chassagne-Montrachet 1er Cru 2019",
      dietary: ["pescatarian", "gluten-free"],
      highlight: true,
    },
    {
      id: "d4",
      course: "HERITAGE",
      category: "main",
      name: "A5 Miyazaki Wagyu over Binchotan",
      description: "Charcoal-kissed ribeye served with fermented black garlic paste and smoked potato emulsion.",
      ingredients: "Miyazaki A5 Wagyu, Black Garlic, Smoked Butter, Mountain Wasabi",
      price: "$85",
      pairing: "Château Pontet-Canet Pauillac 2015",
      dietary: ["gluten-free"],
      highlight: true,
    },
    {
      id: "d5",
      course: "BOTANICAL",
      category: "starter",
      name: "Heirloom Beet Tartare & Smoked Almond",
      description: "Slow-roasted salt-crusted beets, fermented elderberry gastrique, and cultured almond curd.",
      ingredients: "Yellow & Chioggia Beets, Elderberry, Marcona Almonds",
      price: "$38",
      pairing: "Domaine Vacheron Sancerre 2022",
      dietary: ["vegan", "gluten-free"],
    },
    {
      id: "d6",
      course: "FINALE",
      category: "dessert",
      name: "Smoked Vanilla Bean & Smoked Caramel",
      description: "Madagascar bourbon vanilla quenelle with bitter cocoa soil and single-malt Islay peat mist.",
      ingredients: "Tahitian Vanilla, 72% Venezuelan Cacao, Laphroaig Mist",
      price: "$32",
      pairing: "Château d'Yquem Sauternes 2011",
      dietary: ["vegetarian"],
    },
  ];

  const timeSlots = [
    { time: "18:00", available: "3 tables" },
    { time: "18:30", available: "1 table left" },
    { time: "19:30", available: "Chef's counter only" },
    { time: "20:30", available: "Available" },
    { time: "21:15", available: "Late seating" },
  ];

  const filteredMenu = menuItems.filter((item) => {
    const matchesCat = activeMenuCategory === "all" || item.category === activeMenuCategory;
    const matchesDiet = dietaryFilter === "all" || item.dietary.includes(dietaryFilter);
    return matchesCat && matchesDiet;
  });

  const handleBookReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);

    const confirmationId = `RES-${Math.floor(Math.random() * 90000 + 10000)}`;

    await sendEmail({
      to: guestEmail,
      subject: `Table Reservation Confirmed: ${confirmationId} · L'Atelier Noir`,
      template: "table_reservation",
      data: {
        confirmationId,
        guestName,
        date: reservationDate,
        time: selectedTimeSlot,
        guests: `${guestCount} Guests`,
        seatingArea,
        notes: dietaryNotes,
      },
    });

    confetti({
      particleCount: 110,
      spread: 70,
      origin: { y: 0.6 },
    });

    setReservationConfirmed({
      id: confirmationId,
      name: guestName,
      date: reservationDate,
      time: selectedTimeSlot,
      guests: guestCount,
      seating: seatingArea,
    });

    setIsBooking(false);
  };

  return (
    <div className="min-h-screen bg-[#090a0c] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-yellow-600/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center">
            <GlowingBadge variant="amber">TWO MICHELIN STARS · 2026 EDITION</GlowingBadge>
          </div>

          <p className="font-serif italic text-lg sm:text-xl text-yellow-200/80 tracking-wide">
            L'Atelier Noir
          </p>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#fefce8]">
            <TextReveal text="Where Fire Meets Foraged Harmony" />
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            An intimate culinary laboratory pairing wood-fired gastronomy with world-class biodynamic viticulture and live table booking.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Magnetic strength={0.3}>
              <button
                onClick={() => {
                  setReservationConfirmed(null);
                  setIsReservationOpen(true);
                }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-zinc-950 font-bold text-sm shadow-xl shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95"
              >
                Book Table Online
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="#menu"
                className="px-8 py-3.5 rounded-full border border-yellow-500/30 hover:border-yellow-500/60 bg-white/5 hover:bg-white/10 text-yellow-200 font-medium text-sm transition-all"
              >
                Explore Full Menu
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Operating detail bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 text-xs text-zinc-500 font-mono hidden sm:flex">
          <span className="flex items-center gap-1.5">
            <Clock size={13} className="text-amber-400" /> Tuesday - Sunday 18:00 - 23:30
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} className="text-amber-400" /> 42 Rue Saint-Honoré, Paris
          </span>
        </div>
      </section>

      {/* Bubble Reveal Interactive Plate Explorer */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10 space-y-2">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Culinary Microscope
          </span>
          <h2 className="text-3xl font-bold font-serif text-[#fefce8]">
            Interactive Dish Revealer
          </h2>
          <p className="text-sm text-zinc-400 max-w-md mx-auto">
            Hover your cursor over the plate to uncover secret foraging sources, rare truffles, and bespoke wine pairings.
          </p>
        </div>

        <div className="h-[420px] w-full rounded-2xl overflow-hidden border border-yellow-500/20 relative shadow-2xl bg-zinc-950">
          <BubbleReveal
            size={220}
            ringColor="rgba(234, 179, 8, 0.4)"
            overlayContent={
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-8 text-center relative">
                <div className="w-14 h-14 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400 mb-4 animate-pulse">
                  <UtensilsCrossed size={22} />
                </div>
                <h3 className="text-2xl font-bold font-serif text-[#fefce8] mb-2">
                  THE FINISHED PLATING
                </h3>
                <p className="text-sm text-zinc-400 max-w-md">
                  Miyazaki A5 Wagyu wrapped in burnt leek ash with golden chanterelles.
                </p>
                <div className="mt-4 px-3.5 py-1 rounded-full bg-yellow-500/15 text-yellow-300 text-xs font-mono border border-yellow-500/30">
                  Hover anywhere on the plate to inspect origin provenance
                </div>
              </div>
            }
          >
            <div className="w-full h-full bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 flex flex-col items-center justify-center p-8 text-center">
              <h3 className="text-2xl font-bold font-serif text-yellow-200 mb-2">
                PROVENANCE & FORAGING DATA
              </h3>
              <p className="text-sm text-zinc-300 max-w-md">
                Chanterelles foraged 6 hours ago in the Vosges mountains. Wagyu aged 45 days in Himalayan salt chamber.
              </p>
              <div className="mt-4 px-3.5 py-1 rounded-full bg-white/20 text-white text-xs font-mono">
                Sommelier Pairing: Hermitage La Chapelle 2014
              </div>
            </div>
          </BubbleReveal>
        </div>
      </section>

      {/* Menu Showcase with Filters */}
      <section id="menu" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            A La Carte & Tasting
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#fefce8]">
            Autumn Gastronomy Menu
          </h2>
          <p className="text-sm text-zinc-400">
            Filtered by course category and dietary preferences with sommelier pairings.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {[
              { id: "all", label: "All Offerings" },
              { id: "starter", label: "Preludes & Starters" },
              { id: "main", label: "Wood-Fired Mains" },
              { id: "dessert", label: "Desserts & Cheeses" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMenuCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeMenuCategory === tab.id
                    ? "bg-yellow-500 text-zinc-950 shadow-md shadow-yellow-500/20"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dietary Filter */}
          <div className="flex justify-center items-center gap-2 pt-2 text-xs">
            <Filter size={13} className="text-amber-400" />
            <span className="text-zinc-500">Dietary:</span>
            {["all", "gluten-free", "pescatarian", "vegan"].map((diet) => (
              <button
                key={diet}
                onClick={() => setDietaryFilter(diet)}
                className={`px-2.5 py-0.5 rounded text-[11px] font-mono capitalize ${
                  dietaryFilter === diet
                    ? "text-yellow-300 font-bold underline"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {diet}
              </button>
            ))}
          </div>
        </div>

        {/* Menu list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMenu.map((dish) => (
            <Spotlight
              key={dish.id}
              className={`p-6 transition-all ${
                dish.highlight ? "border-yellow-500/30 bg-yellow-500/[0.02]" : ""
              }`}
            >
              <div className="flex flex-col justify-between h-full space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-yellow-400">
                      {dish.course}
                    </span>
                    <span className="text-base font-serif font-bold text-yellow-300">
                      {dish.price}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-[#fefce8] mb-1.5">
                    {dish.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {dish.description}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-mono mt-2">
                    <strong className="text-zinc-400">Provenance:</strong> {dish.ingredients}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-yellow-200/90 font-mono">
                  <span className="flex items-center gap-1">
                    <Wine size={12} className="text-yellow-400" /> {dish.pairing}
                  </span>
                </div>
              </div>
            </Spotlight>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <MovingBorderButton
            onClick={() => {
              setReservationConfirmed(null);
              setIsReservationOpen(true);
            }}
            borderRadius="2rem"
            duration={3000}
            className="text-yellow-300 font-serif font-bold text-base px-8"
          >
            Reserve Table Online →
          </MovingBorderButton>
        </div>
      </section>

      {/* Online Table Reservation Modal with Real-time Slots & Email Dispatch */}
      <AnimatePresence>
        {isReservationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-zinc-950 border border-yellow-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <GlowingBadge variant="amber">INSTANT TABLE BOOKING</GlowingBadge>
                  <h3 className="text-xl font-bold font-serif text-white">
                    L'Atelier Noir Reservations
                  </h3>
                </div>
                <button
                  onClick={() => setIsReservationOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {reservationConfirmed ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-2xl font-bold font-serif text-white">
                    Reservation Confirmed!
                  </h4>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono space-y-1 text-left max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Confirmation ID:</span>
                      <strong className="text-amber-400">{reservationConfirmed.id}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Guest Name:</span>
                      <span>{reservationConfirmed.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Date & Time:</span>
                      <span>{reservationConfirmed.date} at {reservationConfirmed.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Seating:</span>
                      <span>{reservationConfirmed.seating} ({reservationConfirmed.guests} Guests)</span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400">
                    A confirmation voucher has been dispatched to {guestEmail}. Check your inbox or view it in the floating API drawer!
                  </p>
                  <button
                    onClick={() => setIsReservationOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-yellow-500 text-zinc-950 font-bold text-xs"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookReservation} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                      Party Size
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 4, 6, 8].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestCount(num)}
                          className={`flex-1 py-2 rounded-xl text-xs font-semibold border ${
                            guestCount === num
                              ? "bg-yellow-500 text-zinc-950 border-yellow-500"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        value={reservationDate}
                        onChange={(e) => setReservationDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                        Seating Area
                      </label>
                      <select
                        value={seatingArea}
                        onChange={(e) => setSeatingArea(e.target.value)}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                      >
                        <option value="Chef's Counter">Chef's Counter (Interactive)</option>
                        <option value="Main Dining Salon">Main Dining Salon</option>
                        <option value="Wine Vault (Private)">Wine Vault (Private)</option>
                        <option value="Garden Terrace">Heated Garden Terrace</option>
                      </select>
                    </div>
                  </div>

                  {/* Time slot pills */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                      Select Seating Time Slot
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`p-2 rounded-xl text-center border transition-all ${
                            selectedTimeSlot === slot.time
                              ? "bg-yellow-500 text-zinc-950 border-yellow-500"
                              : "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
                          }`}
                        >
                          <div className="text-xs font-bold">{slot.time}</div>
                          <div className="text-[9px] text-zinc-500 truncate">{slot.available}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <input
                      type="text"
                      required
                      placeholder="Lead Guest Full Name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email Address for Confirmation"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Dietary requirements or special requests (allergies, anniversary...)"
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                  />

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isBooking}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 disabled:opacity-50 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-yellow-500/25 transition-transform active:scale-95"
                    >
                      {isBooking ? "Securing Table..." : "Confirm Reservation & Dispatch Voucher →"}
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

export default RestaurantDemo;
