document.addEventListener('DOMContentLoaded', function() {
    fetchJobs();

    document.getElementById('job-form').addEventListener('submit', function(e) {
        e.preventDefault();
        addJob();
    });
});

function fetchJobs() {
    fetch('/get_jobs')
    .then(response => response.json())
    .then(jobs => {
        const tableBody = document.querySelector('#job-table tbody');
        tableBody.innerHTML = ''; // Clear existing data

        jobs.forEach(job => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${job.company_name}</td>
                <td>${job.job_role}</td>
                <td><a href="${job.company_link}" target="_blank">${job.company_link}</a></td>
            `;
            tableBody.appendChild(row);
        });
    });
}

function addJob() {
    const companyName = document.getElementById('company-name').value;
    const jobRole = document.getElementById('job-role').value;
    const companyLink = document.getElementById('company-link').value;

    const data = {
        company_name: companyName,
        job_role: jobRole,
        company_link: companyLink
    };

    fetch('/add_job', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(job => {
        const tableBody = document.querySelector('#job-table tbody');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${job.company_name}</td>
            <td>${job.job_role}</td>
            <td><a href="${job.company_link}" target="_blank">${job.company_link}</a></td>
        `;
        tableBody.appendChild(row);

        document.getElementById('job-form').reset();
    });
}
