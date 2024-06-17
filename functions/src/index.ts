// import * as functions from 'firebase-functions';
// import * as admin from 'firebase-admin';

// admin.initializeApp();

// const db = admin.firestore();

// export const removeExpiredDocuments = functions.pubsub.schedule('* * * * *')
//     .onRun(async (context) => {
//         const now = admin.firestore.Timestamp.now();
//         const fiveMinutesAgo = admin.firestore.Timestamp.fromMillis(now.toMillis() - 2 * 60 * 1000);
//         const expiredTasks = await db.collection('seats')
//             .where("created_at", "<", fiveMinutesAgo)
//             .get();

//         const deletePromises = expiredTasks.docs.map((doc) => {
//             if (doc.data().status == false) {
//                 doc.ref.delete()
//             }
//         }
//         );
//         await Promise.all(deletePromises);
//     });
