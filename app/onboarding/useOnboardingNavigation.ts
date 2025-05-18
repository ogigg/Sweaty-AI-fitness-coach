import { router } from 'expo-router';
import { useEffect } from 'react';
import { onboardingRoutes } from './onboardingRoutes';
import { useOnboardingState } from './useOnboardingState';

interface UseOnboardingNavigationProps {
  currentStep: number;
  nextRoute: keyof typeof onboardingRoutes;
  prevRoute: keyof typeof onboardingRoutes;
}

export function useOnboardingNavigation({
  currentStep,
  nextRoute,
  prevRoute,
}: UseOnboardingNavigationProps) {
  const { onboardingState, loading } = useOnboardingState();

  useEffect(() => {
    if (loading) return;

    // If onboarding is complete, redirect to home
    if (onboardingState.onboardingComplete) {
      router.replace('/');
      return;
    }
  }, [loading, onboardingState, currentStep, nextRoute, prevRoute]);

  return { loading };
}
