// components/Footer.tsx
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full mt-12 py-6 px-6 text-sm text-gray-200 flex flex-col md:flex-row justify-between items-center">
      <p>© {new Date().getFullYear()} Movie Recommender</p>
      <Link
        href="/about"
        className="hover:underline text-gray-400 hover:text-gray-200"
      >
        Credits & Attribution
      </Link>
    </footer>
  );
};

export default Footer;
