'use strict';

const main = document.querySelector('.main');
const selection = document.querySelector('.selection');
const title = document.querySelector('.main__title');


const getData = () => {
  const dataBase = [
    {
      'id': '01',
      theme: 'Тема01',
      result: [
        [40, 'есть задатки, нужно развиваться'],
        [80, 'хорошо, но есть пробелы'],
        [100, 'отлично']
      ],
      list: [

        {
          type: 'checkbox',
          question: 'Вопрос1',
          answers: ['правильный', 'правильный1', 'неправильный', 'неправильный2'],
          correct: 1,
        },
        {
          type: 'radio',
          question: 'Вопрос',
          answers: ['правильный', 'неправильный1', 'неправильный', 'неправильный2'],

        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный', 'правильный1', 'неправильный', 'неправильный2'],
          correct: 2,
        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный', 'правильный1', 'неправильный', 'неправильный2'],
          correct: 2,
        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный', 'правильный1', 'неправильный', 'неправильный2'],
          correct: 3,
        },
        {
          type: 'radio',
          question: 'Вопрос',
          answers: ['правильный', 'неправильный1', 'неправильный', 'неправильный2'],

        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный', 'правильный1', 'неправильный', 'неправильный2'],
          correct: 2,
        }
      ]
    },
    {
      'id': '02',
      theme: 'Тема02',
      result: [
        [30, 'есть задатки, нужно развиваться'],
        [70, 'хорошо, но есть пробелы'],
        [100, 'отлично']
      ],
      list: [
        {
          type: 'radio',
          question: 'Вопрос',
          answers: ['правильный', 'неправильный1', 'неправильный', 'неправильный2'],

        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный', 'правильный1', 'неправильный', 'неправильный2'],
          correct: 1,
        },
        {
          type: 'radio',
          question: 'Вопрос',
          answers: ['правильный', 'неправильный1', 'неправильный', 'неправильный2'],

        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный', 'правильный1', 'неправильный', 'неправильный2'],
          correct: 2,
        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный', 'правильный1', 'неправильный', 'неправильный2'],
          correct: 2,
        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный', 'правильный1', 'неправильный', 'неправильный2'],
          correct: 3,
        },
        {
          type: 'radio',
          question: 'Вопрос',
          answers: ['правильный', 'неправильный1', 'неправильный', 'неправильный2'],

        },
        {
          type: 'checkbox',
          question: 'Вопрос',
          answers: ['правильный', 'правильный1', 'неправильный', 'неправильный2'],
          correct: 2,
        }
      ]
    }
  ];

  return dataBase;
}

const hideElem = (elem) => {
  let opacity = getComputedStyle(elem).getPropertyValue('opacity');

  const animation = () => {
    opacity -= 0.05;
    elem.style.opacity = opacity;

    if (opacity > 0) {
      requestAnimationFrame(animation)
    } else {
      elem.style.display = 'none';
    }
  };

  requestAnimationFrame(animation);
};

const renderTheme = (themes) => {
  const list = document.querySelector('.selection__list');
  list.textContent = '';

  const buttons = [];

  for (let i = 0; i < themes.length; i += 1) {
    const li = document.createElement('li');
    li.className = 'selection__item';

    const button = document.createElement('button');
    button.className = 'selection__theme';
    button.dataset.id = themes[i].id;
    button.textContent = themes[i].theme;

    li.append(button);
    list.append(li);

    buttons.push(button);

    // list.innerHTML += `
    // <li class="selection__item">
    //       <button class="selection__theme">
    //         ${themes[i].theme}
    //       </button>
    //     </li>
    // `

  }
  return buttons;
};

const createAnswer = (data) => {
  const type = data.type;


  return data.answers.map(item => {
    const label = document.createElement('label');
    label.className = 'answer';

    const input = document.createElement('input');
    input.type = type;
    input.name = 'answer';
    input.className = `answer__${type}`;
    console.log(input.className);
    const text = document.createTextNode(item);

    label.append(input, text);

    return label;
  })
};


const renderQuiz = (quiz) => {
  hideElem(title);
  hideElem(selection);

  const questionBox = document.createElement('div');
  questionBox.className = 'main__box main__box__question';

  main.append(questionBox);

  let questionCount = 0;

  const showQustion = () => {

    const data = quiz.list[questionCount];
    questionCount += 1;

    questionBox.textContent = '';

    const form = document.createElement('form');
    form.classList = 'main__form-question';
    form.dataset.count = `${questionCount}/${quiz.list.length}`;
    console.log(data);
    questionBox.append(form);

    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.className = 'main__subtitle';
    legend.textContent = data.question;

    const answers = createAnswer(data);

    const button = document.createElement('button');
    button.className = 'main__btn question__next';
    button.type = 'submit';
    button.textContent = 'Подтвердить';

    fieldset.append(legend, ...answers);


    form.append(fieldset, button);

    form.addEventListener('submit', (event) => {
   
        event.preventDefault();
      

      let ok = false;
      const answer = [...form.answer].map(input => {
        if (input.checked) {
          ok = true;
          return input.checked ? input.value : false;
        }

        

        if (ok) {
          console.log(answer);
        } else {
          console.error(' Не выбран ни один элемент')
        }
      });
    })
  };

  showQustion();

};



const addClick = (buttons, data) => {
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const quiz = data.find(item =>
        item.id === btn.dataset.id);
      renderQuiz(quiz);
    });
  });
};


const initQuiz = () => {
  const data = getData();

  const buttons = renderTheme(data);

  addClick(buttons, data);
}

initQuiz();