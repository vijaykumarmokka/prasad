import Link from 'next/link'
import { Button } from "@/components/ui/button"
import LoginForm from '@/components/login-form'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="container mx-auto px-4 py-16">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-blue-600">StockOptimizer</h1>
          <LoginForm />
        </header>
        
        <main className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-6">
            Optimize Your Investment Strategy
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Use AI-powered insights to make informed investment decisions and manage your portfolio effectively.
          </p>
          <Link href="/dashboard" passHref>
            <Button size="lg" className="font-semibold">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </main>

        <section className="mt-24">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Stock Suggestions",
                description: "Get personalized stock recommendations based on your risk profile and investment goals."
              },
              {
                title: "Portfolio Optimization",
                description: "Analyze and optimize your portfolio for better performance and risk management."
              },
              {
                title: "Wishlist Management",
                description: "Create and manage multiple wishlists to organize your investment ideas."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

