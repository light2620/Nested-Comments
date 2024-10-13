// Get references to various HTML elements
const commentBtn = document.getElementById("comment-btn");
const commentTextArea = document.getElementById("comment-text-area");
const commentSection = document.getElementById("comment-section");
const commentHeading = document.getElementById("comment-heading");
const commentCollection = document.getElementById("comment-collection");

let replyShow = ""; // Variable to keep track of the current reply element

// Function to create a new comment or reply box
function creator(content, parentElement) {
    const commentBox = document.createElement("div");
    commentBox.setAttribute("class", "comment-box"); // Container for the comment or reply

    const comment = document.createElement("div");
    comment.setAttribute("class", "comment"); // Element that holds the comment text
    comment.innerText = content.value; // Set the text to the value provided

    const reply = document.createElement("div");
    reply.setAttribute("class", "reply"); // Reply button for each comment
    reply.innerText = "Reply";
    reply.style.display = "block"; // Show the reply button

    // Append comment and reply button to the comment box
    commentBox.appendChild(comment);
    commentBox.appendChild(reply);

    // Add the comment box to the parent element (could be comment section or reply container)
    parentElement.appendChild(commentBox);

    content.value = ""; // Clear the input after creating the comment/reply
}

// Event listener for adding a comment when the comment button is clicked
commentBtn.addEventListener("click", (event) => {
    const textArea = event.target.parentElement.querySelector(".comment-text-area").value;
    
    // Only create a comment if there is text in the textarea
    if (textArea) { 
        creator(commentTextArea, commentCollection);
        commentHeading.style.display ="block";
    }
});

// Event listener for handling reply actions within the comment section
commentCollection.addEventListener("click", (ev) => {
    const currentElem = ev.target;

    // Handle click on the 'Reply' button
    if (currentElem.classList.contains("reply")) {
        replyShow = currentElem; // Track which reply button was clicked
        currentElem.style.display = "none"; // Hide the reply button

        const replyDiv = document.createElement("div");
        replyDiv.setAttribute("class", "replyDiv"); // Create a div to contain the reply form

        currentElem.parentElement.appendChild(replyDiv); // Add reply form to the current comment

        const replyTextArea = document.createElement("textarea");
        replyTextArea.setAttribute("class", "reply-text-area"); // Text area for the reply
        replyTextArea.setAttribute("placeholder", "Write Your Reply Here");

        replyDiv.appendChild(replyTextArea); // Append textarea to the reply div

        const replyBtn = document.createElement("button");
        replyBtn.setAttribute("class", "reply-btn"); // Button to submit the reply
        replyBtn.innerText = "Reply";

        replyDiv.appendChild(replyBtn); // Add the reply button to the reply div
    }

    // Handle the reply submission action
    if (currentElem.classList.contains("reply-btn")) {
        const parentElem = ev.target.parentElement; // Get the parent of the reply form (replyDiv)
        const replyContent = parentElem.querySelector("textarea"); // Get the reply content textarea

        replyContent.style.display = "none"; // Hide the reply textarea after submitting
        currentElem.style.display = "none"; // Hide the reply button after submitting

        creator(replyContent, parentElem); // Create the reply as a new comment inside the replyDiv
        replyContent.value = ""; // Clear the textarea

        replyShow.style.display = "block"; // Show the original 'Reply' button again
    }
});
