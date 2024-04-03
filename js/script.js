window.addEventListener("DOMContentLoaded", () => {
  const tabsParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    loader = document.querySelector(".loader");

  // Loader
  // setTimeout(() => {
  //   loader.style.opacity = '0'
  //   setTimeout(() => {
  //     loader.style.display = 'none'
  //   }, 500)
  // }, 2000)

  // Tabs
  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, idx) => {
        if (target == item) {
          hideTabContent();
          showTabContent(idx);
        }
      });
    }
  });

  // Timer

  // const deadline = '2022-08-11'

  // new deadline
  const deadline = "2024-08-18";

  function getTimeRemaining(endtime) {
    let days, hours, minutes, seconds;
    const timer = Date.parse(endtime) - Date.parse(new Date());

    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / 1000 / 60) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }

    return { timer, days, hours, minutes, seconds };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updatClock, 1000);

    updatClock();

    function updatClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.timer <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Men ketaman endi boshqa joyarga
  // Xayol-xotirangdan ketaman yiroq,
  // Men ketaman endi boshqa yerlarga,
  // Erkin yashayvergin endi to abad,
  // MEN KETAMAN ENDI BOSHQA SHAHARGA ,
  // ENDI QURAVERGIN O'Z ORZUINGNI
  // Men ketaman endi boshqa yerlarga,
  // Balki vaqti keldi sening davringni
  // Men endi ketaman bu o'lkalardan
  // O'y-xayolingdan ketaman butkul
  // Balki bo'lgandirman yomon qahramon
  // Ba'zi odamlarning hikoyasinda
  // Balki bo'lgandirman yaxshi qahramon
  // Bizni tushunguvchi oddiy dillarda
  // Men kettim afsus bu o'lkalardan
  // Taqdir aytmagandi baxtni bu yerda

  // Modal
  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  // DRY
  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    // modalni bajarish uchun
    // document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  // O'chirish uchun 2-usul

  modal.addEventListener("click", (e) => {
    if (e.target == modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });
  // Escape tugmasi bosilganda ham modalni o'chirish

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
  // Modalni avtomatik tarzda qayta chiqarish

  const modalTimerId = setTimeout(openModal, 3000);

  console.log();

  function showModal() {
    if (
      window.scrollY + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModal);
    }
  }
  window.addEventListener("scroll", showModal);

  // Loyiha Class

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      (this.src = src),
        (this.alt = alt),
        (this.title = title),
        (this.descr = descr),
        (this.price = price),
        (this.transfer = 11000),
        (this.parent = document.querySelector(parentSelector));
      this.changeToUZS();
    }
    changeToUZS() {
      this.price = this.price * this.transfer;
    }
    render() {
      const element = document.createElement("div");
      element.innerHTML = `
        <div class="menu__item">
          <img src="${this.src}" alt="${this.alt}" />
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.descr}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Price:</div>
            <div class="menu__item-total"><span>${this.price}</span>uzs/month</div>
          </div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  // new MenuCard(
  //   "img/tabs/1.png",
  //   "usual",
  //   'Plan "Usual"',
  //   "Loream ipsum, dolor sit amet consectetur adibpisicing elit",
  //   10,
  //   ".menu .container"
  // ).render();

  // new MenuCard(
  //   "img/tabs/2.jpg",
  //   "Plan",
  //   'Plan "Premium"',
  //   "Loream ipsum, dolor sit amet consectetur adibpisicing elit",
  //   20,
  //   ".menu .container"
  // ).render();

  // new MenuCard(
  //   "img/tabs/3.jpg",
  //   "vip",
  //   'Plan "VIP"',
  //   "Loream ipsum, dolor sit amet consectetur adibpisicing elit",
  //   10,
  //   ".menu .container"
  // ).render();

  // ============== 65-dars.Get request/resource ===============
  // Menejerlar ma'lumotni o'zgartirishi uchun qulaylik yaratish kerak

  // async function getRecource(url) {
  //   const res = await fetch(url);

  //   return res.json();
  // }

  // getRecource("http://localhost:3000/menu").then((data) => {
  //   console.log(data);
  //   // data.forEach((obj)=>{
  //   //   new MenuCard(obj.img,obj.alt,obj).render()
  //   // })
  //   //2-way.Destruptizatsiya
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       ".menu .container"
  //     ).render();
  //   });
  // });

  // ========== 66-dars.AXIOS ============//
  axios.get("http://localhost:3000/menu").then((data) => {
    data.data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });

  // 56. Form

  const form = document.querySelectorAll("form");
  const msg = {
    loading: "/img/bars-spinner.svg",
    success: "Thanks for submitting our form",
    failure: "Something went wrong",
  };
  form.forEach((form) => {
    bindPostData(form);
  });

  // =====64-DARS==========
  // asnc va await ES-8 . ASYNC - BU ASINXRONLIKNI TA'MINLAB SERVERDAN JAVOB KELISHINI KUTISHDA SUNKSIYANING ASINXRON ISHLASHINI TA'MINLAYDI
  //AWAIT - SERVERDAN JAVOB KELISHINI KUTADI

  async function postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    return await res.json();
  }

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = msg.loading;
      statusMessage.style.cssText = `
        display:block;
        margin:0 auto;
      `;

      form.insertAdjacentElement("afterend", statusMessage);

      //request.setRequestHeader("Content-Type", "multipart/form-data"); // Lekin biz form konstruktorini yaratganimizda ushbu sarlavaha formning o'zi bilan keladi
      const formData = new FormData(form);
      // const obj = {};

      // formData.forEach((val,key)=>{
      //   obj[key] = val;
      // });

      // const json = JSON.stringify(obj);

      /// ===============Fetch bilan ishlash========================
      // 1-usul

      // fetch("server.php", {
      //   method: "POST",
      //   body: formData,
      // })
      // 2-usul
      // JSON ishlatganligimiz uchun headers metodidan foydalanamiz

      // ====== objto json 1-way
      // const obj = {};

      // formData.forEach((val, key) => {
      //   obj[key] = val;
      // });
      // obj to json 2-way

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/request", json)
        .then((data) => {
          console.log(data);
          showThanksModal(msg.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(msg.failure);
        })
        .finally(() => {
          form.reset();
        });

      // request.addEventListener("load", () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(msg.success);
      //   } else {
      //     showThanksModal(msg.failure);
      //   }
      //   form.reset();
      //   setTimeout(() => {
      //     statusMessage.remove();
      //     closeModal();
      //   }, 2000);
      // });
    });
  }

  // 57-dars. Dynamic styling.MOdal oynani yo'q qilish msg textni o'zini ko'rsatish

  //modal oyna chiqishiga javob beruvchi funksiya
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div"); // eski modal oynani yo'qotib yashin tezligida yangi modlni ochish
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div close="modal__title">
        ${message}
        </div> 
      </div>
    `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal();
    }, 4000);
  }

  // 60-dars.Fetch API - Fetch Application Programming Interface
  // DOM API, Google Map API, Google Place API|||||||||||||||||||
  // FetchAPI brauzerda bo'ladi va u tashqi APIlarga so'rov yuborishga yordam beradi
  // fetch("https://fakestoreapi.com/products/1")
  //   .then((res) => {
  //     console.log(res); // res bu umumiy so'rovni qaytaradi pastdagi json() metodi undagi kerakli jsonni ob'ektga o'girib beradi
  //     return res.json();  // json()-- metod bu serverdan kelayotgn JSON formatdagi m'lumotni obe'ktga o'girib beruvchi metod( fetch orqali faqat resolve format kelganda )

  //   })
  //   .then((json) => console.log(json));

  // Fetch API orqali yangi qiymat joylash "POST" metodi.Bunda fetch()ning 2-parametriga so'rov moslashtiriladi
  // fetch("https://jsonplaceholder.typicode.com/posts",{
  //   method:"POST",
  //   headers:{
  //     "Content-Type":"application/json",
  //   },
  //   body:JSON.stringify({name:'samar1'}),
  // })
  // .then((response)=>{
  //   console.log(response);
  //   return response.json()})
  // .then((json)=>{console.log(json)}); // POST so'rovning javobi shu yerda ko'rinadi

  //=========== 67-dars .Slider ===================//

  const slides = document.querySelectorAll(".offer__slide"),
    next = document.querySelector(".offer__slider-next"),
    prev = document.querySelector(".offer__slider-prev"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current");

  let sliderIndex = 1;

  if(slides.length<10){
    total.textContent = `0${slides.length}`;
  }else{
    total.textContent = slides.length;
  }
  showSlides();
  function showSlides(idx){
    if(idx>slides.length){
      sliderIndex =1
    }
    else if(idx<1){
      sliderIndex = slides.length;
    }
    slides.forEach((item)=>{
      item.style.display = 'none';
    });
    slides[sliderIndex-1].style.display='block';
    if(slides.length<10){
      current.textContent = `0${sliderIndex}`;
    }else{
      current.textContent =sliderIndex;
    }
  }

  function plusSlides(idx){
    showSlides(sliderIndex+=idx);
  }

  next.addEventListener('click',()=>{
    plusSlides(1);
  })
  prev.addEventListener('click',()=>{
    plusSlides(-1);
  })

  // showSlides(1);
  // function showSlides(idx){
  //   if(idx>slides.length){
  //     sliderIndex=1;
  //   }
  //   else if(idx<1){
  //     sliderIndex = slides.length;
  //   }
  //   slides.forEach((item)=>{
  //     item.style.display = 'none';
  //   });
  //   slides[sliderIndex-1].style.display = 'block';
  // }
  // function plusSlides(idx){
  //   showSlides(sliderIndex+=idx)
  // }

  // next.addEventListener('click',()=>{
  //   plusSlides(1);
  // });
  // prev.addEventListener('click',()=>{
  //   plusSlides(-1);
  // })
});
