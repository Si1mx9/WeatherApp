import { useState, useEffect, useRef, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Navigation, Clock, X } from 'lucide-react';

const RECENT_KEY = 'weather-recent-searches';
const MAX_RECENT = 5;

function getRecentSearches(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch {
    return [];
  }
}

function addRecentSearch(location: string) {
  const recent = getRecentSearches().filter(s => s.toLowerCase() !== location.toLowerCase());
  recent.unshift(location);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, MAX_RECENT)));
}

function removeRecentSearch(location: string) {
  const recent = getRecentSearches().filter(s => s.toLowerCase() !== location.toLowerCase());
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

interface SearchBarProps {
  onSearch: (location: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showRecent, setShowRecent] = useState(false);
  const [geoError, setGeoError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const recentSearches = getRecentSearches();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setShowRecent(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    addRecentSearch(trimmed);
    onSearch(trimmed);
    setShowRecent(false);
  };

  const handleSelect = (location: string) => {
    setInput(location);
    addRecentSearch(location);
    onSearch(location);
    setShowRecent(false);
  };

  const handleRemoveRecent = (e: React.MouseEvent, location: string) => {
    e.stopPropagation();
    removeRecentSearch(location);
  };

  const handleGeolocate = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation not supported');
      return;
    }
    setGeoError('');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        onSearch(`${latitude},${longitude}`);
      },
      () => setGeoError('Location access denied'),
      { timeout: 10000 },
    );
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto mb-8 relative"
      ref={dropdownRef as any}
    >
      <motion.div
        className={`glass-strong rounded-2xl p-2 flex items-center gap-2 transition-all duration-300 ${
          isFocused ? 'ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/20' : ''
        }`}
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
      >
        <div className="pl-2">
          <MapPin className="w-6 h-6 text-yellow-500 dark:text-yellow-300" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => { setIsFocused(true); setShowRecent(true); }}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter city name or location..."
          disabled={isLoading}
          className="flex-1 bg-transparent px-4 py-3 text-theme-text placeholder:text-theme-secondary outline-none text-lg disabled:opacity-50"
          autoComplete="off"
        />

        <button
          type="button"
          onClick={handleGeolocate}
          disabled={isLoading}
          title="Use current location"
          className="p-3 text-yellow-500 dark:text-yellow-300 hover:text-yellow-400 dark:hover:text-yellow-200 transition-colors disabled:opacity-50"
        >
          <Navigation className="w-5 h-5" />
        </button>

        <motion.button
          type="submit"
          disabled={isLoading || !input.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-xl transition-all relative overflow-hidden group"
        >
          <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity" />
          <motion.div
            animate={isLoading ? { rotate: 360 } : {}}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: 'linear' }}
          >
            <Search className="w-6 h-6 text-white relative z-10" />
          </motion.div>
        </motion.button>
      </motion.div>

      {geoError && (
        <p className="text-red-500 dark:text-red-300 text-sm mt-2 text-center">{geoError}</p>
      )}

      <AnimatePresence>
        {showRecent && recentSearches.length > 0 && !input.trim() && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-20 w-full mt-2 glass-strong rounded-xl overflow-hidden"
          >
            <div className="p-2">
              <p className="text-xs text-theme-secondary uppercase tracking-wider px-3 py-1">Recent</p>
              {recentSearches.map((loc) => (
                <div
                  key={loc}
                  onClick={() => handleSelect(loc)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-black/5 dark:hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-theme-secondary" />
                    <span className="text-theme-text text-sm">{loc}</span>
                  </div>
                  <button
                    onClick={(e) => handleRemoveRecent(e, loc)}
                    className="opacity-0 group-hover:opacity-100 text-theme-secondary hover:text-theme-text transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
