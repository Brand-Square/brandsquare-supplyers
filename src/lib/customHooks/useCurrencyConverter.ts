// useCurrencyConverter.ts
import { useState } from 'react';

// API key for ExchangeRate-API (free tier)
// You'll need to sign up at https://www.exchangerate-api.com/ to get your API key
const API_KEY = ' 9544e1e41794dfbe156947c3';

// Cache duration in milliseconds (1 hour)
const CACHE_DURATION = 60 * 60 * 1000;

interface CacheItem {
  rate: number;
  timestamp: number;
}

interface ConversionResult {
  originalAmount: number;
  convertedAmount: number;
  rate: number;
  fromCurrency: string;
  toCurrency: string;
  loading: boolean;
  error: string | null;
}

export function useCurrencyConverter() {
  const [cache, setCache] = useState<Record<string, CacheItem>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if the rate is cached and still valid
  const getCachedRate = (from: string, to: string): number | null => {
    const key = `${from}_${to}`;
    const cachedItem = cache[key];
    
    if (cachedItem && Date.now() - cachedItem.timestamp < CACHE_DURATION) {
      return cachedItem.rate;
    }
    return null;
  };

  // Save rate to cache
  const cacheRate = (from: string, to: string, rate: number) => {
    const key = `${from}_${to}`;
    setCache(prev => ({
      ...prev,
      [key]: {
        rate,
        timestamp: Date.now()
      }
    }));
  };

  // Fetch exchange rate from API
  const fetchExchangeRate = async (from: string, to: string): Promise<number> => {
    try {
      setLoading(true);
      setError(null);
      
      // Check cache first
      const cachedRate = getCachedRate(from, to);
      if (cachedRate !== null) {
        setLoading(false);
        return cachedRate;
      }
      
      // If not in cache, fetch from API
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }
      
      const data = await response.json();
      
      if (data.result === 'success') {
        // Cache the rate
        cacheRate(from, to, data.conversion_rate);
        return data.conversion_rate;
      } else {
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      return 0;
    } finally {
      setLoading(false);
    }
  };

  // Convert amount from one currency to another
  const convertCurrency = async (
    amount: number,
    from: string = 'CNY',
    to: string = 'NGN'
  ): Promise<ConversionResult> => {
    try {
      const rate = await fetchExchangeRate(from, to);
      
      if (rate === 0) {
        throw new Error('Could not get conversion rate');
      }
      
      const convertedAmount = amount * rate;
      
      return {
        originalAmount: amount,
        convertedAmount,
        rate,
        fromCurrency: from,
        toCurrency: to,
        loading: false,
        error: null
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      return {
        originalAmount: amount,
        convertedAmount: 0,
        rate: 0,
        fromCurrency: from,
        toCurrency: to,
        loading: false,
        error: errorMessage
      };
    }
  };

  return {
    convertCurrency,
    loading,
    error
  };
}