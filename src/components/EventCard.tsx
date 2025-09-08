import { useState } from "react";
import { Calendar, Clock, MapPin, Users, ExternalLink, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "Präsenz" | "Virtual" | "Hybrid";
  attendees: number;
  maxAttendees: number;
  description: string;
  coverImage?: string;
  organizer: {
    name: string;
    avatar: string;
  };
  isAttending?: boolean;
}

interface EventCardProps {
  event: Event;
  onAttendanceChange?: (eventId: number, attending: boolean) => void;
}

export function EventCard({ event, onAttendanceChange }: EventCardProps) {
  const [isAttending, setIsAttending] = useState(event.isAttending || false);
  
  const handleAttendanceToggle = () => {
    const newStatus = !isAttending;
    setIsAttending(newStatus);
    onAttendanceChange?.(event.id, newStatus);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Präsenz": return "bg-blue-500";
      case "Virtual": return "bg-green-500";
      case "Hybrid": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const attendanceRate = (event.attendees / event.maxAttendees) * 100;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {/* Cover Image */}
      <div className="h-32 bg-gradient-to-br from-primary/20 to-accent/20 relative">
        {event.coverImage ? (
          <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Calendar className="h-8 w-8 text-primary/60" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className={`${getTypeColor(event.type)} text-white`}>
            {event.type}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg leading-tight">{event.title}</h3>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString('de-DE')}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl">{event.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Event Header */}
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{event.organizer.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{event.organizer.name}</p>
                    <p className="text-sm text-muted-foreground">Veranstalter</p>
                  </div>
                </div>

                {/* Event Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(event.date).toLocaleDateString('de-DE', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time} Uhr</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{event.attendees} von {event.maxAttendees} Teilnehmern</span>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Auslastung</span>
                        <span>{Math.round(attendanceRate)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${attendanceRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-medium mb-2">Beschreibung</h4>
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </div>

                {/* Attendance Button */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    onClick={handleAttendanceToggle}
                    variant={isAttending ? "outline" : "default"}
                    className="flex-1 gap-2"
                  >
                    {isAttending ? (
                      <>
                        <X className="h-4 w-4" />
                        Absagen
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4" />
                        Teilnehmen
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Link teilen
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
        
        {/* Attendees */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {event.attendees}/{event.maxAttendees} Teilnehmer
            </span>
          </div>
          
          <Button
            onClick={handleAttendanceToggle}
            variant={isAttending ? "outline" : "default"}
            size="sm"
            className="gap-2"
          >
            {isAttending ? (
              <>
                <Check className="h-4 w-4" />
                Zugesagt
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Teilnehmen
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}