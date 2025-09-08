import { useState } from "react";
import { Folder, FolderOpen, FileText, Image, Video, Download, Upload, Search, Filter, Grid, List, MoreHorizontal, Eye, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MediaFile {
  id: number;
  name: string;
  type: "document" | "image" | "video";
  size: string;
  uploadedBy: string;
  uploadDate: string;
  downloads: number;
  folderId?: number;
  thumbnail?: string;
}

interface MediaFolder {
  id: number;
  name: string;
  fileCount: number;
  createdBy: string;
  createdDate: string;
}

interface MediaSectionProps {
  files: MediaFile[];
  folders?: MediaFolder[];
  onUpload?: () => void;
  onCreateFolder?: () => void;
}

export function MediaSection({ files = [], folders = [], onUpload, onCreateFolder }: MediaSectionProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("all");

  // Mock folders data
  const defaultFolders: MediaFolder[] = [
    { id: 1, name: "Leitlinien", fileCount: 12, createdBy: "Dr. Weber", createdDate: "2024-01-10" },
    { id: 2, name: "Case Studies", fileCount: 8, createdBy: "Dr. Klein", createdDate: "2024-01-15" },
    { id: 3, name: "Präsentationen", fileCount: 15, createdBy: "Prof. Müller", createdDate: "2024-01-08" },
  ];

  const allFolders = folders.length > 0 ? folders : defaultFolders;

  const getFileIcon = (type: string) => {
    switch (type) {
      case "document": return <FileText className="h-8 w-8 text-blue-500" />;
      case "image": return <Image className="h-8 w-8 text-green-500" />;
      case "video": return <Video className="h-8 w-8 text-red-500" />;
      default: return <FileText className="h-8 w-8 text-gray-500" />;
    }
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || file.type === filterType;
    const matchesFolder = selectedFolder === null || file.folderId === selectedFolder;
    return matchesSearch && matchesType && matchesFolder;
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Medien durchsuchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle</SelectItem>
              <SelectItem value="document">Dokumente</SelectItem>
              <SelectItem value="image">Bilder</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
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
          <Button onClick={onCreateFolder} variant="outline" size="sm" className="gap-2">
            <Folder className="h-4 w-4" />
            Ordner
          </Button>
          <Button onClick={onUpload} className="gap-2">
            <Upload className="h-4 w-4" />
            Hochladen
          </Button>
        </div>
      </div>

      {/* Breadcrumb */}
      {selectedFolder && (
        <div className="flex items-center gap-2 text-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedFolder(null)}
            className="gap-2 h-8 px-2"
          >
            <Folder className="h-4 w-4" />
            Alle Ordner
          </Button>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">
            {allFolders.find(f => f.id === selectedFolder)?.name}
          </span>
        </div>
      )}

      {/* Folders Grid (only show when not in a specific folder) */}
      {selectedFolder === null && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Ordner</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {allFolders.map((folder) => (
              <Card 
                key={folder.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedFolder(folder.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Folder className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{folder.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {folder.fileCount} Dateien
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Erstellt von {folder.createdBy} • {new Date(folder.createdDate).toLocaleDateString('de-DE')}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">
            {selectedFolder ? "Dateien" : "Alle Dateien"}
          </h3>
          <span className="text-sm text-muted-foreground">
            {filteredFiles.length} Dateien
          </span>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFiles.map((file) => (
              <Card key={file.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-3">
                    {file.thumbnail ? (
                      <img 
                        src={file.thumbnail} 
                        alt={file.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="p-2">
                        {getFileIcon(file.type)}
                      </div>
                    )}
                    <div className="w-full">
                      <h4 className="font-medium text-sm truncate" title={file.name}>
                        {file.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {file.size} • {file.downloads} Downloads
                      </p>
                    </div>
                    <div className="flex gap-1 w-full">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 gap-1">
                            <Eye className="h-3 w-3" />
                            Ansehen
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>{file.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>Hochgeladen von {file.uploadedBy}</span>
                              <span>{new Date(file.uploadDate).toLocaleDateString('de-DE')}</span>
                            </div>
                            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                              {getFileIcon(file.type)}
                              <span className="ml-2">Dateivorschau</span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="px-2">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="gap-2">
                            <Download className="h-4 w-4" />
                            Herunterladen
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Share2 className="h-4 w-4" />
                            Teilen
                          </DropdownMenuItem>
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
                {filteredFiles.map((file) => (
                  <div key={file.id} className="p-4 flex items-center gap-4 hover:bg-muted/50">
                    <div className="flex-shrink-0">
                      {getFileIcon(file.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{file.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Hochgeladen von {file.uploadedBy} • {new Date(file.uploadDate).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{file.size}</span>
                      <Badge variant="secondary">{file.downloads} Downloads</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Ansehen
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">Keine Dateien gefunden</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "Versuchen Sie eine andere Suchanfrage." : "Laden Sie die erste Datei hoch."}
          </p>
        </div>
      )}
    </div>
  );
}