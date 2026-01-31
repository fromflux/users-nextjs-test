import { TUserDTO } from '@/app/users/types';
import { http, HttpResponse } from 'msw';
import { randomUUID } from 'node:crypto';

const users = [
  {
    id: 'b704baf8-3442-45f2-8c90-9affd73e0266',
    fullname: 'John Maverick',
    age: 19,
    country: 'ALB',
    interests: {
      coding: false,
      music: true,
      reading: false,
      sports: true,
    }
  }
]

export const handlers = [
  http.get('https://localhost/api/users', () => {
    return HttpResponse.json(users)
  }),

  http.post('https://localhost/api/users', async ({ request }) => {
    const payload = await request.json();

    const newUser = {
      ...payload as TUserDTO,
      id: randomUUID(),
    }

    console.log('MSW: newUser', newUser);

    users.push(newUser);

    return HttpResponse.json(newUser);
  }),

  http.get('https://localhost/api/users/:userId', async ({ params }) => {
    const { userId } = params;

    const user = users.find(user => user.id === userId);

    if (!user) {
      return HttpResponse.error();
    }

    return HttpResponse.json(user);
  }),
]