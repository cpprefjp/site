# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* zip_transform_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
zip_transform_view() = default;            // (1) C++23

constexpr explicit
zip_transform_view(F fun, Views... views); // (2) C++23
```

## 概要

- (1) : デフォルトコンストラクタ
- (2) : 変換関数と各Rangeを受け取るコンストラクタ

## 効果

- (1) : `fun_`と`zip_`をデフォルト構築する
- (2) : `fun_`を`std::move(fun)`で初期化し、`zip_`を`std::move(views)...`で初期化する

## 例
```cpp example
#include <ranges>
#include <vector>
#include <list>
#include <iostream>

int main() {
  // (1) デフォルトコンストラクタ
  std::ranges::zip_transform_view<
    decltype([](int, char) { return 0; }),
    std::ranges::empty_view<int>,
    std::ranges::empty_view<char>
  > ztv1;
  
  // (2) 変換関数と各Rangeを受け取るコンストラクタ
  std::vector<int> v = {1, 2, 3};
  std::list<char> l = {'a', 'b', 'c', 'd'};
  
  auto f = [](int n, char c) { return std::pair{n * 10, c}; };
  std::ranges::zip_transform_view ztv2(f, v, l);
  
  for (auto [n, c] : ztv2) {
    std::cout << n << ", " << c << std::endl;
  }
}
```
* std::ranges::zip_transform_view[color ff0000]

### 出力
```
10, a
20, b
30, c
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 19 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]

## 参照
- [N4950 26.7.26 Zip transform view](https://timsong-cpp.github.io/cppwp/n4950/range.zip.transform)
