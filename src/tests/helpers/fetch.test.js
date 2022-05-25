import { fetchWithoutToken, fetchWithToken } from "../../helpers/fetch";

describe("pruebas en helper fetch", () => {

    let token = '';
  test("fetch sin token debe funcionar", async () => {
    const res = await fetchWithoutToken(
      "auth",
      { email: "juan2@correo.com", password: "123456" },
      "POST"
    );
    const body = await res.json();
    expect(res instanceof Response).toBe(true);
    expect(body.ok).toBe(true);
    token = body.token;

  });

  test("fetch con token debe funcionar", async () => {
    localStorage.setItem("token", token);
    
    const res = await fetchWithToken('events/62894ef52d85f3db5834f492',{},'DELETE');
    const body = await res.json();
    expect(res instanceof Response).toBe(true);
    expect(body.ok).toBe(false);
    expect(body.msg).toBe("Event does not exist with this id");
  });
});
