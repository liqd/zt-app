# State of ZT app

This text tries to document what is currently working in the app and
also what's still missing.

## Authentification / Sign-In
When opening the app the first time, there is a login screen. Filled in with the
credentials of the connected a+ site, the user gets a token and is logged in.

Logging out is possible on the explore page.

## Explore Page: Project List / Overview
On the explore page app projects exposed by the API
(endpoint: `/api/app-projects/`) are shown. To become an app project,
the project has to be marked as `is_app_accessible` in the django admin of
the connectred a+ site. While the API returns all projects marked as
app-accessible, for the explore page we filter out all projects that do not
have a single agenda-setting module (meaning, we filter out multi-module projects and all projects using other modules).
https://github.com/liqd/zt-app/blob/99704070819971fa5d0301847e862c674093cbaa/containers/Ideas/ExplorePage.js#L39
https://github.com/liqd/adhocracy-plus/blob/71c1edc2407eaae0000794b8ee9539fd75d214d3/apps/projects/serializers.py#L52

The list includes project tiles. The tiles have:
- project image or blue background as fallback (it does only show the image if it exists, never the tile image)
- the organisation name
- the project name
- the project description
- a dummy timeline entry (always "nur noch 12 Wochen", this needs to be replaced by some function showing the real status of the project)

## Project Detail Page
As the only projects that are shown in the explore page are the ones with a
single agenda setting module, these are the only projects that are currently
shown on the detail pages as well.

The project detail page shows:
- the project image, which looks like it's zoomed in too much
- a back-button in the upper left corner (cannot always be seen on lighter images as white)
- a dummy follow button in the upper right corner
- the project info on a white card with rounded corners
- project name, description and organisation
- three tabs: Participation, Information, and Results
- only the content of the participation tab is there and marked as active in blue. - the tab nav thingies are not clickable
- in the participation tab, the currently active phase is shown. If there is no active phase the sentence "No active phase found." is displayed

The following items will change for the different project detail pages when we
can handle other modules:
- above the ideas list, there are dummy search and filter buttons
- below the ideas list, a blue "Submit idea" button is shown (and clickable) when the logged-in user is allowed to add an idea (for normal users during idea phase, for admins always, ...)
- the idea list has idea tiles showing idea title, creator, created date, number of up- and down-votes and comments. If the idea has a category that is also shown as label. Idea labels and idea images are not shown on the tiles. Tiles are clickable and lead to the idea detail page. The ideas are sorted the other one around as on a+: the oldest ones are on top.

## Idea Create
In an idea challenge project page, a button to add an idea is shown at the end of the list when the user is allowed to do so. Clicking it brings the user to the IdeaCreate page.

Already working:
- posting ideas as json with
- name
- description as plain text
- categories if they exist (but whenever the category is clicked we get `VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.`)
- labels if they exist (but don't have the right styling yet)
- using the camera to take a photo or adding photos from the local storage. Posting and editing the image does not yet work, though.

Not currently working/in progress:
- error handling for posting an idea (we do not currently show the error the API gives us?!, but handle the errors in the IdeaCreate component)
- posting formData. We need that to post images. PR starting that: https://github.com/liqd/zt-app/pull/134
- having the descrition in it's own component with a bigger textfield to open and close (also currently we do not allow test with less than 20 chars, this should be replaced by proper error handling depending on the model fields)
- adding markup to the description. To do that, a+ needs to be changed first and the model field needs to be adapted as well as the CK editor that should be replaced by a markup editor

## Idea Edit
Idea edit works as the posting, but with different endpoint.

It shows and keeps name, description, category, labels. But it doesn't show or send an image.

https://github.com/liqd/zt-app/issues/148

## Idea Detail
- back button in upper left corner
- three dots opening menu on right upper corner
- menu always has dummy report button and cancel link
- depending on permissions menu also has edit and delete buttons
- delete button opens another modal with delete and cancel buttons
- delete deletes the idea
- the edit brings the user to the IdeaCreate page to edit the idea
- idea name
- idea image
- idea description as plain text, html tags are removed by serializer
- category and label badges if idea has any
- rating buttons (working deoending on permissions)
- comments are also shown (see below)

## Rating
Rating is possible on the idea detail page. Users can only rate when the
permissions allow it (normal users during rating phase, admins always, ...).
For the comments rating is currently not possible (but the buttons are shown).

## Comments
Comments added on the connected a+ site are shown on the idea detail page.
Commenting is not yet possible.

Shown for the comments:
- the number of comments on top of the list
- user avatar or fallback blue circle
- user name
- created date
- dummy dropdown dots
- comment text
- very long comments are shortened and read more (/less) link is shown
- link to show answers
- answers (child comments) are also displayd after clicking link
- number of up- and down-votes (FIX ME: check if works)
- dummy button reply
- dummy button share
