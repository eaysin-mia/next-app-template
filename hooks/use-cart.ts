"use client";

import { useState, useCallback } from "react";
import { IN_YOUR_CART_ITEMS } from "@/components/shop/data/cart-data";
import type { CartBrandGroup, CartItem } from "@/components/shop/data/cart-data";

export interface UpdateQuantityPayload {
  readonly storeId: string;
  readonly itemId: string;
  readonly delta: number;
}

export interface RemoveItemPayload {
  readonly storeId: string;
  readonly itemId: string;
}

export interface UseCartReturn {
  readonly cartStores: readonly CartBrandGroup[];
  readonly totalItemCount: number;
  readonly isEmpty: boolean;
  readonly updateQuantity: (payload: UpdateQuantityPayload) => void;
  readonly removeItem: (payload: RemoveItemPayload) => void;
}

function updateItemQuantity(item: CartItem, delta: number): CartItem {
  const newQty = Math.max(0, item.quantity + delta);
  return { ...item, quantity: newQty };
}

function calculateStoreTotals(
  store: CartBrandGroup,
  items: readonly CartItem[],
): CartBrandGroup {
  const totalQty = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotalVal = items.reduce(
    (acc, curr) => acc + curr.unitPrice * curr.quantity,
    0,
  );

  return {
    ...store,
    quantity: totalQty,
    subtotalValue: subtotalVal,
    subtotal: `${store.currencySymbol}${subtotalVal.toLocaleString()}.00`,
    items: [...items],
  };
}

function transformStoreWithDelta(
  store: CartBrandGroup,
  payload: UpdateQuantityPayload,
): CartBrandGroup | null {
  if (store.id !== payload.storeId) {
    return store;
  }

  const nextItems = store.items
    .map((item) => {
      if (item.id !== payload.itemId) {
        return item;
      }
      return updateItemQuantity(item, payload.delta);
    })
    .filter((item) => item.quantity > 0);

  if (nextItems.length === 0) {
    return null;
  }

  return calculateStoreTotals(store, nextItems);
}

export function useCart(
  initialStores: readonly CartBrandGroup[] = IN_YOUR_CART_ITEMS,
): UseCartReturn {
  const [cartStores, setCartStores] =
    useState<readonly CartBrandGroup[]>(initialStores);

  const updateQuantity = useCallback((payload: UpdateQuantityPayload) => {
    setCartStores((prevStores) =>
      prevStores
        .map((store) => transformStoreWithDelta(store, payload))
        .filter((store): store is CartBrandGroup => store !== null),
    );
  }, []);

  const removeItem = useCallback(
    (payload: RemoveItemPayload) => {
      updateQuantity({
        storeId: payload.storeId,
        itemId: payload.itemId,
        delta: -999999,
      });
    },
    [updateQuantity],
  );

  const totalItemCount = cartStores.reduce(
    (acc, store) => acc + store.quantity,
    0,
  );

  return {
    cartStores,
    totalItemCount,
    isEmpty: cartStores.length === 0,
    updateQuantity,
    removeItem,
  };
}
