export const navigationLinks = [
  {
    href: "/library",
    label: "Library",
  },

  {
    img: "/icons/user.svg",
    selectedImg: "/icons/user-fill.svg",
    href: "/my-profile",
    label: "My Profile",
  },
];

export const adminSideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: "/admin",
    text: "Home",
  },
  {
    img: "/icons/admin/users.svg",
    route: "/admin/users",
    text: "All Users",
  },
  {
    img: "/icons/admin/film.svg",
    route: "/admin/movies",
    text: "All Movies",
  },
  {
    img: "/icons/admin/bookmark.svg",
    route: "/admin/movies-requests",
    text: "Rent Requests",
  },
  {
    img: "/icons/admin/user.svg",
    route: "/admin/account-requests",
    text: "Account Requests",
  },
  {
    img: "/icons/admin/app.svg",
    route: "/",
    text: "Back to App",
  },
];

export const FIELD_NAMES = {
  fullname: "Fullname",
  username: "Username",
  email: "Email",
  password: "Password",
};

export const FIELD_TYPES = {
  fullname: "text",
  email: "email",
  username: "text",
  password: "password",
};

export const SEARCH_OPTIONS = [
  { value: "title", label: "Title" },
  { value: "author", label: "Author" },
  { value: "genre", label: "Genre" },
];

export const SEARCH_TYPES = {
  title: "Title",
  genre: "Genre",
  author: "Author",
};

export const sampleBooks = [
  {
    id: 1,
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy / Fiction",
    rating: 4.6,
    total_copies: 20,
    available_copies: 10,
    description:
      "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
    color: "#1c1f40",
    cover: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death. A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help / Productivity",
    rating: 4.9,
    total_copies: 99,
    available_copies: 50,
    description:
      "A revolutionary guide to making good habits, breaking bad ones, and getting 1% better every day.",
    color: "#fffdf6",
    cover: "https://m.media-amazon.com/images/I/81F90H7hnML.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A revolutionary guide to making good habits, breaking bad ones, and getting 1% better every day.",
  },
  {
    id: 3,
    title: "You Don't Know JS: Scope & Closures",
    author: "Kyle Simpson",
    genre: "Computer Science / JavaScript",
    rating: 4.7,
    total_copies: 9,
    available_copies: 5,
    description:
      "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
    color: "#f8e036",
    cover:
      "https://m.media-amazon.com/images/I/7186YfjgHHL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophy / Adventure",
    rating: 4.5,
    total_copies: 78,
    available_copies: 50,
    description:
      "A magical tale of Santiago, an Andalusian shepherd boy, who embarks on a journey to find a worldly treasure.",
    color: "#ed6322",
    cover:
      "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A magical tale of Santiago, an Andalusian shepherd boy, who embarks on a journey to find a worldly treasure.",
  },
  {
    id: 5,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self-Help / Productivity",
    rating: 4.7,
    total_copies: 23,
    available_copies: 23,
    description:
      "Rules for focused success in a distracted world, teaching how to cultivate deep focus to achieve peak productivity.",
    color: "#ffffff",
    cover: "https://m.media-amazon.com/images/I/81JJ7fyyKyS.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Rules for focused success in a distracted world, teaching how to cultivate deep focus to achieve peak productivity.",
  },
  {
    id: 6,
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Computer Science / Programming",
    rating: 4.8,
    total_copies: 56,
    available_copies: 56,
    description:
      "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
    color: "#080c0d",
    cover:
      "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
  },
  {
    id: 7,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    genre: "Computer Science / Programming",
    rating: 4.8,
    total_copies: 25,
    available_copies: 3,
    description:
      "A timeless guide for developers to hone their skills and improve their programming practices.",
    color: "#100f15",
    cover:
      "https://m.media-amazon.com/images/I/71VStSjZmpL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A timeless guide for developers to hone their skills and improve their programming practices.",
  },
  {
    id: 8,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance / Self-Help",
    rating: 4.8,
    total_copies: 10,
    available_copies: 5,
    description:
      "Morgan Housel explores the unique behaviors and mindsets that shape financial success and decision-making.",
    color: "#ffffff",
    cover:
      "https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg",
    video: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Morgan Housel explores the unique behaviors and mindsets that shape financial success and decision-making.",
  },
];

export const samplePoster = [
  {
    id: 1,
    title: "The Midnight Library",
    poster: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
  },
  {
    id: 2,
    title: "Atomic Habits",
    poster: "https://m.media-amazon.com/images/I/81F90H7hnML.jpg",
  },
  {
    id: 3,
    title: "You Don't Know JS: Scope & Closures",
    poster:
      "https://m.media-amazon.com/images/I/7186YfjgHHL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 4,
    title: "The Alchemist",
    poster:
      "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 5,
    title: "Deep Work",
    poster: "https://m.media-amazon.com/images/I/81JJ7fyyKyS.jpg",
  },
  {
    id: 6,
    title: "Clean Code",
    poster:
      "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
  },
  {
    id: 7,
    title: "The Pragmatic Programmer",
    poster:
      "https://m.media-amazon.com/images/I/71VStSjZmpL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    id: 8,
    title: "The Psychology of Money",
    poster:
      "https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg",
  },
];


// ✅ Dummy Data for Movies
export const dummyMovies = [
  {
    title: "Father of the Bride Part II (1995)",
    userId: "user1",
    poster_url: "https://image.tmdb.org/t/p/w500/rj4LBtwQ0uGrpBnCELr716Qo3mw.jpg",
    movie_url: "https://example.com/father_of_the_bride.mp4",
    movie_plot: "George Banks must accept the reality of what his daughter's ascension from daughter to wife, and now, to mother means when placed into perspective against his own stage of life.",
    movie_runtime: 106,
    actors: "Steve Martin, Diane Keaton, Martin Short",
    description: "Father of the Bride Part II is a 1995 American comedy film starring Steve Martin, Diane Keaton and Martin Short.",
    cast: [
      { name: "Steve Martin", image: "https://example.com/steve-martin.jpg" },
      { name: "Diane Keaton ", image: "https://example.com/diane-keaton.jpg" },
      { name: "Martin Short", image: "https://example.com/martin-short.jpg" },
    ],
  },
  {
    title: "Tom and Huck (1995)",
    userId: "user2",
    poster_url: "https://image.tmdb.org/t/p/w500/vIG8hWOa7DyLMRiurzKwVAnIYoU.jpg",
    movie_url: "https://example.com/Tom and Huck.mp4",
    movie_plot: "A mischievous young boy, Tom Sawyer, witnesses a murder by the deadly Injun Joe. Tom becomes friends with Huckleberry Finn, a boy with no future and no family. Tom has to choose between honoring a friendship or honoring an oath because the town alcoholic is accused of the murder. Tom and Huck go through several adventures trying to retrieve evidence.",
    movie_runtime: 97,
    actors: "",
    description: "The Matrix is a 1999 science fiction action film written and directed by the Wachowskis.",
    cast: [
      { name: "Keanu Reeves", image: "https://example.com/keanu-reeves.jpg" },
      { name: "Laurence Fishburne", image: "https://example.com/laurence-fishburne.jpg" },
      { name: "Carrie-Anne Moss", image: "https://example.com/carrie-anne-moss.jpg" },
    ],
  },
  {
    title: "Interstellar",
    userId: "user3",
    poster_url: "https://example.com/interstellar-poster.jpg",
    movie_url: "https://example.com/interstellar.mp4",
    movie_plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    movie_runtime: 169,
    actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    description: "Interstellar is a 2014 epic science fiction film directed by Christopher Nolan.",
    cast: [
      { name: "Matthew McConaughey", image: "https://example.com/matthew-mcconaughey.jpg" },
      { name: "Anne Hathaway", image: "https://example.com/anne-hathaway.jpg" },
      { name: "Jessica Chastain", image: "https://example.com/jessica-chastain.jpg" },
    ],
  },
  {
    title: "The Dark Knight",
    userId: "user4",
    poster_url: "https://example.com/dark-knight-poster.jpg",
    movie_url: "https://example.com/dark-knight.mp4",
    movie_plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    movie_runtime: 152,
    actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    description: "The Dark Knight is a 2008 superhero film directed, produced, and co-written by Christopher Nolan.",
    cast: [
      { name: "Christian Bale", image: "https://example.com/christian-bale.jpg" },
      { name: "Heath Ledger", image: "https://example.com/heath-ledger.jpg" },
      { name: "Aaron Eckhart", image: "https://example.com/aaron-eckhart.jpg" },
    ],
  },
  {
    title: "The Shawshank Redemption",
    userId: "user5",
    poster_url: "https://example.com/shawshank-redemption-poster.jpg",
    movie_url: "https://example.com/shawshank-redemption.mp4",
    movie_plot: "Two imprisoned",
    movie_runtime: 142,
    actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
    description: "The Shawshank Redemption is a 1994 drama film written and directed by Frank Darabont.",
    cast: [
      { name: "Tim Robbins", image: "https://example.com/tim-robbins.jpg" },
      { name: "Morgan Freeman", image: "https://example.com/morgan-freeman.jpg" },
      { name: "Bob Gunton", image: "https://example.com/bob-gunton.jpg" },
    ],
  },
  {
    title: "The Godfather",
    userId: "user6",
    poster_url: "https://example.com/godfather-poster.jpg",
    movie_url: "https://example.com godfather.mp4",
    movie_plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    movie_runtime: 175,
    actors: "Marlon Brando, Al Pacino, James Caan",
    description: "The Godfather is a 1972 crime film directed by Francis Ford Coppola.",
    cast: [
      { name: "Marlon Brando", image: "https://example.com/marlon-brando.jpg" },
      { name: "Al Pacino", image: "https://example.com/al-pacino.jpg" },
      { name: "James Caan", image: "https://example.com/james-caan.jpg" },
    ],
  }
];

// Dummy Data for registration table
export const dummyRegistrations: {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: "user" | "admin" | "superadmin"; // ✅ Explicitly restrict role values
  createdAt: string;
}[] = [
    {
      id: "user1",
      fullName: "John Doe",
      username: "johndoe",
      email: "metalbrain@gmail.com",
      role: "user", // ✅ Correct type
      createdAt: "2025-06-06T00:00:00.000Z",
    },
    {
      id: "admin1",
      fullName: "Super Admin",
      username: "superadmin",
      email: "admin@example.com",
      role: "superadmin", // ✅ Correct type
      createdAt: "2025-06-06T00:00:00.000Z",
    },
  ];

export const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Thriller",
  "War",
  "Western",
];

export const defaultPoster = `https://fakeimg.pl/350x500/?text=Poster&font=lobster`;

export const profileOptions = [
  { label: "My Profile", href: "/my-profile" },
  { label: "My WatchList", href: "/my-watchlist" },
  { label: "Settings", href: "/settings" },
  { label: "Admin", href: "/admin" },
];

export const recommendationOptions = [
  { label: "Recommended", value: "/recommended" },
  { label: "Popular", value: "/popular" },
  { label: "New Arrivals", value: "/new" },
  { label: "Trending", value: "/trending" },
  { label: "Top Rated", value: "/top" },
  { label: "All Movies", value: "/movie" },
];

export type Role = "user" | "admin" | "superadmin";

// ✅ Role Options for Select Inputs
export const roleOptions: { label: string; value: Role }[] = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
  { label: "Super Admin", value: "superadmin" },
];
