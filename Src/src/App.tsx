import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Flame, TrendingUp } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { UnitToggle } from './components/UnitToggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { CurrentWeatherDisplay } from './components/CurrentWeather';
import { WeatherDetails } from './components/WeatherDetails';
import { ForecastCard } from './components/ForecastCard';
import { ContactForm } from './components/ContactForm';
import { Sponsors } from './components/Sponsors';
import { Footer } from './components/Footer';
import { useWeather } from './hooks/useWeather';
import { useTemperatureUnit } from './hooks/useTemperatureUnit';

function App() {
  const { weatherData, loading, error, fetchWeather } = useWeather('London');
  const { unit, toggleUnit, convertTemperature, getUnitSymbol } = useTemperatureUnit();
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const [forecastRef, forecastInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSearch = (location: string) => {
    fetchWeather(location);
  };

  const handleRetry = () => {
    if (weatherData) {
      fetchWeather(weatherData.location.name);
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Animated Background with Parallax - Red & Yellow Theme */}
      <motion.div 
        className="fixed inset-0 overflow-hidden pointer-events-none"
        style={{ y: backgroundY }}
      >
        {/* Large animated red and yellow orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-red-600/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.25, 0.4, 0.25],
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-yellow-500/35 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.35, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-amber-400/25 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.35, 0.2],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-red-500/30 rounded-full blur-3xl"
        />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-center section-spacing gap-4"
          >
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <Flame className="w-8 h-8 md:w-10 md:h-10 text-yellow-300" />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-shadow">
                Weather Forecast
              </h1>
            </motion.div>
            <UnitToggle unit={unit} onToggle={toggleUnit} />
          </motion.header>

          {/* Search Bar */}
          <div className="section-spacing">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>

          {/* Scroll Progress Bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 origin-left z-50"
            style={{ scaleX: scrollYProgress }}
          />

          {/* Content Area */}
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading">
                <LoadingSpinner />
              </motion.div>
            )}

            {error && !loading && (
              <motion.div key="error">
                <ErrorDisplay message={error} onRetry={handleRetry} />
              </motion.div>
            )}

            {weatherData && !loading && !error && (
              <motion.div
                key="weather"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4 md:space-y-6 lg:space-y-8"
              >
                {/* Current Weather */}
                <CurrentWeatherDisplay
                  weather={weatherData.current}
                  locationName={weatherData.location.name}
                  temperature={convertTemperature(weatherData.current.temp)}
                  feelsLike={convertTemperature(weatherData.current.feelslike)}
                  unitSymbol={getUnitSymbol()}
                />

                {/* Weather Details */}
                <WeatherDetails weather={weatherData.current} />

                {/* 7-Day Forecast */}
                <motion.div
                  ref={forecastRef}
                  initial={{ opacity: 0, y: 50 }}
                  animate={forecastInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="glass-strong rounded-2xl md:rounded-3xl p-4 md:p-6 relative overflow-hidden"
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-red-600/10 to-red-700/10"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                    }}
                  />

                  {/* Section Header */}
                  <motion.div 
                    className="flex items-center gap-3 mb-4 md:mb-6 relative z-10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={forecastInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-amber-300" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">7-Day Forecast</h3>
                  </motion.div>

                  {/* Forecast Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4 relative z-10">
                    {weatherData.forecast.map((day, index) => (
                      <ForecastCard
                        key={day.datetime}
                        day={day}
                        index={index}
                        tempHigh={convertTemperature(day.tempmax)}
                        tempLow={convertTemperature(day.tempmin)}
                        unitSymbol={getUnitSymbol()}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sponsors Section */}
          <div className="section-spacing">
            <Sponsors />
          </div>

          {/* Contact Form Section */}
          <div className="section-spacing">
            <ContactForm />
          </div>

          {/* Footer */}
          <Footer />
        </div>

        {/* Floating Action Button (Scroll to Top) */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: scrollYProgress.get() > 0.2 ? 1 : 0,
            scale: scrollYProgress.get() > 0.2 ? 1 : 0,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 p-3 md:p-4 bg-gradient-to-r from-red-500 to-amber-500 rounded-full shadow-lg z-50"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}

export default App;
