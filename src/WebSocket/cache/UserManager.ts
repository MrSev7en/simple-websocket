export class UserManager {
  users: Array<any>;

  constructor() {
    this.users = [];
  }

  async add(userinfo: any): Promise<boolean> {
    let _ = false;

    if (!await this.includes(userinfo)) {
      this.users.push(userinfo);
      _ = true;
    }

    return _;
  }

  async includes(userinfo: any): Promise<boolean> {
    let has = false;

    await this.users.forEach(async (u: any) => {
      if (userinfo.client?.id) {
        if (u.client.id === userinfo.client.id) {
          has = true;
        }
      }

      if (userinfo.client?.info?.username) {
        if (u.client.info.username === userinfo.client.info.username) {
          has = true;
        }
      }
    });

    return has;
  }
}
