export const data = {
  // Hotels
  hotels: [
    { image: 'http://localhost:9900/lisaHotel.jpg', name: 'Lisa Hotel' },
    { image: 'http://localhost:9900/starHotel.jpg', name: 'Star Hotel' },
    { image: 'http://localhost:9900/successHotel.jpg', name: 'Success Hotel' },
  ],
  // Header data for client component
  HeaderData: {
    image: 'http://localhost:9900/lisaHotel.jpg',
    name: 'Header banner',
    title: 'Your Dream Location ',
  },

  // About data for the client page
  AboutData: {
    title: 'How to Book',
    stepsTitle: 'Hotel Booking Procedures',
    step1: 'Step One',
    paragraph1:
      'Create a user account by clicking on the Sign Up button at the top right of the page',

    step2: 'Step Two',
    paragraph2:
      'After you create an account, you need to Login. Then, go to home page, key in where you want to go and specify the dates and the option (adult, children & room).',

    step3: 'Step Three',
    paragraph3:
      'Now, you need to proceed to the hotels page. You have the options to specify the minimum and maximum prices. Then see the availability of your choice.',

    step4: 'Step Four',
    paragraph4: 'Reserve your room!.',

    step5: 'Step Five',
    paragraph5: 'In this step, select your convenient payment method.',

    step6: 'Step Six',
    paragraph6:
      'Eventually, a confirmation message with the relevant information will be sent to your e-mail address.',
    recreation: 'http://localhost:9900/recreation.jpg',
    name: 'Lisa Hotel',
  },

  roomsData: [
    {
      _id: "0",
      image: 'http://localhost:9900/room1.jpg',
      title: 'Room One',
    },

    {
      _id: "1",
      image: 'http://localhost:9900/room2.jpg',
      title: 'Room Two',
    },

    {
      _id: "2",
      image: 'http://localhost:9900/room3.jpg',
      title: 'Room Two',
    },

    {
      _id: "3",
      image: 'http://localhost:9900/room4.jpg',
      title: 'Room Two',
    },

    {
      _id: "4",
      image: 'http://localhost:9900/room5.jpg',
      title: 'Room Two',
    },

    {
      _id: "5",
      image: 'http://localhost:9900/room6.jpg',
      title: 'Room One',
    },

    {
      _id: "6",
      image: 'http://localhost:9900/room7.jpg',
      title: 'Room Two',
    },

    {
      _id: "7",
      image: 'http://localhost:9900/room8.jpg',
      title: 'Room Two',
    },

    {
      _id: "8",
      image: 'http://localhost:9900/room9.jpg',
      title: 'Room Two',
    },

    {
      _id: "9",
      image: 'http://localhost:9900/room10.jpg',
      title: 'Room Two',
    },

    {
      _id: "10",
      image: 'http://localhost:9900/room11.jpg',
      title: 'Room Two',
    },

    {
      _id: "11",
      image: 'http://localhost:9900/room12.jpg',
      title: 'Room Two',
    },

    {
      _id: "12",
      image: 'http://localhost:9900/room13.jpg',
      title: 'Room Two',
    },

    {
      _id: "13",
      image: 'http://localhost:9900/room14.jpg',
      title: 'Room Two',
    },

    {
      _id: "14",
      image: 'http://localhost:9900/room15.jpg',
      title: 'Room Two',
    },
  ],

  // Footer Data for the client page
  FooterData: {
    // Sitemap
    sitemap: 'Sitemap',
    home: 'Home',
    about: 'About',
    rooms: 'Rooms',
    contact: 'Contact',
    // Company
    company: 'Company',
    story: 'Our Story',
    employees: 'Employees',
    award: 'Award',
    client: 'Clients',
    // Social media
    social: 'Social',
    linkedIn: 'LinkedIn',
    facebook: 'Facebook',
    youtube: 'YouTube',
    twitter: 'Twitter',
    // Contacts
    contact: 'Contact',
    email: 'mailto:',
    phone: 'Call',
    location: 'Location',
    comment: 'Comments',
    copyright: '2022 LisaConsult. All rights reserved!',
    logo: 'http://localhost:9900/logo.png',
  },

  // Form inputs data for the admin page
  FormInputs: {
    userInputs: [
      {
        type: 'text',
        id: 'firstName',
        name: 'firstName',
        label: 'Firt Name',
        placeholder: 'First Name',
      },
      {
        type: 'text',
        id: 'lastName',
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Last Name',
      },
      {
        type: 'mail',
        name: 'email',
        id: 'email',
        label: 'Email',
        placeholder: 'Email Address',
      },
      {
        type: 'password',
        name: 'password',
        id: 'password',
        label: 'Password',
        placeholder: 'Password',
      },
      {
        type: 'text',
        name: 'phone',
        id: 'phone',
        label: 'Phone',
        placeholder: 'Phone (+491 760 100 5679)',
      },

      {
        type: 'text',
        name: 'city',
        id: 'city',
        label: 'City',
        placeholder: 'Street, Zip-code, City',
      },
      {
        type: 'text',
        name: 'country',
        id: 'country',
        label: 'Country',
        placeholder: 'Country',
      },
    ],

    hotelInputs: [
      {
        type: 'text',
        name: 'name',
        id: 'name',
        label: 'Hotel Name',
        placeholder: 'Hotel Name',
      },

      {
        type: 'text',
        name: 'type',
        id: 'type',
        label: 'Hotel Type ',
        placeholder: 'Hotel Type',
      },
      {
        type: 'text',
        name: 'city',
        id: 'city',
        label: 'City',
        placeholder: 'City (Hotel Location)',
      },

      {
        type: 'text',
        name: 'address',
        id: 'address',
        label: 'Hotel Address',
        placeholder: 'Hotel Address',
      },

      {
        type: 'text',
        name: 'distance',
        id: 'distance',
        label: 'Hotel Distance',
        placeholder: 'Hotel Distance from the City Center',
      },

      {
        type: 'text',
        name: 'title',
        id: 'title',
        label: 'Hotel Title',
        placeholder: 'Hotel Title',
      },

      {
        type: 'text',
        name: 'description',
        id: 'description',
        label: 'Hotel Description',
        placeholder: 'Hotel Description',
      },

      {
        type: 'number',
        name: 'rating',
        id: 'rating',
        label: 'Hotel Rating',
        placeholder: 'Hotel Rating',
      },

      {
        type: 'number',
        name: 'cheapestPrice',
        id: 'cheapestPrice',
        label: 'Cheapest Price',
        placeholder: 'Cheapest Price',
      },
    ],

    roomInputs: [
      {
        type: 'text',
        name: 'title',
        id: 'title',
        label: 'Room Title',
        placeholder: 'Room Title',
      },
      {
        type: 'number',
        name: 'maxPeople',
        id: 'maxPeople',
        label: 'Maximum People',
        placeholder: 'Maximum People',
      },

      {
        type: 'number',
        name: 'price',
        id: 'price',
        label: 'Price',
        placeholder: 'Price',
      },
      {
        type: 'text',
        name: 'description',
        id: 'description',
        label: 'Room Description',
        placeholder: 'Room Description',
      },
    ],
  },
};
