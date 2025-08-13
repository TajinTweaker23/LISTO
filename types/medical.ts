export interface MedicalMicroContentItem {
  id: number;
  category: string;
  title: string;
  content: string;
  funFact: string;
  relatedToHealth: string[];
  brainRotLevel: number;
  medicalAccuracy: number;
  emoji: string;
  timeToRead: number;
}

export const MEDICAL_MICRO_CONTENT: MedicalMicroContentItem[] = [
  {
    id: 1,
    category: 'Menstrual Health',
    title: 'Menstrual Cramps: More Than Just Discomfort',
    content: 'Menstrual cramps, also known as dysmenorrhea, can be a sign of underlying health issues like endometriosis or fibroids. It\'s not just pain; it\'s your body telling you something. Don\'t ignore it.',
    funFact: 'Some women have stronger uterine contractions during periods than during actual childbirth.',
    relatedToHealth: ['menstrual-pain', 'pain-management', 'reproductive-health'],
    brainRotLevel: 3,
    medicalAccuracy: 10,
    emoji: '😤',
    timeToRead: 30
  },
  {
    id: 2,
    category: 'Mental Health',
    title: 'Depression Isn\'t Just Sadness',
    content: 'Clinical depression literally changes your brain structure. The hippocampus shrinks, affecting memory. The prefrontal cortex gets sluggish, making decisions harder. It\'s not weakness; it\'s neurobiology.',
    funFact: 'Antidepressants work by helping your brain grow new neural connections (neuroplasticity).',
    relatedToHealth: ['depression', 'brain-health', 'mental-wellness'],
    brainRotLevel: 4,
    medicalAccuracy: 9,
    emoji: '🧠',
    timeToRead: 32
  },
  {
    id: 3,
    category: 'Nutrition',
    title: 'Your Gut Has More Neurons Than Your Spine',
    content: 'The enteric nervous system has 500 million neurons. That "gut feeling"? It\'s real. Your gut produces 95% of your serotonin. No wonder anxiety hits your stomach first.',
    funFact: 'Your gut bacteria can influence your mood, cravings, and even personality traits.',
    relatedToHealth: ['gut-health', 'mental-health', 'nutrition'],
    brainRotLevel: 5,
    medicalAccuracy: 10,
    emoji: '🦠',
    timeToRead: 28
  },
  {
    id: 4,
    category: 'Sleep',
    title: 'Sleep Debt Is Like Financial Debt',
    content: 'You can\'t just "catch up" on weekends. Sleep debt accumulates and compounds. Your brain literally shrinks when you\'re chronically sleep-deprived. The glymphatic system needs 7+ hours to clean out brain toxins.',
    funFact: 'After 17-19 hours without sleep, your performance equals someone legally drunk.',
    relatedToHealth: ['sleep-hygiene', 'brain-health', 'cognitive-function'],
    brainRotLevel: 4,
    medicalAccuracy: 10,
    emoji: '😴',
    timeToRead: 30
  },
  {
    id: 5,
    category: 'Pain Management',
    title: 'Chronic Pain Changes Your Brain Map',
    content: 'Neuroplasticity works both ways. Chronic pain rewires your brain, making you more sensitive to ALL pain. But the reverse is true too - the right treatments can retrain your brain to feel less pain.',
    funFact: 'Phantom limb pain proves pain is processed in the brain, not just at injury sites.',
    relatedToHealth: ['chronic-pain', 'neuroplasticity', 'pain-management'],
    brainRotLevel: 5,
    medicalAccuracy: 9,
    emoji: '⚡',
    timeToRead: 35
  },
  {
    id: 6,
    category: 'Hormones',
    title: 'Stress Hormones Are Prehistoric Software',
    content: 'Cortisol was designed for running from tigers, not dealing with your boss. Chronic activation shuts down digestion, immunity, and reproductive function. Your body thinks it\'s in constant danger.',
    funFact: 'Chronic stress can shrink your prefrontal cortex while enlarging your amygdala (fear center).',
    relatedToHealth: ['stress-management', 'hormones', 'mental-health'],
    brainRotLevel: 4,
    medicalAccuracy: 10,
    emoji: '🏃‍♀️',
    timeToRead: 29
  },
  {
    id: 7,
    category: 'Disease Prevention',
    title: 'Heart Disease Isn\'t Just Clogged Pipes',
    content: 'Sure, cholesterol matters. But chronic inflammation from stress, bad sleep, and processed foods is the real arsonist that lights the fire. Your arteries aren\'t just pipes, they\'re living tissue. Treat them well.',
    funFact: 'A 10-minute walk after meals can lower blood sugar and reduce inflammation. It\'s not about running a marathon, it\'s about consistency.',
    relatedToHealth: ['heart-health', 'inflammation', 'stress'],
    brainRotLevel: 4,
    medicalAccuracy: 9,
    emoji: '🔥',
    timeToRead: 25
  },
  {
    id: 8,
    category: 'Disease Prevention',
    title: 'Preventing Type 2 Diabetes Isn\'t Just About Sugar',
    content: 'It\'s about insulin resistance. Your cells get \'deaf\' to insulin\'s call. Lifting heavy things (even your own body) makes your muscles more sensitive to insulin, so they suck up sugar from your blood instead of letting it run wild.',
    funFact: 'Cinnamon in your coffee can improve insulin sensitivity. Small, consistent habits matter more than occasional crash diets.',
    relatedToHealth: ['diabetes-prevention', 'insulin-resistance', 'exercise'],
    brainRotLevel: 5,
    medicalAccuracy: 10,
    emoji: '💪',
    timeToRead: 28
  },
  {
    id: 9,
    category: 'Disease Prevention',
    title: 'Your Immune System Is Not a Fortress',
    content: 'It\'s a garden. You can\'t just build higher walls. You need to cultivate diverse, good bacteria (probiotics) and feed them with fiber (prebiotics). A healthy gut microbiome is your best defense, not just vitamin C.',
    funFact: '70-80% of your immune cells are located in your gut. A happy gut is a happy immune system.',
    relatedToHealth: ['immune-health', 'gut-health', 'nutrition'],
    brainRotLevel: 4,
    medicalAccuracy: 9,
    emoji: '🌿',
    timeToRead: 26
  }
];
