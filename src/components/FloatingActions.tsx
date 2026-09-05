import { Headphones, Instagram, Phone, Youtube, Star, Info, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { SITE, whatsappLink } from "@/lib/site";
import googleReviewsImg from "@/assets/google-reviews.png";

// Official WhatsApp glyph (from WhatsApp brand assets)
function WhatsAppGlyph({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.003 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.257.594 4.46 1.722 6.4L3.2 28.8l6.55-1.7a12.77 12.77 0 0 0 6.252 1.617h.005c7.07 0 12.8-5.73 12.8-12.8 0-3.42-1.331-6.633-3.748-9.05A12.72 12.72 0 0 0 16.003 3.2zm0 23.36h-.004a10.58 10.58 0 0 1-5.394-1.478l-.387-.23-3.886 1.01 1.037-3.79-.252-.4a10.55 10.55 0 0 1-1.62-5.672c0-5.866 4.776-10.64 10.642-10.64 2.842 0 5.51 1.108 7.516 3.117a10.57 10.57 0 0 1 3.115 7.524c0 5.866-4.775 10.64-10.643 10.64zm5.834-7.97c-.32-.16-1.892-.933-2.185-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.572-1.587-.95-.847-1.59-1.893-1.777-2.213-.187-.32-.02-.493.14-.652.144-.144.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.986-2.373-.26-.624-.524-.54-.72-.55l-.613-.011a1.18 1.18 0 0 0-.853.4c-.293.32-1.12 1.093-1.12 2.666 0 1.573 1.146 3.093 1.306 3.306.16.213 2.253 3.44 5.46 4.823.763.33 1.358.527 1.822.674.766.244 1.464.21 2.015.127.615-.092 1.892-.773 2.16-1.52.267-.747.267-1.387.186-1.52-.08-.133-.293-.213-.613-.373z"
      />
    </svg>
  );
}

function PhoneIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1 1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2z"
      />
    </svg>
  );
}

export function FloatingActions() {
  const wa = whatsappLink("Hello, I would like to request a quotation.");
  const [openReviews, setOpenReviews] = useState(false);

  const googleReviewLink =
    "https://www.google.com/search?q=satya+POWER+TECHNOLOGYS+inHouse+No.+49%2F50%2C+Vayushakthi+Nagar+Road+No.1%2C+Dammaiguda%2C+Hyderabad+-+500083%2C+Telangana%2C+India&newwindow=1&sca_esv=d9f40adba4e5763b&aep=1&biw=1366&bih=599&cs=0&hl=en-GB&sxsrf=APpeQnv6M9MPpVv0m3TdPwhRnGM4LbaFIw%3A1783410851000&ei=orBMasDEPNC4seMPt7Hy-QU&ved=0ahUKEwjAnYySi8CVAxVQXGwGHbeYPF8Q4dUDCBA&uact=5&oq=satya+POWER+TECHNOLOGYS+inHouse+No.+49%2F50%2C+Vayushakthi+Nagar+Road+No.1%2C+Dammaiguda%2C+Hyderabad+-+500083%2C+Telangana%2C+India&gs_lp=Egxnd3Mtd2l6LXNlcnAieHNhdHlhIFBPV0VSIFRFQ0hOT0xPR1lTIGluSG91c2UgTm8uIDQ5LzUwLCBWYXl1c2hha3RoaSBOYWdhciBSb2FkIE5vLjEsIERhbW1haWd1ZGEsIEh5ZGVyYWJhZCAtIDUwMDA4MywgVGVsYW5nYW5hLCBJbmRpYTIKECMYsAIYsAMYJzIIEAAY7wUYsAMyCBAAGO8FGLADMggQABjvBRiwAzIIEAAY7wUYsANIvCBQuRlYuRlwAXgAkAEAmAEAoAEAqgEAuAEDyAEA-AEC-AEBmAIBoAICmAMA4gMFEgExIECIBgGQBgWSBwExoAcAsgcAuAcAwgcDMC4xyAcCgAgB&sclient=gws-wiz-serp#lrd=0x3bcb9b78fa96671d:0xb9068d70416b057d,1,,,,";

  return (
    <>
      {/* Left side Google Reviews floating button */}
      <Dialog open={openReviews} onOpenChange={setOpenReviews}>
        <DialogTrigger asChild>
          <div className="fixed left-4 md:left-8 bottom-4 md:bottom-6 z-50 flex items-center">
            <button
              type="button"
              title="View Google Reviews"
              aria-label="Google Reviews"
              className="block hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer outline-none"
            >
              <img
                src={googleReviewsImg}
                alt="Google Reviews"
                className="h-10 md:h-12 w-auto object-contain bg-white p-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.15)] rounded border border-slate-200"
              />
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl bg-white border border-slate-200 p-6 md:p-8 rounded shadow-2xl text-slate-800 font-sans">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  SATYA POWER TECHNOLOGY'S
                </h2>
                <p className="text-xs md:text-sm text-slate-500 leading-normal max-w-sm">
                  House No 49, 50, Rd Number 1, Sri Krishna Nagar Colony, Vayushakti Nagar,
                  Dammaiguda, Secunderabad, Telangana 500083, India
                </p>
              </div>
              <a
                href={googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center justify-center px-4 py-2 border border-slate-200 rounded-full text-xs font-semibold text-blue-600 hover:bg-blue-50/50 hover:border-blue-300 transition-colors"
              >
                Write a review
              </a>
            </div>

            <div className="flex items-center gap-3 py-1">
              <span className="text-4xl md:text-5xl font-light text-slate-900 leading-none">
                5.0
              </span>
              <div className="space-y-1">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-500 text-yellow-500 stroke-yellow-500"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>1 reviews</span>
                  <Info className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-100 pt-4">
              <div className="text-xs font-semibold text-slate-500">Sort by</div>
              <div className="flex gap-2 flex-wrap text-xs font-medium">
                <span className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full">
                  Most relevant
                </span>
                <span className="bg-white text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 cursor-pointer">
                  Newest
                </span>
                <span className="bg-white text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 cursor-pointer">
                  Highest rating
                </span>
                <span className="bg-white text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 cursor-pointer">
                  Lowest rating
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <div className="bg-slate-50/50 p-4 md:p-5 rounded border border-slate-100 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-base shrink-0">
                      M
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 text-sm">Moula Shake</div>
                      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                        <span>2 reviews</span>
                        <span>•</span>
                        <span>4 days ago</span>
                        <span>•</span>
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                          NEW
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    className="text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Review options"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2 pl-0 sm:pl-12">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500 stroke-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    Good service center nice communication
                  </p>
                </div>

                <div className="flex items-center gap-6 pl-0 sm:pl-12 pt-3 border-t border-slate-100/60 text-xs text-slate-500">
                  <button className="flex items-center gap-1.5 hover:text-slate-800 transition cursor-pointer">
                    <Heart className="h-4 w-4" />
                    <span>Hover to react</span>
                  </button>
                  <button
                    className="flex items-center gap-1.5 hover:text-slate-800 transition cursor-pointer"
                    aria-label="Share review"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Right side social floating buttons (middle) */}
      <div className="fixed right-0 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 md:gap-3">
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          title="WhatsApp"
          className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        >
          <WhatsAppGlyph className="h-5 w-5 md:h-6 md:w-6" />
        </a>
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          title="Instagram"
          className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg hover:opacity-90 transition-opacity"
        >
          <Instagram className="h-5 w-5 md:h-6 md:w-6" />
        </a>
        <a
          href={SITE.youtube}
          target="_blank"
          rel="noreferrer"
          aria-label="YouTube"
          title="YouTube"
          className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg hover:bg-red-700 transition-colors"
        >
          <Youtube className="h-5 w-5 md:h-6 md:w-6" />
        </a>
        <a
          href={`tel:${SITE.phoneRaw}`}
          aria-label="Call"
          title="Call"
          className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Phone className="h-5 w-5 md:h-6 md:w-6" />
        </a>
      </div>

      {/* Right side contact bar (existing) */}
      <div className="fixed right-4 md:right-8 bottom-4 md:bottom-6 z-50 flex items-center shadow-lg">
        <a
          href={wa}
          target="_blank"
          rel="noreferrer"
          aria-label="Request Quote on WhatsApp"
          title="Request Quote on WhatsApp"
          className="group h-12 px-5 bg-primary text-primary-foreground flex items-center gap-3 hover:bg-brand-red-dark transition-colors"
        >
          <Headphones className="h-4 w-4" />
          <span className="text-sm font-normal">Contact Us</span>
        </a>
        <a
          href={`tel:${SITE.phoneRaw}`}
          aria-label="Call Now"
          title="Call Now"
          className="h-12 w-12 bg-brand-red-dark text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors"
        >
          <PhoneIcon className="h-5 w-5" />
        </a>
      </div>
    </>
  );
}
