const employees = [
  { name: "Priya Sharma",  initials: "PS", dept: "Engineering", role: "Senior Engineer",   location: "Bangalore", status: "active",  email: "priya.s@company.com",  joined: "Jan 2021", color: "av-blue"   },
  { name: "Arjun Mehta",   initials: "AM", dept: "Product",     role: "Product Manager",   location: "Mumbai",    status: "active",  email: "arjun.m@company.com",  joined: "Mar 2020", color: "av-teal"   },
  { name: "Sarah Chen",    initials: "SC", dept: "Design",      role: "UX Lead",           location: "Remote",    status: "away",    email: "sarah.c@company.com",  joined: "Jul 2019", color: "av-purple" },
  { name: "Rohit Verma",   initials: "RV", dept: "Engineering", role: "Frontend Dev",      location: "Delhi",     status: "active",  email: "rohit.v@company.com",  joined: "Sep 2022", color: "av-coral"  },
  { name: "Nadia Ali",     initials: "NA", dept: "HR",          role: "HR Manager",        location: "Hyderabad", status: "active",  email: "nadia.a@company.com",  joined: "Feb 2021", color: "av-amber"  },
  { name: "James Park",    initials: "JP", dept: "Finance",     role: "Finance Analyst",   location: "Remote",    status: "offline", email: "james.p@company.com",  joined: "Nov 2020", color: "av-blue"   },
  { name: "Meera Iyer",    initials: "MI", dept: "Engineering", role: "Backend Dev",       location: "Pune",      status: "active",  email: "meera.i@company.com",  joined: "Apr 2023", color: "av-teal"   },
  { name: "Tom Nguyen",    initials: "TN", dept: "Design",      role: "UI Designer",       location: "Remote",    status: "away",    email: "tom.n@company.com",    joined: "Aug 2021", color: "av-purple" },
  { name: "Sneha Reddy",   initials: "SR", dept: "Product",     role: "Associate PM",      location: "Chennai",   status: "active",  email: "sneha.r@company.com",  joined: "Jun 2022", color: "av-coral"  },
  { name: "Daniel Lee",    initials: "DL", dept: "Finance",     role: "CFO",               location: "Bangalore", status: "active",  email: "daniel.l@company.com", joined: "Jan 2018", color: "av-amber"  },
  { name: "Aisha Khan",    initials: "AK", dept: "HR",          role: "Recruiter",         location: "Delhi",     status: "offline", email: "aisha.k@company.com",  joined: "Oct 2022", color: "av-blue"   },
  { name: "Vikram Nair",   initials: "VN", dept: "Engineering", role: "DevOps Engineer",   location: "Bangalore", status: "active",  email: "vikram.n@company.com", joined: "Dec 2020", color: "av-teal"   },
  { name: "Adrina Patel",   initials: "AP", dept: "Design", role: "UI Designer",   location: "Patna", status: "active",  email: "adrina.n@company.com", joined: "Dec 2021", color: "av-teal"   },
];

/* -----------------LOOKUP MAP ----------------  */
const deptBadge = {
    Engineering: "badge-eng",
    Design: "badge-design",
    Product: "badge-product",
    HR: "badge-hr",
    Finance: "badge-finance",
};
const statusInfo = {
    active: {dotClass: "dot-active", label: "Active"},
    away: {dotClass: "dot-away", label: "Away"},
    offline: {dotClass: "dot-offline", label: "Offline"},
};

/* ----------- STATE ------------ */
let filtered = [...employees];  // Current Visible Rows
let focusIdx = -1;   // which row is keyboard-focused


/* ------------ DOM REFERENCE -------------- */
const tableBody = document.getElementById("tableBody");
const deptFilter = document.getElementById("deptFilter");
const noResults = document.getElementById("noResults");
const rowCount = document.getElementById("rowCount");
const detailPanel = document.getElementById("detailPanel");
const searchInput = document.getElementById("searchInput");

/* ---------------RENDER ------------------- */
function render() {
    tableBody.innerHTML = "";  // Clear Old Rows

    if(filtered.length === 0) {
        noResults.style.display = "block";
        rowCount.textContent = "0 employees";
    }else{
        noResults.style.display = "none";
        rowCount.textContent = `${filtered.length} employee${filtered.length !== 1 ? "s" : ""}`;
    }

    filtered.forEach((emp, i)=>{
        const tr = document.createElement("tr");
        tr.tabIndex = 0;   // makes row focusable via keyboard
        tr.dataset.idx = i;   // store index so keydown handler knows position
        
        if (i === focusIdx) {
            tr.classList.add("focused-row");
        }
        
        const si = statusInfo[emp.status];
        tr.innerHTML = `
        <td>
            <div class= "name-cell">
                <span class= "avatar ${emp.color}">${emp.initials}</span>
                ${emp.name}
            </div>
        </td>
        <td><span class= "badge ${deptBadge[emp.dept]}">${emp.dept}</span></td>
        <td>${emp.role}</td>
        <td>${emp.location}</td>
        <td><span class= "status-dot ${si.dotClass}"></span>${si.label}</td>
        `;

        tr.addEventListener("click", ()=> selectRow(i));
        tr.addEventListener("keydown", handleRowKeydown);
        tableBody.appendChild(tr);
    });

    // Focus the correct row after re-render (for keyboard navigation)
    if(focusIdx >= 0 && focusIdx < filtered.length){
        const rows = tableBody.children[focusIdx];
        rows.focus({ preventScroll: false});
    }
}

/* ----------- SELECT ROW --------------- */
function selectRow(i) {
    focusIdx = i;
    render();
    showDetail(filtered[i]);
}

function showDetail(emp) {
    const si = statusInfo[emp.status];

    detailPanel.innerHTML = `
    <div style="display:flex; align-items:center; gap:12px; margin-bottom:8px;">
        <span class= "avatar ${emp.color}" style="width:38px; height:38px; font-size:14px;">${emp.initials}</span>
        <div>
            <p style="font-weight:600; font-size:15px;">${emp.name}</p>
            <p style="font-size:13px; color:#888;">${emp.role}</p>
        </div>
        <span class= "badge ${deptBadge[emp.dept]}" style="margin-left:auto;">${emp.dept}</span>
    </div>
    <hr style="border:none; border-top:1px solid #eee; margin-bottom:12px;" />
    <div class= "detail-grid">
        <div>
            <div class= "detail-label">Email</div>
            <div class= "detail-value" style="color:#1d4ed8;">${emp.email}</div>
        </div>
        <div>
            <div class="detail-label">Location</div>
            <div class="detail-value">${emp.location}</div>
        </div>
        <div>
            <div class="detail-label">Status</div>
            <div class="detail-value"><span class= "status-dot ${si.dotClass}"></span>${si.label}</div>
        </div>
        <div>
            <div class="detail-label">Joined</div>
            <div class="detail-value">${emp.joined}</div>
        </div>
    </div>
    `;
    detailPanel.classList.add("visible");
}

/* ----------- SEARCH & FILTER ----------- */
function applyFilters() {
    const query = searchInput.value.toLowerCase();
    const dept = deptFilter.value;

    filtered = employees.filter((emp) => {

        const matchesSearch = !query || 
        emp.name.toLowerCase().includes(query) || 
        emp.role.toLowerCase().includes(query) || 
        emp.location.toLowerCase().includes(query);

        const matchesDept = !dept || emp.dept === dept;

        return matchesSearch && matchesDept;
    });

    focusIdx = -1;
    detailPanel.classList.remove("visible");
    render();
};

/* ------------- KEYBOARD NAVIGATION ------------------ */
function handleRowKeydown(e) {
    const currentIdx = parseInt(e.target.dataset.idx);

    switch(e.key) {
        case "ArrowDown": 
        e.preventDefault();
        if (currentIdx < filtered.length - 1){
            selectRow(currentIdx + 1);
        }
        break;

        case "ArrowUp": 
        e.preventDefault();
        if(currentIdx > 0){
            selectRow(currentIdx - 1);
        }
        break;

        case "Enter": 
        e.preventDefault();
        selectRow(currentIdx);
        break;

        case "Escape": 
        detailPanel.classList.remove("visible");
        focusIdx = -1;
        render();
        break;
    }
}

/* ----------------- Event Listner ---------------- */
searchInput.addEventListener("input", applyFilters);
deptFilter.addEventListener("change", applyFilters);

/* ------------ INIT ----------- */
render();