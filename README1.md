# Teleport - A simplified POSTMAN clone

## A simplified POSTMAN clone with response differ and hyper runs

> In response to numerous feedbacks, I have already started working on Phase 2. I will bring the key checker switch and hyper run "live" soon.
>
> Thanks for your continuous support. Stay tuned! :muscle:


This is not only a simplified POSTMAN close built with **react**, but also an example of a more customizable, personalized alternative to POSTMAN.

## Working application

Check out the **live demo** -> https://lintrest.herokuapp.com


If you like my work, feel free to:

- [![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)][tweet] about POSTMAN clone
- :star: this repository. And I will be happy together :)

Thanks a bunch for stopping by and supporting me!

[tweet]: https://twitter.com/intent/tweet?url=https://github.com/Rajdeepc/version-REST&text=Awesome%20POSTMAN%20clone%20app%20built%20with%20React%20and%20NodeJS&hashtags=react,nodejs,indexdb

## Who is it for 🤷‍♀️

I have been working with React for about four years. I built cool stuff at [Github](https://github.com/Rajdeepc) and so I wanted to try out to build another cool alternative to POSTMAN with bunch of new features for developers and testers.

This is a showcase application I've built in my spare time to experiment the power of React that I wanted to try before: `React`, `NodeJS`, `IndexDB`.

There are not many alternative to REST client applications like POSTMAN on the web and I think that this codebase contains enough complexity to offer valuable insights to **React developers of all skill levels** while still being _relatively_ easy to understand.

---

This piece of application is a long term release of new features which can be seen in the Release notes which I am planning to push every month. The product will be live soon for production use.

[Rajdeep]: http://reactive-rajdeep.netlify.com/

## Tech stack


- React CRA
- Redux state management
- UI modules:
  - SASS
  - React Router
- Heroku
- NodeJS
  - HapiJS
  - shortid
  - xoauth
- Mongoose
- MongoDB Atlas
  - mlab
- IndexDB - In mermory database
- Google Single Sign On


## Features and Roadmap

I set the tentative deadline for motivating myself to finish the work on time. Otherwise, It will take forever to complete :)

### Phase 1 - Angular application and simple Nest API

> June 13 - 27, 2020

- [x] Compare Response Feature - Compare responses of the same API once response structure changes
- [x]Add or remove API Endpoints - Add and remove API endpoints from EndPoints tab
- [x]Search Endpoints - Search through your API Endpoints with Smart Search
- [x]Sign In Feature - Sign In to save all your api
- [x]Notification Swtich - Switch On/Off Notifications
- [x]Generate Code - Generate Code from your API constructs
- [x]More Personalized Settings - More Personalised Settings Feature
- [x]IndexDB Support - Localized data now saved in IndexDB for more storage

### Phase 2

> July 10 - 25, 2020

- [ ] Refactor the mono repo to use Nx Workspace
- [ ] GraphQL API and store data on the actual database
- [ ] Authentication
- [ ] Websocket realtime update
- [ ] Interactive report

## Time spending

It is a side project that I only spent time outside of the office hours to work on.

I have spent about 80 hours working on this project. Which is equivalent to watch the whole Stranger Things series twice.


## What's currently missing?

There are missing features from the live demo which should exist in a real product. All of them will be finished on Phase 2:

### Import JSON collection
I would like to build this feature for a robust JSON parser which can import and parse any type of JSON

### Diff checker for testers and developers
This feature will hold a switch which will enable diff checker for attribute for testers and the value for developers. This could make a good feature for testers to check for any changes in attribute of the current response


### Accessibility ♿

Not all components have properly defined [aria attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), visual focus indicators, etc.

## Setting up development environment 🛠

- `git clone https://github.com/Rajdeepc/teleport.git`
- `cd teleport`
- `npm run start` for the API
- The API server should run on `http://localhost:3000`
- `npm run start` for angular web application
- The app should run on `http://localhost:4200/`

### Unit/Integration tests 🧪

Unit Testing done with React Testing Library.

## Compatibility

It was being tested on IE 11, Chrome and Firefox. For Safari, there are some minor alignment issues.

## Author: Rajdeep Chandra ✍️

- A seasoned Full Stack Engineer. Working with React and Vue NodeJS and Web Security. Like photography, gadgets, cooking, and reading books.
- Personal blog: http://reactive-rajdeep.netlify.com/
- Say hello: rajrock38 [et] gmail [dot] com

## Contributing

If you have any ideas, just open an issue and tell me what you think.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## Credits

Inspired by [POSTMAN](https://github.com/postmanlabs)

I reused part of the HTML and CSS code from these projects.

## License

Feel free to use my code on your project. It would be great if you put a reference to this repository.

[MIT](https://opensource.org/licenses/MIT)
