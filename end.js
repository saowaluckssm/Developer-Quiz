const finalScoreEl = document.getElementById("finalScore");

const mostRecentScore = localStorage.getItem("mostRecentScore");
finalScoreEl.innerText = mostRecentScore;

