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
  ArrowLeft,
  Linkedin,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/animated-section";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/City.json";
import HoverCard from "@/components/hovercards";
import {
  FiMapPin,
  FiTruck,
  FiFileText,
  FiFile,
  FiCreditCard,
  FiTrendingUp,
  FiUsers,
  FiRepeat,
  FiTool,
  FiHome,
  FiActivity,
  FiEdit,
} from "react-icons/fi";
import { motion } from "framer-motion";

// Team data
const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO & Founder",
    image: "/placeholder.svg?height=300&width=300&text=Sarah+Johnson",
    bio: "With over 20 years in real estate development, Sarah founded PrimeRealty with a vision to create sustainable, community-focused developments.",
    linkedin: "#",
    twitter: "#",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Chief Architect",
    image: "/placeholder.svg?height=300&width=300&text=Michael+Chen",
    bio: "Award-winning architect specializing in sustainable design and innovative urban planning solutions.",
    linkedin: "#",
    twitter: "#",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const services = [
  {
    title: "Site Visits",
    description:
      "Organizing and accompanying clients for property site inspections.",
    icon: FiMapPin,
  },
  {
    title: "Logistic Help",
    description: "Providing support with transportation and site coordination.",
    icon: FiTruck,
  },
  {
    title: "Negotiation",
    description: "Assisting in securing the best deals for buyers and sellers.",
    icon: FiActivity,
  }, // replaced FiHandshake
  {
    title: "Legal Verification Assistance",
    description:
      "Helping clients verify property documents for legal compliance.",
    icon: FiFileText,
  },
  {
    title: "Documentation",
    description: "Ensuring seamless and error-free paperwork.",
    icon: FiFile,
  },
  {
    title: "Home Loan Assistance",
    description: "Guiding clients through the home loan process.",
    icon: FiCreditCard,
  },
  {
    title: "Sale Deed Execution",
    description: "Facilitating the smooth execution of sale deeds.",
    icon: FiEdit,
  }, // replaced FiFileCheck
  {
    title: "Sale, Purchase & Investment Advisory",
    description:
      "Offering expert guidance for property transactions and investments.",
    icon: FiTrendingUp,
  },
  {
    title: "Developer Consultation & Project Advisory",
    description:
      "Providing end-to-end support to developers in conceptualizing and executing real estate projects.",
    icon: FiUsers,
  },
  {
    title: "Resale Assistance",
    description: "Providing support in reselling properties at the best value.",
    icon: FiRepeat,
  },
  {
    title: "Renovation Assistance",
    description: "Assisting with property renovation needs.",
    icon: FiTool,
  },
  {
    title: "Property Management",
    description: "Offering end-to-end management services for property owners.",
    icon: FiHome,
  },
];

const milestones = [
  {
    year: "2022",
    event:
      " Company incorporated in Odisha with the vision of redefining infrastructure consulting.",
  },
  {
    year: "2023",
    event:
      "Took up first major consulting assignments in residential and commercial projects.",
  },
  {
    year: "2024",
    event:
      "Expanded services to cover complete project management and execution support",
  },
  {
    year: "2025",
    event:
      " Strengthened portfolio with new civil infrastructure projects and expanded regional presence.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full h-48 sm:h-80 md:h-[20rem]">
        <Image
          src="/image.png"
          alt="headquarters"
          width={2000}
          height={2000}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Header */}
      <AnimatedSection className="py-12 md:py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground">
                Building Dreams, Creating Communities
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Lifespark Infra & Consulting Private Limited is a growing
                infrastructure and consulting company dedicated to delivering
                excellence in real estate development, civil construction, and
                project consulting. Since its incorporation in 2022, the company
                has been driven by a vision to create high-quality spaces that
                inspire trust, enhance communities, and stand the test of time.
              </p>
            </div>
            <div className="relative">
              <div className="w-full max-w-[480px] aspect-video overflow-hidden mx-auto lg:mx-0">
                <Lottie animationData={animationData} loop={true} />
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Company Story */}
      <AnimatedSection className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                From Vision to Reality
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2022, Lifespark Infra & Consulting was built on the
                  idea of going beyond construction — to design and deliver
                  sustainable developments that truly improve lives.
                </p>
                <p>
                  From residential housing and commercial projects to
                  infrastructure consulting, our team combines technical
                  expertise with a commitment to quality and transparency. With
                  a strong foundation of professional values, we strive to bring
                  modern engineering, sustainable practices, and client-focused
                  solutions to every project.
                </p>
                <p>
                  We are not just building structures — we are building trust,
                  value, and long-lasting communities.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Company Milestones
              </h3>
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {milestone.year}
                      </span>
                    </div>
                    <div className="flex-1 pt-3">
                      <p className="text-muted-foreground">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Values */}
      <AnimatedSection className="py-12 md:py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Our Values
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground">
              What Drives Us
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              Our core values guide every decision we make and every project we
              undertake.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((value, index) => (
              <HoverCard
                key={index}
                title={value.title}
                subtitle={value.description}
                Icon={value.icon}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Team */}
      {/* <AnimatedSection className="py-12 md:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="secondary" className="w-fit mx-auto">
              Our Team
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Meet the Experts
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of professionals brings together decades of
              experience in real estate development, architecture, and project
              management.
            </p>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={1000}
                      height={1000}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-medium">
                      {member.position}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      {member.bio}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.linkedin}>
                          <Linkedin className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={member.twitter}>
                          <Twitter className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection> */}

      {/* Stats */}
      {/* <AnimatedSection className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <Building2 className="h-8 w-8 mx-auto mb-4 opacity-90" />
              <div className="text-3xl font-bold">150+</div>
              <div className="text-primary-foreground/80">
                Projects Completed
              </div>
            </div>
            <div className="text-center space-y-2">
              <Users className="h-8 w-8 mx-auto mb-4 opacity-90" />
              <div className="text-3xl font-bold">500+</div>
              <div className="text-primary-foreground/80">Happy Clients</div>
            </div>
            <div className="text-center space-y-2">
              <Award className="h-8 w-8 mx-auto mb-4 opacity-90" />
              <div className="text-3xl font-bold">25+</div>
              <div className="text-primary-foreground/80">Awards Won</div>
            </div>
            <div className="text-center space-y-2">
              <TrendingUp className="h-8 w-8 mx-auto mb-4 opacity-90" />
              <div className="text-3xl font-bold">15+</div>
              <div className="text-primary-foreground/80">Years Experience</div>
            </div>
          </div>
        </div>
      </AnimatedSection> */}

      {/* CTA */}
      <AnimatedSection className="py-12 md:py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Ready to Work With Us?
          </h2>
          <p className="text-lg sm:text-xl text-primary-foreground/90">
            Whether you're looking to invest, partner, or find your dream
            property, we're here to help make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              <Mail className="h-5 w-5 mr-2" />
              Get In Touch
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-transparent"
            >
              <Phone className="h-5 w-5 mr-2" />
              Schedule Meeting
            </Button>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
