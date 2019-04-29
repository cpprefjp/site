# erase (非メンバ関数)
* string[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class CharT, class Traits, class Allocator, class U>
  void erase(basic_string<CharT, Traits, Allocator>& c, const U& value);
}
```

## 概要
指定した値をもつ要素とその分の領域を、コンテナから削除する。


## 効果
以下と等価：

```
c.erase(remove(c.begin(), c.end(), value), c.end());
```
* c.erase[link erase.md]
* remove[link /reference/algorithm/remove.md]
* c.begin()[link begin.md]
* c.end()[link end.md]


## 戻り値
なし


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  std::string s = " Hello World ";

  // コンテナsから、スペースをすべて削除する
  std::erase(s, ' ');

  std::cout << s << std::endl;
}
```
* std::erase[color ff0000]

### 出力
```
HelloWorld
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 8.0
- [GCC](/implementation.md#gcc): 9.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1209R0 | Adopt consistent container erasure from Library Fundamentals 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1209r0.html)
