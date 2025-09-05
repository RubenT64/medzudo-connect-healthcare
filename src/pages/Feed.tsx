import { Plus, TrendingUp, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Feed() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4 flex-1 max-w-lg">
            <Input 
              placeholder="Suchen..." 
              className="flex-1"
            />
          </div>
          <Button variant="medical" className="gap-2">
            <Plus className="h-4 w-4" />
            Post erstellen
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* New Post Card */}
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-medical flex items-center justify-center">
                    <span className="text-white font-semibold">RT</span>
                  </div>
                  <div className="flex-1">
                    <Input 
                      placeholder="Was beschäftigt Sie heute?" 
                      className="border-0 bg-muted/30 text-base"
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">📷 Foto</Button>
                        <Button variant="ghost" size="sm">📋 Umfrage</Button>
                        <Button variant="ghost" size="sm">🎯 Event</Button>
                      </div>
                      <Button variant="medical" size="sm">Teilen</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sample Posts */}
            {[1, 2, 3].map((post) => (
              <Card key={post} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-community flex items-center justify-center">
                      <span className="text-white font-semibold">MM</span>
                    </div>
                    <div>
                      <CardTitle className="text-base">Dr. Max Müller</CardTitle>
                      <p className="text-sm text-muted-foreground">Hallooo • vor 2 Tagen</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4">
                    {post === 1 && "look at this"}
                    {post === 2 && "Interessante Entwicklungen in der Telemedizin..."}
                    {post === 3 && "Neue Leitlinien für die Patientenbetreuung sind verfügbar."}
                  </p>
                  {post === 1 && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 text-center">
                        <p className="text-sm text-muted-foreground">Mobile App Screenshots</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <Button variant="ghost" size="sm">👍 Gefällt mir</Button>
                    <Button variant="ghost" size="sm">💬 Kommentieren</Button>
                    <Button variant="ghost" size="sm">↗️ Teilen</Button>
                    <Button variant="ghost" size="sm">🔖 Speichern</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
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
                {["medizin", "medzudo", "health", "startup"].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <Hash className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">#{tag}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recommended Profiles */}
            <Card className="shadow-soft">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Empfohlene Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Dr. Sarah Schmidt", role: "Kardiologin", status: "Verbinden" },
                  { name: "Prof. Michael Berg", role: "Chirurg", status: "Folgen" },
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
                        <p className="text-xs text-muted-foreground">{profile.role}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">{profile.status}</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}