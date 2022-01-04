import { TransportLayer } from "../../transportation/TransportLayer";
import { TransportUsers } from "../../transportation/TransportUsers";
import Ticket from "../../domainObjects/Ticket";
import Project from "../../domainObjects/Project";
import User from "../../domainObjects/User";

const transportLayer = new TransportLayer();
const userTransportLayer = new TransportUsers();
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

beforeAll(() => {});

test("Error caught when not logged in and getting tickets", async () => {
  return expect(
    transportLayer
      .getAllTicketsPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 401");
});

test("Error caught when not logged in and getting tickets", async () => {
  return expect(
    transportLayer
      .postTicket(ticketMock)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 401");
});

test("Error caught when not logged in and getting tickets", async () => {
  return expect(
    transportLayer
      .updateTicketPromise(ticketMock)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 401");
});

test("Error caught when not logged in and getting users", async () => {
  return expect(
    userTransportLayer
      .getAllUsersPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 401");
});

test("Error caught when not logged in and posting user", async () => {
  return expect(
    userTransportLayer
      .postUser(userMock)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 401");
});

test("Error caught when not logged in and updating user", async () => {
  return expect(
    userTransportLayer
      .updateUserPromise(userMock)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 401");
});

test("Error caught when not logged in and getting projects", async () => {
  return expect(
    transportLayer
      .getAllProjectPromise()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 401");
});

test("Error caught when not logged in and posting projects", async () => {
  return expect(
    transportLayer
      .postProject(projectMock)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 401");
});

test("Error caught when not logged in and updating projects", async () => {
  return expect(
    transportLayer
      .updateProjectPromise(projectMock)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.message;
      })
  ).resolves.toContain("Request failed with status code 401");
});
