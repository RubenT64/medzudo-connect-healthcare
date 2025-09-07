import { useState, useRef } from "react";
import { Plus, Image, Video, BarChart3, Calendar, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface PollOption {
  text: string;
  votes: number;
}

interface PostCreatorProps {
  onCreatePost: (post: any) => void;
}

export function PostCreator({ onCreatePost }: PostCreatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [postType, setPostType] = useState<"text" | "image" | "video" | "poll" | "event">("text");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  
  // Media states
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  
  // Poll states
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  
  // Event states
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setSelectedImages(prev => [...prev, ...files.slice(0, 4 - prev.length)]);
      toast({ title: `${files.length} Bild(er) hinzugefügt` });
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(file);
      toast({ title: "Video hinzugefügt" });
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handleRemovePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, i) => i !== index));
    }
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const resetForm = () => {
    setPostType("text");
    setContent("");
    setTags([]);
    setCurrentTag("");
    setSelectedImages([]);
    setSelectedVideo(null);
    setPollQuestion("");
    setPollOptions(["", ""]);
    setEventTitle("");
    setEventDate("");
    setEventLocation("");
  };

  const handleCreatePost = () => {
    if (!content.trim() && postType === "text") {
      toast({ title: "Bitte geben Sie Inhalt ein", variant: "destructive" });
      return;
    }

    if (postType === "poll" && (!pollQuestion.trim() || pollOptions.filter(o => o.trim()).length < 2)) {
      toast({ title: "Umfrage benötigt Frage und mindestens 2 Optionen", variant: "destructive" });
      return;
    }

    if (postType === "event" && (!eventTitle.trim() || !eventDate)) {
      toast({ title: "Event benötigt Titel und Datum", variant: "destructive" });
      return;
    }

    let postData: any = {
      id: Date.now(),
      author: { name: "Dr. Ihr Name", role: "Facharzt", avatar: "RT", verified: false },
      content: content,
      type: postType,
      timestamp: "gerade eben",
      likes: 0,
      comments: 0,
      shares: 0,
      tags: tags,
      liked: false,
      bookmarked: false
    };

    // Add type-specific data
    if (postType === "poll") {
      postData.poll = {
        question: pollQuestion,
        options: pollOptions.filter(o => o.trim()).map(option => ({ text: option, votes: 0 }))
      };
    }

    if (postType === "event") {
      postData.event = {
        title: eventTitle,
        date: eventDate,
        location: eventLocation
      };
    }

    if (postType === "image" && selectedImages.length > 0) {
      postData.images = selectedImages.map(img => URL.createObjectURL(img));
    }

    if (postType === "video" && selectedVideo) {
      postData.video = URL.createObjectURL(selectedVideo);
    }

    onCreatePost(postData);
    resetForm();
    setIsOpen(false);
    toast({ title: "Post erfolgreich erstellt!" });
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoSelect}
        className="hidden"
      />

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="medical" className="gap-2">
            <Plus className="h-4 w-4" />
            Post erstellen
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Neuen Post erstellen</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Post Type Selection */}
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={postType === "text" ? "medical" : "outline"} 
                size="sm"
                onClick={() => setPostType("text")}
              >
                Text
              </Button>
              <Button 
                variant={postType === "image" ? "medical" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setPostType("image")}
              >
                <Image className="h-4 w-4" />
                Bild
              </Button>
              <Button 
                variant={postType === "video" ? "medical" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setPostType("video")}
              >
                <Video className="h-4 w-4" />
                Video
              </Button>
              <Button 
                variant={postType === "poll" ? "medical" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setPostType("poll")}
              >
                <BarChart3 className="h-4 w-4" />
                Umfrage
              </Button>
              <Button 
                variant={postType === "event" ? "medical" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setPostType("event")}
              >
                <Calendar className="h-4 w-4" />
                Event
              </Button>
            </div>

            {/* Content */}
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-gradient-medical flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">RT</span>
              </div>
              <div className="flex-1">
                <Textarea 
                  placeholder="Was möchten Sie mit der medizinischen Community teilen?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] resize-none border-0 bg-muted/30"
                />
              </div>
            </div>

            {/* Type-specific content */}
            {postType === "image" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Bilder hinzufügen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Bilder auswählen (max. 4)
                  </Button>
                  {selectedImages.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={URL.createObjectURL(image)} 
                            alt={`Bild ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {postType === "video" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Video hinzufügen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="outline" 
                    onClick={() => videoInputRef.current?.click()}
                    className="w-full gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Video auswählen
                  </Button>
                  {selectedVideo && (
                    <div className="relative">
                      <video 
                        src={URL.createObjectURL(selectedVideo)} 
                        className="w-full h-32 object-cover rounded-lg"
                        controls
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => setSelectedVideo(null)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {postType === "poll" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Umfrage erstellen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input 
                    placeholder="Umfrage-Frage..."
                    value={pollQuestion}
                    onChange={(e) => setPollQuestion(e.target.value)}
                  />
                  <div className="space-y-2">
                    {pollOptions.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input 
                          placeholder={`Option ${index + 1}...`}
                          value={option}
                          onChange={(e) => handlePollOptionChange(index, e.target.value)}
                        />
                        {pollOptions.length > 2 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRemovePollOption(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  {pollOptions.length < 6 && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddPollOption}
                      className="w-full"
                    >
                      Option hinzufügen
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {postType === "event" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Event erstellen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input 
                    placeholder="Event-Titel..."
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                  <Input 
                    type="datetime-local"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                  <Input 
                    placeholder="Ort (optional)..."
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                  />
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tags hinzufügen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Tag eingeben..."
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button variant="outline" onClick={handleAddTag}>
                    Hinzufügen
                  </Button>
                </div>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="gap-2">
                        #{tag}
                        <button onClick={() => handleRemoveTag(tag)}>
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Abbrechen
              </Button>
              <Button 
                variant="medical" 
                onClick={handleCreatePost}
                disabled={!content.trim() && postType === "text"}
              >
                Veröffentlichen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}