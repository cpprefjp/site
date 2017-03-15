# NULL
* cstddef[meta header]
* macro[meta id-type]

```cpp
# define NULL implementation-defined
```

このマクロは処理系定義のヌルポインタ定数に展開される。

ヌルポインタは一般に、ポインタがいかなるオブジェクトも指し示さないことを意味するために使われる。

C++における「ヌルポインタ定数」の定義により、`NULL`として`0`, `0L`は規格に適合する定義だが`(void*)0`は不正である。


## 参照
- C++14 - 18.2 [support.types] p3, 4.10 [conv.ptr] p1
