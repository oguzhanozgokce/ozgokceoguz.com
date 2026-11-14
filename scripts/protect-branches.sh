#!/usr/bin/env bash
set -euo pipefail

repo="${1:?usage: scripts/protect-branches.sh owner/name}"

gh api --method POST "repos/$repo/rulesets" --input - <<'JSON'
{
  "name": "main: pull requests only",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["refs/heads/main"], "exclude": [] } },
  "rules": [
    { "type": "deletion" },
    { "type": "non_fast_forward" },
    {
      "type": "pull_request",
      "parameters": {
        "required_approving_review_count": 0,
        "dismiss_stale_reviews_on_push": false,
        "require_code_owner_review": false,
        "require_last_push_approval": false,
        "required_review_thread_resolution": true
      }
    },
    {
      "type": "required_status_checks",
      "parameters": {
        "strict_required_status_checks_policy": false,
        "required_status_checks": [{ "context": "Verify" }]
      }
    }
  ]
}
JSON

gh api --method POST "repos/$repo/rulesets" --input - <<'JSON'
{
  "name": "develop: keep history",
  "target": "branch",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["refs/heads/develop"], "exclude": [] } },
  "rules": [{ "type": "deletion" }, { "type": "non_fast_forward" }]
}
JSON

gh api --method POST "repos/$repo/rulesets" --input - <<'JSON'
{
  "name": "releases: tags are permanent",
  "target": "tag",
  "enforcement": "active",
  "conditions": { "ref_name": { "include": ["refs/tags/v*"], "exclude": [] } },
  "rules": [{ "type": "deletion" }, { "type": "update" }]
}
JSON

echo "Rulesets applied to $repo"
