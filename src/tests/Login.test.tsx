import {TransportLayer} from "../transportation/TransportLayer";
import UserRegistration from "../domainObjects/UserRegistration";

describe('Attempt login', () => {

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
            fakeUser: new UserRegistration("admin", "", "admin"),
            expected: true
        },
        {
            fakeUser: new UserRegistration("admin2", "", "admin"),
            expected: false
        }
    ];

    // Loop over test cases
    testCases.forEach(test => {
        it(`Attempt login with username (${test.fakeUser.username}) expecting: ${test.expected}`, async () => {

            await transportLayer.loginUserPromise(test.fakeUser)
                .then((response: any) => {
                    if (response.data.user !== undefined) {
                        success = true;
                    }
                })
                .catch(() => {
                    success = false;
                });

            expect(success).toBe(test.expected)

        });
    });

});