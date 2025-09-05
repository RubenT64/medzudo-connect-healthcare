import { NavLink, useLocation } from "react-router-dom";
import { 
  Home, 
  Compass, 
  Users, 
  User, 
  Bell, 
  MessageCircle, 
  MoreHorizontal,
  Stethoscope 
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Newsfeed", href: "/", icon: Home },
  { name: "Entdecken", href: "/explore", icon: Compass },
  { name: "Community", href: "/communities", icon: Users },
  { name: "Profil", href: "/profile", icon: User },
  { name: "Benachrichtigungen", href: "/notifications", icon: Bell },
  { name: "Nachrichten", href: "/messages", icon: MessageCircle },
  { name: "Mehr", href: "/more", icon: MoreHorizontal },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex w-64 flex-col bg-card border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-medical">
            <Stethoscope className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-foreground">medzudo</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-medical flex items-center justify-center">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">Dr. Ruben Tollmann</p>
            <p className="text-xs text-muted-foreground truncate">84% complete</p>
          </div>
        </div>
      </div>
    </div>
  );
}