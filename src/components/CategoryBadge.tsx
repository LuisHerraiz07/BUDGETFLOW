import { CATEGORIES } from '../types';
import type { Category } from '../types';

interface Props {
  category: Category;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, size = 'md' }: Props) {
  const { label, emoji, color } = CATEGORIES[category];
  const sizeClass = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${color} ${sizeClass}`}>
      <span>{emoji}</span>
      <span>{label}</span>
    </span>
  );
}
