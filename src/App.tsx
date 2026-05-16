import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Flame, TrendingUp, ArrowUp } from 'lucide-react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SearchBar } from './components/SearchBar';
import { UnitToggle } from './components/UnitToggle';
import { ThemeToggle } from './components/ThemeToggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { CurrentWeatherDisplay } from './components/CurrentWeather';
import { WeatherDetails } from './components/WeatherDetails';
import { HourlyForecast } from './components/HourlyForecast';
import { ForecastCard } from './components/ForecastCard';
import { ContactForm } from './components/ContactForm';
import { Sponsors } from './components/Sponsors';
import { Footer } from './components/Footer';
import { useWeather } from './hooks/useWeather';
import { useTemperatureUnit } from './hooks/useTemperatureUnit';
import { useTheme } from './hooks/useTheme';

function ScrollToTop() {
  const { scrollYProgress } = useScroll();
  const show = scrollYProgress.get() > 0.2;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 p-3 md:p-4 bg-gradient-to-r from-red-500 to-amber-500 rounded-full shadow-lg z-50 cursor-pointer"
    >
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </motion.div>
    </motion.button>
  );
}

function App() {
  const { weatherData, loading, error, fetchWeather } = useWeather('London');
  const { unit, toggleUnit, convertTemperature, getUnitSymbol } = useTemperatureUnit();
  const { theme, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const [forecastRef, forecastInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleSearch = (location: string) => fetchWeather(location);
  const handleRetry = () => weatherData && fetchWeather(weatherData.location.name);

  return (
    <div className="min-h-screen w-full">
      <AnimatedBackground />

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-center section-spacing gap-4"
          >
            <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.02 }}>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Flame className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 dark:text-yellow-300" />
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme-text text-shadow">
                Weather Forecast
              </h1>
            </motion.div>
            <div className="flex items-center gap-3">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <UnitToggle unit={unit} onToggle={toggleUnit} />
            </div>
          </motion.header>

          <div className="section-spacing">
            <SearchBar onSearch={handleSearch} isLoading={loading} />
          </div>

          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 origin-left z-50"
            style={{ scaleX: scrollYProgress }}
          />

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
                <CurrentWeatherDisplay
                  weather={weatherData.current}
                  locationName={weatherData.location.name}
                  temperature={convertTemperature(weatherData.current.temp)}
                  feelsLike={convertTemperature(weatherData.current.feelslike)}
                  unitSymbol={getUnitSymbol()}
                />

                <WeatherDetails weather={weatherData.current} />

                <HourlyForecast
                  hourly={weatherData.hourly}
                  convertTemperature={convertTemperature}
                  getUnitSymbol={getUnitSymbol}
                />

                <motion.div
                  ref={forecastRef}
                  initial={{ opacity: 0, y: 50 }}
                  animate={forecastInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="glass-strong rounded-2xl md:rounded-3xl p-4 md:p-6"
                >
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-amber-500 dark:text-amber-300" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-text">7-Day Forecast</h3>
                  </div>

                  {weatherData.description && (
                    <p className="text-theme-secondary text-sm md:text-base mb-4">
                      {weatherData.description}
                    </p>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
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

          <div className="section-spacing">
            <Sponsors />
          </div>

          <div className="section-spacing">
            <ContactForm />
          </div>

          <Footer />
        </div>

        <ScrollToTop />
      </div>
    </div>
  );
}

export default App;
