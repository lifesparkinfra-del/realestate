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
      "Premium 3BHK residences with spacious layouts, elegant finishes, a exclusive amenities, designed to offer modern luxury and a vibrant community lifestyle.",
    description:
      "Experience premium 3BHK residences thoughtfully designed to blend modern architecture with refined luxury. Each limited apartment offers spacious interiors, high-quality finishes, and access to exclusive amenities that redefine comfort and elegance. Nestled in a prime location, these homes provide the perfect balance of convenience, style, and a vibrant community atmosphere.",
    completion: "Q2 2025",
    floors: 25,
    units: 150,
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
      <div className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-background py-20">
        {/* Brand accent elements */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute -top-24 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">Our Portfolio</p>
            <h1 className="text-4xl lg:text-6xl font-serif font-semibold text-foreground tracking-tight">
              Our Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of residential, commercial, and mixed-use
              developments.
            </p>
          </div>
        </div>
      </div>

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
                    // Ideally would scroll to form or open a nested sheet
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
      className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group border border-border/50 hover:border-primary/30"
      onClick={() => onEnquiry(project)}
    >
      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={1000}
          height={1000}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge
          variant={project.status === "Completed" ? "default" : "secondary"}
          className="absolute top-4 left-4"
        >
          {project.status}
        </Badge>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-serif font-medium group-hover:text-primary transition-colors">{project.title}</CardTitle>
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
