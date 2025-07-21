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
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-black/95 backdrop-blur-lg border-t border-zinc-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {["Home", "About", "Laboratory", "Cocktails", "Reviews", "Contact"].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(sections[index])}
                    className={`block w-full text-left py-3 px-4 rounded-lg text-base font-light tracking-wider transition-colors ${
                      currentSection === index ? "text-amber-400 bg-amber-400/10" : "text-white hover:text-amber-400 hover:bg-white/5"
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.toUpperCase()}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Enhanced Background with Luxurious Fade-in */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <motion.div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/Screenshot 2025-07-17 200513.jpg')`,
            }}
            initial={{ scale: 1.02 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          {/* Subtle overlay for depth */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>
        
        {/* Content with Staggered Luxurious Entrance */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wider mb-6 sm:mb-8"
            initial={{ y: 80, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.4, 
              delay: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94] // Custom cubic-bezier for luxurious feel
            }}
          >
            SEASONS
          </motion.h1>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl font-light tracking-wide mb-8 sm:mb-12 opacity-90"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 0.9 }}
            transition={{ 
              duration: 1.2, 
              delay: 1.3, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            Where Every Sip Tells a Story
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1, 
              delay: 1.8, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={() => scrollToSection("signature-drinks")}
                className="bg-amber-400 hover:bg-amber-500 text-black font-medium px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg tracking-wide transition-all duration-300"
              >
                EXPLORE COCKTAILS
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                onClick={() => scrollToSection("find-us")}
                variant="outline"
                className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg tracking-wide transition-all duration-300 bg-transparent"
              >
                VISIT US
              </Button>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToNext}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
        </motion.div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wider mb-6 sm:mb-8">OUR STORY</h2>
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg font-light leading-relaxed opacity-90">
                <p>
                  Nestled in the heart of the city, Seasons is more than just a cocktail bar—it's a journey through time and taste. Our master mixologists craft each drink with precision, using only the finest ingredients and innovative techniques.
                </p>
                <p>
                  From classic cocktails reimagined to our signature seasonal creations, every sip tells a story of craftsmanship, creativity, and passion. Our intimate atmosphere and attention to detail create the perfect setting for unforgettable moments.
                </p>
                <p>
                  Whether you're celebrating a special occasion or simply seeking the perfect drink, Seasons offers an experience that transcends the ordinary.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-amber-400/20 to-transparent">
                <img 
                  src="/Screenshot 2025-07-21 181917.jpg" 
                  alt="Seasons Bar Screenshot" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Laboratory Section */}
      <section id="laboratory" className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wider mb-4 sm:mb-6">THE LABORATORY</h2>
            <p className="text-lg sm:text-xl font-light opacity-90 max-w-3xl mx-auto">
              Where innovation meets tradition. Our laboratory is where we experiment, create, and perfect every cocktail that graces our menu.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: "Precision",
                description: "Every measurement matters. We use scientific precision to ensure consistency and perfection in every drink.",
                icon: "⚗️"
              },
              {
                title: "Innovation",
                description: "Constantly pushing boundaries with new techniques, ingredients, and flavor combinations.",
                icon: "🧪"
              },
              {
                title: "Craftsmanship",
                description: "Years of experience and passion come together to create liquid artistry in every glass.",
                icon: "🎨"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="text-center p-6 sm:p-8 rounded-lg bg-black/30 backdrop-blur-sm border border-zinc-800"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6">{item.icon}</div>
                <h3 className="text-xl sm:text-2xl font-light tracking-wide mb-3 sm:mb-4">{item.title}</h3>
                <p className="font-light opacity-90 text-sm sm:text-base">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Drinks Section - Enhanced with Individual Panels */}
      <section id="signature-drinks" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16 sm:mb-24"
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider mb-6 sm:mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              SIGNATURE COCKTAILS
            </motion.h2>
            <motion.p 
              className="text-lg sm:text-xl font-light opacity-90 max-w-3xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 0.9 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Each cocktail tells a unique story through carefully selected ingredients and masterful craftsmanship.
            </motion.p>
          </motion.div>
        </div>

        {/* Individual Cocktail Panels */}
        <div className="space-y-32 sm:space-y-40">
          {signatureDrinks.map((drink, index) => {
            const isEven = index % 2 === 0;
            const ingredients = drink.description.split(', ');
            
            return (
              <motion.div
                key={drink.name}
                className="relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-200px" }}
              >
                {/* Background Gradient for Each Panel */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-amber-400/5 via-transparent to-transparent`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.3 }}
                  viewport={{ once: true }}
                />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}>
                    
                    {/* Image Section */}
                    <motion.div
                      className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                      initial={{ 
                        x: isEven ? -100 : 100, 
                        opacity: 0, 
                        scale: 0.8,
                        rotateY: isEven ? -15 : 15
                      }}
                      whileInView={{ 
                        x: 0, 
                        opacity: 1, 
                        scale: 1,
                        rotateY: 0
                      }}
                      transition={{ 
                        duration: 1.2, 
                        delay: 0.2,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      viewport={{ once: true, margin: "-150px" }}
                      whileHover={{ 
                        scale: 1.05, 
                        rotateY: isEven ? 5 : -5,
                        transition: { duration: 0.6, ease: "easeOut" }
                      }}
                    >
                      <div className="relative group">
                        {/* Floating Elements */}
                        <motion.div
                          className="absolute -top-4 -right-4 w-20 h-20 bg-amber-400/10 rounded-full blur-xl"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                        />
                        
                        <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-400/20 to-transparent p-1">
                          <div className="w-full h-full rounded-xl overflow-hidden">
                            <motion.img 
                              src={drink.image} 
                              alt={drink.name}
                              className="w-full h-full object-cover"
                              initial={{ scale: 1.2 }}
                              whileInView={{ scale: 1 }}
                              transition={{ duration: 1.5, ease: "easeOut" }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.1 }}
                            />
                          </div>
                        </div>
                        
                        {/* Overlay Effects */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </motion.div>
                    
                    {/* Content Section */}
                    <motion.div
                      className={`space-y-6 sm:space-y-8 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                      initial={{ 
                        x: isEven ? 100 : -100, 
                        opacity: 0 
                      }}
                      whileInView={{ 
                        x: 0, 
                        opacity: 1 
                      }}
                      transition={{ 
                        duration: 1, 
                        delay: 0.4,
                        ease: [0.25, 0.46, 0.45, 0.94]
                      }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      {/* Cocktail Name */}
                      <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                      >
                        <motion.h3 
                          className="text-4xl sm:text-5xl md:text-6xl font-light tracking-wider text-amber-400 mb-2"
                          whileHover={{ 
                            scale: 1.05,
                            textShadow: "0 0 20px rgba(251, 191, 36, 0.5)"
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {drink.name}
                        </motion.h3>
                        <motion.div
                          className="w-20 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"
                          initial={{ width: 0 }}
                          whileInView={{ width: 80 }}
                          transition={{ duration: 1, delay: 0.8 }}
                          viewport={{ once: true }}
                        />
                      </motion.div>
                      
                      {/* Ingredients with Staggered Animation */}
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: true }}
                      >
                        <motion.h4 
                          className="text-lg sm:text-xl font-light tracking-wide opacity-70 uppercase"
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 0.7 }}
                          transition={{ duration: 0.6, delay: 1 }}
                          viewport={{ once: true }}
                        >
                          Ingredients
                        </motion.h4>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          {ingredients.map((ingredient, ingredientIndex) => (
                            <motion.div
                              key={ingredient}
                              className="group cursor-pointer"
                              initial={{ 
                                scale: 0.8, 
                                opacity: 0, 
                                y: 20 
                              }}
                              whileInView={{ 
                                scale: 1, 
                                opacity: 1, 
                                y: 0 
                              }}
                              transition={{ 
                                duration: 0.5, 
                                delay: 1.2 + (ingredientIndex * 0.1),
                                ease: [0.25, 0.46, 0.45, 0.94]
                              }}
                              viewport={{ once: true }}
                              whileHover={{ 
                                scale: 1.05,
                                y: -2
                              }}
                            >
                              <div className="bg-black/30 backdrop-blur-sm border border-amber-400/20 rounded-lg p-3 sm:p-4 group-hover:border-amber-400/40 group-hover:bg-amber-400/5 transition-all duration-300">
                                <span className="text-sm sm:text-base font-light capitalize group-hover:text-amber-400 transition-colors">
                                  {ingredient.trim()}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                      
                      {/* Experience Description */}
                      <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.5 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-base sm:text-lg font-light leading-relaxed opacity-90">
                          {index === 0 && "A Mediterranean escape in a glass. The bright citrus notes dance with aromatic herbs, creating a refreshing symphony that transports you to the sun-soaked Amalfi coast."}
                          {index === 1 && "Delicate and refreshing, this cocktail captures the essence of spring's first bloom. Floral notes intertwine with crisp botanicals for a truly awakening experience."}
                          {index === 2 && "Bold tropical flavors meet smooth rum in this celebration of summer's peak. Each sip delivers waves of exotic fruit balanced with creamy coconut undertones."}
                          {index === 3 && "Warm spices and rich bourbon create the perfect autumn companion. Apple and maple notes provide comfort while cinnamon adds the perfect seasonal warmth."}
                        </p>
                        
                        <motion.div
                          className="flex items-center space-x-4 pt-4"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.6, delay: 1.8 }}
                          viewport={{ once: true }}
                        >
                          <motion.div
                            className="flex items-center space-x-1"
                            whileHover={{ scale: 1.1 }}
                          >
                            {[...Array(5)].map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                transition={{ 
                                  duration: 0.5, 
                                  delay: 2 + (i * 0.1),
                                  type: "spring",
                                  stiffness: 200
                                }}
                                viewport={{ once: true }}
                              >
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              </motion.div>
                            ))}
                          </motion.div>
                          <motion.span 
                            className="text-sm font-light opacity-70"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 0.7 }}
                            transition={{ duration: 0.5, delay: 2.5 }}
                            viewport={{ once: true }}
                          >
                            Signature Creation
                          </motion.span>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <motion.div
                  className={`absolute top-1/2 ${isEven ? 'right-0' : 'left-0'} w-1 h-32 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent`}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="min-h-screen flex items-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wider mb-4 sm:mb-6">WHAT PEOPLE SAY</h2>
            <p className="text-lg sm:text-xl font-light opacity-90">
              Don't just take our word for it. Here's what our guests have to say about their Seasons experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                className="bg-black/40 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-zinc-800"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex mb-4 sm:mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="font-light mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed opacity-90">
                  "{review.text}"
                </p>
                <p className="font-medium text-amber-400 text-sm sm:text-base">— {review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Find Us Section */}
      <section id="find-us" className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wider mb-4 sm:mb-6">FIND US</h2>
            <p className="text-lg sm:text-xl font-light opacity-90 max-w-3xl mx-auto">
              Located in the heart of the city, Seasons is your destination for exceptional cocktails and unforgettable experiences.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-light mb-4 sm:mb-6 tracking-wide">CONTACT</h3>
                <div className="space-y-3 sm:space-y-4 font-light text-sm sm:text-base">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                    <span> Street Murat Tërbaçi</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                    <span>+355692092603</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                    <span>hello@seasonsbar.com</span>
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
                    onClick={() => window.open('https://www.instagram.com/seasons.cocktail.bar/', '_blank')}
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
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
