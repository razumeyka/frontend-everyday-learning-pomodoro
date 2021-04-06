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