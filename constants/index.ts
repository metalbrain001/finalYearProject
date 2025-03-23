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

export const PREFERENCE_FIELD_NAMES = {
  actors: "Favorite Actors",
  directors: "Favorite Directors",
  content_types: "Content Type",
  mood_tags: "Mood Tags",
  age_rating: "Age Rating",
  preferred_duration: "Preferred Duration",
  interest_keywords: "Interest Keywords",
  watch_frequency: "Watch Frequency",
} as const;

export const PREFERENCE_FIELD_TYPES = {
  actors: "text",
  directors: "text",
  content_types: "text",
  mood_tags: "text",
  age_rating: "text",
  preferred_duration: "text",
  interest_keywords: "text",
  watch_frequency: "text",
};

export const genreOptions = [
  "Action",
  "Drama",
  "Comedy",
  "Horror",
  "Thriller",
  "Sci-Fi",
];
export const languageOptions = ["English", "Spanish", "French", "Hindi", "Korean"];

export const placeholder = {
  actors: "Leonardo DiCaprio, Tom Hanks",
  directors: "Christopher Nolan, Quentin Tarantino",
  content_types: "Movies, TV Shows",
  mood_tags: "Thriller, Comedy",
  age_rating: "PG-13, R",
  preferred_duration: "1h 30m, 2h",
  interest_keywords: "Action, Drama",
  watch_frequency: "Daily, Weekly",
};

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
  { label: "My Profile", href: "/my-account/profile" },
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

export const userSideBarLinks = [
  {
    img: "/icons/user.svg",
    selectedImg: "/icons/user.svg",
    href: "/my-account/profile",
    label: "Profile",
  },
  {
    img: "/icons/account.svg",
    selectedImg: "/icons/account.svg",
    href: "/my-account/settings",
    label: "Account Settings",
  },

  {
    img: "/icons/rentmovie.svg",
    selectedImg: "/icons/rentmovie.svg",
    href: "/my-account/rentals",
    label: "My Rentals",
  },
  {
    img: "/icons/settings.svg",
    selectedImg: "/icons/settings-fill.svg",
    href: "/settings",
    label: "General Settings",
    subLinks: [
      { href: "/settings/account", label: "Account" },
      { href: "/settings/security", label: "Security" },
      { href: "/settings/application", label: "Application" },
      { href: "/settings/notifications", label: "Notifications" },
    ],
  },
  {
    img: "/icons/notification.svg",
    selectedImg: "/icons/notification.svg",
    href: "/notifications",
    label: "Notifications",
  },
  {
    img: "/icons/logout.svg",
    selectedImg: "/icons/logout.svg",
    href: "/logout",
    label: "Logout",
  },
];

export enum FeedbackTypeEnum {
  Like = 'like',
  Dislike = 'dislike',
}