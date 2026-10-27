// Schema-less seed for the Harshwal BRD Portal (QA Work Trial).
// Loaded automatically by the mongo container on first boot
// (mounted into /docker-entrypoint-initdb.d).

// Runs once, on first container boot, authenticated as the root user created
// from MONGO_INITDB_ROOT_* (see docker-compose.yml). That same user is what the
// Flask backend connects with, so no extra app user is created here.
db = db.getSiblingDB("harshwal_brd");

// --- users ---------------------------------------------------------------
// Passwords are stored as unsalted MD5 (planted weakness).
//   admin@sample.com      -> Sample@123  (md5 7431c778a9e22c38bb3378aa5604f1f5)
//   consultant@sample.com -> Welcome@1     (md5 3ff8f9dcad3fe711ddf22a59a2b75b2c)
db.users.insertMany([
  {
    id: 1,
    email: "admin@sample.com",
    full_name: "Harshwal Admin",
    password_md5: "7431c778a9e22c38bb3378aa5604f1f5",
    role: "admin",
    otp_code: null,
    otp_expires: null,
    created_at: new Date(),
  },
  {
    id: 2,
    email: "consultant@sample.com",
    full_name: "Harshwal Consultant",
    password_md5: "3ff8f9dcad3fe711ddf22a59a2b75b2c",
    role: "consultant",
    otp_code: null,
    otp_expires: null,
    created_at: new Date(),
  },
]);

// --- brds ----------------------------------------------------------------
db.brds.insertMany([
  {
    id: 1,
    owner_id: 1,
    client_name: "Acme Manufacturing",
    project_type: "Audit",
    title: "FY25 Statutory Audit BRD",
    status: "draft",
    sections: { scope: "Group statutory audit", stakeholders: "CFO, Audit Committee" },
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    owner_id: 2,
    client_name: "Blue Ridge Holdings",
    project_type: "Tax",
    title: "Corporate Tax Advisory BRD",
    status: "draft",
    sections: { scope: "Federal & state tax", stakeholders: "VP Finance" },
    created_at: new Date(),
    updated_at: new Date(),
  },
]);

// share_links and submissions collections are created on first write.
db.share_links.createIndex({ token: 1 }, { unique: true });
