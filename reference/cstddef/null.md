# NULL
* cstddef[meta header]
* macro[meta id-type]

```cpp
#define NULL implementation-defined
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

## 例
```cpp example
#include <cstddef>
int main() {
  int* p = NULL;
  delete p;
}
```

## 備考
- マクロ`NULL`が展開されるヌルポインタ定数はリテラルであることが規定されている。したがって`nullptr`、`0`、`0L`は規格に適合するが、`(void*)0`は適合しない。
- C++98において、「ヌルポインタ定数」は「値が0になる整数定数式」と定義されていた。したがって、マクロ`NULL`の値として`0`や`0L`は規格に適合するが、`(void*)0`は整数定数式ではないため適合しない。
- C++11では、「ヌルポインタ定数」の定義に「[`std::nullptr_t`](/reference/cstddef/nullptr_t.md)型のprvalue」が追加されたため、`nullptr`も規格に適合する。しかし、`NULL`の値の型が変わるとコードの互換性を損なうことから、当面の間`NULL`の値は整数定数式であると思われる。C++11以降は`NULL`ではなく[`nullptr`](/lang/cpp11/nullptr.md)を使用するとよい。

## 関連項目
- [C++11 `nullptr`](/lang/cpp11/nullptr.md)

## 参照
- [Does any major C++ implementation actually define `NULL` as `nullptr`? - Stack Overflow](https://stackoverflow.com/questions/61699775/does-any-major-c-implementation-actually-define-null-as-nullptr)
- [LWG Issue 4182. Definition of `NULL` is too broad](https://cplusplus.github.io/LWG/issue4182)
    - `NULL`が展開されるヌルポインタ定数はリテラルであることが規定された。それ以前は「処理系定義のヌルポインタ定数」としか規定されておらず、任意の定数式を許すように読めたため。規格としてはC++29のワーキングドラフトへ適用されたが、処理系に対する制約の明文化であり、既存の処理系はいずれも満たしているため、C++98へ遡及して適用される
