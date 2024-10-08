import { DocsUrl, BlogUrl } from '../shared/common';
import avatarPlaceholder from '../client/static/avatar-placeholder.png';
import { routes } from 'wasp/client/router';

export const navigation = [
  { name: 'Pricing', href: '#pricing' },
  { name: 'Blog', href: '/blog' },
  { name: 'Documentation', href: '/blog/docs/intro' },
  { name: 'About', href: '/about' }
];

export const features = [
  {
    name: 'Fully Customizable',
    description: 'Make your raffles exactly as you like them with our intuitive drag and drop editor.',
    img: 'https://raffleleader.s3.us-east-2.amazonaws.com/editing.mov',
    backgroundColor: '#1501FE',
  },
  {
    name: 'Prebuilt No-Code Templates',
    description: 'Get follwers and leads immediately with beautiful templates that fit every need.',
    img: 'https://raffleleader.s3.us-east-2.amazonaws.com/template.mov',
    backgroundColor: '#8400ff',
  },
  {
    name: 'Wide Range of Integrations',
    description: 'Whether its social media, emails, or referrals, Raffle Leader has you covered.',
    img: 'https://raffleleader.s3.us-east-2.amazonaws.com/publishing.mov',
    backgroundColor: '#9452ff',
  },
];

// export const testimonials = [
//   {
//     name: 'Da Boi',
//     role: 'Wasp Mascot',
//     avatarSrc: daBoiAvatar,
//     socialUrl: 'https://twitter.com/wasplang',
//     quote: "I don't even know how to code. I'm just a plushie.",
//   },
//   {
//     name: 'Mr. Foobar',
//     role: 'Founder @ Cool Startup',
//     avatarSrc: avatarPlaceholder,
//     socialUrl: '',
//     quote: 'This product makes me cooler than I already am.',
//   },
//   {
//     name: 'Jamie',
//     role: 'Happy Customer',
//     avatarSrc: avatarPlaceholder,
//     socialUrl: '#',
//     quote: 'My cats love it!',
//   },
// ];

export const stats = [
  {
    name: '62',
    description: '62.31% of people share the contest with a friend.',
    img: 'https://raffleleader.s3.us-east-2.amazonaws.com/62.png',
  },
  {
    name: '34',
    description: 'Contests have a conversion rate of 34%, higher than any other content type.',
    img: 'https://raffleleader.s3.us-east-2.amazonaws.com/34.png',
  },
  {
    name: '70',
    description: `Instagram accounts that hold contests grow 70% faster than those that don't.`,
    img: 'https://raffleleader.s3.us-east-2.amazonaws.com/70.png',
  },
  {
    name: '08',
    description: 'Contest emails have a CTR of 8%, 5.5% higher than other emails.',
    img: 'https://raffleleader.s3.us-east-2.amazonaws.com/08.png',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'Is Raffle Leader right for me?',
    answer: "It doesn't matter if you're a business owner with 0 followers or an influencer, if you want to get leads and grow quickly with viral giveaway marketing, then RaffleLeader is right for you.",
  },
  {
    id: 2,
    question: "What's required to use Raffle Leader?",
    answer: "A self-hosted WordPress site. That's it.",
  },
  {
    id: 3,
    question: "Does Raffle Leader require code?",
    answer: "No. Raffle Leader is a one-click WordPress plugin. All you need to do is install the plugin.",
  },
  {
    id: 4,
    question: "Will Raffle Leader slow down my site?",
    answer: "No. We hate slow sites just as much as you do. The last thing we'd do is torture you with one.",
  },
  {
    id: 5,
    question: "How is Raffle Leader better than other giveaway plugins?",
    answer: "No other giveaway plugin is nearly as customizable or as powerful as Raffle Leader. Basically, think of Raffle Leader like a Canva that can also make you money.",
  },
  {
    id: 6,
    question: "Does Raffle Leader work on non-WordPress sites?",
    answer: "No. Raffle Leader is a WordPress plugin, meaning that it only works on self-hosted WordPress sites.",
  },
  {
    id: 7,
    question: "How often is Raffle Leader updated?",
    answer: "Our life is dedicated to improving Raffle Leader. So, we're aiming for a fresh update every week. If there are features you'd like to see, please contact us"
  },
];
