import { TransportLayer } from "../../transportation/TransportLayer";
import { TransportUsers } from "../../transportation/TransportUsers";
import Ticket from "../../domainObjects/Ticket";
import Project from "../../domainObjects/Project";
import User from "../../domainObjects/User";
import UserRegistration from "../../domainObjects/UserRegistration";
import inMemoryJWT from "../../domainObjects/inMemoryJWTManager";
import { AxiosResponse } from "axios";

const transportLayer = new TransportLayer();
const testDate = new Date();

const userMock = new User({
  username: "test user" + testDate.getTime(),
  email: "testemail" + testDate.getTime() + "@testemail.com",
});

const projectMock = new Project({
  name: "test project" + testDate.getTime(),
});

const ticketMock = new Ticket({
  title: "test title" + testDate.getTime(),
  description: "test description" + testDate.getTime(),
  due_date: testDate,
  priority: 1,
  project: 1,
  assigned_user: 1,
});

// Log in user before tests.
beforeAll(async () => {
  const testUser = new UserRegistration(
    "TestUser",
    "TestUser@TestUser.com",
    "TestUser"
  );
  return transportLayer
    .loginUserPromise(testUser)
    .then((response: any) => {
      if (response.data.user !== undefined) {
        inMemoryJWT.setToken(response.data.token);
      } else {
        throw new Error("WARNING: Test user non-existant!");
      }
    })
    .catch((err) => {
      throw new Error("WARNING: Error logging in! \n" + err);
    });
});

beforeEach(() => {
  (ticketMock.title = "test title" + testDate.getTime()),
    (ticketMock.description = "test description" + testDate.getTime()),
    ticketMock.dueDate?.setDate(testDate.getDate() + 1),
    (ticketMock.priority = 1),
    (ticketMock.project = 2),
    (ticketMock.assignedUserId = 1);
});

test("get all tickets", async () => {
  return expect(
    transportLayer
      .getAllTicketsPromise()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error.message);
      })
  ).resolves.toBeDefined();
});

test("get one ticket", async () => {
  return expect(
    transportLayer
      .getTicketByIdPromise(1)
      .then((response: any) => {
        return response.data.id;
      })
      .catch((error) => {
        console.log(error.message);
      })
  ).resolves.toBeDefined();
});

test("post one ticket", async () => {
  return expect(
    transportLayer
      .postTicket(ticketMock)
      .then((response: any) => {
        return response.data.id;
      })
      .catch((error) => {
        console.log(error);
      })
  ).resolves.toBeDefined();
});

test("fail to post ticket without title", async () => {
  ticketMock.title = "";
  return expect(
    transportLayer
      .postTicket(ticketMock)
      .then((response: any) => {
        console.log(response.message);
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 400");
});

test("fail to post ticket with too short title", async () => {
  ticketMock.title = "a";

  return expect(
    transportLayer
      .postTicket(ticketMock)
      .then((response: any) => {
        console.log(response.message);
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 400");
});

test("fail to post ticket without description", async () => {
  ticketMock.description = "";
  return expect(
    transportLayer
      .postTicket(ticketMock)
      .then((response: any) => {
        console.log(response.message);
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 400");
});

test("fail to post ticket without project", async () => {
  ticketMock.project = null;
  return expect(
    transportLayer
      .postTicket(ticketMock)
      .then((response: any) => {
        console.log(response.message);
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 400");
});

test("fail to post ticket without priority", async () => {
  ticketMock.priority = null;
  return expect(
    transportLayer
      .postTicket(ticketMock)
      .then((response: any) => {
        console.log(response.message);
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 400");
});

test("fail to post ticket without assigned user", async () => {
  ticketMock.assignedUserId = null;
  return expect(
    transportLayer
      .postTicket(ticketMock)
      .then((response: any) => {
        console.log(response.message);
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 400");
});

test("fail to post ticket with past duedate", async () => {
  ticketMock.dueDate?.setDate(testDate.getDate() - 500);

  return expect(
    transportLayer
      .postTicket(ticketMock)
      .then((response: any) => {
        console.log(response.message);
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 400");
});

// Log out user after tests.
afterAll(async () => {
  inMemoryJWT.deleteToken();
});
