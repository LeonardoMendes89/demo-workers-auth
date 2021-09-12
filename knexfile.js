module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'workers_auth_app',
      user:     'admin',
      password: '123456'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: "pg",
    connection: {
      database:  "ddlbii151vcu3s",
      host:      "ec2-52-45-238-24.compute-1.amazonaws.com",
      user:      "pvlqexxwvhkyef",
      password:  "db7fb739b886d1eeb28a40eead965bd12dd949e38a710e87622a2a0666105d58",
      ssl:       { rejectUnauthorized: false }
    }
  }
  
};
