import { usersRepository } from "../data-access/repositories/user-repository"
import { groupRepository } from "../data-access/repositories/group-repository"
import usersMock from "./user-mocks.json"
import groupsMock from "./group-mocks.json"
import * as http from 'http'
import request, { SuperTest } from "supertest"
import express, { Application } from "express"
import server from "../index"
import { getValidGroup, getValidUser, validToken } from "./mock"

const port: number | string = process.env.PORT_TESTING || 5000
const appMock: Application = express();

const users = [...usersMock]
const groups = [...groupsMock]
jest.mock("../data-access/repositories/user-repository")
jest.mock("../data-access/repositories/group-repository")

describe("User routes", () => {

  let agent: SuperTest<any>
  let srv: http.Server

  const seedUserData = getValidUser()
  let seedUser: any

  beforeEach((done) => {
    srv = server.listen(4000, () => {
      agent = request(server)
    });
    usersRepository.addUser(seedUserData).then((user) => {
      seedUser = user
      done()
    })
  })

  afterEach((done) => {
    srv && srv.close(done)
  })

  it("GET: /user - return all existed users correctly", async () => {
    const existedUsersAmount = users.filter((user) => !user.isDeleted).length;
    const res = await request(appMock)
      .get("/user")
    expect(res.body).toBe(existedUsersAmount);
  });

  it("GET: /user/:id - return correct user by id", async () => {
    const id = "338883ee-19d6-40b4-9766-32b4f726d2aa";
    const res = await request(srv)
      .get(`/user/${id}`)
      .set("Authorization", validToken);
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(id);
  })

  it("POST: /user - create user correctly", async () => {
    const usersAmount = users.length;
    const res = await request(srv)
      .post("/user")
      .send({ login: "TestUser", password: "testPassw0rd", age: 40 })
      .set("Authorization", validToken)
    expect(res.status).toBe(201);
    expect(res.body.login).toEqual("TestUser");
    expect(res.body).toHaveProperty("id");
    expect(users.length).toEqual(usersAmount + 1);
  })

  it("POST: /user - handle bad request correctly", async () => {
    const usersAmount = users.length;
    const res = await request(srv)
      .post("/user")
      .send({ name: "TestUser", age: 40 })
      .set("Authorization", validToken)
    expect(res.status).toBe(400);
    expect(users.length).toEqual(usersAmount);
  })

  it("PUT: /user/:id - update user correctly", async () => {
    const id = "338883ee-19d6-40b4-9766-32b4f726d2aa";
    const res = await request(srv)
      .put(`/user/${id}`)
      .send({ login: "Four", password: "password4", age: 44 })
      .set("Authorization", validToken)
    expect(res.status).toBe(200);
    expect(res.body.age).toEqual(44);
  })

  it("DELETE: /user/:id - delete user correctly", async () => {
    const id = "338883ee-19d6-40b4-9766-32b4f726d2aa";
    const res = await request(srv)
      .delete(`/user/${id}`)
      .set("Authorization", validToken)
    expect(res.status).toBe(200);
    expect(res.text).toEqual("Deleted");
  })
})

describe("Group routes", () => {

  let agent: SuperTest<any>;
  let srv: http.Server;

  const seedGroupData = getValidGroup();
  let seedGroup: any;

  beforeEach((done) => {
    srv = server.listen(4000, () => {
      agent = request(server);
    });
    groupRepository.createGroup(seedGroupData).then((group) => {
      seedGroup = group;
      done();
    });
  });

  afterEach((done) => {
    srv && srv.close(done);
  });

  it("GET: /group - return groups correctly", async () => {
    const groupsAmount = groups.length;
    const res = await request(srv)
      .get("/group")
      .set("Authorization", validToken);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(groupsAmount);
  });

  it("GET: /group/:id - return correct group by id", async () => {
    const id = "7f50b154-963a-452d-b857-1605013aab5f";
    const res = await request(srv)
      .get(`/group/${id}`)
      .set("Authorization", validToken);
    expect(res.status).toBe(200);
    expect(res.body.id).toEqual(id);
  });

  it("GET: /group/:id - not return non-existed group", async () => {
    const notExistedGroupId = "0ee75a1c-8fee-4e52-a44c-a234a3ffa93d";
    const res = await request(srv)
      .get(`/user/${notExistedGroupId}`)
      .set("Authorization", validToken);
    expect(res.status).toBe(404);
    expect(res.text).toEqual("Not Found");
  });

  it("POST: /group - create group correctly", async () => {
    const groupsAmount = groups.length;
    const res = await request(srv)
      .post("/group")
      .send({ name: "TestGroup", permissions: ["READ"] })
      .set("Authorization", validToken)
    expect(res.status).toBe(201);
    expect(res.body.name).toEqual("TestGroup");
    expect(res.body).toHaveProperty("id");
    expect(groups.length).toEqual(groupsAmount + 1);
  });

  it("POST: /group - handle bad request correctly", async () => {
    const groupsAmount = groups.length;
    const res = await request(srv)
      .post("/group")
      .send({ name: "TestGroup", permissions: ["INCORRECT_VALUE"] })
      .set("Authorization", validToken)
    expect(res.status).toBe(400);
    expect(groups.length).toEqual(groupsAmount);
  });

  it("PUT: /group/:id - update group correctly", async () => {
    const id = "e7fe5cff-0de8-4f26-92f6-1c32fd6c25d7";
    const res = await request(srv)
      .put(`/group/${id}`)
      .send({ name: "EditedGroup", permissions: ["READ", "WRITE", "DELETE"] })
      .set("Authorization", validToken)
    expect(res.status).toBe(200);
    expect(res.body.name).toEqual("EditedGroup");
  });

  it("DELETE: /group/:id - delete group correctly", async () => {
    const groupsAmount = groups.length;
    const id = "e7fe5cff-0de8-4f26-92f6-1c32fd6c25d7";
    const res = await request(srv)
      .delete(`/group/${id}`)
      .set("Authorization", validToken)
    expect(res.status).toBe(200);
    expect(res.text).toEqual("Deleted");
    expect(groups.length).toEqual(groupsAmount - 1);
  });
});
