import { TransportLayer } from "../../transportation/TransportLayer";
import UserRegistration from "../../domainObjects/UserRegistration";

describe("Attempt Register", () => {
  let transportLayer: TransportLayer;
  let success: Boolean;

  // Rest data
  beforeEach(() => {
    transportLayer = new TransportLayer();
    success = false;
  });

  // Define test cases
  const testCases = [
    {
      fakeUser: new UserRegistration("admin", "admin@gmail.com", "admin"),
      expected: false,
    },
  ];

  // Loop over test cases
  testCases.forEach((test) => {
    it(`Attempt register with username (${test.fakeUser.username}) expecting: ${test.expected}`, async () => {
      await transportLayer
        .registerUserPromise(test.fakeUser)
        .then(() => {
          success = true;
        })
        .catch(() => {
          success = false;
        });

      expect(success).toBe(test.expected);
    });
  });
});
