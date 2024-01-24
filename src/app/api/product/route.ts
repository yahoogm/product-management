import connectToMongoDB from '@/libs/mongodb';
import products from '@/models/product';
import { NextRequest, NextResponse } from 'next/server';
import { ProductData } from '@/utils/product';

export async function GET() {
  try {
    await connectToMongoDB();
    const product = await products.find();
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectToMongoDB();
    const { nama_produk, keterangan, harga, jumlah }: ProductData =
      await req.json();

    if (!nama_produk || !keterangan || !harga || !jumlah) {
      const missingFields = [];
      if (!nama_produk) missingFields.push('nama produk');
      if (!keterangan) missingFields.push('keterangan');
      if (!harga) missingFields.push('harga');
      if (!jumlah) missingFields.push('jumlah');

      return NextResponse.json(
        { message: `${missingFields.join(', ')} harus diisi` },
        { status: 400 }
      );
    }

    await products.create({ nama_produk, keterangan, harga, jumlah });
    return NextResponse.json(
      { message: 'product create', nama_produk },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToMongoDB();
    const id = req.nextUrl.searchParams.get('id');
    await products.findByIdAndDelete(id);
    return NextResponse.json(
      { message: 'Success delete product' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
