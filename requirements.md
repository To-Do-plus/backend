# Software Requirements

## Vision

* The vision of this project is to provide people a time linked to-do list to encourage better time management with completing tasks in their everyday lives. The app will include a calendar style organization for better awareness and time tracking. Using this app will allow people to better understand the amount of time required to complete their tasks giving them an opportunity to re-evaluate their spent time.

* This app will allow the users to coordinate their daily tasks and graphically track the amount of time a given task might take. Oftentimes we underestimate how much time we have to complete a set of objectives, so a visual manifestation can aid in that endeavor. It can also track how much time the task actually took vs the time allotted to improve future planning. 

* Have you or anyone you know ever had issues with time management? Having this app can help people manage their time even better by planning their tasks around the rest of their schedule. Our product stands out by adding a graphical analog clock representation of time committed. 

## Scope (In/Out)

### In

* This app will give users a visual representation of their to-do lists and the amount of time their tasks will take. 
* Users will be able to add, delete, and edit the items that they need to accomplish
* Users will be able to integrate their to-do’s with their calendars. 
* Users will be able to view a page with their google-profile information
* Users will be able to see how long all of their tasks will take.

### Out

* Our website will never turn into an IOS or Android app.

### Minimum Viable Product

* A form with the ability to collect to-do information
* Ability for the user to edit to-do information
* Ability to update a google calendar with the to-do events
* A way to see how long all of the tasks will take

### Stretch

* Editing/Tracking average times that tasks take
* Adding group chat capability
* Adding group tasks capability
* Make events optional to be sent to the API- Like the user can have a basic list of things they want to do in their profile and choose select items to schedule for later

## Functional Requirements

1. A user can update their profile information
2. A user can update and delete their tasks 
3. A user can see their time to complete the tasks 
4. A user can interface their tasks with their calendar. 

### Data Flow

* Upon arriving at the app the user will click on the login button and will be prompted for their Google sign in information. Once successfully signed in the user will then be redirected to the home page where their upcoming to-do’s, time management data, and calendar will be displayed. (The information displayed on the home page is gathered from the Google Calendar API with the auth0 authorization.) On this page the user will have the opportunity to add new tasks to their calendar in the given form.( This data will be sent to the Google API following the generalized schema and will then populate on the calendar.) The user will be able to see their outstanding to-do items, edit or delete items, and see how long their items will take
* There will be an additional profile page that the user can click on which will display their username, email, and profile page which is data that will be received from the Auth0 integration. Finally there will be a page with information about the developers in case the user is curious.

## Non-Functional Requirements (301 & 401 only)

1. Security - Auth0
2. Usability - Clear visual cues for seeing to-do information and times for tasks (with calendar and potentially with clock interface)

* Two nonfunctional requirements that we will implement are security and usability. We will be using Oauth 2.0 through Auth0 to ensure that a user’s list of to-do tasks are accessible only to the user who submitted the tasks. This is to ensure user privacy. We will also have a simple clutter-free design complete with a counter to show the user how long all of their tasks will take. This will help the user organize their schedule with their items to-do even better.