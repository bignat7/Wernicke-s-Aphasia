// Array of questions for each step
const questionTexts = [
    "What is your name?",
    "Ok… How are you doing?",
    "... What are your hobbies?",
    "Can you repeat what you said? I didn’t understand you.",
    "What?",
    "Um..."
  ];
  
  let currentStep = 0; // Tracks the current question step
  let randomizedString = ""; // Holds the randomized string
  let currentIndex = 0; // Tracks the current position in the randomized string
  let typingStopped = false; // Tracks whether typing is stopped
  
  // Helper function to generate randomized words
  function randomWords(count) {
    const words = ["morning", "good", "the", "whenever", "what", "is", "you", "apple", "jungle", "candy", "drawing", "believe", "reach", "dog", "chair", "grape", "purple", "whale", "cat", "desk", "lettuce", "crazy", "car"];
    return Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)]).join(" ");
  }
  
  // Function to handle real-time input replacement
  function simulateTyping(event, wordCount) {
    const inputBox = event.target;
  
    // Stop further input if the limit is reached
    if (typingStopped) {
      event.preventDefault();
      return;
    }
  
    // Generate a new randomized string if we reached the end or it's empty
    if (currentIndex === 0 || currentIndex >= randomizedString.length) {
      randomizedString = randomWords(wordCount) + " ";
      currentIndex = 0;
    }
  
    // Replace the typed character with the next character in the randomized string
    const nextCharacter = randomizedString[currentIndex];
    inputBox.value += nextCharacter;
    currentIndex++;
  
    // Stop typing if the word limit is reached
    const currentWordCount = inputBox.value.trim().split(" ").filter(Boolean).length;
    if (currentWordCount >= wordCount) {
      typingStopped = true;
    }
  
    // Prevent default input behavior (so the actual typed character doesn't show up)
    event.preventDefault();
  }
  
  // Function to handle the "Submit" button click
function handleSubmit() {
    const questionText = document.getElementById("question-text");
    const inputBox = document.getElementById("input-box");
  
    // Change the question text after fade-out
    if (currentStep < questionTexts.length - 1) {
      questionText.style.opacity = 0;  // Start fading out
  
      setTimeout(() => {
        currentStep++;
        questionText.textContent = questionTexts[currentStep];
        questionText.style.opacity = 1; // Fade in after text changes
  
        // Reset input box for the next question
        inputBox.value = "";
        randomizedString = "";
        currentIndex = 0;
        typingStopped = false; // Allow typing for the next question
      }, 2000); // Wait 2 seconds before changing the text
    } else {
      fadeOutToPopup();
    }
  }
  
// Function to handle the final popup
function fadeOutToPopup() {
  const contentBox = document.getElementById("content-box");
  const popupBox = document.getElementById("popup-box");

  contentBox.style.transition = "opacity 1.5s ease-out"; // Add transition for fade-out
  contentBox.style.opacity = 0;

  setTimeout(() => {
    contentBox.classList.add("hidden");
    popupBox.classList.remove("hidden");

    // Ensure popup fades in smoothly after appearing
    popupBox.style.opacity = 0;
    popupBox.style.transition = "opacity 2s ease-out"; // Popup fade-in transition
    popupBox.style.opacity = 1;
  }, 1500); // Wait 1.5 seconds for content box to fade out
}
  
  // Function to reset the page
  function resetPage() {
    location.reload();
  }
  
  // Event listeners
  document.getElementById("input-box").addEventListener("keydown", (event) => {
    const wordCounts = [3, 6, 8]; // Word limits for each step
    const wordCount = wordCounts[Math.min(currentStep, wordCounts.length - 1)];
    simulateTyping(event, wordCount);
  });
  
  document.getElementById("submit-button").addEventListener("click", handleSubmit);
  document.getElementById("start-over").addEventListener("click", resetPage);
  