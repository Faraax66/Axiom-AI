async function reviewCode(diff) {
    return {
      summary: "This PR contains a critical security vulnerability and minor code quality issues.",
      score: 65,
      issues: [
        {
          severity: "Critical",
          file: "src/auth/login.js",
          line: 34,
          issue: "SQL injection vulnerability. User input directly interpolated into query.",
          suggestion: "Use parameterized queries: db.query('SELECT * FROM users WHERE id = ?', [userId])"
        },
        {
          severity: "High",
          file: "src/utils/api.js",
          line: 78,
          issue: "Unhandled promise rejection. No try/catch block on async call.",
          suggestion: "Wrap the async call in a try/catch block."
        },
        {
          severity: "Medium",
          file: "src/components/Card.jsx",
          line: 112,
          issue: "Magic number 86400 used with no context.",
          suggestion: "Define as named constant: const SECONDS_IN_A_DAY = 86400"
        },
        {
          severity: "Low",
          file: "src/helpers/format.js",
          line: 145,
          issue: "For loop can be simplified.",
          suggestion: "Use Array.map() instead for cleaner code."
        }
      ]
    };
  }
  
  module.exports = { reviewCode };