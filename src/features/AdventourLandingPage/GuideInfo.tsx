import guideShowcase from '/guideshowcase.png';
import share from '/icons8-location-64.png';
import badge from '/icons8-badge-48.png';
import live from '/icons8-live-48.png';
import { Button } from '@nextui-org/react';

const GuideInfo = () => (
  <section className="grid items-center grid-flow-col grid-cols-2 gap-4 p-8 -mt-4 rounded-lg shadow-md bg-gradient-to-r from-slate-50 to-slate-200">
    <div className="flex flex-col gap-3 p-6">
      <h2 className="text-xl font-medium">Contribute to our platform</h2>
      <p className="text-3xl font-semibold">Become a Guide In 3 Easy Steps</p>

      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-start gap-4">
          <img src={share} alt="share" height="50" width="50" />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-indigo-600 text-medium">Share Your Adventure</h3>
            <p>
              Elevate your adventure by sharing your tour location details. Simply fill out our form
              with four captivating photos, location specifics, price and other essential details to
              showcase your tour.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <img src={badge} alt="badge" height="100" width="100" />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-indigo-600 text-medium">Expert Verification</h3>
            <p>
              Rest assured, your tour is in good hands. Our dedicated admin team verifies each
              detail you provide, ensuring authenticity and quality of your tour.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <img src={live} alt="live" height="100" width="100" />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-indigo-600 text-medium">Go Live & Thrive</h3>
            <p>
              Ready to embark on your journey? Once your tour is verified, it goes live, and you can
              start accepting bookings from eager travelers.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col items-center gap-12 mt-6">
      <img src={guideShowcase} alt="guide showcase" />
      <Button
        variant="shadow"
        size="lg"
        className="font-medium uppercase bg-green-300 border-gray-500 rounded-full border-1 text-slate-800"
      >
        Contribute Tour
      </Button>
    </div>
  </section>
);

export default GuideInfo;
