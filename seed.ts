import { db } from './src/lib/firebase';
import { collection, setDoc, doc, serverTimestamp } from 'firebase/firestore';

const initialProjects = [
  { id: 1, title: "Abstract Geometry", tags: ["UI/UX", "Branding"], image: "https://picsum.photos/seed/p1/1200/600", span: 'wide' },
  { id: 2, title: "Minimalist Flow", tags: ["Typography"], image: "https://picsum.photos/seed/p2/600/600", span: 'normal' },
  { id: 3, title: "Digital Echo", tags: ["Motion"], image: "https://picsum.photos/seed/p3/600/1200", span: 'portrait' },
  { id: 4, title: "Pixel Perfect", tags: ["Web Design"], image: "https://picsum.photos/seed/p4/600/600", span: 'normal' },
  { id: 5, title: "Liquid Motion", tags: ["Animation"], image: "https://picsum.photos/seed/p5/600/600", span: 'normal' },
  { id: 6, title: "Monochrome Soul", tags: ["Identity"], image: "https://picsum.photos/seed/p6/1200/600", span: 'wide' },
  { id: 101, title: "Cyber Punk UI", tags: ["UI Design"], image: "https://picsum.photos/seed/cp1/800/600", span: 'normal' },
  { id: 102, title: "Nature's Rhythm", tags: ["Photography"], image: "https://picsum.photos/seed/nr1/800/1000", span: 'portrait' },
  { id: 103, title: "Urban Jungle", tags: ["Branding"], image: "https://picsum.photos/seed/uj1/1200/600", span: 'wide' },
  { id: 104, title: "Neon Nights", tags: ["Motion"], image: "https://picsum.photos/seed/nn1/800/600", span: 'normal' },
];

export async function seedProjects() {
  const projectsRef = collection(db, 'projects');
  for (const project of initialProjects) {
    await setDoc(doc(projectsRef, String(project.id)), {
      ...project,
      isFeatured: project.id <= 6,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      order: project.id
    });
  }
}
