# end
* ranges[meta header]
* std::ranges[meta namespace]
* basic_istream_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr default_sentinel_t end() const noexcept; // (1) C++20
```

## 概要

番兵を取得する。


## 戻り値
以下と等価：

```cpp
return default_sentinel;
```


## 例

```cpp example
#include <ranges>
#include <sstream>
#include <iostream>

int main() {
  auto iss = std::istringstream{"1 2 3 4 5"};
  auto r = std::views::istream<int>(iss);
  auto it = r.begin();
  auto last = r.end();

  for (; it != last; ++it) {
    std::cout << *it << ' ';
  }
}
```
* end[color ff0000]
* begin()[link begin.md]

### 出力

```
1 2 3 4 5 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
