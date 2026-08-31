// =========================
// NAVIGATION
// =========================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// =========================
// LOGIN BUTTON
// =========================

function showLoginMessage() {
    alert(
        "Login functionality will be connected in the next phase."
    );
}


// =========================
// REPORT ISSUE BUTTON
// =========================

function showIssueMessage() {
    const input = document.getElementById("issueInput");

    if (input) {
        input.focus();

        input.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
}


// =========================
// PORTAL SELECTION
// =========================

function selectPortal(role) {
    alert(
        role + " Portal selected.\n\n" +
        "Role-based functionality will be connected in the next phase."
    );
}


// =========================
// QUICK ISSUE REPORT
// =========================

function addIssue() {

    const input = document.getElementById("issueInput");
    const message = document.getElementById("issueMessage");
    const issueList = document.getElementById("issueList");

    const issueText = input.value.trim();

    // Validate input
    if (issueText === "") {

        message.textContent =
            "Please enter a campus issue.";

        return;
    }


    // Create issue element
    const issueItem = document.createElement("div");

    issueItem.className = "issue-item";


    // Create issue text
    const issueTextElement = document.createElement("span");

    issueTextElement.textContent = issueText;


    // Create remove button
    const removeButton = document.createElement("button");

    removeButton.textContent = "Remove";

    removeButton.className = "remove-issue";


    // Remove issue
    removeButton.addEventListener("click", function () {

        issueItem.remove();

        message.textContent =
            "Issue removed successfully.";

    });


    // Add elements
    issueItem.appendChild(issueTextElement);

    issueItem.appendChild(removeButton);

    issueList.appendChild(issueItem);


    // Success message
    message.textContent =
        "Issue submitted successfully!";


    // Clear input
    input.value = "";

    input.focus();
}


// =========================
// ENTER KEY EVENT
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("issueInput");

    if (input) {

        input.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                addIssue();

            }

        });

    }

});