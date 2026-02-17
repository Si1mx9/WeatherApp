import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin } from 'lucide-react';

interface SearchBarProps {
  onSearch: (location: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto mb-8"
    >
      <motion.div 
        className={`glass-strong rounded-2xl p-2 flex items-center gap-2 transition-all duration-300 ${
          isFocused ? 'ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/50' : ''
        }`}
        animate={isFocused ? {
          scale: 1.02,
        } : {
          scale: 1,
        }}
      >
        {/* Location icon with animation */}
        <motion.div
          animate={isFocused ? {
            rotate: [0, -10, 10, -10, 0],
          } : {}}
          transition={{ duration: 0.5 }}
          className="pl-2"
        >
          <MapPin className="w-6 h-6 text-yellow-300" />
        </motion.div>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Enter city name or location..."
          disabled={isLoading}
          className="flex-1 bg-transparent px-4 py-3 text-white placeholder-white/60 outline-none text-lg disabled:opacity-50"
          autoComplete="off"
        />
        
        <motion.button
          type="submit"
          disabled={isLoading || !input.trim()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-xl transition-all relative overflow-hidden group"
        >
          {/* Button shimmer effect */}
          <div className="absolute inset-0 shimmer-bg opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <motion.div
            animate={isLoading ? { rotate: 360 } : {}}
            transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: 'linear' }}
          >
            <Search className="w-6 h-6 text-white relative z-10" />
          </motion.div>

          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              boxShadow: [
                '0 0 20px rgba(251, 146, 60, 0.5)',
                '0 0 30px rgba(251, 146, 60, 0.8)',
                '0 0 20px rgba(251, 146, 60, 0.5)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
