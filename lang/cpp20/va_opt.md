# 可変引数が空でない場合のトークン置換
* cpp20[meta cpp]

## 概要
新たなプリプロセスマクロ`__VA_OPT__`を追加する。このマクロは、マクロのパラメータとして受け取った可変引数が空でない場合に置換するトークンを指定する機能を持つ。

```cpp
#define F(X, ...) f(10, X __VA_OPT__(,) __VA_ARGS__)

F(3);               // f(10, 3); に置換される
F(3, "Hello", 'A'); // f(10, 3, "Hello", 'A'); に置換される
```

可変引数のために単に`__VA_ARGS__`を使用すると、可変引数が空だった場合に、カンマが余ってしまい、「`f(10, 3, );`」のように展開されて構文エラーとなる。`__VA_OPT__`マクロはその問題を回避するために使用できる。

`__VA_OPT__`マクロは引数として、可変引数が空でなかった場合に置換するトークンをとる。関数呼び出しのためのカンマを例として挙げたが、この引数には任意のトークンを指定できる。たとえば、リスト初期化の構文や、`__VA_ARGS__`をトークンに含めることもできる：

```cpp
#define SDEF(sname, ...) S sname __VA_OPT__(= { __VA_ARGS__ })

SDEF(foo);          // S foo; に展開される
SDEF(bar, 1, 2, 3); // S bar = {1, 2, 3}; に展開される
```

このマクロは、同じ仕様でC言語にも提案されている。「[WG14 N2034 Comma omission and comma deletion](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n2034.htm)」を参照。


## 例
```cpp
#include <cstdio>

#define DEBUG_LOG(msg, ...) std::printf("[debug] " msg "\n" __VA_OPT__(,) __VA_ARGS__)

int main()
{
  DEBUG_LOG("hello");       // printf("[debug] hello\n"); に展開される
  DEBUG_LOG("value:%d", 3); // printf("[debug] value:%d\n", 3); に展開される
}
```

### 出力
```
[debug] hello
[debug] value:3
```


## 関連項目
- [C++11 可変引数マクロ](/lang/cpp11/variadic_macros.md)


## 参照
- [P0306R4 Comma omission and comma deletion](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0306r4.html)
