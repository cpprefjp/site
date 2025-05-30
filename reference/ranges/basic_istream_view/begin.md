# begin
* ranges[meta header]
* std::ranges[meta namespace]
* basic_istream_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto begin(); // (1) C++20
```

## 概要

ストリームから値を1つ読み、それを指すイテレータを取得する。


## 効果
以下と等価：

```cpp
*stream_ >> value_;
return iterator{*this};
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
  std::cout << *it << std::endl;
}
```
* begin[color ff0000]

### 出力

```
1
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
