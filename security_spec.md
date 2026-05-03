# Security Specification

## Data Invariants
- A project must have a title, image, span type, and featured status.
- Only the admin account `thedesignerakashk@gmail.com` can perform write operations (create, update, delete).
- Public users can read projects.
- `admins` collection stores the UIDs of authorized administrators.

## Dirty Dozen Payloads (Targeted to break Identity/Integrity)

1. **Anonymous Write**: Attempt to create a project without authentication. -> `PERMISSION_DENIED`
2. **Unauthorized Write**: Sign in as a different user (e.g., `dndncncn6@gmail.com`) and try to create a project. -> `PERMISSION_DENIED`
3. **Ghost Field Update**: Try to add `isAdmin: true` to a project document. -> `PERMISSION_DENIED` (Strict schema)
4. **ID Poisoning**: Attempt to create a project with a 2MB string as ID. -> `PERMISSION_DENIED` (`isValidId`)
5. **Type Mismatch**: Try to set `order` to a string instead of a number. -> `PERMISSION_DENIED` (Schema validation)
6. **Self-Promotion**: Try to write to the `admins` collection as a normal user. -> `PERMISSION_DENIED`
7. **Bypassing isFeatured**: Try to update a project to be featured without admin rights. -> `PERMISSION_DENIED`
8. **Resource Exhaustion**: Send an array of 1000 tags. -> `PERMISSION_DENIED` (Size constraints)
9. **Timestamp Spoofing**: Provide a future client-side date for `createdAt`. -> `PERMISSION_DENIED` (Enforce `request.time`)
10. **Shadow Delete**: Try to delete a project as a non-admin. -> `PERMISSION_DENIED`
11. **Immutable Field Change**: Try to change `projectId` inside the document after creation. -> `PERMISSION_DENIED`
12. **Null Span**: Try to create a project with an invalid `span` string. -> `PERMISSION_DENIED` (Enum validation)

## Test Runner (Conceptual)
Tests will verify that any write to `/projects/` or `/admins/` is rejected unless the `request.auth.token.email` matches the verified admin email.
