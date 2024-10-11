const speakerBtn = document.getElementById("toggle-speaker");
const speakerIcon = document.getElementById("speaker-icon");
const avatarVideo = document.getElementById("avatar-video");

let isSpeakerOn = true;

speakerBtn.addEventListener("click", () => {
  isSpeakerOn = !isSpeakerOn;
  speakerBtn.innerHTML = isSpeakerOn
    ? '<i id="speaker-icon" class="bi bi-volume-up-fill"></i> Speaker: On'
    : '<i id="speaker-icon" class="bi bi-volume-mute-fill"></i> Speaker: Off';

  // Toggle the muted property of the video
  avatarVideo.muted = !isSpeakerOn;
});
