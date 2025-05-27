export interface WeatherData {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
}