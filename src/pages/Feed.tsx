import { Plus, TrendingUp, Hash, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Image, BarChart3, Calendar, Filter, SortDesc } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: { name: "Dr. Sarah Müller", role: "Kardiologin", avatar: "SM", verified: true },
      content: "Neue Studienergebnisse zur Herzinsuffizienz zeigen vielversprechende Resultate mit der neuen ACE-Hemmer Therapie. Die 5-Jahres-Überlebensrate konnte um 23% gesteigert werden.",
      type: "text",
      timestamp: "vor 2 Stunden",
      likes: 24,
      comments: 8,
      shares: 5,
      tags: ["kardiologie", "herzinsuffizienz", "therapie"],
      liked: false,
      bookmarked: false
    },
    {
      id: 2,
      author: { name: "Prof. Dr. Michael Weber", role: "Chirurg", avatar: "MW", verified: true },
      content: "Interessante Entwicklungen in der minimalinvasiven Chirurgie. Heute erfolgreich eine komplexe Gallenblasen-OP durchgeführt - Dauer nur 45 Minuten!",
      type: "image",
      timestamp: "vor 4 Stunden",
      likes: 42,
      comments: 12,
      shares: 8,
      tags: ["chirurgie", "minimalinvasiv", "innovation"],
      liked: true,
      bookmarked: false
    },
    {
      id: 3,
      author: { name: "Dr. Anna Fischer", role: "Allgemeinmedizin", avatar: "AF", verified: false },
      content: "Umfrage: Welche Erfahrungen habt ihr mit der Digitalisierung in eurer Praxis gemacht?",
      type: "poll",
      timestamp: "vor 1 Tag",
      likes: 18,
      comments: 24,
      shares: 3,
      poll: {
        question: "Digitalisierung in der Praxis - euer Status?",
        options: [
          { text: "Voll digital", votes: 45 },
          { text: "Teilweise digital", votes: 78 },
          { text: "Noch analog", votes: 12 }
        ]
      },
      tags: ["digitalisierung", "praxis", "umfrage"],
      liked: false,
      bookmarked: true
    }
  ]);

  const [newPost, setNewPost] = useState("");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("alle");

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, bookmarked: !post.bookmarked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        author: { name: "Dr. Ihr Name", role: "Facharzt", avatar: "RT", verified: false },
        content: newPost,
        type: "text" as const,
        timestamp: "gerade eben",
        likes: 0,
        comments: 0,
        shares: 0,
        tags: [],
        liked: false,
        bookmarked: false
      };
      setPosts([post, ...posts]);
      setNewPost("");
      setIsCreatePostOpen(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === "alle") return true;
    if (activeTab === "following") return post.author.verified;
    if (activeTab === "trending") return post.likes > 20;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <Input 
              placeholder="Suchen in Posts, Personen, Tags..." 
              className="flex-1"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <SortDesc className="h-4 w-4 mr-2" />
                  Neueste zuerst
                </DropdownMenuItem>
                <DropdownMenuItem>Beliebteste zuerst</DropdownMenuItem>
                <DropdownMenuItem>Nur verifizierte Nutzer</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
            <DialogTrigger asChild>
              <Button variant="medical" className="gap-2">
                <Plus className="h-4 w-4" />
                Post erstellen
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Neuen Post erstellen</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-medical flex items-center justify-center">
                    <span className="text-white font-semibold">RT</span>
                  </div>
                  <div className="flex-1">
                    <Textarea 
                      placeholder="Was möchten Sie mit der medizinischen Community teilen?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="min-h-[120px] resize-none border-0 bg-muted/30"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Image className="h-4 w-4" />
                      Bild
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <BarChart3 className="h-4 w-4" />
                      Umfrage
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Calendar className="h-4 w-4" />
                      Event
                    </Button>
                  </div>
                  <Button 
                    variant="medical" 
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                  >
                    Veröffentlichen
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Feed Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="alle">Alle Posts</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab} className="space-y-6 mt-6">
                {/* Quick Post */}
                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-medical flex items-center justify-center">
                        <span className="text-white font-semibold">RT</span>
                      </div>
                      <div className="flex-1">
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-muted-foreground h-12 bg-muted/30"
                          onClick={() => setIsCreatePostOpen(true)}
                        >
                          Was beschäftigt Sie heute in der Medizin?
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Posts */}
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="shadow-soft hover:shadow-md transition-shadow">
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
                                <Badge variant="secondary" className="text-xs">✓ Verifiziert</Badge>
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
                            <DropdownMenuItem>Folgen</DropdownMenuItem>
                            <DropdownMenuItem>Melden</DropdownMenuItem>
                            <DropdownMenuItem>Link kopieren</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
                      
                      {/* Post Media/Content */}
                      {post.type === "image" && (
                        <div className="mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
                          <div className="aspect-video flex items-center justify-center">
                            <p className="text-muted-foreground">📷 Chirurgische Aufnahmen</p>
                          </div>
                        </div>
                      )}
                      
                      {post.type === "poll" && post.poll && (
                        <div className="mb-4 p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-medium mb-3">{post.poll.question}</h4>
                          <div className="space-y-2">
                            {post.poll.options.map((option, idx) => {
                              const total = post.poll!.options.reduce((sum, opt) => sum + opt.votes, 0);
                              const percentage = Math.round((option.votes / total) * 100);
                              return (
                                <div key={idx} className="relative">
                                  <div className="flex items-center justify-between p-2 rounded bg-background cursor-pointer hover:bg-muted/50">
                                    <span className="text-sm">{option.text}</span>
                                    <span className="text-sm font-medium">{percentage}%</span>
                                  </div>
                                  <div 
                                    className="absolute left-0 top-0 h-full bg-accent/20 rounded transition-all"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {post.poll.options.reduce((sum, opt) => sum + opt.votes, 0)} Stimmen
                          </p>
                        </div>
                      )}
                      
                      {/* Tags */}
                      {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`gap-2 ${post.liked ? 'text-red-500' : ''}`}
                            onClick={() => handleLike(post.id)}
                          >
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className={post.bookmarked ? 'text-accent' : ''}
                          onClick={() => handleBookmark(post.id)}
                        >
                          <Bookmark className={`h-4 w-4 ${post.bookmarked ? 'fill-current' : ''}`} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  <CardTitle className="text-lg">Trendende Themen</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { tag: "kardiologie", posts: "1.2k Posts" },
                  { tag: "covid19", posts: "856 Posts" },
                  { tag: "telemedizin", posts: "643 Posts" },
                  { tag: "ki-medizin", posts: "421 Posts" },
                  { tag: "chirurgie", posts: "398 Posts" }
                ].map((topic) => (
                  <div key={topic.tag} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-accent" />
                      <div>
                        <span className="text-sm font-medium">#{topic.tag}</span>
                        <p className="text-xs text-muted-foreground">{topic.posts}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Empfohlene Profile */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Empfohlene Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Dr. Sarah Schmidt", role: "Kardiologin", followers: "2.4k", status: "Verbinden" },
                  { name: "Prof. Michael Berg", role: "Neurochirurg", followers: "5.1k", status: "Folgen" },
                  { name: "Dr. Lisa Weber", role: "Dermatologin", followers: "1.8k", status: "Verbinden" },
                ].map((profile, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-community flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{profile.name}</p>
                        <p className="text-xs text-muted-foreground">{profile.role} • {profile.followers} Follower</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">{profile.status}</Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Ihre Aktivität</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Posts diese Woche</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Profilaufrufe</span>
                  <span className="font-semibold">234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Neue Verbindungen</span>
                  <span className="font-semibold">8</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}