"use client";

// Persistent Friend Request & Friendship Store (Client & API backed)
// Stores friend requests & friendships in localStorage and syncs reactively across tabs/page reloads.

const FRIENDS_STORAGE_KEY = "phidim_friends_data_v1";

function getInitialData() {
  if (typeof window === "undefined") {
    return {
      requests: [
        {
          id: "req-1",
          senderEmail: "saraswati@phidim.np",
          receiverEmail: "user@phidim.np",
          senderName: "Saraswati Subedi",
          senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
          senderRole: "USER",
          status: "pending", // 'pending' | 'accepted' | 'declined'
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "req-2",
          senderEmail: "user@phidim.np",
          receiverEmail: "bikash@phidim.np",
          senderName: "Ram Shrestha",
          receiverName: "Bikash Thapa",
          status: "pending",
          createdAt: new Date(Date.now() - 7200000).toISOString(),
        },
      ],
      friends: [
        { user1: "user@phidim.np", user2: "rajesh@phidim.np" },
        { user1: "user@phidim.np", user2: "anita@phidim.np" },
        { user1: "dhanrajserma34@gmail.com", user2: "user@phidim.np" },
        { user1: "dhanrajserma34@gmail.com", user2: "semikserma@gmail.com" },
      ],
    };
  }

  try {
    const raw = localStorage.getItem(FRIENDS_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore
  }

  const defaultData = {
    requests: [
      {
        id: "req-1",
        senderEmail: "saraswati@phidim.np",
        receiverEmail: "user@phidim.np",
        senderName: "Saraswati Subedi",
        senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
        senderRole: "USER",
        status: "pending",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
    friends: [
      { user1: "user@phidim.np", user2: "rajesh@phidim.np" },
      { user1: "user@phidim.np", user2: "anita@phidim.np" },
      { user1: "dhanrajserma34@gmail.com", user2: "user@phidim.np" },
      { user1: "dhanrajserma34@gmail.com", user2: "semikserma@gmail.com" },
    ],
  };

  try {
    localStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(defaultData));
  } catch (e) {}

  return defaultData;
}

const listeners = new Set();

function saveData(data) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new Event("phidim_friends_updated"));
    } catch (e) {}
  }
  listeners.forEach((fn) => fn(data));
}

export function subscribeFriendsStore(callback) {
  listeners.add(callback);
  if (typeof window !== "undefined") {
    const handler = () => callback(getInitialData());
    window.addEventListener("phidim_friends_updated", handler);
    return () => {
      listeners.delete(callback);
      window.removeEventListener("phidim_friends_updated", handler);
    };
  }
  return () => listeners.delete(callback);
}

export function getFriendStatus(myEmail, targetEmail) {
  if (!myEmail || !targetEmail) return "none";
  const data = getInitialData();
  const e1 = myEmail.toLowerCase();
  const e2 = targetEmail.toLowerCase();

  // Check if active friends
  const isFriend = data.friends.some(
    (f) =>
      (f.user1.toLowerCase() === e1 && f.user2.toLowerCase() === e2) ||
      (f.user1.toLowerCase() === e2 && f.user2.toLowerCase() === e1)
  );
  if (isFriend) return "friends";

  // Check pending requests
  const req = data.requests.find(
    (r) =>
      r.status === "pending" &&
      ((r.senderEmail.toLowerCase() === e1 && r.receiverEmail.toLowerCase() === e2) ||
        (r.senderEmail.toLowerCase() === e2 && r.receiverEmail.toLowerCase() === e1))
  );

  if (req) {
    if (req.senderEmail.toLowerCase() === e1) return "sent";
    if (req.receiverEmail.toLowerCase() === e1) return "received";
  }

  return "none";
}

export function sendFriendRequest({ senderUser, receiverUser }) {
  const data = getInitialData();
  const sEmail = (senderUser?.email || "user@phidim.np").toLowerCase();
  const rEmail = (receiverUser?.email || "").toLowerCase();

  if (!rEmail || sEmail === rEmail) return false;

  // Check if existing request
  const existingIndex = data.requests.findIndex(
    (r) =>
      (r.senderEmail.toLowerCase() === sEmail && r.receiverEmail.toLowerCase() === rEmail) ||
      (r.senderEmail.toLowerCase() === rEmail && r.receiverEmail.toLowerCase() === sEmail)
  );

  const newReq = {
    id: "req-" + Date.now(),
    senderEmail: sEmail,
    receiverEmail: rEmail,
    senderName: senderUser?.displayName || senderUser?.name || sEmail.split("@")[0],
    senderAvatar: senderUser?.avatar || "",
    senderRole: senderUser?.role || "USER",
    receiverName: receiverUser?.displayName || receiverUser?.name || rEmail.split("@")[0],
    receiverAvatar: receiverUser?.avatar || "",
    receiverRole: receiverUser?.role || "USER",
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  if (existingIndex >= 0) {
    data.requests[existingIndex] = newReq;
  } else {
    data.requests.unshift(newReq);
  }

  saveData(data);
  return true;
}

export function acceptFriendRequest(myEmail, targetEmail) {
  const data = getInitialData();
  const e1 = (myEmail || "").toLowerCase();
  const e2 = (targetEmail || "").toLowerCase();

  // Update request status
  data.requests = data.requests.map((r) => {
    if (
      (r.senderEmail.toLowerCase() === e2 && r.receiverEmail.toLowerCase() === e1) ||
      (r.senderEmail.toLowerCase() === e1 && r.receiverEmail.toLowerCase() === e2)
    ) {
      return { ...r, status: "accepted" };
    }
    return r;
  });

  // Add friendship if not exists
  const exists = data.friends.some(
    (f) =>
      (f.user1.toLowerCase() === e1 && f.user2.toLowerCase() === e2) ||
      (f.user1.toLowerCase() === e2 && f.user2.toLowerCase() === e1)
  );

  if (!exists) {
    data.friends.push({ user1: e1, user2: e2 });
  }

  saveData(data);
}

export function declineFriendRequest(myEmail, targetEmail) {
  const data = getInitialData();
  const e1 = (myEmail || "").toLowerCase();
  const e2 = (targetEmail || "").toLowerCase();

  data.requests = data.requests.filter(
    (r) =>
      !(
        (r.senderEmail.toLowerCase() === e2 && r.receiverEmail.toLowerCase() === e1) ||
        (r.senderEmail.toLowerCase() === e1 && r.receiverEmail.toLowerCase() === e2)
      )
  );

  saveData(data);
}

export function removeFriend(myEmail, targetEmail) {
  const data = getInitialData();
  const e1 = (myEmail || "").toLowerCase();
  const e2 = (targetEmail || "").toLowerCase();

  data.friends = data.friends.filter(
    (f) =>
      !(
        (f.user1.toLowerCase() === e1 && f.user2.toLowerCase() === e2) ||
        (f.user1.toLowerCase() === e2 && f.user2.toLowerCase() === e1)
      )
  );

  saveData(data);
}

export function getPendingIncomingRequests(myEmail) {
  const data = getInitialData();
  const e1 = (myEmail || "").toLowerCase();
  return data.requests.filter(
    (r) => r.receiverEmail.toLowerCase() === e1 && r.status === "pending"
  );
}

export function getMyFriendsList(myEmail) {
  const data = getInitialData();
  const e1 = (myEmail || "").toLowerCase();
  const friendEmails = data.friends
    .filter((f) => f.user1.toLowerCase() === e1 || f.user2.toLowerCase() === e1)
    .map((f) => (f.user1.toLowerCase() === e1 ? f.user2 : f.user1));

  return Array.from(new Set(friendEmails));
}
