import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Spotlight,
  ThreeDCard,
  CardContainer,
  CardBody,
  CardItem,
  MovingBorderButton,
  InfiniteMovingCards,
  Magnetic,
  GlassCard,
  GlowingBadge,
  TextReveal,
} from "../../components";
import { formatCurrency } from "../../lib/utils";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: string;
  name: string;
  category: "outerwear" | "hardware" | "footwear";
  price: number;
  originalPrice?: number;
  tag?: string;
  description: string;
  rating: number;
  reviewsCount: number;
  imageGradient: string;
  specs: string[];
}

export const EcommerceDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const products: Product[] = [
    {
      id: "prod-1",
      name: "Aerovane Carbon Shell",
      category: "outerwear",
      price: 480,
      originalPrice: 550,
      tag: "Best Seller",
      description: "Ultralight aerodynamic technical shell woven with carbon-reinforced waterproof ripstop.",
      rating: 4.9,
      reviewsCount: 142,
      imageGradient: "from-amber-500/20 via-zinc-800 to-black",
      specs: ["20,000mm Waterproof", "Carbon Weave", "Magnetic Zippers"],
    },
    {
      id: "prod-2",
      name: "Chrono Kinetic Timepiece",
      category: "hardware",
      price: 890,
      tag: "Limited Batch",
      description: "Titanium grade 5 case with automatic mechanical movement and anti-reflective sapphire crystal.",
      rating: 5.0,
      reviewsCount: 88,
      imageGradient: "from-indigo-600/20 via-zinc-800 to-black",
      specs: ["Grade 5 Titanium", "100m Water Resistance", "Swiss Movement"],
    },
    {
      id: "prod-3",
      name: "Vektor Minimalist Low",
      category: "footwear",
      price: 260,
      description: "Ergonomic barefoot silhouette constructed from Italian calfskin with carbon stability plates.",
      rating: 4.8,
      reviewsCount: 95,
      imageGradient: "from-emerald-500/20 via-zinc-800 to-black",
      specs: ["Full Grain Leather", "Carbon Arch Shank", "Vibram Outsole"],
    },
    {
      id: "prod-4",
      name: "Apex Thermal Modular Vest",
      category: "outerwear",
      price: 320,
      originalPrice: 380,
      description: "Graphene-infused heat-retaining midlayer with modular magnetic cargo compartments.",
      rating: 4.7,
      reviewsCount: 63,
      imageGradient: "from-rose-500/20 via-zinc-800 to-black",
      specs: ["Graphene Membrane", "Modular Fidlock", "Thermal Cell"],
    },
    {
      id: "prod-5",
      name: "Spectre Polarized Optic",
      category: "hardware",
      price: 240,
      tag: "New",
      description: "Laser-cut magnesium sunglasses with photochromic UV-reactive scratch-resistant lenses.",
      rating: 4.9,
      reviewsCount: 51,
      imageGradient: "from-cyan-500/20 via-zinc-800 to-black",
      specs: ["Magnesium Frame", "100% UV400", "Ultra-feather 18g"],
    },
    {
      id: "prod-6",
      name: "Nomad Roll-Top Commuter",
      category: "hardware",
      price: 290,
      description: "Weatherproof 28L technical commuter pack with padded laptop cocoon and quick-draw side harness.",
      rating: 4.8,
      reviewsCount: 110,
      imageGradient: "from-amber-600/20 via-zinc-800 to-black",
      specs: ["X-Pac Sailcloth", "Waterproof YKK", "Fidlock Closure"],
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as { product: Product; quantity: number }[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== id));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = couponApplied ? cartTotal * 0.2 : 0;
  const finalTotal = cartTotal - discount;
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "WELCOME20") {
      setCouponApplied(true);
    }
  };

  const handleCheckout = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    setOrderComplete(true);
    setTimeout(() => {
      setCart([]);
      setOrderComplete(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white">
      {/* Sticky Cart Action Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <Magnetic strength={0.3}>
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-2xl shadow-amber-500/30 transition-transform active:scale-95"
          >
            <ShoppingBag size={18} />
            <span>Bag</span>
            {totalItemCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-zinc-950 text-amber-400 text-xs flex items-center justify-center font-mono">
                {totalItemCount}
              </span>
            )}
          </button>
        </Magnetic>
      </div>

      {/* Hero Banner */}
      <section className="relative py-20 px-6 text-center border-b border-white/10 bg-gradient-to-b from-zinc-900/60 to-zinc-950/90 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.12),transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <GlowingBadge variant="amber">2026 CAPSULE COLLECTION</GlowingBadge>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight">
            Engineered Gear for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              <TextReveal text="Next Century." />
            </span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Technical garments and precision hardware developed with aerodynamic materials and zero compromise.
          </p>

          <div className="pt-2 flex justify-center">
            <span className="text-xs font-mono text-zinc-500 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              Use code <strong className="text-amber-400">WELCOME20</strong> for 20% off your initial order
            </span>
          </div>
        </div>
      </section>

      {/* Store Catalog */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            {[
              { id: "all", label: "All Products" },
              { id: "outerwear", label: "Outerwear" },
              { id: "hardware", label: "Hardware" },
              { id: "footwear", label: "Footwear" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-zinc-400 font-mono">
            Displaying {filteredProducts.length} items
          </div>
        </div>

        {/* Product Grid with Spotlight & 3D Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Spotlight key={product.id} className="p-6 h-full flex flex-col justify-between group">
              <div>
                {/* Header tags */}
                <div className="flex justify-between items-center mb-4">
                  {product.tag ? (
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {product.tag}
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-zinc-500 capitalize">
                      {product.category}
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <Star size={13} fill="currentColor" />
                    <span>{product.rating}</span>
                    <span className="text-zinc-500">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Product simulated visual canvas */}
                <div className={`h-48 w-full rounded-xl bg-gradient-to-tr ${product.imageGradient} border border-white/10 flex items-center justify-center p-6 relative overflow-hidden mb-6 group-hover:scale-[1.02] transition-transform`}>
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center text-white/80 backdrop-blur-md shadow-xl">
                    <ShoppingBag size={28} />
                  </div>
                  <div className="absolute top-3 right-3">
                    <button className="p-2 rounded-full bg-black/40 hover:bg-black/80 text-zinc-400 hover:text-rose-400 transition-colors">
                      <Heart size={14} />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-bold font-display text-white mb-1.5 group-hover:text-amber-200 transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Spec tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {product.specs.map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 font-mono"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price and Add button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold font-display text-white">
                    {formatCurrency(product.price)}
                  </div>
                  {product.originalPrice && (
                    <div className="text-xs text-zinc-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </div>
                  )}
                </div>

                <Magnetic strength={0.2}>
                  <button
                    onClick={() => addToCart(product)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-amber-500 hover:text-zinc-950 text-white font-semibold text-xs border border-white/15 transition-all"
                  >
                    <Plus size={14} />
                    <span>Add to Bag</span>
                  </button>
                </Magnetic>
              </div>
            </Spotlight>
          ))}
        </div>
      </section>

      {/* Brand Value Pillars */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-8">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Truck size={20} />
            </div>
            <h4 className="font-bold text-base text-white mb-2">Global Express Dispatch</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Complimentary expedited air shipping on orders above $300 with real-time satellite tracking.
            </p>
          </GlassCard>

          <GlassCard className="p-8">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-bold text-base text-white mb-2">Lifetime Craft Warranty</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every seam, zipper, and titanium component is guaranteed against structural failure indefinitely.
            </p>
          </GlassCard>

          <GlassCard className="p-8">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <RotateCcw size={20} />
            </div>
            <h4 className="font-bold text-base text-white mb-2">30-Day Frictionless Trial</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Put any piece through harsh weather. Return within 30 days for a full refund if not completely satisfied.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Slide-out Shopping Bag Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-y-0 right-0 max-w-full flex pl-10"
            >
              <div className="w-screen max-w-md bg-zinc-950 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={20} className="text-amber-400" />
                      <h3 className="font-bold font-display text-lg text-white">
                        Your Bag ({totalItemCount})
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                      aria-label="Close bag"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Cart Item List */}
                  <div className="mt-6 space-y-4 max-h-[50vh] overflow-y-auto pr-1">
                    {cart.length === 0 ? (
                      <div className="py-12 text-center space-y-3">
                        <div className="w-12 h-12 mx-auto rounded-full bg-white/5 flex items-center justify-center text-zinc-500">
                          <ShoppingBag size={20} />
                        </div>
                        <p className="text-sm text-zinc-400">Your bag is empty.</p>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/5"
                        >
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-white">
                              {item.product.name}
                            </h4>
                            <div className="text-xs text-amber-400 font-mono">
                              {formatCurrency(item.product.price)} each
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 bg-black/40 rounded-lg p-1 border border-white/10">
                              <button
                                onClick={() => updateQuantity(item.product.id, -1)}
                                className="p-1 hover:text-amber-400"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-mono px-1.5">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, 1)}
                                className="p-1 hover:text-amber-400"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-zinc-500 hover:text-rose-400 p-1"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Footer and Totals */}
                {cart.length > 0 && (
                  <div className="pt-6 border-t border-white/10 space-y-4">
                    {/* Promo Code Form */}
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Discount code (try WELCOME20)"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
                      >
                        Apply
                      </button>
                    </form>

                    {couponApplied && (
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                        <Check size={12} />
                        <span>20% discount applied!</span>
                      </div>
                    )}

                    {/* Breakdown */}
                    <div className="space-y-1.5 text-xs text-zinc-400">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatCurrency(cartTotal)}</span>
                      </div>
                      {couponApplied && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Discount (20%)</span>
                          <span>-{formatCurrency(discount)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Worldwide Shipping</span>
                        <span className="text-emerald-400 font-mono">FREE</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                        <span>Total</span>
                        <span className="text-amber-400 font-mono">
                          {formatCurrency(finalTotal)}
                        </span>
                      </div>
                    </div>

                    {orderComplete ? (
                      <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-center space-y-1">
                        <div className="flex items-center justify-center gap-1.5 text-emerald-300 font-bold text-sm">
                          <Sparkles size={16} />
                          <span>Order Confirmed!</span>
                        </div>
                        <p className="text-xs text-emerald-400/80">
                          Dispatch notification dispatched to your email.
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={handleCheckout}
                        className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-transform active:scale-95"
                      >
                        Checkout Now · {formatCurrency(finalTotal)}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EcommerceDemo;
