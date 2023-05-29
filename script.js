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

setpage(100);
console.log("script done");

