import getAlbumTracksData from "@/lib/Spotify/album/getAlbumTracks";
import getAlbumData from "@/lib/Spotify/album/getAlbumData";
import getArtistsData from "@/lib/Spotify/artists/getArtistsData";
import ContactForm from "@/components/ContactForm";
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
import AnimatedLogo from "@/components/ui/logo";
import {
  Play,
  Instagram,
  MapPin,
  MicVocal,
  Calendar,
  Ticket,
  Youtube,
  Calendar1Icon,
} from "lucide-react";
import { BsSpotify, BsTiktok } from "react-icons/bs";
import {
  LocalizationData,
  SupportedLocale,
  getSafeLocale,
  ButtonTranslations,
  HeroTranslations,
  AboutTranslations,
  ourMusicTranslations,
  tourDatesTranslations,
} from "@/types/localization";
import { FaSoundcloud } from "react-icons/fa";

// Types

type HeaderLink = {
  href: string;
  label: string;
};

type LanguageOption = {
  code: string;
  flag: string;
};

interface ArtistData {
  name: string;
  followers: {
    href: string | null;
    total: number;
  };
  genres: string[];
  images: { url: string; width: number; height: number }[];
}

interface AlbumID {
  id: string;
}

type BrotherhoodType = {
  name: string;
  instagram: string;
  link: string;
  instrumental: string;
  image: string;
};

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'https://face-the-wall.vercel.app'),
  title: "Face The Wall - Metal Band",
  description: "Official website of Face The Wall, a Slovak thrash metal band.",
  openGraph: {
    title: "Face The Wall - Metal Band",
    description:
      "Official website of Face The Wall, a Slovak thrash metal band.",
    url: '/',
    siteName: "Face The Wall",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Face The Wall - Metal Band",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Face The Wall - Metal Band",
    description: "Official website of Face The Wall, a Slovak thrash metal band.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function Home({ params }: { params: { locale: string } }) {
  // ✅ params nie je Promise – netreba await
  const { locale } = await params;

  const res = await fetch(`${process.env.BASE_URL}/api/images`, {
    cache: "no-store",
    next: { revalidate: 0 },
  });
  const images = await res.json();

  const currentLocale: SupportedLocale = getSafeLocale(locale);
  const t: LocalizationData = (
    await import(`../../locales/${currentLocale}.json`)
  ).default;

  const headerLinks: HeaderLink[] = [
    { href: "#home", label: t.nav.home },
    { href: "#about", label: t.nav.about },
    { href: "#music", label: t.nav.music },
    { href: "#shows", label: t.nav.shows },
    { href: "#contact", label: t.nav.contact },
  ];

  const buttonText: ButtonTranslations = {
    listenUs: t.buttons.listenUs,
    followUs: t.buttons.followUs,
    tourDates: t.buttons.tourDates,
  };

  const brotherhoodInfo: BrotherhoodType[] = [
    {
      name: "LEO MEDVED",
      link: "https://www.instagram.com/leo._medved/",
      instrumental: "Guitar & VOCALS",
      instagram: "@leo._medved",
      image: images[2]?.url || "/fallback-image.jpg",
    },
    {
      name: "SIMON VICIAN",
      link: "https://www.instagram.com/_s1m0n_f.t.w._/",
      instrumental: "LEAD GUITAR",
      instagram: "@_s1m0n_f.t.w.",
      image: images[0]?.url || "/fallback-image.jpg",
    },
    {
      name: "MICHAL LAMPER",
      link: "https://www.instagram.com/siberka_v_analy_jkj_hrubyklat/",
      instrumental: "DRUMMS",
      instagram: "@siberka_v_analy_jkj_hrubyklat",
      image: images[1]?.url || "/fallback-image.jpg",
    },
    {
      name: "TIMOTEJ PANUSKA",
      link: "https://www.instagram.com/timmcis/",
      instrumental: "BASS GUITAR",
      instagram: "@timmcis",
      image: images[4]?.url || "/fallback-image.jpg",
    },
  ];

  const heroInfo: HeroTranslations = {
    subtitle: t.hero.subtitle,
    listenButton: t.hero.listenButton,
    followers: t.hero.followers,
    albums: t.hero.albums,
    songs: t.hero.songs,
    tourDivTitle: t.hero.tourDivTitle,
    tourDivSubtitle: t.hero.tourDivSubtitle,
  };

  const aboutInfo: AboutTranslations = {
    title: t.about.title,
    description1: t.about.description1,
    description2: t.about.description2,
    description3: t.about.description3,
    description4: t.about.description4,
    description5: t.about.description5,
    tile1: t.about.tile1,
    tile2: t.about.tile2,
    tile3: t.about.tile3,
    tile4: t.about.tile4,
  };

  const ourMusicInfo: ourMusicTranslations = {
    title: t.our_music.title,
    description: t.our_music.description,
  };

  const tourDatesInfo: tourDatesTranslations = {
    title: t.tour.title,
    description: t.tour.description,
    dates: t.tour.dates,
  };

  const languageOptions: LanguageOption[] = [
    { code: "sk", flag: "/flags/sk.png" },
    { code: "en", flag: "/flags/en.png" },
  ];

  const artistData: ArtistData = await getArtistsData();
  const albumsID: AlbumID[] = await getAlbumTracksData();
  const numAlbums = albumsID.length;

  const albumsData = await Promise.all(
    albumsID.map(async (album) => {
      try {
        return await getAlbumData(album.id);
      } catch (error) {
        console.error(`Failed to fetch album data for ID ${album.id}:`, error);
        return null;
      }
    })
  );

  const validAlbumsData = albumsData.filter((album) => album !== null);

  let totalAlbumTracks = 0;
  for (let i = 0; i < validAlbumsData.length; i++) {
    totalAlbumTracks += validAlbumsData[i].total_tracks;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-orange-500/20 h-20">
        <div className="container mx-auto px-6 h-full flex items-center">
          {/* Desktop Navigation */}
          <nav className="hidden md:grid md:grid-cols-3 items-center w-full max-w-7xl mx-auto h-full">
            {/* Left Navigation */}
            <div className="flex items-center space-x-6 lg:space-x-8 justify-start h-full">
              <a
                href="#home"
                className="font-bold text-white hover:text-orange-500 transition-colors tracking-wide text-sm lg:text-base"
              >
                {t.nav.home}
              </a>
              <a
                href="#about"
                className="text-white font-bold hover:text-orange-500 transition-colors tracking-wide text-sm lg:text-base"
              >
                {t.nav.about}
              </a>
            </div>

            {/* Center Logo */}
            <div className="flex items-center justify-center h-full">
              <Link href={`/${locale}`}>
                <AnimatedLogo
                  width={80}
                  height={80}
                  className="transition-transform lg:w-20 lg:h-20"
                />
              </Link>
            </div>

            {/* Right Navigation */}
            <div className="flex items-center space-x-6 lg:space-x-8 justify-end h-full">
              <a
                href="#music"
                className="text-white hover:text-orange-500 transition-colors font-bold tracking-wide"
              >
                {t.nav.music}
              </a>
              <a
                href="#shows"
                className="text-white hover:text-orange-500 transition-colors font-bold tracking-wide"
              >
                {t.nav.shows}
              </a>
              <a
                href="#contact"
                className="text-white hover:text-orange-500 transition-colors font-bold tracking-wide"
              >
                {t.nav.contact}
              </a>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:text-orange-500 relative z-50"
                  >
                    <CiGlobe className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  sideOffset={8}
                  collisionPadding={8}
                  className="p-2 bg-black/95 backdrop-blur-md border-orange-500/20 min-w-[120px]"
                >
                  <div className="flex flex-col gap-2">
                    {languageOptions.map((lang) => (
                      <Link
                        key={lang.code}
                        href={`/${lang.code}`}
                        className={`relative flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-200 hover:scale-105 ${
                          locale === lang.code
                            ? "bg-orange-500 border-orange-400 text-white shadow-lg"
                            : "bg-gray-800/60 border-gray-600 text-gray-300 hover:bg-orange-500/20 hover:border-orange-400/50"
                        }`}
                      >
                        <Image
                          src={lang.flag}
                          alt={lang.code}
                          width={20}
                          height={14}
                          className="object-cover rounded-sm flex-shrink-0"
                        />
                        <span className="text-sm font-medium uppercase tracking-wide">
                          {lang.code}
                        </span>
                        {locale === lang.code && (
                          <div className="absolute inset-0 rounded-lg ring-1 ring-orange-300/50"></div>
                        )}
                      </Link>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>

          {/* Mobile */}
          <div className="md:hidden flex items-center justify-between w-full h-full">
            <Link href={`/${locale}`}>
              <AnimatedLogo
                width={50}
                height={50}
                className="transition-transform"
              />
            </Link>
            <MobileNav
              headerLinks={headerLinks}
              languageOptions={languageOptions}
              locale={locale}
            />
          </div>
        </div>
      </header>

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <Image
          src={images[5]?.url || "/fallback-bg.jpg"}
          alt={images[5]?.description || "Background"}
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover blur-[2px] sm:blur-sm md:blur-md opacity-35"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background: `linear-gradient(to right, rgba(255,69,0,0.3) 0%, rgba(255,69,0,0.2) 30%, rgba(255,69,0,0) 50%, rgba(220,20,60,0.4) 70%, rgba(220,20,60,0.3) 100%)`,
          }}
        />
        <div
          className="absolute inset-0 z-20"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.9) 100%)`,
          }}
        />
      </div>

      {/* Hero */}
      <div
        id="home"
        className="w-full min-h-[100svh] flex flex-col justify-center relative z-40 px-4 sm:px-6 md:px-8 pt-24 sm:pt-28 scroll-mt-24"
      >
        <div className="w-full flex font-metal text-white mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-center mb-2 sm:mb-4 stroke-3 stroke-secondary-orange inline-block tracking-wider drop-shadow-sm drop-shadow-primary-orange w-full leading-tight [font-size:clamp(3rem,12vw,10rem)] font-metal">
            FACE THE WALL
          </h1>
        </div>

        <div className="text-center max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl mx-auto px-2 sm:px-4 md:px-6">
          {/* Genres */}
          <div className="mb-6 sm:mb-8 md:mb-12 p-2 sm:p-3 md:p-4 font-semibold mx-auto bg-black/60 rounded-xl sm:rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md">
            <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 mb-2 sm:mb-3 md:mb-4">
              <h2 className="tracking-wider sm:tracking-widest">DEATH METAL</h2>
              <span className="text-white1 text-lg sm:text-xl md:text-2xl">
                •
              </span>
              <h2 className="tracking-wider sm:tracking-widest">
                THRASH METAL
              </h2>
            </div>
            <p className="text-white2 text-xs sm:text-sm md:text-base italic px-1 sm:px-2 leading-relaxed">
              {heroInfo.subtitle}
            </p>
          </div>
          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16 w-full">
            <Button className="w-full md:w-auto md:min-w-[160px] default-text hover:border-2 hover:bg-orange-700 text-primary-black px-6 md:px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 text-sm md:text-base">
              <Play className="w-5 h-5 shrink-0" />
              <span className="line-clamp-1">{buttonText.listenUs}</span>
            </Button>
            <Button
              variant="outline"
              className="w-full md:w-auto md:min-w-[160px] border-3 bg-primary-black/60 border-primary-orange text-orange-400 hover:bg-orange-600 hover:text-white px-6 md:px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 text-sm md:text-base"
            >
              <Instagram className="w-5 h-5 shrink-0" />
              <span className="line-clamp-1">{buttonText.followUs}</span>
            </Button>
            <Button
              variant="outline"
              className="w-full md:w-auto md:min-w-[140px] bg-primary-black/0 border-0 text-white1 hover:bg-primary-black/20 hover:text-white2 px-6 md:px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <span className="text-base sm:text-lg">
                <Calendar1Icon />
              </span>
              <span className="line-clamp-1">{buttonText.tourDates}</span>
            </Button>
          </div>
          {/* Stats Section */}{" "}
          <div className="flex flex-row items-center justify-between gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-6 sm:mb-8 md:mb-12 px-2">
            <div className="text-center flex-1">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-orange mb-1">
                {artistData.followers.total}+{" "}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 tracking-wide leading-tight">
                {heroInfo.followers}
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-red1 mb-1">
                {numAlbums}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 tracking-wide leading-tight">
                {heroInfo.albums}
              </div>
            </div>
            <div className="text-center flex-1">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-primary-orange mb-1">
                {totalAlbumTracks}+
              </div>
              <div className="text-xs sm:text-sm text-gray-400 tracking-wide leading-tight">
                {heroInfo.songs}
              </div>
            </div>
          </div>
          {/* Next show */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4 p-4 md:p-6 lg:p-8 bg-black/70 backdrop-blur-sm rounded-xl sm:rounded-2xl max-w-full mx-auto">
            <div className="flex flex-col items-center justify-center bg-secondary-orange/20 rounded-xl border-2 border-primary-orange/80 p-2 sm:p-3 md:p-4 min-w-[64px] sm:min-w-[72px] md:min-w-[88px] flex-shrink-0">
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary-orange">
                16
              </span>
              <span className="text-xs sm:text-xs md:text-sm text-white2 font-semibold">
                JUNE
              </span>
            </div>
            <div className="text-center sm:text-left flex-1 min-w-0">
              <div className="flex items-center justify-center sm:justify-start text-primary-orange mb-1 sm:mb-2">
                <MicVocal className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="text-primary-orange text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold line-clamp-2">
                  {heroInfo.tourDivTitle}
                </span>
              </div>
              <p className="text-white2 text-xs sm:text-sm md:text-base mb-1 sm:mb-2 leading-tight line-clamp-2">
                {heroInfo.tourDivSubtitle}
              </p>
              <div className="flex items-center justify-center sm:justify-start text-primary-orange">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1 sm:mr-2 flex-shrink-0" />
                <span className="text-white2 text-xs sm:text-sm md:text-base truncate">
                  THE TOP, Banska Bystrica
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <section id="about" className="relative py-20 bg-black scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-metal text-primary-orange stroke-2 stroke-primary-orange mb-4 tracking-wider">
              OUR STORY
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-orange mb-6 tracking-wide">
                {aboutInfo.title}
              </h3>
              <div className=" text-gray-300">
                <p className="text-sm md:text-base leading-relaxed mb-4">
                  {aboutInfo.description1}
                </p>
                <p className="text-sm md:text-base leading-relaxed mb-4">
                  {aboutInfo.description2}
                </p>
                <p className="text-sm md:text-base leading-relaxed font-semibold text-white space-y-4 text-left">
                  {aboutInfo.description3}
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  {aboutInfo.description4}
                </p>
                <p className="text-sm md:text-base leading-relaxed font-bold text-primary-orange space-y-4">
                  {aboutInfo.description5}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-900/60 border border-orange-600/30 rounded-lg p-4 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary-orange mb-2">
                    5+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 tracking-wide uppercase">
                    {aboutInfo.tile1}
                  </div>
                </div>
                <div className="bg-gray-900/60 border border-orange-600/30 rounded-lg p-4 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary-orange mb-2">
                    350+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 tracking-wide uppercase">
                    {aboutInfo.tile2}
                  </div>
                </div>
                <div className="bg-gray-900/60 border border-orange-600/30 rounded-lg p-4 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary-orange mb-2">
                    3000+
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 tracking-wide uppercase">
                    {aboutInfo.tile3}
                  </div>
                </div>
                <div className="bg-gray-900/60 border border-orange-600/30 rounded-lg p-4 text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary-orange mb-2">
                    4
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 tracking-wide uppercase">
                    {aboutInfo.tile4}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden ">
                <Image
                  src={images[3]?.url || "/fallback-image.jpg"}
                  alt="Face The Wall Band"
                  fill
                  className="object-cover rounded-4xl"
                  sizes="(max-width: 768px) 100vw, 50vw "
                />
              </div>
            </div>
          </div>

          {/* Brotherhood */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-metal text-red-600 mb-4 tracking-wider">
                THE BROTHERHOOD
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {brotherhoodInfo.map((member: BrotherhoodType) => (
                <div key={member.name} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden relative">
                    <div>
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110 filter contrast-140 brightness-75 exposure-8 shadows-50"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 min-w-0">
                      <div className="mb-1 sm:mb-2">
                        <Link
                          href={member.link}
                          target="_blank"
                          className="inline-flex items-center gap-2 bg-primary-orange/80 hover:bg-primary-orange px-2 sm:px-3 py-1 rounded-full text-xs font-semibold text-black transition-colors max-w-full"
                        >
                          <Instagram className="w-3 h-3 shrink-0" />
                          <span className="truncate text-xs">
                            {member.instagram}
                          </span>
                        </Link>
                      </div>
                      <h3 className="text-white font-bold text-xs sm:text-sm md:text-base tracking-wide leading-tight line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-white2 text-[10px] sm:text-xs font-medium uppercase tracking-wider leading-tight line-clamp-1">
                        {member.instrumental}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Music */}
      <section id="music" className="relative py-20 bg-black scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-6xl font-metal text-primary-orange stroke-2 stroke-primary-orange mb-4 tracking-wider">
              {ourMusicInfo.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
              {ourMusicInfo.description}
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {validAlbumsData.map((album) => (
              <div
                key={album.id}
                className="bg-secondary-black/60 border border-secondary-black rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <div className="aspect-video relative">
                    <Image
                      src={album.images[0]?.url || "/fallback-album.jpg"}
                      alt={album.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white1">
                      <h3 className="text-xl md:text-2xl font-bold mb-1">
                        {album.name}
                      </h3>
                      <p className="text-white2 text-sm font-medium">
                        Released: {new Date(album.release_date).getFullYear()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-white font-semibold mb-4 text-lg">
                    Track List
                  </h4>
                  <div className="space-y-2">
                    {album.tracks?.items?.slice(0, 4).map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center justify-between text-sm gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-orange-400 font-medium shrink-0 w-6">
                            {track.track_number}.
                          </span>
                          <span className="text-gray-300 truncate">
                            {track.name}
                          </span>
                        </div>
                        <span className="text-gray-500 shrink-0">
                          {Math.floor(track.duration_ms / 60000)}:
                          {Math.floor((track.duration_ms % 60000) / 1000)
                            .toString()
                            .padStart(2, "0")}
                        </span>
                      </div>
                    ))}
                    {album.tracks?.items?.length > 4 && (
                      <div className="text-orange-400 text-sm font-medium pt-2">
                        +{album.tracks.items.length - 4} more tracks
                      </div>
                    )}
                  </div>

                  <Link
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="hover:scale-103 duration-400 w-full flex items-center gap-6 mt-6 border-secondary-black border-1">
                      <div className="flex items-center gap-2">
                        <BsSpotify className="w-4 h-4" />
                        <span className="text-gray-400 text-sm font-bold">
                          Listen
                        </span>
                      </div>
                      <div className="text-gray-400 text-sm">
                        {album.total_tracks} tracks
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shows */}
      <section id="shows" className="relative py-20 bg-black scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-metal text-primary-orange stroke-2 stroke-primary-orange mb-4 tracking-wider">
              {tourDatesInfo.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
              {tourDatesInfo.description}
            </p>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            {tourDatesInfo.dates.length === 0 ? (
              <div className="text-gray-400 text-sm">
                No upcoming shows
              </div>
            ) : (
              tourDatesInfo.dates.map((dateInfo, index) => (
                <div
                  key={index}
                  className="bg-gray-900/60 border border-orange-600/30 rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between hover:bg-gray-900/80 transition-all duration-300"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 text-primary-orange">
                    <Calendar className="w-5 h-5" />
                    <span className="text-white font-semibold">
                      {dateInfo.date}
                    </span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                      dateInfo.status.toLowerCase() === "sold out"
                        ? "bg-red-600 text-white"
                        : dateInfo.status.toLowerCase() === "almost sold out"
                        ? "bg-orange-600 text-white"
                        : "bg-green-600 text-white"
                    }`}
                  >
                    {dateInfo.status}
                  </div>
                </div>

                <div className="flex-1 sm:mx-6 min-w-0">
                  <h3 className="text-white font-bold text-base sm:text-lg mb-1 line-clamp-1">
                    {dateInfo.venue}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="text-sm truncate">
                      {dateInfo.location}
                    </span>
                  </div>
                </div>

                <div className="sm:self-auto">
                  {dateInfo.status.toLowerCase() !== "sold out" ? (
                    <Link href={`/tickets/${dateInfo.href}`}>
                      <Button className="bg-primary-orange hover:bg-secondary-orange text-black font-semibold px-4 py-2 rounded-md transition-all duration-300 hover:scale-105 flex items-center gap-2">
                        <Ticket className="w-4 h-4" />
                        Tickets
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      disabled
                      className="bg-gray-600 text-gray-400 px-4 py-2 rounded-md cursor-not-allowed flex items-center gap-2"
                    >
                      <Ticket className="w-4 h-4" />
                      Sold Out
                    </Button>
                  )}
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative py-20 bg-black scroll-mt-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-metal text-primary-orange stroke-2 stroke-primary-orange mb-4 tracking-wider">
              {t.contact.title}
            </h2>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
              {t.contact.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-gray-900/60 border border-orange-600/30 rounded-lg p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-4 h-4 bg-primary-orange rounded-sm"></div>
                <h3 className="text-primary-orange font-semibold text-lg">
                  Send Us a Message
                </h3>
              </div>
              <ContactForm
                title=""
                description=""
                name={t.contact.name}
                email={t.contact.email}
                message={t.contact.message}
                required={t.contact.required}
                successMessage={t.contact.successMessage}
                errorMessage={t.contact.errorMessage}
                submit={t.contact.submit}
              />
            </div>

            <div className="space-y-8">
              <div className="bg-gray-900/60 border border-orange-600/30 rounded-lg p-6">
                <h3 className="text-primary-orange font-semibold text-lg mb-6">
                  Follow Us
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="https://www.instagram.com/face_.the._wall/"
                    target="_blank"
                    className="flex items-center gap-3 bg-gray-800/60 hover:bg-gray-700/60 p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5 text-primary-orange" />
                    <span className="text-white font-medium">Instagram</span>
                  </Link>
                  <Link
                    href="https://www.tiktok.com/@face.the.wall?_t=8kgessd2vzt&_r=1"
                    target="_blank"
                    className="flex items-center gap-3 bg-gray-800/60 hover:bg-gray-700/60 p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <BsTiktok className="w-5 h-5 text-primary-orange" />
                    <span className="text-white font-medium">TikTok</span>
                  </Link>
                  <Link
                    href="https://www.youtube.com/@FaceTheWallBand"
                    target="_blank"
                    className="flex items-center gap-3 bg-gray-800/60 hover:bg-gray-700/60 p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <Youtube className="w-5 h-5 text-primary-orange" />
                    <span className="text-white font-medium">YouTube</span>
                  </Link>
                  <Link
                    href="https://soundcloud.com/facethewall/sets/faces-of-death"
                    target="_blank"
                    className="flex items-center gap-3 bg-gray-800/60 hover:bg-gray-700/60 p-4 rounded-lg border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
                  >
                    <FaSoundcloud className="w-5 h-5 text-primary-orange" />
                    <span className="text-white font-medium">SoundCloud</span>
                  </Link>
                </div>
              </div>

              <div className="bg-gray-900/60 border border-orange-600/30 rounded-lg p-6">
                <h3 className="text-primary-orange font-semibold text-lg mb-4">
                  Mail Us
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-white font-medium mb-1">Booking</h4>
                    <p className="text-gray-400 text-sm">
                      booking@face_the_wall_official.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900/60 border border-orange-600/30 rounded-lg p-6">
                <h3 className="text-primary-orange font-semibold text-lg mb-4">
                  Location
                </h3>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary-orange mt-1" />
                  <div>
                    <p className="text-white font-medium">Banská Bystrica</p>
                    <p className="text-gray-400 text-sm">Slovakia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className=" bg-black-background border-t border-orange-600/30 z-50 relative py-12">
        <div className="container mx-auto px-6 pt-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-8">
            <div className="col-span-1 justify-center flex flex-col items-center">
              <div className="mb-6 justify-center flex flex-col items-center">
                <Image
                  src="/logo.png"
                  alt="Face The Wall Logo"
                  width={100}
                  height={200}
                  className="h-24 w-40 object-contain rounded-lg p-1"
                />

                <p className="text-gray-400 text-sm text-center leading-relaxed">
                  Loud. Fast. No compromises. Death/Thrash metal from Slovakia.
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  href="https://www.instagram.com/face_the_wall_official"
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-orange border border-gray-700 hover:border-primary-orange rounded-lg flex items-center justify-center transition-all duration-300 group"
                >
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-black" />
                </Link>
                <Link
                  href="https://open.spotify.com/artist/your-spotify-id"
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-orange border border-gray-700 hover:border-primary-orange rounded-lg flex items-center justify-center transition-all duration-300 group"
                >
                  <BsSpotify className="w-5 h-5 text-gray-300 group-hover:text-black" />
                </Link>
                <Link
                  href="https://www.youtube.com/@facethewall"
                  target="_blank"
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-orange border border-gray-700 hover:border-primary-orange rounded-lg flex items-center justify-center transition-all duration-300 group"
                >
                  <Play className="w-5 h-5 text-gray-300 group-hover:text-black" />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-primary-orange font-semibold text-lg mb-4 tracking-wide">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {headerLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-primary-orange transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-primary-orange font-semibold text-lg mb-4 tracking-wide">
                Our Music
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#music"
                    className="text-gray-400 hover:text-primary-orange transition-colors duration-300 text-sm"
                  >
                    Latest Album
                  </a>
                </li>
                <li>
                  <Link
                    href="https://open.spotify.com/artist/6zHb8dmI7oyFot5yNStuH1?si=fLJO6FEzRga2l0FqHXm9fQ&utm_medium=share&utm_source=linktree&nd=1&dlsi=dceb0bc19f484434"
                    target="_blank"
                    className="text-gray-400 hover:text-primary-orange transition-colors duration-300 text-sm"
                  >
                    Spotify
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://music.apple.com/sk/album/faces-of-death-pt1-ep/1725534161?at=1000lHKX&ct=linktree_http&itsct=lt_m&itscg=30200&ls=1"
                    target="_blank"
                    className="text-gray-400 hover:text-primary-orange transition-colors duration-300 text-sm"
                  >
                    Apple Music
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/playlist?list=OLAK5uy_k8pzWnDQl-df2x1bLghfh-d9d7VxcgKKw"
                    target="_blank"
                    className="text-gray-400 hover:text-primary-orange transition-colors duration-300 text-sm"
                  >
                    YouTube Music
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-primary-orange font-semibold text-lg mb-4 tracking-wide">
                Contact
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
                    Booking
                  </p>
                  <Link
                    href="mailto:booking@facethewall.com"
                    className="text-gray-400 hover:text-primary-orange transition-colors duration-300 text-sm"
                  >
                    booking@facethewall.com
                  </Link>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-400 text-sm">Banská Bystrica</p>
                    <p className="text-gray-500 text-xs">Slovakia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-500 text-sm text-center md:text-left">
                © 2025 Face The Wall. | Made with by Valorix
              </div>
              <div className="flex gap-6 text-xs text-gray-500">
                <Link
                  href="/privacy"
                  className="hover:text-primary-orange transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-primary-orange transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="hover:text-primary-orange transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
