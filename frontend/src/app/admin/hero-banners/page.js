"use client";

/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { heroBannerAPI } from "@/services/api";

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/api\/?$/, "");

const isValidDisplayOrder = (value, count) => {
  if (value === "") return false;
  const order = Number(value);
  return Number.isInteger(order) && order >= 0 && order <= count;
};

const getBannerDisplayName = (filename) => {
  if (!filename) return "Homepage Banner";
  const extensionIndex = filename.lastIndexOf(".");
  return extensionIndex > 0 ? filename.slice(0, extensionIndex) : filename;
};

export default function HeroBannersAdminPage() {
  const [banners, setBanners] = useState([]);
  const [orderValues, setOrderValues] = useState({});
  const [orderErrors, setOrderErrors] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [savingOrderIds, setSavingOrderIds] = useState({});
  const [bannerToDelete, setBannerToDelete] = useState(null);
  const [deletingBanner, setDeletingBanner] = useState(false);
  const fileInputRef = useRef(null);
  const orderSaveTimersRef = useRef({});

  const loadBanners = useCallback(async () => {
    setLoading(true);
    try {
      const response = await heroBannerAPI.getAll();
      if (response.success && Array.isArray(response.data)) {
        setBanners(response.data);
        setOrderValues(Object.fromEntries(
          response.data.map((banner) => [banner.id, String(banner.display_order ?? 0)])
        ));
      } else {
        console.error("Failed to load hero banners:", response.message || "Invalid API response");
      }
    } catch (error) {
      console.error("Failed to load hero banners:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBanners();
    return () => {
      Object.values(orderSaveTimersRef.current).forEach(clearTimeout);
    };
  }, [loadBanners]);

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await heroBannerAPI.upload(formData);
      if (response.success) {
        setBanners((current) => [response.data, ...current]);
        setOrderValues((current) => ({ ...current, [response.data.id]: "0" }));
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        console.error("Failed to upload hero banner:", response.message || "Unknown API error");
      }
    } catch (error) {
      console.error("Failed to upload hero banner:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleToggle = async (banner) => {
    const active = Number(banner.is_active) !== 1;
    try {
      const response = await heroBannerAPI.setActive(banner.id, active);
      if (response.success) {
        setBanners((current) => current.map((item) =>
          item.id === banner.id ? { ...item, is_active: active ? 1 : 0 } : item
        ));
      } else {
        console.error("Failed to update hero banner:", response.message || "Unknown API error");
      }
    } catch (error) {
      console.error("Failed to update hero banner:", error);
    }
  };

  const saveOrder = async (banner, displayOrder) => {
    setSavingOrderIds((current) => ({ ...current, [banner.id]: true }));
    try {
      const response = await heroBannerAPI.setDisplayOrder(banner.id, displayOrder);
      if (response.success) {
        setOrderErrors((current) => {
          const next = { ...current };
          delete next[banner.id];
          return next;
        });
        setBanners((current) => current.map((item) =>
          item.id === banner.id ? { ...item, display_order: displayOrder } : item
        ));
        setOrderValues((current) => ({ ...current, [banner.id]: String(displayOrder) }));
      } else {
        console.error("Failed to update hero banner order:", response.message || "Unknown API error");
        setOrderValues((current) => ({ ...current, [banner.id]: String(banner.display_order ?? 0) }));
        if (response.message?.includes("already assigned")) {
          setOrderErrors((current) => ({ ...current, [banner.id]: "This order is already used" }));
        }
      }
    } catch (error) {
      console.error("Failed to update hero banner order:", error);
      setOrderValues((current) => ({ ...current, [banner.id]: String(banner.display_order ?? 0) }));
    } finally {
      setSavingOrderIds((current) => {
        const next = { ...current };
        delete next[banner.id];
        return next;
      });
    }
  };

  const handleOrderChange = (banner, value) => {
    const enteredOrder = Number(value);
    const normalizedValue = value !== "" && Number.isInteger(enteredOrder)
      ? String(Math.min(Math.max(enteredOrder, 0), banners.length))
      : value;
    const hasDuplicate = Number(normalizedValue) > 0 && banners.some((item) =>
      item.id !== banner.id &&
      Number(orderValues[item.id] ?? item.display_order ?? 0) === Number(normalizedValue)
    );
    if (hasDuplicate) {
      setOrderErrors((current) => ({ ...current, [banner.id]: "This order is already used" }));
      clearTimeout(orderSaveTimersRef.current[banner.id]);
      delete orderSaveTimersRef.current[banner.id];
      return;
    }

    setOrderErrors((current) => {
      const next = { ...current };
      delete next[banner.id];
      return next;
    });
    setOrderValues((current) => ({ ...current, [banner.id]: normalizedValue }));
    clearTimeout(orderSaveTimersRef.current[banner.id]);
    if (!isValidDisplayOrder(normalizedValue, banners.length) || Number(normalizedValue) === Number(banner.display_order)) return;

    orderSaveTimersRef.current[banner.id] = setTimeout(() => {
      delete orderSaveTimersRef.current[banner.id];
      saveOrder(banner, Number(normalizedValue));
    }, 400);
  };

  const handleOrderBlur = (banner) => {
    const value = orderValues[banner.id] ?? String(banner.display_order ?? 0);
    if (value === "") {
      setOrderValues((current) => ({ ...current, [banner.id]: "0" }));
      clearTimeout(orderSaveTimersRef.current[banner.id]);
      if (Number(banner.display_order) !== 0) saveOrder(banner, 0);
      return;
    }

    if (!isValidDisplayOrder(value, banners.length)) {
      setOrderValues((current) => ({ ...current, [banner.id]: String(banner.display_order ?? 0) }));
      return;
    }
    if (Number(value) === Number(banner.display_order)) return;
    clearTimeout(orderSaveTimersRef.current[banner.id]);
    delete orderSaveTimersRef.current[banner.id];
    saveOrder(banner, Number(value));
  };

  const handleDelete = (banner) => {
    setBannerToDelete(banner);
  };

  const confirmDelete = async () => {
    if (!bannerToDelete || deletingBanner) return;

    setDeletingBanner(true);
    try {
      const response = await heroBannerAPI.delete(bannerToDelete.id);
      if (response.success) {
        Object.values(orderSaveTimersRef.current).forEach(clearTimeout);
        orderSaveTimersRef.current = {};
        const remaining = banners.filter((item) => item.id !== bannerToDelete.id);
        const normalizedRemaining = remaining.map((item) =>
          Number(item.display_order) > remaining.length ? { ...item, display_order: 0 } : item
        );
        setBanners(normalizedRemaining);
        setOrderValues(Object.fromEntries(
          normalizedRemaining.map((item) => [item.id, String(item.display_order ?? 0)])
        ));
        setOrderErrors({});
        setBannerToDelete(null);
      } else {
        console.error("Failed to delete hero banner:", response.message || "Unknown API error");
      }
    } catch (error) {
      console.error("Failed to delete hero banner:", error);
    } finally {
      setDeletingBanner(false);
    }
  };

  const activeCount = banners.filter((banner) => Number(banner.is_active) === 1).length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-extrabold text-[#1a1a2e]">Hero Banners</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload and manage the images displayed in the homepage hero carousel.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "Total banners", value: banners.length, color: "bg-[#1a1a2e]" },
          { label: "Showing on homepage", value: activeCount, color: "bg-green-500" },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
              <span className="text-sm font-extrabold text-white">{value}</span>
            </div>
            <p className="text-xs font-semibold text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl border border-red-100 bg-gradient-to-br from-white to-red-50/50 p-5 shadow-sm sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#C8102E]">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#1a1a2e]">Add a homepage banner</h2>
            <p className="mt-0.5 text-xs text-gray-500">Choose an image to add it to the hero carousel.</p>
          </div>
        </div>

        <form onSubmit={handleUpload} className="grid gap-x-4 gap-y-2 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <label htmlFor="banner-image" className="mb-1.5 block text-xs font-semibold text-gray-600">Banner image</label>
            <input
              ref={fileInputRef}
              id="banner-image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-red-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[#C8102E]"
            />
          </div>
          <button
            type="submit"
            disabled={!file || uploading}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-5 text-sm font-bold text-white shadow-sm shadow-red-900/10 transition-colors hover:bg-[#a50d25] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto md:min-w-36"
          >
            {uploading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Uploading...
              </>
            ) : "Add Banner"}
          </button>
          <p className="text-xs text-gray-400 md:col-span-2">JPG, PNG, or WEBP. Maximum size: 10 MB.</p>
        </form>
      </section>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#C8102E] border-t-transparent" />
        </div>
      ) : banners.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
          <p className="text-sm font-semibold text-gray-500">No hero banners added yet</p>
          <p className="mt-1 text-xs text-gray-400">Add an image above to display it in the homepage hero section.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {banners.map((banner) => (
            <article key={banner.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="relative aspect-[16/5] bg-gray-100">
                <img
                  src={`${API_BASE}${banner.image_url}`}
                  alt={getBannerDisplayName(banner.title)}
                  className={`h-full w-full object-cover ${Number(banner.is_active) === 1 ? "" : "opacity-50 grayscale"}`}
                />
                <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${Number(banner.is_active) === 1 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                  {Number(banner.is_active) === 1 ? "Active" : "Hidden"}
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <h2
                    className="truncate text-sm font-bold text-[#1a1a2e]"
                    title={getBannerDisplayName(banner.title)}
                  >
                    {getBannerDisplayName(banner.title)}
                  </h2>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <label htmlFor={`banner-order-${banner.id}`} className="mr-1 text-[11px] font-semibold text-gray-500">
                    Order
                  </label>
                  <input
                    id={`banner-order-${banner.id}`}
                    type="number"
                    min="0"
                    max={banners.length}
                    step="1"
                    value={orderValues[banner.id] ?? banner.display_order ?? 0}
                    disabled={savingOrderIds[banner.id]}
                    onChange={(event) => handleOrderChange(banner, event.target.value)}
                    onBlur={() => handleOrderBlur(banner)}
                    className="h-9 w-16 rounded-lg border border-gray-200 px-2 text-sm focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/10 disabled:bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => handleToggle(banner)}
                    className="rounded-lg px-2.5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                    aria-label={`${Number(banner.is_active) === 1 ? "Hide" : "Show"} ${getBannerDisplayName(banner.title)}`}
                  >
                    {Number(banner.is_active) === 1 ? "Hide" : "Show"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(banner)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    aria-label={`Delete ${getBannerDisplayName(banner.title)}`}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              {orderErrors[banner.id] && (
                <p className="px-4 pb-4 text-[11px] text-red-600" aria-live="polite">
                  {orderErrors[banner.id]}
                </p>
              )}
            </article>
          ))}
        </div>
      )}

      {bannerToDelete && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => {
            if (!deletingBanner) setBannerToDelete(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-banner-title"
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-950/25"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-6 sm:p-7">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#C8102E]">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.3 3.86l-8 14A2 2 0 004.03 21h15.94a2 2 0 001.73-3.14l-8-14a2 2 0 00-3.46 0z" />
                </svg>
              </div>
              <h2 id="delete-banner-title" className="mt-5 text-center text-lg font-extrabold text-[#1a1a2e]">
                Are you sure you want to delete &quot;{getBannerDisplayName(bannerToDelete.title)}&quot;?
              </h2>
            </div>

            <div className="flex flex-col-reverse items-center justify-center gap-2 border-t border-gray-100 bg-gray-50/80 p-4 sm:flex-row sm:px-6">
              <button
                type="button"
                disabled={deletingBanner}
                onClick={() => setBannerToDelete(null)}
                className="h-11 rounded-xl border border-gray-200 bg-white px-5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deletingBanner}
                onClick={confirmDelete}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-5 text-sm font-bold text-white shadow-sm shadow-red-900/10 transition-colors hover:bg-[#a50d25] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {deletingBanner && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                )}
                {deletingBanner ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
