interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function ProgressBar({ currentStep, totalSteps, stepLabels }: ProgressBarProps) {
  const progressPercentage = ((currentStep) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="relative w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-6">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-600 to-brand-500 transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {stepLabels.map((label, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;
          const isUpcoming = currentStep < stepNumber;

          return (
            <div
              key={label}
              className="flex flex-col items-center flex-1"
            >
              <div
                className={`
                  h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${isCompleted ? "bg-brand-600 text-white" : ""}
                  ${isCurrent ? "bg-brand-600 text-white ring-4 ring-brand-600/20" : ""}
                  ${isUpcoming ? "bg-zinc-800 text-zinc-500" : ""}
                `}
              >
                {isCompleted ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              <span
                className={`
                  mt-2 text-xs font-medium text-center hidden sm:block transition-colors
                  ${isCurrent ? "text-white" : "text-zinc-500"}
                `}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
