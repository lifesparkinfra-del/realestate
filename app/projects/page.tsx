"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ArrowLeft,
  Home,
  Bath,
  Car,
  Scroll,
} from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/animated-section";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ImageLightbox } from "@/components/image-lightbox";
import axios from "axios";
import LoaderComp from "@/components/LoaderComp";

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

export default function ProjectsPage() {
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
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedProject) setLightboxOpen(false);

    async function getProjectDetails() {
      try {
        const res = await axios.get("/api/admin/save-proj");

        console.log(res.data);
        setProjectDetails(res.data.data);

        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getProjectDetails();
  }, [selectedProject]);
  if (loading)
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center">
        <LoaderComp />
      </div>
    );

  const ongoingProjects = projectDetails.filter(
    (p: any) => p.status === "Ongoing"
  );
  const completedProjects = projectDetails.filter(
    (p: any) => p.status === "Completed"
  );

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

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Header */}
      <AnimatedSection className="flex items-center justify-center py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
              Our Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our portfolio of residential, commercial, and mixed-use
              developments.
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ProjectGrid
                projects={projectDetails}
                onEnquiry={setSelectedProject}
              />
            </TabsContent>
            <TabsContent value="ongoing">
              <ProjectGrid
                projects={ongoingProjects}
                onEnquiry={setSelectedProject}
              />
            </TabsContent>
            <TabsContent value="completed">
              <ProjectGrid
                projects={completedProjects}
                onEnquiry={setSelectedProject}
              />
            </TabsContent>
          </Tabs>
        </div>
      </AnimatedSection>

      {/* Enquiry Dialog */}
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

      {/* Image Lightbox */}
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

function ProjectGrid({ projects, onEnquiry }: any) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((p: any) => (
        <ProjectCard key={p._id} project={p} onEnquiry={onEnquiry} />
      ))}
    </div>
  );
}

function ProjectCard({ project, onEnquiry }: any) {
  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => onEnquiry(project)}
    >
      <div className="relative">
        <Image
          src={project.image}
          alt={project.title}
          width={1000}
          height={1000}
          className="w-full h-64 object-cover"
        />
        <Badge
          variant={project.status === "Completed" ? "default" : "secondary"}
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
        <CardDescription className="flex items-center gap-1 mb-4">
          <MapPin className="h-8 w-8" /> {project.location}
        </CardDescription>
        <CardDescription className="flex items-center gap-1">
          {project.shortdesc}
        </CardDescription>
        <div className="flex justify-start items-center">
          <CardDescription className="grid grid-cols-2 gap-[6rem] text-sm">
            <div className="flex items-center gap-2">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span>{project.bhk}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{project.floors} floors</span>
            </div>
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
}
