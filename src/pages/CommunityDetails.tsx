import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Users, Calendar, Image, Settings, Shield, Crown, 
  MoreHorizontal, Plus, Search, Filter, Bell, BellOff, Globe, 
  Lock, EyeOff, Heart, MessageCircle, Share2, Bookmark, Hash,
  TrendingUp, MapPin, Clock, UserPlus, UserMinus, Ban, Video,
  FileText, Download, Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CommunityDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock community data - in real app this would come from API
  const community = {
    id: id || "1",
    name: "Kardiologie Experten",
    description: "Eine Community für Kardiologen, Herzchirurgen und alle, die sich für Herzmedizin interessieren. Wir teilen neueste Forschungsergebnisse, diskutieren komplexe Fälle und unterstützen uns gegenseitig in der täglichen Praxis.",
    type: "Fachgesellschaft",
    privacy: "public" as "public" | "private" | "hidden",
    members: 1247,
    posts: 856,
    events: 12,
    media: 234,
    subcommunities: 5,
    gradient: "from-red-400 to-pink-500",
    coverImage: null,
    userRole: "member" as "founder" | "moderator" | "member",
    isJoined: true,
    isNotificationsEnabled: true,
    location: "Deutschland",
    founded: "2020",
    rules: [
      "Respektvoller Umgang miteinander",
      "Nur medizinisch relevante Inhalte",
      "Patientendaten anonymisieren",
      "Keine Werbung ohne Genehmigung"
    ]
  };

  const [activeTab, setActiveTab] = useState("feed");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newPost, setNewPost] = useState("");

  // Mock data
  const posts = [
    {
      id: 1,
      author: { name: "Dr. Sarah Klein", role: "Kardiologin", avatar: "SK", verified: true },
      content: "Interessanter Fall: 45-jähriger Patient mit atypischen Brustschmerzen. EKG unauffällig, Troponin leicht erhöht. Wie würdet ihr vorgehen?",
      timestamp: "vor 2 Stunden",
      likes: 24,
      comments: 8,
      shares: 3,
      tags: ["fallbesprechung", "diagnostik"],
      liked: false,
      pinned: false
    },
    {
      id: 2,
      author: { name: "Prof. Dr. Michael Weber", role: "Herzchirurg", avatar: "MW", verified: true },
      content: "Neue Leitlinien der ESC für Herzinsuffizienz sind da! Die wichtigsten Änderungen im Überblick...",
      timestamp: "vor 4 Stunden",
      likes: 67,
      comments: 23,
      shares: 15,
      tags: ["leitlinien", "herzinsuffizienz"],
      liked: true,
      pinned: true
    }
  ];

  const events = [
    {
      id: 1,
      title: "Kardiologie Update 2024",
      date: "2024-12-15",
      time: "09:00",
      location: "München",
      type: "Präsenz",
      attendees: 45,
      maxAttendees: 100,
      description: "Jährliches Update zu aktuellen Entwicklungen in der Kardiologie"
    },
    {
      id: 2,
      title: "Online Case Discussion",
      date: "2024-12-20",
      time: "19:00",
      location: "Online",
      type: "Virtual",
      attendees: 89,
      maxAttendees: 200,
      description: "Interaktive Fallbesprechung komplexer kardiologischer Fälle"
    }
  ];

  const members = [
    {
      id: 1,
      name: "Dr. Sarah Klein",
      role: "member",
      title: "Kardiologin",
      location: "Berlin",
      joinDate: "2023-01-15",
      posts: 45,
      avatar: "SK",
      verified: true,
      online: true
    },
    {
      id: 2,
      name: "Prof. Dr. Michael Weber",
      role: "moderator",
      title: "Herzchirurg",
      location: "München",
      joinDate: "2022-03-20",
      posts: 234,
      avatar: "MW",
      verified: true,
      online: false
    },
    {
      id: 3,
      name: "Dr. Lisa Müller",
      role: "founder",
      title: "Oberärztin Kardiologie",
      location: "Hamburg",
      joinDate: "2020-01-01",
      posts: 567,
      avatar: "LM",
      verified: true,
      online: true
    }
  ];

  const mediaFiles = [
    {
      id: 1,
      name: "EKG_Beispiele_2024.pdf",
      type: "document",
      size: "2.4 MB",
      uploadedBy: "Dr. Sarah Klein",
      uploadDate: "2024-01-10",
      downloads: 89
    },
    {
      id: 2,
      name: "Herzchirurgie_OP_Video.mp4",
      type: "video",
      size: "156 MB",
      uploadedBy: "Prof. Dr. Weber",
      uploadDate: "2024-01-08",
      downloads: 234
    }
  ];

  const subcommunities = [
    {
      id: 1,
      name: "Interventionelle Kardiologie",
      members: 234,
      description: "Fokus auf katheterbasierte Eingriffe",
      privacy: "public"
    },
    {
      id: 2,
      name: "Herzinsuffizienz",
      members: 189,
      description: "Diagnostik und Therapie der Herzinsuffizienz",
      privacy: "public"
    }
  ];

  const handleJoinLeave = () => {
    // Handle join/leave logic
  };

  const handleNotificationToggle = () => {
    // Handle notification toggle
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "founder": return <Crown className="h-4 w-4 text-yellow-500" />;
      case "moderator": return <Shield className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "founder": return <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600">Gründer</Badge>;
      case "moderator": return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">Moderator</Badge>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/communities")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </Button>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-medical flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {community.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                </span>
              </div>
              <div>
                <h1 className="text-lg font-semibold">{community.name}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {community.privacy === "public" && <Globe className="h-3 w-3" />}
                  {community.privacy === "private" && <Lock className="h-3 w-3" />}
                  {community.privacy === "hidden" && <EyeOff className="h-3 w-3" />}
                  <span>{community.members.toLocaleString()} Mitglieder</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNotificationToggle}
              className="gap-2"
            >
              {community.isNotificationsEnabled ? (
                <Bell className="h-4 w-4" />
              ) : (
                <BellOff className="h-4 w-4" />
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Link kopieren</DropdownMenuItem>
                <DropdownMenuItem>Community teilen</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Melden</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Verlassen</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {community.isJoined ? (
              <Button variant="outline" onClick={handleJoinLeave}>
                <UserMinus className="h-4 w-4 mr-2" />
                Verlassen
              </Button>
            ) : (
              <Button variant="medical" onClick={handleJoinLeave}>
                <UserPlus className="h-4 w-4 mr-2" />
                Beitreten
              </Button>
            )}

            {(community.userRole === "founder" || community.userRole === "moderator") && (
              <Button variant="ghost" size="sm" onClick={() => setIsSettingsOpen(true)}>
                <Settings className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Community Header */}
      <div className={`h-32 bg-gradient-to-br ${community.gradient} relative`}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute bottom-4 left-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center">
              <span className="text-xl font-bold text-gray-800">
                {community.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
              </span>
            </div>
            <div className="text-white">
              <h2 className="text-2xl font-bold">{community.name}</h2>
              <p className="flex items-center gap-2 text-white/90">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {community.type}
                </Badge>
                <span>•</span>
                <MapPin className="h-4 w-4" />
                <span>{community.location}</span>
                <span>•</span>
                <Clock className="h-4 w-4" />
                <span>Seit {community.founded}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Description */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <p className="text-muted-foreground leading-relaxed max-w-4xl">
            {community.description}
          </p>
          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <span><strong>{community.posts}</strong> Posts</span>
            <span><strong>{community.events}</strong> Events</span>
            <span><strong>{community.media}</strong> Medien</span>
            <span><strong>{community.subcommunities}</strong> Sub-Communities</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="border-b border-border">
            <TabsList className="h-12 bg-transparent p-0">
              <TabsTrigger value="feed" className="data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none">
                Feed
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none">
                Events
              </TabsTrigger>
              <TabsTrigger value="media" className="data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none">
                Medien
              </TabsTrigger>
              <TabsTrigger value="members" className="data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none">
                Mitglieder
              </TabsTrigger>
              <TabsTrigger value="subcommunities" className="data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none">
                Sub-Communities
              </TabsTrigger>
              {(community.userRole === "founder" || community.userRole === "moderator") && (
                <TabsTrigger value="settings" className="data-[state=active]:border-b-2 data-[state=active]:border-accent rounded-none">
                  Einstellungen
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <div className="py-6">
            {/* Feed Tab */}
            <TabsContent value="feed" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Create Post */}
                  <Card className="shadow-soft">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-full bg-gradient-medical flex items-center justify-center">
                          <span className="text-white font-semibold">RT</span>
                        </div>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Teilen Sie Ihr Wissen mit der Community..."
                            value={newPost}
                            onChange={(e) => setNewPost(e.target.value)}
                            className="border-0 bg-muted/30 resize-none"
                            rows={3}
                          />
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="gap-2">
                                <Image className="h-4 w-4" />
                                Bild
                              </Button>
                              <Button variant="ghost" size="sm" className="gap-2">
                                <FileText className="h-4 w-4" />
                                Dokument
                              </Button>
                            </div>
                            <Button variant="medical" size="sm" disabled={!newPost.trim()}>
                              Posten
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Posts */}
                  {posts.map((post) => (
                    <Card key={post.id} className="shadow-soft">
                      {post.pinned && (
                        <div className="bg-accent/10 border-b border-border px-6 py-2">
                          <div className="flex items-center gap-2 text-sm text-accent">
                            <TrendingUp className="h-4 w-4" />
                            <span>Angepinnter Beitrag</span>
                          </div>
                        </div>
                      )}
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-community flex items-center justify-center">
                              <span className="text-white font-semibold">{post.author.avatar}</span>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <CardTitle className="text-base">{post.author.name}</CardTitle>
                                {post.author.verified && (
                                  <Badge variant="secondary" className="text-xs">✓</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {post.author.role} • {post.timestamp}
                              </p>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Link kopieren</DropdownMenuItem>
                              <DropdownMenuItem>Melden</DropdownMenuItem>
                              {(community.userRole === "founder" || community.userRole === "moderator") && (
                                <>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem>Anpinnen</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">Löschen</DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
                        
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className={`gap-2 ${post.liked ? 'text-red-500' : ''}`}>
                              <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <MessageCircle className="h-4 w-4" />
                              {post.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                              <Share2 className="h-4 w-4" />
                              {post.shares}
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <Card className="shadow-soft">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Community Regeln</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {community.rules.map((rule, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-accent font-medium">{i + 1}.</span>
                          <span>{rule}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="shadow-soft">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Aktive Mitglieder</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {members.filter(m => m.online).map((member) => (
                        <div key={member.id} className="flex items-center gap-3">
                          <div className="relative">
                            <div className="h-8 w-8 rounded-full bg-gradient-community flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">{member.avatar}</span>
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full ring-2 ring-background" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1">
                              <p className="text-sm font-medium truncate">{member.name}</p>
                              {getRoleIcon(member.role)}
                            </div>
                            <p className="text-xs text-muted-foreground">{member.title}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Input placeholder="Events suchen..." className="w-80" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Events</SelectItem>
                      <SelectItem value="upcoming">Kommende</SelectItem>
                      <SelectItem value="past">Vergangene</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(community.userRole === "founder" || community.userRole === "moderator") && (
                  <Button variant="medical" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Event erstellen
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="shadow-soft">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={event.type === "Virtual" ? "secondary" : "default"}>
                          {event.type === "Virtual" ? (
                            <><Video className="h-3 w-3 mr-1" />Online</>
                          ) : (
                            <><MapPin className="h-3 w-3 mr-1" />Präsenz</>
                          )}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <Users className="h-4 w-4 inline mr-1" />
                          {event.attendees}/{event.maxAttendees} Teilnehmer
                        </div>
                        <Button variant="outline" size="sm">Teilnehmen</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Input placeholder="Medien suchen..." className="w-80" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Dateien</SelectItem>
                      <SelectItem value="documents">Dokumente</SelectItem>
                      <SelectItem value="images">Bilder</SelectItem>
                      <SelectItem value="videos">Videos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button variant="medical" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Datei hochladen
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mediaFiles.map((file) => (
                  <Card key={file.id} className="shadow-soft">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center">
                          {file.type === "document" && <FileText className="h-5 w-5 text-accent" />}
                          {file.type === "video" && <Video className="h-5 w-5 text-accent" />}
                          {file.type === "image" && <Image className="h-5 w-5 text-accent" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{file.name}</h4>
                          <p className="text-sm text-muted-foreground">{file.size}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Von {file.uploadedBy} • {file.uploadDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-xs text-muted-foreground">
                          {file.downloads} Downloads
                        </span>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <Download className="h-3 w-3" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Members Tab */}
            <TabsContent value="members" className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Input placeholder="Mitglieder suchen..." className="w-80" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Alle Mitglieder</SelectItem>
                      <SelectItem value="founders">Gründer</SelectItem>
                      <SelectItem value="moderators">Moderatoren</SelectItem>
                      <SelectItem value="members">Mitglieder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(community.userRole === "founder" || community.userRole === "moderator") && (
                  <Button variant="medical" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Einladen
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {members.map((member) => (
                  <Card key={member.id} className="shadow-soft">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="h-12 w-12 rounded-full bg-gradient-community flex items-center justify-center">
                            <span className="text-white font-semibold">{member.avatar}</span>
                          </div>
                          {member.online && (
                            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full ring-2 ring-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium truncate">{member.name}</h4>
                            {member.verified && <Badge variant="secondary" className="text-xs">✓</Badge>}
                            {getRoleIcon(member.role)}
                          </div>
                          <p className="text-sm text-muted-foreground">{member.title}</p>
                          <p className="text-xs text-muted-foreground">{member.location}</p>
                          <div className="flex items-center gap-1 mt-2">
                            {getRoleBadge(member.role)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                        <div className="text-xs text-muted-foreground">
                          {member.posts} Posts • Seit {member.joinDate}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Profil ansehen</DropdownMenuItem>
                            <DropdownMenuItem>Nachricht senden</DropdownMenuItem>
                            {(community.userRole === "founder" || community.userRole === "moderator") && member.role === "member" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Zu Moderator machen</DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">Entfernen</DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Sub-Communities Tab */}
            <TabsContent value="subcommunities" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Sub-Communities</h3>
                {(community.userRole === "founder" || community.userRole === "moderator") && (
                  <Button variant="medical" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Sub-Community erstellen
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subcommunities.map((sub) => (
                  <Card key={sub.id} className="shadow-soft">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="h-12 w-12 rounded-full bg-gradient-medical flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {sub.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-lg">{sub.name}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                            <Users className="h-4 w-4" />
                            <span>{sub.members} Mitglieder</span>
                            <span>•</span>
                            {sub.privacy === "public" ? (
                              <><Globe className="h-4 w-4" />Öffentlich</>
                            ) : (
                              <><Lock className="h-4 w-4" />Privat</>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{sub.description}</p>
                      <Button variant="outline" className="w-full">Beitreten</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Settings Tab */}
            {(community.userRole === "founder" || community.userRole === "moderator") && (
              <TabsContent value="settings" className="space-y-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Community Einstellungen</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">Allgemeine Einstellungen</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Community Name</label>
                          <Input defaultValue={community.name} className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Beschreibung</label>
                          <Textarea defaultValue={community.description} className="mt-1" rows={3} />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Datenschutz</label>
                          <Select defaultValue={community.privacy}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  Öffentlich - Jeder kann beitreten
                                </div>
                              </SelectItem>
                              <SelectItem value="private">
                                <div className="flex items-center gap-2">
                                  <Lock className="h-4 w-4" />
                                  Privat - Beitritt nur auf Einladung
                                </div>
                              </SelectItem>
                              <SelectItem value="hidden">
                                <div className="flex items-center gap-2">
                                  <EyeOff className="h-4 w-4" />
                                  Versteckt - Nicht sichtbar in der Suche
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Community Regeln</h4>
                      <div className="space-y-2">
                        {community.rules.map((rule, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Input defaultValue={rule} />
                            <Button variant="ghost" size="sm" className="text-destructive">
                              Entfernen
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="gap-2">
                          <Plus className="h-4 w-4" />
                          Regel hinzufügen
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Button variant="outline">Änderungen verwerfen</Button>
                      <Button variant="medical">Änderungen speichern</Button>
                    </div>
                  </CardContent>
                </Card>

                {community.userRole === "founder" && (
                  <Card className="shadow-soft border-destructive/20">
                    <CardHeader>
                      <CardTitle className="text-destructive">Gefährliche Aktionen</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Community löschen</h4>
                          <p className="text-sm text-muted-foreground">
                            Diese Aktion kann nicht rückgängig gemacht werden.
                          </p>
                        </div>
                        <Button variant="destructive">Community löschen</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}