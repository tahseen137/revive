"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import ProgressBar from "./components/ProgressBar";
import Welcome from "./components/Welcome";
import ConnectStripe from "./components/ConnectStripe";
import ConfigureRecovery from "./components/ConfigureRecovery";
import TestConnection from "./components/TestConnection";
import Complete from "./components/Complete";

const STEP_LABELS = ["Welcome", "Connect", "Configure", "Test", "Complete"];

interface RecoveryConfig {
  strategy: "aggressive" | "moderate" | "conservative";
  emailsEnabled: boolean;
  senderName: string;
}

function OnboardingFlow() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [recoveryConfig, setRecoveryConfig] = useState<RecoveryConfig | undefined>();

  useEffect(() => {
    // Check if coming back from Stripe Connect
    const connected = searchParams.get("connected");
    const fromStripe = localStorage.getItem("onboarding_flow");
    
    if (connected === "true" && fromStripe === "true") {
      // Coming back from Stripe Connect, go to step 3
      localStorage.removeItem("onboarding_flow");
      setCurrentStep(3);
      
      // Clean up the URL
      router.replace("/onboarding");
    } else {
      // Check if there's a saved step
      const savedStep = localStorage.getItem("onboarding_step");
      if (savedStep) {
        setCurrentStep(parseInt(savedStep, 10));
      }
    }

    // Load saved config if exists
    const savedConfig = localStorage.getItem("revive_recovery_config");
    if (savedConfig) {
      try {
        setRecoveryConfig(JSON.parse(savedConfig));
      } catch (e) {
        console.error("Failed to parse saved config:", e);
      }
    }
  }, [searchParams, router]);

  useEffect(() => {
    // Save current step
    localStorage.setItem("onboarding_step", currentStep.toString());
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleConfigSave = (config: RecoveryConfig) => {
    setRecoveryConfig(config);
    handleNext();
  };

  const handleComplete = () => {
    // Mark onboarding as complete
    localStorage.setItem("onboarding_complete", "true");
    localStorage.removeItem("onboarding_step");
    localStorage.removeItem("onboarding_flow");
  };

  useEffect(() => {
    // Auto-advance to complete when all tests pass
    if (currentStep === 4) {
      const timer = setTimeout(() => {
        setCurrentStep(5);
        handleComplete();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight">Revive</span>
          </Link>

          {currentStep < 5 && (
            <div className="text-sm text-zinc-500">
              Step {currentStep} of {STEP_LABELS.length}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Progress Bar (hide on complete) */}
          {currentStep < 5 && (
            <ProgressBar
              currentStep={currentStep}
              totalSteps={STEP_LABELS.length}
              stepLabels={STEP_LABELS}
            />
          )}

          {/* Step Content */}
          <div className="mt-12">
            {currentStep === 1 && <Welcome onNext={handleNext} />}
            
            {currentStep === 2 && (
              <ConnectStripe onNext={handleNext} onBack={handleBack} />
            )}
            
            {currentStep === 3 && (
              <ConfigureRecovery
                onNext={handleConfigSave}
                onBack={handleBack}
                initialConfig={recoveryConfig}
              />
            )}
            
            {currentStep === 4 && (
              <TestConnection onNext={handleNext} onBack={handleBack} />
            )}
            
            {currentStep === 5 && <Complete recoveryConfig={recoveryConfig} />}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="max-w-5xl mx-auto text-center text-sm text-zinc-600">
          <p>
            Need help?{" "}
            <a
              href="mailto:support@revive-hq.com"
              className="text-brand-400 hover:text-brand-300 transition-colors"
            >
              Contact support
            </a>{" "}
            or{" "}
            <a
              href="/pricing"
              className="text-brand-400 hover:text-brand-300 transition-colors"
            >
              view pricing
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
          <div className="flex items-center gap-3">
            <svg className="animate-spin h-6 w-6 text-brand-500" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span className="text-zinc-400">Loading onboarding...</span>
          </div>
        </div>
      }
    >
      <OnboardingFlow />
    </Suspense>
  );
}
