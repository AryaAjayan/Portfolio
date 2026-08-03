import * as si from 'simple-icons';

type SimpleIcon = {
  title: string;
  hex: string;
  path: string;
};

// Map slug → simple-icons object
export function getIcon(slug: string): SimpleIcon | null {
  // simple-icons exports as si<PascalCase>
  const key = 'si' + slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase();
  const icon = (si as Record<string, SimpleIcon>)[key];
  return icon ?? null;
}
