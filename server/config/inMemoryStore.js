// In-Memory store initialized with beautiful dummy photos and heartfelt wishes for Tanisha

let inMemoryStore = {
  photos: [
    {
      _id: "photo_1",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      caption: "That radiant smile that lights up every room! ✨",
      order: 1,
      createdAt: new Date().toISOString()
    },
    {
      _id: "photo_2",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      caption: "Golden hour memories and endless laughter 🌸",
      order: 2,
      createdAt: new Date().toISOString()
    },
    {
      _id: "photo_3",
      url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      caption: "Forever making everyday moments unforgettable 💕",
      order: 3,
      createdAt: new Date().toISOString()
    },
    {
      _id: "photo_4",
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      caption: "Unfiltered joy and pure positive vibes 🌟",
      order: 4,
      createdAt: new Date().toISOString()
    },
    {
      _id: "photo_5",
      url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      caption: "The Queen of grace, kindness, and fun! 👑",
      order: 5,
      createdAt: new Date().toISOString()
    },
    {
      _id: "photo_6",
      url: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
      caption: "Cheers to another year of slaying and thriving 🥂",
      order: 6,
      createdAt: new Date().toISOString()
    },
    {
      _id: "photo_7",
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      caption: "Dreamer, achiever, and the best friend ever 💫",
      order: 7,
      createdAt: new Date().toISOString()
    },
    {
      _id: "photo_8",
      url: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=800&q=80",
      caption: "Making every adventure 100x more fun 🎂",
      order: 8,
      createdAt: new Date().toISOString()
    }
  ],
  wishes: [
    {
      _id: "wish_1",
      text: "Happy Birthday Tanisha! May your special day bring you as much happiness, love, and sunshine as you bring into everyone's life around you.",
      author: "With endless love ❤️"
    },
    {
      _id: "wish_2",
      text: "Another year older, wiser, and even more gorgeous! Keep shining your magical light, Tanisha.",
      author: "Bestie Forever 🌟"
    },
    {
      _id: "wish_3",
      text: "Wishing you a year loaded with big dreams coming true, spontaneous road trips, and countless cake slices!",
      author: "Your Partner in Crime 🎉"
    },
    {
      _id: "wish_4",
      text: "To the girl who turns simple days into celebrations — Happy Birthday Tanisha! The world is truly blessed to have you.",
      author: "Always Cheering for You ✨"
    }
  ],
  note: {
    _id: "note_1",
    text: `Dearest Tanisha,\n\nHappy Birthday! 🎉 On this beautiful day, I just wanted to take a moment to celebrate YOU. \n\nThank you for being such an extraordinary presence — for the laughs that make our stomachs hurt, the late-night talks, your comforting warmth, and the unmatched energy you bring everywhere you go.\n\nYou have this rare superpower of making people feel valued and loved, and today is all about showering every ounce of that love back on you.\n\nMay this year ahead be your happiest chapter yet — full of wild dreams achieved, effortless joy, good health, and blessings in abundance.\n\nKeep shining bright, beautiful soul! 💖✨\n\nForever your biggest fan.`
  }
};

module.exports = inMemoryStore;
