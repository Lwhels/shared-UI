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
  longDescription: string;
  rating: number;
  reviewsCount: number;
  imageGradient: string;
  specs: string[];
  sizes: string[];
  inStock: number;
}

export const EcommerceDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<{ product: Product; quantity: number; size: string }[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productModalSize, setProductModalSize] = useState<string>("M");

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<"shipping" | "payment" | "success">("shipping");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Form Fields
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [shippingName, setShippingName] = useState("Johnathan Vance");
  const [shippingEmail, setShippingEmail] = useState("j.vance@kronosgear.com");
  const [shippingAddress, setShippingAddress] = useState("742 Evergreen Terrace");
  const [shippingCity, setShippingCity] = useState("Seattle");
  const [shippingZip, setShippingZip] = useState("98101");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvv, setCardCvv] = useState("892");

  const products: Product[] = [
    {
      id: "prod-1",
      name: "Aerovane Carbon Shell",
      category: "outerwear",
      price: 480,
      originalPrice: 550,
      tag: "Best Seller",
      description: "Ultralight aerodynamic technical shell woven with carbon-reinforced waterproof ripstop.",
      longDescription: "Engineered for gale-force conditions and sub-zero squalls. Features magnetic storm cuffs, laser-welded ventilation gills, and a hydrophobic silicone barrier tested up to 20,000mm hydrostatic head.",
      rating: 4.9,
      reviewsCount: 142,
      imageGradient: "from-amber-500/20 via-zinc-800 to-black",
      specs: ["20,000mm Waterproof", "Carbon Weave", "Magnetic Zippers", "Reflective 3M Accents"],
      sizes: ["S", "M", "L", "XL"],
      inStock: 8,
    },
    {
      id: "prod-2",
      name: "Chrono Kinetic Timepiece",
      category: "hardware",
      price: 890,
      tag: "Limited Batch",
      description: "Titanium grade 5 case with automatic mechanical movement and anti-reflective sapphire crystal.",
      longDescription: "Machined from a single solid ingot of aerospace-grade titanium with an exposed exhibition sapphire caseback and unidirectional ceramic diving bezel.",
      rating: 5.0,
      reviewsCount: 88,
      imageGradient: "from-indigo-600/20 via-zinc-800 to-black",
      specs: ["Grade 5 Titanium", "100m Water Resistance", "Swiss Movement", "SuperLuminova BGW9"],
      sizes: ["One Size"],
      inStock: 4,
    },
    {
      id: "prod-3",
      name: "Vektor Minimalist Low",
      category: "footwear",
      price: 260,
      description: "Ergonomic barefoot silhouette constructed from Italian calfskin with carbon stability plates.",
      longDescription: "Anatomically zero-drop footbed engineered with dual-density Vibram rubber for extraordinary traction on wet asphalt and granite surfaces.",
      rating: 4.8,
      reviewsCount: 95,
      imageGradient: "from-emerald-500/20 via-zinc-800 to-black",
      specs: ["Full Grain Leather", "Carbon Arch Shank", "Vibram Outsole", "Waxed Laces"],
      sizes: ["40", "41", "42", "43", "44", "45"],
      inStock: 12,
    },
    {
      id: "prod-4",
      name: "Apex Thermal Modular Vest",
      category: "outerwear",
      price: 320,
      originalPrice: 380,
      description: "Graphene-infused heat-retaining midlayer with modular magnetic cargo compartments.",
      longDescription: "Ultrathin graphene micro-lattice traps radiated body heat while maintaining maximum breathable airflow under high-cardio exertion.",
      rating: 4.7,
      reviewsCount: 63,
      imageGradient: "from-rose-500/20 via-zinc-800 to-black",
      specs: ["Graphene Membrane", "Modular Fidlock", "Thermal Cell", "Packable Pocket"],
      sizes: ["S", "M", "L", "XL"],
      inStock: 15,
    },
    {
      id: "prod-5",
      name: "Spectre Polarized Optic",
      category: "hardware",
      price: 240,
      tag: "New",
      description: "Laser-cut magnesium sunglasses with photochromic UV-reactive scratch-resistant lenses.",
      longDescription: "Weighing a mere 18 grams, the Spectre frame is engineered from ultra-light magnesium alloy with anti-reflective hydrophobic coating on both lens faces.",
      rating: 4.9,
      reviewsCount: 51,
      imageGradient: "from-cyan-500/20 via-zinc-800 to-black",
      specs: ["Magnesium Frame", "100% UV400", "Ultra-feather 18g", "Titanium Screws"],
      sizes: ["Standard"],
      inStock: 19,
    },
    {
      id: "prod-6",
      name: "Nomad Roll-Top Commuter",
      category: "hardware",
      price: 290,
      description: "Weatherproof 28L technical commuter pack with padded laptop cocoon and quick-draw side harness.",
      longDescription: "Constructed from laminated X-Pac VX21 sailcloth featuring Fidlock magnetic hardware, weatherproof taped zippers, and ergonomic load-lifter straps.",
      rating: 4.8,
      reviewsCount: 110,
      imageGradient: "from-amber-600/20 via-zinc-800 to-black",
      specs: ["X-Pac Sailcloth", "Waterproof YKK", "Fidlock Closure", "16-inch Laptop Sleeve"],
      sizes: ["28 Liters"],
      inStock: 6,
    },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const toggleWishlist = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addToCart = (product: Product, size = "M") => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1, size }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, size: string, delta: number) => {
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

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === id && item.size === size)));
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

  const handleProcessCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    try {
      const paymentResult = await processPayment({
        cardNumber,
        cardHolder: shippingName,
        expiry: cardExpiry,
        cvv: cardCvv,
        amount: finalTotal,
        description: `Kronos Apparel Order (${totalItemCount} items)`,
        customerEmail: shippingEmail,
      });

      // Dispatch order receipt email via mock email service
      await sendEmail({
        to: shippingEmail,
        subject: `Order Receipt Confirmed: ${paymentResult.chargeId}`,
        template: "order_confirmation",
        data: {
          customerName: shippingName,
          shippingAddress: `${shippingAddress}, ${shippingCity} ${shippingZip}`,
          amountPaid: `$${finalTotal.toFixed(2)}`,
          chargeId: paymentResult.chargeId,
          last4: paymentResult.last4,
          items: cart.map((i) => `${i.product.name} (x${i.quantity}) - $${i.product.price * i.quantity}`),
        },
      });

      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 },
      });

      setCompletedOrder({
        chargeId: paymentResult.chargeId,
        total: finalTotal,
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
    <div className="min-h-screen bg-[#0c0c0e] text-white">
      {/* Sticky Cart & Wishlist Trigger */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
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
          <GlowingBadge variant="amber">2026 CAPSULE COLLECTION · TURNKEY COMMERCE</GlowingBadge>
          <h1 className="text-4xl sm:text-6xl font-extrabold font-display tracking-tight">
            Engineered Gear for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              <TextReveal text="Next Century." />
            </span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Technical garments and precision hardware developed with aerodynamic materials, integrated checkout flows, and zero compromise.
          </p>

          <div className="pt-2 flex justify-center">
            <span className="text-xs font-mono text-zinc-400 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10">
              Promo Code: <strong className="text-amber-400">WELCOME20</strong> for 20% discount at checkout
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

          <div className="flex items-center gap-4 text-xs text-zinc-400 font-mono">
            <span>Wishlist ({wishlist.size})</span>
            <span>·</span>
            <span>{filteredProducts.length} Products</span>
          </div>
        </div>

        {/* Product Grid with Spotlight & 3D Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.has(product.id);
            return (
              <Spotlight
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  setProductModalSize(product.sizes[0] || "M");
                }}
                className="p-6 h-full flex flex-col justify-between group cursor-pointer"
              >
                <div>
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
                      <button
                        onClick={(e) => toggleWishlist(product.id, e)}
                        className={`p-2 rounded-full border transition-colors ${
                          isWishlisted
                            ? "bg-rose-500 text-white border-rose-500"
                            : "bg-black/40 hover:bg-black/80 text-zinc-400 hover:text-rose-400 border-white/10"
                        }`}
                        aria-label="Save to wishlist"
                      >
                        <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white mb-1.5 group-hover:text-amber-200 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.specs.slice(0, 3).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-400 font-mono"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

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
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, product.sizes[0] || "M");
                      }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-amber-500 hover:text-zinc-950 text-white font-semibold text-xs border border-white/15 transition-all"
                    >
                      <Plus size={14} />
                      <span>Add to Bag</span>
                    </button>
                  </Magnetic>
                </div>
              </Spotlight>
            );
          })}
        </div>
      </section>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl relative my-8"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                <div className={`h-72 w-full rounded-2xl bg-gradient-to-tr ${selectedProduct.imageGradient} border border-white/10 flex items-center justify-center p-6 relative overflow-hidden`}>
                  <ShoppingBag size={48} className="text-white/60" />
                  <div className="absolute bottom-4 left-4 text-xs font-mono text-amber-300">
                    {selectedProduct.inStock} units remaining
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                      {selectedProduct.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-amber-400">
                      <Star size={13} fill="currentColor" />
                      <span>{selectedProduct.rating}</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold font-display text-white">
                    {selectedProduct.name}
                  </h2>

                  <div className="text-2xl font-mono font-bold text-amber-400">
                    {formatCurrency(selectedProduct.price)}
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {selectedProduct.longDescription}
                  </p>

                  {/* Size selection */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-400 mb-2">
                      Select Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setProductModalSize(s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${
                            productModalSize === s
                              ? "bg-amber-500 text-zinc-950 border-amber-500"
                              : "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={() => {
                        addToCart(selectedProduct, productModalSize);
                        setSelectedProduct(null);
                      }}
                      className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
                    >
                      Add to Bag · {formatCurrency(selectedProduct.price)}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
                          key={`${item.product.id}-${item.size}`}
                          className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] border border-white/5"
                        >
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold text-white">
                              {item.product.name}
                            </h4>
                            <div className="text-[11px] text-zinc-400 font-mono">
                              Size: {item.size} · {formatCurrency(item.product.price)}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 bg-black/40 rounded-lg p-1 border border-white/10">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, -1)}
                                className="p-1 hover:text-amber-400"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs font-mono px-1.5">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.size, 1)}
                                className="p-1 hover:text-amber-400"
                              >
                                <Plus size={12} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.product.id, item.size)}
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
                        <span>Worldwide Express Shipping</span>
                        <span className="text-emerald-400 font-mono">FREE</span>
                      </div>
                      <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                        <span>Total</span>
                        <span className="text-amber-400 font-mono">
                          {formatCurrency(finalTotal)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCheckoutOpen(true);
                        setCheckoutStep("shipping");
                      }}
                      className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-transform active:scale-95"
                    >
                      Proceed to Checkout · {formatCurrency(finalTotal)}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Complete Checkout Flow Modal with Stripe Mock Integration */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-zinc-950 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 my-8"
            >
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Lock size={16} className="text-amber-400" />
                  <h3 className="text-lg font-bold font-display text-white">
                    Secure Stripe Checkout
                  </h3>
                </div>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-1 rounded-full text-zinc-400 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              {checkoutStep === "shipping" && (
                <div className="space-y-4">
                  <div className="text-xs text-zinc-400">Step 1 of 2: Shipping Destination</div>

                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={shippingEmail}
                      onChange={(e) => setShippingEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        value={shippingCity}
                        onChange={(e) => setShippingCity(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        value={shippingZip}
                        onChange={(e) => setShippingZip(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep("payment")}
                    className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20"
                  >
                    Continue to Payment →
                  </button>
                </div>
              )}

              {checkoutStep === "payment" && (
                <form onSubmit={handleProcessCheckout} className="space-y-4">
                  <div className="text-xs text-zinc-400">Step 2 of 2: Payment Authorization</div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between items-center text-xs">
                    <span>Order Amount:</span>
                    <strong className="text-amber-400 font-mono">{formatCurrency(finalTotal)}</strong>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-zinc-400 font-semibold">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-zinc-400 font-semibold">Expiry Date</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] text-zinc-400 font-semibold">CVC / CVV</label>
                        <input
                          type="text"
                          required
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep("shipping")}
                      className="px-4 py-3 rounded-xl bg-white/5 text-xs text-zinc-400 hover:text-white"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="flex-1 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/25"
                    >
                      {isProcessingPayment ? "Authorizing Charge..." : `Pay ${formatCurrency(finalTotal)}`}
                    </button>
                  </div>
                </form>
              )}

              {checkoutStep === "success" && completedOrder && (
                <div className="py-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="text-xl font-bold font-display text-white">Payment Confirmed!</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    A transaction receipt for <strong className="text-white">{formatCurrency(completedOrder.total)}</strong> has been processed (Charge ID: {completedOrder.chargeId}) and dispatched to {completedOrder.email}.
                  </p>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-amber-300">
                    Carrier Tracking ID: KR-{Math.floor(Math.random() * 900000 + 100000)}
                  </div>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-amber-500 text-zinc-950 font-bold text-xs"
                  >
                    Return to Store
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

export default EcommerceDemo;
