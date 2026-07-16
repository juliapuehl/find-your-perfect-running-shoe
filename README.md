## On AG Coding Challenge

### Task

Build a small quiz for runners to find their perfect shoe.

### General notes

- Data:
  shoes.json - each shoe has an id, a name, a rating and a link
  questions:json - each question has a id, the actual question and an answers array -> an answers contains info about the next question and an array of ratings for each type of shoe
- Quiz Logic:
  Depending on how a question is answered, users can be taken to different follow-up questions, depending on the next question value
  if `nextQuestion` is blank: quiz is finished and the results are presented (the best fitting shoes).
  - depending on the answer, the ranking of the show is updated
