# Shop-Shop

Shop Shop is an ecommerce platform selling electronics, household supplies, foods, books, and toys. This project is an enhancement of the existing "Shop-Shop" application to include State Management and Stripe payment service.

To implement state management more efficiently, this project uses [React Context API](https://reactjs.org/docs/context.html) to manage state globally. This project follows a popular state management paradigm called [Redux](https://redux.js.org/understanding/thinking-in-redux/three-principles), often used with large-scale React applications to avoid prop drilling, which requires developers to go through layers of components to get data to other parts of the React component tree. In addition, this project manages online payments using a popular service called [Stripe](https://stripe.com/). Lastly, this project stores all of the product and category data from the database in IndexedDB. This way, even without an internet connection, users can still navigate the application, view items, and even add items to their shopping cart. If the user leaves the application and comes back later, the application will have persisted the items in their shopping cart, providing a better user experience for those who return to the site to complete their purchases.

## Screenshots

Homepage

<img width="1058" alt="Screen Shot 2022-06-23 at 8 35 53 PM" src="https://user-images.githubusercontent.com/95142863/175443675-bd45daf6-86e4-401a-b2f5-13d6eddd0d4c.png">

Open Shopping Cart

<img width="609" alt="Screen Shot 2022-06-23 at 8 36 28 PM" src="https://user-images.githubusercontent.com/95142863/175443874-2735ae18-453e-4b63-915c-47b9bcc131cb.png">

## Installation

This project requires Node.js- [here is a resouce to get started](https://nodejs.org/en/). One Node.js is installed, in the terminal:

1. Clone the Repo

```bash
git clone https://github.com/dieterichelizabeth/shop-shop.git
```

2. Install the dependencies

```bash
npm install
```

3. Run the seeds

```bash
npm run seed
```

4. Start the project

```bash
npm run develop
```

## Technologies Used

<img src="https://img.shields.io/badge/react%20os-0088CC?style=for-the-badge&logo=reactos&logoColor=white" /> <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" /> <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /> <img src="https://img.shields.io/badge/Apollo%20GraphQL-311C87?&style=for-the-badge&logo=Apollo%20GraphQL&logoColor=white" /> <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white"/> <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" />

## Documentation

- [React docs for the Context API](https://reactjs.org/docs/context.html)

## Reading List

- [React Making a PWA](https://create-react-app.dev/docs/making-a-progressive-web-app/)
- [Local Forage Tool](https://github.com/localForage/localForage)
- [Stripe Checkout QuickStart](https://stripe.com/docs/checkout/quickstart)
- [Stripe Prebuilt Checkout Page](https://stripe.com/docs/checkout/quickstart)
