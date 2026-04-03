export interface Project {
  id: string;
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  components: string[];
  description: string;
}

export const projects: Project[] = [
  {
    id: "p1",
    title: "LED Blink with Arduino",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1553406830-ef2513450d76?w=400",
    components: ["1", "11"],
    description: "Learn to blink an LED using Arduino. Perfect first project for beginners.",
  },
  {
    id: "p2",
    title: "Smart Home Temperature Monitor",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400",
    components: ["1", "10"],
    description: "Build a temperature monitoring system with real-time display.",
  },
  {
    id: "p3",
    title: "Bluetooth Speaker Build",
    difficulty: "Intermediate",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    components: ["8"],
    description: "Assemble your own portable Bluetooth speaker from components.",
  },
  {
    id: "p4",
    title: "Fitness Tracker Prototype",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    components: ["2"],
    description: "Create a basic fitness tracker with heart rate and step counting.",
  },
  {
    id: "p5",
    title: "Automated Plant Watering",
    difficulty: "Beginner",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    components: ["1", "10"],
    description: "Build an automated plant watering system using sensors.",
  },
  {
    id: "p6",
    title: "Home Security Camera",
    difficulty: "Advanced",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400",
    components: ["12"],
    description: "Set up a DIY home security camera with motion detection.",
  },
];

export const productLearningData: Record<string, {
  videoUrl: string;
  videoTitle: string;
  codeSnippet: string;
  codeLanguage: string;
  circuitImage: string;
  relatedProjects: string[];
}> = {
  "1": {
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "How to Set Up Noise-Cancelling Headphones",
    codeSnippet: `// Connect via Bluetooth API
const device = await navigator.bluetooth.requestDevice({
  filters: [{ services: ['audio'] }]
});
const server = await device.gatt.connect();
console.log('Connected to', device.name);`,
    codeLanguage: "javascript",
    circuitImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
    relatedProjects: ["p3"],
  },
  "2": {
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Getting Started with Your Smart Watch",
    codeSnippet: `// Read heart rate sensor data
import { HeartRateSensor } from 'sensors';

const sensor = new HeartRateSensor();
sensor.addEventListener('reading', () => {
  console.log('BPM:', sensor.heartRate);
});
sensor.start();`,
    codeLanguage: "javascript",
    circuitImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
    relatedProjects: ["p4"],
  },
  "8": {
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Build Your Own Bluetooth Speaker",
    codeSnippet: `// Audio equalizer settings
const audioCtx = new AudioContext();
const eq = audioCtx.createBiquadFilter();
eq.type = 'peaking';
eq.frequency.value = 1000;
eq.gain.value = 6;
eq.Q.value = 1;`,
    codeLanguage: "javascript",
    circuitImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
    relatedProjects: ["p3"],
  },
  "10": {
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoTitle: "Setting Up Your Robot Vacuum",
    codeSnippet: `# Robot vacuum API control
import requests

API_URL = "http://vacuum.local/api"
resp = requests.post(f"{API_URL}/start", json={
    "mode": "auto",
    "suction": "max",
    "rooms": ["living_room", "kitchen"]
})
print(resp.json())`,
    codeLanguage: "python",
    circuitImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
    relatedProjects: ["p2", "p5"],
  },
};
