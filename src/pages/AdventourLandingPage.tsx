import NavBar from '../common/Navbar';
import MainCover from '../features/AdventourLandingPage/MainCover';
import CustomMobileNavigation from '../common/CustomMobileNavigation';
import TopTours from '../features/AdventourLandingPage/TopTours';
import CallToAction from '../features/AdventourLandingPage/CallToAction';
import FeaturesShowcase from '../features/AdventourLandingPage/FeaturesShowcase';
import GuideInfo from '../features/AdventourLandingPage/GuideInfo';
import TopReviews from '../features/AdventourLandingPage/TopReviews';
import Footer from '../features/AdventourLandingPage/Footer';

const AdventourLandingPage = () => (
  <>
    <NavBar />
    <main className="flex flex-col max-w-5xl gap-8 mx-auto mb-20">
      <MainCover />
      <CallToAction />
      <FeaturesShowcase />
      <TopTours />
      <GuideInfo />
      <TopReviews />
    </main>
    <footer className="flex flex-col w-full gap-8 mx-auto">
      <Footer />
    </footer>
    <CustomMobileNavigation />
  </>
);
export default AdventourLandingPage;
