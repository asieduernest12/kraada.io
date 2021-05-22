function GhanaianName() {
	// let _name;
	let _week_day;
	let _sex;
	let _kinships;
	let _email;
	const show_content_tag = ".show_content";
	
	loadKinship();
	
	return {

		navigate,
		scrollAction,
		submitDate,
		submitDay,
		submitNameSex,
	};
	
	function submitNameSex(event) {
		event.preventDefault();
		_sex = event.submitter.value;
		_email = document.querySelector("input[type=email]").value;
		goToDayRevealSection();
	}
	function submitDate(event) {
		event.preventDefault();
		
		_week_day = findDay();
		navigate("#yom__name_sex");
	}
	
	function submitDay(event) {
		event.preventDefault();
		_week_day = getDay(event);
		navigate("#yom__name_sex");
	}
	
	function navigate(destination) {
		let _destination = destination ?? "#";
		showContent(destination);
	}
	
	function findDay() {
		const day = document.querySelector("[name=day]").value;
		const month = document.querySelector("[name=month]").value;
		const year = document.querySelector("[name=year]").value;
		
		if (day == undefined || month == undefined || year == undefined) {
			alert("enter a valid date");
			return;
		}
		
		let week_day = new Date(`${year}-${month}-${day}`).getDay();
		
		return (week_day + 1) % 6; // _week_day is coming back as correct - 1, so adjustment is needed, text again in the future using current day
	}
	
	function getDay(event) {
		return event.submitter.name == "day_radio" ? event.submitter.value : null;
	}
	
	function getKinship(_week_day, _sex) {
		if (!!!_sex) navigate("#yom__name_sex");
		
		const day_key = Object.keys(_kinships)[_week_day];
		return [_kinships[day_key][_sex], day_key];
	}
	
	function goToDayRevealSection() {
		_kinship = getKinship(_week_day, _sex);
		reveal(_kinship);
		navigate("#day_reveal");
	}
	async function loadKinship() {
		let temp = await fetch("js/info.js").then((res) => res.json());
		_kinships = temp[0];
		console.table(_kinships);
	}
	
	function reveal([_kinship, day_key]) {
		if (!!!_kinship) return false;
		// document.querySelector("span.first_name").innerHTML = kinnames[0];
		document.querySelector(".day_name").innerHTML = _kinship.names[0];
		document.querySelector(".text__day").innerHTML = day_key;
		document.querySelector(".reveal__attributes").innerHTML = order(_kinship.characteristics)
		.map((_char) => `<li class="reveal__attribute_item">${_char}</li>`)
		.join("");
	}
	
	function order(characteristics) {
		if (!characteristics.length) return [];
		
		return [
			characteristics[0], //maintain lead characteristic
			...characteristics
			.splice(1, characteristics.length)
			.sort((a, b) => {
				let result = 0;
				if (a.length < b.length) result = -1;
				else if (a.length > b.length) result = 1;
				return result;
			}) //sort returns values in ascending order
			.reverse(), //reverse sort to obtain a descending order array
		];
	}
	
	function hideContent() {
		let _content = document.querySelector(show_content_tag);
		if (_content) _content.classList.remove("show_content");
	}
	
	function showContent(_id) {
		console.log("showContent called");
		let _content = document.querySelector(_id);
		if (_content) {
			hideContent();
			_content.classList.add("show_content"); /**_content.scrollIntoView({block:'center'});**/
		} else showContent("#yom__landing");
	}
	
	function scrollAction(event) {
		console.log("scroll fired", event);
	}

	
}

let gn = new GhanaianName();


(() => {
	setTimeout(() => {
		//redirect to yom__landing when page refreshed from a different section
		// if (window.location.href.match("#"))
		gn.navigate("#yom__landing");
		document.addEventListener("scroll", gn.scrollAction);
	});
})();
