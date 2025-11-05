UserAuthenticator

A React Native (TypeScript) mobile app providing user signup, login, session persistence, and logout using Context API + AsyncStorage, as required in the assessment.

This app demonstrates:

Authentication using React Context

Signup & Login forms

Input validation (email & password)

Show/Hide password feature

Session persistence using AsyncStorage

Logout functionality

Navigation flows based on auth state

Clean folder structure & reusable components

🛠️ Tech Stack </br>
Library / Tool Purpose </br>
React Native 0.76.9 Framework </br>
node >=18 </br>
React Navigation Screen navigation </br>
AsyncStorage Persisting auth data </br>
TypeScript Type safety </br>
Context API Global auth state </br>
ESLint + Prettier Code quality </br>
📂 Folder Structure </br>
src/ </br>
├─ assets/ # Images etc./   </br>
├─ context/ # AuthContext for login/signup/logout/state </br>
├─ screens/ # Login, Signup, Home </br>
├─ components/ # Input and UI helpers </br>
├─ navigation/ # Root navigation stack </br>
├─ api/ # Mock storage (if needed) </br>
└─ App.tsx </br>

🚀 Features </br>
Feature Description </br>
✅ Signup Screen Enter name, email, password </br>
✅ Login Screen Email + password authentication </br>
✅ Form Validation Email format & password rules </br>
✅ Password Toggle Show/Hide password field </br>
✅ Error Messages Incorrect credentials / Validation errors </br>
✅ AsyncStorage Persistence User remains logged in after app restart </br>
✅ Logout Clears session and redirects to Login </br>
✅ Clean UI Minimal, simple card-based layout </br>
✅ TypeScript Strong typing for navigation & context </br>
📦 Installation & Run </br>
1️⃣ Install dependencies </br>
npm install

or

yarn

2️⃣ Start Metro
npm start

3️⃣ Run on device / emulator

For Android:

npm run android

For iOS:

npm run ios / open ios/UserAuthenticator.xcworkspace via xcode to run on simulator

✅ How It Works

Authentication is handled via Context + AsyncStorage:

signup() stores new user credentials in AsyncStorage

login() verifies credentials and stores active session

logout() clears session storage

App auto-checks session on launch to show correct screen

Navigation automatically updates based on user state.

🔐 Security Note (for Reviewer)!

This demo intentionally uses AsyncStorage for mock auth storage as required in the assessment.

In production, credentials should be hashed securely & verified via backend API.

📸 Demo Flow

✅ Signup success → navigates to Home

<p align="center">
  <img src="./screenshots/signUpSuccess.gif" width="400" />
  <img src="./screenshots/singupValidation.png" width="400" />
</p>
✅ Login success → navigates to Home
<p align="center">
  <img src="./screenshots/loginSuccess.gif" width="400" />
</p>
❌ Login wrong credentials → error message
<p align="center">
  <img src="./screenshots/loginValidation.png" width="400" />
</p>
✅ Logout → returns to Login
<p align="center">
  <img src="./screenshots/logout.gif" width="400" />
</p>
✅ App restart → stays logged in (storage persistence)
<p align="center">
  <img src="./screenshots/loginSessionRestart.gif" width="400" />
</p>
👨‍💻 Developer Info

Project Name: UserAuthenticator </br>
Language: TypeScript </br>
React Native Version: 0.76.9 </br>
Node Required: >= 18 </br>

🏁 Conclusion

This project satisfies all assessment requirements:

✔ Signup </br>
✔ Login </br>
✔ Logout </br>
✔ Persistent Auth </br>
✔ Error handling & validations </br>
✔ Password visibility toggle </br>
✔ Clean architecture </br>
✔ TypeScript typing </br>
✔ No backend — mock persistence as required </br>
