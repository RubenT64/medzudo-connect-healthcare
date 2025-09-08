import { useState } from "react";
import { Search, Filter, Check, Trash2, Settings, Heart, MessageCircle, UserPlus, Share2, Bell, BellOff, Users, Calendar, Award, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function Notifications() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "Neue Nachricht",
      content: "Dr. Schmidt hat dir eine Nachricht gesendet",
      sender: "Dr. Schmidt",
      senderAvatar: "DS",
      time: "vor 5 Min",
      unread: true,
      category: "messages"
    },
    {
      id: 2,
      type: "like",
      title: "Neuer Like",
      content: "Dr. Müller gefällt dein Beitrag über Kardiologie",
      sender: "Dr. Müller",
      senderAvatar: "DM",
      time: "vor 15 Min",
      unread: true,
      category: "interactions"
    },
    {
      id: 3,
      type: "follow",
      title: "Neuer Follower",
      content: "Prof. Wagner folgt dir jetzt",
      sender: "Prof. Wagner",
      senderAvatar: "PW",
      time: "vor 1 Std",
      unread: true,
      category: "social"
    },
    {
      id: 4,
      type: "comment",
      title: "Neuer Kommentar",
      content: "Dr. Klein hat deinen Artikel kommentiert",
      sender: "Dr. Klein",
      senderAvatar: "DK",
      time: "vor 2 Std",
      unread: false,
      category: "interactions"
    },
    {
      id: 5,
      type: "connection",
      title: "Verbindungsanfrage",
      content: "Dr. Fischer möchte sich mit dir vernetzen",
      sender: "Dr. Fischer",
      senderAvatar: "DF",
      time: "vor 3 Std",
      unread: true,
      category: "connections"
    },
    {
      id: 6,
      type: "share",
      title: "Beitrag geteilt",
      content: "Dr. Weber hat deinen Beitrag geteilt",
      sender: "Dr. Weber",
      senderAvatar: "DW",
      time: "vor 4 Std",
      unread: true,
      category: "interactions"
    },
    {
      id: 7,
      type: "event",
      title: "Event-Erinnerung",
      content: "Medizinkonferenz 2024 beginnt morgen",
      sender: "System",
      senderAvatar: "SY",
      time: "vor 1 Tag",
      unread: false,
      category: "system"
    },
    {
      id: 8,
      type: "achievement",
      title: "Neue Auszeichnung",
      content: "Du hast die Auszeichnung 'Experte' erhalten",
      sender: "System",
      senderAvatar: "SY",
      time: "vor 2 Tagen",
      unread: false,
      category: "system"
    }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    messageNotifications: true,
    likeNotifications: true,
    followNotifications: true,
    commentNotifications: true
  });

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      message: MessageCircle,
      like: Heart,
      follow: UserPlus,
      comment: MessageCircle,
      connection: Users,
      share: Share2,
      event: Calendar,
      achievement: Award
    };
    return iconMap[type as keyof typeof iconMap] || Bell;
  };

  const getNotificationColor = (type: string) => {
    const colorMap = {
      message: "text-blue-500",
      like: "text-red-500",
      follow: "text-green-500",
      comment: "text-purple-500",
      connection: "text-yellow-500",
      share: "text-indigo-500",
      event: "text-orange-500",
      achievement: "text-pink-500"
    };
    return colorMap[type as keyof typeof colorMap] || "text-primary";
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.sender.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || 
                         (activeFilter === "unread" && notification.unread) ||
                         notification.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const unreadCount = notifications.filter(n => n.unread).length;
  const connectionRequests = notifications.filter(n => n.type === "connection" && n.unread);

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
    toast({
      description: "Benachrichtigung als gelesen markiert"
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    toast({
      description: "Alle Benachrichtigungen als gelesen markiert"
    });
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      description: "Benachrichtigung gelöscht"
    });
  };

  const acceptConnection = (id: number) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      deleteNotification(id);
      toast({
        description: `Verbindung mit ${notification.sender} akzeptiert`
      });
    }
  };

  const declineConnection = (id: number) => {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      deleteNotification(id);
      toast({
        description: `Verbindungsanfrage von ${notification.sender} abgelehnt`
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Bell className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Benachrichtigungen</h1>
            </div>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="text-xs px-2 py-1">
                {unreadCount} Ungelesen
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Benachrichtigungen suchen..." 
                className="pl-10 w-80"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Filter className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-popover/95 backdrop-blur-sm" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Filter</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { key: "all", label: "Alle" },
                      { key: "unread", label: "Ungelesen" },
                      { key: "messages", label: "Nachrichten" },
                      { key: "interactions", label: "Interaktionen" },
                      { key: "social", label: "Sozial" },
                      { key: "connections", label: "Verbindungen" },
                      { key: "system", label: "System" }
                    ].map(filter => (
                      <Button
                        key={filter.key}
                        variant={activeFilter === filter.key ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setActiveFilter(filter.key)}
                        className="justify-start h-8"
                      >
                        {filter.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button variant="ghost" size="icon" onClick={markAllAsRead} className="h-9 w-9">
              <Check className="h-4 w-4" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Settings className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-popover/95 backdrop-blur-sm" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Benachrichtigungseinstellungen</h4>
                  <div className="space-y-3">
                    {[
                      { key: "emailNotifications", label: "E-Mail Benachrichtigungen" },
                      { key: "pushNotifications", label: "Push Benachrichtigungen" },
                      { key: "messageNotifications", label: "Neue Nachrichten" },
                      { key: "likeNotifications", label: "Likes" },
                      { key: "followNotifications", label: "Neue Follower" },
                      { key: "commentNotifications", label: "Kommentare" }
                    ].map(setting => (
                      <div key={setting.key} className="flex items-center justify-between">
                        <label className="text-sm font-medium">{setting.label}</label>
                        <Switch
                          checked={settings[setting.key as keyof typeof settings]}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({ ...prev, [setting.key]: checked }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alle ({filteredNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="connections" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Verbindungen ({connectionRequests.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex items-center gap-2">
              <BellOff className="h-4 w-4" />
              Ungelesen ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="archived" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Archiviert
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <Card className="p-8 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Keine Benachrichtigungen gefunden</p>
              </Card>
            ) : (
              filteredNotifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type);
                
                return (
                  <Card 
                    key={notification.id} 
                    className={`transition-all duration-200 hover:shadow-md cursor-pointer border ${
                      notification.unread 
                        ? 'border-l-4 border-l-primary bg-primary/5 shadow-sm' 
                        : 'border-border hover:border-border/60'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex items-center gap-3">
                          {notification.unread && (
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                          )}
                          
                          <div className="relative">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold">
                                {notification.senderAvatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background border-2 border-background flex items-center justify-center ${iconColor}`}>
                              <IconComponent className="h-3 w-3" />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm text-foreground">{notification.title}</h4>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.content}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {notification.sender}
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {notification.type === "connection" && notification.unread && (
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => acceptConnection(notification.id)}
                                className="h-8 px-3 text-xs"
                              >
                                Akzeptieren
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => declineConnection(notification.id)}
                                className="h-8 px-3 text-xs"
                              >
                                Ablehnen
                              </Button>
                            </>
                          )}
                          
                          {notification.unread && notification.type !== "connection" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8 text-muted-foreground hover:text-foreground"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </TabsContent>

          <TabsContent value="connections" className="space-y-3">
            {connectionRequests.length === 0 ? (
              <Card className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Keine neuen Verbindungsanfragen</p>
              </Card>
            ) : (
              connectionRequests.map((notification) => (
                <Card key={notification.id} className="border-l-4 border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white font-semibold">
                            {notification.senderAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-foreground">{notification.sender}</h4>
                          <p className="text-sm text-muted-foreground">möchte sich mit dir vernetzen</p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => acceptConnection(notification.id)}
                        >
                          Akzeptieren
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => declineConnection(notification.id)}
                        >
                          Ablehnen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="unread" className="space-y-3">
            {notifications.filter(n => n.unread).map((notification) => {
              const IconComponent = getNotificationIcon(notification.type);
              const iconColor = getNotificationColor(notification.type);
              
              return (
                <Card key={notification.id} className="border-l-4 border-l-primary bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold">
                              {notification.senderAvatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background border-2 border-background flex items-center justify-center ${iconColor}`}>
                            <IconComponent className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-sm">{notification.title}</h4>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.content}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markAsRead(notification.id)}
                        className="h-8 w-8"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="archived" className="space-y-3">
            <Card className="p-8 text-center">
              <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Keine archivierten Benachrichtigungen</p>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="px-8">
              Weitere laden
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}