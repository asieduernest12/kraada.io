function GhanaianName() {
	// let _name;
	let _week_day;
	let _sex;
	let _kinships;

	return {
		findDay,
		getDay,
		getKinship,
		loadKinship,
		goToDaySection,
		goToDayRevealSection,
		reveal,
		navigate,
	};

	function navigate(destination) {
		let _destination = destination ?? "#";
		window.location = window.location.pathname + _destination;
	}
	function goToDaySection(event) {
		event.preventDefault();
		_sex = event.submitter.value;
		if (_sex) navigate("#day_section");
	}


	function findDay() {
		const day = document.querySelector("[name=day]").value;
		const month = document.querySelector("[name=month]").value;
		const year = document.querySelector("[name=year]").value;

		if (day == undefined || month == undefined || year == undefined) {
			alert("enter a valid date");
			return;
		}

		_week_day = new Date(`${year}-${month}-${day}`).getDay();

		return (_week_day + 1) % 6; // _week_day is coming back as correct - 1, so adjustment is needed, text again in the future using current day
	}

	function getDay(event) {
		return event.submitter.name == "day_radio" ? event.submitter.value : null;
	}

	function getKinship(_week_day, _sex) {
		if (!!!_sex) navigate("#yom__name_sex");

		const day_key = Object.keys(_kinships)[_week_day];
		return [_kinships[day_key][_sex], day_key];
	}

	function goToDayRevealSection(event) {
		event.preventDefault();
		let _day = event.submitter.name == "find_day" ? findDay() : getDay(event);
		_kinship = getKinship(_day, _sex);

		reveal(_kinship);
	}
	async function loadKinship() {
		let temp = await fetch("js/info.js").then((res) => res.json());
		_kinships = temp[0];
		console.table(_kinships);
	}

	function reveal([_kinship, day_key]) {
		// document.querySelector("span.first_name").innerHTML = kinnames[0];
		document.querySelector(".day_name").innerHTML = _kinship.names[0];
		document.querySelector(".text__day").innerHTML = day_key;
		document.querySelector(".reveal__attributes").innerHTML = _kinship.characteristics.map((_char) => `<li class="reveal__attribute_item">${_char}</li>`).join("");
		window.location = window.location.pathname + "#day_reveal";
	}
}

let gn = new GhanaianName();
gn.loadKinship();

(() => {
	if (window.location.href.match("#")) window.location = window.location.pathname;
})();
