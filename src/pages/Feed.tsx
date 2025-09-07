import { Plus, TrendingUp, Hash, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Image, BarChart3, Calendar, Filter, SortDesc, UserPlus, Flag, Link, Forward, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { CommentSection } from "@/components/CommentSection";
import { PostCreator } from "@/components/PostCreator";
import { toast } from "@/hooks/use-toast";

interface PostAuthor {
  name: string;
  role: string;
  avatar: string;
  verified: boolean;
  following: boolean;
}

interface PollOption {
  text: string;
  votes: number;
}

interface Poll {
  question: string;
  options: PollOption[];
}

interface Event {
  title: string;
  date: string;
  location?: string;
}

interface Post {
  id: number;
  author: PostAuthor;
  content: string;
  type: "text" | "image" | "video" | "poll" | "event";
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  tags: string[];
  liked: boolean;
  bookmarked: boolean;
  poll?: Poll;
  images?: string[];
  video?: string;
  event?: Event;
  originalPost?: Post;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: { name: "Dr. Sarah Müller", role: "Kardiologin", avatar: "SM", verified: true, following: false },
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
      author: { name: "Prof. Dr. Michael Weber", role: "Chirurg", avatar: "MW", verified: true, following: true },
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
      author: { name: "Dr. Anna Fischer", role: "Allgemeinmedizin", avatar: "AF", verified: false, following: false },
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
  const [openComments, setOpenComments] = useState<number | null>(null);

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

  const handleCreatePost = (postData: any) => {
    setPosts([postData, ...posts]);
  };

  const handleFollow = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, author: { ...post.author, following: !post.author.following } }
        : post
    ));
    const post = posts.find(p => p.id === postId);
    if (post) {
      toast({ 
        title: post.author.following ? `Sie folgen ${post.author.name} nicht mehr` : `Sie folgen jetzt ${post.author.name}` 
      });
    }
  };

  const handleReport = (postId: number) => {
    toast({ title: "Post gemeldet", description: "Danke, wir prüfen den Post." });
  };

  const handleCopyLink = (postId: number) => {
    const url = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Link kopiert!" });
  };

  const handleShare = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post && navigator.share) {
      navigator.share({
        title: `Post von ${post.author.name}`,
        text: post.content,
        url: `${window.location.origin}/post/${postId}`
      });
    } else {
      handleCopyLink(postId);
    }
  };

  const handleForward = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setPosts(prev => prev.map(p => 
        p.id === postId ? { ...p, shares: p.shares + 1 } : p
      ));
      
      const forwardedPost: Post = {
        ...post,
        id: Date.now(),
        author: { name: "Dr. Ihr Name", role: "Facharzt", avatar: "RT", verified: false, following: false },
        content: `Weitergeleitet von ${post.author.name}:\n\n${post.content}`,
        timestamp: "gerade eben",
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        bookmarked: false,
        originalPost: post
      };
      
      setPosts([forwardedPost, ...posts]);
      toast({ title: "Post weitergeleitet!" });
    }
  };

  const handleVotePoll = (postId: number, optionIndex: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId && post.poll) {
        const newOptions = [...post.poll.options];
        newOptions[optionIndex] = { ...newOptions[optionIndex], votes: newOptions[optionIndex].votes + 1 };
        return { ...post, poll: { ...post.poll, options: newOptions } };
      }
      return post;
    }));
    toast({ title: "Ihre Stimme wurde gezählt!" });
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
          
          <PostCreator onCreatePost={handleCreatePost} />
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
                            <DropdownMenuItem onClick={() => handleFollow(post.id)} className="gap-2">
                              <UserPlus className="h-4 w-4" />
                              {post.author.following ? "Nicht mehr folgen" : "Folgen"}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleForward(post.id)} className="gap-2">
                              <Forward className="h-4 w-4" />
                              Weiterleiten
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyLink(post.id)} className="gap-2">
                              <Link className="h-4 w-4" />
                              Link kopieren
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(post.id)} className="gap-2">
                              <Share2 className="h-4 w-4" />
                              Teilen
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleReport(post.id)} className="gap-2 text-destructive">
                              <Flag className="h-4 w-4" />
                              Melden
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>
                      
                      {/* Post Media/Content */}
                      {post.type === "image" && !post.images && (
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
                              const percentage = total > 0 ? Math.round((option.votes / total) * 100) : 0;
                              return (
                                <div key={idx} className="relative">
                                  <div 
                                    className="flex items-center justify-between p-2 rounded bg-background cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => handleVotePoll(post.id, idx)}
                                  >
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

                      {/* Images */}
                      {post.type === "image" && post.images && (
                        <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg overflow-hidden">
                          {post.images.slice(0, 4).map((image: string, idx: number) => (
                            <div key={idx} className="aspect-square">
                              <img 
                                src={image} 
                                alt={`Post Bild ${idx + 1}`}
                                className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer"
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Video */}
                      {post.type === "video" && post.video && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <video 
                            src={post.video} 
                            controls
                            className="w-full aspect-video"
                          />
                        </div>
                      )}

                      {/* Event */}
                      {post.type === "event" && post.event && (
                        <div className="mb-4 p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg border border-accent/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-5 w-5 text-accent" />
                            <h4 className="font-semibold">{post.event.title}</h4>
                          </div>
                          <div className="text-sm space-y-1">
                            <p><strong>Datum:</strong> {new Date(post.event.date).toLocaleString()}</p>
                            {post.event.location && <p><strong>Ort:</strong> {post.event.location}</p>}
                          </div>
                          <Button variant="outline" size="sm" className="mt-3 gap-2">
                            <Users className="h-4 w-4" />
                            Teilnehmen
                          </Button>
                        </div>
                      )}

                      {/* Forwarded Post */}
                      {post.originalPost && (
                        <div className="mb-4 p-3 bg-muted/30 rounded-lg border-l-4 border-accent">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-6 rounded-full bg-gradient-community flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">{post.originalPost.author.avatar}</span>
                            </div>
                            <span className="text-sm font-medium">{post.originalPost.author.name}</span>
                            <Badge variant="secondary" className="text-xs">Original</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{post.originalPost.content}</p>
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
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => setOpenComments(post.id)}
                          >
                            <MessageCircle className="h-4 w-4" />
                            {post.comments}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => handleShare(post.id)}
                          >
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
                      <div className="h-10 w-10 rounded-full bg-gradient-medical flex items-center justify-center">
                        <span className="text-white font-semibold">{profile.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{profile.name}</p>
                        <p className="text-xs text-muted-foreground">{profile.role} • {profile.followers}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      {profile.status}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Ihre Aktivität */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Ihre Aktivität</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">42</div>
                  <p className="text-xs text-muted-foreground">Posts heute</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">156</div>
                  <p className="text-xs text-muted-foreground">Likes erhalten</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comment Section */}
        {openComments && (
          <CommentSection 
            postId={openComments} 
            isOpen={true} 
            onClose={() => setOpenComments(null)} 
          />
        )}
      </div>
    </div>
  );
}