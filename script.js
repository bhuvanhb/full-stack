const API_URL = "/api/issues";

let issues = [];
let selectedRole = "Student";

const $ = id => document.getElementById(id);

async function loadIssues() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Unable to load issues");

        issues = await response.json();

        displayIssues();
        updateDashboard();

    } catch (error) {
        console.log(error);
        $("issueList").textContent = "Unable to connect to server.";
    }
}

async function addIssue(event) {
    event.preventDefault();

    const title = $("issueTitle").value.trim();
    const category = $("issueCategory").value;
    const location = $("issueLocation").value.trim();
    const description = $("issueDescription").value.trim();

    if (!title || !category || !location || !description) {
        $("issueMessage").textContent = "Please fill all fields.";
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                category,
                location,
                description
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        $("issueForm").reset();
        $("issueMessage").textContent = "Issue submitted successfully!";

        await loadIssues();

    } catch (error) {
        $("issueMessage").textContent = error.message;
    }
}

function displayIssues() {
    const list = $("issueList");
    const search = $("issueSearch").value.toLowerCase();
    const filter = $("statusFilter").value;

    list.replaceChildren();

    const filtered = issues.filter(issue => {
        const matchesSearch =
            issue.title.toLowerCase().includes(search) ||
            issue.category.toLowerCase().includes(search) ||
            issue.location.toLowerCase().includes(search);

        const matchesStatus =
            filter === "All" || issue.status === filter;

        return matchesSearch && matchesStatus;
    });

    if (filtered.length === 0) {
        list.textContent = "No issues found.";
        return;
    }

    filtered.forEach(issue => {
        const card = document.createElement("div");
        card.className = "issue-card";

        const title = document.createElement("h3");
        title.textContent = issue.title;

        const details = document.createElement("p");
        details.textContent =
            `${issue.category} | ${issue.location}`;

        const description = document.createElement("p");
        description.textContent = issue.description;

        const status = document.createElement("p");
        status.textContent = "Status: " + issue.status;

        card.append(title, details, description, status);

        if (selectedRole === "Faculty" ||
            selectedRole === "Admin") {

            const select = document.createElement("select");

            ["Pending", "In Progress", "Resolved"]
                .forEach(value => {
                    const option = document.createElement("option");
                    option.value = value;
                    option.textContent = value;
                    select.appendChild(option);
                });

            select.value = issue.status;

            select.addEventListener("change", () => {
                updateIssue(issue._id, select.value);
            });

            card.appendChild(select);
        }

        if (selectedRole === "Admin") {
            const button = document.createElement("button");

            button.textContent = "Delete";

            button.addEventListener("click", () => {
                deleteIssue(issue._id);
            });

            card.appendChild(button);
        }

        list.appendChild(card);
    });
}

async function updateIssue(id, status) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        });

        await loadIssues();

    } catch (error) {
        alert("Unable to update issue.");
    }
}

async function deleteIssue(id) {
    if (!confirm("Are you sure you want to delete this issue?")) {
        return;
    }

    try {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        await loadIssues();

    } catch (error) {
        alert("Unable to delete issue.");
    }
}

function updateDashboard() {
    $("totalIssues").textContent = issues.length;

    $("pendingIssues").textContent =
        issues.filter(i => i.status === "Pending").length;

    $("progressIssues").textContent =
        issues.filter(i => i.status === "In Progress").length;

    $("resolvedIssues").textContent =
        issues.filter(i => i.status === "Resolved").length;
}

function selectPortal(role) {
    selectedRole = role;

    $("portalMessage").textContent =
        role + " demo portal selected.";

    displayIssues();
}

function searchResources() {
    const search = $("resourceSearch").value.toLowerCase();

    document.querySelectorAll(".resource-card").forEach(card => {
        card.hidden = !card.textContent.toLowerCase().includes(search);
    });
}

function showLoginMessage() {
    alert("Login functionality will be added in the authentication phase.");
}

function scrollToSection(id) {
    $(id).scrollIntoView({
        behavior: "smooth"
    });
}

document.addEventListener("DOMContentLoaded", () => {
    $("issueForm").addEventListener("submit", addIssue);

    $("refreshIssues").addEventListener("click", loadIssues);

    $("issueSearch").addEventListener("input", displayIssues);

    $("statusFilter").addEventListener("change", displayIssues);

    $("resourceSearch").addEventListener("input", searchResources);

    $("loginButton").addEventListener("click", showLoginMessage);

    document.querySelectorAll(".role-button").forEach(button => {
        button.addEventListener("click", () => {
            selectPortal(button.dataset.role);
        });
    });

    loadIssues();
});