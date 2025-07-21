"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Star, MapPin, Phone, Mail, Instagram, Facebook, Twitter, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function SeasonsWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  const sections = ["home", "about", "laboratory", "signature-drinks", "reviews", "find-us"]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const newSection = Math.floor(scrollPosition / windowHeight)
      setCurrentSection(Math.min(newSection, sections.length - 1))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const scrollToNext = () => {
    const nextSection = Math.min(currentSection + 1, sections.length - 1)
    scrollToSection(sections[nextSection])
  }

  const signatureDrinks = [
    {
      name: "Amalfi.",
      description: "Limoncello, gin, fresh lemon, basil",
      image: "/images/amalfi-cocktail.jpg",
    },
    {
      name: "Spring Awakening.",
      description: "Gin, elderflower, cucumber, mint",
      image: "/images/cocktail-hero.jpg",
    },
    {
      name: "Summer Solstice.",
      description: "Rum, passion fruit, mango, coconut",
      image: "/images/cocktail-spray.jpg",
    },
    {
      name: "Autumn Harvest.",
      description: "Bourbon, apple, cinnamon, maple",
      image: "/images/craft-cocktails.jpg",
    },
  ]

  const reviews = [
    {
      name: "S.M.",
      rating: 5,
      text: "Absolutely stunning atmosphere and the cocktails are works of art.",
    },
    {
      name: "J.R.",
      rating: 5,
      text: "Best cocktail bar in the city. True artistry in every glass.",
    },
    {
      name: "TripAdvisor Guest",
      rating: 5,
      text: "Nice and modern bar at the main street. Friendly and helpful staff. Great coffee and drinks for reasonable prices. Nice view to the sea.",
    },
  ]

  return (
    <div className="bg-black text-white">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <motion.div 
              className="flex items-center space-x-3 sm:space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.img 
                src="/images/seasons-logo.jpg" 
                alt="Seasons" 
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover" 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1.2 }}
              />
              <motion.span 
                className="text-xl sm:text-2xl font-light tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >SEASONS</motion.span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              className="hidden md:flex space-x-6 lg:space-x-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {["Home", "About", "Laboratory", "Cocktails", "Reviews", "Contact"].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(sections[index])}
                  className={`text-sm font-light tracking-wider transition-colors duration-300 ${
                    currentSection === index ? "text-amber-400" : "text-white hover:text-amber-400"
                  }`}
                  whileHover={{ y: -3, scale: 1.05 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 17,
                    delay: 0.4 + index * 0.1, 
                    duration: 0.5 
                  }}
                >
                  {item.toUpperCase()}
                </motion.button>
              ))}
            </motion.div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="text-white hover:text-amber-400 transition-colors p-2"
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1, rotate: isMenuOpen ? 0 : 5 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? 'close' : 'open'}
                    initial={{ opacity: 0, rotate: isMenuOpen ? -90 : 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: isMenuOpen ? 90 : -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center space-y-8 md:hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                {["Home", "About", "Laboratory", "Cocktails", "Reviews", "Contact"].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(sections[index])}
                    className={`text-2xl font-light tracking-wider transition-colors duration-300 ${currentSection === index ? "text-amber-400" : "text-white"}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.1, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.toUpperCase()}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-10">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/cocktail-hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wider mb-4 sm:mb-8 italic">Seasons.</h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light tracking-wide mb-6 sm:mb-12 opacity-90">COCKTAIL BAR</p>
          <p className="text-base sm:text-lg font-light tracking-wide opacity-80 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mb-8 sm:mb-12">
            Modern cocktails with a view of the sea in the heart of Vlore
          </p>
        </div>
        <button
          onClick={scrollToNext}
          aria-label="Scroll to next section"
          className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-amber-400 transition-colors animate-bounce"
        >
          <ChevronDown size={24} className="sm:w-8 sm:h-8" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-16 sm:py-24 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/craft-cocktails.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic mb-4 sm:mb-6 md:mb-8">Our Story.</h2>
            <p className="text-base sm:text-lg font-light leading-relaxed opacity-90">
              Located on the main street of beautiful Vlore, Albania, Seasons offers a modern cocktail experience with
              stunning views of the sea. Our concept revolves around the natural rhythm of the seasons, crafting unique
              experiences that evolve throughout the year.
            </p>
            <p className="text-base sm:text-lg font-light leading-relaxed opacity-90">
              From the fresh, vibrant flavors of spring to the warm, comforting notes of winter, our menu transforms to
              capture the essence of each season. With friendly staff and reasonable prices, we've earned our reputation
              as Vlore's premier cocktail destination.
            </p>
            <div className="border-l-2 border-amber-400 pl-6">
              <p className="text-xl font-light italic opacity-80">
                "We don't just serve drinks; we craft moments that celebrate the beauty of change."
              </p>
            </div>
          </div>
          <div className="relative mt-6 md:mt-0">
            <img
              src="/images/craft-cocktails.jpg"
              alt="Seasons Interior"
              className="w-full h-64 sm:h-80 md:h-96 object-cover object-top rounded-sm shadow-lg"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Laboratory Section */}
      <section id="laboratory" className="min-h-screen flex items-center justify-center py-16 sm:py-24 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/images/cocktail-spray.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic mb-4 sm:mb-6 md:mb-8">Laboratory.</h2>
            <p className="text-base sm:text-lg font-light leading-relaxed opacity-90">
              Step into our state-of-the-art cocktail laboratory, where innovation meets tradition. Our master
              mixologists experiment with molecular gastronomy and seasonal infusions.
            </p>
            <p className="text-base sm:text-lg font-light leading-relaxed opacity-90">
              From liquid nitrogen cocktails to custom flavor extractions, our lab is where the magic happens. Every
              signature drink begins as an experiment.
            </p>
            <div className="flex items-center space-x-3 sm:space-x-4 pt-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-lg sm:text-xl">⚗️</span>
              </div>
              <div>
                <h4 className="font-light text-amber-400 tracking-wide text-sm sm:text-base">INNOVATION IN EVERY DROP</h4>
                <p className="text-xs sm:text-sm opacity-70 font-light">Where science meets artistry</p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-sm mt-6 md:mt-0">
            <div className="bg-zinc-900 rounded-sm p-4">
              <video
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-sm"
                controls
                poster="/placeholder.svg?height=320&width=560&text=Laboratory+Video"
                playsInline
              >
                <source src="/videos/laboratory-demo.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Drinks - Individual Sections */}
      {signatureDrinks.map((drink, index) => (
        <motion.section
          key={drink.name}
          id={`drink-${index}`}
          className="min-h-screen relative flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Background Glass Image */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${drink.image})`,
              }}
            />
          </motion.div>

          {/* Animated Overlay Pattern */}
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 50%)`,
            }}
          />

          {/* Content */}
          <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              {/* Drink Number */}
              <motion.div
                className="inline-block mb-6"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-full border-2 border-amber-400 flex items-center justify-center text-amber-400 font-light text-xl">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </motion.div>

              {/* Drink Name */}
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-6 tracking-wider text-white"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, color: "#fbbf24" }}
              >
                {drink.name}
              </motion.h2>

              {/* Decorative Line */}
              <motion.div
                className="w-24 h-px bg-amber-400 mx-auto mb-8"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 96, opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
              />

              {/* Description */}
              <motion.p
                className="text-lg sm:text-xl md:text-2xl font-light opacity-90 max-w-2xl mx-auto leading-relaxed text-white mb-12"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
              >
                {drink.description}
              </motion.p>

              {/* Animated CTA Button */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                viewport={{ once: true }}
              >
                <motion.button
                  className="group relative px-8 py-4 bg-transparent border-2 border-amber-400 text-amber-400 font-light tracking-wider hover:bg-amber-400 hover:text-black transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span
                    className="relative z-10"
                    initial={false}
                    animate={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    EXPERIENCE THIS COCKTAIL
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-amber-400 transform origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full opacity-60"
            animate={{
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
            }}
          />
          <motion.div
            className="absolute bottom-32 right-16 w-1 h-1 bg-amber-400 rounded-full opacity-40"
            animate={{
              y: [0, -15, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.7,
            }}
          />
          <motion.div
            className="absolute top-1/3 right-20 w-1.5 h-1.5 bg-amber-400 rounded-full opacity-50"
            animate={{
              y: [0, -25, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />

          {/* Scroll Indicator */}
          {index < signatureDrinks.length - 1 && (
            <motion.div
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              viewport={{ once: true }}
              onClick={() => scrollToSection(`drink-${index + 1}`)}
              whileHover={{ scale: 1.1 }}
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              <ChevronDown className="w-6 h-6 text-amber-400" />
            </motion.div>
          )}
        </motion.section>
      ))}

      {/* Signature Drinks Overview Section */}
      <section id="signature-drinks" className="min-h-screen py-12 sm:py-20 px-4 sm:px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 tracking-wide">SIGNATURE COCKTAILS</h2>
            <div className="w-16 sm:w-24 h-px bg-amber-400 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg font-light opacity-80 max-w-2xl mx-auto leading-relaxed">
              Crafted with precision, served with passion. Each cocktail tells a story of the season.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {signatureDrinks.map((drink, index) => (
              <motion.div
                key={drink.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => scrollToSection(`drink-${index}`)}
              >
                <div className="relative overflow-hidden rounded-lg bg-black/50 backdrop-blur-sm border border-zinc-800 hover:border-amber-400/50 transition-all duration-500">
                  <div className="aspect-[4/3] relative">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-light mb-2 tracking-wide text-white group-hover:text-amber-400 transition-colors duration-300">
                      {drink.name}
                    </h3>
                    <p className="text-sm sm:text-base font-light opacity-80 leading-relaxed">
                      {drink.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="min-h-screen flex items-center justify-center py-16 sm:py-24 relative bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic mb-4 sm:mb-6 md:mb-8">Reviews.</h2>
            <p className="text-base sm:text-lg font-light opacity-80">What our guests say about the Seasons experience</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {reviews.map((review, index) => (
              <div key={index} className="text-center space-y-4 sm:space-y-6 bg-zinc-900/50 p-6 rounded-sm">
                <div className="flex justify-center mb-2 sm:mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base sm:text-lg font-light italic opacity-90">"{review.text}"</p>
                <p className="text-sm sm:text-base font-light tracking-wider opacity-70">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section id="find-us" className="min-h-screen flex items-center justify-center py-16 sm:py-24 relative bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic mb-4 sm:mb-6 md:mb-8">Find Us.</h2>
            <p className="text-base sm:text-lg font-light opacity-80">Visit us and experience the art of seasonal cocktails</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
            {/* Contact Information */}
            <div className="space-y-8 sm:space-y-12">
              <div>
                <h3 className="text-xl sm:text-2xl font-light mb-4 sm:mb-8 tracking-wide">CONTACT</h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                    <span className="font-light text-sm sm:text-base">Main Street, Vlore, Albania</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                    <span className="font-light text-sm sm:text-base">+355 XX XXX XXX</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                    <span className="font-light text-sm sm:text-base">hello@seasonsbar.al</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-light mb-4 sm:mb-8 tracking-wide">HOURS</h3>
                <div className="space-y-2 sm:space-y-3 font-light text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium sm:font-light">Monday - Thursday</span>
                    <span>8:00 AM - 2:00 AM</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium sm:font-light">Friday - Saturday</span>
                    <span>8:00 AM - 2:30 AM</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="font-medium sm:font-light">Sunday</span>
                    <span>8:00 AM - 2:00 AM</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-light mb-4 sm:mb-8 tracking-wide">FOLLOW</h3>
                <div className="flex space-x-4 sm:space-x-6">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black bg-transparent h-9 w-9 sm:h-10 sm:w-10"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black bg-transparent h-9 w-9 sm:h-10 sm:w-10"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black bg-transparent h-9 w-9 sm:h-10 sm:w-10"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 lg:mt-0">
              <div className="bg-black rounded-sm p-2 sm:p-4 h-64 sm:h-80 md:h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.507868314758!2d19.495599999999996!3d40.441894999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1345334c8bb7048f%3A0x777d45673c56ac17!2sSeasons%20Cocktail%20Bar!5e0!3m2!1sen!2s!4v1752772149793!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-sm"
                  title="Seasons Cocktail Bar location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 sm:py-12 px-4 sm:px-6 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
            <img src="/images/seasons-logo.jpg" alt="Seasons" className="h-7 w-7 sm:h-8 sm:w-8 rounded-full object-cover" />
            <span className="text-lg sm:text-xl font-light tracking-wider">SEASONS</span>
          </div>
          <p className="text-sm sm:text-base font-light opacity-70 mb-3 sm:mb-4">Where Every Sip Tells a Story</p>
          <p className="text-xs sm:text-sm font-light opacity-50">© 2024 Seasons Cocktail Bar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
