"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

// Form schema
const addressSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address1: z.string().min(5, "Address is required"),
  address2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code is required"),
  country: z.string().min(2, "Country is required"),
})

type AddressFormValues = z.infer<typeof addressSchema>

export default function AddressPage() {
  const [useShippingForBilling, setUseShippingForBilling] = useState(true)

  // Sample cart summary data
  const cartSummary = {
    items: [
      {
        id: 1,
        name: "Minimalist Ceramic Vase",
        price: 39.99,
        quantity: 1,
      },
      {
        id: 3,
        name: "Wireless Noise-Cancelling Headphones",
        price: 199.99,
        quantity: 1,
      },
      {
        id: 6,
        name: "Stainless Steel Water Bottle",
        price: 34.99,
        quantity: 2,
      },
    ],
    subtotal: 309.97,
    shipping: 5.99,
    tax: 24.8,
    total: 340.76,
  }

  // Initialize form
  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    },
  })

  // Handle form submission
  const onSubmit = (data: AddressFormValues) => {
    console.log("Form submitted:", data)
    // In a real app, you would process the checkout here
    // and redirect to payment page
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        <p className="text-muted-foreground">Please enter your shipping information</p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_350px]">
        <div className="space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Shipping Address */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Shipping Address</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
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
                            <Input placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder="(123) 456-7890" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address1"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Address Line 1</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem className="sm:col-span-2">
                          <FormLabel>Address Line 2 (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Apt 4B" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                    <div className="grid gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                              <Input placeholder="NY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="US">United States</SelectItem>
                              <SelectItem value="CA">Canada</SelectItem>
                              <SelectItem value="UK">United Kingdom</SelectItem>
                              <SelectItem value="AU">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card>
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Billing Address</h2>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="same-address"
                        checked={useShippingForBilling}
                        onCheckedChange={(checked) => setUseShippingForBilling(checked as boolean)}
                      />
                      <Label htmlFor="same-address">Same as shipping address</Label>
                    </div>
                  </div>

                  {!useShippingForBilling && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Duplicate the shipping address fields for billing */}
                      <div className="sm:col-span-2">
                        <p className="text-sm text-muted-foreground">Please enter your billing address details.</p>
                      </div>
                      {/* Billing address fields would go here - omitted for brevity */}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex items-center justify-between">
                <Link href="/cart-page">
                  <Button variant="outline" className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Back to Cart
                  </Button>
                </Link>
                <Button type="submit" className="gap-2">
                  <CreditCard className="h-4 w-4" />
                  Proceed to Payment
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Order summary */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
              <div className="space-y-4">
                {cartSummary.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} <span className="text-muted-foreground">x{item.quantity}</span>
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${cartSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${cartSummary.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${cartSummary.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${cartSummary.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="mb-2 font-medium">Shipping Methods</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="standard" defaultChecked />
                    <Label htmlFor="standard">Standard Shipping</Label>
                  </div>
                  <span>$5.99</span>
                </div>
                <div className="flex items-center justify-between rounded-md border p-3">
                  <div className="flex items-center gap-2">
                    <Checkbox id="express" />
                    <Label htmlFor="express">Express Shipping</Label>
                  </div>
                  <span>$12.99</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

