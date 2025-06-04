# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* enumerate_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
enumerate_view()
  requires default_initializable<V> = default;  // (1) C++23

constexpr explicit
enumerate_view(V base);                         // (2) C++23
```

## 概要

- (1) : デフォルトコンストラクタ
- (2) : 元となるRangeを受け取るコンストラクタ

## 効果

- (1) : `base_`をデフォルト構築する
- (2) : `base_`を`std::move(base)`で初期化する

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  // (1) デフォルトコンストラクタ
  std::ranges::enumerate_view<std::ranges::empty_view<int>> ev1;
  
  // (2) 元となるRangeを受け取るコンストラクタ
  std::vector<char> v = {'a', 'b', 'c'};
  std::ranges::enumerate_view ev2(v);
  
  for (auto [index, value] : ev2) {
    std::cout << index << ": " << value << std::endl;
  }
}
```
* std::ranges::enumerate_view[color ff0000]

### 出力
```
0: a
1: b
2: c
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 7 [mark verified]

## 参照
- [N4950 26.7.23 Enumerate view](https://timsong-cpp.github.io/cppwp/n4950/range.enumerate)