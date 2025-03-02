"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// Cart item type
type CartItem = {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  category: string
}

export default function CartPage() {
  // Sample cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Minimalist Ceramic Vase",
      price: 39.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
      category: "Home Decor",
    },
    {
      id: 3,
      name: "Wireless Noise-Cancelling Headphones",
      price: 199.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 1,
      category: "Electronics",
    },
    {
      id: 6,
      name: "Stainless Steel Water Bottle",
      price: 34.99,
      image: "/placeholder.svg?height=100&width=100",
      quantity: 2,
      category: "Kitchen",
    },
  ])

  // Calculate subtotal
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Check if cart is empty
  const isCartEmpty = cartItems.length === 0

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
        <p className="text-muted-foreground">
          {isCartEmpty
            ? "Your cart is empty"
            : `You have ${cartItems.length} item${cartItems.length > 1 ? "s" : ""} in your cart`}
        </p>
      </div>

      {isCartEmpty ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-muted p-6">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="mb-2 text-xl font-medium">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/product-search">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-[1fr_350px]">
          {/* Cart items */}
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                            className="h-8 w-12 rounded-none border-x-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex items-center justify-between pt-4">
              <Link href="/product-search">
                <Button variant="outline" className="gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Order summary */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/address-page" className="mt-6 block">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 font-medium">We Accept</h3>
                <div className="flex gap-2">
                  <div className="rounded-md border bg-muted/50 px-3 py-1 text-xs">Visa</div>
                  <div className="rounded-md border bg-muted/50 px-3 py-1 text-xs">Mastercard</div>
                  <div className="rounded-md border bg-muted/50 px-3 py-1 text-xs">PayPal</div>
                  <div className="rounded-md border bg-muted/50 px-3 py-1 text-xs">Apple Pay</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

