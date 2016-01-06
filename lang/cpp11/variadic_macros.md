#可変引数マクロ
* cpp11[meta cpp]

##概要
C99互換として、可変引数マクロ(variadic macros)が導入された。

関数マクロのパラメータに「`...` (ellipsis : 省略記号)」を指定することで、可変個のパラメータを受け取れる。受け取ったパラメータを使用するには、`__VA_ARGS__`という特殊な識別子を使用する。


##仕様
(執筆中)

##例
```cpp
#include <cstdio>

// 可変個のパラメータを受け取り、std::printf()関数の引数として転送する
#define DEBUG_LOG(fmt, ...) std::printf(fmt, __VA_ARGS__)

int main()
{
  DEBUG_LOG("%s %d", "Hello", 42);
}
```

###出力
```
Hello 42
```

##参照
- [N1653 Working draft changes for C99 preprocessor synchronization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1653.htm)

