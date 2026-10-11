import alexanderPhoto from '@/public/team/alexander.jpg';
import nikaPhoto from '@/public/team/nika.jpg';
import sophiePhoto from '@/public/team/Sophie.jpg';
import type { TeamMember } from '@/types/content';

export const team: TeamMember[] = [
  {
    id: 'alexander',
    photo: alexanderPhoto,
    linkedin: 'https://www.linkedin.com/in/alexander-pasieshvili/',
  },
  {
    id: 'sophie',
    photo: sophiePhoto,
    linkedin: 'https://www.linkedin.com/in/sophie-darchiashvili-2582031a9/',
  },
  {
    id: 'nika',
    photo: nikaPhoto,
    linkedin: 'https://www.linkedin.com/in/nika-ebralidze-812431329/',
  },
];
