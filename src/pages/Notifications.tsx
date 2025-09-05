import { Search, Filter, Check, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "NEUE NACHRICHT",
      sender: "hey ruben",
      time: "vor 1 Tagen",
      unread: true,
      avatar: "HR"
    },
    {
      id: 2,
      type: "NEUE NACHRICHT", 
      sender: "asdasdasd",
      time: "vor 2 Tagen",
      unread: true,
      avatar: "AD"
    },
    {
      id: 3,
      type: "NEUE NACHRICHT",
      sender: "asdasd",
      time: "vor 2 Tagen", 
      unread: true,
      avatar: "AS"
    },
    {
      id: 4,
      type: "NEUE NACHRICHT",
      sender: "test",
      time: "vor 2 Tagen",
      unread: true,
      avatar: "TE"
    },
    {
      id: 5,
      type: "NEUE NACHRICHT",
      sender: "nasilsin",
      time: "vor 2 Tagen",
      unread: true,
      avatar: "NA"
    },
    {
      id: 6,
      type: "NEUE NACHRICHT", 
      sender: "eren",
      time: "vor 2 Tagen",
      unread: true,
      avatar: "ER"
    },
    {
      id: 7,
      type: "NEUE NACHRICHT",
      sender: "assas",
      time: "vor 2 Tagen",
      unread: true,
      avatar: "AS"
    },
    {
      id: 8,
      type: "NEUE NACHRICHT",
      sender: "asdasdas", 
      time: "vor 2 Tagen",
      unread: true,
      avatar: "AD"
    },
    {
      id: 9,
      type: "NEUE NACHRICHT",
      sender: "Test",
      time: "vor 2 Tagen",
      unread: true,
      avatar: "TE"
    },
    {
      id: 10,
      type: "NEUE NACHRICHT",
      sender: "asdasdasd",
      time: "vor 2 Tagen", 
      unread: true,
      avatar: "AD"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">Benachrichtigungen</h1>
            <Badge variant="destructive" className="text-xs">
              35 Ungelesen
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Suchen..." className="pl-10 w-80" />
            </div>
            <Button variant="ghost" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="space-y-2">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`shadow-soft transition-all duration-200 hover:shadow-medical cursor-pointer ${
                notification.unread ? 'border-l-4 border-l-accent bg-accent/5' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Notification Indicator */}
                    {notification.unread && (
                      <div className="h-2 w-2 rounded-full bg-accent"></div>
                    )}
                    
                    {/* Avatar */}
                    <div className="h-10 w-10 rounded-full bg-gradient-medical flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{notification.avatar}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="default" className="text-xs">
                          {notification.type}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{notification.time}</span>
                      </div>
                      <p className="text-foreground font-medium">{notification.sender}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline">Weitere laden</Button>
        </div>
      </div>
    </div>
  );
}