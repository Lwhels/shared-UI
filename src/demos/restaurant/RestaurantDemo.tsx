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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Dish {
  name: string;
  course: string;
  description: string;
  ingredients: string;
  price: string;
  pairing: string;
  highlight?: boolean;
}

export const RestaurantDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"tasting" | "alacarte" | "cellar">("tasting");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [guestCount, setGuestCount] = useState(2);
  const [reservationDate, setReservationDate] = useState("2026-10-18");
  const [seatingArea, setSeatingArea] = useState("Chef's Counter");
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  const tastingMenu: Dish[] = [
    {
      course: "PRELUDE",
      name: "Sea Urchin & Smoked Dashi Tartlet",
      description: "Hokkaido uni nestled over crisp kelp pastry with oscietra caviar and yuzu emulsion.",
      ingredients: "Hokkaido Uni, Sturia Caviar, Wild Kombu, Finger Lime",
      price: "Course I",
      pairing: "Champagne Krug Grande Cuvée 170th Edition",
      highlight: true,
    },
    {
      course: "EARTH",
      name: "Charred Morel & Roasted Bone Marrow",
      description: "Forest-foraged spring morels stuffed with veal sweetbreads, glazed in 48-hour black truffle reduction.",
      ingredients: "Morel Mushrooms, Périgord Black Truffle, Vin Jaune, Aged Brioche",
      price: "Course II",
      pairing: "Domaine Leflaive Puligny-Montrachet 2020",
    },
    {
      course: "OCEAN",
      name: "Butter-Poached Brittany Blue Lobster",
      description: "Tail gently poached in seaweed butter, charred baby leeks, and fermented bisque emulsion.",
      ingredients: "Blue Lobster, White Asparagus, Fermented Citrus, Saffron Oil",
      price: "Course III",
      pairing: "Chassagne-Montrachet 1er Cru 2019",
      highlight: true,
    },
    {
      course: "HERITAGE",
      name: "A5 Miyazaki Wagyu over Binchotan",
      description: "Charcoal-kissed ribeye served with fermented black garlic paste and smoked potato emulsion.",
      ingredients: "Miyazaki A5 Wagyu, Black Garlic, Smoked Butter, Mountain Wasabi",
      price: "Course IV",
      pairing: "Château Pontet-Canet Pauillac 2015",
    },
    {
      course: "FINALE",
      name: "Smoked Vanilla Bean & Smoked Caramel",
      description: "Madagascar bourbon vanilla quenelle with bitter cocoa soil and single-malt whiskey mist.",
      ingredients: "Tahitian Vanilla, 72% Venezuelan Cacao, Islay Peat Mist",
      price: "Course V",
      pairing: "Château d'Yquem Sauternes 2011",
    },
  ];

  const handleBookReservation = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
    });
    setReservationConfirmed(true);
    setTimeout(() => {
      setReservationConfirmed(false);
      setIsReservationOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#090a0c] text-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Ambient warm amber backlight */}
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
            An intimate 16-seat culinary laboratory pairing wood-fired gastronomy with world-class biodynamic viticulture.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Magnetic strength={0.3}>
              <button
                onClick={() => setIsReservationOpen(true)}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-zinc-950 font-bold text-sm shadow-xl shadow-yellow-500/20 transition-all hover:scale-105 active:scale-95"
              >
                Reserve a Table
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <a
                href="#menu"
                className="px-8 py-3.5 rounded-full border border-yellow-500/30 hover:border-yellow-500/60 bg-white/5 hover:bg-white/10 text-yellow-200 font-medium text-sm transition-all"
              >
                View Degustation
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

      {/* Menu Showcase */}
      <section id="menu" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
            Seasonal Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#fefce8]">
            Autumn Degustation Menu
          </h2>
          <p className="text-sm text-zinc-400">
            A seven-sequence progression celebrating fire, fermentation, and autumn harvest.
          </p>

          <div className="flex justify-center gap-2 pt-4">
            {[
              { id: "tasting", label: "7-Course Degustation ($220)" },
              { id: "alacarte", label: "A La Carte" },
              { id: "cellar", label: "Sommelier Reserve ($145)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-yellow-500 text-zinc-950 shadow-md shadow-yellow-500/20"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu list */}
        <div className="space-y-4">
          {tastingMenu.map((dish, idx) => (
            <Spotlight
              key={idx}
              className={`p-6 transition-all ${
                dish.highlight ? "border-yellow-500/30 bg-yellow-500/[0.02]" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-yellow-400">
                      {dish.course}
                    </span>
                    <h3 className="text-lg font-bold font-serif text-[#fefce8]">
                      {dish.name}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
                    {dish.description}
                  </p>
                  <p className="text-[11px] text-zinc-500 font-mono">
                    <strong className="text-zinc-400">Key Elements:</strong> {dish.ingredients}
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <div className="flex items-center sm:justify-end gap-1.5 text-xs text-yellow-300 font-mono">
                    <Wine size={13} />
                    <span>{dish.pairing}</span>
                  </div>
                </div>
              </div>
            </Spotlight>
          ))}
        </div>

        {/* Moving Border CTA button */}
        <div className="mt-12 flex justify-center">
          <MovingBorderButton
            onClick={() => setIsReservationOpen(true)}
            borderRadius="2rem"
            duration={3000}
            className="text-yellow-300 font-serif font-bold text-base"
          >
            Reserve Your Autumn Tasting →
          </MovingBorderButton>
        </div>
      </section>

      {/* Reservation Modal */}
      <AnimatePresence>
        {isReservationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-zinc-950 border border-yellow-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <GlowingBadge variant="amber">TABLE RESERVATION</GlowingBadge>
                  <h3 className="text-xl font-bold font-serif text-white">
                    Experience L'Atelier Noir
                  </h3>
                </div>
                <button
                  onClick={() => setIsReservationOpen(false)}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {reservationConfirmed ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-lg font-bold font-serif text-white">
                    Reservation Confirmed
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    We look forward to hosting your party of {guestCount} on {reservationDate} at the {seatingArea}.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookReservation} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                      Number of Guests
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 4, 6].map((num) => (
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

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                      Desired Date
                    </label>
                    <input
                      type="date"
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-1.5">
                      Preferred Seating
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Chef's Counter", "Main Salon", "Wine Vault"].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setSeatingArea(area)}
                          className={`py-2 px-2 rounded-xl text-[11px] font-semibold border text-center ${
                            seatingArea === area
                              ? "bg-yellow-500 text-zinc-950 border-yellow-500"
                              : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-yellow-500/25 transition-transform active:scale-95"
                    >
                      Confirm Table Booking
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
