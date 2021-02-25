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
C++における「ヌルポインタ定数」の定義により、マクロ`NULL`の値として`0`や`0L`は規格に適合する定義だが、`(void*)0`は不正である。


## 関連項目
- [C++11 `nullptr`](/lang/cpp11/nullptr.md)
