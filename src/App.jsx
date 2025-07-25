import React, { useState, useEffect, useRef } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import {
  Music,
  Users,
  Award,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Play,
  ShoppingBag,
  Headphones,
  Guitar,
  Piano,
  Clock,
  Star,
  ChevronDown,
  ChevronUp,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import "./App.css";

// Import assets
import logoLight from "./assets/logo_eliack_batucada_fundo_claro.png";
import logoDark from "./assets/logo_eliack_batucada_fundo_escuro.png";
import eliackPhoto from "./assets/eliack.png";
import studioVideo from "./assets/video-studio.mp4";
import testimonialVideo from "./assets/VID-20231204-WA0159.mp4";
import testimonialVideo2 from "./assets/depoimento.mp4";
import testimonialVideo3 from "./assets/VID-20231204-WA0160.mp4";
import testimonialVideo4 from "./assets/VID-20231202-WA0005.mp4";
import testimonialVideo5 from "./assets/VID-20231202-WA0006.mp4";
import testimonialVideo6 from "./assets/VID-20231202-WA0003.mp4";
import testimonialVideo7 from "./assets/VID-20231202-WA0004.mp4";
import instagramScreenshot from "./assets/Screenshot_20231202_061322_Instagram.jpg";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHeaderTextDark, setIsHeaderTextDark] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);
  const playerContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFullscreen = () => {
    if (!document.fullscreenEnabled) {
      alert("Seu navegador não suporta o modo de tela cheia.");
      return;
    }

    const player = playerContainerRef.current;
    if (!player) return;

    if (!document.fullscreenElement) {
      player.requestFullscreen().catch((err) => {
        alert(
          `Erro ao tentar entrar em tela cheia: ${err.message} (${err.name})`
        );
      });
    } else {
      document.exitFullscreen();
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPaused(false);
      } else {
        videoRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      videoRef.current.muted = newVolume === 0;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      if (volume > 0) {
        setVolume(0);
        setIsMuted(true);
        videoRef.current.volume = 0;
        videoRef.current.muted = true;
      } else {
        setVolume(1);
        setIsMuted(false);
        videoRef.current.volume = 1;
        videoRef.current.muted = false;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Obrigado pelo contato! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const courses = [
    {
      icon: <Music className="w-12 h-12" />,
      title: "Bateria",
      description:
        "Do básico ao avançado, aprenda técnicas profissionais de bateria com equipamentos de qualidade.",
      features: [
        "Aulas individuais e em grupo",
        "Equipamentos profissionais",
        "Método personalizado",
        "A partir de 4 anos",
      ],
    },
    {
      icon: <Guitar className="w-12 h-12" />,
      title: "Violão",
      description:
        "Desenvolva suas habilidades no violão com aulas práticas e teoria musical aplicada.",
      features: [
        "Violão clássico e popular",
        "Técnicas de dedilhado",
        "Repertório variado",
        "Todas as idades",
      ],
    },
    {
      icon: <Piano className="w-12 h-12" />,
      title: "Teclado",
      description:
        "Explore o mundo do teclado e piano com metodologia moderna e eficiente.",
      features: [
        "Piano e teclado",
        "Teoria musical",
        "Estilos diversos",
        "Iniciantes e avançados",
      ],
    },
  ];

  const services = [
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: "Loja de Equipamentos",
      description:
        "Baquetas, peles, acessórios e equipamentos de bateria das melhores marcas.",
      features: [
        "Marcas premium",
        "Preços competitivos",
        "Orientação técnica",
        "Peças de reposição",
      ],
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Backline para Eventos",
      description:
        "Aluguel de equipamentos profissionais para shows, eventos e gravações.",
      features: [
        "Equipamentos profissionais",
        "Entrega e montagem",
        "Suporte técnico",
        "Preços acessíveis",
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Salas Adaptadas",
      description:
        "Ambiente climatizado e adaptado para pessoas com necessidades especiais.",
      features: ["Climatização", "Acessibilidade", "Conforto", "Segurança"],
    },
  ];

  const testimonials = [
    {
      type: "video",
      video: testimonialVideo,
      name: "Família Oliveira",
      role: "Pais e Alunos",
      text: "Participar do Festival de Bateria foi uma experiência inesquecível! Ver a união de alunos, pais e professores mostrou que o Studio Eliack Batucada é muito mais que uma escola de música, é uma grande família.",
    },
    {
      type: "video",
      video: testimonialVideo2,
      name: "Queila Farias",
      role: "Mãe do aluno Marcos Filho",
      text: "Procurei o Tio Eliack pelo profissionalismo dele e para ajudar meu filho a sair um pouco das telas. Hoje, vejo como o instrumento o ajuda a se capacitar e se entregar à música. Recomendo demais!",
    },
    {
      type: "video",
      video: testimonialVideo3,
      name: "Ricardo Neves",
      role: "Aluno (Adulto Iniciante)",
      text: "Sempre tive o sonho de aprender bateria e no Studio Eliack Batucada encontrei o lugar perfeito. Não importa a idade, o ambiente é inclusivo e os professores são extremamente capacitados. Estou realizando um sonho de infância!",
    },
    {
      type: "video",
      video: testimonialVideo4,
      name: "Ana & Carlos (Pais do Lucas)",
      role: "Família Batucada",
      text: "Desde que nosso filho começou no Studio, a evolução dele é nítida! As aulas são dinâmicas e o professor tem uma paciência incrível. Ver a alegria dele em cada batida não tem preço. A estrutura é fantástica!",
    },
    {
      type: "video",
      video: testimonialVideo5,
      name: "Júlia Santos",
      role: "Aluna de Bateria",
      text: "O Studio Eliack Batucada me deu a confiança que eu precisava para tocar de verdade. A didática é focada na nossa evolução e o ambiente é super acolhedor. Deixei de ser tímida e hoje amo subir no palco!",
    },
    {
      type: "video",
      video: testimonialVideo6,
      name: "Beatriz Lima",
      role: "Aluna Avançada",
      text: "A técnica que aprendi aqui transformou minha forma de tocar. O Eliack não ensina apenas a tocar um instrumento, ele ensina a ser músico. Cada aula é um novo desafio e uma nova conquista. Recomendo para todos!",
    },
    {
      type: "video",
      video: testimonialVideo7,
      name: "Marcos Andrade",
      role: "Pai do Aluno Davi",
      text: "O que mais me impressiona é o cuidado e a atenção individual que o Eliack dá para cada aluno. Ele realmente entende o ritmo do meu filho e trabalha para extrair o melhor dele. Profissionalismo e paixão definem o studio.",
    },
    {
      type: "image",
      image: instagramScreenshot,
      name: "Allen Nunes",
      role: "@allenunes97",
      text: "Há 2 meses iniciei minha jornada de baterista e estou muito feliz com o que venho aprendendo e evoluindo nas aulas!!! É só o comecinho ainda mas já é muito gratificante.",
    },
  ];

  const faqs = [
    {
      question: "Qual a idade mínima para começar as aulas?",
      answer:
        "A partir de 4 anos de idade já é possível iniciar as aulas de bateria com acompanhamento adequado e metodologia específica para crianças.",
    },
    {
      question: "É preciso ter instrumento em casa para praticar?",
      answer:
        "Não é obrigatório. Você pode praticar no estúdio ou com pads de estudo até adquirir seu instrumento. Oferecemos orientação para compra.",
    },
    {
      question: "As aulas são individuais ou em grupo?",
      answer:
        "Oferecemos tanto aulas individuais quanto em grupo. A modalidade é escolhida de acordo com o perfil e objetivo do aluno, garantindo aprendizado eficaz.",
    },
    {
      question: "Posso fazer uma aula experimental?",
      answer:
        "Sim! Oferecemos aula experimental gratuita para você conhecer nossa metodologia, estrutura e se sentir à vontade com o ambiente.",
    },
    {
      question: "Vocês atendem pessoas com necessidades especiais?",
      answer:
        "Sim! Nossas salas são climatizadas e adaptadas para pessoas com necessidades especiais, com metodologia inclusiva e atendimento personalizado.",
    },
  ];

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const currentSlide = testimonials[currentTestimonial];

    setIsPaused(false);
    setIsMuted(true);
    setVolume(0);

    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
    }

    if (currentSlide.type === "image") {
      const timer = setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [currentTestimonial, testimonials.length]);

  useEffect(() => {
    const homeSection = document.getElementById("home");
    if (!homeSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsHeaderTextDark(!entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    observer.observe(homeSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground smooth-scroll">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-wood transition-colors duration-300">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src={logoLight}
              alt="Studio Eliack Batucada"
              className="h-12 w-auto"
            />
            <div className="hidden md:block">
              <h1
                className={`text-xl font-bold transition-colors duration-300 ${
                  isHeaderTextDark ? "text-foreground" : "text-white"
                }`}
              >
                Studio Eliack Batucada
              </h1>
              <p
                className={`text-sm transition-colors duration-300 ${
                  isHeaderTextDark ? "text-muted-foreground" : "text-white/80"
                }`}
              >
                Seu ritmo começa aqui
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div
            className={`hidden md:flex space-x-6 transition-colors duration-300 ${
              isHeaderTextDark ? "text-foreground" : "text-white"
            }`}
          >
            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-accent transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-accent transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("courses")}
              className="hover:text-accent transition-colors"
            >
              Cursos
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="hover:text-accent transition-colors"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="hover:text-accent transition-colors"
            >
              Depoimentos
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-accent transition-colors"
            >
              Contato
            </button>
          </div>

          <Button
            className="hidden md:block rhythm-pulse"
            onClick={() => scrollToSection("contact")}
          >
            Agende sua Aula
          </Button>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors duration-300 ${
              isHeaderTextDark ? "text-foreground" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            {/* ... o conteúdo do menu mobile não precisa de alterações ... */}
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="block hover:text-accent transition-colors"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block hover:text-accent transition-colors"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("courses")}
                className="block hover:text-accent transition-colors"
              >
                Cursos
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block hover:text-accent transition-colors"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="block hover:text-accent transition-colors"
              >
                Depoimentos
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block hover:text-accent transition-colors"
              >
                Contato
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={studioVideo} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 wood-gradient"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="wood-texture p-8 rounded-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Studio <span className="text-wood">Eliack Batucada</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
              Seu Ritmo Começa Aqui
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-4xl mx-auto">
              Aulas de bateria, violão e teclado para todas as idades, em salas
              climatizadas e adaptadas. Loja de equipamentos e backline para
              eventos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 hover-lift beat-bounce"
                onClick={() => scrollToSection("contact")}
              >
                <Music className="w-5 h-5 mr-2" />
                Agende sua Aula Experimental
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 hover-lift bg-white/10 border-white/30 text-white hover:bg-white/20"
                onClick={() => scrollToSection("courses")}
              >
                <Play className="w-5 h-5 mr-2" />
                Conheça Nossos Cursos
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 wood-texture">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src={eliackPhoto}
                alt="Eliack - Professor de Bateria"
                className="w-full max-w-md mx-auto rounded-3xl drum-shadow hover-lift"
              />
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground p-4 rounded-full">
                <Award className="w-8 h-8" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Mais que Batuque, <span className="text-wood">tocamos história</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-6">
                Sou Eliack, músico profissional com mais de 20 anos de estrada e
                há mais de 6 anos dedicado ao ensino. Para mim, a música é uma
                ferramenta de transformação, e minha missão é ajudar cada aluno
                a encontrar seu ritmo único em um ambiente acolhedor e familiar.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                No Studio Eliack Batucada, criamos um espaço completo para a sua
                jornada musical. Somos especializados no ensino de bateria, com
                programas para todas as idades — de crianças a partir de 4 anos
                até a terceira idade — e também oferecemos aulas de violão e
                teclado.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Além das aulas, damos todo o suporte que um músico precisa
                através da nossa loja <strong>OPENSTAGE</strong>, com venda e
                manutenção de equipamentos, e do serviço{" "}
                <strong>BATUCADA BACKLINE</strong>, com aluguel de equipamentos
                profissionais para eventos. Afinal, acreditamos que, mais que
                batuques, nós tocamos histórias.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm">Salas climatizadas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm">Ambiente inclusivo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm">Equipamentos profissionais</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  <span className="text-sm">Metodologia personalizada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Aprenda a Tocar:{" "}
              <span className="text-wood">Bateria, Violão e Teclado</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Cursos para todas as idades com metodologia personalizada
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <Card
                key={index}
                className="hover-lift cursor-pointer group drum-shadow"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-accent mb-6 group-hover:scale-110 transition-transform rhythm-pulse">
                    {course.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                  <p className="text-muted-foreground mb-6">
                    {course.description}
                  </p>
                  <ul className="space-y-2">
                    {course.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="hover-lift"
              onClick={() => scrollToSection("contact")}
            >
              <Music className="w-5 h-5 mr-2" />
              Comece Hoje Mesmo
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Equipamentos e <span className="text-wood">Suporte Completo</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tudo que você precisa para sua jornada musical
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover-lift cursor-pointer group">
                <CardContent className="p-6">
                  <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-1">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-accent" />
                        <span className="text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              O que Nossos <span className="text-wood">Alunos Dizem</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Histórias reais de transformação através da música
            </p>
          </div>

          <div className="relative">
            <Card className="overflow-hidden drum-shadow">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  {/* Container do Vídeo/Imagem com o NOVO REF */}
                  <div className="relative" ref={playerContainerRef}>
                    {testimonials[currentTestimonial].type === "video" ? (
                      <video
                        ref={videoRef}
                        key={testimonials[currentTestimonial].video}
                        className="w-full h-64 md:h-full object-cover"
                        autoPlay
                        loop={false}
                        onEnded={() =>
                          setCurrentTestimonial(
                            (prev) => (prev + 1) % testimonials.length
                          )
                        }
                      >
                        <source
                          src={testimonials[currentTestimonial].video}
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <img
                        src={testimonials[currentTestimonial].image}
                        alt="Depoimento"
                        className="w-full h-64 md:h-full object-cover"
                      />
                    )}

                    {/* Botões de Controle do Vídeo */}
                    {testimonials[currentTestimonial].type === "video" && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <button
                          onClick={togglePlayPause}
                          className="bg-black/50 text-white rounded-full p-2 hover:bg-black/75 transition-all"
                        >
                          {isPaused ? (
                            <Play className="w-5 h-5" />
                          ) : (
                            <Pause className="w-5 h-5" />
                          )}
                        </button>

                        <div className="group relative flex items-center">
                          <button
                            onClick={toggleMute}
                            className="bg-black/50 text-white rounded-full p-2 hover:bg-black/75 transition-all"
                          >
                            {volume > 0 ? (
                              <Volume2 className="w-5 h-5" />
                            ) : (
                              <VolumeX className="w-5 h-5" />
                            )}
                          </button>
                          <div className="absolute right-0 bottom-12 mb-2 w-20 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <input
                              type="range"
                              min="0"
                              max="1"
                              step="0.05"
                              value={volume}
                              onChange={handleVolumeChange}
                              className="w-full h-1 bg-gray-200/50 rounded-lg appearance-none cursor-pointer accent-wood"
                            />
                          </div>
                        </div>

                        {/* NOVO Botão de Tela Cheia */}
                        <button
                          onClick={handleFullscreen}
                          className="bg-black/50 text-white rounded-full p-2 hover:bg-black/75 transition-all"
                          aria-label={
                            isFullscreen
                              ? "Sair da Tela Cheia"
                              : "Entrar em Tela Cheia"
                          }
                        >
                          {isFullscreen ? (
                            <Minimize className="w-5 h-5" />
                          ) : (
                            <Maximize className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                  {/* Fim do Container do Vídeo/Imagem */}

                  <div className="p-8 flex flex-col justify-center">
                    <div className="mb-4">
                      <h4 className="text-xl font-bold">
                        {testimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-accent">
                        {testimonials[currentTestimonial].role}
                      </p>
                    </div>
                    <p className="text-muted-foreground italic">
                      "{testimonials[currentTestimonial].text}"
                    </p>
                    <div className="flex mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? "bg-accent" : "bg-muted"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Perguntas <span className="text-wood">Frequentes</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Tire suas dúvidas sobre nossos cursos e serviços
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover-lift">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center"
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  >
                    <span className="font-semibold">{faq.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-accent" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-accent" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para <span className="text-wood">Fazer Acontecer?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Agende sua aula experimental gratuita ou visite nosso studio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Fale Conosco</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent text-accent-foreground p-3 rounded-full">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Telefone</p>
                    <p className="text-muted-foreground">(73) 99936-0890</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-accent text-accent-foreground p-3 rounded-full">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">E-mail</p>
                    <p className="text-muted-foreground">
                      contato@eliackbatucada.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-accent text-accent-foreground p-3 rounded-full">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Endereço</p>
                    <p className="text-muted-foreground">
                      Rua Heitor Coni, N°10
                      <br />
                      Kaikan Sul, Teixeira de Freitas - BA
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-accent text-accent-foreground p-3 rounded-full">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Horário de Funcionamento</p>
                    <p className="text-muted-foreground">
                      Seg-Sex: 8h-20h
                      <br />
                      Sábado: 9h-12h
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="drum-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">
                  Agende sua Aula Experimental
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    name="phone"
                    placeholder="Telefone (com DDD)"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Como podemos te ajudar? Qual instrumento tem interesse?"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full hover-lift rhythm-pulse"
                  >
                    <Music className="w-5 h-5 mr-2" />
                    Quero Agendar Minha Aula
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 wood-gradient text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img
                src={logoDark}
                alt="Studio Eliack Batucada"
                className="h-16 w-auto mb-4"
              />
              <p className="text-white/80 mb-4">
                Mais que batuque, tocamos história. Transformando vidas através
                da música.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="#"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Cursos</h4>
              <ul className="space-y-2 text-white/80">
                <li>Bateria</li>
                <li>Violão</li>
                <li>Teclado</li>
                <li>Aulas Experimentais</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Serviços</h4>
              <ul className="space-y-2 text-white/80">
                <li>Loja de Equipamentos</li>
                <li>Backline para Eventos</li>
                <li>Salas Adaptadas</li>
                <li>Suporte Técnico</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Contato</h4>
              <ul className="space-y-2 text-white/80">
                <li>(73) 99936-0890</li>
                <li>contato@eliackbatucada.com</li>
                <li>Teixeira de Freitas - BA</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>© 2025 Studio Eliack Batucada. Todos os direitos reservados.</p>
            <p className="mt-2">CNPJ: 32.395.489/0001-34</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
