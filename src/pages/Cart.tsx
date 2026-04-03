import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center animate-fade-in">
        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some products to get started!</p>
        <Link to="/products" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <div className="container py-6 animate-fade-in">
      <h1 className="text-2xl font-bold text-foreground mb-6">Shopping Cart ({items.length} items)</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 bg-card border border-border rounded-lg p-4 animate-fade-in-up">
              <Link to={`/product/${item.product.id}`} className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                  {item.product.title}
                </Link>
                <p className="text-xs text-muted-foreground mt-0.5">{item.product.category}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1.5 hover:bg-muted"><Minus className="w-3 h-3" /></button>
                    <span className="px-3 text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1.5 hover:bg-muted"><Plus className="w-3 h-3" /></button>
                  </div>
                  <span className="text-lg font-bold text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.product.id)} className="text-muted-foreground hover:text-deal transition-colors self-start">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-5 sticky top-32">
            <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground">${totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className={shipping === 0 ? "text-success font-medium" : "text-foreground"}>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax (est.)</span><span className="text-foreground">${tax.toFixed(2)}</span></div>
              <div className="border-t border-border pt-2 flex justify-between text-base font-bold">
                <span>Total</span><span className="text-foreground">${orderTotal.toFixed(2)}</span>
              </div>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-success mt-2">Add ${(50 - totalPrice).toFixed(2)} more for free shipping!</p>
            )}
            <Link to="/checkout" className="mt-4 flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
