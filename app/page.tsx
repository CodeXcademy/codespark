"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "المنهج الدراسي", href: "#curriculum" },
  { label: "الأسعار", href: "#pricing" },
  { label: "الأسئلة الشائعة", href: "#faq" },
  { label: "التقييمات", href: "#reviews" }
];

const benefits = [
  {
    title: "أوقف تراجع الصيف",
    copy: "حافظ على تفاعل عقولهم مع الألغاز المنطقية وحل المشكلات المتنكرة في شكل ألعاب ممتعة للغاية.",
    icon: "trending_up",
    headerClass: "bg-emerald text-on-primary"
  },
  {
    title: "ساعتان تصنعان الفارق",
    copy: "فقط ساعتان يومياً من التعلم المنظم. بقية اليوم للعب في الخارج. تم تحقيق التوازن.",
    icon: "timer",
    headerClass: "bg-hot-pink text-on-primary"
  },
  {
    title: "بناء شيء حقيقي",
    copy: "لن يتعلموا النظريات فقط. بحلول الأسبوع الرابع، سيكون لديهم لعبة قابلة للعب يمكنهم مشاركتها مع الأصدقاء.",
    icon: "videogame_asset",
    headerClass: "bg-amber text-slate-dark"
  }
];

export default function Home() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.get("email"),
          childAge: formData.get("childAge")
        })
      });
      const result = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.message ?? "Lead capture failed.");
      }

      form.reset();
      setMessage("تم تسجيل اهتمامك. سنرسل الحقيبة المجانية قريباً.");
    } catch {
      setMessage("تعذر إرسال الطلب الآن. يرجى المحاولة مرة أخرى بعد قليل.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <header className="fixed right-0 top-0 z-50 flex h-20 w-full items-center justify-between border-b-2 border-on-background bg-surface px-5 shadow-[-4px_4px_0px_0px_rgba(29,26,35,1)] md:px-margin">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <a
            className="font-headline-md text-headline-md font-extrabold text-primary"
            href="#top"
          >
            أكاديمية كود سبارك
          </a>

          <nav className="hidden h-full items-center gap-gutter md:flex">
            {navLinks.map((link) => (
              <a
                className="font-label-bold text-label-bold text-on-surface-variant transition-all duration-200 hover:-translate-x-[2px] hover:translate-y-[2px] hover:text-primary"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            className="neo-border neo-shadow neo-button-hover neo-button-active hidden rounded-full bg-primary px-md py-sm font-label-bold text-label-bold text-on-primary transition-all duration-200 md:block"
            href="#reserve"
          >
            انضم لقائمة الانتظار
          </a>
        </div>
      </header>

      <main
        className="mx-auto max-w-7xl px-5 pt-[120px] md:px-margin"
        id="top"
      >
        <section className="relative grid grid-cols-1 gap-gutter py-xl md:grid-cols-12">
          <div className="absolute right-[-5%] top-10 z-[-1] h-24 w-24 rounded-full bg-amber opacity-50 blur-xl" />
          <div className="absolute bottom-10 left-[-5%] z-[-1] h-32 w-32 rounded-full bg-hot-pink opacity-50 blur-xl" />

          <div className="relative z-10 flex flex-col justify-center md:col-span-6">
            <h1 className="mb-md font-display-xl text-[40px] font-extrabold leading-[1.15] text-on-surface md:text-display-xl">
              امنح طفلك انطلاقة قوية قبل أن يغير الذكاء الاصطناعي كل شيء
            </h1>
            <p className="mb-lg font-body-lg text-body-lg text-on-surface-variant">
              بناء مشاريع برمجية حقيقية. شحذ مهارات حل المشكلات. تحويل وقت
              الشاشة في الصيف إلى مهارات جاهزة للمستقبل.
            </p>

            <div
              className="neo-border neo-shadow-lg relative max-w-md rounded-xl bg-surface p-md"
              id="reserve"
            >
              <div className="neo-border neo-shadow absolute -left-4 -top-4 -rotate-12 rounded-lg bg-emerald px-sm py-xs font-label-bold text-label-bold text-on-primary">
                باقة مجانية
              </div>
              <h2 className="mb-sm font-headline-md text-headline-md">
                احجز مكانك
              </h2>
              <form className="flex flex-col gap-sm" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="email">
                  بريد ولي الأمر الإلكتروني
                </label>
                <input
                  className="neo-border h-16 rounded-full px-md font-body-md text-body-md transition-all focus:border-[4px] focus:border-primary focus:outline-none focus:ring-0"
                  id="email"
                  name="email"
                  placeholder="بريد ولي الأمر الإلكتروني"
                  required
                  type="email"
                />
                <label className="sr-only" htmlFor="age">
                  عمر الطفل
                </label>
                <select
                  className="neo-border h-16 appearance-none rounded-full bg-white px-md font-body-md text-body-md transition-all focus:border-[4px] focus:border-primary focus:outline-none focus:ring-0"
                  id="age"
                  name="childAge"
                  required
                >
                  <option value="">عمر الطفل (7-14)</option>
                  <option value="7-9">7-9 سنوات</option>
                  <option value="10-12">10-12 سنة</option>
                  <option value="13-14">13-14 سنة</option>
                </select>
                <button
                  className="neo-border neo-shadow neo-button-hover neo-button-active mt-sm flex h-16 items-center justify-center gap-2 rounded-full bg-hot-pink px-md font-headline-md text-[20px] font-extrabold text-on-primary transition-all md:text-headline-md"
                  disabled={isSubmitting}
                  type="submit"
                >
                  <span>
                    {isSubmitting
                      ? "جاري الإرسال..."
                      : "أرسل لي حقيبتي المجانية"}
                  </span>
                  <span aria-hidden="true" dir="ltr">
                    ←
                  </span>
                </button>
                {message ? (
                  <p
                    aria-live="polite"
                    className="font-label-bold text-label-bold text-emerald"
                  >
                    {message}
                  </p>
                ) : null}
              </form>
            </div>
          </div>

          <div className="relative flex min-h-[420px] items-center justify-center md:col-span-6 md:min-h-[500px]">
            <Image
              alt="مجموعة من الأطفال السعداء يتعاونون في مشروع برمجة داخل مساحة تعليمية مشرقة."
              className="neo-border neo-shadow-lg z-10 h-full w-full rounded-[2rem] object-cover"
              height={720}
              priority
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKpTkRixevTdW3RkZ462r1cpfpRddXdt6KHcl6JaLmgx1JOIQgJwkCeZ5VVyi8DDkOq9FmjBtVEFnBySipurQ_-ZelJ0jWWf75NT5miWm8SmyC7UNh8L05MwNg_q5qOAjfahUY9TO3dHXDYSGIglz_lZtfqR6OtVSfBhTBiQMHkkHjvU_9a6uAH9DyD8em2gt_uz_xZYnWINc-vAHQ1tVETpxdIN7BNm8_wdYSudboELYSeThNz7xvfHXpWPd7jW3txjj4F-Jn89P0"
              unoptimized
              width={720}
            />
            <div className="neo-border neo-shadow absolute right-[-10px] top-[10%] z-20 flex h-20 w-20 items-center justify-center rounded-full bg-emerald md:right-[-10%]">
              <span className="material-symbols-outlined text-[40px] text-white">
                code
              </span>
            </div>
            <div className="neo-border neo-shadow absolute bottom-[20%] left-[-5px] z-20 flex h-24 w-24 -rotate-12 items-center justify-center rounded-lg bg-amber md:left-[-5%]">
              <span className="material-symbols-outlined text-[48px] text-white">
                rocket_launch
              </span>
            </div>
          </div>
        </section>

        <section className="py-xl text-center" id="curriculum">
          <h2 className="mb-lg font-headline-lg text-headline-lg">
            صيف آخر من وقت الشاشة السلبي؟
          </h2>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-gutter md:grid-cols-2">
            <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-outline-variant bg-surface-variant p-lg opacity-80 grayscale">
              <span className="material-symbols-outlined mb-sm text-6xl text-on-surface-variant [font-variation-settings:'FILL'_1]">
                phone_iphone
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface-variant">
                تمرير بلا تفكير
              </h3>
            </div>
            <div className="neo-border neo-shadow-lg relative flex flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-surface p-lg">
              <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-transparent" />
              <span className="material-symbols-outlined relative z-10 mb-sm text-6xl text-primary [font-variation-settings:'FILL'_1]">
                build_circle
              </span>
              <h3 className="relative z-10 font-headline-md text-headline-md text-on-surface">
                بناء نشط
              </h3>
            </div>
          </div>
        </section>

        <section className="py-xl" id="reviews">
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {benefits.map((benefit) => (
              <article
                className="neo-border neo-shadow-lg flex flex-col overflow-hidden rounded-xl bg-surface"
                key={benefit.title}
              >
                <div
                  className={`flex items-center justify-between border-b-[3px] border-slate-dark p-md ${benefit.headerClass}`}
                >
                  <h3 className="font-headline-md text-headline-md">
                    {benefit.title}
                  </h3>
                  <span className="material-symbols-outlined text-3xl">
                    {benefit.icon}
                  </span>
                </div>
                <div className="flex-grow p-md">
                  <p className="font-body-md text-body-md">{benefit.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="mt-xl flex w-full flex-col items-center justify-between gap-gutter border-t-2 border-on-background bg-surface-container px-5 py-lg md:flex-row md:px-margin">
        <div className="font-headline-md text-headline-md text-primary">
          أكاديمية كود سبارك
        </div>
        <div className="flex flex-wrap justify-center gap-md font-label-bold text-label-bold">
          <a
            className="text-on-surface-variant transition-colors duration-200 hover:text-secondary"
            href="#privacy"
          >
            سياسة الخصوصية
          </a>
          <a
            className="text-on-surface-variant transition-colors duration-200 hover:text-secondary"
            href="#terms"
          >
            شروط الخدمة
          </a>
          <a
            className="text-on-surface-variant transition-colors duration-200 hover:text-secondary"
            href="#support"
          >
            تواصل مع الدعم
          </a>
          <a
            className="text-on-surface-variant transition-colors duration-200 hover:text-secondary"
            href="#coaches"
          >
            بوابة المدربين
          </a>
        </div>
        <div className="text-center font-body-md text-body-md text-on-surface md:text-left">
          © 2024 أكاديمية كود سبارك الصيفية. نبني المستقبل، كتلة تلو الأخرى.
        </div>
      </footer>
    </>
  );
}
