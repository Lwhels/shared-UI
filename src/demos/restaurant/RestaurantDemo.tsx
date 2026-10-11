import React, { useState } from "react";
import confetti from "canvas-confetti";
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
  Compass,
  Star,
  Check,
  BookOpen,
  Eye,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Dish {
  id: string;
  actNumber: string;
  courseTitle: string;
  frenchName: string;
  englishTitle: string;
  description: string;
  secretIngredients: string[];
  priceEUR: number;
  sommelierPairing: {
    wine: string;
    vintage: string;
    region: string;
    notes: string;
  };
  flavorProfile: {
    umami: number;
    crispness: number;
    aroma: string;
    temperature: string;
  };
  dietary: string[];
  isSignature?: boolean;
}

interface SeatingZone {
  id: string;
  name: string;
  frenchTitle: string;
  description: string;
  capacity: string;
  ambiance: string;
  surchargeEUR: number;
}

export const RestaurantDemo: React.FC = () => {
  const [activeAct, setActiveAct] = useState<string>("act-1");
  const [expandedDishId, setExpandedDishId] = useState<string | null>("d-1");
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedSeatingId, setSelectedSeatingId] = useState<string>("counter");

  // Reservation Form State
  const [guestCount, setGuestCount] = useState<number>(2);
  const [reservationDate, setReservationDate] = useState<string>("2026-10-24");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("19:30");
  const [guestName, setGuestName] = useState<string>("Countess Vivienne de Valois");
  const [guestEmail, setGuestEmail] = useState<string>("vivienne.valois@palais.fr");
  const [guestPhone, setGuestPhone] = useState<string>("+33 1 42 68 55 22");
  const [sommelierPairingOptIn, setSommelierPairingOptIn] = useState<boolean>(true);
  const [dietaryNotes, setDietaryNotes] = useState<string>("Pescetarian preference for one guest; Anniversary celebration.");
  const [isSubmittingBooking, setIsSubmittingBooking] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

  const seatingZones: SeatingZone[] = [
    {
      id: "counter",
      name: "The Chef's Counter",
      frenchTitle: "Le Comptoir de l'Âtre",
      description: "Front-row culinary theater facing the Japanese Binchotan open hearth. Direct interaction with Chef de Cuisine Julien Moreau.",
      capacity: "Only 8 Seats Nightly",
      ambiance: "Dynamic & Intimate",
      surchargeEUR: 0,
    },
    {
      id: "solarium",
      name: "The Glass Solarium",
      frenchTitle: "Le Jardin de Cristal",
      description: "Under a 19th-century wrought-iron skylight surrounded by climbing jasmine and candlelit travertine fountains.",
      capacity: "14 Tables Available",
      ambiance: "Romantic & Starlit",
      surchargeEUR: 25,
    },
    {
      id: "cellar",
      name: "The Vaulted Cellar Crypt",
      frenchTitle: "Le Caveau Historique",
      description: "Carved into 17th-century subterranean limestone cellars housing over 4,500 Grand Cru bottles. Private dedicated sommelier.",
      capacity: "3 Private Vaults",
      ambiance: "Secluded & Reverent",
      surchargeEUR: 60,
    },
  ];

  const menuActs = [
    {
      id: "act-1",
      number: "I",
      frenchTitle: "Les Préludes & L'Océan",
      englishTitle: "Preludes & Coastal Foraging",
      dishes: [
        {
          id: "d-1",
          actNumber: "Acte I",
          courseTitle: "PRELUDE",
          frenchName: "L'Oursin d'Hokkaido & Caviar Osciètre Impérial",
          englishTitle: "Hokkaido Sea Urchin & Imperial Oscietra Caviar",
          description: "Fresh sea urchin roe nested in charred kelp crisp, finished with smoked dashi jelly and kalamansi citrus essence.",
          secretIngredients: ["Hokkaido Uni", "Imperial Oscietra", "Aged Binchotan Kelp", "Finger Lime"],
          priceEUR: 65,
          sommelierPairing: {
            wine: "Champagne Krug Grande Cuvée",
            vintage: "171ème Édition",
            region: "Reims, France",
            notes: "Toasted brioche, hazelnut, and intense minerality cutting through rich marine uni.",
          },
          flavorProfile: {
            umami: 10,
            crispness: 8,
            aroma: "Briny Sea Spray & Hazelnut",
            temperature: "Chilled (10°C)",
          },
          dietary: ["Pescatarian"],
          isSignature: true,
        },
        {
          id: "d-2",
          actNumber: "Acte I",
          courseTitle: "FORAGE",
          frenchName: "La Morille des Bois & Moelle Fumée",
          englishTitle: "Forest Morel Mushroom & Smoked Marrow Glaze",
          description: "Spring morels hand-stuffed with sweetbread mousseline, poached in 24-year Vin Jaune with winter savory.",
          secretIngredients: ["Wild Pyrenees Morels", "Veal Marrow", "Jura Vin Jaune 2002", "Alpine Chervil"],
          priceEUR: 58,
          sommelierPairing: {
            wine: "Domaine Macle Château-Chalon",
            vintage: "2014",
            region: "Jura, France",
            notes: "Walnut skin, curry leaf, and oxidised gold mirroring the deep morel earthiness.",
          },
          flavorProfile: {
            umami: 9,
            crispness: 4,
            aroma: "Damp Pine Forest & Smoke",
            temperature: "Warm (54°C)",
          },
          dietary: ["Gluten-Free Available"],
        },
      ],
    },
    {
      id: "act-2",
      number: "II",
      frenchTitle: "Le Terroir & L'Âtre",
      englishTitle: "The Hearth & Ancient Terroir",
      dishes: [
        {
          id: "d-3",
          actNumber: "Acte II",
          courseTitle: "THE HEARTH",
          frenchName: "Homard Bleu de Bretagne au Beurre Noisette",
          englishTitle: "Brittany Blue Lobster over Charcoal Embers",
          description: "Tail flash-seared over cherrywood coals, accompanied by glazed Tokyo turnips and fermented elderberry coral emulsion.",
          secretIngredients: ["Brittany Blue Lobster", "AOP Isigny Butter", "Elderberry Reduction", "Baby White Turnips"],
          priceEUR: 88,
          sommelierPairing: {
            wine: "Domaine Leflaive Puligny-Montrachet",
            vintage: "2020",
            region: "Burgundy, France",
            notes: "Crushed chalk, white blossoms, and silky citrus texture highlighting sweet lobster flesh.",
          },
          flavorProfile: {
            umami: 9,
            crispness: 6,
            aroma: "Sweet Smoked Shellfish & Butter",
            temperature: "Searing Hot (62°C)",
          },
          dietary: ["Pescatarian", "Gluten-Free"],
          isSignature: true,
        },
        {
          id: "d-4",
          actNumber: "Acte II",
          courseTitle: "SACRED EARTH",
          frenchName: "Bœuf Wagyu A5 de Kagoshima au Sarment de Vigne",
          englishTitle: "Kagoshima Wagyu A5 over Dried Grapevines",
          description: "Snow beef ribeye smoked over aged Meursault vine shoots, black Périgord truffle mille-feuille, and fermented allium jus.",
          secretIngredients: ["Kagoshima Wagyu A5", "Périgord Black Truffle", "Aged Shallot Ash", "Vin de Banyuls"],
          priceEUR: 110,
          sommelierPairing: {
            wine: "Château Palmer Margaux",
            vintage: "2010",
            region: "Bordeaux, France",
            notes: "Velvety cedar, dark cassis, and aristocratic graphite tannins melting the marbled A5 fat.",
          },
          flavorProfile: {
            umami: 10,
            crispness: 7,
            aroma: "Roasted Cedar, Truffle & Charcoal",
            temperature: "Medium Rare (52°C)",
          },
          dietary: ["Gluten-Free"],
          isSignature: true,
        },
      ],
    },
    {
      id: "act-3",
      number: "III",
      frenchTitle: "L'Éphémère & Les Douceurs",
      englishTitle: "Transcendence & Final Confections",
      dishes: [
        {
          id: "d-5",
          actNumber: "Acte III",
          courseTitle: "CLEANSER",
          frenchName: "Granité de Shiso Vert & Yuzu Givré",
          englishTitle: "Wild Green Shiso Snow & Frozen Yuzu Pearls",
          description: "A palate awakening of alpine frost, wild mint crystallised in liquid nitrogen, and 30-year Mirin elixir.",
          secretIngredients: ["Green Shiso", "Kochi Yuzu", "Liquid Nitrogen Herb Snow", "Aged Mirin"],
          priceEUR: 32,
          sommelierPairing: {
            wine: "Junmai Daiginjo Born Gold",
            vintage: "Special Reserve",
            region: "Fukui, Japan",
            notes: "Crisp green apple and crystalline mountain spring water finish.",
          },
          flavorProfile: {
            umami: 2,
            crispness: 10,
            aroma: "Frozen Citrus & Alpine Mint",
            temperature: "Sub-Zero (-4°C)",
          },
          dietary: ["Vegan", "Gluten-Free"],
        },
        {
          id: "d-6",
          actNumber: "Acte III",
          courseTitle: "FINALE",
          frenchName: "Cacao Criollo de Chuao & Truffe Noire Givrée",
          englishTitle: "Venezuelan Criollo Cacao & Frozen Truffle Soufflé",
          description: "Warm 74% pure harvest molten sphere with bitter orange blossom mist, golden hazelnut praline, and shaved fresh Périgord truffle.",
          secretIngredients: ["Chuao 74% Chocolate", "Périgord Truffle", "Fleur de Sel de Guérande", "24k Gold Leaf"],
          priceEUR: 42,
          sommelierPairing: {
            wine: "Château d'Yquem Sauternes",
            vintage: "2009",
            region: "Bordeaux, France",
            notes: "Candied saffron, dried apricot, and liquid amber balancing pure dark cocoa.",
          },
          flavorProfile: {
            umami: 7,
            crispness: 5,
            aroma: "Dark Smoke, Vanilla & Cacao",
            temperature: "Warm Heart with Glace (48°C)",
          },
          dietary: ["Vegetarian"],
          isSignature: true,
        },
      ],
    },
  ];

  const currentActData = menuActs.find((a) => a.id === activeAct) || menuActs[0];
  const selectedZone = seatingZones.find((z) => z.id === selectedSeatingId) || seatingZones[0];

  const degustationBasePriceEUR = 280;
  const winePairingPriceEUR = sommelierPairingOptIn ? 185 : 0;
  const totalPerGuestEUR = degustationBasePriceEUR + winePairingPriceEUR + selectedZone.surchargeEUR;
  const grandTotalEstimateEUR = totalPerGuestEUR * guestCount;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBooking(true);

    const bookingRef = `RES-MICHELIN-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    try {
      await sendEmail({
        to: guestEmail,
        subject: `Table Confirmation ${bookingRef} — L'Étoile Noire (III Étoiles Michelin)`,
        template: "order_confirmation",
        data: {
          customerName: guestName,
          shippingAddress: `${selectedZone.name} · ${reservationDate} at ${selectedTimeSlot}`,
          amountPaid: `€${grandTotalEstimateEUR} (Estimated Degustation for ${guestCount} Guests)`,
          chargeId: bookingRef,
          last4: "TABLE-RES",
          items: [
            `Grand Menu Dégustation (x${guestCount})`,
            sommelierPairingOptIn ? `Sommelier Grand Cru Pairing (x${guestCount})` : "Wine à la carte",
            `Seating: ${selectedZone.frenchTitle}`,
          ],
        },
      });

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#FFFFFF", "#8B1E3F", "#C5A880"],
      });

      setConfirmedBooking({
        ref: bookingRef,
        name: guestName,
        email: guestEmail,
        date: reservationDate,
        time: selectedTimeSlot,
        guests: guestCount,
        zone: selectedZone.name,
        pairing: sommelierPairingOptIn,
        total: grandTotalEstimateEUR,
      });

      setIsSubmittingBooking(false);
    } catch (err: any) {
      setIsSubmittingBooking(false);
      alert(err.message || "Reservation transmission failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0708] text-[#F3EFE6] font-serif selection:bg-[#D4AF37]/30 selection:text-[#F3EFE6]">
      {/* Michelin Crest Header */}
      <header className="border-b border-[#D4AF37]/20 bg-[#0A0708]/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] bg-[#160D10] shadow-lg shadow-[#D4AF37]/10">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-normal tracking-wide text-[#F3EFE6]">
                  L'Étoile Noire
                </h1>
                <div className="flex items-center gap-0.5 text-[#D4AF37]" title="Trois Étoiles Michelin">
                  <Star size={11} className="fill-[#D4AF37]" />
                  <Star size={11} className="fill-[#D4AF37]" />
                  <Star size={11} className="fill-[#D4AF37]" />
                </div>
              </div>
              <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#D4AF37]/80">
                Gastronomie d'Auteur · Paris VIIIe
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-xs font-sans tracking-widest text-[#E8DFC8]">
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#D4AF37]" />
              <span>Service: 19h00 — 23h30</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#D4AF37]" />
              <span>18 Place Vendôme, Paris</span>
            </span>
          </div>

          <button
            onClick={() => setIsReservationOpen(true)}
            className="px-5 py-2.5 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#D4AF37]/20 to-[#D4AF37]/10 hover:from-[#D4AF37] hover:to-[#B89628] hover:text-[#0A0708] text-[#D4AF37] text-xs font-sans tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#D4AF37]/10 active:scale-95"
          >
            Réserver Une Table
          </button>
        </div>
      </header>

      {/* Atmospheric Atelier Hero */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 border-b border-[#D4AF37]/20 overflow-hidden bg-gradient-to-b from-[#140A0F] via-[#0A0708] to-[#0A0708]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#160D10]/80 text-[#D4AF37] text-xs font-sans tracking-widest uppercase">
            <span>Guide Michelin 2026</span>
            <span>•</span>
            <span>Trois Étoiles Confirmées</span>
            <span>•</span>
            <span>19.5/20 Gault & Millau</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-[#F3EFE6]">
            La Poésie du Feu & <br />
            <span className="italic text-[#D4AF37] font-light">du Terroir Sacré.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#C8BFAC] font-light italic max-w-2xl mx-auto leading-relaxed">
            « La gastronomie est l’art de capturer l’éphémère — le parfum du feu de sarment de vigne, la brume marine d'Hokkaido, et la mémoire d'un millésime endormi. »
          </p>

          <p className="text-xs font-sans tracking-widest text-[#D4AF37] uppercase">
            Julien Moreau — Chef de Cuisine
          </p>

          {/* Quick Table Availability Pill */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-8 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#c49f2b] text-[#0A0708] font-sans font-semibold text-xs tracking-widest uppercase transition-transform active:scale-95 shadow-xl shadow-[#D4AF37]/20 flex items-center gap-2"
            >
              <span>Consulter Les Disponibilités</span>
              <ChevronRight size={14} />
            </button>
            <span className="text-xs font-sans text-[#A89F8E] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>4 tables restantes ce samedi 24 octobre</span>
            </span>
          </div>
        </div>
      </section>

      {/* Tasting Menu Degustation Experience */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37]">
            Menu Dégustation en Sept Temps
          </span>
          <h3 className="text-3xl sm:text-4xl font-normal text-[#F3EFE6]">
            Le Livre Gastronomique
          </h3>
          <p className="text-xs font-sans tracking-wider text-[#A89F8E] max-w-md mx-auto">
            Chaque acte célèbre un élément de la terre, des profondeurs océaniques aux flammes du brasier.
          </p>
        </div>

        {/* Acts Navigation Tabs */}
        <div className="flex justify-center border-b border-[#D4AF37]/20 mb-12">
          <div className="flex gap-2 sm:gap-6 overflow-x-auto pb-4">
            {menuActs.map((act) => (
              <button
                key={act.id}
                onClick={() => setActiveAct(act.id)}
                className={`flex items-center gap-3 px-5 py-3 rounded-full font-sans text-xs tracking-widest uppercase transition-all whitespace-nowrap ${
                  activeAct === act.id
                    ? "bg-[#D4AF37] text-[#0A0708] font-bold shadow-lg shadow-[#D4AF37]/20"
                    : "text-[#A89F8E] hover:text-[#F3EFE6] bg-[#160D10]/50 border border-white/5"
                }`}
              >
                <span className="font-serif italic text-sm">{act.number}.</span>
                <span>{act.frenchTitle}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dishes Stream for Active Act */}
        <div className="space-y-8">
          {currentActData.dishes.map((dish) => {
            const isExpanded = expandedDishId === dish.id;

            return (
              <div
                key={dish.id}
                className="rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-br from-[#140C10] via-[#0E080B] to-[#0A0708] p-6 sm:p-8 transition-all hover:border-[#D4AF37]/60 shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Left Column: Dish Title & Gastronomic Story */}
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4AF37] px-2.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#1F1015]">
                        {dish.courseTitle}
                      </span>
                      {dish.isSignature && (
                        <span className="text-[10px] font-sans uppercase tracking-widest text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40">
                          Création Signature
                        </span>
                      )}
                      {dish.dietary.map((d) => (
                        <span key={d} className="text-[10px] font-sans text-[#A89F8E]">
                          • {d}
                        </span>
                      ))}
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-normal text-[#F3EFE6] leading-tight">
                      {dish.frenchName}
                    </h4>
                    <p className="text-sm font-sans text-[#D4AF37] font-light">
                      {dish.englishTitle}
                    </p>
                    <p className="text-sm text-[#C8BFAC] font-light leading-relaxed max-w-2xl italic">
                      {dish.description}
                    </p>

                    {/* Key Ingredients Pill Strip */}
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#A89F8E]">
                        Composants Notables:
                      </span>
                      {dish.secretIngredients.map((ing) => (
                        <span
                          key={ing}
                          className="text-xs font-sans px-2.5 py-0.5 rounded-full bg-[#1A0F14] border border-[#D4AF37]/20 text-[#E8DFC8]"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Price & Toggle Sensor Radar */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#D4AF37]/15">
                    <span className="text-2xl font-serif text-[#D4AF37]">
                      €{dish.priceEUR}
                    </span>

                    <button
                      onClick={() => setExpandedDishId(isExpanded ? null : dish.id)}
                      className="px-4 py-2 rounded-full border border-[#D4AF37]/40 bg-[#1F1015] hover:bg-[#D4AF37] hover:text-[#0A0708] text-[#D4AF37] text-xs font-sans tracking-wider uppercase transition-colors flex items-center gap-2"
                    >
                      <BookOpen size={13} />
                      <span>{isExpanded ? "Fermer Notes" : "Notes du Sommelier"}</span>
                    </button>
                  </div>
                </div>

                {/* Expanded Sommelier & Flavor Sensor Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-[#D4AF37]/20 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden"
                    >
                      {/* Wine Pairing */}
                      <div className="bg-[#180F14] p-5 rounded-xl border border-[#D4AF37]/20 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#D4AF37]">
                          <Wine size={14} />
                          <span>Accord Grand Cru Recommandé</span>
                        </div>
                        <h5 className="text-lg font-serif text-[#F3EFE6]">
                          {dish.sommelierPairing.wine} · {dish.sommelierPairing.vintage}
                        </h5>
                        <p className="text-xs font-sans text-[#A89F8E]">
                          {dish.sommelierPairing.region}
                        </p>
                        <p className="text-xs text-[#C8BFAC] font-light italic leading-relaxed pt-1">
                          « {dish.sommelierPairing.notes} »
                        </p>
                      </div>

                      {/* Sensory Profile */}
                      <div className="bg-[#180F14] p-5 rounded-xl border border-[#D4AF37]/20 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#D4AF37]">
                          <Flame size={14} />
                          <span>Profil Sensoriel & Température de Service</span>
                        </div>

                        <div className="space-y-2 font-sans text-xs text-[#C8BFAC]">
                          <div className="flex justify-between items-center">
                            <span>Concentration Umami:</span>
                            <div className="flex gap-1">
                              {Array.from({ length: 10 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i < dish.flavorProfile.umami ? "bg-[#D4AF37]" : "bg-white/10"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>Arômes Dominants:</span>
                            <span className="text-[#F3EFE6] italic font-serif">
                              {dish.flavorProfile.aroma}
                            </span>
                          </div>

                          <div className="flex justify-between items-center">
                            <span>Température Idéale au Palais:</span>
                            <span className="text-[#D4AF37] font-mono">
                              {dish.flavorProfile.temperature}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Floorplan Table Selection Section */}
      <section className="border-t border-b border-[#D4AF37]/20 bg-[#0E080B] py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-sans uppercase tracking-[0.3em] text-[#D4AF37]">
              Architecture des Lieux
            </span>
            <h3 className="text-3xl sm:text-4xl font-normal text-[#F3EFE6]">
              Choisissez Votre Atmosphère
            </h3>
            <p className="text-xs font-sans tracking-wider text-[#A89F8E] max-w-lg mx-auto">
              Trois salons singuliers pour vivre l'expérience gastronomique selon votre sensibilité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seatingZones.map((zone) => {
              const isSelected = selectedSeatingId === zone.id;

              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedSeatingId(zone.id)}
                  className={`cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? "border-[#D4AF37] bg-gradient-to-b from-[#1F1218] to-[#140A0F] shadow-2xl shadow-[#D4AF37]/15 scale-[1.02]"
                      : "border-white/10 bg-[#120A0E] hover:border-[#D4AF37]/40"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#D4AF37]">
                        {zone.capacity}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#0A0708] flex items-center justify-center">
                          <Check size={12} />
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-normal text-[#F3EFE6]">
                      {zone.name}
                    </h4>
                    <p className="text-xs font-sans text-[#D4AF37] italic">
                      {zone.frenchTitle}
                    </p>
                    <p className="text-xs text-[#C8BFAC] font-light leading-relaxed">
                      {zone.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-sans">
                    <span className="text-[#A89F8E]">Ambiance: {zone.ambiance}</span>
                    <span className="text-[#D4AF37] font-semibold">
                      {zone.surchargeEUR === 0 ? "Inclus" : `+€${zone.surchargeEUR}`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="px-8 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#c49f2b] text-[#0A0708] font-sans font-semibold text-xs tracking-widest uppercase transition-transform active:scale-95 shadow-xl shadow-[#D4AF37]/20 inline-flex items-center gap-2"
            >
              <span>Réserver Dans Le Salon Sélectionné</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Tasting Menu Reservation Booking Modal */}
      <AnimatePresence>
        {isReservationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !confirmedBooking && setIsReservationOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl bg-[#0F090C] rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#D4AF37]/40 z-10 max-h-[92vh] overflow-y-auto text-[#F3EFE6]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#D4AF37]/20 mb-6">
                <div>
                  <h3 className="text-2xl font-normal text-[#F3EFE6]">
                    Réservation de Table Dégustation
                  </h3>
                  <p className="text-xs font-sans text-[#D4AF37] uppercase tracking-wider mt-0.5">
                    L'Étoile Noire · 18 Place Vendôme, Paris
                  </p>
                </div>
                {!confirmedBooking && (
                  <button
                    onClick={() => setIsReservationOpen(false)}
                    className="p-1.5 rounded-full hover:bg-white/10 text-stone-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {!confirmedBooking ? (
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  {/* Seating Zone Summary Pill */}
                  <div className="p-4 rounded-xl bg-[#1A0E14] border border-[#D4AF37]/30 flex items-center justify-between text-xs font-sans">
                    <div>
                      <span className="text-[#D4AF37] uppercase tracking-wider block">
                        Salon Choisi:
                      </span>
                      <strong className="text-sm font-serif text-[#F3EFE6]">
                        {selectedZone.name} ({selectedZone.frenchTitle})
                      </strong>
                    </div>
                    <span className="text-[#A89F8E]">
                      {selectedZone.surchargeEUR > 0 ? `+€${selectedZone.surchargeEUR}/couvert` : "Inclus"}
                    </span>
                  </div>

                  {/* Guest Count, Date & Time Slots */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-sans uppercase tracking-wider text-[#D4AF37] mb-1">
                        Nombre de Convives
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(Number(e.target.value))}
                        className="w-full bg-[#180E14] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs font-sans text-[#F3EFE6] focus:outline-none focus:border-[#D4AF37]"
                      >
                        {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "Convive" : "Convives"}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans uppercase tracking-wider text-[#D4AF37] mb-1">
                        Date Souhaitée
                      </label>
                      <input
                        type="date"
                        value={reservationDate}
                        onChange={(e) => setReservationDate(e.target.value)}
                        className="w-full bg-[#180E14] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs font-sans text-[#F3EFE6] focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans uppercase tracking-wider text-[#D4AF37] mb-1">
                        Horaire de Service
                      </label>
                      <select
                        value={selectedTimeSlot}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="w-full bg-[#180E14] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs font-sans text-[#F3EFE6] focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="19:00">19h00 (Premier Service)</option>
                        <option value="19:30">19h30</option>
                        <option value="20:15">20h15 (Grand Service)</option>
                        <option value="21:00">21h00</option>
                      </select>
                    </div>
                  </div>

                  {/* Sommelier Pairing Addon */}
                  <div className="p-4 rounded-xl bg-[#1A0E14] border border-[#D4AF37]/30 flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Wine size={14} className="text-[#D4AF37]" />
                        <span className="text-sm font-normal text-[#F3EFE6]">
                          Accord Mets & Vins du Chef Sommelier
                        </span>
                      </div>
                      <p className="text-xs font-sans text-[#A89F8E] font-light">
                        Sept verres de Grands Crus classés rigoureusement harmonisés (+€185/convive).
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      checked={sommelierPairingOptIn}
                      onChange={(e) => setSommelierPairingOptIn(e.target.checked)}
                      className="w-5 h-5 rounded accent-[#D4AF37] cursor-pointer"
                    />
                  </div>

                  {/* Guest Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-sans uppercase tracking-wider text-[#D4AF37] mb-1">
                        Nom & Titre de Réservation
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full bg-[#180E14] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs font-sans text-[#F3EFE6] focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans uppercase tracking-wider text-[#D4AF37] mb-1">
                        Courriel Pour Confirmation
                      </label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-[#180E14] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs font-sans text-[#F3EFE6] focus:outline-none focus:border-[#D4AF37]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans uppercase tracking-wider text-[#D4AF37] mb-1">
                      Notes Diététiques ou Occasion Particulière
                    </label>
                    <textarea
                      rows={2}
                      value={dietaryNotes}
                      onChange={(e) => setDietaryNotes(e.target.value)}
                      placeholder="Allergies, restrictions alimentaires ou célébration..."
                      className="w-full bg-[#180E14] border border-[#D4AF37]/30 rounded-lg px-3 py-2 text-xs font-sans text-[#F3EFE6] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  {/* Total Degustation Estimate */}
                  <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs font-sans">
                    <span className="text-[#A89F8E]">
                      Montant Estimé ({guestCount} {guestCount === 1 ? "couvert" : "couverts"} avec menu):
                    </span>
                    <span className="text-xl font-serif text-[#D4AF37]">
                      €{grandTotalEstimateEUR}
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="w-full py-4 rounded-full bg-[#D4AF37] hover:bg-[#c49f2b] text-[#0A0708] font-sans font-bold text-xs tracking-widest uppercase transition-all shadow-xl shadow-[#D4AF37]/20 disabled:opacity-50"
                  >
                    {isSubmittingBooking ? "Transmission en Cuisine..." : "Confirmer La Réservation Gastronomique"}
                  </button>
                </form>
              ) : (
                /* Confirmed Booking Voucher */
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center">
                    <Sparkles size={32} />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-2xl font-normal text-[#F3EFE6]">
                      Votre Table Est Réservée
                    </h4>
                    <p className="text-xs font-sans text-[#D4AF37] uppercase tracking-widest">
                      Référence: {confirmedBooking.ref}
                    </p>
                  </div>

                  <p className="text-xs font-light text-[#C8BFAC] max-w-md mx-auto italic">
                    Nous avons l'honneur de vous accueillir le <strong>{confirmedBooking.date}</strong> à <strong>{confirmedBooking.time}</strong> dans <strong>{confirmedBooking.zone}</strong>. Une lettre officielle a été envoyée à <strong>{confirmedBooking.email}</strong>.
                  </p>

                  <div className="bg-[#180E14] p-4 rounded-xl text-left text-xs font-sans text-[#C8BFAC] space-y-1.5 border border-[#D4AF37]/30">
                    <div className="flex justify-between">
                      <span className="text-[#A89F8E]">Convives:</span>
                      <strong className="text-[#F3EFE6]">{confirmedBooking.guests} personnes</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A89F8E]">Accord Mets & Vins:</span>
                      <strong className="text-[#D4AF37]">
                        {confirmedBooking.pairing ? "Oui (Grands Crus)" : "Sélection à la carte"}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A89F8E]">Dress Code:</span>
                      <strong className="text-[#F3EFE6]">Tenue de Ville Émerveillée</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setConfirmedBooking(null);
                      setIsReservationOpen(false);
                    }}
                    className="px-6 py-3 rounded-full border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0708] text-xs font-sans tracking-widest uppercase transition-colors"
                  >
                    Fermer Le Carnet
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
