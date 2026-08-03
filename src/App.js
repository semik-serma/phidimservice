/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect } from "react";
import { TopBar } from "./components/TopBar";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { CartDrawer } from "./components/CartDrawer";
import { WishlistDrawer } from "./components/WishlistDrawer";
import { CheckoutModal } from "./components/CheckoutModal";
import { QuickViewModal } from "./components/QuickViewModal";
import { AuthModal } from "./components/AuthModal";
import { TechnicianModal } from "./components/TechnicianModal";
import { AuthPage } from "./components/AuthPage";
import { OurServicesPage } from "./components/OurServicesPage";
import { AboutPage } from "./components/AboutPage";
import { AboutModal } from "./components/AboutModal";
import { WhatsAppWidget } from "./components/WhatsAppWidget";
import { HomePageOverview } from "./components/HomePageOverview";
import { HeroCarousel } from "./components/HeroCarousel";
import { LanNetworkingPage } from "./components/LanNetworkingPage";
import { ContactUsPage } from "./components/ContactUsPage";
import { Footer } from "./components/Footer";
import { CheckCircle2 } from "lucide-react";
export default function App() {
  const [activeTab, setActiveTab] = useState("HOME");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("phidim_service_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("phidim_service_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [visitorCount, setVisitorCount] = useState(() => {
    try {
      const saved = localStorage.getItem("phidim_service_visitor_count");
      const initial = saved ? parseInt(saved, 10) : 1284;
      const next = isNaN(initial) ? 1285 : initial + 1;
      localStorage.setItem("phidim_service_visitor_count", next.toString());
      return next;
    } catch {
      return 1285;
    }
  });
  const [likeCount, setLikeCount] = useState(() => {
    try {
      const saved = localStorage.getItem("phidim_service_like_count");
      const initial = saved ? parseInt(saved, 10) : 582;
      return isNaN(initial) ? 582 : initial;
    } catch {
      return 582;
    }
  });
  const handleIncrementLikes = () => {
    setLikeCount((prev) => {
      const next = prev + 1;
      try {
        localStorage.setItem("phidim_service_like_count", next.toString());
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTechnicianAuthOpen, setIsTechnicianAuthOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  useEffect(() => {
    try {
      localStorage.setItem("phidim_service_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);
  useEffect(() => {
    try {
      localStorage.setItem("phidim_service_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };
  const handleAddToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map(
          (item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 25)}..." to cart`);
  };
  const handleUpdateQuantity = (productId, delta) => {
    setCart(
      (prev) => prev.map((item) => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };
  const handleRemoveFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Added to wishlist`);
        return [...prev, product];
      }
    });
  };
  const handleSelectCategory = (catName) => {
    setSelectedCategory(catName);
    if (activeTab !== "ALL SERVICES" && activeTab !== "HOME") {
      setActiveTab("ALL SERVICES");
    }
  };
  const handleOrderFiberPackage = (pkg) => {
    const fiberProduct = {
      id: pkg.id,
      name: `DishHome DTH - ${pkg.speed} (Yearly Package)`,
      category: "DishHome DTH",
      price: pkg.priceYearly,
      rating: 5,
      reviewCount: 99,
      image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=600&q=80",
      description: pkg.features.join(", "),
      brand: "Dish Home",
      inStock: true
    };
    handleAddToCart(fiberProduct, 1);
    setIsCartOpen(true);
  };
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const wishlistCount = wishlist.length;
  return <div className="min-h-screen bg-slate-50 text-gray-900 font-sans flex flex-col selection:bg-green-500 selection:text-white">
      
      {
    /* Toast Banner */
  }
      {toastMessage && <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-green-400" />
          <span>{toastMessage}</span>
        </div>}

      {
    /* Sticky Top Banner, Header & Navbar Stack */
  }
      <header className="sticky top-0 z-50 bg-white shadow-md transition-all">
        <TopBar />
        
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleSelectCategory}
          cartCount={cartCount}
          cartTotal={cartTotal}
          wishlistCount={wishlistCount}
          visitorCount={visitorCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenWishlist={() => setIsWishlistOpen(true)}
          onOpenAuth={() => {
            setActiveTab("LOGIN / REGISTER");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onSearchSubmit={() => {
            if (activeTab !== "ALL SERVICES") setActiveTab("ALL SERVICES");
          }}
        />

        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onSelectCategory={handleSelectCategory}
          onOpenTechnicianAuth={() => {
            setActiveTab("TECHNICIAN PORTAL");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          likeCount={likeCount}
          onIncrementLikes={handleIncrementLikes}
        />
      </header>

      {
    /* Main Content Body */
  }
      <main className="flex-1">
        
        {
    /* TAB 1: HOME OVERVIEW */
  }
        {activeTab === "HOME" && <div>
            <HeroCarousel
              onShopNow={() => {
                setActiveTab("ALL SERVICES");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onFiberSelect={() => {
                setActiveTab("ALL SERVICES");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
            <div className="max-w-[1536px] mx-auto px-4 md:px-8 lg:px-12 py-8">
              <HomePageOverview
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                onOpenWhatsApp={(msg) => {
                  window.open(`https://wa.me/9779862772457?text=${encodeURIComponent(msg || "Hello Phidim Service!")}`, "_blank");
                }}
              />
            </div>
          </div>}

        {
    /* TAB 2: ALL SERVICES */
  }
        {activeTab === "ALL SERVICES" && <OurServicesPage
    onNavigateHome={() => {
      setActiveTab("HOME");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    onNavigateContact={() => {
      setActiveTab("CONTACT US");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  />}

        {
    /* TAB 3: LAN NETWORKING */
  }
        {activeTab === "LAN NETWORKING" && <LanNetworkingPage
    onOrderPackage={handleOrderFiberPackage}
    onNavigateHome={() => {
      setActiveTab("HOME");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    onNavigateContact={() => {
      setActiveTab("CONTACT US");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  />}

        {
    /* TAB 4: ABOUT PAGE */
  }
        {activeTab === "ABOUT" && <AboutPage
    onNavigateHome={() => {
      setActiveTab("HOME");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    onNavigateServices={() => {
      setActiveTab("ALL SERVICES");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    onNavigateContact={() => {
      setActiveTab("CONTACT US");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  />}

        {
    /* TAB 5: CONTACT US PAGE */
  }
        {activeTab === "CONTACT US" && <ContactUsPage
    onNavigateHome={() => {
      setActiveTab("HOME");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    onNavigateServices={() => {
      setActiveTab("ALL SERVICES");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  />}

        {
    /* TAB 5: LOGIN / REGISTER PAGE */
  }
        {activeTab === "LOGIN / REGISTER" && <AuthPage
    initialRole="USER"
    onNavigateHome={() => {
      setActiveTab("HOME");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  />}

        {
    /* TAB 6: TECHNICIAN PORTAL PAGE */
  }
        {activeTab === "TECHNICIAN PORTAL" && <AuthPage
    initialRole="TECHNICIAN"
    onNavigateHome={() => {
      setActiveTab("HOME");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  />}

      </main>

      {
    /* Floating WhatsApp / Nepali Chat Widget */
  }
      <WhatsAppWidget />

      {
    /* Footer */
  }
      <Footer
    onSelectCategory={handleSelectCategory}
    onOpenAbout={() => {
      setActiveTab("ABOUT");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    onOpenContact={() => {
      setActiveTab("CONTACT US");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  />

      {
    /* Modals & Drawers */
  }
      <CartDrawer
    isOpen={isCartOpen}
    onClose={() => setIsCartOpen(false)}
    cartItems={cart}
    onUpdateQuantity={handleUpdateQuantity}
    onRemoveItem={handleRemoveFromCart}
    onProceedCheckout={() => setIsCheckoutOpen(true)}
  />

      <WishlistDrawer
    isOpen={isWishlistOpen}
    onClose={() => setIsWishlistOpen(false)}
    wishlistProducts={wishlist}
    onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
    onAddToCart={(product) => {
      handleAddToCart(product);
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
    }}
  />

      <CheckoutModal
    isOpen={isCheckoutOpen}
    onClose={() => setIsCheckoutOpen(false)}
    cartItems={cart}
    onClearCart={() => setCart([])}
  />

      <QuickViewModal
    product={quickViewProduct}
    onClose={() => setQuickViewProduct(null)}
    onAddToCart={handleAddToCart}
    onAddToWishlist={handleToggleWishlist}
    isWishlisted={wishlist.some((p) => p.id === quickViewProduct?.id)}
    isInCart={cart.some((i) => i.product.id === quickViewProduct?.id)}
  />

      <AuthModal
    isOpen={isAuthOpen}
    onClose={() => setIsAuthOpen(false)}
  />

      <TechnicianModal
    isOpen={isTechnicianAuthOpen}
    onClose={() => setIsTechnicianAuthOpen(false)}
  />

      <AboutModal
    isOpen={isAboutOpen}
    onClose={() => setIsAboutOpen(false)}
  />

    </div>;
}
