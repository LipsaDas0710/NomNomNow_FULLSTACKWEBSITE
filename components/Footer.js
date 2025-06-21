'use client'
import { FaLinkedin, FaInstagram, FaFacebook, FaYoutube, FaXTwitter, FaGlobe, FaFlag } from 'react-icons/fa6';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="dark:bg-black dark:text-gray-200 px-6 py-10 pt-15  border-gray-700 bg-white text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        
        {/* ABOUT NOMNOMNOW */}
        <div>
          <h3 className="font-semibold mb-3 uppercase tracking-wide text-sm">About NomNomNow</h3>
          <ul className="space-y-2 text-sm">
            {['Who We Are', 'Blog', 'Work With Us', 'Investor Relations', 'Report Fraud', 'Press Kit', 'Contact Us'].map(item => (
              <li key={item}>
                <h3   className="hover:underline cursor-pointer dark:hover:text-white hover:text-black transition-colors">{item}</h3>
              </li>
            ))}
          </ul>
        </div>

        {/* FOR RESTAURANTS + LEARN MORE */}
        <div>
          <h3 className="font-semibold mb-3 uppercase tracking-wide text-sm">For Restaurants</h3>
          <ul className="space-y-2 text-sm">
            <li><h3   className="hover:underline cursor-pointer dark:hover:text-white hover:text-black transition-colors">Partner With Us</h3></li>
            <li><h3   className="hover:underline cursor-pointer dark:hover:text-white hover:text-black transition-colors">Apps For You</h3></li>
          </ul>

          <h3 className="font-semibold mt-6 mb-3 uppercase tracking-wide text-sm">Learn More</h3>
          <ul className="space-y-2 text-sm">
            <li><h3   className="hover:underline cursor-pointer dark:hover:text-white hover:text-black transition-colors">Privacy</h3></li>
            <li><h3   className="hover:underline cursor-pointer dark:hover:text-white hover:text-black transition-colors">Security</h3></li>
            <li><h3   className="hover:underline cursor-pointer dark:hover:text-white hover:text-black transition-colors">Terms</h3></li>
          </ul>
        </div>

        {/* EMPTY FOR ALIGNMENT */}
        <div className="hidden lg:block"></div>

        {/* SOCIALS + APP BUTTONS + LANG/COUNTRY */}
        <div className="space-y-5">
          {/* Social Icons */}
          <div className="flex space-x-4 cursor-pointer">
            {[FaLinkedin, FaInstagram, FaXTwitter, FaYoutube, FaFacebook].map((Icon, idx) => (
              <h3   key={idx} className="text-xl hover:text-gray-500 transition-colors"><Icon /></h3>
            ))}
          </div>

          {/* App Store Buttons */}
          <div className="flex flex-col gap-3 md:-ml-9 md:mr-6">
            <h3   className="flex cursor-pointer items-center justify-center bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors">
              <FaApple className="mr-2 text-xl" /> Download on the App Store
            </h3>
            <h3   className="flex cursor-pointer items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <FaGooglePlay className="mr-2 text-xl" /> Get it on Google Play
            </h3>
          </div>

          {/* Country & Language */}
          <div className="flex gap-3 ">
            <button className="flex items-center gap-1 px-3 py-1 border border-gray-600 rounded-md hover:bg-gray-500 dark:hover:bg-gray-800 focus:outline-none transition-colors">
              <FaFlag /> India
            </button>
            <button className="flex items-center gap-1 px-3 py-1 border border-gray-600 rounded-md hover:bg-gray-500 dark:hover:bg-gray-800 focus:outline-none transition-colors">
              <FaGlobe /> English
            </button>
          </div>
        </div>
      </div>

      {/* Footer Legal */}
      <hr className="my-6 border-gray-600" />
      <p className="text-center text-sm text-gray-400">
        By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners. 2008–2025 © NomNomNow™ Ltd. All rights reserved.
      </p>
    </footer>
  );
}
