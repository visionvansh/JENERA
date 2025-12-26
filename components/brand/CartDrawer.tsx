// src/components/cart/CartDrawer.tsx
"use client";

import { useCart } from '@/contexts/CartContext';
import { HiX, HiTrash, HiShoppingBag } from 'react-icons/hi';
import { m, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { createCart } from '@/lib/shopify';
import { useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);

    try {
      const lineItems = items.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity,
      }));

      const cart = await createCart(lineItems);
      
      // Redirect to Shopify checkout
      window.location.href = cart.checkoutUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to proceed to checkout. Please try again.');
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <m.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-neutral-900 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <HiShoppingBag className="w-6 h-6 text-white" />
                <h2 className="text-xl font-bold text-white">
                  Cart ({items.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <HiX className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <HiShoppingBag className="w-16 h-16 text-white/20 mb-4" />
                  <p className="text-white/60">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.variantId}
                      className="flex gap-4 p-4 bg-black/30 border border-white/10 rounded-lg"
                    >
                      <div className="relative w-20 h-20 flex-shrink-0 bg-white/5 rounded overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-white truncate">
                          {item.name}
                        </h3>
                        {item.size && (
                          <p className="text-xs text-white/60">Size: {item.size}</p>
                        )}
                        {item.color && (
                          <p className="text-xs text-white/60">Color: {item.color}</p>
                        )}
                        <p className="text-sm font-bold text-white mt-2">
                          ${item.price.toFixed(2)}
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 bg-white/10 rounded">
                            <button
                              onClick={() =>
                                updateQuantity(item.variantId, item.quantity - 1)
                              }
                              className="px-2 py-1 hover:bg-white/20 transition-colors"
                            >
                              -
                            </button>
                            <span className="text-sm text-white px-2">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.variantId, item.quantity + 1)
                              }
                              className="px-2 py-1 hover:bg-white/20 transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.variantId)}
                            className="p-2 hover:bg-red-500/20 rounded transition-colors"
                          >
                            <HiTrash className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between text-lg font-bold text-white">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-white text-black font-bold tracking-wider uppercase hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}