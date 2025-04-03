<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function showAll()
    {
        // Fetch all books from the database
        $books = Book::all();

        // Map over the books to add the full URLs and format availability
        $books = $books->map(function ($book) {
            $book->cover_image_url = $book->cover_image ? asset('storage/' . $book->cover_image) : null;
            
            // Check which formats are available
            $book->has_pdf = !empty($book->pdf_file);
            $book->has_text = !empty($book->text_file);
            $book->has_epub = !empty($book->epub_file);
            
            return $book;
        });

        // Return the list of books in the response
        return response()->json([
            'message' => 'Books retrieved successfully',
            'books' => $books,
        ], 200);
    }
} 