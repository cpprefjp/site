# 可変引数マク�
* cpp11[meta cpp]

## 概要
C99互換として、可変引数マク�(variadic macros)が導入された。

関数マク�のパラメータに「`...` (ellipsis : 省略記号)」を指定することで、可変個のパラメータを受け取れる。受け取ったパラメータを使用するには、`__VA_ARGS__`という特殊な�別�を使用する。


## 仕様
可変引数マク�は、0個以上の任意の引数をマク�に渡すための機能である。

可変引数マク�は、以下の構文を持つ：

```
# define identifier ( ... ) replacement-list new-line
# define identifier ( identifier-list , ... ) replacement-list new-line
```

1行目は、パラメータ全てを可変個受け取る場合。2行目は、先�のいくつかのパラメータを名前付きで受け取り、それ以外に可変個のパラメータを受け取る場合。

可変個のパラメータのあとに、名前付きのパラメータを受け取ることはできない。

`...`が指定されたパラメータには、ユーザーはカンマ区切りで可変個の引数を指定する。

可変引数マク�内で、受け取った可変個のパラメータを使用するには、`__VA_ARGS__`�別�を指定する。それを使用することで、`__VA_ARGS__`を指定した部分が、指定された可変個のパラメータで置き換えられる。

空の可変個パラメータを文�列に変換する場合、対応する文�列は`""`となる。


## 例
```cpp example
#include <cstdio>

// 可変個のパラメータを受け取り、std::printf()関数の引数として転送する
// 第1パラメータは必須。
// 第1パラメータのうしろにカンマがあるので、第2パラメータも必須。
# define DEBUG_LOG(fmt, ...) std::printf(fmt, __VA_ARGS__)

// 受け取ったパラメータを展開する
// 0個以上の、任意の個数のパラメータを受け取れる
# define FORWARD_ARGS(...) __VA_ARGS__

void f1(int a, int b, int c)
{
  std::printf("f1 : %d %d %d\n", a, b, c);
}

void f2()
{
  std::printf("f2\n");
}

int main()
{
  DEBUG_LOG("%s %d\n", "Hello", 42);

  f1(FORWARD_ARGS(1, 2, 3)); // 引数3個
  f2(FORWARD_ARGS());        // 引数0個
}
```
* std::printf[link /reference/cstdio/printf.md.nolink]

### 出力
```
Hello 42
f1 : 1 2 3
f2
```


## 関連項目
- [C++11 可変引数テンプレート](variadic_templates.md)
- [C++20 可変引数が空でない場合のトークン置換](/lang/cpp20/va_opt.md)


## 参照
- [N1653 Working draft changes for C99 preprocessor synchronization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1653.htm)

