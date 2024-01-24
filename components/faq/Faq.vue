<template>
  <section class="howwork">
    <div class="container">
      <h2 class="title-mainpage">Как это работает?</h2>
      <ul class="howwork-list">
        <li class="howwork-item howwork-item--1">
          <div class="howwork-item__text">
            <span class="howwork-item__num">1</span>
            <div class="howwork-item__wrapper">
              <p class="howwork-item__title">
                Запрос на проверку
              </p>
              <p class="howwork-item__subtitle">
                Чтобы проверить информацию, вам
                необходимо ввести номер в форму на нашем
                сайте.
              </p>
            </div>
            <div class="howwork-arrow howwork-arrow--left">
              <img
                  src="../../assets/img/howwork-arrow-1.webp"
                  alt="стрелка"
              />
            </div>
          </div>
          <div class="howwork-item__img">
            <img
                src="../../assets/img/howwork-1.webp"
                alt="карточка 1"
            />
          </div>
        </li>

        <li class="howwork-item howwork-item--2">
          <div class="howwork-item__img">
            <img
                src="../../assets/img/howwork-2.webp"
                alt="карточка 2"
            />
          </div>
          <div class="howwork-item__text">
            <span class="howwork-item__num">2</span>
            <div class="howwork-item__wrapper">
              <p class="howwork-item__title">Поиск</p>
              <p class="howwork-item__subtitle">
                Мы проведем проверку данных по открытым
                и приватным источникам, и узнаем
                владельца.
              </p>
            </div>
            <div class="howwork-arrow howwork-arrow--right">
              <img
                  src="../../assets/img/howwork-arrow-2.webp"
                  alt="стрелка"
              />
            </div>
          </div>
        </li>

        <li class="howwork-item howwork-item--3">
          <div class="howwork-item__text">
            <span class="howwork-item__num">3</span>
            <div class="howwork-item__wrapper">
              <p class="howwork-item__title">Результат</p>
              <p class="howwork-item__subtitle">
                Если будет определено, чей номер, то вы
                получите полноценные сведения о
                звонившем, имеющиеся в интернете.
              </p>
            </div>
          </div>
          <div class="howwork-item__img">
            <img
                src="../../assets/img/howwork-3.webp"
                alt="карточка 3"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>

  <section class="faq">
    <div class="container">
      <h2 class="title-mainpage">Частые вопросы</h2>
      <div class="faq-wrapper">
        <question :answer="question.answer" :question="question.question"
                  :answerList="question.answerList"
                  v-for="question in questionsList"></question>
      </div>
    </div>
  </section>
  <section class="infonumber">
    <div class="container infonumber-container">
      <h2 class="title-mainpage">
        Какую информацию можно узнать по номеру?
      </h2>
      <ul class="infonumber-list">
        <li class="infonumber-item">
          <div class="infonumber-item__icon">
            <img
                src="../../assets/img/mask.webp"
                alt="ФИО"
            />
          </div>
          <p class="infonumber-item__title">ФИО</p>
        </li>
        <li class="infonumber-item">
          <div class="infonumber-item__icon">
            <img
                src="../../assets/img/snils.webp"
                alt="СНИЛС"
            />
          </div>
          <p class="infonumber-item__title">СНИЛС</p>
        </li>
        <li class="infonumber-item">
          <div class="infonumber-item__icon">
            <img
                src="../../assets/img/passport.webp"
                alt="Паспорт"
            />
          </div>
          <p class="infonumber-item__title">Паспорт</p>
        </li>
        <li class="infonumber-item">
          <div class="infonumber-item__icon">
            <img
                src="../../assets/img/driver-licence.webp"
                alt="Водительские права"
            />
          </div>
          <p class="infonumber-item__title">
            Водительские права
          </p>
        </li>
        <li class="infonumber-item">
          <div class="infonumber-item__icon">
            <img
                src="../../assets/img/messanger.webp"
                alt="Месседжеры"
            />
          </div>
          <p class="infonumber-item__title">Месседжеры</p>
        </li>
        <li class="infonumber-item">
          <div class="infonumber-item__icon">
            <img
                src="../../assets/img/birth.webp"
                alt="Дата рождения"
            />
          </div>
          <p class="infonumber-item__title">Дата рождения</p>
        </li>
        <li class="infonumber-item">
          <div class="infonumber-item__icon">
            <img
                src="../../assets/img/adress.webp"
                alt="Адрес"
            />
          </div>
          <p class="infonumber-item__title">Адрес</p>
        </li>
        <li class="infonumber-item">
          <div class="infonumber-item__icon">
            <img
                src="../../assets/img/inn.webp"
                alt="Инн"
            />
          </div>
          <p class="infonumber-item__title">Инн</p>
        </li>
        <li class="infonumber-item">
          <div class="infonumber-item__icon">
            <img
                src="../../assets/img/car.webp"
                alt="Номер машины"
            />
          </div>
          <p class="infonumber-item__title">Номер машины</p>
        </li>
        <li class="infonumber-item">
          <div class="infonumber-item__icon">
            <img
                src="../../assets/img/social.webp"
                alt="Социальные сети"
            />
          </div>
          <p class="infonumber-item__title">
            Социальные сети
          </p>
        </li>
      </ul>
    </div></section>
</template>

<script>
import Question from "@/components/faq/Question.vue"

export default {
  data() {
    return {
      questionsList: [{
        "question": "Почему стоит использовать наш сервис?",
        "answer": "Наш сервис имеет ряд преимуществ:",
        "answerList": [
            "Обширная база данных. Мы ежемесячно обновляем нашу базу данных, чтобы предоставлять нашим пользователям самую актуальную информацию.",
            "Быстрый и удобный поиск. Пробить телефон просто и быстро — вы можете проверить номер всего за 2 секунды.",
            "Точная информация. Мы используем надежные источники информации, чтобы обеспечить пользователей точными данными. В нашей базе есть большая часть жителей России."
        ]
      },
      {
        "question": "Где можно использовать информацию о номере телефона?",
        "answer": "Информация о нем может быть использована в различных целях. Например, пробив, вы можете использовать ее, чтобы:",
        "answerList": [
          "Не пропустить важный звонок. Если вы знаете, кто звонит, вы можете решить, кому отвечать на звонок.",
          "Избежать мошенничества. Если вы знаете, что номер принадлежит мошенникам, вы можете не отвечать на звонок и не перезванивать.",
          "Найти человека. Если вы знаете номер телефона человека, но не знаете, как его найти, вы можете использовать нашу базу данных, чтобы найти его имя и адрес."
        ]
      },
      {
        "question": "Зачем проверять звонившего?",
        "answer": "Проверка может быть полезной в различных ситуациях. Она может помочь вам защитить себя от мошенничества, избежать спама и найти человека.\tИспользуйте наш сервис проверки номеров телефонов, чтобы узнать, кто звонил вам. Это быстро, удобно и точно.",
      }]
    }
  },
  components: {
    Question
  }
}
</script>


<style scoped>

</style>