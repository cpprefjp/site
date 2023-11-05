# crend
* span[meta header]
* std[meta namespace]
* span[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
constexpr const_reverse_iterator crend() const noexcept;
```

## 概要
先頭の前を指す読み取り専用逆イテレータを取得する。


## 戻り値

```cpp
return rend();
```
* rend[link ./rend.md]


## 例外
投げない

## 例
```cpp example
#include <iostream>
#include <span>
#include <vector>

template<typename I, std::sentinel_for<I> S>
bool is_iter_pair(I, S) {
  return true;
}

bool is_iter_pair(...) {
  return false;
}

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  std::span<int, 5> sp{v};

  auto cit = sp.crend();
  --cit;

  std::cout << *cit << '\n';

  std::cout << std::boolalpha;
  std::cout << is_iter_pair(sp.crbegin(), sp.crend()) << '\n';
  std::cout << is_iter_pair(sp.rbegin(), sp.crend()) << '\n';
}
```
* crend()[color ff0000]
* sentinel_for[link /reference/iterator/sentinel_for.md]

### 出力
```
1
true
true
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.1
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6

## 参照
- [P2278R4 `cbegin` should always return a constant iterator](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2278r4.html)
