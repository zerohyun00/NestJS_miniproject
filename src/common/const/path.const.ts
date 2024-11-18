import { join } from 'path';

// 루트 폴더
export const PROJECT_ROOT_PATH = process.cwd();
// public 폴더 이름
export const PUBLIC_FOLDER_NAME = 'public';
// 제품 이미지를 저장할 폴더 이름
export const PRODUCTS_FOLDER_NAME = 'products';

// 실제 public 폴더의 절대 경로
export const PUBLIC_FOLDER_PATH = join(PROJECT_ROOT_PATH, PUBLIC_FOLDER_NAME);

// 제품 이미지를 저장할 폴더 절대경로
// /{프로젝트 위치}/public/products
export const PRODUCT_IMAGE_PATH = join(
  PUBLIC_FOLDER_PATH,
  PRODUCTS_FOLDER_NAME,
);

// 절대경로 x
// /public/products/123123.jpg
export const PRODUCT_PUBLIC_IMAGE_PATH = join(
  PUBLIC_FOLDER_NAME,
  PRODUCTS_FOLDER_NAME,
);
