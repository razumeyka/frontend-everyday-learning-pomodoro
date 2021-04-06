document.addEventListener('DOMContentLoaded', () => {

	const pomodoroNav = document.querySelectorAll(".pomodoro__button"),
		  pomodoroButton = document.getElementById("pomodoro-btn"),
		  shortBreakButton = document.getElementById("short-break-btn"),
		  longBreakButton = document.getElementById("long-break-btn"),
		  mainPomodoroButton = document.querySelector(".pomodoro__play-btn"),
		  audio = new Audio('./sounds/sound.wav');
	
	let workingTime = 20,
		shortBreak = 5,
		longBreak = 15;
		  
	function getZero(num) {
		if ( num < 10) {
			return '0' + num;
		} else {
			return num;
		}
	}
	
	let timeInterval;
	let progressInterval;
	setClock(0);
	clearInterval(progressInterval);

	function setClock(endtime) {
		
		let time = endtime*60,
			progressRatio = 0;
		
		const timer = document.querySelector(".timer"),
			timerItem = timer.querySelectorAll(".timer__item"),
			timerField = timer.querySelectorAll("span"),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds');
		
		timeInterval = setInterval(function() {
			updateClock(time);
			time = time - 1;
			progressRatio = ((endtime * 60) - time) * 100/ (endtime * 60);
			if (progressRatio >100) {
				progressRatio = 0;
				clearInterval(progressInterval);
			}
		}, 1000);
		
		progressInterval = setInterval( function() {
			progressView(progressRatio);
		}, 60000);
		
		function updateClock(time) {
			let secondsValue = getZero(Math.floor(time % 60)),
				minutesValue = getZero(Math.floor((time / 60) % 60));
			
			minutes.textContent = minutesValue;
			seconds.textContent = secondsValue;

			if (time <= 0) {
				clearInterval(timeInterval);
				if (mainPomodoroButton.classList.contains("paused")) {
					mainPomodoroButton.classList.remove("paused");
					mainPomodoroButton.textContent = "restart";
				}
				audio.play();
			}
		}
	}
	
	// progress circle
	
	function progressView(ratio){
		let r = ratio;
		const box = document.querySelector('.diagram');
		let deg = (360 * r / 100) + 180;
		if(r >= 50){
			box.classList.add('over_50');
		}else{
			box.classList.remove('over_50');
		}
		box.querySelector('.diagram__piece_right').style.transform = 'rotate('+deg+'deg)';
	}
	progressView(0);
	
	mainPomodoroButton.addEventListener("click", function() {
		if (event.target.classList.contains("paused")) {
			event.target.classList.remove("paused");
			event.target.textContent = "pause";
			pomodoroNav[0].click();
		} else {
			clearInterval(timeInterval);
			clearInterval(progressInterval);
			event.target.classList.add("paused");
			event.target.textContent = "restart";
		}
	});
	
	pomodoroButton.addEventListener("click", function(){
		pomodoroNav.forEach( item => {
			item.classList.remove("active");
		});
		event.target.classList.add("active");
		clearInterval(timeInterval);
		clearInterval(progressInterval);
		progressView(0);
		setClock(workingTime);
		
		mainPomodoroButton.textContent = "pause";
		mainPomodoroButton.classList.remove("paused");
	});

	shortBreakButton.addEventListener("click", function(){
		pomodoroNav.forEach( item => {
			item.classList.remove("active");
		});
		event.target.classList.add("active");
		clearInterval(timeInterval);
		clearInterval(progressInterval);
		progressView(0);
		setClock(shortBreak);
		
		mainPomodoroButton.textContent = "pause";
		mainPomodoroButton.classList.remove("paused");
	});

	longBreakButton.addEventListener("click", function(){
		pomodoroNav.forEach( item => {
			item.classList.remove("active");
		});
		event.target.classList.add("active");
		clearInterval(timeInterval);
		clearInterval(progressInterval);
		progressView(0);
		setClock(longBreak);
		
		mainPomodoroButton.textContent = "pause";
		mainPomodoroButton.classList.remove("paused");
	});
	
	// modal
	
	const popup = document.querySelector(".popup"),
        popupBtn = document.querySelectorAll(".js-popup-btn"),
        popupCloseBtn = document.querySelector(".popup__close"),
		popupApplyBtn = document.querySelector(".popup__button"),
		pomodoroVal = document.getElementById("pomodoro-value"),
		shortBreakVal = document.getElementById("short-break-value"),
		longBreakVal = document.getElementById("long-break-value");

    popupBtn.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target) {
                e.preventDefault();
            }
			clearInterval(timeInterval);
			clearInterval(progressInterval);
			progressView(0);
			mainPomodoroButton.textContent = "restart";
			mainPomodoroButton.classList.add("paused");
			
            popup.style.display = "block";
            document.querySelector("body").style.overflow = "hidden";
        });
    });

    popupCloseBtn.addEventListener('click', () => {
        popup.style.display = "none";
        document.querySelector("body").style.overflow = "auto";
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
            document.querySelector("body").style.overflow = "auto";
        }
    });
	
	popupApplyBtn.addEventListener('click', () => {
		workingTime = pomodoroVal.value,
		shortBreak = shortBreakVal.value,
		longBreak = longBreakVal.value;
		popup.style.display = "none";
	});
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcblxyXG5cdGNvbnN0IHBvbW9kb3JvTmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5wb21vZG9yb19fYnV0dG9uXCIpLFxyXG5cdFx0ICBwb21vZG9yb0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicG9tb2Rvcm8tYnRuXCIpLFxyXG5cdFx0ICBzaG9ydEJyZWFrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG9ydC1icmVhay1idG5cIiksXHJcblx0XHQgIGxvbmdCcmVha0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9uZy1icmVhay1idG5cIiksXHJcblx0XHQgIG1haW5Qb21vZG9yb0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9tb2Rvcm9fX3BsYXktYnRuXCIpLFxyXG5cdFx0ICBhdWRpbyA9IG5ldyBBdWRpbygnLi9zb3VuZHMvc291bmQud2F2Jyk7XHJcblx0XHJcblx0bGV0IHdvcmtpbmdUaW1lID0gMjAsXHJcblx0XHRzaG9ydEJyZWFrID0gNSxcclxuXHRcdGxvbmdCcmVhayA9IDE1O1xyXG5cdFx0ICBcclxuXHRmdW5jdGlvbiBnZXRaZXJvKG51bSkge1xyXG5cdFx0aWYgKCBudW0gPCAxMCkge1xyXG5cdFx0XHRyZXR1cm4gJzAnICsgbnVtO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIG51bTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0bGV0IHRpbWVJbnRlcnZhbDtcclxuXHRsZXQgcHJvZ3Jlc3NJbnRlcnZhbDtcclxuXHRzZXRDbG9jaygwKTtcclxuXHRjbGVhckludGVydmFsKHByb2dyZXNzSW50ZXJ2YWwpO1xyXG5cclxuXHRmdW5jdGlvbiBzZXRDbG9jayhlbmR0aW1lKSB7XHJcblx0XHRcclxuXHRcdGxldCB0aW1lID0gZW5kdGltZSo2MCxcclxuXHRcdFx0cHJvZ3Jlc3NSYXRpbyA9IDA7XHJcblx0XHRcclxuXHRcdGNvbnN0IHRpbWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50aW1lclwiKSxcclxuXHRcdFx0dGltZXJJdGVtID0gdGltZXIucXVlcnlTZWxlY3RvckFsbChcIi50aW1lcl9faXRlbVwiKSxcclxuXHRcdFx0dGltZXJGaWVsZCA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzcGFuXCIpLFxyXG5cdFx0XHRtaW51dGVzID0gdGltZXIucXVlcnlTZWxlY3RvcignI21pbnV0ZXMnKSxcclxuXHRcdFx0c2Vjb25kcyA9IHRpbWVyLnF1ZXJ5U2VsZWN0b3IoJyNzZWNvbmRzJyk7XHJcblx0XHRcclxuXHRcdHRpbWVJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHR1cGRhdGVDbG9jayh0aW1lKTtcclxuXHRcdFx0dGltZSA9IHRpbWUgLSAxO1xyXG5cdFx0XHRwcm9ncmVzc1JhdGlvID0gKChlbmR0aW1lICogNjApIC0gdGltZSkgKiAxMDAvIChlbmR0aW1lICogNjApO1xyXG5cdFx0XHRpZiAocHJvZ3Jlc3NSYXRpbyA+MTAwKSB7XHJcblx0XHRcdFx0cHJvZ3Jlc3NSYXRpbyA9IDA7XHJcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbChwcm9ncmVzc0ludGVydmFsKTtcclxuXHRcdFx0fVxyXG5cdFx0fSwgMTAwMCk7XHJcblx0XHRcclxuXHRcdHByb2dyZXNzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCggZnVuY3Rpb24oKSB7XHJcblx0XHRcdHByb2dyZXNzVmlldyhwcm9ncmVzc1JhdGlvKTtcclxuXHRcdH0sIDYwMDAwKTtcclxuXHRcdFxyXG5cdFx0ZnVuY3Rpb24gdXBkYXRlQ2xvY2sodGltZSkge1xyXG5cdFx0XHRsZXQgc2Vjb25kc1ZhbHVlID0gZ2V0WmVybyhNYXRoLmZsb29yKHRpbWUgJSA2MCkpLFxyXG5cdFx0XHRcdG1pbnV0ZXNWYWx1ZSA9IGdldFplcm8oTWF0aC5mbG9vcigodGltZSAvIDYwKSAlIDYwKSk7XHJcblx0XHRcdFxyXG5cdFx0XHRtaW51dGVzLnRleHRDb250ZW50ID0gbWludXRlc1ZhbHVlO1xyXG5cdFx0XHRzZWNvbmRzLnRleHRDb250ZW50ID0gc2Vjb25kc1ZhbHVlO1xyXG5cclxuXHRcdFx0aWYgKHRpbWUgPD0gMCkge1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZUludGVydmFsKTtcclxuXHRcdFx0XHRpZiAobWFpblBvbW9kb3JvQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcInBhdXNlZFwiKSkge1xyXG5cdFx0XHRcdFx0bWFpblBvbW9kb3JvQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJwYXVzZWRcIik7XHJcblx0XHRcdFx0XHRtYWluUG9tb2Rvcm9CdXR0b24udGV4dENvbnRlbnQgPSBcInJlc3RhcnRcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0YXVkaW8ucGxheSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdFxyXG5cdC8vIHByb2dyZXNzIGNpcmNsZVxyXG5cdFxyXG5cdGZ1bmN0aW9uIHByb2dyZXNzVmlldyhyYXRpbyl7XHJcblx0XHRsZXQgciA9IHJhdGlvO1xyXG5cdFx0Y29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpYWdyYW0nKTtcclxuXHRcdGxldCBkZWcgPSAoMzYwICogciAvIDEwMCkgKyAxODA7XHJcblx0XHRpZihyID49IDUwKXtcclxuXHRcdFx0Ym94LmNsYXNzTGlzdC5hZGQoJ292ZXJfNTAnKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRib3guY2xhc3NMaXN0LnJlbW92ZSgnb3Zlcl81MCcpO1xyXG5cdFx0fVxyXG5cdFx0Ym94LnF1ZXJ5U2VsZWN0b3IoJy5kaWFncmFtX19waWVjZV9yaWdodCcpLnN0eWxlLnRyYW5zZm9ybSA9ICdyb3RhdGUoJytkZWcrJ2RlZyknO1xyXG5cdH1cclxuXHRwcm9ncmVzc1ZpZXcoMCk7XHJcblx0XHJcblx0bWFpblBvbW9kb3JvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuXHRcdGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGF1c2VkXCIpKSB7XHJcblx0XHRcdGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwicGF1c2VkXCIpO1xyXG5cdFx0XHRldmVudC50YXJnZXQudGV4dENvbnRlbnQgPSBcInBhdXNlXCI7XHJcblx0XHRcdHBvbW9kb3JvTmF2WzBdLmNsaWNrKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjbGVhckludGVydmFsKHRpbWVJbnRlcnZhbCk7XHJcblx0XHRcdGNsZWFySW50ZXJ2YWwocHJvZ3Jlc3NJbnRlcnZhbCk7XHJcblx0XHRcdGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwicGF1c2VkXCIpO1xyXG5cdFx0XHRldmVudC50YXJnZXQudGV4dENvbnRlbnQgPSBcInJlc3RhcnRcIjtcclxuXHRcdH1cclxuXHR9KTtcclxuXHRcclxuXHRwb21vZG9yb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuXHRcdHBvbW9kb3JvTmF2LmZvckVhY2goIGl0ZW0gPT4ge1xyXG5cdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHR9KTtcclxuXHRcdGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdFx0Y2xlYXJJbnRlcnZhbCh0aW1lSW50ZXJ2YWwpO1xyXG5cdFx0Y2xlYXJJbnRlcnZhbChwcm9ncmVzc0ludGVydmFsKTtcclxuXHRcdHByb2dyZXNzVmlldygwKTtcclxuXHRcdHNldENsb2NrKHdvcmtpbmdUaW1lKTtcclxuXHRcdFxyXG5cdFx0bWFpblBvbW9kb3JvQnV0dG9uLnRleHRDb250ZW50ID0gXCJwYXVzZVwiO1xyXG5cdFx0bWFpblBvbW9kb3JvQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJwYXVzZWRcIik7XHJcblx0fSk7XHJcblxyXG5cdHNob3J0QnJlYWtCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHRwb21vZG9yb05hdi5mb3JFYWNoKCBpdGVtID0+IHtcclxuXHRcdFx0aXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG5cdFx0fSk7XHJcblx0XHRldmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuXHRcdGNsZWFySW50ZXJ2YWwodGltZUludGVydmFsKTtcclxuXHRcdGNsZWFySW50ZXJ2YWwocHJvZ3Jlc3NJbnRlcnZhbCk7XHJcblx0XHRwcm9ncmVzc1ZpZXcoMCk7XHJcblx0XHRzZXRDbG9jayhzaG9ydEJyZWFrKTtcclxuXHRcdFxyXG5cdFx0bWFpblBvbW9kb3JvQnV0dG9uLnRleHRDb250ZW50ID0gXCJwYXVzZVwiO1xyXG5cdFx0bWFpblBvbW9kb3JvQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJwYXVzZWRcIik7XHJcblx0fSk7XHJcblxyXG5cdGxvbmdCcmVha0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuXHRcdHBvbW9kb3JvTmF2LmZvckVhY2goIGl0ZW0gPT4ge1xyXG5cdFx0XHRpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblx0XHR9KTtcclxuXHRcdGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG5cdFx0Y2xlYXJJbnRlcnZhbCh0aW1lSW50ZXJ2YWwpO1xyXG5cdFx0Y2xlYXJJbnRlcnZhbChwcm9ncmVzc0ludGVydmFsKTtcclxuXHRcdHByb2dyZXNzVmlldygwKTtcclxuXHRcdHNldENsb2NrKGxvbmdCcmVhayk7XHJcblx0XHRcclxuXHRcdG1haW5Qb21vZG9yb0J1dHRvbi50ZXh0Q29udGVudCA9IFwicGF1c2VcIjtcclxuXHRcdG1haW5Qb21vZG9yb0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwicGF1c2VkXCIpO1xyXG5cdH0pO1xyXG5cdFxyXG5cdC8vIG1vZGFsXHJcblx0XHJcblx0Y29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwXCIpLFxyXG4gICAgICAgIHBvcHVwQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1wb3B1cC1idG5cIiksXHJcbiAgICAgICAgcG9wdXBDbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2Nsb3NlXCIpLFxyXG5cdFx0cG9wdXBBcHBseUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBfX2J1dHRvblwiKSxcclxuXHRcdHBvbW9kb3JvVmFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwb21vZG9yby12YWx1ZVwiKSxcclxuXHRcdHNob3J0QnJlYWtWYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3J0LWJyZWFrLXZhbHVlXCIpLFxyXG5cdFx0bG9uZ0JyZWFrVmFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb25nLWJyZWFrLXZhbHVlXCIpO1xyXG5cclxuICAgIHBvcHVwQnRuLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcblx0XHRcdGNsZWFySW50ZXJ2YWwodGltZUludGVydmFsKTtcclxuXHRcdFx0Y2xlYXJJbnRlcnZhbChwcm9ncmVzc0ludGVydmFsKTtcclxuXHRcdFx0cHJvZ3Jlc3NWaWV3KDApO1xyXG5cdFx0XHRtYWluUG9tb2Rvcm9CdXR0b24udGV4dENvbnRlbnQgPSBcInJlc3RhcnRcIjtcclxuXHRcdFx0bWFpblBvbW9kb3JvQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwYXVzZWRcIik7XHJcblx0XHRcdFxyXG4gICAgICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5zdHlsZS5vdmVyZmxvdyA9IFwiaGlkZGVuXCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBwb3B1cENsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXApIHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKS5zdHlsZS5vdmVyZmxvdyA9IFwiYXV0b1wiO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cdFxyXG5cdHBvcHVwQXBwbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblx0XHR3b3JraW5nVGltZSA9IHBvbW9kb3JvVmFsLnZhbHVlLFxyXG5cdFx0c2hvcnRCcmVhayA9IHNob3J0QnJlYWtWYWwudmFsdWUsXHJcblx0XHRsb25nQnJlYWsgPSBsb25nQnJlYWtWYWwudmFsdWU7XHJcblx0XHRwb3B1cC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcblx0fSk7XHJcbn0pOyJdLCJmaWxlIjoibWFpbi5qcyJ9
