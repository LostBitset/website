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

function updatedatetime() {
	let datetime = new Date();
	let date = formatdate(datetime);
	for (const el of date_dyns) {
		el.innerText = date;
	}
}

setInterval(updatedatetime, 500);

setpage(100);

console.log("script done");

