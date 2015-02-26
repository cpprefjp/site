#ptrdiff_t
* cstddef[meta header]

```cpp
namespace std {
  typedef implementation-defined ptrdiff_t;
}
```
* implementation-defined[italic]

`ptrdiff_t`は、2 つのポインタの減算の結果を示す型である。これは符号付き整数型であり、互換性のある単純データ型へキャストすることができる。
2 つのポインタの減算は、同じ配列の有効な要素（もしくは単に配列の最後の要素の後）へのポインタとして唯一な定義済みの値を持つように付与される。

他の値については、その動作はシステムの特性とコンパイラの実装に依存する。
