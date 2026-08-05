variable "docker_host" {
  description = "Docker daemon URI, for example ssh://deploy@example.com"
  type        = string
  default     = "unix:///var/run/docker.sock"
}

variable "image" {
  description = "Immutable GHCR image reference including digest"
  type        = string
}

variable "jwt_secret" {
  description = "JWT signing secret"
  type        = string
  sensitive   = true
}

variable "public_origin" {
  description = "Canonical HTTPS origin"
  type        = string
}

variable "sentry_dsn" {
  description = "Optional Sentry DSN"
  type        = string
  sensitive   = true
  default     = ""
}

variable "admin_email" {
  type    = string
  default = ""
}

variable "admin_password" {
  type      = string
  sensitive = true
  default   = ""
}
