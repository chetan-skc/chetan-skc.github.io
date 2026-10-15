// Generated with GitHub Copilot - [Tracking ID: Hexure-Copilot]

export const ALLOYS = {
  copper: { label: 'Copper', a: '#b87333', b: '#f0a875' },
  iron: { label: 'Iron', a: '#6b7280', b: '#c3c9d2' },
  titanium: { label: 'Titanium', a: '#6f7fa3', b: '#c9d6f0' },
  brass: { label: 'Brass', a: '#a8892c', b: '#ecd178' },
  bronze: { label: 'Bronze', a: '#9a5f28', b: '#e0a35c' },
  silver: { label: 'Silver', a: '#8d939e', b: '#eef0f4' },
};

export const projects = [
  {
    id: 'social',
    name: 'Social Media Application',
    alloy: 'copper',
    specimen: 'SPC-01',
    year: '2023',
    tagline: 'Full-stack MERN social platform',
    description:
      'A full-stack social platform built with React.js and Node.js for secure, scalable user interactions and content management.',
    highlights: [
      'JWT-based authentication with Google OAuth sign-in',
      'Posts CRUD, likes, comments, pagination and tag-based search',
      'RESTful APIs over MongoDB, with Redux state and Material-UI',
      'Deployed on Heroku',
    ],
    tech: ['React', 'Redux', 'Material-UI', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Google OAuth', 'Heroku'],
    repo: 'https://github.com/chetan-skc/e-commerce_site',
    featured: true,
  },
  {
    id: 'task-manager',
    name: 'Task Manager API',
    alloy: 'iron',
    specimen: 'SPC-02',
    year: '2024',
    tagline: 'Tasks & subtasks REST API',
    description:
      'An Express.js and MongoDB backend for managing tasks and subtasks, with soft deletes that hide removed items from reads without losing data.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'Swagger', 'Winston'],
    repo: 'https://github.com/chetan-skc/Task-Manager-API',
  },
  {
    id: 'ims',
    name: 'IMS',
    alloy: 'titanium',
    specimen: 'SPC-03',
    year: '2024',
    tagline: 'Inventory management in Angular 18',
    description: 'An Angular 18 and TypeScript inventory-management front-end with Google Sign-In integration.',
    tech: ['Angular 18', 'TypeScript', 'RxJS', 'Google Sign-In'],
    repo: 'https://github.com/chetan-skc/IMS',
  },
  {
    id: 'chitchat',
    name: 'ChitChat',
    alloy: 'brass',
    specimen: 'SPC-04',
    year: '2022',
    tagline: 'Real-time chat with Socket.io',
    description:
      'A lightweight real-time chat app: an Express server broadcasting messages over Socket.io to a vanilla JavaScript client.',
    tech: ['Node.js', 'Express', 'Socket.io', 'JavaScript'],
    repo: 'https://github.com/chetan-skc/ChitChat_App',
  },
  {
    id: 'blog',
    name: 'Blog Site',
    alloy: 'bronze',
    specimen: 'SPC-05',
    year: '2023',
    tagline: 'Compose & publish posts',
    description: 'A blogging app to compose, publish and read posts on dynamic, server-rendered pages.',
    tech: ['Node.js', 'Express', 'EJS', 'Lodash'],
    repo: 'https://github.com/chetan-skc/Blog_site',
  },
  {
    id: 'tourism',
    name: 'Tourism App',
    alloy: 'silver',
    specimen: 'SPC-06',
    year: '2022',
    tagline: 'Travel website in React',
    description: 'A responsive tourism website built with React.',
    tech: ['React', 'JavaScript', 'CSS'],
    repo: 'https://github.com/chetan-skc/Tourism-app',
  },
];
