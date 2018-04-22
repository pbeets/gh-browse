// Dependencies
import React from 'react'

export default ({ repo }) => (
  <div>
    {repo.name} - Forks: {repo.forks_count} - Stars: {repo.stargazers_count}
  </div>
)
