# NULL
* cstddef[meta header]
* macro[meta id-type]

```cpp
# define NULL implementation-defined
```

## 概要
マクロ`NULL`は、処理系定義のヌルポインタ定数に展開される。
ヌルポインタ定数は、ポインタがいかなるオブジェクトも指し示さないことを表現するために使われる。

マクロ`NULL`は、以下の標準ヘッダにおいて定義される：

- `<clocale>`
- `<cstddef>`
- `<cstdio>`
- `<cstdlib>`
- `<cstring>`
- `<ctime>`
- `<cwchar>`


## 備考
C++03において、「ヌルポインタ定数」は「値が0の整数リテラル」と定義されていた。したがって、マクロ`NULL`の値として`0`や`0L`は規格に適合する定義だが、`(void*)0`はリテラルではなく式であるため不正である。

C++11では、「ヌルポインタ定数」の定義に「[`std::nullptr_t`](/reference/cstddef/nullptr_t.md)型のprvalue」が追加されたため、`nullptr`も規格に適合する。しかし、`NULL`の値の型が変わるとコードの互換性を損なうことから、当面の間 `NULL` の定義は整数リテラルであると思われる。C++11以降は`NULL`ではなく[`nullptr`](/lang/cpp11/nullptr.md)を使用するとよい。

## 関連項目
- [C++11 `nullptr`](/lang/cpp11/nullptr.md)
