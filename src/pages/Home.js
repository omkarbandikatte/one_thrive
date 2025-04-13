import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial} from '@react-three/drei';
import { TypeAnimation } from 'react-type-animation';

// Services data
const services = [
  {
    icon: "🎮",
    title: "Team Building Games",
    description: "Interactive games designed to strengthen team bonds and improve communication."
  },
  {
    icon: "🧘",
    title: "Wellness Programs",
    description: "Comprehensive wellness initiatives to promote physical and mental health."
  },
  {
    icon: "🎨",
    title: "Creative Workshops",
    description: "Hands-on creative sessions to spark innovation and team collaboration."
  }
];

// Custom component for the animated sphere
const AnimatedSphere = () => {
  const sphereRef = useRef();
  
  // Auto-rotation animation
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial
        color="#22C55E"
        wireframe
        transparent
        opacity={0.8}
        distort={0.4}
        speed={2}
        roughness={0}
      />
    </Sphere>
  );
};

// Scroll animation component with spring physics
const ScrollAnimation = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const y = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.9, 1], 
    direction === "up" ? [50, 0, 0, 0] : 
    direction === "down" ? [-50, 0, 0, 0] : 
    direction === "left" ? [50, 0, 0, 0] : [50, 0, 0, 0]
  ), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const x = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.9, 1], 
    direction === "left" ? [50, 0, 0, 0] : 
    direction === "right" ? [-50, 0, 0, 0] : [0, 0, 0, 0]
  ), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0.8, 1, 1, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, x, scale }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

// Reveal animation component
const RevealAnimation = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });
  
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.2, 0.9, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)"]
  );
  
  return (
    <motion.div
      ref={ref}
      style={{ clipPath }}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  return (
    <div className="min-h-screen bg-white">
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#22C55E] origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Canvas className="w-full h-full">
            <OrbitControls 
              enableZoom={false} 
              autoRotate
              autoRotateSpeed={0.5}
              enablePan={false}
            />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
          </Canvas>
        </motion.div>
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left lg:w-1/2"
            >
              <TypeAnimation
                sequence={[
                  'Because Work\nShould Be More\nThan Just Work!',
                  1000,
                ]}
                wrapper="h1"
                speed={50}
                className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight whitespace-pre-line"
                repeat={Infinity}
              />
              <p className="text-xl md:text-2xl text-white font-medium mb-12 leading-relaxed">
                We curate <span className="text-[#22C55E] font-semibold">immersive experiences</span> that turn colleagues into communities 
                and challenges into opportunities.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#22C55E] text-white px-10 py-5 rounded-full text-xl font-semibold hover:bg-[#1a9e4a] transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Get Started Today
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2"
            >
              <img 
                src="/images/party.png" 
                alt="Team Celebration" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { number: "10+", text: "Teams Engaged" },
              { number: "80%", text: "Positive Response" },
              { number: "90%", text: "Participation Rate" },
              { number: "100+", text: "Activities Designed" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  backgroundColor: "#f8fafc"
                }}
                className="text-center p-8 rounded-xl bg-white border border-gray-100 transition-all duration-300 cursor-pointer"
              >
                <motion.h3 
                  className="text-5xl font-bold text-[#22C55E] mb-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {stat.number}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 text-lg font-medium"
                  whileHover={{ color: "#22C55E" }}
                >
                  {stat.text}
                </motion.p>
              </motion.div>
            ))}
          </div>
          
          {/* Team Collaboration Section */}
          <div className="mt-24">
            <ScrollAnimation>
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="lg:w-1/2">
                  <h2 className="text-4xl font-bold text-black mb-6">Team Collaboration</h2>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    Our team-building activities are designed to foster collaboration, 
                    improve communication, and strengthen bonds between team members. 
                    We create immersive experiences that turn colleagues into communities.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#22C55E] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#1a9e4a] transition-all duration-300 shadow-lg"
                  >
                    Learn More
                  </motion.button>
                </div>
                <div className="lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="rounded-2xl overflow-hidden shadow-2xl"
                  >
                    <img 
                      src="/images/teamcollab.png" 
                      alt="Team Collaboration" 
                      className="w-full h-auto"
                    />
                  </motion.div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-32 bg-black text-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-5xl font-bold text-center mb-16">ABOUT US</h2>
          </ScrollAnimation>
          
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <ScrollAnimation direction="left" className="lg:w-1/2">
                <div>
                  <h3 className="text-4xl font-bold mb-8 leading-tight">
                    Building Better Workplaces,<br />
                    One Team at a Time
                  </h3>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    <span className="font-semibold">OneThrive is more than just an employee engagement company—we are workplace culture architects.</span> 
                    We know that a motivated workforce drives business success. That's why OneThrive is dedicated to delivering high-energy engagement solutions that make workplaces more dynamic, fulfilling, and fun.
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    As a new player in this space, we bring a fresh perspective, commitment to excellence, and a client-first mindset to every project, helping you build a workplace that's as dynamic as your thriving team.
                  </p>
                </div>
              </ScrollAnimation>
              
              <ScrollAnimation direction="right" className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="rounded-2xl overflow-hidden shadow-2xl"
                >
                  <img 
                    src="/images/work.png" 
                    alt="About OneThrive" 
                    className="w-full h-auto"
                  />
                </motion.div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <RevealAnimation>
            <h2 className="text-4xl font-bold text-center mb-16 text-white">
              Tailored Services for Your Company's Growth
            </h2>
          </RevealAnimation>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimation direction="up">
              <motion.div 
                className="bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="text-[#22C55E] text-4xl mb-4">🎮</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Team Building Games</h3>
                <p className="text-gray-300">
                  From problem-solving challenges to outdoor adventures, our interactive Team Building games are designed to strengthen communication, trust, and collaboration.
                </p>
              </motion.div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.2}>
              <motion.div 
                className="bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="text-[#22C55E] text-4xl mb-4">🧘</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Wellness Programs</h3>
                <p className="text-gray-300">
                  With a strong focus on physical and mental health, our wellness programs include activities such as Yoga Classes, Mindfulness Workshops, and Fitness Challenges to help employees manage stress and improve overall well-being.
                </p>
              </motion.div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.4}>
              <motion.div 
                className="bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="text-[#22C55E] text-4xl mb-4">🎨</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Creative Workshops</h3>
                <p className="text-gray-300">
                  Unlock your team's creative potential with our hands-on workshops. Whether it's Canvas Painting or Clay Modelling, our sessions are crafted to inspire creative solutions and fresh perspectives.
                </p>
              </motion.div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.6}>
              <motion.div 
                className="bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="text-[#22C55E] text-4xl mb-4">🏆</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Sports Tournaments</h3>
                <p className="text-gray-300">
                  Foster a healthy competitive spirit with our sports event activities. From Company Sports Days and Office Olympics to Friendly Tournaments, we create experiences that unite teams and promote camaraderie.
                </p>
              </motion.div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={0.8}>
              <motion.div 
                className="bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="text-[#22C55E] text-4xl mb-4">🎭</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Entertainment Events</h3>
                <p className="text-gray-300">
                  Our live entertainment events provide fun and engaging ways for employees to bond and relax, promoting a healthy work-life balance and creating lasting memories.
                </p>
              </motion.div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={1.0}>
              <motion.div 
                className="bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="text-[#22C55E] text-4xl mb-4">🌱</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Corporate Social Responsibility</h3>
                <p className="text-gray-300">
                  Empower your workforce to give back. Our CSR programs facilitate environmental sustainability projects, and community outreach initiatives that not only benefit society but also build a strong sense of purpose within your team.
                </p>
              </motion.div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="up" delay={1.2}>
              <motion.div 
                className="bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ y: -10 }}
              >
                <div className="text-[#22C55E] text-4xl mb-4">🏖️</div>
                <h3 className="text-2xl font-semibold mb-4 text-white">Offsite Retreats</h3>
                <p className="text-gray-300">
                  Our offsite retreats combine professional development with recreational activities, providing a refreshing change of scenery that fuels creativity and team spirit.
                </p>
              </motion.div>
            </ScrollAnimation>
          </div>
          
          <div className="mt-16 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#22C55E] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#1a9e4a] transition-colors duration-300 shadow-lg"
            >
              Explore All Services
            </motion.button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-[#22C55E] to-[#1a9e4a] text-white">
        <div className="container mx-auto px-4">
          <RevealAnimation>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-5xl font-bold text-white mb-8 leading-tight">
                Ready to Transform Your Workplace?
              </h2>
              <p className="text-xl text-white text-opacity-90 mb-12 leading-relaxed">
                Join the companies that have already elevated their team culture with OneThrive.
                Let's create an engaging workplace together.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#22C55E] px-10 py-5 rounded-full text-xl font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Get Started Today
              </motion.button>
            </div>
          </RevealAnimation>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollAnimation>
              <h2 className="text-5xl font-bold text-center mb-16">Get in Touch</h2>
            </ScrollAnimation>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <ScrollAnimation direction="left">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white h-32"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#22C55E] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#1a9e4a] transition-all duration-300"
                  >
                    Send Message
                  </motion.button>
                </form>
              </ScrollAnimation>

              <ScrollAnimation direction="right">
                <div className="space-y-12">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center space-x-3">
                        <span className="text-[#22C55E] text-xl">📞</span>
                        <a href="tel:+919137849313" className="hover:text-[#22C55E] transition-colors duration-300">+91 9137849313</a>
                        <span className="text-[#22C55E] text-xl">📞</span>
                        <a href="tel:+917718840072" className="hover:text-[#22C55E] transition-colors duration-300">+91 7718840072</a>
                      </li>
                      <li className="flex items-center space-x-3">
                        <span className="text-[#22C55E] text-xl">✉️</span>
                        <a href="mailto:info.onethrive@gmail.com" className="hover:text-[#22C55E] transition-colors duration-300">info.onethrive@gmail.com</a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold mb-6">Connect With Us</h3>
                    <div className="flex space-x-4">
                      <motion.a
                        href="https://linkedin.com/company/onethrive.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center hover:bg-[#1a9e4a] transition-colors duration-300"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </motion.a>
                      <motion.a
                        href="https://instagram.com/onethrive.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 rounded-full bg-[#22C55E] flex items-center justify-center hover:bg-[#1a9e4a] transition-colors duration-300"
                      >
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">
            <div className="space-y-6">
              <motion.a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <img 
                  src="/images/logo.png" 
                  alt="OneThrive Logo" 
                  className="h-12 w-auto"
                />
              </motion.a>
              <p className="text-gray-400 leading-relaxed">
                Transforming workplace culture through innovative engagement solutions and team-building experiences.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <motion.a
                    href="#about"
                    className="text-gray-400 hover:text-[#22C55E] transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    About
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#services"
                    className="text-gray-400 hover:text-[#22C55E] transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Services
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    href="#contact"
                    className="text-gray-400 hover:text-[#22C55E] transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    Contact
                  </motion.a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Services</h3>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index}>
                    <motion.a
                      href="#services"
                      className="text-gray-400 hover:text-[#22C55E] transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      {service.title}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400">© 2025 OneThrive. All Rights Reserved.</p>
              <div className="flex space-x-6">
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-[#22C55E] text-sm transition-colors duration-300"
                  whileHover={{ y: -2 }}
                >
                  Privacy Policy
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-[#22C55E] text-sm transition-colors duration-300"
                  whileHover={{ y: -2 }}
                >
                  Terms of Service
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 