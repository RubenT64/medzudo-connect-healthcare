import { Search, Plus, Users, Filter, Calendar, Image, Settings, Globe, Lock, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export default function Communities() {
  const navigate = useNavigate();

  const handleCommunityClick = (id: string) => {
    navigate(`/communities/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex h-16 items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-foreground">Communities</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Communities suchen..." className="pl-10 w-80" />
            </div>
            <Button variant="medical">
              <Plus className="h-4 w-4 mr-2" />
              Community erstellen
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Category Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-lg font-semibold">Kategorien</h2>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {[
              "Alle", "Community", "Fachgesellschaft", "Praxis/MVZ", 
              "Semester", "Organisation", "Verband", "Verein", "Bildungseinrichtung"
            ].map((category, i) => (
              <Badge 
                key={category} 
                variant={i === 0 ? "default" : "secondary"} 
                className="cursor-pointer hover:bg-accent transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Community Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="my">Meine Communities</TabsTrigger>
            <TabsTrigger value="all">Alle Communities</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  id: "1",
                  name: "Kardiologie Experten",
                  type: "Fachgesellschaft",
                  members: 1247,
                  description: "Eine Community für Kardiologen, Herzchirurgen und alle, die sich für Herzmedizin interessieren.",
                  gradient: "from-red-400 to-pink-500",
                  privacy: "public"
                },
                { 
                  id: "2",
                  name: "Notfallmedizin Deutschland",
                  type: "Community",
                  members: 892,
                  description: "Austausch und Weiterbildung für Notfallmediziner, Rettungsdienstler und Intensivmediziner.",
                  gradient: "from-orange-400 to-red-500",
                  privacy: "public"
                },
                { 
                  id: "3",
                  name: "Chirurgie Innovation",
                  type: "Community",
                  members: 634,
                  description: "Neueste Entwicklungen in der Chirurgie - von Robotik bis minimalinvasive Techniken.",
                  gradient: "from-blue-400 to-purple-500",
                  privacy: "public"
                },
                { 
                  id: "4",
                  name: "Medizinstudenten Hamburg",
                  type: "Semester",
                  members: 458,
                  description: "Lokale Community für Medizinstudenten in Hamburg - Lerntreffs, Austausch, Events.",
                  gradient: "from-green-400 to-blue-500",
                  privacy: "private"
                },
                { 
                  id: "5",
                  name: "Radiologie Fortbildung",
                  type: "Bildungseinrichtung",
                  members: 723,
                  description: "Fortbildungen und Fallbesprechungen in der diagnostischen und interventionellen Radiologie.",
                  gradient: "from-purple-400 to-pink-500",
                  privacy: "public"
                },
                { 
                  id: "6",
                  name: "Praxis Management",
                  type: "Praxis/MVZ",
                  members: 312,
                  description: "Tipps und Tricks für erfolgreiches Praxismanagement - von Abrechnung bis Patientenbetreuung.",
                  gradient: "from-teal-400 to-green-500",
                  privacy: "hidden"
                }
              ].map((community, i) => (
                <Card 
                  key={i} 
                  className="shadow-soft overflow-hidden hover:shadow-medical transition-all duration-200 group cursor-pointer"
                  onClick={() => handleCommunityClick(community.id)}
                >
                  {/* Header with gradient background */}
                  <div className={`h-24 bg-gradient-to-br ${community.gradient} relative`}>
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute top-2 right-2 flex items-center gap-2">
                      {community.privacy === "public" && <Globe className="h-4 w-4 text-white/80" />}
                      {community.privacy === "private" && <Lock className="h-4 w-4 text-white/80" />}
                      {community.privacy === "hidden" && <EyeOff className="h-4 w-4 text-white/80" />}
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {community.type}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-medical flex items-center justify-center -mt-8 ring-4 ring-background">
                        <span className="text-white font-semibold text-sm">
                          {community.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 pt-2">
                        <h3 className="font-semibold text-foreground truncate text-base">{community.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Users className="h-4 w-4" />
                          <span>{community.members} Mitglieder</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {community.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <div className="flex -space-x-2">
                          {[1, 2].map((_, j) => (
                            <div key={j} className="h-6 w-6 rounded-full bg-gradient-community ring-2 ring-background flex items-center justify-center">
                              <span className="text-white text-xs font-medium">
                                {String.fromCharCode(65 + j)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="hover:bg-accent transition-colors">
                        Beitreten
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my" className="space-y-6">
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Noch keine Communities</h3>
              <p className="text-muted-foreground mb-4">
                Treten Sie Communities bei oder erstellen Sie Ihre eigene Community
              </p>
              <Button variant="medical">Community erstellen</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}