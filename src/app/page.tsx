import WeatherApp from '@/components/WeatherApp';

export default function Home() {
  return (
    <main className="min-h-screen min-w-screen bg-gradient-to-br from-gray-800 to-gray-950 p-4 flex items-center justify-center">
      <div className="container mx-auto">
        <WeatherApp />
      </div>
    </main>
  );
}