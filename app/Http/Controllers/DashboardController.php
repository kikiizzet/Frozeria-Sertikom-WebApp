<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        if ($request->has('search') && $request->search != '') {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('category') && $request->category != '') {
            $query->where('category_id', $request->category);
        }

        $products = $query->paginate(10)->withQueryString();

        $totalProducts = Product::count();
        $totalCategories = Category::count();
        $lowStock = Product::where('stock', '<', 20)->where('stock', '>', 0)->count();
        $outOfStock = Product::where('stock', 0)->count();

        $categories = Category::all();

        return Inertia::render('Dashboard/Index', [
            'products' => $products,
            'totalProducts' => $totalProducts,
            'totalCategories' => $totalCategories,
            'lowStock' => $lowStock,
            'outOfStock' => $outOfStock,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category'])
        ]);
    }
}
