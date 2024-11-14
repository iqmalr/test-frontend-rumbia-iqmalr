import SignIn from "../fragments/SignIn";

const AuthPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96">
        <SignIn />
      </div>
    </div>
  );
};

export default AuthPage;
