"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingBag, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Product type
type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  rating: number
}

// Cart item type
type CartItem = Product & { quantity: number }

// Sample products data with the provided images
const products: Product[] = [
  {
    id: 1,
    name: "Classic Navy Polo",
    description: "Premium cotton polo t-shirt with red contrast collar and cuffs. Perfect for casual outings.",
    price: 499,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/polo.jpg-aHzLEdpiIYFXSzLzVN54m3jdr6hXxM.jpeg",
    category: "Polo T-Shirts",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Essential Navy Hoodie",
    description: "Comfortable cotton blend hoodie with minimalist design. Ideal for everyday wear.",
    price: 599,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hoddie.jpg-t9v05XyaFysUf8cmpHFm03oFY7eO3b.jpeg",
    category: "Hoodies",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Basic Navy Tee",
    description: "Soft cotton t-shirt with subtle chest branding. A wardrobe essential.",
    price: 299,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ts.jpg-HbNb6RplPq0QfFc2SfwyFNlAujsh2B.jpeg",
    category: "T-Shirts",
    rating: 4.2,
  },
  {
    id: 4,
    name: "Sport Team Jersey",
    description: "Professional sports jersey with dynamic design. Perfect for team sports and training.",
    price: 549,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sport.jpg-k7t9h2IGYifrnZlqPwfEEiXmi4DelO.jpeg",
    category: "Sports Wear",
    rating: 4.6,
  },
]

// Form schema for checkout
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  pinCode: z.string().min(6, "PIN code is required"),
  cardNumber: z.string().min(16, "Invalid card number"),
  expiryDate: z.string().min(5, "Invalid expiry date"),
  cvv: z.string().min(3, "Invalid CVV"),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

// Custom styles
const customStyles = {
  background: "bg-navy-950", // Dark navy background
  primary: "bg-[#1a365d]", // Navy blue
  secondary: "bg-[#2F855A]", // Green
  accent: "text-[#FFD700]", // Gold
  card: "bg-white shadow-lg hover:shadow-xl transition-shadow duration-300",
}

export default function AllInOneShop() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeTab, setActiveTab] = useState("products")

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      pinCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  })

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Order placed:", data)
    // Here you would typically send this data to your server
    alert("Order placed successfully!")
    setCart([])
    setActiveTab("products")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a365d] to-[#0a192f] text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-4xl font-bold mb-8 text-center ${customStyles.accent}`}>Premium Apparel Collection</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-[#1a365d]/50">
            <TabsTrigger value="products" className="data-[state=active]:bg-[#2F855A] data-[state=active]:text-white">
              Products
            </TabsTrigger>
            <TabsTrigger value="cart" className="data-[state=active]:bg-[#2F855A] data-[state=active]:text-white">
              Cart ({cart.length})
            </TabsTrigger>
            <TabsTrigger
              value="checkout"
              className="data-[state=active]:bg-[#2F855A] data-[state=active]:text-white"
              disabled={cart.length === 0}
            >
              Checkout
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <Card key={product.id} className={`${customStyles.card} overflow-hidden`}>
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-[#1a365d]">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{product.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-[#2F855A]">₹{product.price}</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-[#FFD700] text-[#FFD700]" />
                        <span className="ml-1 text-sm">{product.rating}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      className="mt-4 w-full bg-[#2F855A] hover:bg-[#2F855A]/90"
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cart" className="space-y-4">
            {cart.length === 0 ? (
              <Card className={`${customStyles.card} p-8`}>
                <div className="text-center">
                  <ShoppingBag className="mx-auto h-12 w-12 text-[#1a365d]" />
                  <p className="mt-2 text-lg font-medium text-[#1a365d]">Your cart is empty</p>
                  <Button onClick={() => setActiveTab("products")} className="mt-4 bg-[#2F855A] hover:bg-[#2F855A]/90">
                    Continue Shopping
                  </Button>
                </div>
              </Card>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <Card key={item.id} className={`${customStyles.card}`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-[#1a365d]">{item.name}</h3>
                          <p className="text-sm text-[#2F855A]">₹{item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-[#1a365d]">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card className={`${customStyles.card} p-4`}>
                  <div className="space-y-2 text-[#1a365d]">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>₹{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => setActiveTab("checkout")}
                    className="mt-4 w-full bg-[#2F855A] hover:bg-[#2F855A]/90"
                  >
                    Proceed to Checkout
                  </Button>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="checkout">
            <Card className={`${customStyles.card} p-6`}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="pinCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PIN Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Separator />
                  <h3 className="text-xl font-semibold">Payment Information</h3>
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="1234 5678 9012 3456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>₹{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-[#2F855A] hover:bg-[#2F855A]/90">
                    Place Order
                  </Button>
                </form>
              </Form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

