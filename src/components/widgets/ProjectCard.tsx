import { motion } from 'framer-motion';

interface ProjectPreview {
  slug: string;
  title: string;
  tagline: string;
  tags: string[];
}

interface ProjectCardProps {
  project: ProjectPreview;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <motion.a
      data-testid="project-card-link"
      href={`/${project.slug}/`}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className={[
        'block rounded-2xl bg-white p-6',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40',
        featured ? 'md:col-span-2 md:min-h-[220px]' : 'md:min-h-[180px]'
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <h3 className="text-xl font-semibold text-text">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{project.tagline}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-background px-3 py-1 text-xs text-muted">
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
