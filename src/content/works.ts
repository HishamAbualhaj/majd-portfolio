export type Work = {
  slug: string;
  title: string;
  kind: "novel" | "book" | "writing";
  descriptionKey: "glimmer";
  coverSrc: string | null;
  amazonUrl: string | null;
  storeUrl: string | null;
};

// Add the real cover and purchase URLs here when they are available.
// storeUrl becomes the primary purchase option once the store launches.
export const works: readonly Work[] = [
  {
    slug: "glimmer",
    title: "Glimmer",
    kind: "novel",
    descriptionKey: "glimmer",
    coverSrc: null,
    amazonUrl: null,
    storeUrl: null,
  },
];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}
