export default function ({ $auth, redirect }) {
  if (!$auth.loggedIn || $auth.user.email !== 'kakooljay@gmail.com') {
    return redirect('/')
  }
} 