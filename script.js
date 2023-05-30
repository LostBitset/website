var page_dyns = document.getElementsByClassName("dynpage");
var date_dyns = document.getElementsByClassName("dyndate");
var time_dyns = document.getElementsByClassName("dyntime");
var dynhead = document.getElementsByClassName("dynhead")[0];
var dyncontent = document.getElementsByClassName("dyncontent")[0];
var dyninpage = document.getElementsByClassName("dyninpage")[0];

function formathead(text) {
	let pad = (41 - text.length);
	let padr = pad - Math.floor(pad / 2);
	let padl = pad - padr;
	let paddingl = "\u00A0".repeat(padl);
	let paddingr = "\u00A0".repeat(padr);
	return `${paddingl}${text}${paddingr}`;
}

document.getElementsByClassName("footer")[0].innerText = formathead("@LostBitset (on GitHub)");

function sethead(text) {
	let formatted = formathead(text);
	dynhead.innerText = formatted;
}

var pages = {
	"100": function() {
		sethead("Hi There!");
		dyncontent.innerText = "\nWelcome to CEEFAX. Simply enter three digits on your keyboard to view a particular page. Some useful pages are listed below:\n\n100 - Home (where you are now)\n\n101 - About Me\n\n201 - Things I Have Written\n\n301 - My GitHub Page\n\n302 - CEEFAX on Wikipedia\n\nBe aware that only pages 100-199 will be displayed through the CEEFAX interface.";
	},
	"101": function() {
		sethead("About Me");
		dyncontent.innerText = "\nUnder construction.";
	},
	"201": function() {
		document.location = "https://lostbitset.github.io/things";
	},
	"301": function() {
		document.location = "https://github.com/LostBitset";
	},
	"302": function() {
		document.location = "https://en.wikipedia.org/wiki/Ceefax";
	},
};

function setpage(page) {
	pages[page.toString()]();
	for (const el of page_dyns) {
		el.innerText = page.toString();
	}
}

function formatdate(date) {
	let dow = date.toLocaleString("default", { weekday: "short" });
	let dom = date.toLocaleString("default", { day: "2-digit" });
	let month = date.toLocaleString("default", { month: "short" });
	return `${dow} ${dom} ${month}`;
}

function formattime(date) {
	let hour = date.toLocaleString("default", { hour: "2-digit", hour12: false });
	let mins = date.toLocaleString("default", { minute: "2-digit" });
	let secs = date.toLocaleString("default", { second: "2-digit" });
	return `${hour}:${mins}/${secs}`;
}

function updatedatetime() {
	let datetime = new Date();
	let date = formatdate(datetime);
	let time = formattime(datetime);
	for (const el of date_dyns) {
		el.innerText = date;
	}
	for (const el of time_dyns) {
		el.innerText = time;
	}
}

updatedatetime();
setInterval(updatedatetime, 500);

setpage("100");

function trysetpage(page) {
	if (page in pages) {
		setpage(page);
	} else {
		alert("Invalid page, try again.");
	}
}

var typed = "";

function checktyped() {
	for (const ch of typed) {
		if (ch.match(/[0-9]/) === null) {
			typed = "";
			return;
		}
	}
	if (typed.length === 3) {
		trysetpage(typed);
		typed = "";
		return;
	}
}

var inpagefocus = false;

dyninpage.addEventListener("focusin", ev => {
	inpagefocus = true;
});

dyninpage.addEventListener("focusout", ev => {
	inpagefocus = false;
});

document.addEventListener("keypress", ev => {
	if (inpagefocus) return;
	typed += ev.key;
	checktyped();
	dyninpage.value = typed;
});

dyninpage.addEventListener("input", ev => {
	typed = dyninpage.value;
	checktyped();
	dyninpage.value = typed;
});

console.log("script done");

