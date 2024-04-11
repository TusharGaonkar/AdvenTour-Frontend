import NavBar from '../common/Navbar';
import MainCover from '../features/AdventourLandingPage/MainCover';
import CustomMobileNavigation from '../common/CustomMobileNavigation';
import TopTours from '../features/AdventourLandingPage/TopTours';
import CallToAction from '../features/AdventourLandingPage/CallToAction';
import FeaturesShowcase from '../features/AdventourLandingPage/FeaturesShowCase';

const AdventourLandingPage = () => (
  <>
    <NavBar />
    <main className="flex flex-col gap-6  max-w-5xl mx-auto">
      <MainCover />
      <FeaturesShowcase />
      <CallToAction />
      <TopTours />
      <CustomMobileNavigation />
    </main>
  </>
);
export default AdventourLandingPage;
