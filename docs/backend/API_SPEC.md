# API Spec

## Conventions
- Base URL: https://app.go4u.app
- Auth: Bearer JWT (NextAuth) · Versioning: /api/v1 · Content-Type: JSON
- Errors: { ok: false, error: { code, message } }

### Endpoint: POST /api/tasks
Purpose: ایجاد تسک
Auth: Required (role: user)
Request:
```json
{ "title":"...", "description":"...", "type":"paid|volunteer", "price":1200, "currency":"EUR", "assignment":"single|multi", "capacity":3, "deadline": "2025-10-01T12:00:00Z", "location": { "city":"Berlin","lat":52.51,"lng":13.4 } }
