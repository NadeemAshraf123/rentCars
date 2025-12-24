import './App.css'
import HowItWorks from './components/howitworks/HowItWorks'
import Header from './components/layout/header/Header'
import DownloadApp from './components/pages/home/DownloadApp'
import Footer from './components/pages/home/Footer'
import HeroSection from './components/pages/home/HeroSection'
import PopularRentalDeals from './components/pages/home/PopularRentalDeals'
import Testimonials from './components/pages/home/Testimonials'
import SearchBar from './components/searchbar/SearchBar'
import WhyChooseUs from './components/whychooseus/WhyChooseUs'

function App() {

  return (
    <>
    <div className="px-46">
     <Header />
     <HeroSection />
     <SearchBar />
     <HowItWorks />
     </div>

     <WhyChooseUs />

    <div className="px-46">
     <PopularRentalDeals />
     </div>
     <Testimonials />
     <DownloadApp />
     <Footer />


    </>
  )
}

export default App
