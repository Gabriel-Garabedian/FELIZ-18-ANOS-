// Works both at the domain root and in GitHub Pages repository subdirectories.
export function assetPath(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
