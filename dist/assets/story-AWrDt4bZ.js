import"./main-Bdv2zyuu.js";(function(){if(sessionStorage.getItem(`storyAccess`)===`granted`){sessionStorage.getItem(`betaNoticeShown`)||(alert(`⚠️ BETA VERSION

This page is currently a work in progress.
Soon it will be completed so you can enjoy the full experience.

Thank you for your patience! 🙏`),sessionStorage.setItem(`betaNoticeShown`,`true`));return}let e=[`fatima`,`ameerah`,`husna`,`maishanu`],t=prompt(`This page is private.

Please enter your name to continue:`);if(!t){alert(`Access denied. Redirecting to home page.`),window.location.href=`index.html`;return}e.includes(t.toLowerCase().trim())?(sessionStorage.setItem(`storyAccess`,`granted`),alert(`Welcome, `+t+`! 👋

⚠️ BETA VERSION

This page is currently a work in progress.
Soon it will be completed so you can enjoy the full experience.

Thank you for your patience! 🙏`),sessionStorage.setItem(`betaNoticeShown`,`true`)):(alert(`Sorry, this content is private.
Redirecting to home page.`),window.location.href=`index.html`)})();