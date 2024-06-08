## Unit 2 Assignment: Music Playlist Explorer

Submitted by: George Holm

Estimated time spent: 30 hours spent in total

Deployed Application (optional): [Music Playlist Explorer Deployed Site](ADD_LINK_HERE)

### Application Features

#### CORE FEATURES

- [x] **Display Playlists**
  - [x] Dynamically render playlists on the homepage using JavaScript.
  - [x] Fetch data from a provided JSON file and use it to create interactive playlist tiles.
  - [x] Each title should display the playlist's cover image, name, creator, and like count.

- [x] **Playlist Details**
  - [x] Create a modal view that displays detailed information about a playlist when a user clicks on a playlist tile.
  - [x] The modal should show the playlist's cover image, name, creator, and a list of songs, including their titles, artists, and durations.

- [x] **Like Playlists**
  - [x] Implement functionality to allow users to like playlists by clicking a heart icon on each playlist tile.
  - [x] Update the like count on the playlist tile when a playlist is liked or unliked.

- [x] **Shuffle Songs**
  - [x] Enable users to shuffle the songs within a playlist using a shuffle button in the playlist detail modal.
  - [x] Rearrange the songs in the modal view when the shuffle button is clicked.

#### STRETCH FEATURES

- [x] **Add New Playlists**
  - [x] Allow users to create new playlists.
  - [x] Users can input playlist name, creator, and add multiple songs with details like title, artist, and duration.

- [x] **Edit Existing Playlists**
  - [x] Enable users to modify the details of existing playlists.
  - [x] Add an edit button to each playlist tile.
  - [x] Users can update the name, creator, and songs of the playlist.

- [x] **Delete Playlists**
  - [x] Add a delete button to each playlist tile.
  - [x] When clicked, the playlist is removed from the display and data model.

- [x] **Search Functionality**
  - [x] Implement a search bar that allows users to filter playlists by name or creator.

- [x] **Sorting Options**
  - [x] Implement a dropdown or button options that allow users to sort the playlist by name, number of likes, or date added.

### Walkthrough Video

<div>
    <a href="https://www.loom.com/share/bfa0dd2aa71d434b8700f3d184f7bdb4">
      <p>Music Player Creator - Watch Video</p>
    </a>
    <a href="https://www.loom.com/share/bfa0dd2aa71d434b8700f3d184f7bdb4">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/bfa0dd2aa71d434b8700f3d184f7bdb4-with-play.gif">
    </a>
</div>

### Reflection

* Did the topics discussed in your labs prepare you to complete the assignment? Be specific, which features in your weekly assignment did you feel unprepared to complete?

I believe the topics gave me the recourses and intuition to be able to do most of the features on this assignment. Particularly, labs 1-3 I found useful for setting up basic interactivity. I found that I was underprepared for most of the stretch features, as they pertain mostly to lab 4 content which I struggled the most with. After getting some guidance however, I found that when I figured out how to implement the basics of forms in HTML and javascript it was not too bad after that.

* If you had more time, what would you have done differently? Would you have added additional features? Changed the way your project responded to a particular event, etc.
  
If I had more time I would like to implement more ways to change the playlist and add songs, especially with the images. What would make creating new playlists complete is if I could add song images and playlist images easily. There are also minor style improvements I believe I could still add to increase the overall appeal, like with contrasting text against background. Another feature that I would like to add is object permenance, where when you leave the page and come back your changes are saved. I believe this would require more of a backend, or at least cookies, so I would need to learn more in order to incorporate this.

* Reflect on your project demo, what went well? Were there things that maybe didn't go as planned? Did you notice something that your peer did that you would like to try next time?

What went well was I was able to achieve almost all of the goals I had for the project. Implementing sorting, search, and the feature page did not take too long which surprised me since simpler features like the modal took nearly a day. I think what would have made the project go a lot smoother is if I had planned out earlier how I would structure everything so that the javascript would be easier and more robust to implement. As currently things work fine, but the code is less organized and too repetitive for what I would have liked. Now that I know javsacript, there are certainly more efficient ways for me to have implemented features, like displaying the playlists. That would have saved me many hours in the long run. I noticed many unique CSS animation styles that I have yet to implement by some of my peers that would have greatly enhanced the visual appeal of my website aswell, such as clicking animations on the like, or animated opening and closing of the featured page.

### Open-source libraries used

- Add any links to open-source libraries used in your project.

### Shout out

One of my friends Brian helped me with the featured page, showing me how it could be a lot more simple than I first imagined. I am sure he saved me hours of wasted effort.