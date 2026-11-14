/**
 * All the educational content of the app lives here.
 * To add or edit a mission, change only this file.
 */

export interface AnswerOption {
  text: string;
  /** Short, kid-friendly explanation shown in the feedback. */
  explanation: string;
}

export interface Question {
  text: string;
  options: AnswerOption[];
  /** Index of the correct option. */
  correct: number;
}

export interface LessonCard {
  emoji: string;
  title: string;
  text: string;
}

export interface Mission {
  id: number;
  civilization: string;
  title: string;
  /** Short line shown on the map card. */
  tagline: string;
  era: string;
  /** Learning goal shown at the start of the mission. */
  intro: string;
  image: string;
  thumb: string;
  infographic?: string;
  /** Accent color for this civilization. */
  color: string;
  lessons: LessonCard[];
  questions: Question[];
}

export const MISSIONS: Mission[] = [
  {
    id: 1,
    civilization: 'Ancient Egypt',
    title: 'The Secret of the Nile',
    tagline: 'Pharaohs, the Nile and pyramids',
    era: 'c. 3100 BCE',
    intro:
      'Explore how Egyptian society was organized, what the pharaoh did, and why the Nile River was the secret to life in the desert.',
    image: 'images/egypt.webp',
    thumb: 'images/egypt-sm.webp',
    infographic: 'images/egypt-infographic.webp',
    color: '#d9962b',
    lessons: [
      {
        emoji: '🏜️',
        title: 'A river in the desert',
        text: 'Egypt is almost all desert. But the Nile River crosses it from south to north, bringing water to people, animals and plants.',
      },
      {
        emoji: '🌾',
        title: 'The gift of the Nile',
        text: 'Every summer the Nile flooded. When the water went down, it left black, rich mud called silt. Farmers used it to grow wheat and barley.',
      },
      {
        emoji: '👑',
        title: 'The pharaoh',
        text: 'The pharaoh was the king of Egypt. People believed he was a god on Earth. He made the laws, collected taxes and built temples.',
      },
      {
        emoji: '🔺',
        title: 'A pyramid of people',
        text: 'Egyptian society looked like a pyramid: the pharaoh at the top, then priests and nobles, scribes, craftspeople, and farmers at the bottom. Most people were farmers!',
      },
      {
        emoji: '📜',
        title: 'Writing with pictures',
        text: 'Scribes wrote with hieroglyphs: little drawings that stood for sounds or words. The giant pyramids were tombs for the pharaohs.',
      },
    ],
    questions: [
      {
        text: 'Why was the Nile River so important for Egyptian farmers?',
        correct: 0,
        options: [
          {
            text: 'Its floods left rich black soil for growing food',
            explanation:
              'When the floods went away, they left silt: black mud full of nutrients. Crops grew big and strong in it.',
          },
          {
            text: 'It brought snow to water the fields',
            explanation:
              'Egypt is very hot and it doesn’t snow there. The water came from rain that fell far away, in the mountains of East Africa.',
          },
          {
            text: 'Its salty water helped plants grow',
            explanation: 'The Nile has fresh water, not salt water. Salt actually hurts plants!',
          },
        ],
      },
      {
        text: 'Who was the most powerful person in Ancient Egypt?',
        correct: 1,
        options: [
          {
            text: 'A scribe',
            explanation:
              'Scribes were important because they could read and write, but they worked for the pharaoh.',
          },
          {
            text: 'The pharaoh',
            explanation:
              'The pharaoh was the king, and people believed he was a god on Earth. He was at the very top of the social pyramid.',
          },
          {
            text: 'A farmer',
            explanation:
              'Farmers grew the food, so they were very important. But they were at the bottom of the social pyramid.',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    civilization: 'Ancient Greece',
    title: 'The Wisdom of Athens',
    tagline: 'Democracy, thinkers and the Olympics',
    era: 'c. 800 BCE',
    intro:
      'Discover where Ancient Greece was, how the people of Athens made decisions together, and the big ideas that still shape our world.',
    image: 'images/greece.webp',
    thumb: 'images/greece-sm.webp',
    color: '#2f6fb5',
    lessons: [
      {
        emoji: '⛰️',
        title: 'Mountains and sea',
        text: 'Ancient Greece grew on the Balkan Peninsula, a land full of mountains and surrounded by sea. Greeks became great sailors and traders.',
      },
      {
        emoji: '🏛️',
        title: 'City-states',
        text: 'Mountains kept towns apart, so each city ruled itself. These were called city-states. The most famous were Athens and Sparta.',
      },
      {
        emoji: '🗳️',
        title: 'Power to the people',
        text: 'Athens created democracy: citizens met and voted to make decisions. “Demos” means people and “kratos” means power. Back then, only free men could vote.',
      },
      {
        emoji: '🦉',
        title: 'Big thinkers',
        text: 'Philosophers like Socrates, Plato and Aristotle loved asking big questions: What is fair? What is true? The owl was the symbol of Athena, goddess of wisdom.',
      },
      {
        emoji: '🏅',
        title: 'The first Olympics',
        text: 'The Olympic Games started in Olympia in 776 BCE to honor the god Zeus. Winners got a crown made of olive leaves!',
      },
    ],
    questions: [
      {
        text: 'On which peninsula did Ancient Greek civilization develop?',
        correct: 1,
        options: [
          {
            text: 'The Iberian Peninsula',
            explanation: 'The Iberian Peninsula is where Spain and Portugal are today, far to the west of Greece.',
          },
          {
            text: 'The Balkan Peninsula',
            explanation:
              'Greece is in the south of the Balkan Peninsula, surrounded by the sea. That’s why Greeks became great sailors.',
          },
          {
            text: 'The Arabian Peninsula',
            explanation: 'The Arabian Peninsula is a big desert in the Middle East, far to the southeast of Greece.',
          },
        ],
      },
      {
        text: 'What important idea was born in Athens?',
        correct: 2,
        options: [
          {
            text: 'Pyramids for kings',
            explanation: 'The famous pyramids were built in Egypt, as tombs for the pharaohs.',
          },
          {
            text: 'Gladiator fights',
            explanation: 'Gladiator fights were popular in Ancient Rome, inside the Colosseum.',
          },
          {
            text: 'Democracy',
            explanation:
              'In Athens, citizens voted to make decisions together. “Democracy” means “power of the people”.',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    civilization: 'Ancient Rome',
    title: 'The Laws of Rome',
    tagline: 'Laws, roads and the Colosseum',
    era: 'c. 753 BCE',
    intro:
      'Find out how Rome grew from a small town into a giant empire, and how its laws, roads and buildings still help us today.',
    image: 'images/rome.webp',
    thumb: 'images/rome-sm.webp',
    color: '#b3261e',
    lessons: [
      {
        emoji: '🐺',
        title: 'A legendary start',
        text: 'Legend says Rome was founded in 753 BCE by twin brothers, Romulus and Remus, who were raised by a she-wolf.',
      },
      {
        emoji: '⚖️',
        title: 'Rules for everyone',
        text: 'Romans wrote their first laws on twelve tablets, called the Twelve Tables. They were placed in the Forum so everyone could read them.',
      },
      {
        emoji: '🦅',
        title: 'SPQR',
        text: 'Rome was a republic: citizens chose their leaders and senators. SPQR means “The Senate and People of Rome”. Later, emperors ruled.',
      },
      {
        emoji: '💧',
        title: 'Super builders',
        text: 'Romans built roads all across their empire, and aqueducts: long stone channels that carried fresh water into the cities.',
      },
      {
        emoji: '🏟️',
        title: 'The Colosseum',
        text: 'This huge arena held about 50,000 people, who came to watch gladiators and big shows.',
      },
    ],
    questions: [
      {
        text: 'What were the Twelve Tables?',
        correct: 0,
        options: [
          {
            text: 'Rome’s first written laws',
            explanation:
              'The Twelve Tables were Rome’s first written laws. They were shown in public so everyone could know the rules.',
          },
          {
            text: 'Tables for the emperor’s big feasts',
            explanation:
              'They weren’t furniture! Here “tables” means tablets: flat boards where the laws were written.',
          },
          {
            text: 'Twelve seats in the Colosseum',
            explanation: 'The Colosseum had seats for about 50,000 people, not just twelve!',
          },
        ],
      },
      {
        text: 'What was the job of an aqueduct?',
        correct: 2,
        options: [
          {
            text: 'To protect the city from enemies',
            explanation: 'Walls protected cities. Aqueducts were built for something people need every day.',
          },
          {
            text: 'To be a track for chariot races',
            explanation: 'Chariot races happened in a huge stadium called the Circus Maximus.',
          },
          {
            text: 'To carry fresh water into the cities',
            explanation:
              'Aqueducts had a gentle slope, so water could flow all the way from the mountains to the cities.',
          },
        ],
      },
    ],
  },
];

export function getMission(id: number): Mission | undefined {
  return MISSIONS.find((m) => m.id === id);
}

/** 2 correct = 4 stars, 1 correct = 2 stars, 0 correct = 0 stars. */
export const MAX_STARS = 4;

export function starsFor(correct: number, total: number): number {
  return Math.round((correct / total) * MAX_STARS);
}
