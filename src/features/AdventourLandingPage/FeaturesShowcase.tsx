import man from '/man.png';
import climbing from '/climbing.png';
import easyCancel from '/fingerprint-scan.png';
import { Chip } from '@nextui-org/react';

const FeaturesShowcase = () => (
  <section className="flex flex-col bg-gradient-to-r from-slate-50">
    <div className="flex flex-col gap-4 top-0  items-center p-4">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-2xl p-3  uppercase text-slate-600">
          Why choose{' '}
          <span className="rounded-xl  p-2 text-2xl font-bold bg-neutral/90 text-white">
            AdvenTour?
          </span>
        </h2>

        <div className="grid grid-cols-3 grid-flow-col gap-4 p-12 mb-10">
          <div className="flex flex-col gap-2  items-center p-6 rounded-xl shadow-2xl bg-gradient-to-r from-blue-100">
            <img src={man} height={100} width={100} className="object-cover" alt="man" />
            <Chip variant="shadow" className="bg-blue-600/40">
              Verified Guides
            </Chip>

            <p>dfhsdfuh sdufsduh usdfsjd isdji jisdfj iosfjis dis djoisd</p>
          </div>
          <div className="flex flex-col gap-2  items-center p-6 rounded-xl shadow-md">
            <img
              src={climbing}
              height={150}
              width={150}
              className="object-cover rounded-full"
              alt="climbing"
            />
            <Chip variant="shadow" className="bg-orange-200">
              Curated Tours
            </Chip>

            <p>dfhsdfuh sdufsduh usdfsjd isdji jisdfj iosfjis dis djoisd</p>
          </div>

          <div className="flex flex-col gap-2  items-center p-6 rounded-xl shadow-md">
            <img src={easyCancel} height={100} width={100} className="object-cover" alt="cancel" />
            <Chip variant="shadow" className="bg-rose-300/40">
              Easy Cancellation
            </Chip>

            <p>dfhsdfuh sdufsduh usdfsjd isdji jisdfj iosfjis dis djoisd</p>
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
