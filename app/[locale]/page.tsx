import getAlbumTracksData from "@/lib/Spotify/album/getAlbumTracks";
import getArtistsData from "@/lib/Spotify/artists/getArtistsData";
import { AlbumCards } from "@/components/Spotify/AlbumCards";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CiGlobe } from "react-icons/ci";
import MobileNav from "@/components/MobileNav";

type HeaderLink = {
  href: string;
  label: string;
};

type LanguageOption = {
  code: string;
  flag: string;
};

export const metadata = {
  title: "Face The Wall - Metal Band",
  description: "Official website of Face The Wall, a Slovak thrash metal band.",
  openGraph: {
    title: "Face The Wall - Metal Band",
    description:
      "Official website of Face The Wall, a Slovak thrash metal band.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Face The Wall - Metal Band",
      },
    ],
    siteName: "Face The Wall",
  },
};

interface artistData {
  name: string;
  followers: number;
  genres: string[];
  images: { url: string; width: number; height: number }[];
}

interface albumsID {
  id: string;
}

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  const validLocales = ["sk", "en"];
  const currentLocale = validLocales.includes(locale) ? locale : "sk";

  const t = (await import(`../../locales/${currentLocale}.json`)).default;

  const headerLinks: HeaderLink[] = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#music", label: t.nav.music },
    { href: "#shows", label: t.nav.shows },
    { href: "#contact", label: t.nav.contact },
  ];

  const languageOptions: LanguageOption[] = [
    { code: "sk", flag: "/flags/sk.png" },
    { code: "en", flag: "/flags/en.png" },
  ];
  const artistData: artistData = await getArtistsData(); // Name,followers, genres, images
  const albumsID: albumsID[] = await getAlbumTracksData(); // IDs of albums

  return (

    <div className="min-h-screen bg-black text-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 py-1 flex flex-row items-center justify-between">
          {/* Navigation and Language Selector */}
          <div className="hidden w-full md:flex flex-col md:flex-row items-center justify-end gap-4">
            <nav className="w-full md:w-auto flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8">
              <Link
                href={`#home`}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                {t.nav.home}
              </Link>
              <Link
                href={`#about`}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                {t.nav.about}
              </Link>
              {/* Logo */}
              <Link
                href={`/${locale}`}
                className="mb-4 md:mb-0 text-3xl font-bold tracking-tight mr-6"
              >
                <Image
                  src="/logo.png"
                  alt="Face The Wall Logo"
                  width={150}
                  height={150}
                  className="h-16 md:h-20 object-contain"
                />
              </Link>
              <Link
                href={`#music`}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                {t.nav.music}
              </Link>
              <Link
                href={`#tour`}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                {t.nav.tour}
              </Link>
              <Link
                href={`#contact`}
                className="text-gray-700 hover:text-orange-500 transition-colors"
              >
                {t.nav.contact}
              </Link>
            </nav>

            <div className="mt-4 md:mt-0 flex items-center justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <CiGlobe className=" w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="p-2">
                  <div className="flex flex-wrap gap-2">
                    {languageOptions.map((lang) => (
                      <Link
                        key={lang.code}
                        href={`/${lang.code}`}
                        className={`relative flex items-center justify-center w-10 h-10 rounded-full border-4 transition transform hover:scale-110 ${
                          locale === lang.code
                            ? "bg-purple-3 border-purple2 text-white shadow-lg"
                            : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-purple-2"
                        }`}
                      >
                        <Image
                          src={lang.flag}
                          alt={lang.code}
                          width={28}
                          height={20}
                          className="object-cover rounded-full"
                        />
                        {locale === lang.code && (
                          <div className="absolute inset-0 rounded-full ring-2 ring-blue-800"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* Mobile Menu Button */}
          <MobileNav
            headerLinks={headerLinks}
            languageOptions={languageOptions}
            locale={locale}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-b from-black via-red-900/20 to-black">
        <div className="absolute inset-0 bg-[url('/band-bg.jpg')] bg-cover bg-center opacity-30"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-wider">
            FACE THE WALL
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            METAL MUSIC • SLOVAKIA METAL
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-orange-600 hover:bg-orange-700 px-8 py-3 rounded-md font-semibold transition-colors">
              LISTEN NOW
            </button>
            <button className="border border-orange-600 hover:bg-orange-600 px-8 py-3 rounded-md font-semibold transition-colors">
              WATCH VIDEO
            </button>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-12">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 cursor-pointer transition-colors">
              <span className="text-xl">f</span>
            </div>
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 cursor-pointer transition-colors">
              <span className="text-xl">@</span>
            </div>
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-600 cursor-pointer transition-colors">
              <span className="text-xl">♪</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-500">
            OUR STORY
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-orange-400">
                Our Band Story
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {artistData.name} is a thrash metal band from Slovakia that
                brings raw energy and passion to the metal scene. Our journey
                began with a shared love for heavy music and a desire to create
                something powerful and authentic.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                With influences ranging from classic thrash to modern metal,
                we've developed our unique sound that resonates with metal fans
                across Europe. Our music speaks to those who face their
                challenges head-on.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    5+
                  </div>
                  <div className="text-sm text-gray-400">YEARS ACTIVE</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    50+
                  </div>
                  <div className="text-sm text-gray-400">CONCERTS</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-500 mb-2">
                    3000+
                  </div>
                  <div className="text-sm text-gray-400">FOLLOWERS</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-1 rounded-lg">
                <img
                  src={artistData.images[0]?.url || "/band-photo.jpg"}
                  alt="Band Photo"
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section id="posts" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-500">
            LATEST POSTS
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample blog posts */}
            {[1, 2, 3, 4, 5, 6].map((post) => (
              <article
                key={post}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform"
              >
                <div className="h-48 bg-gradient-to-r from-orange-600 to-red-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">
                    Latest Show Recap #{post}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Check out highlights from our recent performance and
                    behind-the-scenes moments.
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Dec {post}, 2024</span>
                    <span>5 min read</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Our Music Section */}
      <section id="music" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-500">
            OUR MUSIC
          </h2>

          <div className="text-center mb-12">
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Discover our latest tracks and albums. Raw energy, powerful riffs,
              and authentic metal sound that will make you face the wall of
              sound.
            </p>
          </div>

          {/* Album Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albumsID.map((album) => (
              <AlbumCards key={album.id} id={album.id} />
            ))}
          </div>
        </div>
      </section>

      {/* Tour Dates Section */}
      <section id="tour" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-orange-500">
            TOUR DATES
          </h2>

          <div className="space-y-4">
            {/* Sample tour dates */}
            {[
              {
                date: "Feb 15, 2025",
                city: "Bratislava, SK",
                venue: "Club Randal",
                status: "tickets",
              },
              {
                date: "Feb 22, 2025",
                city: "Prague, CZ",
                venue: "Rock Café",
                status: "tickets",
              },
              {
                date: "Mar 01, 2025",
                city: "Vienna, AT",
                venue: "Szene Wien",
                status: "soldout",
              },
              {
                date: "Mar 08, 2025",
                city: "Budapest, HU",
                venue: "Dürer Kert",
                status: "tickets",
              },
            ].map((show, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between"
              >
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <div className="text-orange-500 font-bold text-lg mb-2 md:mb-0 md:w-32">
                    {show.date}
                  </div>
                  <div className="mb-2 md:mb-0">
                    <div className="font-semibold text-lg">{show.city}</div>
                    <div className="text-gray-400">{show.venue}</div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  {show.status === "soldout" ? (
                    <span className="bg-red-600 px-6 py-2 rounded-md font-semibold">
                      SOLD OUT
                    </span>
                  ) : (
                    <button className="bg-orange-600 hover:bg-orange-700 px-6 py-2 rounded-md font-semibold transition-colors">
                      GET TICKETS
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-orange-500">
            GET US BOOKED!!
          </h2>
          <p className="text-center text-gray-300 mb-12">
            Ready to bring the metal energy to your venue? Get in touch with us
            for bookings and collaborations.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-orange-400">
                Contact Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <span>📧</span>
                  </div>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-400">booking@facethewall.sk</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                    <span>📱</span>
                  </div>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-gray-400">+421 xxx xxx xxx</div>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-orange-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-orange-500"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-orange-500"
              />
              <textarea
                placeholder="Your Message"
                rows={6}
                className="w-full bg-gray-800 border border-gray-700 rounded-md px-4 py-3 focus:outline-none focus:border-orange-500 resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded-md font-semibold transition-colors"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-orange-500">
                Face The Wall
              </h3>
              <p className="text-gray-400">
                Slovak thrash metal band bringing raw energy and authentic sound
                to metal fans worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
              <div className="space-y-2">
                <a
                  href="#story"
                  className="block text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Our Story
                </a>
                <a
                  href="#posts"
                  className="block text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Latest Posts
                </a>
                <a
                  href="#music"
                  className="block text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Our Music
                </a>
                <a
                  href="#tour"
                  className="block text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Tour Dates
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Spotify
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-orange-500 transition-colors"
                >
                  YouTube
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>booking@facethewall.sk</p>
                <p>+421 xxx xxx xxx</p>
                <p>Slovakia</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Face The Wall. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
