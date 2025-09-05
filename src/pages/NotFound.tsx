import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-8">
          <div className="h-24 w-24 rounded-full bg-gradient-medical mx-auto mb-4 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">404</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4 text-foreground">Seite nicht gefunden</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Die angeforderte Seite konnte nicht gefunden werden.
        </p>
        <Button variant="medical" asChild>
          <Link to="/">Zurück zur Startseite</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
