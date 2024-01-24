// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  //@ts-ignore
  app: {
    head: {
      htmlAttrs: {
        lang: "ru",
      },
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Пробить номер - узнать кто звонил по номеру телефона",
      meta: [
        {
          name: "description",
          content:
             "Узнайте кто звонил по номеру телефона. Обширная база данных позволит пробить номер и проверить кому принадлежит телефон. Проверка информации о человеке по номеру телефона."
                },
        {
          name: "keywords",
          content:
              "unmasking , unmasking.net , Узнайте кто звонил по номеру телефона. Обширная база данных позволит пробить номер и проверить кому принадлежит телефон. Проверка информации о человеке по номеру телефона.",
        },
        {
          name: "canonical",
          content: "https://unmasking.net/",
        },
        {
          name: "robots",
          content: "index, follow",
        },
        {
          property: "og:title",
          content:
              "Пробить номер - узнать кто звонил по номеру телефона",
        },
        {
          property: "og:description",
          content:
              "Узнайте кто звонил по номеру телефона. Обширная база данных позволит пробить номер и проверить кому принадлежит телефон. Проверка информации о человеке по номеру телефона.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: "https://unmasking.net/",
        },
        {
          property: "og:image",
          content: "./favicon.ico",
        },
        {
          name: "twitter:title",
          content: "Пробить номер - узнать кто звонил по номеру телефона",
        },
        {
          name: "twitter:description",
          content:
             "Узнайте кто звонил по номеру телефона. Обширная база данных позволит пробить номер и проверить кому принадлежит телефон. Проверка информации о человеке по номеру телефона."
               },
        {
          name: "twitter:image",
          content: "./favicon.ico",
        }
      ],
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto:wght@500&display=swap',
          rel: 'stylesheet',
          async: true,
        },
      ],
      script: [
        {
          type: 'text/javascript',
          async: true,
          innerHTML: `
          setTimeout(function () {
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) {
                  return;
                }
              }
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
            })
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(96078287, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          }, 5000);
        `,
        },
        {
          src: 'https://www.google.com/recaptcha/api.js',
          async: true,
        },
      ],
    },
  },
  modules: ["@nuxtjs/robots" , 'nuxt-simple-sitemap'],
  robots: process.env.NODE_ENV != 'production' ? {
    // @ts-ignore
    UserAgent: '*',
    Disallow: ''
  } : {
    UserAgent: '*',
    Allow: '*',
  },
  site: {
    url: 'https://unmasking.net',
  },
  runtimeConfig: {
    public: {
      API_BASE_URL:
          process.env.API_BASE_URL || "https://unmasking.net/api/auth/",
         },
  },
  globalProperties: {
    $api_url: 'http://127.0.0.1:8000/api/',
  },
})
