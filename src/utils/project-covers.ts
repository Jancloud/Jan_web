import pbCalendarRealCover from '../assets/pb-calendar-real.png';
import pbPowerhouseCover from '../assets/pb-powerhouse-cover.png';
import pbVisionCover from '../assets/pb-vision.png';

export const projectCoverMap = {
  'pb-calendar': pbCalendarRealCover,
  'pb-powerhouse': pbPowerhouseCover,
  'pb-vision': pbVisionCover
} as const;

export function getProjectCover(coverKey?: string) {
  if (!coverKey) {
    return undefined;
  }

  return projectCoverMap[coverKey as keyof typeof projectCoverMap];
}
