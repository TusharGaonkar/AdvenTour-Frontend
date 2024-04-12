import NavBar from '../common/Navbar';
import MainCover from '../features/AdventourLandingPage/MainCover';
import CustomMobileNavigation from '../common/CustomMobileNavigation';
import TopTours from '../features/AdventourLandingPage/TopTours';
import CallToAction from '../features/AdventourLandingPage/CallToAction';
import FeaturesShowcase from '../features/AdventourLandingPage/FeaturesShowCase';
import GuideInfo from '../features/AdventourLandingPage/GuideInfo';
import TopReviews from '../features/AdventourLandingPage/TopReviews';

const AdventourLandingPage = () => (
  <>
    <NavBar />
    <main className="flex flex-col max-w-5xl gap-8 mx-auto">
      <MainCover />
      <CallToAction />
      <FeaturesShowcase />
      <TopTours />
      <GuideInfo />
      <TopReviews />
      <CustomMobileNavigation />
    </main>
  </>
);
export default AdventourLandingPage;
