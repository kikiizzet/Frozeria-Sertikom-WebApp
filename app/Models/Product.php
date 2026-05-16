<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'category_id', 'image_path', 'stock', 'min_stock', 
        'unit', 'price_sell', 'price_buy', 'weight_size', 'location', 'description'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
