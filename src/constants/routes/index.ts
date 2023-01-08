import { include } from "named-urls";

const routes = {
  public: include("/", {
    login: "login",
    register: "register",
    forgotPassword: "forgot-password",
    resetPassword: "reset-password/:token",
    contest: "contest/:id",
    privacyPolicy: "privacy-policy",
    termsOfService: "terms-of-service",
    responsibleGaming: "responsible-gaming",
  }),
  dashboard: include("/", {
    home: "/battleground",
    contests: "contests",
    league: include("league/", {
      home: "",
      import: "import",
      importInvite: ":id/import-invite",
      invitation: "invitation/:token",
      publicInvitation: "public-invitation/:token",
      manage: ":id/",
    }),
    privateGroup: "private-group",
    wallet: "wallet",
  }),
  profile: include("/profile", {
    home: "",
  }),
};

export default routes;
