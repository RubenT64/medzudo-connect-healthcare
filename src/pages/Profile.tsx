import { Edit, MapPin, Calendar, Building, GraduationCap, Award, Users, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-medical relative">
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="container mx-auto px-6 -mt-24 relative">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="flex flex-col items-center lg:items-start">
              <div className="h-32 w-32 rounded-full bg-gradient-medical border-4 border-background flex items-center justify-center mb-4">
                <span className="text-white text-4xl font-bold">RT</span>
              </div>
              <Button variant="outline" className="gap-2">
                <Edit className="h-4 w-4" />
                Profil bearbeiten
              </Button>
            </div>

            <div className="flex-1 min-w-0 mt-8 lg:mt-0">
              <div className="bg-card rounded-lg p-6 shadow-soft">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Dr. Ruben Tollmann</h1>
                    <p className="text-xl text-muted-foreground">Geschäftsführer • Medzudooo</p>
                    <p className="text-lg text-foreground mt-2">Arzt der Herzen | CEO</p>
                    
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>Berlin, Deutschland</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Mitglied seit April 2025</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center text-center space-y-6 lg:flex-row lg:space-y-0 lg:space-x-8">
                    <div>
                      <div className="text-2xl font-bold text-foreground">3</div>
                      <div className="text-sm text-muted-foreground">Verbindungen</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">90</div>
                      <div className="text-sm text-muted-foreground">Posts</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-foreground">5</div>
                      <div className="text-sm text-muted-foreground">Communities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-6 py-6">
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="about">Über mich</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
            <TabsTrigger value="posts">Beiträge</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* About Section */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    Über mich
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Ich bin user nummer 1456</p>
                </CardContent>
              </Card>

              {/* Experience Section */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-accent" />
                    Berufserfahrung
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-medical">
                      <Building className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Arzt</h3>
                      <p className="text-sm text-muted-foreground">Klinik hildesheim</p>
                      <p className="text-sm text-muted-foreground">Innere Medizin</p>
                      <p className="text-xs text-muted-foreground">Düsseldorf</p>
                      <p className="text-xs text-muted-foreground">Aug 2025 - Okt 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Education Section */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-accent" />
                    Ausbildung
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-community">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">Medizinstudium</h3>
                      <p className="text-sm text-muted-foreground">Universität Düsseldorf</p>
                      <p className="text-xs text-muted-foreground">2020 - 2025</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Certifications */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-accent" />
                    Qualifikationen
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["Innere Medizin", "Kardiologie", "Notfallmedizin", "Ultraschall"].map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="communities" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Kardiologie Experten", members: 156, role: "Mitglied" },
                { name: "Notfallmedizin", members: 89, role: "Moderator" },
                { name: "Junge Ärzte", members: 234, role: "Mitglied" }
              ].map((community, i) => (
                <Card key={i} className="shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-medical flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{community.name}</h3>
                        <p className="text-sm text-muted-foreground">{community.members} Mitglieder</p>
                      </div>
                    </div>
                    <Badge variant={community.role === "Moderator" ? "default" : "secondary"}>
                      {community.role}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Noch keine Beiträge</h3>
              <p className="text-muted-foreground mb-4">
                Teilen Sie Ihr Wissen mit der Community
              </p>
              <Button variant="medical">Ersten Beitrag erstellen</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}