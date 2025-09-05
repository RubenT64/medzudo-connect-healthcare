import { Search, Plus, Users, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Explore() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex h-16 items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-foreground">Entdecken</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Suchen..." className="pl-10 w-80" />
            </div>
            <Button variant="medical">
              <Plus className="h-4 w-4 mr-2" />
              Erstellen
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Getting Started Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-semibold">Erste Schritte</h2>
          </div>
          <p className="text-muted-foreground mb-6">Entdecke die wichtigsten Features von Medzudo</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Profil vervollständigen",
                description: "Füge deine Berufserfahrung und Qualifikationen hinzu",
                icon: User,
                action: "Profil bearbeiten"
              },
              {
                title: "Communities entdecken",
                description: "Finde Fachgruppen zu deinen Interessensgebieten",
                icon: Users,
                action: "Communities finden"
              },
              {
                title: "Ersten Beitrag erstellen",
                description: "Teile dein Wissen mit der Community",
                icon: Plus,
                action: "Beitrag erstellen"
              }
            ].map((step, i) => (
              <Card key={i} className="shadow-soft hover:shadow-medical transition-all duration-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-medical">
                      <step.icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <Button variant="outline" className="w-full">{step.action}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Profiles */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Empfohlene Profile</h2>
            <Button variant="ghost">Alle anzeigen</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Laura Schmidt", role: "Medizinerin", status: "Verbinden", gradient: "from-pink-400 to-cyan-400" },
              { name: "Dr. Peter Müller", role: "Hallo ich bins", status: "Request Sent", gradient: "from-orange-400 to-pink-400" },
              { name: "Dr Eren EREN Sonmez", role: "dEVELOP", status: "Verbinden", gradient: "from-gray-600 to-gray-800" },
              { name: "Dr. Zino Volkmann", role: "Experte für dein Zahn", status: "Verbunden", gradient: "from-green-400 to-blue-500" }
            ].map((profile, i) => (
              <Card key={i} className="shadow-soft overflow-hidden">
                <div className={`h-20 bg-gradient-to-br ${profile.gradient}`} />
                <CardContent className="p-4 -mt-8 relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-medical flex items-center justify-center mb-3 ring-4 ring-background">
                      <span className="text-white font-semibold">
                        {profile.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{profile.role}</p>
                    <Button 
                      variant={profile.status === "Verbunden" ? "secondary" : "outline"} 
                      size="sm" 
                      className="w-full"
                    >
                      {profile.status}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Popular Communities */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Beliebte Communities</h2>
            <Button variant="ghost">Alle anzeigen</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Enhanced Community Test", members: "2", gradient: "from-orange-300 to-pink-300" },
              { name: "Studienplatztausch", members: "2", gradient: "from-pink-300 to-pink-300" },
              { name: "FINAL TEST Community", members: "2", gradient: "from-purple-300 to-blue-300" },
              { name: "TEST Community", members: "2", gradient: "from-green-300 to-yellow-300" },
              { name: "Zahn Community", members: "2", gradient: "from-cyan-300 to-teal-300" }
            ].map((community, i) => (
              <Card key={i} className="shadow-soft overflow-hidden hover:shadow-medical transition-all duration-200">
                <div className={`h-24 bg-gradient-to-br ${community.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-2 right-2">
                    <Building className="h-5 w-5 text-white/80" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-medical flex items-center justify-center -mt-8 ring-4 ring-background">
                      <span className="text-white font-semibold text-sm">
                        {community.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{community.name}</h3>
                      <p className="text-sm text-muted-foreground">Community</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{community.members} Mitglieder</span>
                    </div>
                    <Button variant="outline" size="sm">Beitreten</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}