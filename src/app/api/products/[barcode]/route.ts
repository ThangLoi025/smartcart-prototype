import { NextResponse } from 'next/server';
import { mockProducts } from '@/lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ barcode: string }> }
) {
  const resolvedParams = await params;
  const barcode = resolvedParams.barcode;

  const product = mockProducts.find((p) => p.barcode === barcode);

  if (product) {
    return NextResponse.json(product);
  } else {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}
