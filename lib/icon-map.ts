import {
  Award, BookOpen, Briefcase, Building2, Calendar, CircleDollarSign,
  Code2, Eye, Globe, GraduationCap, Home, Languages, Library,
  Map, Music, Presentation, Star, Target, TrendingUp, Trophy, UserCircle, Users,
  type LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  Award, BookOpen, Briefcase, Building2, Calendar, CircleDollarSign,
  Code2, Eye, Globe, GraduationCap, Home, Languages, Library,
  Map, Music, Presentation, Star, Target, TrendingUp, Trophy, UserCircle, Users,
};

/** Resolve a Lucide icon by name. Falls back to BookOpen. */
export function resolveIcon(name: string): LucideIcon {
  return MAP[name] ?? BookOpen;
}
