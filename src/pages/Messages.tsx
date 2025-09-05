import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Messages() {
  const conversations = [
    { 
      name: "Dr. Max Müller", 
      lastMessage: "hey max", 
      time: "13:02", 
      unread: false,
      avatar: "MM" 
    },
    { 
      name: "Eren Sonmez", 
      lastMessage: "asfasf", 
      time: "Di", 
      unread: false,
      avatar: "ES" 
    },
    { 
      name: "Zinoooooo Miooooo", 
      lastMessage: "ASFASF", 
      time: "Di", 
      unread: false,
      avatar: "ZM" 
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="flex h-16 items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-foreground">Nachrichten</h1>
          <Button variant="medical">
            <Plus className="h-4 w-4 mr-2" />
            Neue Nachricht
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {/* Conversation List */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft h-full">
              <CardContent className="p-0">
                {/* Message Type Tabs */}
                <div className="p-4 border-b border-border">
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="personal">Persönlich</TabsTrigger>
                      <TabsTrigger value="organizations">Organisationen</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Search */}
                <div className="p-4 border-b border-border">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Nachrichten suchen..." className="pl-10" />
                  </div>
                </div>

                {/* Conversations */}
                <div className="overflow-y-auto">
                  {conversations.map((conversation, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-4 hover:bg-muted/50 cursor-pointer border-b border-border/50 last:border-b-0"
                    >
                      <div className="h-12 w-12 rounded-full bg-gradient-medical flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">{conversation.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-foreground truncate">{conversation.name}</h3>
                          <span className="text-xs text-muted-foreground">{conversation.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-muted-foreground mt-1">Direktchat</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="shadow-soft h-full">
              <CardContent className="p-0 h-full flex flex-col">
                {/* Empty State */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="h-16 w-16 rounded-full bg-gradient-medical flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Wählen Sie eine Unterhaltung
                    </h3>
                    <p className="text-muted-foreground">
                      Beginnen Sie eine neue Unterhaltung oder wählen Sie eine bestehende aus der Liste aus
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}