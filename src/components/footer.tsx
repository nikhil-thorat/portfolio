import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif(
  {
    variable: "--font-instrument-serif",
    weight: ["400"],
    subsets: ["latin"],
    style: ["italic"]
  }
)

function Footer() {
  return <footer className="pb-8 flex items-center justify-center">
    <p className={`${instrumentSerif.className} text-neutral-700 text-xl`}>Appo Deepo Bhava<span className="text-orange-500 font-bold text-2xl font-sans">.</span></p>
  </footer>
}

export default Footer;
