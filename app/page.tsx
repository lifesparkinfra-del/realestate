"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/animated-section";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/Construction.json";
import { HeroCarousel } from "@/components/hero-carousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Car, Home, Scroll } from "lucide-react";
import { ImageLightbox } from "@/components/image-lightbox";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stats = [
  { icon: Building2, label: "Projects Completed", value: "150+" },
  { icon: Users, label: "Happy Clients", value: "500+" },
  { icon: Award, label: "Awards Won", value: "25+" },
  { icon: TrendingUp, label: "Years Experience", value: "15+" },
];

const values = [
  {
    title: "Integrity & Transparency",
    description:
      "We believe trust is the foundation of long-term partnerships.",
    icon: Building2,
  },
  {
    title: "Quality First",
    description:
      "Every project is delivered with precision, safety, and durability.",
    icon: TrendingUp,
  },
  {
    title: "Innovation & Sustainability",
    description: "We embrace modern technologies and eco-friendly practices.",
    icon: Users,
  },
  {
    title: "Community Impact",
    description:
      "Our work is designed to uplift communities and create lasting value.",
    icon: Award,
  },
];
const projects = [
  {
    id: 1,
    title: "Geeta Residency",
    location:
      "Geeta Residency, Sahadevkhunta, Near Chandmari field. In front of Biswswar Shiva Temple.",
    type: "Residential",
    status: "Ongoing",
    image: "/project1.jpg",
    shortdesc:
      "Premium 3BHK residences with spacious layouts, elegant finishes, andxclusive amenities, designed to offer modern luxury and a vibrant community lifestyle.",
    description:
      "Experience premium 3BHK residences thoughtfully designed to blend modern architecture with refined luxury. Each limited apartment offers spacious interiors, high-quality finishes, and access to exclusive amenities that redefine comfort and elegance. Nestled in a prime location, these homes provide the perfect balance of convenience, style, and a vibrant community atmosphere.",
    completion: "Q2 2025",
    floors: 25,
    units: 120,
    bhk: 3,
    amenities: ["Lift", "Lobby", "24/7 Security"],
    progress: 65,
    images: [
      "/about_placeholder.png",
      "/about_placeholder.png",
      "/about_placeholder.png",
      "/about_placeholder.png",
    ],
  },
];
const services = [
  {
    title: "Residential Development",
    description:
      "From luxury apartments to affordable housing, we create living spaces that inspire.",
    icon: Building2,
  },
  {
    title: "Infrastructure Consulting",
    description:
      "Expert advice on urban planning, transportation, and public works projects.",
    icon: Award,
  },
  {
    title: "Commercial Projects",
    description:
      "We deliver state-of-the-art office buildings, retail centers, and mixed-use developments.",
    icon: TrendingUp,
  },
  {
    title: "Project Management",
    description:
      "Comprehensive oversight from concept to completion, ensuring timelines and budgets are met.",
    icon: Users,
  },
];

export default function HomePage() {
  const [FeaturedProjects, setFeaturedProjects] = useState<any[]>([]);
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [siteContent, setSiteContent] = useState<any>(null);
  const [enquiryForm, setEnquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await axios.get("/api/featured-projects");
        setFeaturedProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching featured projects:", error);
      }
    };

    const fetchSiteContent = async () => {
      try {
        const response = await axios.get("/api/content");
        if (response.data.success) {
          setSiteContent(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching site content:", error);
      }
    };

    fetchFeaturedProjects();
    fetchSiteContent();
  }, []);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = axios.post("/api/send-enquiry", {
        project: selectedProject,
        ...enquiryForm,
      });
    } catch (err) {
      console.log(err);
    }
    setEnquiryForm({ name: "", email: "", phone: "", message: "" });
    setSelectedProject(null);
  };

  // const projectsToDisplay = FeaturedProjects.length > 0 ? FeaturedProjects : featuredProjects;

  return (
    <div className="min-h-screen bg-background">
      <HeroCarousel
        title={siteContent?.homeHero?.title}
        subtitle={siteContent?.homeHero?.subtitle}
        images={siteContent?.homeHero?.images}
      />

      {/* Stats Section - Services Bar */}
      <AnimatedSection className="py-10 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
        {/* Subtle diagonal stripes */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-center space-y-2 group relative"
              >
                <service.icon className="h-8 w-8 mx-auto mb-3 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-sm font-semibold uppercase tracking-widest whitespace-pre-line">
                  {service.title.replace(" ", "\n")}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Our Journey Section */}
      <AnimatedSection className="py-20 bg-white dark:bg-background relative">
        {/* Left accent border */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-primary/60 via-primary to-primary/20" />
        <div className="md:flex justify-between items-center gap-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl lg:text-5xl font-serif font-semibold whitespace-pre-line tracking-tight">
              {siteContent?.homeJourney?.title || "Our Journey of Transformation"}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {siteContent?.homeJourney?.description ||
                `Our journey began in 2022, when we incorporated the company in Odisha with a vision to redefine infrastructure consulting. By 2023, we had taken on our first major consulting assignments across residential and commercial projects, marking an important milestone in our growth. In 2024, we expanded our services to offer complete project management and execution support, strengthening our role as a trusted partner in the real estate sector. The year 2025 saw us diversifying into civil infrastructure projects and extending our regional presence, further solidifying our commitment to building lasting value for our clients and communities.`}
            </p>
            <Button size="lg" variant="default" className="text-lg px-8 w-fit">
              <Mail className="h-5 w-5 mr-2" />
              Get In Touch
            </Button>
          </div>
          <div className="md:w-1/2 w-full h-auto my-10 flex justify-center items-center">
            <div className="w-full max-w-[400px]">
              <Lottie animationData={animationData} loop={true} />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Featured Projects */}
      <AnimatedSection className="py-14 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Our Portfolio
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-serif font-semibold whitespace-pre-line tracking-tight">
              {siteContent?.homeProjects?.title || "Featured Projects"}
            </h2>
            <p className="text-lg text-muted max-w-3xl mx-auto whitespace-pre-line">
              {siteContent?.homeProjects?.subtitle || `Discover our latest developments that showcase innovation,
              quality, and attention to detail in every project we undertake.`}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FeaturedProjects.map((project) => (
              <Card
                key={project._id}
                className="overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge
                    variant={
                      project.status === "Completed" ? "default" : "secondary"
                    }
                    className="absolute top-4 left-4"
                  >
                    {project.status}
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-serif font-medium">{project.title}</CardTitle>
                    <Badge variant="outline">{project.type}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {project.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      {project.completion}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProject(project)}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 text-foreground">
            <Button
              size="lg"
              onClick={() => {
                router.push("/projects");
              }}
              variant="secondary"
            >
              View All Projects
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Values Section */}
      <AnimatedSection className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-serif font-semibold text-foreground tracking-tight">
              What Drives Us
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our core values guide every decision we make and every project we
              undertake.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full"
              >
                <Card className="h-full text-center p-8 hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-border/50 hover:border-primary/40 bg-background dark:bg-card flex flex-col">
                  <CardHeader>
                    <div className="h-14 w-14 mx-auto mb-4 rounded-none bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <value.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-xl font-serif font-medium group-hover:text-primary transition-colors">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      {/* <AnimatedSection className="py-14 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Our Services
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              What We Do Best
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From residential complexes to commercial developments, we bring
              expertise and innovation to every project type.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection> */}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-3xl lg:text-5xl font-serif font-semibold whitespace-pre-line tracking-tight">
            {siteContent?.homeCta?.title || "Ready to Start Your Next Project?"}
          </h2>
          <p className="text-lg text-primary-foreground/90 whitespace-pre-line">
            {siteContent?.homeCta?.description || `Let's discuss how we can bring your vision to life with our
            expertise and commitment to excellence.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-sm px-8 uppercase tracking-widest font-semibold rounded-none"
            >
              <a href="mailto:lifesparkinfra@gmail.com?subject=Enquring&body=My%20Enquiry%20is%20about">
                <Mail className="h-5 w-5 mr-2" />
                Get In Touch
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-sm px-8 uppercase tracking-widest font-semibold rounded-none border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <a href="tel:+919692727075">
                <Phone className="h-5 w-5 mr-2" />
                Call Us Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Dialog
        open={!!selectedProject}
        onOpenChange={() => setSelectedProject(null)}
      >
        <DialogContent className="w-[98vw] max-w-7xl h-[92vh] p-0 sm:p-0 sm:max-w-none sm:gap-0 overflow-hidden rounded-2xl border-none">
          <DialogTitle className="sr-only">{selectedProject?.title}</DialogTitle>

          {selectedProject && (
            <div className="flex flex-col md:flex-row h-full bg-background">

              {/* COLUMN 1: Visual Hero (33%) */}
              <div className="relative hidden md:block w-[33%] flex-shrink-0 overflow-hidden border-r border-border/10">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                {/* Project info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant={selectedProject.status === "Completed" ? "default" : "secondary"}
                      className="px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] font-bold"
                    >
                      {selectedProject.status}
                    </Badge>
                    <Badge variant="outline" className="px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] border-white/20 text-white bg-white/5 backdrop-blur-sm">
                      {selectedProject.type}
                    </Badge>
                  </div>
                  <h2 className="text-3xl font-serif font-bold tracking-tight leading-tight mb-2">
                    {selectedProject.title}
                  </h2>
                  <p className="text-sm text-white/70 flex items-start gap-1.5 font-light">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-primary" />
                    <span>{selectedProject.location}</span>
                  </p>

                </div>
              </div>

              {/* COLUMN 2: Narrative Center (34%) */}
              <div className="flex-1 overflow-y-auto custom-scrollbar border-r border-border/50">

                {/* Mobile Title View */}
                <div className="md:hidden relative h-48 w-full">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-xl font-serif font-bold">{selectedProject.title}</h2>
                    <p className="text-xs opacity-80">{selectedProject.location}</p>
                  </div>
                </div>

                <div className="p-8 space-y-10">
                  {/* Vision Lead-in */}
                  {selectedProject.shortdesc && (
                    <section className="space-y-3">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-primary font-bold">The Vision</h4>
                      <p className="text-xl font-serif font-medium text-foreground italic leading-snug">
                        "{selectedProject.shortdesc}"
                      </p>
                    </section>
                  )}

                  {/* Architectural Specifications */}
                  <section className="grid grid-cols-3 gap-0 border border-border/40 divide-x divide-border/40">
                    <div className="p-4 text-center">
                      <Building2 className="h-4 w-4 mx-auto text-primary/60 mb-1" />
                      <p className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">Floors</p>
                      <p className="text-sm font-medium text-foreground">{selectedProject.floors || "—"}</p>
                    </div>
                    <div className="p-4 text-center">
                      <Home className="h-4 w-4 mx-auto text-primary/60 mb-1" />
                      <p className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">Units</p>
                      <p className="text-sm font-medium text-foreground">{selectedProject.units || "—"}</p>
                    </div>
                    <div className="p-4 text-center">
                      <Scroll className="h-4 w-4 mx-auto text-primary/60 mb-1" />
                      <p className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground mb-0.5">BHK</p>
                      <p className="text-sm font-medium text-foreground">{selectedProject.bhk || "—"}</p>
                    </div>
                  </section>


                  {/* Full Description */}
                  <section className="space-y-4">
                    <div className="flex items-center gap-3">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold whitespace-nowrap">Detailed Overview</h4>
                      <div className="h-[1px] w-full bg-border/40" />
                    </div>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed font-light">
                      {selectedProject.description}
                    </p>
                  </section>

                  {/* Refined Gallery */}
                  {selectedProject.images?.length > 0 && (
                    <section className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Gallery</h4>
                      <div className="grid grid-cols-3 gap-2.5">
                        {selectedProject.images.slice(0, 3).map((src: string, idx: number) => {
                          const total = selectedProject.images?.length ?? 0;
                          const showOverlay = idx === 2 && total > 3;
                          const remaining = Math.max(0, total - 3);
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}
                              className="relative group h-24 sm:h-32 w-full overflow-hidden"
                            >
                              <Image
                                src={src || "/placeholder.svg"}
                                alt={`${selectedProject.title} ${idx}`}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              {showOverlay && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-lg font-serif">
                                  +{remaining}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Amenities */}
                  {selectedProject.amenities?.length > 0 && (
                    <section className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.amenities.map((a: string, i: number) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-muted hover:bg-primary transition-colors text-[9px] uppercase tracking-widest px-3 py-1.5"
                          >
                            {a}
                          </Badge>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>

              {/* COLUMN 3: Enquiry Hub (33%) */}
              <div className="hidden md:flex w-[33%] flex-shrink-0 flex-col bg-muted/10">
                <div className="p-8 lg:p-10 flex flex-col h-full">
                  <div className="mb-8">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-primary font-bold">Concierge Service</span>
                    <h3 className="text-2xl font-serif font-bold text-foreground mt-2 leading-tight">Request Exclusive Intelligence</h3>
                    <p className="text-xs text-muted-foreground mt-2 font-light">Direct priority access to our relationship managers.</p>
                  </div>

                  <form onSubmit={handleEnquirySubmit} className="space-y-6 flex-1">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">Full Name</label>
                        <Input
                          required
                          value={enquiryForm.name}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                          placeholder="Your name"
                          className="rounded-none border-0 border-b border-border bg-transparent px-0 py-1.5 focus:ring-0 focus:border-primary transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">Mobile</label>
                        <Input
                          required
                          type="tel"
                          value={enquiryForm.phone}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                          placeholder="+00 (000) 000-0000"
                          className="rounded-none border-0 border-b border-border bg-transparent px-0 py-1.5 focus:ring-0 focus:border-primary transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">Email</label>
                        <Input
                          required
                          type="email"
                          value={enquiryForm.email}
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                          placeholder="your.email@example.com"
                          className="rounded-none border-0 border-b border-border bg-transparent px-0 py-1.5 focus:ring-0 focus:border-primary transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground font-semibold">Preferences</label>
                        <Textarea
                          value={enquiryForm.message}
                          required
                          onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                          placeholder="Tell us about your requirements..."
                          rows={2}
                          className="rounded-none border-0 border-b border-border bg-transparent px-0 py-1.5 focus:ring-0 focus:border-primary transition-all resize-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="pt-8 space-y-4">
                      <Button
                        type="submit"
                        className="w-full h-14 rounded-none uppercase tracking-[0.2em] text-[10px] font-bold bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/10"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Enquiry
                      </Button>
                      <button
                        type="button"
                        onClick={() => setSelectedProject(null)}
                        className="w-full text-[9px] uppercase tracking-[0.2em] font-bold text-muted-foreground/60 hover:text-foreground transition-colors"
                      >
                        Return to Gallery
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Mobile Enquiry Footer (sticky for mobile) */}
              <div className="md:hidden p-6 bg-muted/20 border-t border-border mt-auto">
                <Button
                  onClick={() => {
                    const formElement = document.querySelector('form');
                    formElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full rounded-none tracking-widest uppercase text-[10px]"
                >
                  Enquire Now
                </Button>
              </div>

            </div>
          )}

        </DialogContent>
      </Dialog>

      {selectedProject && (
        <ImageLightbox
          images={selectedProject.images || []}
          initialIndex={lightboxIndex}
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
        />
      )}
    </div>
  );
}
