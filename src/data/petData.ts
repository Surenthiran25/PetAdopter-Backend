export interface Pet {
  id: string;
  name: string;
  type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';
  breed: string;
  age: number;
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  description: string;
  personality: string[];
  healthStatus: string[];
  adoptionFee: number;
  location: string;
  images: string[];
  isFeatured: boolean;
  dateAdded: string;
}

export const pets: Pet[] = [
  {
    id: '1',
    name: 'Max',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 3,
    gender: 'male',
    size: 'large',
    description: 'Max is a friendly and energetic Golden Retriever who loves playing fetch and going for long walks. He\'s great with children and other dogs, making him the perfect family pet.',
    personality: ['Friendly', 'Energetic', 'Loyal'],
    healthStatus: ['Vaccinated', 'Neutered', 'Microchipped'],
    adoptionFee: 250,
    location: 'San Francisco, CA',
    images: [
      'https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg',
      'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg'
    ],
    isFeatured: true,
    dateAdded: '2023-04-15'
  },
  {
    id: '2',
    name: 'Luna',
    type: 'cat',
    breed: 'Siamese',
    age: 2,
    gender: 'female',
    size: 'small',
    description: 'Luna is a beautiful Siamese cat with stunning blue eyes. She\'s calm and affectionate, enjoying lazy afternoons in sunny spots. Luna gets along well with older children and would prefer to be the only pet in the household.',
    personality: ['Calm', 'Affectionate', 'Independent'],
    healthStatus: ['Vaccinated', 'Spayed', 'Microchipped'],
    adoptionFee: 180,
    location: 'Portland, OR',
    images: [
      'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
      'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg'
    ],
    isFeatured: true,
    dateAdded: '2023-05-02'
  },
  {
    id: '3',
    name: 'Buddy',
    type: 'dog',
    breed: 'Beagle',
    age: 5,
    gender: 'male',
    size: 'medium',
    description: 'Buddy is a sweet Beagle with a gentle disposition. He loves sniffing around and going on adventures. He\'s good with children of all ages and gets along with other pets.',
    personality: ['Gentle', 'Curious', 'Friendly'],
    healthStatus: ['Vaccinated', 'Neutered'],
    adoptionFee: 200,
    location: 'Austin, TX',
    images: [
      'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg',
      'https://images.pexels.com/photos/2082415/pexels-photo-2082415.jpeg'
    ],
    isFeatured: false,
    dateAdded: '2023-04-28'
  },
  {
    id: '4',
    name: 'Mittens',
    type: 'cat',
    breed: 'Maine Coon',
    age: 3,
    gender: 'female',
    size: 'medium',
    description: 'Mittens is a gorgeous Maine Coon mix with beautiful long fur. She\'s playful and loves interactive toys. She would do well in a quieter home with older children or adults.',
    personality: ['Playful', 'Curious', 'Quiet'],
    healthStatus: ['Vaccinated', 'Spayed', 'Microchipped'],
    adoptionFee: 200,
    location: 'Denver, CO',
    images: [
      'https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg',
      'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg'
    ],
    isFeatured: false,
    dateAdded: '2023-05-10'
  },
  {
    id: '5',
    name: 'Charlie',
    type: 'bird',
    breed: 'Cockatiel',
    age: 1,
    gender: 'male',
    size: 'small',
    description: 'Charlie is a friendly cockatiel who loves to whistle tunes. He\'s social and enjoys interacting with his human companions. Charlie would make a delightful pet for someone who has time to spend with him.',
    personality: ['Social', 'Musical', 'Intelligent'],
    healthStatus: ['Healthy', 'Vet-checked'],
    adoptionFee: 120,
    location: 'Seattle, WA',
    images: [
      'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg',
      'https://images.pexels.com/photos/86596/owl-bird-eyes-eagle-owl-86596.jpeg'
    ],
    isFeatured: false,
    dateAdded: '2023-05-15'
  },
  {
    id: '6',
    name: 'Daisy',
    type: 'rabbit',
    breed: 'Holland Lop',
    age: 2,
    gender: 'female',
    size: 'small',
    description: 'Daisy is an adorable Holland Lop rabbit with floppy ears. She\'s quiet and enjoys munching on fresh vegetables. Daisy would be perfect for a family looking for a low-maintenance pet.',
    personality: ['Gentle', 'Quiet', 'Sweet'],
    healthStatus: ['Healthy', 'Spayed'],
    adoptionFee: 85,
    location: 'Chicago, IL',
    images: [
      'https://images.pexels.com/photos/4588062/pexels-photo-4588062.jpeg',
      'https://images.pexels.com/photos/372166/pexels-photo-372166.jpeg'
    ],
    isFeatured: true,
    dateAdded: '2023-05-08'
  },
  {
    id: '7',
    name: 'Rocky',
    type: 'dog',
    breed: 'Pitbull Mix',
    age: 4,
    gender: 'male',
    size: 'large',
    description: 'Rocky is a strong and loyal pitbull mix who loves to play and exercise. He\'s been trained well and knows several commands. Rocky needs an experienced dog owner who can provide him with structure and plenty of exercise.',
    personality: ['Loyal', 'Energetic', 'Smart'],
    healthStatus: ['Vaccinated', 'Neutered', 'Microchipped'],
    adoptionFee: 175,
    location: 'Miami, FL',
    images: [
      'https://images.pexels.com/photos/2523934/pexels-photo-2523934.jpeg',
      'https://images.pexels.com/photos/1429892/pexels-photo-1429892.jpeg'
    ],
    isFeatured: false,
    dateAdded: '2023-04-20'
  },
  {
    id: '8',
    name: 'Whiskers',
    type: 'cat',
    breed: 'Domestic Shorthair',
    age: 1,
    gender: 'male',
    size: 'small',
    description: 'Whiskers is a playful and curious kitten who loves to explore. He gets along well with other cats and would make a great addition to any home. Whiskers is litter-trained and ready for his forever home.',
    personality: ['Playful', 'Curious', 'Friendly'],
    healthStatus: ['Vaccinated', 'Neutered'],
    adoptionFee: 150,
    location: 'Boston, MA',
    images: [
      'https://images.pexels.com/photos/1314550/pexels-photo-1314550.jpeg',
      'https://images.pexels.com/photos/2558605/pexels-photo-2558605.jpeg'
    ],
    isFeatured: true,
    dateAdded: '2023-05-12'
  }
];

export const petTypes = ['dog', 'cat', 'bird', 'rabbit', 'other'];

export const petSizes = ['small', 'medium', 'large'];

export const genders = ['male', 'female'];