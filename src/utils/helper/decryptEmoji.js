const listEmoji = [
  {
    emoji: '🍔',
    text: 'burger',
  },
  {
    emoji: '🍟',
    text: 'fries',
  },
  {
    emoji: '🍕',
    text: 'pizza',
  },
  {
    emoji: '✈️',
    text: 'airplane',
  },
  {
    emoji: '🛳',
    text: 'cruise ship',
  },
  {
    emoji: '🗺',
    text: 'map',
  },
  {
    emoji: '😄',
    text: 'happy',
  },
  {
    emoji: '🥹',
    text: 'sad',
  },
 {
    emoji: '🤔',
    text: 'thinking',
  },
  {
    emoji: '🐝',
    text: 'bee',
  },
  {
    emoji: '🤖',
    text: 'think',
  },
  {
    emoji: '🎊',
    text: 'celebration',
  },
  {
    emoji: '🥷🏼',
    text: 'keep it secret',
  },
  {
    emoji: '☄️',
    text: 'blast off',
  },
  {
    emoji: '🧑‍🍳+🍴',
    text: 'chef cooks a dish',
  },
  {
    emoji: '🚵‍♀️+🎊',
    text: 'win a race',
  },
];

export default function decryptEmoji(string) {
    const text = string.split(' ');
    text.forEach((item, index) => {
        const findEmoji = listEmoji.find((list) => list.emoji === item);
        if (findEmoji !== undefined) {
            text[index] = findEmoji.text
        }
    });
    return text.join(' ');
}
