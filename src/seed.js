// src/seed.js
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Movie from './models/movie.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not defined in .env.local');
  process.exit(1);
}

const movies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    image: "https://images.squarespace-cdn.com/content/v1/5c75dfa97d0c9166551f52b1/9351f4e2-94f9-42e2-81df-003d5fe7b8e0/9964546b0ba1f6e14a6045e34b341f8ca2a3569752c5afed95b89682fcde1a68._RI_V_TTW_.jpg",
    genre: "Drama",
    rating: "9.3",
    year: "1994",
    runtime: "142 min",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    image: "https://static.toiimg.com/photo/msid-6177430/6177430.jpg?57181",
    genre: "Sci-Fi",
    rating: "8.8",
    year: "2010",
    runtime: "148 min",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: "https://m.media-amazon.com/images/S/pv-target-images/8753733ac616155963cc440c3cf5367f45d7685b672c5b9c35bc7f182aec17c4.jpg",
    genre: "Action",
    rating: "9.0",
    year: "2008",
    runtime: "152 min",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    image: "https://media.vanityfair.com/photos/54ca9afeb8f23e3a03143f88/master/w_2560%2Cc_limit/image.jpg",
    genre: "Crime",
    rating: "8.9",
    year: "1994",
    runtime: "154 min",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
  },
  {
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    image: "https://resizing.flixster.com/hqcqFfWf1syt2OrGlbW7LDvfj9Y=/fit-in/352x330/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p15829_v_v13_aa.jpg",
    genre: "Drama",
    rating: "8.8",
    year: "1994",
    runtime: "142 min",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"]
  },
  {
    title: "The Matrix",
    description: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0JpAa61BgkNomeBtnOV74IKWanzABJ7Byug&s",
    genre: "Sci-Fi",
    rating: "8.7",
    year: "1999",
    runtime: "136 min",
    director: "Lana and Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
  },
  {
    title: "Goodfellas",
    description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    image: "https://m.media-amazon.com/images/M/MV5BN2E5NzI2ZGMtY2VjNi00YTRjLWI1MDUtZGY5OWU1MWJjZjRjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    genre: "Crime",
    rating: "8.7",
    year: "1990",
    runtime: "146 min",
    director: "Martin Scorsese",
    cast: ["Robert De Niro", "Ray Liotta", "Joe Pesci"]
  },
  {
    title: "The Silence of the Lambs",
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.",
    image: "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale,dpr_1.5/jackets/9781839023675.jpg",
    genre: "Thriller",
    rating: "8.6",
    year: "1991",
    runtime: "118 min",
    director: "Jonathan Demme",
    cast: ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"]
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    image: "https://m.media-amazon.com/images/I/91MY7RxmI0L._AC_UF1000,1000_QL80_.jpg",
    genre: "Sci-Fi",
    rating: "8.6",
    year: "2014",
    runtime: "169 min",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
  },
  {
    title: "The Departed",
    description: "An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.",
    image: "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p162564_p_v8_ag.jpg",
    genre: "Crime",
    rating: "8.5",
    year: "2006",
    runtime: "151 min",
    director: "Martin Scorsese",
    cast: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"]
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully to MongoDB');

    // Clear existing data
    console.log('Clearing existing movies...');
    await Movie.deleteMany({});
    console.log('Existing movies cleared');

    // Insert new data
    console.log('Inserting new movies...');
    const result = await Movie.insertMany(movies);
    console.log(`Successfully inserted ${result.length} movies`);

    // Log inserted movies
    console.log('\nInserted Movies:');
    result.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} (${movie.genre})`);
    });

    console.log('\nDatabase seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

// Run the seeding function
seedDatabase();