# end
* ranges[meta header]
* std::ranges[meta namespace]
* ref_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr sentinel_t<R> end() const; // (1) C++20
```

## 概要

番兵を取得する。


## 戻り値
メンバ変数`r_`として保持しているRangeへのポインタがあるとして、以下を返す：

```cpp
ranges::end(*r_);
```
* ranges::end[link /reference/ranges/end.md]



## 例
```cpp example
#include <iostream>
#include <vector>
#include <ranges>

int main() {
  std::vector<int> v = {1, 2, 3};
  auto r = std::ranges::ref_view(v);
  auto it = r.begin();
  auto end = r.end();

  while (it != end) {
    std::cout << *it << ' ';
    ++it;
  }
}
```
* end[color ff0000]
* begin()[link begin.md]

### 出力
```
1 2 3 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
