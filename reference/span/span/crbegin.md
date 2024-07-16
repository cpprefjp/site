# crbegin
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr const_reverse_iterator crbegin() const noexcept;
```

## 概要
末尾を指す読み取り専用逆イテレータを取得する。


## 戻り値

```cpp
return rbegin();
```
* rbegin[link ./rbegin.md]


## 例外
投げない

## 例
```cpp example
#include <iostream>
#include <span>
#include <vector>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  std::span<int, 5> sp{v};

  auto cit = sp.crbegin();

  std::cout << *cit << '\n';

  // これはできない
  // *cit = 0;
}
```
* crbegin()[color ff0000]

### 出力
```
5
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照
- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
