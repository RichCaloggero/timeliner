function fixAccessibility () {
document.querySelectorAll(".timeline-container h2 span").forEach(span => {
span.setAttribute("role", "button");
span.setAttribute("tabindex", "0");
span.setAttribute("aria-expanded", "false");
}); // span

document.querySelectorAll(".timeline-container dl").forEach(dl => dl.setAttribute("role", "presentation"));

document.querySelectorAll(".timeline-container .timeline-event").forEach(event => {
const h3 = document.createElement("h3");
h3.innerHTML = event.innerHTML;
h3.querySelector("a").setAttribute("href", "#");
h3.querySelector("a").setAttribute("role", "button");
h3.querySelector("a").setAttribute("aria-expanded", "false");
event.innerHTML = h3.outerHTML;
}); // forEach dt

document.querySelectorAll(".timeline-container").forEach(timeline => {
timeline.addEventListener("keydown", e => {
if (isTrigger(e.target) && (e.key === "Enter" || e.key === " ")) {
e.target.click();
} // if
}) // handler
}); // forEach .timeline-container


/*document.querySelectorAll(".timeline-wrapper").forEach(wrapper => {
wrapper.addEventListener("click", e => {
if (! e.target.matches(".timeline-time [role=button], .timeline-event [role=button]")) return true;

const wrapper = e.currentTarget;
const timelineTimeTrigger = wrapper.querySelector(".timeline-time [role=button]");
const timelineEventTriggers = wrapper.querySelectorAll(".timeline-event [role=button]");
const state = e.target.getAttribute("aria-expanded");
const newState = state === "true"? "false" : "true";

e.target.setAttribute("aria-expanded", newState);

if (e.target === timelineTimeTrigger) {
timelineEventTriggers.forEach(trigger => trigger.setAttribute("aria-expanded", newState));

} else {
const states = [...timelineEventTriggers].map(trigger => trigger.getAttribute("aria-expanded"));

if (
states.every(x => x === "true")
|| states.every(x => x === "false")
) timelineTimeTrigger.setAttribute("aria-expanded", states[0]);
} // if

}); // event
}); // forEach
*/

//setInitialState([...document.querySelectorAll(".timeline-container .timeline-time, .timeline-container .timeline-event")]);

function setInitialState (triggers) {
triggers.forEach(trigger => {
const state = trigger.classList.contains("open")?  "true" : "false";
trigger.querySelector("[role=button]").setAttribute("aria-expanded", state);
}); // forEach
} // setInitialState

function isTrigger (element) {
return element.matches(".timeline-container [role=button]");
} // isTrigger
 

} // fixAccessibility
