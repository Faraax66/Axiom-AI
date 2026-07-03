const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// Save a complete review to database
async function saveReview(owner, repo, prNumber, prTitle, prAuthor, review) {
  try {
    console.log('💾 Step 1: Finding/creating repo...');
    
    let { data: repoData, error: repoFindError } = await supabase
      .from('repositories')
      .select('id')
      .eq('github_owner', owner)
      .eq('github_repo_name', repo)
      .single();

    console.log('Repo find result:', repoData, repoFindError);

    if (!repoData) {
      const { data: newRepo, error: repoCreateError } = await supabase
        .from('repositories')
        .insert({ github_owner: owner, github_repo_name: repo })
        .select()
        .single();
      
      console.log('Repo create result:', newRepo, repoCreateError);
      repoData = newRepo;
    }

    console.log('💾 Step 2: Saving PR...');
    const { data: prData, error: prError } = await supabase
      .from('pull_requests')
      .insert({
        repo_id: repoData.id,
        pr_number: prNumber,
        pr_title: prTitle,
        pr_author: prAuthor,
        status: 'reviewed'
      })
      .select()
      .single();

    console.log('PR save result:', prData, prError);

    console.log('💾 Step 3: Saving review...');
    const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    review.issues.forEach(i => counts[i.severity]++);

    const { data: reviewData, error: reviewError } = await supabase
      .from('reviews')
      .insert({
        pr_id: prData.id,
        score: review.score,
        summary: review.summary,
        total_issues: review.issues.length,
        critical_count: counts.Critical,
        high_count: counts.High,
        medium_count: counts.Medium,
        low_count: counts.Low
      })
      .select()
      .single();

    console.log('Review save result:', reviewData, reviewError);

    console.log('💾 Step 4: Saving issues...');
    const issuesData = review.issues.map(issue => ({
      review_id: reviewData.id,
      severity: issue.severity,
      file: issue.file,
      line: issue.line,
      issue: issue.issue,
      suggestion: issue.suggestion
    }));

    const { error: issuesError } = await supabase
      .from('issues')
      .insert(issuesData);

    console.log('Issues save result:', issuesError);

    console.log(`💾 Review saved to database for PR #${prNumber}`);
    return reviewData;

  } catch (error) {
    console.error('Database error:', error.message);
    console.error('Full error:', JSON.stringify(error, null, 2));
    throw new Error('Failed to save review to database');
  }
}

// Get all reviews for dashboard
async function getAllReviews() {
  const { data, error } = await supabase
    .from('pull_requests')
    .select(`
      *,
      repositories(github_owner, github_repo_name),
      reviews(score, summary, total_issues, critical_count, high_count, medium_count, low_count, created_at)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

module.exports = { saveReview, getAllReviews };