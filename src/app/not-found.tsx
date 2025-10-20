import { Instrument_Serif } from "next/font/google";

const instrumentSerif = Instrument_Serif(
  {
    variable: "--font-instrument-serif",
    weight: ["400"],
    subsets: ["latin"],
    style: ["italic"]
  }
)
function NotFound() {
  return <section className="bg-neutral-200 flex items-center justify-center min-h-screen">
    <div className="space-y-8">
      <h1 className="text-7xl text-orange-500 text-center">/* 404 */</h1>
      <p className={`${instrumentSerif.className} text-neutral-700 text-xl text-center`}>
        You've Lost Your Path! Be Your Own Light And Guide Yourself To The Correct Path.
      </p>
    </div>
  </section>
}

export default NotFound;
