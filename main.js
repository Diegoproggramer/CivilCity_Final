
/* ------------------ CivilCity - انجمن علمی مهندسی عمران دانشگاه تبریز ------------------ */
/* اتصال به Firebase و منطق کلی سایت */

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore";

/* 2️⃣ پیکربندی Firebase پروژه (داده‌هایی که کاربر فرستاده) */
const firebaseConfig = {
  apiKey: "AIzaSyCHsEL2gJlWvOqGiMCvdH1tIwTQiQCGsT8",
  authDomain: "civilcity-571f5.firebaseapp.com",
  projectId: "civilcity-571f5",
  storageBucket: "civilcity-571f5.firebasestorage.app",
  messagingSenderId: "60284437245",
  appId: "1:60284437245:web:0f2343d8fcb46abc493494",
  measurementId: "G-LPY7R0MJT3"
};

// مقداردهی اولیه Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

/* ------------------ مدیریت ارسال مقاله‌ها ------------------ */
async function addArticle(event) {
  event.preventDefault();
  const titleInput = document.getElementById("title").value.trim();
  const authorInput = document.getElementById("author").value.trim();
  const contentInput = document.getElementById("content").value.trim();

  if (titleInput === "" || authorInput === "" || contentInput === "") {
    alert("⚠️ لطفاً همه فیلدها را پر کنید.");
    return;
  }

  try {
    await addDoc(collection(db, "articles"), {
      title: titleInput,
      author: authorInput,
      content: contentInput,
      timestamp: serverTimestamp(),
    });
    alert("✅ مقاله با موفقیت ارسال شد!");
    document.getElementById("addArticleForm").reset();
  } catch (error) {
    console.error("❌ خطا در ارسال مقاله:", error);
    alert("در ارسال مقاله خطایی رخ داد. لطفاً دوباره امتحان کنید.");
  }
}

/* ------------------ نمایش مقاله‌ها در صفحه اصلی ------------------ */
async function displayArticles() {
  const articlesContainer = document.getElementById("articles-list");
  if (!articlesContainer) return;

  articlesContainer.innerHTML = "<p>📦 در حال بارگذاری مقاله‌ها...</p>";
  try {
    const q = query(collection(db, "articles"), orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      articlesContainer.innerHTML = "<p>هنوز مقاله‌ای ثبت نشده است.</p>";
      return;
    }

    articlesContainer.innerHTML = "";
    snapshot.forEach(doc => {
      const article = doc.data();
      const articleEl = document.createElement("div");
      articleEl.classList.add("article");

      articleEl.innerHTML = `
        <h3>${article.title}</h3>
        <p class="author">✍️ ${article.author}</p>
        <p class="content">${article.content}</p>
        <hr>
      `;
      articlesContainer.appendChild(articleEl);
    });
  } catch (error) {
    console.error("❌ خطا در خواندن مقاله‌ها:", error);
    articlesContainer.innerHTML = "<p>در بارگذاری مقاله‌ها خطایی رخ داد.</p>";
  }
}

/* ------------------ حالت روز / شب ------------------ */
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
  body.classList.add("light-mode");
}
function toggleTheme() {
  body.classList.toggle("light-mode");
  const theme = body.classList.contains("light-mode") ? "light" : "dark";
  localStorage.setItem("theme", theme);
}
if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}
body.style.transition = "background-color 0.3s ease, color 0.3s ease";

/* ------------------ فراخوانی بخش‌ها بسته به صفحه ------------------ */
if (document.getElementById("addArticleForm")) {
  document.getElementById("addArticleForm").addEventListener("submit", addArticle);
}
if (document.getElementById("articles-list")) {
  displayArticles();
}
