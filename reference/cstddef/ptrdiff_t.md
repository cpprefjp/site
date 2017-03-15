# ptrdiff_t
* cstddef[meta header]
* std[meta namespace]
* type-alias[meta id-type]

```cpp
namespace std {
  using ptrdiff_t = implementation-defined;
}
```

`ptrdiff_t`は、2 つのポインタの減算の結果を示す型である。これは符号付き整数型であり、互換性のある単純データ型へキャストすることができる。

2 つのポインタの減算は、同じ配列の有効な要素へのポインタ（もしくは最後の要素のひとつ後へのポインタ）同士の場合のみ定義される。ここで、配列でないオブジェクトは要素数 1 の配列と同じものとして扱う。それ以外の場合の動作は未定義である。
