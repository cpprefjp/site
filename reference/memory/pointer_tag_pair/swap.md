# swap
* memory[meta header]
* std[meta namespace]
* pointer_tag_pair[meta class]
* function[meta id-type]
* cpp29[meta cpp]

```cpp
constexpr void swap(pointer_tag_pair& o) noexcept; // (1) C++29
```

## 概要
他の`pointer_tag_pair`オブジェクトと値を入れ替える。


## 効果
`*this`と`o`の値を交換する。


## 例外
投げない。


## 例
```cpp
#include <memory>
#include <iostream>

int main()
{
  int x = 1;
  int y = 2;
  std::pointer_tag_pair<int*, 1, bool> p{&x, false};
  std::pointer_tag_pair<int*, 1, bool> q{&y, true};

  p.swap(q);

  std::cout << *p.pointer() << ':' << p.tag() << std::endl;
}
```
* swap[color ff0000]
* std::pointer_tag_pair[link ../pointer_tag_pair.md]
* p.pointer()[link pointer.md]
* p.tag()[link tag.md]

### 出力
```
2:1
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
