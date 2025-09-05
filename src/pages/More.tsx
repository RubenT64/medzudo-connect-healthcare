import { 
  User, 
  Bookmark, 
  Users, 
  Bell, 
  Plus, 
  Building, 
  Briefcase, 
  ArrowRight, 
  Settings,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function More() {
  const profileSections = [
    {
      title: "Mein Profil",
      items: [
        { icon: Bookmark, label: "Gespeicherte Beiträge", href: "/saved" },
        { icon: Users, label: "Meine Communities", href: "/my-communities" },
        { icon: Bell, label: "Benachrichtigungen", href: "/notifications" }
      ]
    },
    {
      title: "Meine Organisation", 
      items: [
        { icon: Plus, label: "Organisation erstellen", href: "/create-org" },
        { icon: Briefcase, label: "Medzudo Jobs", subtitle: "Unternehmen", href: "/jobs" },
        { icon: Building, label: "Test Organisation", subtitle: "Unternehmen", href: "/test-org" },
        { icon: Building, label: "medzudo GmbH", subtitle: "Startup", href: "/medzudo-gmbh" }
      ]
    }
  ];

  const quickActions = [
    { icon: User, label: "Zu Medzudo Einladen", href: "/invite" },
    { icon: Settings, label: "Einstellungen", href: "/settings" },
    { icon: Shield, label: "Datenschutz", href: "/privacy" },
    { icon: HelpCircle, label: "FAQ & Support", href: "/support" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-2xl font-bold text-foreground">Mehr</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 max-w-2xl">
        {/* Profile Sections */}
        <div className="space-y-6">
          {profileSections.map((section, i) => (
            <div key={i} className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {section.title}
              </h2>
              <Card className="shadow-soft">
                <CardContent className="p-0">
                  {section.items.map((item, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border last:border-b-0"
                    >
                      <div className="p-2 rounded-lg bg-gradient-medical/10">
                        <item.icon className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground">{item.label}</h3>
                        {item.subtitle && (
                          <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Quick Actions */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Weitere Optionen
            </h2>
            <Card className="shadow-soft">
              <CardContent className="p-0">
                {quickActions.map((action, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border last:border-b-0"
                  >
                    <div className="p-2 rounded-lg bg-gradient-community/10">
                      <action.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground">{action.label}</h3>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Logout */}
          <Card className="shadow-soft border-destructive/20">
            <CardContent className="p-0">
              <div className="flex items-center gap-4 p-4 hover:bg-destructive/5 transition-colors cursor-pointer">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <LogOut className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-destructive">Abmelden</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}