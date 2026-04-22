import { getSupabase } from './supabase';
import { products } from '../data/products';

/**
 * Helper to migrate local product data to Supabase.
 * You can call this once from a button or console to seed the DB.
 */
export const migrateProductsToSupabase = async () => {
  const supabase = getSupabase();
  
  console.log('Starting migration...');
  
  const { error } = await supabase
    .from('products')
    .insert(products);

  if (error) {
    console.error('Migration failed:', error);
    return { success: false, error };
  }

  console.log('Migration successful!');
  return { success: true };
};
