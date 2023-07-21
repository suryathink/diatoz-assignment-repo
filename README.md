# diatoz-assignment-repo

**Backend Deployed Link** - [https://pantyhose-dugong.cyclic.app/](https://pantyhose-dugong.cyclic.app/)

**Frontend Deployed Link** - [https://diatoz-assignment-repo.vercel.app/](https://diatoz-assignment-repo.vercel.app/)

<br/>
<br/>

## Backend
1. TechStacks - Node, Express, MongoDB
2. All Routes are Protected 
3. Using JWT for Token Generation.
4. Implemented Password Hashing
5. Implemented Blocklisting of Token.
6. Storing All the Data into MongoDB 

## Frontend
1. TechStacks - React, Material UI
2. Home and Favorites Routes are Protected 
3. Responsive Design.
4. Implemented Download and Bookmark Images.
5. Implemented Infinite Scrolling on Home Page


## Known Issue
In the Frontend Part, in `/favorites` route, I am facing issues. The issue is that one of the `useState` hooks is updating late. By the time it is updated, the whole code execution gets completed, and that's why the data does not render on the UI. I have tried using different techniques, including using the `useEffect` hook and all.

I may be making some mistakes there.
That's why `/favorites` route in frontend is not working as expected.

Rest All is Completed.
