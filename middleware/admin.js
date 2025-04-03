export default function ({ $auth, redirect }) {
  // Check if user is not logged in or doesn't have the correct email
  if (!$auth.loggedIn || $auth.user.email !== 'kakooljay@gmail.com') {
    return redirect('/')
  }
}
