export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans">
      {/* Header */}
      <header className="p-4 flex justify-between items-center border-b border-neutral-800">
        <h1 className="text-2xl font-bold">Wakalyst</h1>
        <nav className="space-x-4">
          <a href="#docs" className="hover:underline">
            Docs
          </a>
          <a
            href="https://wakatime.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            WakaTime
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-24 text-center max-w-3xl mx-auto">
        <h2 className="text-6xl font-bold mb-6">
          Track your coding time, the minimalist way
        </h2>
        <p className="text-neutral-400 mb-8 max-w-xl mx-auto">
          Wakalyst is a simple unofficial mobile client for WakaTime, focused on
          clarity, minimal UI and instant insights.
        </p>
      </section>

      {/* Docs Section */}
      <section id="docs" className="px-6 py-20 bg-neutral-900">
        <h3 className="text-3xl font-semibold text-center mb-12">
          Getting Started
        </h3>
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h4 className="text-xl font-semibold mb-2">
              1. Get Your WakaTime API Key
            </h4>
            <p className="text-neutral-400">
              Go to{" "}
              <a
                href="https://wakatime.com/settings/api-key"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                your WakaTime settings
              </a>{" "}
              and copy your API key.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">2. Open Wakalyst</h4>
            <p className="text-neutral-400">
              Launch the app and paste your API key when prompted.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">3. Start Tracking</h4>
            <p className="text-neutral-400">
              That’s it! Wakalyst will show your coding stats in a clean,
              easy-to-read layout.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-4 border-t border-neutral-800 text-center text-neutral-500">
        Made with ❤️ for developers by Wakalyst Team.
      </footer>
    </div>
  );
}
