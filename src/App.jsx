import { useState, useEffect, useRef } from 'react'
import {
  Wrench, Sparkles, Zap, Package, Shield, Clock, DollarSign,
  Star, ChevronRight, ArrowRight, Menu, X, Check, Users,
  Trophy, Bike, Dumbbell, ChevronDown, Phone, Mail, MapPin,
  Instagram, Facebook, Twitter, Youtube, Settings, RefreshCw
} from 'lucide-react'

// ─── Intersection Observer Hook ───────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView()

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['Services', 'Why Us', 'How It Works', 'Sports', 'Reviews']

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-dark/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-neon rounded-lg flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(57,255,20,0.6)] transition-shadow duration-300">
              <Zap className="w-5 h-5 text-dark" fill="currentColor" />
            </div>
            <div className="leading-tight">
              <span className="text-white font-black text-lg tracking-tight">Sport</span>
              <span className="text-neon font-black text-lg tracking-tight">Addict</span>
              <div className="text-white/40 text-[9px] font-medium tracking-[0.2em] uppercase -mt-1">Gear Service</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-white/70 hover:text-neon text-sm font-medium transition-colors duration-200 tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#services" className="text-white/70 hover:text-white text-sm font-medium transition-colors px-4 py-2">
              View All
            </a>
            <a href="#cta" className="btn-primary text-sm py-2.5 px-6">
              Book Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      } bg-dark/98 backdrop-blur-md border-t border-dark-border`}>
        <div className="px-4 py-4 space-y-1">
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setMobileOpen(false)}
              className="block text-white/70 hover:text-neon py-3 px-4 rounded-lg hover:bg-white/5 transition-all font-medium"
            >
              {link}
            </a>
          ))}
          <div className="pt-3 pb-1">
            <a href="#cta" className="btn-primary w-full justify-center text-sm py-3">
              Book Now <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
      {/* Background Layers */}
      <div className="absolute inset-0 hero-pattern opacity-50" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon/3 rounded-full blur-3xl" />

      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(57,255,20,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />

      {/* Floating Sport Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { emoji: '⚽', top: '15%', left: '8%', delay: '0s', size: 'text-3xl' },
          { emoji: '🏸', top: '20%', right: '10%', delay: '0.5s', size: 'text-2xl' },
          { emoji: '🎾', top: '65%', left: '6%', delay: '1s', size: 'text-2xl' },
          { emoji: '🚴', top: '70%', right: '8%', delay: '1.5s', size: 'text-3xl' },
          { emoji: '🏋️', top: '40%', left: '3%', delay: '0.8s', size: 'text-2xl' },
          { emoji: '🥅', top: '35%', right: '4%', delay: '0.3s', size: 'text-xl' },
        ].map((item, i) => (
          <div
            key={i}
            className={`absolute ${item.size} opacity-10 animate-float`}
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              animationDelay: item.delay,
              filter: 'grayscale(100%) brightness(3)'
            }}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
          <div className="w-2 h-2 bg-neon rounded-full animate-pulse" />
          <span className="text-neon text-xs font-bold tracking-widest uppercase">
            Professional Sports Gear Service
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black leading-none tracking-tight mb-6 animate-fade-up">
          <span className="block text-white">GEAR UP.</span>
          <span className="block gradient-text text-shadow-neon">PERFORM</span>
          <span className="block text-white">BETTER.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-white/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animate-delay-200">
          Rent top-tier sports equipment or book a professional service — repair,
          tuning, cleaning, and customization for every athlete, club, and team.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up animate-delay-300">
          <a href="#cta" className="btn-primary text-base w-full sm:w-auto justify-center">
            Rent or Service Your Gear
            <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#services" className="btn-secondary text-base w-full sm:w-auto justify-center">
            View Services & Rentals
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-dark-border rounded-2xl overflow-hidden border border-dark-border max-w-3xl mx-auto animate-fade-up animate-delay-400">
          {[
            { value: 2000, suffix: '+', label: 'Happy Athletes' },
            { value: 500, suffix: '+', label: 'Gear Items Available' },
            { value: 98, suffix: '%', label: 'Satisfaction Rate' },
            { value: 24, suffix: 'h', label: 'Avg. Turnaround' },
          ].map((stat, i) => (
            <div key={i} className="bg-dark-card px-4 py-5 text-center">
              <div className="text-2xl sm:text-3xl font-black text-neon leading-none">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/40 text-xs mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <a href="#services" className="inline-flex flex-col items-center gap-2 mt-16 text-white/30 hover:text-neon transition-colors animate-fade-up animate-delay-500">
          <span className="text-xs tracking-widest uppercase font-medium">Explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  )
}

// ─── Services Section ─────────────────────────────────────────────────────────
function Services() {
  const [ref, inView] = useInView()

  const services = [
    {
      icon: Package,
      title: 'Equipment Rental',
      desc: 'Rent football boots, badminton rackets, tennis rackets, bicycles, and full gym equipment sets — daily, weekly, or monthly.',
      tag: 'Most Popular',
      highlight: true,
      features: ['Wide gear selection', 'Inspect before rent', 'Flexible durations'],
    },
    {
      icon: Wrench,
      title: 'Equipment Repair',
      desc: 'Expert repair for damaged rackets, boots, bike frames, and gym equipment. Fast diagnosis, professional fix, ready to play.',
      tag: null,
      highlight: false,
      features: ['Same-day minor repairs', 'Genuine parts used', 'Warranty on work'],
    },
    {
      icon: Sparkles,
      title: 'Gear Cleaning',
      desc: 'Deep cleaning and deodorizing for football boots, rackets, gym gloves, cycling gear, and full equipment sets.',
      tag: null,
      highlight: false,
      features: ['Anti-bacterial treatment', 'Odor elimination', 'Restores appearance'],
    },
    {
      icon: Zap,
      title: 'Performance Tuning',
      desc: 'Unlock your gear\'s full potential. Racket restringing, boot stud replacement, bike derailleur calibration, and more.',
      tag: 'Pro Level',
      highlight: false,
      features: ['Racket restringing', 'Bike tune-up', 'Boot customization'],
    },
    {
      icon: Settings,
      title: 'Customization & Setup',
      desc: 'Personalize your equipment with custom grip tape, nameplate engraving, color wraps, and ergonomic setup matching your playing style.',
      tag: null,
      highlight: false,
      features: ['Personal branding', 'Ergonomic fitting', 'Color customization'],
    },
    {
      icon: RefreshCw,
      title: 'Maintenance Plans',
      desc: 'Keep your gear in peak condition year-round with scheduled maintenance packages for clubs, school teams, and serious athletes.',
      tag: 'Club Deals',
      highlight: false,
      features: ['Monthly packages', 'Priority service', 'Fleet discounts'],
    },
  ]

  return (
    <section id="services" className="py-24 lg:py-32 bg-dark relative overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-tag">What We Offer</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Services & <span className="gradient-text">Rentals</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Everything your gear needs — in one place. Trusted by athletes across all disciplines.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={i}
                className={`relative group rounded-2xl p-7 border card-hover cursor-pointer transition-all duration-500
                  ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  ${service.highlight
                    ? 'bg-neon/10 border-neon/50 hover:border-neon'
                    : 'bg-dark-card border-dark-border hover:border-neon/30'
                  }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Tag */}
                {service.tag && (
                  <div className="absolute top-5 right-5 bg-neon text-dark text-xs font-black px-3 py-1 rounded-full tracking-wide">
                    {service.tag}
                  </div>
                )}

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300
                  ${service.highlight
                    ? 'bg-neon text-dark group-hover:scale-110'
                    : 'bg-neon/10 text-neon group-hover:bg-neon group-hover:text-dark group-hover:scale-110'
                  }`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-white font-bold text-xl mb-2">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{service.desc}</p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                      <Check className="w-4 h-4 text-neon flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center gap-2 text-neon text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Why Choose Us ────────────────────────────────────────────────────────────
function WhyChooseUs() {
  const [ref, inView] = useInView()

  const advantages = [
    {
      icon: Trophy,
      title: 'Professional Technicians',
      desc: 'Our certified gear specialists have 5+ years of hands-on experience with all major sports equipment brands.',
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      desc: 'Minor repairs and cleaning done within 24 hours. Complex jobs completed in 2–3 business days — guaranteed.',
    },
    {
      icon: DollarSign,
      title: 'Affordable Pricing',
      desc: 'Transparent, competitive pricing with no hidden fees. Club and school team packages available for extra savings.',
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      desc: 'All repaired equipment is tested before handover. We stand behind every service with a 30-day workmanship guarantee.',
    },
    {
      icon: Users,
      title: 'Trusted by 2,000+ Athletes',
      desc: 'From solo players to full sports academies — athletes and clubs across the region rely on SportAddict for their gear.',
    },
    {
      icon: Package,
      title: 'Pickup & Delivery',
      desc: 'Can\'t come to us? We offer convenient gear pickup and delivery service so you never miss training time.',
    },
  ]

  return (
    <section id="why-us" className="py-24 lg:py-32 bg-[#0d0d0d] relative overflow-hidden">
      {/* Accent Line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-neon to-transparent opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div ref={ref} className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <span className="section-tag">Why SportAddict</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              The #1 Gear Service
              <br />
              <span className="gradient-text">Athletes Trust</span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              We're not just a repair shop — we're your performance partner. From weekend warriors
              to competitive athletes, we keep your gear performing at its best so you can focus
              on what matters: playing your game.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {['ISO Certified', '30-Day Guarantee', '5-Star Rated', 'Same-Day Service'].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 bg-dark-card border border-dark-border rounded-full px-4 py-2">
                  <Check className="w-4 h-4 text-neon" />
                  <span className="text-white/70 text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Advantages Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {advantages.map((adv, i) => {
              const Icon = adv.icon
              return (
                <div
                  key={i}
                  className={`bg-dark-card border border-dark-border rounded-xl p-5 hover:border-neon/30 transition-all duration-500 card-hover
                    ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 80 + 200}ms` }}
                >
                  <div className="w-10 h-10 bg-neon/10 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-neon" />
                  </div>
                  <h3 className="text-white font-bold text-base mb-1">{adv.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{adv.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const [ref, inView] = useInView()

  const steps = [
    {
      number: '01',
      title: 'Choose Your Service',
      desc: 'Browse our rental catalog or select a service — repair, cleaning, tuning, or customization. Book online or walk in.',
      icon: '🎯',
    },
    {
      number: '02',
      title: 'We Prepare & Perfect',
      desc: 'Our technicians inspect, repair, tune, and prepare your gear to manufacturer specs — or better.',
      icon: '⚙️',
    },
    {
      number: '03',
      title: 'Pick Up & Perform',
      desc: 'Collect your gear in-store, or have it shipped to your door. Ready to use, ready to win.',
      icon: '🏆',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-dark relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-neon/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`text-center mb-20 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-tag">Simple Process</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Getting your gear serviced or rented has never been easier. Three steps, zero hassle.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (desktop) */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-px bg-gradient-to-r from-neon/0 via-neon/40 to-neon/0" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative text-center group transition-all duration-700
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 150 + 200}ms` }}
            >
              {/* Step Icon Circle */}
              <div className="relative inline-flex items-center justify-center mb-8">
                <div className="w-32 h-32 rounded-full bg-dark-card border-2 border-dark-border group-hover:border-neon transition-all duration-300 flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(57,255,20,0.2)]">
                  <span className="text-5xl">{step.icon}</span>
                </div>
                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-9 h-9 bg-neon rounded-full flex items-center justify-center">
                  <span className="text-dark text-xs font-black">{step.number}</span>
                </div>
              </div>

              <h3 className="text-white font-black text-xl mb-3">{step.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{step.desc}</p>

              {/* Arrow between steps */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-4 transform -translate-y-1/2 text-neon/30">
                  <ChevronRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a href="#cta" className="btn-primary">
            Start Your Booking <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── Sports Categories ─────────────────────────────────────────────────────────
function SportsCategories() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)

  const categories = [
    {
      emoji: '⚽',
      name: 'Football',
      color: 'from-green-900/40 to-green-800/20',
      border: 'border-green-700/30 hover:border-green-500/50',
      services: ['Boot Rental', 'Boot Repair & Re-stud', 'Deep Cleaning', 'Shin Guard Fitting', 'Custom Colorway'],
      desc: 'From grassroots to elite level — we service all football footwear and protective gear.',
      price: 'Rental from RM15/day',
    },
    {
      emoji: '🏸',
      name: 'Badminton',
      color: 'from-yellow-900/40 to-yellow-800/20',
      border: 'border-yellow-700/30 hover:border-yellow-500/50',
      services: ['Racket Rental', 'Restringing (Any Tension)', 'Grip Replacement', 'Frame Crack Repair', 'Bag & Shoes Cleaning'],
      desc: 'Professional racket stringing service with tension accuracy to ±0.5 lbs.',
      price: 'Rental from RM10/day',
    },
    {
      emoji: '🎾',
      name: 'Tennis',
      color: 'from-orange-900/40 to-orange-800/20',
      border: 'border-orange-700/30 hover:border-orange-500/50',
      services: ['Racket Rental', 'Restringing', 'Overgrip & Lead Tape', 'Vibration Dampener Setup', 'Bag & Gear Cleaning'],
      desc: 'Racket customization to match your playing style — weight, balance, and string tension.',
      price: 'Rental from RM12/day',
    },
    {
      emoji: '🚴',
      name: 'Cycling',
      color: 'from-blue-900/40 to-blue-800/20',
      border: 'border-blue-700/30 hover:border-blue-500/50',
      services: ['Bike Rental (Road/MTB)', 'Full Tune-Up', 'Brake & Gear Calibration', 'Tire & Tube Replacement', 'Frame & Parts Cleaning'],
      desc: 'Road bikes, mountain bikes, and hybrids available for rent. Full mechanical service included.',
      price: 'Rental from RM35/day',
    },
    {
      emoji: '🏋️',
      name: 'Gym Equipment',
      color: 'from-red-900/40 to-red-800/20',
      border: 'border-red-700/30 hover:border-red-500/50',
      services: ['Equipment Rental', 'Cable & Pulley Repair', 'Upholstery Repadding', 'Equipment Cleaning', 'Home Gym Setup'],
      desc: 'Rent dumbbells, barbells, benches, and cardio machines for home or event use.',
      price: 'Rental from RM25/day',
    },
  ]

  const cat = categories[active]

  return (
    <section id="sports" className="py-24 lg:py-32 bg-[#0d0d0d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`text-center mb-14 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-tag">By Sport</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            Your Sport. <span className="gradient-text">Our Specialty.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Select your sport to explore tailored rental and service options.
          </p>
        </div>

        {/* Sport Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-sm transition-all duration-300 border
                ${active === i
                  ? 'bg-neon text-dark border-neon shadow-[0_0_20px_rgba(57,255,20,0.4)]'
                  : 'bg-dark-card text-white/60 border-dark-border hover:border-neon/30 hover:text-white'
                }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Category Panel */}
        <div className={`rounded-2xl border bg-gradient-to-br ${cat.color} ${cat.border} border p-8 lg:p-10 transition-all duration-500`}>
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <span className="text-6xl">{cat.emoji}</span>
                <div>
                  <h3 className="text-white font-black text-3xl">{cat.name}</h3>
                  <p className="text-neon text-sm font-bold">{cat.price}</p>
                </div>
              </div>
              <p className="text-white/60 text-base leading-relaxed mb-6">{cat.desc}</p>
              <a href="#cta" className="btn-primary text-sm py-3">
                Book {cat.name} Service <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div>
              <h4 className="text-white/40 text-xs font-bold tracking-widest uppercase mb-4">Available Services</h4>
              <ul className="space-y-3">
                {cat.services.map((s, j) => (
                  <li key={j} className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-neon/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-neon transition-colors duration-200">
                      <Check className="w-4 h-4 text-neon group-hover:text-dark transition-colors duration-200" />
                    </div>
                    <span className="text-white/70 font-medium">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [ref, inView] = useInView()

  const reviews = [
    {
      name: 'Ariff Hakim',
      role: 'Football Club Captain',
      avatar: 'AH',
      rating: 5,
      text: 'Our entire team\'s boots were serviced and re-studded in under 24 hours before the tournament. Incredible turnaround. We\'ve been coming back every season.',
      sport: '⚽ Football',
    },
    {
      name: 'Priya Sundaram',
      role: 'State Badminton Player',
      avatar: 'PS',
      rating: 5,
      text: 'The restringing service here is top-notch. They hit the exact tension I asked for and the grip replacement was perfect. My performance improved noticeably.',
      sport: '🏸 Badminton',
    },
    {
      name: 'Danny Loh',
      role: 'Amateur Cyclist',
      avatar: 'DL',
      rating: 5,
      text: 'Rented a road bike for a cycling event and it was in perfect condition — clean, well-tuned, and fitted to my height. Would absolutely rent again.',
      sport: '🚴 Cycling',
    },
    {
      name: 'Coach Rajesh',
      role: 'School Sports Teacher',
      avatar: 'CR',
      rating: 5,
      text: 'We use SportAddict for our school team\'s equipment maintenance. The club package is a massive money saver and the quality is always consistent.',
      sport: '🎾 Tennis',
    },
    {
      name: 'Nurul Ain',
      role: 'Fitness Enthusiast',
      avatar: 'NA',
      rating: 5,
      text: 'Rented gym equipment for a 3-month home workout plan. Everything arrived clean, fully functional, and well-packaged. Brilliant service!',
      sport: '🏋️ Gym',
    },
    {
      name: 'Marcus Tan',
      role: 'Tennis Club Member',
      avatar: 'MT',
      rating: 5,
      text: 'Had my racket customized with new strings, overgrip, and lead tape. They knew exactly what I needed even before I finished describing my game style.',
      sport: '🎾 Tennis',
    },
  ]

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-dark relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 hero-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="section-tag">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
            What Athletes <span className="gradient-text">Say</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Don't take our word for it. Here's what real athletes and clubs have to say.
          </p>

          {/* Overall Rating */}
          <div className="inline-flex items-center gap-3 mt-6 bg-dark-card border border-dark-border rounded-full px-6 py-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-neon" fill="#39FF14" />
              ))}
            </div>
            <span className="text-white font-black text-lg">4.9</span>
            <span className="text-white/40 text-sm">/ 5 from 2,000+ reviews</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div
              key={i}
              className={`bg-dark-card border border-dark-border rounded-2xl p-6 card-hover transition-all duration-500
                ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${i * 80 + 200}ms` }}
            >
              {/* Rating */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-neon" fill="#39FF14" />
                  ))}
                </div>
                <span className="text-white/30 text-xs bg-white/5 rounded-full px-2 py-1">{review.sport}</span>
              </div>

              {/* Quote */}
              <p className="text-white/70 text-sm leading-relaxed mb-5 italic">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-neon/30 to-neon/10 rounded-full flex items-center justify-center border border-neon/30">
                  <span className="text-neon text-xs font-black">{review.avatar}</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{review.name}</p>
                  <p className="text-white/40 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTASection() {
  const [ref, inView] = useInView()

  return (
    <section id="cta" className="py-24 lg:py-32 bg-[#0d0d0d] relative overflow-hidden">
      {/* Neon Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[300px] bg-neon/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-40" />

      <div ref={ref} className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        {/* Label */}
        <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/30 rounded-full px-4 py-2 mb-8">
          <Zap className="w-4 h-4 text-neon" />
          <span className="text-neon text-xs font-bold tracking-widest uppercase">Ready to Gear Up?</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-none">
          Your Best Game
          <br />
          <span className="gradient-text text-shadow-neon">Starts Here.</span>
        </h2>

        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Rent premium gear or book a professional service today.
          Walk in, book online, or call us — we're ready for your game.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="tel:+601234567890" className="btn-primary text-base w-full sm:w-auto justify-center animate-pulse-neon">
            <Phone className="w-5 h-5" />
            Book a Service Now
          </a>
          <a href="#services" className="btn-secondary text-base w-full sm:w-auto justify-center">
            View All Services
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 text-white/40 text-sm">
          <a href="tel:+601234567890" className="flex items-center gap-2 hover:text-neon transition-colors">
            <Phone className="w-4 h-4" /> +60 12-345 6789
          </a>
          <a href="mailto:hello@sportaddict.my" className="flex items-center gap-2 hover:text-neon transition-colors">
            <Mail className="w-4 h-4" /> hello@sportaddict.my
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Kuala Lumpur, Malaysia
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const socials = [
    { Icon: Instagram, href: '#' },
    { Icon: Facebook, href: '#' },
    { Icon: Twitter, href: '#' },
    { Icon: Youtube, href: '#' },
  ]

  return (
    <footer className="bg-dark border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-neon rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-dark" fill="currentColor" />
              </div>
              <div className="leading-tight">
                <span className="text-white font-black text-lg">Sport</span>
                <span className="text-neon font-black text-lg">Addict</span>
                <div className="text-white/30 text-[9px] font-medium tracking-[0.2em] uppercase -mt-1">Gear Service</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-5 max-w-xs">
              Professional sports equipment rental, repair, and servicing for athletes, clubs, and teams across Malaysia.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href }, i) => (
                <a key={i} href={href}
                  className="w-9 h-9 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center text-white/40 hover:text-neon hover:border-neon/50 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wide">Services</h4>
            <ul className="space-y-3">
              {['Equipment Rental', 'Gear Repair', 'Cleaning', 'Tuning', 'Customization', 'Club Packages'].map(item => (
                <li key={item}>
                  <a href="#services" className="text-white/40 hover:text-neon text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wide">Sports</h4>
            <ul className="space-y-3">
              {['Football', 'Badminton', 'Tennis', 'Cycling', 'Gym Equipment'].map(item => (
                <li key={item}>
                  <a href="#sports" className="text-white/40 hover:text-neon text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 tracking-wide">Contact</h4>
            <ul className="space-y-3">
              {[
                { label: '+60 12-345 6789', href: 'tel:+601234567890' },
                { label: 'hello@sportaddict.my', href: 'mailto:hello@sportaddict.my' },
                { label: 'Mon–Sat: 9AM–8PM', href: '#' },
                { label: 'Sun: 10AM–5PM', href: '#' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-white/40 hover:text-neon text-sm transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            &copy; {new Date().getFullYear()} SportAddict Gear Service. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(item => (
              <a key={item} href="#" className="text-white/25 hover:text-neon text-sm transition-colors">{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <HowItWorks />
      <SportsCategories />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}
