import connectToMongoDB from '@/libs/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToMongoDB();
  return NextResponse.json({ message: 'connect to mongodb' }, { status: 200 });
}
