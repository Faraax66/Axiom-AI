const { Octokit } = require('@octokit/rest');

// Initialize Octokit with your GitHub token
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// Get the diff of a Pull Request
async function getPRDiff(owner, repo, pull_number) {
  try {
    const response = await octokit.pulls.get({
      owner,
      repo,
      pull_number,
      mediaType: { format: 'diff' }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching PR diff:', error);
    throw new Error('Failed to fetch PR diff');
  }
}

// Post a review comment on a PR
async function postReviewComment(owner, repo, pull_number, review) {
  try {
    // Post overall review as a comment
    const body = formatReviewComment(review);
    
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: pull_number,
      body
    });

    console.log(`Review posted on PR #${pull_number}`);
  } catch (error) {
    console.error('Error posting review comment:', error);
    throw new Error('Failed to post review comment');
  }
}

// Format the AI review into a readable GitHub comment
function formatReviewComment(review) {
  const severityEmoji = {
    Critical: '🔴',
    High: '🟠',
    Medium: '🟡',
    Low: '🔵'
  };

  let comment = `## 🤖 Axiom AI Code Review\n\n`;
  comment += `**Overall Score:** ${review.score}/100\n`;
  comment += `**Summary:** ${review.summary}\n\n`;
  comment += `---\n\n`;
  comment += `### Issues Found (${review.issues.length})\n\n`;

  review.issues.forEach(issue => {
    const emoji = severityEmoji[issue.severity] || '⚪';
    comment += `${emoji} **[${issue.severity}]** \`${issue.file}\` — Line ${issue.line}\n`;
    comment += `> ${issue.issue}\n`;
    comment += `> **Fix:** ${issue.suggestion}\n\n`;
  });

  comment += `---\n`;
  comment += `*Powered by Axiom AI — Automated Code Review Agent*`;

  return comment;
}

module.exports = { getPRDiff, postReviewComment };