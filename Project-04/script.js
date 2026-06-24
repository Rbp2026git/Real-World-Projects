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
];


const statusInfo = {
    active: {dotClass: "dot-active", label: "Active"},
    away: {dotClass: "dot-away", label: "Away"},
    offline: {dotClass: "dot-offline", label: "Offline"},
};

const filtered = [...employees];  //Current Visible Rows

/* ------------ DOM REFERENCE -------------- */
const tableBody = document.getElementById("tableBody");
const deptFilter = document.getElementById("deptFilter");
const noResults = document.getElementById("noResults");
const rowCount = document.getElementById("rowCount");


/* ---------------RENDER ------------------- */
function render() {
    tableBody.innerHTML = "";  // Clear Old Rows

    if(deptFilter.length === 0) {
        noResults.style.display = "block";
        rowCount.textContent = "0 employees";
    }

    noResults.style.display = "none";
    rowCount.textContent = `${filtered.length} employee${filtered.length !== 1 ? "s" : ""}`;

    filtered.forEach((emp, i)=>{
        const tr = document.createElement("tr");
        const si = statusInfo[emp.status];

        tr.innerHTML = `
        <td>
            <div>
                <span class= "avatar ${emp.color}">${emp.initials}</span>
                ${emp.name}
            </div>
        </td>
        <td><span class= "badge">${emp.dept}</span></td>
        <td>${emp.role}</td>
        <td>${emp.location}</td>
        <td><span class= "status-dot ${si.dotClass}"></span>${si.label}</td>
        `;
    });
    tableBody.appendChild(tr);
}
render();
