import { useState } from "react";
import { Grid, List, Search, Filter, Crown, Shield, UserPlus, MoreHorizontal, MessageCircle, UserCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Member {
  id: number;
  name: string;
  role: "founder" | "moderator" | "member";
  title: string;
  location: string;
  joinDate: string;
  posts: number;
  avatar: string;
  verified: boolean;
  online: boolean;
}

interface MembersSectionProps {
  members: Member[];
  currentUserRole?: "founder" | "moderator" | "member";
}

export function MembersSection({ members, currentUserRole = "member" }: MembersSectionProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "founder": return <Crown className="h-4 w-4 text-yellow-500" />;
      case "moderator": return <Shield className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "founder": return <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600 text-white">Gründer</Badge>;
      case "moderator": return <Badge variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">Moderator</Badge>;
      default: return <Badge variant="secondary">Mitglied</Badge>;
    }
  };

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const sortedMembers = filteredMembers.sort((a, b) => {
    // Sort by role priority: founder -> moderator -> member
    const roleOrder = { founder: 0, moderator: 1, member: 2 };
    const roleDiff = roleOrder[a.role] - roleOrder[b.role];
    if (roleDiff !== 0) return roleDiff;
    
    // Then by online status
    if (a.online !== b.online) return b.online ? 1 : -1;
    
    // Finally by name
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Mitglieder durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Rollen</SelectItem>
              <SelectItem value="founder">Gründer</SelectItem>
              <SelectItem value="moderator">Moderatoren</SelectItem>
              <SelectItem value="member">Mitglieder</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex border rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8 p-0"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
          {(currentUserRole === "founder" || currentUserRole === "moderator") && (
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Einladen
            </Button>
          )}
        </div>
      </div>

      {/* Member Count */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Mitglieder</h3>
        <span className="text-sm text-muted-foreground">
          {filteredMembers.length} von {members.length} Mitgliedern
        </span>
      </div>

      {/* Members Display */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedMembers.map((member) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={`/avatars/${member.avatar}.jpg`} />
                      <AvatarFallback className="text-lg font-semibold">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {member.online && (
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-green-500 border-2 border-background rounded-full" />
                    )}
                    {member.verified && (
                      <div className="absolute -top-1 -right-1 h-5 w-5 bg-blue-500 border-2 border-background rounded-full flex items-center justify-center">
                        <UserCheck className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 justify-center">
                      <h4 className="font-semibold">{member.name}</h4>
                      {getRoleIcon(member.role)}
                    </div>
                    <p className="text-sm text-muted-foreground">{member.title}</p>
                    <p className="text-xs text-muted-foreground">{member.location}</p>
                    {getRoleBadge(member.role)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full text-center text-xs">
                    <div>
                      <div className="font-semibold">{member.posts}</div>
                      <div className="text-muted-foreground">Posts</div>
                    </div>
                    <div>
                      <div className="font-semibold">
                        {new Date(member.joinDate).toLocaleDateString('de-DE', { month: 'short', year: 'numeric' })}
                      </div>
                      <div className="text-muted-foreground">Mitglied seit</div>
                    </div>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Nachricht
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="px-2">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Profil ansehen</DropdownMenuItem>
                        <DropdownMenuItem>Folgen</DropdownMenuItem>
                        {(currentUserRole === "founder" || currentUserRole === "moderator") && member.role === "member" && (
                          <>
                            <DropdownMenuItem>Zum Moderator ernennen</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Aus Community entfernen</DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {sortedMembers.map((member) => (
                <div key={member.id} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/avatars/${member.avatar}.jpg`} />
                      <AvatarFallback className="font-semibold">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {member.online && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold truncate">{member.name}</h4>
                      {getRoleIcon(member.role)}
                      {member.verified && <UserCheck className="h-4 w-4 text-blue-500" />}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{member.title}</p>
                    <p className="text-xs text-muted-foreground">{member.location}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {getRoleBadge(member.role)}
                    <div className="text-center text-xs min-w-16">
                      <div className="font-semibold">{member.posts}</div>
                      <div className="text-muted-foreground">Posts</div>
                    </div>
                    <div className="text-center text-xs min-w-20">
                      <div className="font-semibold">
                        {new Date(member.joinDate).toLocaleDateString('de-DE', { month: 'short', year: '2-digit' })}
                      </div>
                      <div className="text-muted-foreground">Beitritt</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Nachricht
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="px-2">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Profil ansehen</DropdownMenuItem>
                        <DropdownMenuItem>Folgen</DropdownMenuItem>
                        {(currentUserRole === "founder" || currentUserRole === "moderator") && member.role === "member" && (
                          <>
                            <DropdownMenuItem>Zum Moderator ernennen</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Entfernen</DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Keine Mitglieder gefunden</h3>
          <p className="text-muted-foreground">
            Versuchen Sie eine andere Suchanfrage oder Filter.
          </p>
        </div>
      )}
    </div>
  );
}