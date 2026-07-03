const express = require('express');
const crypto = require('crypto');
const { getPRDiff, postReviewComment } = require('../utils/octokit');
const { reviewCode } = require('../utils/gemini');
const { saveReview } = require('../utils/supabase');

const router = express.Router();

// Verify webhook signature from GitHub
function verifyWebhookSignature(payload, signature) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  
  try {
    return crypto.timingSafeEqual(
      Buffer.from(digest, 'utf8'),
      Buffer.from(signature, 'utf8')
    );
  } catch {
    return false;
  }
}

// Main webhook endpoint
router.post('/webhook', express.raw({ type: '*/*' }), async (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const event = req.headers['x-github-event'];

  console.log('📨 Webhook received, event:', event);

  // Verify signature
  if (!signature || !verifyWebhookSignature(req.body, signature)) {
    console.log('❌ Invalid webhook signature');
    console.log('   Received signature:', signature);
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log('✅ Signature verified');

  // Only handle Pull Request events
  if (event !== 'pull_request') {
    return res.status(200).json({ message: 'Event ignored' });
  }

  const payload = JSON.parse(req.body.toString());
  const action = payload.action;

  // Only review when PR is opened or updated
  if (action !== 'opened' && action !== 'synchronize') {
    return res.status(200).json({ message: 'Action ignored' });
  }

  const owner = payload.repository.owner.login;
  const repo = payload.repository.name;
  const pull_number = payload.pull_request.number;
  const pr_title = payload.pull_request.title;
  const pr_author = payload.pull_request.user.login;

  console.log(`\n🔔 New PR detected!`);
  console.log(`   Repo: ${owner}/${repo}`);
  console.log(`   PR #${pull_number}: ${pr_title}`);
  console.log(`   Author: ${pr_author}`);

  try {
    console.log('📄 Fetching PR diff...');
    const diff = await getPRDiff(owner, repo, pull_number);

    console.log('🤖 Sending to Axiom AI for review...');
    const review = await reviewCode(diff);

    console.log('💬 Posting review to GitHub...');
    await postReviewComment(owner, repo, pull_number, review);

    // Step 8 — Save to database
    console.log('💾 Saving to database...');
    await saveReview(owner, repo, pull_number, pr_title, pr_author, review);

    console.log('✅ Review complete!\n');
    res.status(200).json({ 
      message: 'Review completed successfully',
      pr: `${owner}/${repo}#${pull_number}`,
      score: review.score,
      issues: review.issues.length
    });
    
  } catch (error) {
    console.error('❌ Review failed:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;