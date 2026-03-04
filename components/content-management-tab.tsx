"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Trash2, Plus, Save } from "lucide-react";
import axios from "axios";

export function ContentManagementTab({ initialSettings, showAlert, onSaved }: { initialSettings: any, showAlert: any, onSaved: any }) {
    const [formData, setFormData] = useState({
        homeHero: { title: "", subtitle: "", images: [] as string[] },
        homeJourney: { title: "", description: "" },
        homeProjects: { title: "", subtitle: "" },
        homeCta: { title: "", description: "" },
        aboutHero: { title: "", description: "" },
        aboutVision: { title: "", description: "" },
        aboutCta: { title: "", description: "" },
        aboutMilestones: [{ year: "", event: "" }]
    });

    const [isSaving, setIsSaving] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);

    // New image files selected for upload
    const [newHeroImages, setNewHeroImages] = useState<File[]>([]);

    useEffect(() => {
        if (initialSettings) {
            setFormData({
                homeHero: initialSettings.homeHero || { title: "", subtitle: "", images: [] },
                homeJourney: initialSettings.homeJourney || { title: "", description: "" },
                homeProjects: initialSettings.homeProjects || { title: "", subtitle: "" },
                homeCta: initialSettings.homeCta || { title: "", description: "" },
                aboutHero: initialSettings.aboutHero || { title: "", description: "" },
                aboutVision: initialSettings.aboutVision || { title: "", description: "" },
                aboutCta: initialSettings.aboutCta || { title: "", description: "" },
                aboutMilestones: initialSettings.aboutMilestones?.length ? initialSettings.aboutMilestones : [{ year: "", event: "" }]
            });
        }
    }, [initialSettings]);

    const handleMilestoneChange = (index: number, field: string, value: string) => {
        const newMilestones = [...formData.aboutMilestones];
        newMilestones[index] = { ...newMilestones[index], [field]: value };
        setFormData({ ...formData, aboutMilestones: newMilestones });
    };

    const addMilestone = () => {
        setFormData({
            ...formData,
            aboutMilestones: [...formData.aboutMilestones, { year: "", event: "" }]
        });
    };

    const removeMilestone = (index: number) => {
        const newMilestones = formData.aboutMilestones.filter((_, i) => i !== index);
        setFormData({ ...formData, aboutMilestones: newMilestones });
    };

    const removeHeroImage = (index: number) => {
        const newImages = formData.homeHero.images.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            homeHero: { ...formData.homeHero, images: newImages }
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            let finalHeroImages = [...formData.homeHero.images];

            // Upload new images if any
            if (newHeroImages.length > 0) {
                setUploadingImages(true);
                const form = new FormData();
                newHeroImages.forEach((file) => form.append("files", file));

                const res = await fetch("/api/upload", { method: "POST", body: form });

                if (!res.ok) {
                    throw new Error("Failed to upload images");
                }

                const { urls } = await res.json();
                finalHeroImages = [...finalHeroImages, ...urls];
                setUploadingImages(false);
            }

            const payload = {
                ...formData,
                homeHero: { ...formData.homeHero, images: finalHeroImages }
            };

            const saveRes = await axios.post("/api/admin/content", payload);

            if (saveRes.data.success) {
                setNewHeroImages([]);
                onSaved(payload);
                showAlert("success", "Content settings saved successfully!");
            } else {
                throw new Error(saveRes.data.error || "Failed to save settings");
            }
        } catch (error: any) {
            console.error("Error saving content:", error);
            setUploadingImages(false);
            showAlert("error", error.message || "Error saving content settings.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-foreground">Content Management</h2>
                    <p className="text-muted-foreground">Manage text and images for the Home and About pages</p>
                </div>
                <Button onClick={handleSave} disabled={isSaving || uploadingImages} size="lg">
                    {isSaving || uploadingImages ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                        <Save className="h-4 w-4 mr-2" />
                    )}
                    {uploadingImages ? "Uploading..." : isSaving ? "Saving..." : "Save All Changes"}
                </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Home Page Content */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold border-b pb-2">Home Page Settings</h3>

                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={formData.homeHero.title}
                                    onChange={(e) => setFormData({ ...formData, homeHero: { ...formData.homeHero, title: e.target.value } })}
                                    placeholder="Shaping skylines with precision, quality, and trust."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Subtitle</Label>
                                <Textarea
                                    value={formData.homeHero.subtitle}
                                    onChange={(e) => setFormData({ ...formData, homeHero: { ...formData.homeHero, subtitle: e.target.value } })}
                                    placeholder="Premium residential and mixed-use developments..."
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Scrolling Images</Label>
                                <div className="flex flex-col gap-2">
                                    {formData.homeHero.images.map((img, idx) => (
                                        <div key={idx} className="flex items-center justify-between bg-muted p-2 rounded">
                                            <span className="text-sm truncate max-w-[200px]">{img}</span>
                                            <Button variant="ghost" size="icon" onClick={() => removeHeroImage(idx)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    ))}
                                    <Input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files) {
                                                setNewHeroImages(Array.from(e.target.files));
                                            }
                                        }}
                                    />
                                    {newHeroImages.length > 0 && (
                                        <p className="text-sm text-muted-foreground">{newHeroImages.length} new image(s) selected.</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Journey of Transformation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input
                                    value={formData.homeJourney.title}
                                    onChange={(e) => setFormData({ ...formData, homeJourney: { ...formData.homeJourney, title: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Section Description</Label>
                                <Textarea
                                    rows={5}
                                    value={formData.homeJourney.description}
                                    onChange={(e) => setFormData({ ...formData, homeJourney: { ...formData.homeJourney, description: e.target.value } })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Featured Projects Header</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input
                                    value={formData.homeProjects.title}
                                    onChange={(e) => setFormData({ ...formData, homeProjects: { ...formData.homeProjects, title: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Section Subtitle</Label>
                                <Textarea
                                    value={formData.homeProjects.subtitle}
                                    onChange={(e) => setFormData({ ...formData, homeProjects: { ...formData.homeProjects, subtitle: e.target.value } })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Call to Action Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input
                                    value={formData.homeCta.title}
                                    onChange={(e) => setFormData({ ...formData, homeCta: { ...formData.homeCta, title: e.target.value } })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Section Description</Label>
                                <Textarea
                                    value={formData.homeCta.description}
                                    onChange={(e) => setFormData({ ...formData, homeCta: { ...formData.homeCta, description: e.target.value } })}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* About Page Content */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold border-b pb-2">About Page Settings</h3>

                    <Card>
                        <CardHeader>
                            <CardTitle>Main Hero</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input
                                    value={formData.aboutHero.title}
                                    onChange={(e) => setFormData({ ...formData, aboutHero: { ...formData.aboutHero, title: e.target.value } })}
                                    placeholder="Building Dreams, Creating Communities"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    rows={4}
                                    value={formData.aboutHero.description}
                                    onChange={(e) => setFormData({ ...formData, aboutHero: { ...formData.aboutHero, description: e.target.value } })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Company Vision</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input
                                    value={formData.aboutVision.title}
                                    onChange={(e) => setFormData({ ...formData, aboutVision: { ...formData.aboutVision, title: e.target.value } })}
                                    placeholder="From Vision to Reality"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description (HTML or Plain Text)</Label>
                                <Textarea
                                    rows={6}
                                    value={formData.aboutVision.description}
                                    onChange={(e) => setFormData({ ...formData, aboutVision: { ...formData.aboutVision, description: e.target.value } })}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Company Milestones</CardTitle>
                            <CardDescription>Add the timeline of your company's journey</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {formData.aboutMilestones.map((milestone, idx) => (
                                <div key={idx} className="flex gap-4 items-start border p-4 rounded-md relative">
                                    <div className="space-y-2 flex-shrink-0 w-24">
                                        <Label>Year</Label>
                                        <Input
                                            value={milestone.year}
                                            onChange={(e) => handleMilestoneChange(idx, "year", e.target.value)}
                                            placeholder="e.g. 2022"
                                        />
                                    </div>
                                    <div className="space-y-2 flex-grow">
                                        <Label>Event</Label>
                                        <Textarea
                                            value={milestone.event}
                                            onChange={(e) => handleMilestoneChange(idx, "event", e.target.value)}
                                            placeholder="Event description"
                                            rows={2}
                                        />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-2 right-2"
                                        onClick={() => removeMilestone(idx)}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                            <Button onClick={addMilestone} variant="outline" className="w-full">
                                <Plus className="h-4 w-4 mr-2" /> Add Milestone
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Call to Action Section</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Section Title</Label>
                                <Input
                                    value={formData.aboutCta.title}
                                    onChange={(e) => setFormData({ ...formData, aboutCta: { ...formData.aboutCta, title: e.target.value } })}
                                    placeholder="Ready to Work With Us?"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Section Description</Label>
                                <Textarea
                                    value={formData.aboutCta.description}
                                    onChange={(e) => setFormData({ ...formData, aboutCta: { ...formData.aboutCta, description: e.target.value } })}
                                    placeholder="Whether you're looking to invest, partner, or find your dream property..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
