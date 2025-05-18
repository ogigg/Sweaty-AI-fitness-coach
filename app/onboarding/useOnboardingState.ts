import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'onboardingState';

export type OnboardingState = {
  currentStep: number;
  selectedGoal?: string;
  frequency?: number;
  age?: string;
  weight?: string;
  height?: string;
  onboardingComplete?: boolean;
};

const defaultState: OnboardingState = {
  currentStep: 1,
  onboardingComplete: false,
};

export function useOnboardingState() {
  const [onboardingState, setOnboardingStateInternal] = useState<OnboardingState>(defaultState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((data) => {
      if (data) {
        setOnboardingStateInternal(JSON.parse(data));
      }
      setLoading(false);
    });
  }, []);

  const setOnboardingState = useCallback((update: Partial<OnboardingState>) => {
    setOnboardingStateInternal((prev) => {
      const next = { ...prev, ...update };
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const resetOnboardingState = useCallback(() => {
    setOnboardingStateInternal(defaultState);
    AsyncStorage.removeItem(STORAGE_KEY);
  }, []);

  return { onboardingState, setOnboardingState, resetOnboardingState, loading };
}
