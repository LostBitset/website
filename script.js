var page_dyns = document.getElementsByClassName("dynpage");
var date_dyns = document.getElementsByClassName("dyndate");
var time_dyns = document.getElementsByClassName("dyntime");

var pages = {
	"100": function() {},
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

setInterval(updatedatetime, 500);

setpage(100);

console.log("script done");

