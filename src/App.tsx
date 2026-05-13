/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from "motion/react";
import { 
  Diamond, 
  ArrowUpRight,
  Menu, 
  X,
  MapPin,
  Circle,
  Star,
  ChevronRight,
  ChevronLeft,
  Quote
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// --- Assets ---
import logo from "./assets/logo-luminni.svg";
import drLuis from "./assets/dr-luis.png";
import draLuciane from "./assets/dra-luciane.png";
import draNicole from "./assets/dra-nicole.png";
import draNidia from "./assets/dra-nidia.png";
import clinicImg from "./assets/clinic-experience.png";
import heroImg from "./assets/luminni-odontologia.png";
import serviceImplants from "./assets/service-implants.png";
import serviceVeneers from "./assets/service-veneers.png";
import serviceInvisalign from "./assets/service-invisalign.png";
import ctaImg from "./assets/cta-relief.png";

// --- Components ---

const SpinningText = ({ text = "AGENDE SUA CONSULTA • LUMINNI • ", size = 120 }) => {
  return (
    <motion.div 
      className="relative flex items-center justify-center cursor-pointer group"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        className="absolute inset-0 animate-spin-slow"
        style={{ originX: "50%", originY: "50%" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            id="textPath"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-brand-gold">
            <textPath href="#textPath">{text}</textPath>
          </text>
        </svg>
      </motion.div>
      <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-white p-2 transition-transform group-hover:rotate-45">
        <ArrowUpRight size={20} />
      </div>
    </motion.div>
  );
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Adicionamos uma pequena histerese para evitar o "flicker" no mobile
    if (latest > 80 && !scrolled) setScrolled(true);
    if (latest < 20 && scrolled) setScrolled(false);
  });

  // Bloquear o scroll quando o menu mobile estiver aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
    <nav 
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 transition-all duration-500 will-change-transform ${
        scrolled 
          ? "bg-brand-dark/95 backdrop-blur-md border-b border-white/5 py-4 shadow-lg" 
          : "bg-transparent py-6 md:py-10"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={logo} 
            alt="Luminni Logo" 
            className={`h-8 sm:h-10 md:h-14 w-auto object-contain transition-all duration-500 ${
              scrolled ? "brightness-110" : "brightness-100"
            }`} 
          />
        </div>
        
        <div className={`hidden md:flex items-center space-x-12 text-[10px] uppercase tracking-widest font-bold transition-colors duration-500 ${
          scrolled ? "text-white" : "text-brand-dark"
        }`}>
          <a href="#experiencia" className="hover:text-brand-gold transition-colors">A Experiência</a>
          <a href="#servicos" className="hover:text-brand-gold transition-colors">Design de Sorriso</a>
          <a href="#equipe" className="hover:text-brand-gold transition-colors">Corpo clínico</a>
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contato" 
            className={`px-8 py-3 rounded-full transition-all shadow-xl ${
              scrolled ? "bg-brand-gold text-brand-dark hover:bg-white" : "bg-brand-dark text-white hover:bg-brand-gold"
            }`}
          >
            Reservar
          </motion.a>
        </div>

        <button 
          className={`md:hidden p-2 transition-colors ${scrolled ? "text-white" : "text-brand-dark"}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>

    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-brand-dark z-[100] flex flex-col items-center justify-center space-y-12"
        >
          <button 
            className="absolute top-8 right-8 text-white p-4 hover:rotate-90 transition-transform" 
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={40} />
          </button>
          <a href="#experiencia" onClick={() => setIsOpen(false)} className="text-3xl sm:text-5xl font-serif text-white hover:italic hover:text-brand-gold transition-all">Experiência</a>
          <a href="#servicos" onClick={() => setIsOpen(false)} className="text-3xl sm:text-5xl font-serif text-white hover:italic hover:text-brand-gold transition-all">Serviços</a>
          <a href="#equipe" onClick={() => setIsOpen(false)} className="text-3xl sm:text-5xl font-serif text-white hover:italic hover:text-brand-gold transition-all">Especialistas</a>
          <a href="#contato" onClick={() => setIsOpen(false)} className="text-3xl sm:text-5xl font-serif text-white hover:italic hover:text-brand-gold transition-all">Contato</a>
          
          <div className="pt-12">
             <img src={logo} alt="Logo" className="h-8 opacity-20 invert" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

// --- Sections ---

function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] md:min-h-[110vh] overflow-hidden flex flex-col items-center pt-32 pb-12 md:pt-48 md:pb-20 px-6">
      <div className="absolute inset-0 bg-white z-0" />
      
      <motion.div 
        style={{ translateY: y1 }}
        className="max-w-7xl w-full text-center relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex items-center justify-center space-x-2 md:space-x-4 mb-4"
        >
          <div className="h-px w-8 md:w-12 bg-brand-gold" />
          <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.5em] text-brand-gold whitespace-nowrap">Excellence in Dental Care</span>
          <div className="h-px w-8 md:w-12 bg-brand-gold" />
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-7xl lg:text-9xl font-serif text-brand-dark leading-[1.1] lg:leading-[0.9] mb-8 md:mb-12 tracking-tight px-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          A tecnologia e a precisão que o seu <i className="text-brand-gold italic">sorriso</i> merece.
        </motion.h1>

        <div className="flex flex-col items-center space-y-8 mb-12 md:mb-20">
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed px-4">
            Esqueça a odontologia tradicional. Na Luminni, unimos ciência avançada, estética refinada e um cuidado humanizado para transformar a sua saúde bucal em Balneário Camboriú e Itajaí.
          </p>
          <div className="absolute -right-4 bottom-0 md:right-10 md:bottom-20 scale-75 md:scale-100 z-20">
            <SpinningText />
          </div>
        </div>
      </motion.div>

      <motion.div 
        style={{ scale }}
        className="w-full max-w-screen-2xl aspect-[4/3] md:aspect-[21/9] rounded-[30px] md:rounded-[40px] overflow-hidden shadow-2xl relative"
      >
        <img 
          src={heroImg} 
          alt="Luminni Clinic Interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/20" />
      </motion.div>
    </section>
  );
}

function Stats() {
  const data = [
    { num: "12+", label: "Anos de Ciência Clínica" },
    { num: "35", label: "Especialistas Certificados" },
    { num: "10k+", label: "Pacientes Satisfeitos" },
  ];

  return (
    <section className="py-16 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 md:gap-8">
        {data.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="text-center group"
          >
            <div className="text-6xl md:text-8xl font-serif text-brand-dark group-hover:text-brand-gold transition-colors duration-500">{stat.num}</div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mt-2">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experiencia" className="py-24 md:py-48 px-6 bg-brand-dark text-white relative">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl lg:text-8xl mb-8 md:mb-12">
            Onde o cuidado se torna <i className="text-brand-gold italic">arte</i>. 
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-lg">
            Sua saúde bucal merece mais do que um procedimento. Na Luminni, cada detalhe é planejado para que a tecnologia de ponta e o conforto absoluto transformem sua percepção sobre ir ao dentista.
          </p>
          <div className="space-y-8">
            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                <Diamond size={20} />
              </div>
              <div>
                <h3 className="text-2xl mb-2 font-serif text-white transition-colors group-hover:text-brand-gold">Tecnologia de Ponta</h3>
                <p className="text-gray-500">Diagnósticos precisos para resultados mais rápidos e seguros via fluxo digital 3D.</p>
              </div>
            </div>
            <div className="flex items-start space-x-6 group">
              <div className="w-12 h-12 rounded-full border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all">
                <Diamond size={20} />
              </div>
              <div>
                <h3 className="text-2xl mb-2 font-serif text-white transition-colors group-hover:text-brand-gold">Estética e Função</h3>
                <p className="text-gray-500">Não focamos apenas no visual, mas na harmonia biológica e funcional da sua face.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative aspect-square">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-full h-full rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl relative z-10"
          >
            <img 
              src={clinicImg} 
              alt="Luminni Clinic Experience" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-32 h-32 md:w-48 md:h-48 bg-brand-gold rounded-full flex items-center justify-center text-brand-dark animate-spin-slow mix-blend-screen z-20 scale-90 md:scale-100">
            <svg viewBox="0 0 100 100" className="w-4/5 h-4/5">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text className="text-[12px] font-bold uppercase tracking-[0.1em] fill-black">
                <textPath href="#circlePath">ESTÉTICA • CIÊNCIA • LUXO • ARTE • </textPath>
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Implantes & Reabilitação",
    desc: "Substituição eficaz de dentes com carga imediata.",
    img: serviceImplants
  },
  {
    title: "Estética & Lentes",
    desc: "O padrão ouro em lentes de porcelana e resina.",
    img: serviceVeneers
  },
  {
    title: "Ortodontia Invisível",
    desc: "Alinhadores estéticos com máxima previsibilidade.",
    img: serviceInvisalign
  }
];

function Services() {
  return (
    <section id="servicos" className="py-24 md:py-48 px-6 md:px-12 bg-white">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between mb-24 gap-12">
        <h2 className="text-4xl md:text-6xl lg:text-8xl max-w-3xl leading-[1.1] lg:leading-[0.9]">
          Tudo o que você precisa para <i className="text-brand-gold italic">sorrir com segurança</i>.
        </h2>
        <div className="max-w-md self-end">
          <p className="text-gray-500 mb-8 border-l-2 border-brand-gold pl-6 py-2">
            Cada sorriso é único. Por isso, reunimos todas as especialidades no mesmo lugar, garantindo que você não precise ir a outro lugar.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-16">
        {services.map((item, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -20 }}
            className="flex flex-col space-y-6 md:space-y-8"
          >
            <div className="aspect-[3/4] rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-xl">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-2">0{i+1}</div>
              <h3 className="text-3xl font-serif mb-4 flex items-center justify-between">
                {item.title} <ArrowUpRight className="text-brand-gold" />
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const team = [
  {
    name: "Dr. Luis Ricardo Prevedello",
    role: "Professor de pós-graduação",
    bio: "10+ anos de experiência em Implantodontia e DTM.",
    img: drLuis
  },
  {
    name: "Dra. Luciane Pizzatto",
    role: "Mestre em Odontologia",
    bio: "Especialista em Ortodontia e expert em Harmonização Facial.",
    img: draLuciane
  },
  {
    name: "Dra. Nicole Gelain",
    role: "Responsável Técnica",
    bio: "Especialista em Endodontia e mestre em Estética Dental.",
    img: draNicole
  },
  {
    name: "Dra. Nídia Westphalen",
    role: "Referência Clínica",
    bio: "Especialista em Endodontia e Reabilitação Oral Estética.",
    img: draNidia
  }
];

function Team() {
  return (
    <section id="equipe" className="py-24 md:py-48 px-6 md:px-12 bg-brand-offwhite">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl lg:text-8xl leading-tight mb-8">Especialistas <i className="text-brand-gold italic">apaixonados</i> por excelência.</h2>
            <div className="h-1 w-24 bg-brand-gold mb-8" />
          </div>
          <p className="max-w-md text-gray-500 text-lg leading-relaxed mb-4">
            Um corpo clínico multidisciplinar que une conhecimento acadêmico e experiência prática para resultados extraordinários.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 xl:gap-20">
          {team.map((dr, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group flex flex-col"
            >
              <div className="aspect-[3/4] bg-brand-dark overflow-hidden rounded-[30px] mb-8 relative shadow-2xl">
                <img 
                  src={dr.img} 
                  alt={dr.name} 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="px-2">
                <h4 className="text-2xl font-serif mb-2 text-brand-dark group-hover:text-brand-gold transition-colors">{dr.name}</h4>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-4">{dr.role}</p>
                <div className="h-px w-8 bg-gray-200 mb-4 group-hover:w-full transition-all duration-500" />
                <p className="text-gray-500 text-sm leading-relaxed font-light">{dr.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 md:py-48 px-6 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto text-center relative">
        <Quote className="absolute -top-8 -left-4 md:-top-12 md:-left-12 text-brand-gold/10 w-24 h-24 md:w-40 md:h-40" />
        <h2 className="text-2xl md:text-4xl lg:text-6xl leading-[1.2] md:leading-[1.1] font-serif mb-12 md:mb-20 italic px-4">
          "A assinatura do nosso trabalho é a <i className="text-brand-gold not-italic">confiança</i> de quem sorri pela primeira vez após o tratamento."
        </h2>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full border border-brand-gold p-1 mb-6">
            <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop" 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
                alt="Patient Profile"
               />
            </div>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-gold mb-1">Mariana S.</div>
          <div className="text-gray-400 text-[8px] uppercase tracking-widest">Empresária</div>
        </div>
      </div>
    </section>
  );
}

function ContactCTA() {
  return (
    <section id="contato" className="py-12 md:py-20 px-4 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-12 bg-brand-dark rounded-[30px] md:rounded-[60px] p-8 md:p-20 text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
           <img 
            src={ctaImg} 
            className="w-full h-full object-cover opacity-30 transition-all duration-700 group-hover:scale-110 group-hover:opacity-50" 
            alt="Artistic Dental Detail"
           />
           <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-brand-dark via-brand-dark/60 to-transparent" />
        </div>
        
        <div className="relative z-10 lg:w-3/5">
          <h2 className="text-4xl md:text-6xl lg:text-8xl leading-[1.1] md:leading-[0.9] mb-8 md:mb-12">
            A melhor versão do seu <i className="text-brand-gold italic">sorriso</i> começa aqui.
          </h2>
        </div>

        <div className="relative z-10 lg:w-2/5 flex items-center justify-center">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto bg-brand-gold text-brand-dark px-6 md:px-12 py-5 md:py-8 rounded-full font-bold text-[11px] md:text-lg uppercase tracking-[0.15em] hover:bg-white transition-all shadow-2xl flex items-center justify-center gap-2 md:gap-3 whitespace-nowrap"
          >
            Quero agendar agora
            <ArrowUpRight size={20} className="hidden md:block" />
            <ChevronRight size={16} className="md:hidden" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function Locations() {
  const locations = [
    {
      city: "Balneário Camboriú",
      address: "Rua 1131, 500 - Sala 01",
      neighborhood: "Centro",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.264627402636!2d-48.63665572455745!3d-26.990150976599723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8b67104d49a71%3A0xb7f5f9e6a0d0d0d0!2sR.%201131%2C%20500%20-%20Centro%2C%20Balne%C3%A1rio%20Cambori%C3%BA%20-%20SC%2C%2088330-675!5e0!3m2!1spt-BR!2sbr!4v1715197800000!5m2!1spt-BR!2sbr"
    },
    {
      city: "Itajaí",
      address: "Rua J. B. Malburg, 105",
      neighborhood: "Centro",
      map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3554.898!2d-48.659!3d-26.906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzIxLjYiUyA0OMKwMzknMzIuNCJX!5e0!3m2!1spt-BR!2sbr!4v1715197900000!5m2!1spt-BR!2sbr"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-20 gap-8 text-left">
          <div>
            <span className="text-brand-gold font-bold uppercase tracking-widest text-[8px] md:text-[10px] mb-4 block">Onde estamos</span>
            <h2 className="text-4xl md:text-7xl font-serif">Nossas <i className="text-brand-gold italic">Unidades</i></h2>
          </div>
          <p className="max-w-xs text-gray-400 text-sm leading-relaxed md:text-right">
            Escolha a unidade mais próxima de você e vivencie o padrão Luminni de atendimento.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {locations.map((loc, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="aspect-video w-full rounded-[40px] overflow-hidden grayscale contrast-125 hover:grayscale-0 transition-all duration-700 border border-gray-100 shadow-sm mb-8">
                <iframe 
                  src={loc.map}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-serif mb-2">{loc.city}</h3>
                  <p className="text-gray-500 text-sm">{loc.address}</p>
                  <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">{loc.neighborhood}</p>
                </div>
                <motion.a 
                  whileHover={{ scale: 1.1, x: 5 }}
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address + " " + loc.city)}`}
                  target="_blank"
                  className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-brand-gold hover:bg-brand-gold hover:text-white transition-all shadow-sm"
                >
                  <MapPin size={20} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const Footer = () => (
  <footer className="py-16 md:py-20 px-6 md:px-12 bg-white border-t border-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
      <div className="flex items-center">
        <img src={logo} alt="Luminni Logo" className="h-8 w-auto object-contain brightness-0 grayscale opacity-80" />
      </div>

      <div className="flex space-x-8 text-[10px] uppercase tracking-widest font-bold text-gray-400">
        <a href="#" className="hover:text-brand-gold transition-colors">Instagram</a>
        <a href="#" className="hover:text-brand-gold transition-colors">Facebook</a>
        <a href="#" className="hover:text-brand-gold transition-colors">WhatsApp</a>
      </div>

      <div className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">
        © 2026 LUMINNI • DESIGN BY AI STUDIO
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  return (
    <div className="selection:bg-brand-gold selection:text-white">
      <Navbar />
      <Hero />
      <Stats />
      <Experience />
      <Services />
      <Team />
      <Testimonials />
      <ContactCTA />
      <Locations />
      <Footer />
    </div>
  );
}
