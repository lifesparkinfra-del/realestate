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
import { Calendar, Car, Home } from "lucide-react";
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
      "Premium 3BHK residences with spacious layouts, elegant finishes, and exclusive amenities, designed to offer modern luxury and a vibrant community lifestyle.",
    description:
      "Experience premium 3BHK residences thoughtfully designed to blend modern architecture with refined luxury. Each limited apartment offers spacious interiors, high-quality finishes, and access to exclusive amenities that redefine comfort and elegance. Nestled in a prime location, these homes provide the perfect balance of convenience, style, and a vibrant community atmosphere.",
    completion: "Q2 2025",
    floors: 25,
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
    fetchFeaturedProjects();
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
      <HeroCarousel />

      {/* Stats Section */}
      <AnimatedSection className="py-12 bg-primary text-primary-foreground">
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
          <service.icon className="h-8 w-8 mx-auto mb-4 opacity-90 group-hover:scale-110 transition-transform duration-300" />
          <div className="text-xl font-bold whitespace-pre-line">
            {service.title.replace(" ", "\n")}
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</AnimatedSection>

      {/* About us */}
      <AnimatedSection className="py-14 bg-muted/30">
        <div className="md:flex justify-between items-center gap-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Our Journey of Transformation
            </h2>
            <p className="text-xl text-muted-foreground mx-auto">
              Our journey began in 2022, when we incorporated the company in
              Odisha with a vision to redefine infrastructure consulting. By
              2023, we had taken on our first major consulting assignments
              across residential and commercial projects, marking an important
              milestone in our growth. In 2024, we expanded our services to
              offer complete project management and execution support,
              strengthening our role as a trusted partner in the real estate
              sector. The year 2025 saw us diversifying into civil
              infrastructure projects and extending our regional presence,
              further solidifying our commitment to building lasting value for
              our clients and communities.
            </p>
            <Button size="lg" variant="default" className="text-lg px-8 w-fit">
              <Mail className="h-5 w-5 mr-2" />
              Get In Touch
            </Button>
          </div>
          <div className="md:w-[250vw] h-full my-10 w-[8 rem]">
            <Lottie animationData={animationData} loop={true} />
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
            <h2 className="text-3xl lg:text-5xl font-bold">
              Featured Projects
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              Discover our latest developments that showcase innovation,
              quality, and attention to detail in every project we undertake.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FeaturedProjects.map((project) => (
              <Card
                key={project._id}
                className="overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover"
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
                    <CardTitle className="text-xl">{project.title}</CardTitle>
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

      {/* Values */}
      <AnimatedSection className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              What Drives Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
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
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-xl text-primary-foreground/90">
            Let's discuss how we can bring your vision to life with our
            expertise and commitment to excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Button
      asChild
      size="lg"
      variant="secondary"
      className="text-lg px-8"
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
      className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
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
        <DialogContent className="min-w-[80vw] min-h-[60vh] lg:min-w-[60vw]">
          <ScrollArea className="h-[70vh] pr-4 md:h-full">
            <DialogHeader>
              <DialogTitle>Enquire About {selectedProject?.title}</DialogTitle>
              <DialogDescription>
                Share your details and we’ll get back to you with availability
                and pricing.
              </DialogDescription>
            </DialogHeader>

            {selectedProject && (
              <div className="grid gap-6 md:flex lg:gap-12 my-10 md:my-6">
                {/* Left: Enquiry Form */}
                <form
                  onSubmit={handleEnquirySubmit}
                  className="space-y-4 mt-6 order-2 md:order-1 border p-6 rounded-md shadow-xl "
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input
                        required
                        value={enquiryForm.name}
                        onChange={(e) =>
                          setEnquiryForm({
                            ...enquiryForm,
                            name: e.target.value,
                          })
                        }
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Phone Number
                      </label>
                      <Input
                        required
                        type="tel"
                        value={enquiryForm.phone}
                        onChange={(e) =>
                          setEnquiryForm({
                            ...enquiryForm,
                            phone: e.target.value,
                          })
                        }
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                      required
                      type="email"
                      value={enquiryForm.email}
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          email: e.target.value,
                        })
                      }
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      value={enquiryForm.message}
                      required
                      onChange={(e) =>
                        setEnquiryForm({
                          ...enquiryForm,
                          message: e.target.value,
                        })
                      }
                      placeholder="Tell us about your requirements, preferred unit size, budget, or any specific questions..."
                      rows={6}
                    />
                  </div>
                  <div className="flex gap-4 pt-2">
                    <Button type="submit" className="flex-1">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Enquiry
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedProject(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>

                {/* Right: Property Details + Gallery */}
                <div className="order-1 md:order-2">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-semibold">
                        {selectedProject.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />{" "}
                        {selectedProject.location}
                      </p>
                    </div>

                    {/* Image gallery */}
                    <div className="grid grid-cols-3 gap-2">
                      {selectedProject.images?.slice(0, 3).map((src, idx) => {
                        const total = selectedProject.images?.length ?? 0;
                        const showOverlay = idx === 2 && total > 3;
                        const remaining = Math.max(0, total - 3);
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setLightboxIndex(idx);
                              setLightboxOpen(true);
                            }}
                            className="relative group h-28 lg:h-[16rem] w-full overflow-hidden rounded"
                            aria-label={`Open image ${idx + 1} of ${total}`}
                          >
                            <Image
                              src={src || "/placeholder.svg"}
                              alt={`${selectedProject.title} image ${idx + 1}`}
                              width={1000}
                              height={1000}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {showOverlay && (
                              <div className="absolute inset-0 bg-black/60 text-white grid place-items-center text-sm font-medium">
                                +{remaining}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Description and quick facts */}
                    <p className="text-sm text-muted-foreground">
                      {selectedProject.description}
                    </p>

                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedProject.bhk} </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Car className="h-4 w-4 text-muted-foreground" />
                        <span>{selectedProject.floors} Floors</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      {/* <span className="font-semibold text-lg">
                        {selectedProject.price}
                      </span> */}
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {selectedProject.completion}
                      </span>
                    </div>

                    {/* Amenities */}
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Amenities</p>
                      <div className="flex flex-wrap gap-1">
                        {selectedProject.amenities.map((a, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="text-xs"
                          >
                            {a}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
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
