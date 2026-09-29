"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { boardBreakdown, getProduct, normalizeSelection, type BoardSelection } from "@/lib/catalog";
import type { CartItem } from "@/lib/cart-types";

type CartContextValue = {
  items: CartItem[];
  ready: boolean;
  count: number;
  subtotal: number;
  addProduct: (slug: string, qty?: number) => void;
  addBoard: (selection: BoardSelection) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "brickhouse-cart";

export function itemPrice(item: CartItem) {
  if (item.kind === "product") return getProduct(item.slug)?.price ?? 0;
  return boardBreakdown(item.selection).total;
}

function sanitize(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((i): CartItem[] => {
    const qty = Math.max(1, Math.floor(Number(i?.qty) || 1));
    if (i?.kind === "product" && getProduct(i.slug)) return [{ kind: "product", id: String(i.id), slug: i.slug, qty }];
    if (i?.kind === "board") return [{ kind: "board", id: String(i.id), selection: normalizeSelection(i.selection), qty }];
    return [];
  });
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydrate from storage after mount
      if (saved) setItems(sanitize(JSON.parse(saved)));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, loaded]);

  const addProduct = useCallback((slug: string, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.kind === "product" && i.slug === slug);
      if (existing) return prev.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { kind: "product", id: `p-${slug}`, slug, qty }];
    });
  }, []);

  const addBoard = useCallback((selection: BoardSelection) => {
    setItems((prev) => [...prev, { kind: "board", id: `b-${Date.now()}`, selection, qty: 1 }]);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))));
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      ready: loaded,
      count: items.reduce((a, i) => a + i.qty, 0),
      subtotal: items.reduce((a, i) => a + itemPrice(i) * i.qty, 0),
      addProduct,
      addBoard,
      setQty,
      remove,
      clear,
    }),
    [items, loaded, addProduct, addBoard, setQty, remove, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
