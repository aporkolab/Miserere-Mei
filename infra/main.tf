provider "docker" {
  host = var.docker_host
}

resource "docker_image" "miserere" {
  name         = var.image
  keep_locally = true
}

resource "docker_volume" "data" {
  name = "miserere-data"
}

resource "docker_container" "miserere" {
  name    = "miserere-mei"
  image   = docker_image.miserere.image_id
  restart = "unless-stopped"

  ports {
    internal = 8080
    external = 8080
  }

  mounts {
    target = "/data"
    source = docker_volume.data.name
    type   = "volume"
  }

  env = [
    "JWT_SECRET=${var.jwt_secret}",
    "CORS_ORIGIN=${var.public_origin}",
    "COOKIE_SECURE=true",
    "SENTRY_DSN=${var.sentry_dsn}",
    "ADMIN_EMAIL=${var.admin_email}",
    "ADMIN_PASSWORD=${var.admin_password}",
  ]

  healthcheck {
    test         = ["CMD", "node", "-e", "fetch('http://127.0.0.1:8080/ready').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"]
    interval     = "30s"
    timeout      = "5s"
    retries      = 3
    start_period = "15s"
  }
}

output "container_id" {
  value = docker_container.miserere.id
}
