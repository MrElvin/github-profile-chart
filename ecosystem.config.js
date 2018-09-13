module.exports = {
  apps: [
    {
      name: 'github-profile-chart',
      script: 'app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy: {
    production: {
      user: 'breezymelon',
      host: '47.95.111.133',
      ref: 'origin/master',
      repo: 'git@github.com:MrElvin/github-profile-chart.git',
      path: '/home/breezymelon/github-profile-chart',
      'post-deploy': 'git pull && ./run.sh && pm2 reload ecosystem.config.js --env production'
    },
    dev: {
      user: 'breezymelon',
      host: '47.95.111.133',
      ref: 'origin/dev',
      repo: 'git@github.com:MrElvin/github-profile-chart.git',
      path: '/home/breezymelon/github-profile-chart-dev',
      'post-deploy': 'git pull && ./run.sh && pm2 reload ecosystem.config.js --env develop',
      env: {
        NODE_ENV: 'dev'
      }
    }
  }
}
