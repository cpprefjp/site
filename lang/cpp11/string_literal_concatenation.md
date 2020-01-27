# 文�列リテラルとワイド文�列リテラルの結合
* cpp11[meta cpp]

## 概要
C99互換として、文�列リテラルとワイド文�列リテラルが並んでいたとき、ワイド文�列リテラルとして結合することが規定された。

それまでは、文�列リテラルとワイド文�列リテラルの結合は未定義動作だった。


## 例
```cpp example
#include <iostream>

int main()
{
  // s1とs2、どちらもwchar_t配列となる
  const wchar_t s1[] = "hello" L" world";
  const wchar_t s2[] = L"hello" " world";

  std::wcout << s1 << std::endl;
  std::wcout << s2 << std::endl;
}
```
* std::wcout[link /reference/iostream/cout.md]

### 出力
```
hello world
hello world
```


## 参照
- [N1653 Working draft changes for C99 preprocessor synchronization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1653.htm)
- [WG14/N951 String literals and concatenation](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n951.htm)

