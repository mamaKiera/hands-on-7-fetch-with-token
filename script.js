//receive username and password and return access token
const getAccessToken = async (username, password) => {
  const loginInfo = { username, password };
  // short hand for {username: username, password: password}

  try {
    const res = await fetch("https://api.learnhub.thanayut.in.th/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfo),
    });

    if (res.status !== 200) {
      alert("Could not get access token");
      return;
    }

    const data = await res.json();
    return data.accessToken;
  } catch (err) {
    console.log(err);
  }
};

const getPersonalInfo = async () => {
  const accessToken = localStorage.getItem("Token");

  try {
    const res = await fetch("https://api.learnhub.thanayut.in.th/auth/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status !== 200) {
      alert("Could not get personal info");
      return;
    }

    const data = await res.json(); // js obj

    return data;
  } catch (err) {
    console.log(err);
  }
};

const displayPersonalInfo = (name) => {
  const displayDiv = document.createElement("div");
  displayDiv.textContent = `Hello ${name}!`;

  const loginCard = document.querySelector(".login-card");
  loginCard.appendChild(displayDiv);
};

const init = () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const submitButton = document.getElementById("submit");

  submitButton.addEventListener("click", async (e) => {
    e.preventDefault();

    if (!passwordInput.value || !usernameInput.value) {
      alert("Please input username and password");
      return;
    }

    const accessToken = await getAccessToken(
      usernameInput.value,
      passwordInput.value
    );
    if (!accessToken) return;

    localStorage.setItem("accessToken", accessToken);

    const personalInfo = await getPersonalInfo();
    displayPersonalInfo(personalInfo.name);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
