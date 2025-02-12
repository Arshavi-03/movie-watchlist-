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
    description: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion. Andy Dufresne, a banker wrongly convicted of murder, and Red, a seasoned inmate, navigate the harsh realities of prison life while never losing hope for a better future.",
    image: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_.jpg",
    genre: "Drama",
    rating: "9.3",
    year: "1994",
    runtime: "142 min",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler", "Clancy Brown"],
    createdAt: new Date()
  },
  {
    title: "Inception",
    description: "Dom Cobb is a skilled thief with the rare ability to 'extract' information from people's minds while they're dreaming. His rare ability has made him a coveted player in this treacherous new world of corporate espionage, but it has also made him an international fugitive and cost him everything he loves. Now Cobb is being offered a chance at redemption.",
    image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781608870158/inception-9781608870158_hr.jpg",
    genre: "Sci-Fi",
    rating: "8.8",
    year: "2010",
    runtime: "148 min",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy", "Ken Watanabe"],
    createdAt: new Date()
  },
  {
    title: "The Dark Knight",
    description: "With the help of allies Lt. Jim Gordon and DA Harvey Dent, Batman has been able to keep a tight lid on crime in Gotham City. But when a vicious criminal calling himself the Joker suddenly throws the city into chaos, Batman begins to tread a fine line between heroism and vigilantism.",
    image: "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg",
    genre: "Action",
    rating: "9.0",
    year: "2008",
    runtime: "152 min",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine", "Maggie Gyllenhaal"],
    createdAt: new Date()
  },
  {
    title: "Pulp Fiction",
    description: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfold in three different stories that ingeniously trip back and forth in time.",
    image: "https://images.squarespace-cdn.com/content/v1/5fea3b3d46d31b1ddd850cf5/1610152372135-4WU5WYZPQS9LYQA3K9YF/pulpfiction.jpeg",
    genre: "Crime",
    rating: "8.9",
    year: "1994",
    runtime: "154 min",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson", "Bruce Willis", "Ving Rhames"],
    createdAt: new Date()
  },
  {
    title: "The Matrix",
    description: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free. Neo must confront the agents: super-powerful computer programs devoted to stopping the rebellion and destroying Zion, the last human city.",
    image: "https://i.etsystatic.com/23402008/r/il/d98a8a/3270846282/il_fullxfull.3270846282_7hib.jpg",
    genre: "Sci-Fi",
    rating: "8.7",
    year: "1999",
    runtime: "136 min",
    director: "Lana and Lilly Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving", "Joe Pantoliano"],
    createdAt: new Date()
  },
  {
    title: "Interstellar",
    description: "In Earth's future, a global crop blight and second Dust Bowl are slowly rendering the planet uninhabitable. Professor Brand, a brilliant NASA physicist, is working on plans to save mankind by transporting Earth's population to a new home via a wormhole. But first, Brand must send former NASA pilot Cooper and a team of researchers through the wormhole to find potential new habitable planets.",
    image: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    genre: "Sci-Fi",
    rating: "8.6",
    year: "2014",
    runtime: "169 min",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Matt Damon"],
    createdAt: new Date()
  },
  {
    title: "Gladiator",
    description: "In the year 180, the death of emperor Marcus Aurelius throws the Roman Empire into chaos. Maximus is one of the Roman army's most capable and trusted generals and a key advisor to the emperor. But when Marcus' corrupt son Commodus ascends to the throne, Maximus is set up for murder.",
    image: "https://m.media-amazon.com/images/I/51GA6V6VE1L._AC_UF894,1000_QL80_.jpg",
    genre: "Action",
    rating: "8.5",
    year: "2000",
    runtime: "155 min",
    director: "Ridley Scott",
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen", "Oliver Reed", "Richard Harris"],
    createdAt: new Date()
  },
  {
    title: "The Godfather",
    description: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
    image: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    genre: "Crime",
    rating: "9.2",
    year: "1972",
    runtime: "175 min",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Diane Keaton", "Robert Duvall"],
    createdAt: new Date()
  },
  {
    title: "Forrest Gump",
    description: "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. Yet, despite all the things he has attained, his one true love eludes him. 'Forrest Gump' is the story of a man who rose above his challenges.",
    image: "https://m.media-amazon.com/images/M/MV5BNDYwNzVjMTItZmU5YS00YjQ5LTljYjgtMjY2NDVmYWMyNWFmXkEyXkFqcGc@._V1_.jpg",
    genre: "Drama",
    rating: "8.8",
    year: "1994",
    runtime: "142 min",
    director: "Robert Zemeckis",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise", "Sally Field", "Mykelti Williamson"],
    createdAt: new Date()
  },
  {
    title: "Fight Club",
    description: "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    image: "https://m.media-amazon.com/images/M/MV5BMjk3NTYyMzc4Nl5BMl5BanBnXkFtZTcwODU3ODMzMw@@._V1_.jpg",
    genre: "Drama",
    rating: "8.8",
    year: "1999",
    runtime: "139 min",
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter", "Meat Loaf", "Jared Leto"],
    createdAt: new Date()
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

    // Log inserted movies with their IDs
    console.log('\nInserted Movies:');
    result.forEach((movie, index) => {
      console.log(`${index + 1}. ${movie.title} (${movie.genre}) - ID: ${movie._id}`);
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