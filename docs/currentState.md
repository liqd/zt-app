# State of ZT app

This text tries to document what is currently working in the app and
also what's still missing.

## UPDATED 04/08/22

**To be discussed/considered**
- Have a policy of adding FIXME anywhere we find repeated code if we
don't have time for a refactor in that moment?
- Setting up utilities style sheet that can be imported into other style sheets
or something? maybe we can consider this for next sprint
- Tests for some important elements are still not there, e.g. IdeaCreate,
we should probably have a priorised list so we can be more systematic and ensure
all vital parts are tested.
- Accessibility: we have implemented a11y linting however there were a large number
of issues that came up during an initial test with IOS Voiceover, we should have
a story to implement fixes, a11y issue can be seen
([here](https://github.com/liqd/zt-app/issues/343))

## Authentification / Sign-In
When opening the app the first time, there is a login screen. Filled in with the
credentials of the connected a+ site, the user gets a token and is logged in.
- The login page includes:
    - styled and has error handling
    - web links to 'Register' and 'Forgot Password' - links need a11y additions

Logging out is possible on Profile page and in the future the Settings Overview page.

## Explore Page: Project List / Overview
On the explore page app projects exposed by the API
(endpoint: `/api/app-projects/`) are shown. To become an app project,
the project has to be marked as `is_app_accessible` in the django admin of
the connected a+ site (dev or local). While the API returns all projects marked as
app-accessible, for the explore page we filter out all projects that do not
have a single agenda-setting (Idea Challenge) module (meaning, we filter out
multi-module projects and all projects using other modules).
https://github.com/liqd/zt-app/blob/99704070819971fa5d0301847e862c674093cbaa/containers/Ideas/ExplorePage.js#L39
in Aplus:
https://github.com/liqd/adhocracy-plus/blob/71c1edc2407eaae0000794b8ee9539fd75d214d3/apps/projects/serializers.py#L45
https://github.com/liqd/adhocracy-plus/blob/71c1edc2407eaae0000794b8ee9539fd75d214d3/apps/projects/serializers.py#L52
- The explore page has a profile image button of the `authenticatedUser` in top
right that links to the [Profile Page](#profile-page).

- Not currently working/in progress:
  - the user avatar button does not update if the user changes their image and
  navigates to Explore page via back button, the explore page must be updated before
  new image is shown ([see issue](https://github.com/liqd/zt-app/issues/400))

- The 'Explore' title and 'Recently added' subtitle are below profile button on
the left and when user scrolls both button and titles remain visible - not sure if
this is the desired behaviour?
- The explore list includes project tiles. The tiles have:
  - project image or blue background as fallback (it only shows the image if it
    exists, never the tile image)
  - the organisation name
  - the project name
  - the project description
  - timeline or wording entry showing the status of the project

## Project Detail Page
Project detail pages display `is_app_accessible` marked projects with a single
agenda-setting (Idea Challenge) module, no other project types can be viewed in
the app as yet.

The project detail page shows:
- the cropped project image, as it's portrait rather then in web where it's landscape
- a back-button in the upper left corner as part of header component
- a dummy follow button in the upper right corner as part of header component
- the project info on a white card with rounded corners
- project name, description, organisation logo and organisation name
- three tabs: Participation, Information, and Results
- participation tab is there on screen-load and marked as active in blue.
- In the participation tab, the currently active phase is shown. If there is no
active phase the sentence "No active phase found." is displayed
- Information and Results tabs are both clickable and display formatted content
added from ck editor. Most richtext elements are displayed correctly. An interim solution for videos was ceided upon and onle the video link is displayed, they are not embeded.

- Not currently working/in progress:
  - `document linking` does not open the link - probable to do with `media folder`
  - `media embed` does display a link to the video but does not display any other content that was
  saved after the embed ([see issue](https://github.com/liqd/zt-app/issues/387))


The following items will change for the different project detail pages when we
can handle other modules:
- above the ideas list, there are dummy search and filter buttons
- below the ideas list, a blue "Submit idea" button is shown (and clickable leading
  to [Idea Create](#idea-create)) when the logged-in user is allowed to add an idea
  (for normal users during idea phase, for admins always, ...)
- the idea list has idea tiles showing idea title, creator, created date, number
of up- and down-votes and comments. If the idea has a category that is also shown
as label. Idea labels and idea images are not shown on the tiles. Tiles are
clickable and lead to the [Idea detail page](#idea-detail-page). The ideas are
sorted the other way around to a+: the oldest ones are on top.

## Idea Create
In an idea challenge project page, a button to add an idea is shown at the end
of the list when the user is allowed to do so. Clicking it brings the user to
the IdeaCreate page.

Already working:
- posting ideas as json with:
  - name
  - description as plain text
  - categories if they exist (but whenever the category is clicked we get
    `VirtualizedLists should never be nested inside plain ScrollViews with the same
    orientation - use another VirtualizedList-backed container instead.`)
  - labels if they exist
  - using the camera to take a photo or adding photos from the local storage and sending
- error handling for posting an idea

Not currently working/in progress:
- adding markup to the description. To do that, a+ needs to be changed first and
the model field needs to be adapted as well as the CK editor that should be replaced
by a markup editor


## Idea Edit
Idea edit works as the posting, but with different endpoint.

It shows and keeps name, description, category, labels and image.


## Idea Detail Page
- back button in upper left corner
- three dots opening menu on right upper corner
- menu always has Report and Cancel buttons
- depending on permissions menu also has Edit and Delete buttons
- delete button opens another modal with delete and cancel buttons
- delete deletes the idea
- the edit brings the user to the IdeaCreate page to edit the idea
- Idea detail contains:
  - idea name
  - idea image
  - idea description as plain text, html tags are removed by serializer
  - category and label badges if idea has any
  - rating buttons (working depending on permissions)
  - comments are also shown (see below)

## Rating
Rating is possible on the idea detail page. Users can only rate when the
permissions allow it (normal users during rating phase, admins always, ...).


## Comments
Comments added on the connected a+ site are shown on the idea detail page.
Comments can be added in a text field at bottom of screen, they appear at bottom
of list, replies can also be added by pressing 'reply' button, comment text input
will then autofocus, new comments are added to top of list.

Shown for the comments:
- the number of comments on top of the list
- user avatar or fallback blue circle
- user name
- created date
- vertical ellipses on top right of comment opens a menu which always has
  Report and Cancel buttons
- depending on permissions menu also has Edit and Delete buttons
- delete button opens another modal with delete and cancel buttons
- very long comments are shortened and read more (/less) link is shown
- link to show answers
- answers (child comments) are also displayed after clicking link
- number of up- and down- votes
- reply button
- dummy share button

## Profile Page
Profile page can only be reached by the authenticated user only, there's a large
profile image and name. In the top left is back button and top
right there's a cog button that links to the users [Settings Overview](#settings-overview).
There is a sign-out button at bottom of the page.


## Settings Overview
Setting overview will in the future have multiple links that the user can select
and change various settings. It currently only has:
- [Edit Profile](#settings-profile) link
- Dummy link

To be added:
  - sign out button
  - additional links for other settings

## Settings Profile
Settings Profile is where the user can update their user name and user image, it currently has:
- Avatar image button that will open the image capture or upload component from IdeaCreate.
- textinput field with current username as placeholder text
- save button at bottom
After user has updated either image or name it is sent to api and an alert opens
confirming the information has been saved and the user is taken back to
[Settings Overview](#settings-overview) with the new details sent to that page via
params in the navigate function.

Functionality to add/discuss:
- show fallback image in settings form (not sure if really necessary?)
- do we want to enable deletion of profile pic?
- currently the profile image button behaviour upon opening page is:
    - `profile image` click `change profile image` click (opens image component).
- It probably should be:
    - `change profile image` click (opens image component).
