import { DbConnection } from '../utils/';
import { User } from '../database/entity';

describe('Db actions test suite', () => {
	const conn = new DbConnection();
    const user = new User('test@test.com', 'test-password');
	beforeAll(async () => {
		await conn.create();
	});

	afterAll(async () => {
        await user.remove();
        await conn.clear();
		await conn.close();
	});

    it('Connection should be defined', () => {
		expect(conn).toBeDefined();
	});

    it("Store a user and fetch it", async () => {
        await user.save();
        const foundUser = await User.findOneOrFail({ email: 'test@test.com' });
        expect(foundUser.email).toBe("test@test.com");
    });
});
