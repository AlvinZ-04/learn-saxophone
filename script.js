const parts = [
  {
    name: 'Mouthpiece',
    image: 'mouthpiece.webp',
    text: 'Usually made of hard rubber or plastic, though some are metal. It’s the part you blow into, and its shape influences the saxophone’s tone and response.',
    credit: 'Meyer mouthpiece · SAX',
    url: 'https://saxshop.com/products/meyer-ebonite-alto-saxophone-mouthpiece'
  },
  {
    name: 'Reed',
    image: 'reed.webp',
    text: 'Usually made of cane, although synthetic reeds are also available. It vibrates when you blow, setting the air inside the saxophone into vibration to create sound.',
    credit: 'Soprano reed shown · SAX',
    url: 'https://saxshop.com/products/hemke-soprano-saxophone-reed-single'
  },
  {
    name: 'Ligature',
    image: 'ligature.webp',
    text: 'A small clamp, often made of metal or a fabric-like material, that holds the reed against the mouthpiece while allowing it to vibrate.',
    credit: 'Rovner ligature · Midbell Music',
    url: 'https://midbellmusic.com/products/rovner-1rl-alto-saxophone-ligature-dark'
  },
  {
    name: 'Neck',
    image: 'neck.jpeg',
    text: 'Connects the mouthpiece to the body. Cork helps the mouthpiece fit snugly; moving it slightly along the cork helps adjust the tuning.',
    credit: 'Yamaha G1 · Music & Arts',
    url: 'https://www.musicarts.com/yamaha-g1-neck-for-alto-saxophone-main0028290'
  },
  {
    name: 'Body',
    image: 'body.jpeg',
    text: 'The main tube contains the vibrating air column and tone holes. Despite its metal body, the saxophone is a woodwind because it uses a reed to produce sound.',
    credit: 'Alto saxophone · Howarth of London',
    url: 'https://www.howarthlondon.com/product/phosphor-bronze-body-alto-saxophone/'
  },
  {
    name: 'Keys and pads',
    image: 'keys.webp',
    text: 'Pressing keys opens or closes tone holes to change the note. Soft pads underneath the key cups seal the holes. The green accessory in this photo is a key prop.',
    credit: 'Keywork with key props · Key Leaves',
    url: 'https://keyleaves.com/products/sax-key-props'
  },
  {
    name: 'Bell',
    image: 'bell.webp',
    text: 'The flared opening helps the lowest notes resonate and project. Sound also comes through open tone holes, so the bell isn’t the only place sound leaves the instrument.',
    credit: 'Tenor bell shown · Kessler & Sons',
    url: 'https://kesslerandsons.com/product/antigua-power-bell-tenor-sax/'
  }
]

// Show the seven parts using the same DOM methods as the FAQ exercise.
const partsList = document.querySelector('#parts-list')

for (const part of parts) {
  const article = document.createElement('article')
  article.classList.add('part')

  const imageBox = document.createElement('div')
  imageBox.classList.add('part-image')

  const image = document.createElement('img')
  image.src = `assets/${part.image}`
  image.alt = part.name
  image.loading = 'lazy'
  image.width = 240
  image.height = 190
  imageBox.appendChild(image)

  const title = document.createElement('h4')
  title.textContent = part.name

  const description = document.createElement('p')
  description.textContent = part.text

  const credit = document.createElement('p')
  credit.classList.add('image-credit')

  const link = document.createElement('a')
  link.href = part.url
  link.textContent = part.credit
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  credit.appendChild(link)

  article.appendChild(imageBox)
  article.appendChild(title)
  article.appendChild(description)
  article.appendChild(credit)
  partsList.appendChild(article)
}

// Wait for a click before loading a YouTube video.
const videoButtons = document.querySelectorAll('.video-launch')

for (const button of videoButtons) {
  button.addEventListener('click', function () {
    const slot = button.parentElement
    const frame = document.createElement('iframe')
    frame.src = `https://www.youtube-nocookie.com/embed/${slot.dataset.video}?autoplay=1`
    frame.title = slot.dataset.title
    frame.allow = 'autoplay; encrypted-media; picture-in-picture'
    frame.allowFullscreen = true
    frame.referrerPolicy = 'strict-origin-when-cross-origin'
    button.remove()
    slot.appendChild(frame)
  })
}

const fingerings = {
  G: {
    hands: 'Left: index, middle, and ring. Right: no keys.',
    octave: false
  },
  A: {
    hands: 'Left: index and middle. Right: no keys.',
    octave: false
  },
  B: {
    hands: 'Left: index only. Right: no keys.',
    octave: false
  },
  C: {
    hands: 'Left: middle only. Right: no keys.',
    octave: false
  },
  D: {
    hands: 'Left and right: index, middle, and ring.',
    octave: true
  },
  E: {
    hands: 'Left: index, middle, and ring. Right: index and middle.',
    octave: true
  }
}

const phrases = [
  ['G', 'G', 'D', 'D', 'E', 'E', 'D'],
  ['C', 'C', 'B', 'B', 'A', 'A', 'G'],
  ['D', 'D', 'C', 'C', 'B', 'B', 'A'],
  ['D', 'D', 'C', 'C', 'B', 'B', 'A'],
  ['G', 'G', 'D', 'D', 'E', 'E', 'D'],
  ['C', 'C', 'B', 'B', 'A', 'A', 'G']
]

const song = []
const melody = document.querySelector('#melody')

for (const phrase of phrases) {
  const line = document.createElement('div')
  line.classList.add('melody-phrase')

  for (let i = 0; i < phrase.length; i++) {
    const note = phrase[i]
    const mark = document.createElement('span')
    mark.classList.add('melody-note')
    mark.id = `melody-note-${song.length}`
    mark.textContent = note

    if (i === phrase.length - 1) {
      mark.textContent = note + ' –'
    }

    line.appendChild(mark)
    song.push(note)
  }

  melody.appendChild(line)
}

let noteIndex = 0
const currentNote = document.querySelector('#current-note')
const notePosition = document.querySelector('#note-position')
const noteLength = document.querySelector('#note-length')
const octaveStatus = document.querySelector('#octave-status')
const handHint = document.querySelector('#hand-hint')
const fingeringImage = document.querySelector('#fingering-image')
const noteMarks = document.querySelectorAll('.melody-note')
const previousNote = document.querySelector('#previous-note')
const nextNote = document.querySelector('#next-note')
const noteAnnouncement = document.querySelector('#note-announcement')

function showNote() {
  const note = song[noteIndex]
  const fingering = fingerings[note]
  let duration = '1 beat'

  // The last note of each seven-note phrase lasts two beats.
  if (noteIndex % 7 === 6) {
    duration = '2 beats'
  }

  let position = String(noteIndex + 1)
  if (noteIndex < 9) {
    position = '0' + position
  }

  currentNote.textContent = note
  notePosition.textContent = `${position} / ${song.length}`
  noteLength.textContent = duration
  handHint.textContent = fingering.hands
  fingeringImage.src = `assets/${note}.gif`

  if (fingering.octave) {
    octaveStatus.textContent = 'Press the octave key'
    fingeringImage.alt = `${note}: ${fingering.hands} Press the octave key.`
  } else {
    octaveStatus.textContent = 'Octave key released'
    fingeringImage.alt = `${note}: ${fingering.hands} Release the octave key.`
  }

  for (let i = 0; i < noteMarks.length; i++) {
    const mark = noteMarks[i]
    if (i === noteIndex) {
      mark.classList.add('current')
      mark.setAttribute('aria-current', 'step')
    } else {
      mark.classList.remove('current')
      mark.removeAttribute('aria-current')
    }
  }

  previousNote.disabled = noteIndex === 0
  if (noteIndex === song.length - 1) {
    nextNote.textContent = 'Start again'
  } else {
    nextNote.textContent = 'Next'
  }

  noteAnnouncement.textContent = `Note ${noteIndex + 1} of ${song.length}: ${note}, ${duration}. ${fingeringImage.alt}`
}

previousNote.addEventListener('click', function () {
  if (noteIndex > 0) {
    noteIndex--
  }
  showNote()
})

nextNote.addEventListener('click', function () {
  noteIndex++
  if (noteIndex === song.length) {
    noteIndex = 0
  }
  showNote()
})

showNote()

const partDescriptions = [
  'A black tapered piece with a flat surface and an opening.',
  'A thin tan strip of cane with a rounded, delicate tip.',
  'A black wraparound clamp with a tightening screw.',
  'A curved metal tube with cork at one end.',
  'The long main section of the saxophone, shown with its attached components.',
  'A close-up of finger touches, metal cups, and their mechanism.',
  'A close-up of the wide, flared opening at the bottom.'
]

// Each number is the index of a part in the parts array.
const quizChoices = [
  [0, 1, 3, 5],
  [2, 4, 6, 1],
  [5, 0, 2, 3],
  [1, 3, 4, 6],
  [4, 5, 0, 2],
  [6, 1, 3, 5],
  [2, 4, 6, 0]
]

let quizIndex = 0
let score = 0
let answered = false
const quizCount = document.querySelector('#quiz-count')
const quizQuestion = document.querySelector('#quiz-question')
const quizImage = document.querySelector('#quiz-image')
const quizFeedback = document.querySelector('#quiz-feedback')
const quizOptions = document.querySelector('#quiz-options')
const quizNext = document.querySelector('#quiz-next')

function checkAnswer(button, partIndex) {
  if (answered) {
    return
  }

  answered = true
  const part = parts[quizIndex]

  if (partIndex === quizIndex) {
    score++
    button.classList.add('correct')
    quizFeedback.textContent = `That’s right—it’s the ${part.name.toLowerCase()}.`
  } else {
    button.classList.add('incorrect')
    quizFeedback.textContent = `This is the ${part.name.toLowerCase()}. You’ll recognize it next time.`
  }

  for (const choice of quizOptions.querySelectorAll('button')) {
    choice.disabled = true
    if (choice.textContent === part.name) {
      choice.classList.add('correct')
    }
  }

  quizNext.disabled = false
}

function showQuestion() {
  answered = false
  const part = parts[quizIndex]
  quizCount.textContent = `Part ${quizIndex + 1} of ${parts.length}`
  quizQuestion.textContent = 'What is this part called?'
  quizImage.src = `assets/${part.image}`
  quizImage.alt = partDescriptions[quizIndex]
  quizFeedback.textContent = ''
  quizOptions.textContent = ''
  quizNext.disabled = true

  if (quizIndex === parts.length - 1) {
    quizNext.textContent = 'See my result'
  } else {
    quizNext.textContent = 'Next picture'
  }

  for (const partIndex of quizChoices[quizIndex]) {
    const button = document.createElement('button')
    button.type = 'button'
    button.classList.add('quiz-option')
    button.textContent = parts[partIndex].name

    button.addEventListener('click', function () {
      checkAnswer(button, partIndex)
    })

    quizOptions.appendChild(button)
  }
}

function showResult() {
  quizCount.textContent = 'Quiz complete'
  quizQuestion.textContent = `${score} out of ${parts.length} correct.`
  quizOptions.textContent = ''
  quizNext.textContent = 'Try again'

  if (score === parts.length) {
    quizFeedback.textContent = 'You know your way around the saxophone. Nicely done!'
  } else {
    quizFeedback.textContent = 'Take another look at the parts above, then give it another try.'
  }
}

quizNext.addEventListener('click', function () {
  if (quizIndex === parts.length) {
    quizIndex = 0
    score = 0
    showQuestion()
  } else {
    quizIndex++
    if (quizIndex === parts.length) {
      showResult()
    } else {
      showQuestion()
    }
  }

  // Announce the next question to keyboard and screen-reader users.
  quizQuestion.setAttribute('tabindex', '-1')
  quizQuestion.focus({ preventScroll: true })
})

showQuestion()

const reflectionForm = document.querySelector('#reflection-form')
const reflectionResult = document.querySelector('#reflection-result')

reflectionForm.addEventListener('submit', function (event) {
  event.preventDefault()
  const choice = reflectionForm.querySelector('input[name="sound"]:checked')
  let message = ''

  if (choice.value === 'yes') {
    message = 'You made your first sound! Keep exploring the melody at your own pace.'
  } else if (choice.value === 'not-yet') {
    message = 'That first sound takes practice. Revisit the first-sound video and try again when you’re ready.'
  } else {
    message = 'You’ve taken a first look at the saxophone. Come back when you have an instrument to try.'
  }

  reflectionResult.textContent = message + ' Your reflection is complete; nothing was sent or saved.'
})
