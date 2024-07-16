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
C++03において、「ヌルポインタ定数」は「値が0になる整数定数式」と定義されていた。したがって、マクロ`NULL`の値として`0`や`0L`は規格に適合するが、`(void*)0`は整数定数式ではないため適合しない。

C++11では、「ヌルポインタ定数」の定義に「[`std::nullptr_t`](/reference/cstddef/nullptr_t.md)型のprvalue」が追加されたため、`nullptr`も規格に適合する。しかし、`NULL`の値の型が変わるとコードの互換性を損なうことから、当面の間`NULL`の値は整数定数式であると思われる。C++11以降は`NULL`ではなく[`nullptr`](/lang/cpp11/nullptr.md)を使用するとよい。

## 関連項目
- [C++11 `nullptr`](/lang/cpp11/nullptr.md)

## 参照
- [Does any major C++ implementation actually define `NULL` as `nullptr`? - Stack Overflow](https://stackoverflow.com/questions/61699775/does-any-major-c-implementation-actually-define-null-as-nullptr)
