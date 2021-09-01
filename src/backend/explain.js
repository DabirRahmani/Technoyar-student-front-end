import RefreshRequest from "./auth/refresh";
import MainAxios from "./MainAxios";

const ExplainRequest = ({ datacaller }) => {
  const TokenGenerator = ({ token, err }) => {
    if (err) {
      datacaller({ err: true });
    } else {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      MainAxios()
        .get("/mentors/get14additionalExplanations", config)
        .then((e) => {
          datacaller(e.data);
        })
        .catch((e) => {
          datacaller("error");
        });
      //درخواست چک کردن اینترنت
    }
  };

  RefreshRequest({ calllerFunction: TokenGenerator });
};

export default ExplainRequest;
