export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      {/* Progress bar placeholder — actual value controlled by the page via CSS custom property */}
      <div className="w-full max-w-2xl px-6 pt-6">
        <div id="onboarding-progress-container" />
      </div>
      <div className="w-full max-w-2xl flex-1 px-6 py-8">{children}</div>
    </div>
  );
}
