import server from "#configs/server";
import "#utils/cron";
import env from "#configs/env";

server.listen(env.PORT, () => {
  console.log(`Server started on port ${env.PORT}`);
});
