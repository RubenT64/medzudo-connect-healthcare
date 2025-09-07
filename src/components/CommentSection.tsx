import { useState } from "react";
import { Heart, MessageCircle, MoreHorizontal, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

interface Comment {
  id: number;
  author: {
    name: string;
    role: string;
    avatar: string;
    verified: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies?: Comment[];
}

interface CommentSectionProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
}

export function CommentSection({ postId, isOpen, onClose }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: { name: "Dr. Mark Schmidt", role: "Internist", avatar: "MS", verified: true },
      content: "Sehr interessante Erkenntnisse! Haben Sie schon Erfahrungen mit der praktischen Umsetzung gemacht?",
      timestamp: "vor 1 Stunde",
      likes: 3,
      liked: false,
      replies: [
        {
          id: 2,
          author: { name: "Dr. Sarah Müller", role: "Kardiologin", avatar: "SM", verified: true },
          content: "Ja, wir haben bereits erste Erfolge in der Klinik verzeichnet.",
          timestamp: "vor 45 Min",
          likes: 1,
          liked: false
        }
      ]
    }
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: { name: "Dr. Ihr Name", role: "Facharzt", avatar: "RT", verified: false },
      content: newComment,
      timestamp: "gerade eben",
      likes: 0,
      liked: false,
      replies: []
    };

    setComments([...comments, comment]);
    setNewComment("");
    toast({ title: "Kommentar hinzugefügt" });
  };

  const handleAddReply = (commentId: number) => {
    if (!replyText.trim()) return;

    const reply: Comment = {
      id: Date.now(),
      author: { name: "Dr. Ihr Name", role: "Facharzt", avatar: "RT", verified: false },
      content: replyText,
      timestamp: "gerade eben",
      likes: 0,
      liked: false
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...(comment.replies || []), reply] }
        : comment
    ));
    setReplyText("");
    setReplyingTo(null);
    toast({ title: "Antwort hinzugefügt" });
  };

  const handleLikeComment = (commentId: number, isReply = false, parentId?: number) => {
    setComments(comments.map(comment => {
      if (isReply && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies?.map(reply =>
            reply.id === commentId
              ? { ...reply, liked: !reply.liked, likes: reply.liked ? reply.likes - 1 : reply.likes + 1 }
              : reply
          )
        };
      } else if (comment.id === commentId) {
        return { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 };
      }
      return comment;
    }));
  };

  const handleReport = (commentId: number) => {
    toast({ title: "Kommentar gemeldet", description: "Danke, wir prüfen den Kommentar." });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="text-lg font-semibold">Kommentare</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh] p-4 space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gradient-community flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-semibold">{comment.author.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.author.name}</span>
                    {comment.author.verified && (
                      <Badge variant="secondary" className="text-xs">✓</Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{comment.author.role}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-foreground mb-2">{comment.content}</p>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={`text-xs gap-1 ${comment.liked ? 'text-red-500' : ''}`}
                      onClick={() => handleLikeComment(comment.id)}
                    >
                      <Heart className={`h-3 w-3 ${comment.liked ? 'fill-current' : ''}`} />
                      {comment.likes}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs gap-1"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      <Reply className="h-3 w-3" />
                      Antworten
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleReport(comment.id)}>
                          Melden
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Replies */}
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-gradient-medical flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-semibold">{reply.author.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-xs">{reply.author.name}</span>
                          {reply.author.verified && (
                            <Badge variant="secondary" className="text-xs">✓</Badge>
                          )}
                          <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                        </div>
                        <p className="text-xs text-foreground mb-1">{reply.content}</p>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`text-xs gap-1 ${reply.liked ? 'text-red-500' : ''}`}
                            onClick={() => handleLikeComment(reply.id, true, comment.id)}
                          >
                            <Heart className={`h-3 w-3 ${reply.liked ? 'fill-current' : ''}`} />
                            {reply.likes}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input */}
              {replyingTo === comment.id && (
                <div className="ml-8 flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-medical flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-semibold">RT</span>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Textarea 
                      placeholder="Ihre Antwort..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="text-sm"
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="medical"
                        onClick={() => handleAddReply(comment.id)}
                        disabled={!replyText.trim()}
                      >
                        Antworten
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setReplyingTo(null)}
                      >
                        Abbrechen
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="border-t border-border p-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-medical flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-semibold">RT</span>
            </div>
            <div className="flex-1 space-y-3">
              <Textarea 
                placeholder="Schreiben Sie einen Kommentar..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="text-sm"
              />
              <div className="flex justify-end">
                <Button 
                  variant="medical" 
                  size="sm"
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                >
                  Kommentieren
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}