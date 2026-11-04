import http from "http";
import app from "./server.js";

const PORT = 5055; // Use dedicated test port

const runTests = async () => {
  const server = app.listen(PORT, async () => {
    console.log(`\n========================================`);
    console.log(`  STARTING CAREERSYNC API TEST SUITE   `);
    console.log(`========================================\n`);

    const request = (method, path, body = null, token = null) => {
      return new Promise((resolve, reject) => {
        const payload = body ? JSON.stringify(body) : null;
        const headers = {
          "Content-Type": "application/json",
        };
        if (payload) {
          headers["Content-Length"] = Buffer.byteLength(payload);
        }
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const req = http.request(
          {
            hostname: "localhost",
            port: PORT,
            path,
            method,
            headers,
          },
          (res) => {
            let data = "";
            res.on("data", (chunk) => (data += chunk));
            res.on("end", () => {
              try {
                resolve({ status: res.statusCode, data: JSON.parse(data) });
              } catch (e) {
                resolve({ status: res.statusCode, data });
              }
            });
          }
        );

        req.on("error", reject);
        if (payload) req.write(payload);
        req.end();
      });
    };

    try {
      // 1. Root Health Check
      console.log("[TEST 1] Testing Health Check GET / ...");
      const res1 = await request("GET", "/");
      console.log(`  Status: ${res1.status} | Data: "${res1.data}"`);
      if (res1.status === 200 && res1.data.includes("CareerSync AI API Running")) {
        console.log("  PASS: Health check responded successfully.\n");
      } else {
        throw new Error("Health check failed");
      }

      // 2. Student Registration
      const testEmail = `student_${Date.now()}@college.edu`;
      console.log(`[TEST 2] Testing Student Signup POST /api/auth/signup (${testEmail}) ...`);
      const res2 = await request("POST", "/api/auth/signup", {
        name: "Test Student",
        email: testEmail,
        password: "securePassword123!",
      });
      console.log(`  Status: ${res2.status} | Message: "${res2.data.message}" | Token present: ${!!res2.data.token}`);
      if (res2.status === 201 && res2.data.token) {
        console.log("  PASS: Signup successful and JWT token received.\n");
      } else {
        throw new Error("Signup test failed: " + JSON.stringify(res2.data));
      }

      // 3. Duplicate Email Prevention
      console.log("[TEST 3] Testing Duplicate Email Validation ...");
      const res3 = await request("POST", "/api/auth/signup", {
        name: "Another Student",
        email: testEmail,
        password: "securePassword123!",
      });
      console.log(`  Status: ${res3.status} | Message: "${res3.data.message}"`);
      if (res3.status === 400) {
        console.log("  PASS: Duplicate registration correctly rejected with 400.\n");
      } else {
        throw new Error("Duplicate prevention test failed");
      }

      // 4. Student Login
      console.log("[TEST 4] Testing Student Login POST /api/auth/login ...");
      const res4 = await request("POST", "/api/auth/login", {
        email: testEmail,
        password: "securePassword123!",
      });
      console.log(`  Status: ${res4.status} | Message: "${res4.data.message}" | Token: ${res4.data.token ? "Valid" : "Missing"}`);
      if (res4.status === 200 && res4.data.token) {
        console.log("  PASS: Login authenticated and JWT generated.\n");
      } else {
        throw new Error("Login failed");
      }

      const authToken = res4.data.token;

      // 5. Wrong Password Handling
      console.log("[TEST 5] Testing Wrong Password Rejection ...");
      const res5 = await request("POST", "/api/auth/login", {
        email: testEmail,
        password: "wrong_password_xyz",
      });
      console.log(`  Status: ${res5.status} | Message: "${res5.data.message}"`);
      if (res5.status === 401) {
        console.log("  PASS: Invalid password correctly returned 401 Unauthorized.\n");
      } else {
        throw new Error("Wrong password check failed");
      }

      // 6. Protected Route Verification (GET /api/auth/me)
      console.log("[TEST 6] Testing Protected Route GET /api/auth/me with Bearer token ...");
      const res6 = await request("GET", "/api/auth/me", null, authToken);
      console.log(`  Status: ${res6.status} | User: ${res6.data.user?.name} (${res6.data.user?.email})`);
      if (res6.status === 200 && res6.data.user?.email === testEmail) {
        console.log("  PASS: JWT decoded user verified.\n");
      } else {
        throw new Error("Protected route test failed");
      }

      // 7. Career Roles API
      console.log("[TEST 7] Testing Careers Benchmark GET /api/careers ...");
      const res7 = await request("GET", "/api/careers");
      console.log(`  Status: ${res7.status} | Roles count: ${res7.data.length}`);
      if (res7.status === 200 && res7.data.length >= 5) {
        console.log("  PASS: Benchmark roles loaded successfully.\n");
      } else {
        throw new Error("Careers benchmark test failed");
      }

      console.log("========================================");
      console.log("  ALL MILESTONE 1 TESTS PASSED! (7/7)   ");
      console.log("========================================\n");
    } catch (err) {
      console.error("\nTEST SUITE ERROR:", err.message);
    } finally {
      server.close();
      process.exit(0);
    }
  });
};

runTests();
