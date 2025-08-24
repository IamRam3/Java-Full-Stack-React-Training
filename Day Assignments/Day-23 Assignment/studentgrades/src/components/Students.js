import React from 'react';


const students = [
  { id: 1, name: 'Ntg1',   mark1: 85, mark2: 90 },
  { id: 2, name: 'Ntg2',     mark1: 70, mark2: 65 },
  { id: 3, name: 'Ntg3', mark1: 50, mark2: 55 },
  { id: 4, name: 'Ntg4',   mark1: 95, mark2: 92 },
];

function gradeFor(total) {
  if (total >= 180) return 'A+';
  if (total >= 160) return 'A';
  if (total >= 140) return 'B';
  if (total >= 120) return 'C';
  if (total >= 100) return 'D';
  return 'F';
}

export default function Students() {
  const rows = students.map(s => {
    const total = s.mark1 + s.mark2;
    const grade = gradeFor(total);
    return { ...s, total, grade };
  });

  const classTotal = rows.reduce((sum, r) => sum + r.total, 0);
  const avgTotal = Math.round(classTotal / rows.length);

  return (
    <section className="section left">
      <h2 className="mb-0">Student Scores</h2>
      <p className="mt-2" style={{ color: 'var(--muted)' }}>
        Total marks and grades computed from Mark 1 and Mark 2.
      </p>

      <div className="table-wrap mt-5">
        <table className="table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Mark 1</th>
              <th>Mark 2</th>
              <th>Total Score</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.mark1}</td>
                <td>{r.mark2}</td>
                <td>{r.total}</td>
                <td>
                  <span className={`badge ${badgeClass(r.grade)}`}>{r.grade}</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4">Class Average (Total)</td>
              <td>{avgTotal}</td>
              <td>{gradeFor(avgTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

function badgeClass(grade) {
  switch (grade) {
    case 'A+':
    case 'A': return 'badge-success';
    case 'B': return 'badge-primary';
    case 'C': return 'badge-warn';
    case 'D': return 'badge-neutral';
    default:  return 'badge-danger';
  }
}
