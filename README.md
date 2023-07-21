# diatoz-assignment-repo


Backend Deployed Link - https://pantyhose-dugong.cyclic.app/

Frontend Deployed Link - https://diatoz-assignment-repo.vercel.app/
In Backend
    - TechStacks - Node, Express, MongoDB
    -  All Routes are Protected 
    - Using JWT for Token Generation.
    - Implemented Password Hashing
    - Implemented Blocklisting of Token.
    - Storing All the Data into MongoDB 

In Frontend
    -  TechStacks - React, Material UI
    -  Home and Favorites Routes are Protected 
    -  Responsive Design.
    -  Implemented Download and Bookmark Images.
    -  Implemented Infinite Scrolling on Home Page
     
In the Frontend Part, in `/favorites` route I am facing issues. the issue is because one of the usestate is updating late. Till the time it is updated the whole code execution gets completed. that's why data does not renders on UI. I have tried using different techniques including using effect hook and all.

I may be making some mistakes there.
That's why `/favorites` route in frontend is not working as expected.

Rest All is Completed.
