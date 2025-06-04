import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Star, Zap, Shield, Users, Rocket, Globe, Heart, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/clerk-react"
import { ModeToggle } from "./theme-toggle"

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                            <Rocket className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold">
                            <Link href={'/home'}>
                                ProjectHub
                            </Link>
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-6">

                        <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                            Features
                        </Link>
                        <Link href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
                            Testimonials
                        </Link>
                        <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
                            Pricing
                        </Link>
                        <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="sm" className="hidden md:inline-flex">
                                    Sign In
                                </Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button size="sm">Get Started</Button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        avatarBox: 'ring-2 ring-blue-500',
                                    },
                                }}
                            />
                        </SignedIn>
                        <ModeToggle />
                        <Button variant="ghost" size="sm" className="md:hidden">
                            <Menu className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 md:py-32 lg:py-40">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center text-center space-y-8">
                            <Badge variant="secondary" className="px-4 py-2">
                                <Zap className="h-3 w-3 mr-2" />
                                New: Advanced Features Available
                            </Badge>

                            <div className="space-y-4 max-w-4xl mx-auto">
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                                    Build Amazing Projects
                                    <span className="text-primary block">Faster Than Ever</span>
                                </h1>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                                    The complete platform to bring your ideas to life. From concept to deployment, we provide everything
                                    you need to create exceptional digital experiences.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
                                <Button size="lg" className="flex-1">
                                    Start Building
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="lg" className="flex-1">
                                    Watch Demo
                                </Button>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Free to start</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>No credit card required</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span>Cancel anytime</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                        <div className="relative max-w-5xl mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-2xl blur-3xl" />
                            <Image
                                src="/placeholder.svg?height=600&width=1200"
                                alt="Platform Dashboard"
                                width={1200}
                                height={600}
                                className="relative rounded-2xl border shadow-2xl w-full h-auto"
                            />
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-muted/50">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center space-y-4 mb-16">
                            <Badge variant="outline">Features</Badge>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                                Everything you need to succeed
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                Powerful tools and features designed to help you build, deploy, and scale your projects with confidence.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Rocket className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">Lightning Fast</h3>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Deploy your projects in seconds with our optimized infrastructure and global CDN network.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Shield className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">Secure by Default</h3>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Enterprise-grade security with automatic SSL, DDoS protection, and compliance certifications.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Globe className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">Global Scale</h3>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Reach users worldwide with our global edge network and automatic scaling capabilities.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Users className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">Team Collaboration</h3>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Work together seamlessly with built-in collaboration tools and real-time updates.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Zap className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">Developer Experience</h3>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Intuitive APIs, comprehensive documentation, and powerful CLI tools for developers.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                            <Heart className="h-6 w-6 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold">24/7 Support</h3>
                                    </div>
                                    <p className="text-muted-foreground">
                                        Get help when you need it with our dedicated support team and comprehensive resources.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section id="testimonials" className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center space-y-4 mb-16">
                            <Badge variant="outline">Testimonials</Badge>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                                Loved by thousands of creators
                            </h2>
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                See what our community has to say about their experience building with our platform.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center space-x-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground mb-6">
                                        "This platform completely transformed how we build and deploy our projects. The speed and
                                        reliability are unmatched."
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            src="/placeholder.svg?height=40&width=40"
                                            alt="Sarah Johnson"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <p className="font-semibold">Sarah Johnson</p>
                                            <p className="text-sm text-muted-foreground">Lead Developer</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center space-x-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground mb-6">
                                        "The developer experience is incredible. From setup to deployment, everything just works
                                        seamlessly."
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            src="/placeholder.svg?height=40&width=40"
                                            alt="Michael Chen"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <p className="font-semibold">Michael Chen</p>
                                            <p className="text-sm text-muted-foreground">Startup Founder</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-lg">
                                <CardContent className="p-8">
                                    <div className="flex items-center space-x-1 mb-4">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground mb-6">
                                        "We've saved countless hours and significantly improved our deployment process. Highly recommended!"
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <Image
                                            src="/placeholder.svg?height=40&width=40"
                                            alt="Emily Rodriguez"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <p className="font-semibold">Emily Rodriguez</p>
                                            <p className="text-sm text-muted-foreground">Product Manager</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
                            <div className="space-y-2">
                                <p className="text-4xl font-bold">10M+</p>
                                <p className="text-primary-foreground/80">Projects Deployed</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-bold">500K+</p>
                                <p className="text-primary-foreground/80">Active Users</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-bold">99.9%</p>
                                <p className="text-primary-foreground/80">Uptime</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-4xl font-bold">24/7</p>
                                <p className="text-primary-foreground/80">Support</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center space-y-8 max-w-3xl mx-auto">
                            <Badge variant="outline">Get Started Today</Badge>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                                Ready to build something amazing?
                            </h2>
                            <p className="text-xl text-muted-foreground">
                                Join thousands of creators who are already building the future with our platform. Start your journey
                                today and see the difference.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                                <Button size="lg" className="flex-1">
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="lg" className="flex-1">
                                    Schedule Demo
                                </Button>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                                    <Input placeholder="Enter your email address" type="email" className="flex-1" />
                                    <Button>Subscribe</Button>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Get updates on new features and exclusive content. No spam, unsubscribe anytime.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t bg-muted/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                    <Rocket className="h-4 w-4 text-primary-foreground" />
                                </div>
                                <span className="text-xl font-bold">ProjectHub</span>
                            </div>
                            <p className="text-muted-foreground">The complete platform for building amazing digital experiences.</p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold">Product</h4>
                            <div className="space-y-2 text-sm">
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    Features
                                </Link>
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    Pricing
                                </Link>
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    Documentation
                                </Link>
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    API Reference
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold">Company</h4>
                            <div className="space-y-2 text-sm">
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    About
                                </Link>
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    Blog
                                </Link>
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    Careers
                                </Link>
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    Contact
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-semibold">Support</h4>
                            <div className="space-y-2 text-sm">
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    Help Center
                                </Link>
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    Community
                                </Link>
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    Status
                                </Link>
                                <Link href="#" className="block text-muted-foreground hover:text-foreground transition-colors">
                                    Security
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} ProjectHub. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center sm:justify-end gap-6 mt-4 sm:mt-0">
                            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
