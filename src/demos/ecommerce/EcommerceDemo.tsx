import React, { useState } from "react";
import confetti from "canvas-confetti";
import { formatCurrency } from "../../lib/utils";
import { processPayment } from "../../services/paymentService";
import { sendEmail } from "../../services/emailService";
import {
  ShoppingBag,
  Heart,
  Star,
  Check,
  Plus,
  Minus,
  Trash2,
  X,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CreditCard,
  Lock,
  ArrowRight,
  Eye,
  CheckCircle2,
  SlidersHorizontal,
  LayoutGrid,
  Columns,
  Search,
  Globe,
  Tag,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  category: "outerwear" | "hardware" | "footwear" | "objects";
  priceUSD: number;
  originalPriceUSD?: number;
  tag?: string;
  subtitle: string;
  description: string;
  longDescription: string;
  rating: number;
  reviewsCount: number;
  bgGradient: string;
  material: string;
  origin: string;
  specs: string[];
  sizes: string[];
  inStock: number;
}

const CURRENCIES = {
  USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
  JPY: { symbol: "¥", rate: 154.0, label: "JPY (¥)" },
};

type CurrencyKey = keyof typeof CURRENCIES;

export const EcommerceDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCurrency, setActiveCurrency] = useState<CurrencyKey>("USD");
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");

  const [cart, setCart] = useState<{ product: Product; quantity: number; size: string }[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productModalSize, setProductModalSize] = useState<string>("M");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"shipping" | "payment" | "success">("shipping");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Form Fields
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [shippingName, setShippingName] = useState("Elena Rostova");
  const [shippingEmail, setShippingEmail] = useState("elena.rostova@atelierkronos.com");
  const [shippingAddress, setShippingAddress] = useState("48 Rue du Faubourg Saint-Honoré");
  const [shippingCity, setShippingCity] = useState("Paris");
  const [shippingZip, setShippingZip] = useState("75008");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("11/29");
  const [cardCvv, setCardCvv] = useState("734");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const products: Product[] = [
    {
      id: "prod-1",
      name: "Atelier Carbon Storm Anorak",
      category: "outerwear",
      priceUSD: 620,
      originalPriceUSD: 750,
      tag: "Capsule Core",
      subtitle: "Laser-welded Japanese technical membrane",
      description: "Ultralight aerodynamic technical shell woven with carbon-reinforced waterproof ripstop.",
      longDescription: "Engineered for harsh maritime weather and urban winter squalls. Features magnetic storm cuffs, laser-welded ventilation gills, and a hydrophobic silicone barrier tested up to 25,000mm hydrostatic head.",
      rating: 4.9,
      reviewsCount: 142,
      bgGradient: "from-stone-800 via-stone-900 to-black",
      material: "3-Layer GORE-TEX Pro & Recycled Carbon Strand",
      origin: "Kobe, Japan",
      specs: ["25,000mm Waterproof", "Carbon Weave", "Magnetic Zippers", "Reflective 3M Accents"],
      sizes: ["XS", "S", "M", "L", "XL"],
      inStock: 5,
    },
    {
      id: "prod-2",
      name: "Monolith Titanium Carabiner Pack",
      category: "hardware",
      priceUSD: 145,
      tag: "Artisan Forge",
      subtitle: "Grade-5 aerospace billet titanium",
      description: "CNC machined monolithic titanium carabiner with knurled twist-lock safety collar.",
      longDescription: "Precision milled from a single block of aerospace-grade titanium alloy Ti-6Al-4V. Hand-finished with an acid-stone wash that resists saltwater oxidation and abrasive wear indefinitely.",
      rating: 5.0,
      reviewsCount: 88,
      bgGradient: "from-zinc-700 via-zinc-800 to-zinc-950",
      material: "Ti-6Al-4V Grade 5 Titanium",
      origin: "Stockholm, Sweden",
      specs: ["24kN Gate Rating", "Ultra-Lightweight (38g)", "Non-Magnetic", "Lifetime Guarantee"],
      sizes: ["One Size"],
      inStock: 14,
    },
    {
      id: "prod-3",
      name: "Strata Minimalist Trail Runner",
      category: "footwear",
      priceUSD: 310,
      originalPriceUSD: 360,
      tag: "Low Stock",
      subtitle: "Vibram Megagrip lugged sole with Kevlar knit",
      description: "Engineered trail silhouette pairing bio-based Dyneema seamless upper with high-traction chassis.",
      longDescription: "The intersection of mountain performance and architectural minimalism. Features a dual-density supercritical EVA midsole, speed-lace cable cinch, and zero unnecessary decorative overlays.",
      rating: 4.8,
      reviewsCount: 64,
      bgGradient: "from-amber-900/60 via-stone-900 to-black",
      material: "Dyneema Monofilament & Vibram Megagrip",
      origin: "Montebelluna, Italy",
      specs: ["Vibram Megagrip 4mm Lugs", "Dyneema Seamless Upper", "Quick-Cinch System", "240g Per Shoe"],
      sizes: ["39", "40", "41", "42", "43", "44", "45"],
      inStock: 3,
    },
    {
      id: "prod-4",
      name: "Sculpted Cashmere Balaclava",
      category: "outerwear",
      priceUSD: 195,
      tag: "Winter Atelier",
      subtitle: "100% Grade-A Mongolian cashmere",
      description: "Seamless 7-gauge rib knit balaclava designed for insulating warmth and architectural drape.",
      longDescription: "Spun from ethically sourced Mongolian mountain cashmere. Designed to be worn as a full hood during alpine travel or pulled down into a sculptural slouch collar in city commutes.",
      rating: 4.9,
      reviewsCount: 52,
      bgGradient: "from-stone-700 via-neutral-900 to-black",
      material: "100% Mongolian Raw Cashmere",
      origin: "Biella, Italy",
      specs: ["7-Gauge Heavy Rib", "Seamless 3D Tubular Knit", "Hydrophobic Wash", "Unisex Ergonomic Fit"],
      sizes: ["S/M", "L/XL"],
      inStock: 9,
    },
    {
      id: "prod-5",
      name: "Vessel Minimalist Modular Tote",
      category: "hardware",
      priceUSD: 380,
      tag: "New Arrival",
      subtitle: "Cordura 500D Ballistic with Cobra Buckles",
      description: "Weatherproof modular carryall with padded 16\" laptop hammock and Fidlock magnetic attachments.",
      longDescription: "Constructed from military-specification waterproof Cordura nylon. Equipped with Austrian AustriAlpin Cobra quick-release aluminum buckles and a hidden passport slip pocket.",
      rating: 4.7,
      reviewsCount: 41,
      bgGradient: "from-emerald-950/40 via-stone-900 to-black",
      material: "Cordura 500D & Fidlock V-Buckles",
      origin: "Kyoto, Japan",
      specs: ["28L Expandable Volume", "16\" Suspended Laptop Sleeve", "Waterproof YKK Aquaguard", "Modular MOLLE System"],
      sizes: ["One Size"],
      inStock: 7,
    },
    {
      id: "prod-6",
      name: "Kuro Obsidian Incense Chamber",
      category: "objects",
      priceUSD: 240,
      tag: "Object d'Art",
      subtitle: "Hand-carved volcanic basalt & brass",
      description: "Monolithic incense burner sculpted from raw volcanic basalt stone with solid turned brass lid.",
      longDescription: "Each piece is hand-hewn from volcanic basalt quarries in Nagano. Features precision micro-drilled smoke dissipation channels that allow aromatic ribbons to coil gracefully in tranquil currents.",
      rating: 5.0,
      reviewsCount: 29,
      bgGradient: "from-stone-900 via-stone-950 to-black",
      material: "Natural Volcanic Basalt & Solid Raw Brass",
      origin: "Nagano, Japan",
      specs: ["Hand-Carved Basalt", "Solid Brass Diffuser Ring", "Weight: 1.8kg", "Includes 30 Cedar Cones"],
      sizes: ["One Size"],
      inStock: 6,
    },
  ];

  const convertPrice = (usd: number): string => {
    const cur = CURRENCIES[activeCurrency];
    const val = usd * cur.rate;
    if (activeCurrency === "JPY") {
      return `${cur.symbol}${Math.round(val).toLocaleString()}`;
    }
    return `${cur.symbol}${val.toFixed(0)}`;
  };

  const filteredProducts = products
    .filter((p) => {
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.material.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.priceUSD - b.priceUSD;
      if (sortBy === "price-desc") return b.priceUSD - a.priceUSD;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const addToCart = (product: Product, size: string = "M", quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, size }];
    });
    showToast(`Added ${product.name} (${size}) to your bag.`);
  };

  const updateCartQty = (id: string, size: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; quantity: number; size: string }[]
    );
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Removed from wishlist.");
      } else {
        next.add(id);
        showToast("Saved to wishlist.");
      }
      return next;
    });
  };

  const rawSubtotalUSD = cart.reduce((sum, item) => sum + item.product.priceUSD * item.quantity, 0);
  const discountUSD = couponApplied ? rawSubtotalUSD * 0.2 : 0;
  const shippingUSD = rawSubtotalUSD > 250 || cart.length === 0 ? 0 : 25;
  const finalTotalUSD = rawSubtotalUSD - discountUSD + shippingUSD;
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThresholdUSD = 250;
  const freeShippingRemaining = Math.max(0, freeShippingThresholdUSD - rawSubtotalUSD);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "WELCOME20") {
      setCouponApplied(true);
      showToast("20% Atelier discount applied!");
    } else {
      showToast("Invalid code. Try code: WELCOME20");
    }
  };

  const handleProcessCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    try {
      const paymentResult = await processPayment({
        cardNumber,
        cardHolder: shippingName,
        expiry: cardExpiry,
        cvv: cardCvv,
        amount: finalTotalUSD,
        currency: activeCurrency,
        description: `Atelier Kronos Order (${totalItemCount} items)`,
        customerEmail: shippingEmail,
      });

      await sendEmail({
        to: shippingEmail,
        subject: `Atelier Kronos Order Dispatch Confirmed: #${paymentResult.chargeId.slice(-6).toUpperCase()}`,
        template: "order_confirmation",
        data: {
          customerName: shippingName,
          shippingAddress: `${shippingAddress}, ${shippingCity} ${shippingZip}`,
          amountPaid: convertPrice(finalTotalUSD),
          chargeId: paymentResult.chargeId,
          last4: paymentResult.last4,
          items: cart.map((i) => `${i.product.name} (${i.size}) x${i.quantity} — ${convertPrice(i.product.priceUSD * i.quantity)}`),
        },
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C5A880", "#1C1917", "#78716C", "#E8E3D9"],
      });

      setCompletedOrder({
        chargeId: paymentResult.chargeId,
        totalUSD: finalTotalUSD,
        itemsCount: totalItemCount,
        email: shippingEmail,
        isMock: paymentResult.isMock,
      });

      setIsProcessingPayment(false);
      setCheckoutStep("success");
      setCart([]);
    } catch (err: any) {
      setIsProcessingPayment(false);
      alert(err.message || "Payment authorization failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] font-sans selection:bg-[#C5A880]/30 selection:text-[#1C1917]">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1C1917] text-[#FBF9F5] px-5 py-2.5 rounded-full text-xs font-mono tracking-wider shadow-2xl flex items-center gap-2 border border-stone-700"
          >
            <Sparkles size={13} className="text-[#C5A880]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editorial Announcement Bar */}
      <div className="bg-[#1C1917] text-[#E8E3D9] text-[11px] font-mono tracking-widest px-4 sm:px-8 py-2.5 flex items-center justify-between border-b border-stone-800">
        <div className="hidden sm:flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span>AUTUMN ATELIER 2026 // MONOLITH COLLECTION</span>
        </div>
        <div className="text-center flex-1 sm:flex-initial">
          <span>COMPLIMENTARY WORLDWIDE COURIER OVER $250 · CODE: <strong className="text-[#C5A880]">WELCOME20</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <Globe size={12} className="text-[#C5A880]" />
          <div className="flex items-center gap-1.5">
            {(Object.keys(CURRENCIES) as CurrencyKey[]).map((cur) => (
              <button
                key={cur}
                onClick={() => setActiveCurrency(cur)}
                className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${
                  activeCurrency === cur
                    ? "bg-[#C5A880] text-[#1C1917] font-bold"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Boutique Header */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E3D9] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-baseline gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl tracking-tight text-[#1C1917] font-normal italic">
              Atelier Kronos
            </h1>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#78716C] hidden md:inline">
              Est. 2026
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
            <div className="relative w-full">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive, garments, materials..."
                className="w-full bg-[#F3EFE6] text-xs text-[#1C1917] placeholder:text-stone-400 pl-9 pr-4 py-2 rounded-full border border-stone-200 focus:outline-none focus:border-[#C5A880] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 rounded-full hover:bg-[#F3EFE6] text-stone-700 transition-colors"
              title="Saved Wishlist"
            >
              <Heart size={18} className={wishlist.size > 0 ? "fill-[#BF573F] text-[#BF573F]" : ""} />
              {wishlist.size > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#BF573F] text-white text-[9px] flex items-center justify-center font-mono">
                  {wishlist.size}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1C1917] hover:bg-stone-800 text-[#FBF9F5] text-xs font-mono tracking-wider transition-all shadow-sm active:scale-95"
            >
              <ShoppingBag size={14} className="text-[#C5A880]" />
              <span className="font-semibold">Bag</span>
              <span className="px-1.5 py-0.2 rounded-full bg-[#C5A880] text-[#1C1917] text-[10px] font-bold">
                {totalItemCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Lookbook Hero */}
      <section className="border-b border-[#E8E3D9] overflow-hidden bg-gradient-to-b from-[#F5F1E8] to-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#78716C] uppercase bg-[#EAE5DB] px-3 py-1 rounded-full border border-stone-300">
              <span>Lookbook Edition 04</span>
              <span className="text-[#C5A880]">•</span>
              <span>Sub-Zero Ergonomics</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-[#1C1917]">
              Sculpted Form & <br />
              <span className="italic font-normal text-stone-600">Monolithic Utility.</span>
            </h2>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed max-w-xl font-light">
              Crafted in collaboration with Japanese carbon weavers and Alpine mountain guides. Every seam is laser-welded with hydrophobic precision, stripping away excess to expose pure structural function.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("catalog-grid");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3.5 rounded-full bg-[#1C1917] text-[#FBF9F5] hover:bg-stone-800 text-xs font-mono tracking-wider flex items-center gap-3 transition-transform active:scale-95 shadow-md"
              >
                <span>View Autumn Catalog</span>
                <ArrowRight size={14} className="text-[#C5A880]" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-stone-500 px-3 py-2 border-l border-stone-300">
                <Tag size={13} className="text-[#C5A880]" />
                <span>20% off with promo code <strong>WELCOME20</strong></span>
              </div>
            </div>
          </div>

          {/* Right Lookbook Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-gradient-to-br from-[#1C1917] to-stone-900 text-stone-100 p-8 shadow-2xl border border-stone-800 overflow-hidden group">
              <div className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/10 text-[#C5A880]">
                Featured Capsule
              </div>

              {/* Minimalist Graphic Representation */}
              <div className="h-64 sm:h-72 w-full rounded-xl bg-gradient-to-tr from-stone-800/80 to-stone-950 flex flex-col justify-center items-center relative overflow-hidden my-4 border border-stone-700/50">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.15),transparent_70%)]" />
                <div className="relative text-center p-6 space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] mb-3">
                    <Compass size={28} />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#C5A880] uppercase">
                    Ref. No. AT-094
                  </span>
                  <h3 className="font-serif text-2xl font-light text-white">
                    Carbon Storm Anorak
                  </h3>
                  <p className="text-xs text-stone-400 font-mono">
                    25,000mm Hydrostatic · Kobe Japan
                  </p>
                </div>

                {/* Hotspot Button */}
                <button
                  onClick={() => addToCart(products[0], "M")}
                  className="absolute bottom-4 right-4 px-4 py-2 rounded-full bg-[#C5A880] hover:bg-[#d6ba94] text-stone-950 text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 transition-transform active:scale-95 shadow-lg"
                >
                  <Plus size={12} />
                  <span>Quick Add · {convertPrice(products[0].priceUSD)}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-400 font-mono pt-2 border-t border-stone-800">
                <span>Material: 3-Layer GORE-TEX Pro</span>
                <span className="text-[#C5A880]">Stock: 5 left</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog View */}
      <section id="catalog-grid" className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        {/* Filter & Viewport Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8E3D9] mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: "all", label: "All Items" },
              { id: "outerwear", label: "Outerwear" },
              { id: "hardware", label: "Hardware" },
              { id: "footwear", label: "Footwear" },
              { id: "objects", label: "Objects" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-[#1C1917] text-[#FBF9F5] shadow-sm font-semibold"
                    : "bg-[#F3EFE6] text-stone-600 hover:text-stone-900 hover:bg-[#EAE5DB]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort & Grid Layout */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-stone-600">
              <SlidersHorizontal size={14} />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#F3EFE6] border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 focus:outline-none focus:border-[#C5A880]"
              >
                <option value="featured">Featured Archive</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-1 border-l border-stone-300 pl-4">
              <button
                onClick={() => setGridColumns(2)}
                className={`p-1.5 rounded transition-colors ${
                  gridColumns === 2 ? "bg-[#1C1917] text-white" : "text-stone-400 hover:text-stone-700"
                }`}
                title="2-Column Editorial View"
              >
                <Columns size={15} />
              </button>
              <button
                onClick={() => setGridColumns(3)}
                className={`p-1.5 rounded transition-colors ${
                  gridColumns === 3 ? "bg-[#1C1917] text-white" : "text-stone-400 hover:text-stone-700"
                }`}
                title="3-Column Balanced View"
              >
                <LayoutGrid size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#F3EFE6] rounded-2xl border border-[#E8E3D9]">
            <p className="font-serif text-xl text-stone-600 italic">No pieces found matching your filter.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#1C1917] text-white text-xs font-mono"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              gridColumns === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredProducts.map((prod) => {
              const isWishlisted = wishlist.has(prod.id);
              return (
                <div
                  key={prod.id}
                  className="group bg-white rounded-2xl border border-[#EAE5DB] hover:border-stone-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image Presentation Box */}
                  <div className="relative aspect-[4/3] bg-[#F5F2EB] flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Tag badge */}
                    {prod.tag && (
                      <span className="absolute top-4 left-4 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#1C1917] text-[#FBF9F5]">
                        {prod.tag}
                      </span>
                    )}

                    {/* Wishlist toggle */}
                    <button
                      onClick={() => toggleWishlist(prod.id)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur hover:bg-white text-stone-700 shadow-sm transition-transform active:scale-90"
                    >
                      <Heart
                        size={15}
                        className={isWishlisted ? "fill-[#BF573F] text-[#BF573F]" : ""}
                      />
                    </button>

                    {/* Graphical Product Presentation */}
                    <div className="text-center space-y-2 transform group-hover:scale-105 transition-transform duration-500">
                      <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-stone-800 to-black text-[#C5A880] flex items-center justify-center shadow-lg border border-stone-700">
                        <ShoppingBag size={32} />
                      </div>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-stone-500">
                        {prod.origin}
                      </p>
                    </div>

                    {/* Hover Quick Size Bar */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-1.5 bg-[#1C1917]/95 backdrop-blur-md p-2 rounded-xl text-white">
                      <span className="text-[10px] font-mono text-stone-400 mr-1">Quick Size:</span>
                      {prod.sizes.slice(0, 4).map((s) => (
                        <button
                          key={s}
                          onClick={() => addToCart(prod, s)}
                          className="px-2 py-1 rounded bg-white/10 hover:bg-[#C5A880] hover:text-[#1C1917] text-[10px] font-mono font-bold transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mb-1">
                        <span>{prod.category.toUpperCase()}</span>
                        <div className="flex items-center gap-1 text-[#C5A880]">
                          <Star size={12} className="fill-[#C5A880]" />
                          <span>{prod.rating.toFixed(1)}</span>
                          <span className="text-stone-400">({prod.reviewsCount})</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => setSelectedProduct(prod)}
                        className="font-serif text-lg font-medium text-[#1C1917] hover:text-[#C5A880] cursor-pointer transition-colors"
                      >
                        {prod.name}
                      </h3>

                      <p className="text-xs text-stone-500 mt-1 line-clamp-2 font-light">
                        {prod.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#F0EBE0] flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono font-bold text-base text-[#1C1917]">
                          {convertPrice(prod.priceUSD)}
                        </span>
                        {prod.originalPriceUSD && (
                          <span className="text-xs font-mono text-stone-400 line-through">
                            {convertPrice(prod.originalPriceUSD)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setSelectedProduct(prod)}
                        className="p-2 rounded-full hover:bg-[#F3EFE6] text-stone-600 transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Slide-out Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#E8E3D9]"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#E8E3D9] flex items-center justify-between bg-[#F5F1E8]">
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-[#C5A880]" />
                  <h3 className="font-serif text-xl text-[#1C1917]">Shopping Bag</h3>
                  <span className="text-xs font-mono text-stone-500">({totalItemCount} items)</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Free Courier Bar */}
              <div className="px-6 py-3 bg-[#EAE5DB] text-[11px] font-mono text-stone-700">
                {freeShippingRemaining > 0 ? (
                  <div>
                    <span>Add <strong>{convertPrice(freeShippingRemaining)}</strong> more for complimentary courier.</span>
                    <div className="w-full bg-stone-300 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[#C5A880] h-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (rawSubtotalUSD / freeShippingThresholdUSD) * 100)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle2 size={13} />
                    <span>Complimentary Express Courier Unlocked</span>
                  </div>
                )}
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-24 space-y-3">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#EAE5DB] flex items-center justify-center text-stone-500">
                      <ShoppingBag size={20} />
                    </div>
                    <p className="font-serif text-stone-600 italic">Your bag is currently empty.</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs font-mono text-[#C5A880] underline hover:text-stone-900"
                    >
                      Explore Curated Collection
                    </button>
                  </div>
                ) : (
                  cart.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.size}-${idx}`}
                      className="p-4 rounded-xl bg-white border border-[#E8E3D9] flex gap-4"
                    >
                      <div className="w-16 h-16 rounded-lg bg-[#F5F1E8] flex items-center justify-center text-stone-600 font-mono text-xs font-bold border border-stone-200">
                        {item.size}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-sm text-[#1C1917] font-medium leading-tight">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => updateCartQty(item.product.id, item.size, -item.quantity)}
                            className="text-stone-400 hover:text-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <p className="text-[11px] font-mono text-stone-500 mt-0.5">
                          Size: {item.size} · {convertPrice(item.product.priceUSD)}
                        </p>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden bg-[#FBF9F5]">
                            <button
                              onClick={() => updateCartQty(item.product.id, item.size, -1)}
                              className="px-2 py-1 text-stone-600 hover:bg-stone-200"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="px-2 font-mono text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateCartQty(item.product.id, item.size, 1)}
                              className="px-2 py-1 text-stone-600 hover:bg-stone-200"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          <span className="font-mono font-bold text-xs text-[#1C1917]">
                            {convertPrice(item.product.priceUSD * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer / Checkout CTA */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#E8E3D9] bg-[#F5F1E8] space-y-4">
                  {/* Coupon Field */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="Promo Code (WELCOME20)"
                      className="flex-1 px-3 py-2 bg-white border border-stone-300 rounded-lg text-xs font-mono uppercase focus:outline-none focus:border-[#C5A880]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-[#1C1917] text-white rounded-lg text-xs font-mono"
                    >
                      Apply
                    </button>
                  </form>

                  <div className="space-y-1.5 text-xs font-mono text-stone-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{convertPrice(rawSubtotalUSD)}</span>
                    </div>
                    {couponApplied && (
                      <div className="flex justify-between text-emerald-700">
                        <span>20% Welcome Code</span>
                        <span>-{convertPrice(discountUSD)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Courier Shipping</span>
                      <span>{shippingUSD === 0 ? "FREE" : convertPrice(shippingUSD)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-sm text-[#1C1917] pt-2 border-t border-stone-300">
                      <span>Estimated Total</span>
                      <span>{convertPrice(finalTotalUSD)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                      setCheckoutStep("shipping");
                    }}
                    className="w-full py-3.5 rounded-full bg-[#1C1917] hover:bg-stone-800 text-[#FBF9F5] text-xs font-mono tracking-wider font-semibold transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
                  >
                    <Lock size={14} className="text-[#C5A880]" />
                    <span>Proceed to Secure Checkout</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-3xl bg-[#FBF9F5] rounded-2xl shadow-2xl overflow-hidden border border-[#E8E3D9] z-10 max-h-[90vh] flex flex-col md:flex-row"
            >
              {/* Left Image / Aesthetic */}
              <div className="md:w-1/2 bg-[#1C1917] p-8 text-stone-100 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] px-2.5 py-1 rounded bg-white/10">
                    {selectedProduct.category}
                  </span>
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className="p-2 rounded-full bg-white/10 text-stone-200 hover:text-white"
                  >
                    <Heart
                      size={16}
                      className={wishlist.has(selectedProduct.id) ? "fill-[#BF573F] text-[#BF573F]" : ""}
                    />
                  </button>
                </div>

                <div className="py-12 text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-stone-800 to-black border border-stone-700 flex items-center justify-center text-[#C5A880] shadow-2xl">
                    <ShoppingBag size={40} />
                  </div>
                  <h4 className="font-serif text-2xl font-light text-white">
                    {selectedProduct.name}
                  </h4>
                  <p className="text-xs font-mono text-[#C5A880]">
                    Origin: {selectedProduct.origin}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-stone-400 space-y-1">
                  <p>Material: {selectedProduct.material}</p>
                  <p>Availability: {selectedProduct.inStock} pieces remaining</p>
                </div>
              </div>

              {/* Right Information & Buy Section */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-2xl text-[#1C1917] font-semibold">
                        {selectedProduct.name}
                      </h3>
                      <p className="text-sm font-mono text-[#C5A880] font-bold mt-1">
                        {convertPrice(selectedProduct.priceUSD)}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="p-1 rounded-full text-stone-400 hover:text-stone-800"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {selectedProduct.longDescription}
                  </p>

                  {/* Specs List */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-2">
                      Technical Highlights
                    </span>
                    <ul className="grid grid-cols-2 gap-2 text-xs font-mono text-stone-700">
                      {selectedProduct.specs.map((s) => (
                        <li key={s} className="flex items-center gap-1.5">
                          <Check size={12} className="text-[#C5A880]" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Size Selector */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 block mb-2">
                      Select Size
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setProductModalSize(sz)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                            productModalSize === sz
                              ? "bg-[#1C1917] text-white"
                              : "bg-[#F3EFE6] text-stone-700 hover:bg-stone-300"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E3D9] flex gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct, productModalSize);
                      setSelectedProduct(null);
                      setIsCartOpen(true);
                    }}
                    className="flex-1 py-3.5 rounded-full bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-mono tracking-wider font-semibold shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} className="text-[#C5A880]" />
                    <span>Add to Bag · {convertPrice(selectedProduct.priceUSD)}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Full-Fledged Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => checkoutStep !== "payment" && setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#FBF9F5] rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#E8E3D9] z-10 max-h-[92vh] overflow-y-auto"
            >
              {/* Checkout Steps Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E3D9] mb-6">
                <div>
                  <h3 className="font-serif text-2xl text-[#1C1917]">Atelier Checkout</h3>
                  <p className="text-xs font-mono text-stone-500 mt-0.5">
                    Order Total: <strong className="text-stone-900">{convertPrice(finalTotalUSD)}</strong>
                  </p>
                </div>
                {checkoutStep !== "success" && (
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-800"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>

              {/* Step 1: Shipping Form */}
              {checkoutStep === "shipping" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C5A880] mb-2 font-bold">
                    <Truck size={14} />
                    <span>Step 1: Delivery Destination</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-600 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-800 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-600 mb-1">Email For Receipt</label>
                      <input
                        type="email"
                        value={shippingEmail}
                        onChange={(e) => setShippingEmail(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-800 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-600 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-800 focus:outline-none focus:border-[#C5A880]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-600 mb-1">City</label>
                      <input
                        type="text"
                        value={shippingCity}
                        onChange={(e) => setShippingCity(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-800 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-600 mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={shippingZip}
                        onChange={(e) => setShippingZip(e.target.value)}
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-800 focus:outline-none focus:border-[#C5A880]"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep("payment")}
                    className="w-full mt-4 py-3.5 rounded-full bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-mono tracking-wider font-semibold transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight size={14} className="text-[#C5A880]" />
                  </button>
                </div>
              )}

              {/* Step 2: Payment Form */}
              {checkoutStep === "payment" && (
                <form onSubmit={handleProcessCheckout} className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#C5A880] font-bold">
                      <CreditCard size={14} />
                      <span>Step 2: Payment Authorization</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("shipping")}
                      className="text-xs font-mono text-stone-500 hover:text-stone-900 underline"
                    >
                      Back
                    </button>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-stone-600 mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 •••• •••• 4242"
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-800 focus:outline-none focus:border-[#C5A880]"
                        required
                      />
                      <Lock size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-stone-600 mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-800 focus:outline-none focus:border-[#C5A880]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-stone-600 mb-1">CVC / CVV</label>
                      <input
                        type="text"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="734"
                        className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs font-mono text-stone-800 focus:outline-none focus:border-[#C5A880]"
                        required
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-[#EAE5DB] rounded-lg text-[11px] font-mono text-stone-600 space-y-1 border border-stone-300">
                    <p className="font-bold text-stone-800">⚡ Turnkey Payment Gateway Active</p>
                    <p>Processed securely via Stripe mock/live integration with instant email dispatch.</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="w-full mt-4 py-3.5 rounded-full bg-[#1C1917] hover:bg-stone-800 text-white text-xs font-mono tracking-wider font-semibold transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessingPayment ? (
                      <span>Authorizing Payment...</span>
                    ) : (
                      <>
                        <Lock size={14} className="text-[#C5A880]" />
                        <span>Pay {convertPrice(finalTotalUSD)} & Confirm Order</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Step 3: Success Confirmation */}
              {checkoutStep === "success" && completedOrder && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>

                  <h4 className="font-serif text-2xl text-[#1C1917]">
                    Commande Confirmée
                  </h4>

                  <p className="text-xs font-mono text-stone-600 max-w-sm mx-auto">
                    Your bespoke items have entered preparation at our Paris studio. A receipt has been dispatched to{" "}
                    <strong>{completedOrder.email}</strong>.
                  </p>

                  <div className="bg-[#EAE5DB] p-4 rounded-xl text-left text-xs font-mono text-stone-700 space-y-1 border border-stone-300">
                    <p className="flex justify-between">
                      <span className="text-stone-500">Transaction Ref:</span>
                      <strong className="text-stone-900">{completedOrder.chargeId}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-stone-500">Amount Authorized:</span>
                      <strong className="text-stone-900">{convertPrice(completedOrder.totalUSD)}</strong>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-stone-500">Dispatch Status:</span>
                      <span className="text-emerald-700 font-bold">Preparation in Atelier</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsCheckoutOpen(false);
                      setCheckoutStep("shipping");
                    }}
                    className="px-6 py-3 rounded-full bg-[#1C1917] text-white text-xs font-mono tracking-wider"
                  >
                    Return to Atelier Store
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
