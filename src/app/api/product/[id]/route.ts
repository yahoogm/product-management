import connectToMongoDB from '@/libs/mongodb';
import products from '@/database/models/product';
import { Params } from '@/utils/product';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    await connectToMongoDB();
    const { id } = params;
    const { nama_produk, keterangan, harga, jumlah } = await req.json();
    await products.findByIdAndUpdate(id, {
      nama_produk,
      keterangan,
      harga,
      jumlah,
    });
    return NextResponse.json(
      { message: 'Success update product' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    await connectToMongoDB();
    const { id } = params;
    const response = await products.findOne({ _id: id });
    return NextResponse.json(
      { message: 'Success get product', data: response },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
