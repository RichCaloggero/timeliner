function timelineControl (timelines) {
const functionMap = {
"disclose-major-events": discloseMajorEvents,
"disclose-all": discloseAll,
"flatten": flatten,
};

timelines.forEach(t => {
t.insertAdjacentHTML("afterbegin",
`<div class="timeline-control toolbar">
<button aria-pressed="false" data-control="disclose-major-events">Disclose major events</button>
<button aria-pressed="false" data-control="disclose-all">Disclose all</button>
<button aria-pressed="true" data-control="flatten">Flatten</button>
</div>
`); // insert html

t.addEventListener("click", e => {
const key = e.target.dataset.control;
if (key in functionMap)  {
if (e.target.getAttribute("aria-pressed") === "true") return;
functionMap[key](t);
toggleState(e.target);
} // if
}); // click handler
}); // forEach


function discloseMajorEvents (timeline) {
$$(".timeline-wrapper", timeline).forEach(x => x.setAttribute("open", ""));
} // discloseMajorEvents

function flatten (timeline) {
$$("details", timeline).forEach(x => x.removeAttribute("open"));
} // flatten

function discloseAll (timeline) {
$$("details", timeline).forEach(x => x.setAttribute("open", ""));
} // discloseAll

function toggleState (element) {
const state = element.getAttribute("aria-pressed");
element.setAttribute("aria-pressed", state === "true"? "false" : "true");
} // toggleState
} // timelineControl


function $ (selector, context = document) {
return context.querySelector(selector);
} // $

function $$ (selector, context = document) {
return [...context.querySelectorAll(selector)];
} // $$

