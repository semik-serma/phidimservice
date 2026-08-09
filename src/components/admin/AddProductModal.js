"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  PlusCircle,
  ImageIcon,
  Upload,
  Sparkles,
  Tag,
  DollarSign,
  Percent,
  Search,
  CheckCircle2,
  TrendingUp,
  Layers,
  FileText,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { INITIAL_CATEGORIES } from "@/data/categoriesData";

export function AddProductModal({ isOpen, onClose, onAddProduct, categories = INITIAL_CATEGORIES }) {
  const [name, setName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0]?.id || "");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  // SEO Fields
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  const fileInputRef = useRef(null);

  // Selected Category Object & Available Sub-categories
  const selectedCategoryObj = categories.find((c) => c.id === selectedCategoryId) || categories[0];
  const availableSubCategories = selectedCategoryObj?.subCategories || [];

  // Reset Sub-category when Category changes
  useEffect(() => {
    if (availableSubCategories.length > 0) {
      setSelectedSubCategoryId(availableSubCategories[0].id);
    } else {
      setSelectedSubCategoryId("");
    }
  }, [selectedCategoryId]);

  // Auto-fill SEO Meta Title & Meta Description from Product Name & Description
  useEffect(() => {
    if (name) {
      setMetaTitle(`${name} | Phidim Service Marketplace`);
    }
  }, [name]);

  useEffect(() => {
    if (description) {
      setMetaDescription(description.substring(0, 150));
    }
  }, [description]);

  // AUTO-CALCULATED PRICE HANDLERS
  const handleOriginalPriceChange = (val) => {
    setOriginalPrice(val);
    const orig = parseFloat(val) || 0;
    const disc = parseFloat(discountPercent) || 0;
    if (orig > 0) {
      const calc = Math.round(orig * (1 - disc / 100));
      setFinalPrice(calc > 0 ? String(calc) : "0");
    } else {
      setFinalPrice("");
    }
  };

  const handleDiscountPercentChange = (val) => {
    setDiscountPercent(val);
    const orig = parseFloat(originalPrice) || 0;
    const disc = parseFloat(val) || 0;
    if (orig > 0) {
      const calc = Math.round(orig * (1 - disc / 100));
      setFinalPrice(calc > 0 ? String(calc) : "0");
    }
  };

  const handleFinalPriceChange = (val) => {
    setFinalPrice(val);
    const orig = parseFloat(originalPrice) || 0;
    const finalP = parseFloat(val) || 0;
    if (orig > 0 && finalP > 0 && finalP <= orig) {
      const disc = Math.round(((orig - finalP) / orig) * 100);
      setDiscountPercent(String(disc));
    }
  };

  // Image Upload Handler with Canvas Compression
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const srcUrl = event.target?.result;
      if (!srcUrl) return;

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const maxDim = 600;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          setImage(canvas.toDataURL("image/jpeg", 0.85));
        } else {
          setImage(srcUrl);
        }
      };
      img.onerror = () => setImage(srcUrl);
      img.src = srcUrl;
    };
    reader.readAsDataURL(file);
  };

  // SEO Score Calculator (0 - 100)
  const calculateSeoScore = () => {
    let score = 0;
    if (name.length >= 5) score += 20;
    if (description.length >= 30) score += 20;
    if (metaTitle.length >= 10 && metaTitle.length <= 65) score += 20;
    if (metaDescription.length >= 40 && metaDescription.length <= 160) score += 20;
    if (seoKeywords.length >= 3) score += 10;
    if (image) score += 10;
    return score;
  };

  const seoScore = calculateSeoScore();

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedSubObj = availableSubCategories.find((s) => s.id === selectedSubCategoryId);

    const newProduct = {
      id: `prod-${Date.now()}`,
      name: name.trim(),
      category: selectedCategoryObj?.name || "General",
      categoryId: selectedCategoryObj?.id,
      subCategory: selectedSubObj?.name || null,
      subCategoryId: selectedSubObj?.id || null,
      description: description.trim(),
      image: image.trim() || "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80",
      originalPrice: parseFloat(originalPrice) || parseFloat(finalPrice) || 0,
      price: parseFloat(finalPrice) || parseFloat(originalPrice) || 0,
      discountPercent: parseFloat(discountPercent) || 0,
      seo: {
        metaTitle,
        metaDescription,
        seoKeywords,
        seoScore,
      },
      createdAt: new Date().toISOString(),
    };

    if (onAddProduct) {
      onAddProduct(newProduct);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white dark:bg-[#071712] rounded-3xl border border-slate-200/80 dark:border-emerald-900/40 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-emerald-900/30 flex items-center justify-between bg-gradient-to-r from-emerald-900/20 via-teal-900/10 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
              <PlusCircle size={22} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Add New Product / Service</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Set category, sub-category, auto-calculated prices, image, and SEO optimization score.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-300 font-bold flex items-center justify-center cursor-pointer transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Product Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Tag size={15} className="text-emerald-500" />
              <span>Product / Service Name *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dahua 2MP Full HD IR Bullet CCTV Camera"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 shadow-inner"
            />
          </div>

          {/* Category & Sub-category Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Layers size={15} className="text-emerald-500" />
                <span>Select Category *</span>
              </label>
              <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.subCategories?.length || 0} sub-categories)
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Category (Dynamic) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Layers size={15} className="text-teal-500" />
                <span>Select Sub-Category (Optional)</span>
              </label>
              <select
                disabled={availableSubCategories.length === 0}
                value={selectedSubCategoryId}
                onChange={(e) => setSelectedSubCategoryId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 disabled:opacity-50 cursor-pointer"
              >
                {availableSubCategories.length > 0 ? (
                  availableSubCategories.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))
                ) : (
                  <option value="">None (Category has no sub-categories)</option>
                )}
              </select>
            </div>
          </div>

          {/* Pricing & Auto-Calculated Discount Section */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <DollarSign size={16} />
                <span>Pricing & Auto-Calculated Discount</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Auto-updates as you type</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Original Price */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Original Price (NPR)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={originalPrice}
                  onChange={(e) => handleOriginalPriceChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-black text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Discount Percent */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1 flex items-center gap-1">
                  <Percent size={12} className="text-rose-500" />
                  <span>Discount %</span>
                </label>
                <input
                  type="number"
                  placeholder="e.g. 20"
                  value={discountPercent}
                  onChange={(e) => handleDiscountPercentChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-black text-rose-600 dark:text-rose-400 focus:outline-none focus:border-rose-500"
                />
              </div>

              {/* Final Selling Price (Auto-Calculated) */}
              <div>
                <label className="block text-[11px] font-black text-emerald-600 dark:text-emerald-400 mb-1">
                  Final Price (NPR) ✨
                </label>
                <input
                  type="number"
                  placeholder="Auto-Calculated"
                  value={finalPrice}
                  onChange={(e) => handleFinalPriceChange(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-emerald-500 bg-white dark:bg-slate-900 text-xs font-black text-emerald-600 dark:text-emerald-400 focus:outline-none shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Product Image Section */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ImageIcon size={15} className="text-emerald-500" />
              <span>Product Image *</span>
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-4 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
              {image ? (
                <img src={image} alt="Preview" className="w-16 h-16 rounded-xl object-cover ring-2 ring-emerald-500/50 shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold shrink-0">
                  No Image
                </div>
              )}

              <div className="flex-1 w-full flex flex-col sm:flex-row gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Upload size={14} />
                  <span>Upload Image</span>
                </button>
                <input
                  type="text"
                  placeholder="Or paste Image URL (https://...)"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <FileText size={15} className="text-emerald-500" />
              <span>Description</span>
            </label>
            <textarea
              rows={3}
              placeholder="Detailed product specifications, features, and warranty details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-2xl border border-slate-300 dark:border-emerald-800/60 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* SEO RANKING & OPTIMIZATION SECTION */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Globe size={16} className="text-blue-500" />
                <span>SEO Ranking & Search Optimization</span>
              </span>

              {/* SEO Rank Score Meter */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black text-slate-500">SEO Score:</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-black ${
                    seoScore >= 80
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : seoScore >= 50
                      ? "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                      : "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {seoScore}/100 {seoScore >= 80 ? "Excellent 🔥" : seoScore >= 50 ? "Good" : "Needs Info"}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Meta Title (Google Search Title)
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  Meta Description
                </label>
                <textarea
                  rows={2}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                  SEO Keywords / Search Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. cctv camera phidim, dahua security, panchthar tech"
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-4 border-t border-slate-100 dark:border-emerald-900/30 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-200 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 transition-all cursor-pointer hover:scale-105 flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>Save Product & Category</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
