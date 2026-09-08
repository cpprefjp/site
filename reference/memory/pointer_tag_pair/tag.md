# tag
* memory[meta header]
* std[meta namespace]
* pointer_tag_pair[meta class]
* function[meta id-type]
* cpp29[meta cpp]

```cpp
constexpr tag_type tag() const noexcept; // (1) C++29
```

## 概要
保持しているタグ値を取得する。


## 戻り値
`*this`が表すタグ値。


## 例外
投げない。


## 例
```cpp
#include <memory>
#include <iostream>

int main()
{
  int x = 42;
  std::pointer_tag_pair<int*, 2> p{&x, 3u};

  std::cout << p.tag() << std::endl;
}
```
* tag[color ff0000]
* std::pointer_tag_pair[link ../pointer_tag_pair.md]

### 出力
```
3
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3125R6 constexpr pointer tagging](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3125r6.html)
