const admin = require("firebase-admin");
const fs = require('fs');
const path = require('path');

const serviceAccountPath = path.join(__dirname, "../service-account.json");

if (!fs.existsSync(serviceAccountPath)) {
    console.error("❌ ERROR: service-account.json not found!");
    console.error("1. Go to Firebase Console -> Project Settings -> Service accounts");
    console.error("2. Click 'Generate new private key'");
    console.error("3. Save file as 'service-account.json' in project root");
    process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "pistore-26c10"
});

const db = admin.firestore();
const auth = admin.auth();

async function createAdminUser() {
    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
        console.error("Usage: node scripts/create-admin.js <email> <password>");
        process.exit(1);
    }

    try {
        let uid;

        // 1. Try to create user or get existing
        try {
            const userRecord = await auth.createUser({
                email: email,
                password: password,
                emailVerified: true,
                displayName: "Admin User"
            });
            uid = userRecord.uid;
            console.log(`✅ User created: ${email}`);
        } catch (error) {
            if (error.code === 'auth/email-already-exists') {
                console.log(`ℹ️ User ${email} already exists, promoting to admin...`);
                const user = await auth.getUserByEmail(email);
                uid = user.uid;
            } else {
                throw error;
            }
        }

        // 2. Set Admin Role in Firestore
        await db.collection("users").doc(uid).set({
            email: email,
            role: "admin",
            createdAt: new Date(),
            lastLogin: new Date() // Reset login for fresh start
        }, { merge: true });

        console.log(`🎉 Success! ${email} is now an ADMIN.`);
        console.log("👉 Login at: http://localhost:3000/account/login");

    } catch (error) {
        console.error("❌ Error:", error.message);
    } finally {
        process.exit();
    }
}

createAdminUser();
