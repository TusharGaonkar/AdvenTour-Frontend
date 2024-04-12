import man from '/man.png';
import climbing from '/climbing.png';
import easyCancel from '/fingerprint-scan.png';
import { Chip } from '@nextui-org/react';

const FeaturesShowcase = () => (
  <section className="flex flex-col -mt-4 rounded-lg bg-gradient-to-r from-slate-50 to-slate-200">
    <div className="top-0 flex flex-col items-center gap-4 p-4">
      <div className="flex flex-col gap-4">
        <h2 className="p-6 text-2xl font-bold uppercase text-slate-600">
          Why choose
          <span className="p-2 text-3xl font-bold text-sky-500 rounded-xl">AdvenTour?</span>
        </h2>

        <div className="grid grid-flow-col grid-cols-3 gap-4 p-10 mb-10">
          <div className="flex flex-col items-center gap-2 p-6 shadow-lg rounded-xl bg-gradient-to-r from-blue-100">
            <img src={man} height={100} width={100} className="object-cover" alt="man" />
            <Chip variant="shadow" className="uppercase bg-blue-600/40">
              <p className="font-semibold tracking-wide">Verified Guides</p>
            </Chip>

            <p className="text-sm leading-relaxed">
              Experience assurance, featuring exclusively verified guides and tours for a seamless
              journey.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 p-6 shadow-2xl rounded-xl bg-gradient-to-r from-orange-50">
            <img
              src={climbing}
              height={150}
              width={150}
              className="object-cover rounded-full"
              alt="climbing"
            />
            <Chip variant="shadow" className="uppercase bg-orange-200">
              <p className="font-semibold tracking-wide">Top curated tours</p>
            </Chip>

            <p className="text-sm leading-relaxed">
              Explore curated tours across 30+ categories, with customizable filters for nearby
              adventures tailored to your preferences, ranging from easy to challenging.
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 p-6 shadow-lg rounded-xl bg-gradient-to-r from-rose-50">
            <img src={easyCancel} height={100} width={100} className="object-cover" alt="cancel" />
            <Chip variant="shadow" className="uppercase bg-rose-300/40">
              <p className="font-semibold tracking-wide">Easy Cancellation</p>
            </Chip>

            <p className="text-sm leading-relaxed">
              Enjoy peace of mind with our easy cancellation policy - simply click to cancel up to 7
              days in advance for a full refund on all booked tours.
            </p>
          </div>
        </div>
      </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="-mt-32">
      <path
        fill="#00cba9"
        fill-opacity="0.1"
        d="M0,128L48,160C96,192,192,256,288,256C384,256,480,192,576,154.7C672,117,768,107,864,122.7C960,139,1056,181,1152,176C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </section>
);

export default FeaturesShowcase;
