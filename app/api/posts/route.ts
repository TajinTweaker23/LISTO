import { NextResponse } from 'next/server';

// In-memory "database" for posts
let posts = [
  {
    id: 1,
    title: "Art as a Form of Protest",
    content: "Exploring how street art and murals have been used to convey powerful political messages throughout history.",
    imageUrl: "https://source.unsplash.com/random/800x600?street-art",
    author: "Artivist",
    timestamp: "2025-08-12T10:00:00Z",
  },
  {
    id: 2,
    title: "Upcoming Rally for Climate Action",
    content: "Join us this Saturday at City Hall to demand stronger environmental policies. Your voice matters!",
    imageUrl: null,
    author: "ClimateNow",
    timestamp: "2025-08-11T15:30:00Z",
  },
  {
      id: 3,
      title: "The Philosophy of Stoicism",
      content: "A brief introduction to Stoic philosophy and how its principles can be applied to modern life for greater resilience and tranquility.",
      imageUrl: "https://source.unsplash.com/random/800x600?philosophy",
      author: "Modern Stoic",
      timestamp: "2025-08-10T09:00:00Z",
  }
];

// GET handler to fetch all posts
export async function GET() {
  return NextResponse.json(posts);
}

// POST handler to create a new post
export async function POST(request: Request) {
  const post = await request.json();
  posts.unshift(post); // Add new post to the beginning of the array
  return NextResponse.json(post, { status: 201 });
}
