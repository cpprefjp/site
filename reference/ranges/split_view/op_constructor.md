# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* split_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
split_view()
  requires default_initializable<V> &&
           default_initializable<Pattern>
  = default;                                   // (1) C++20

constexpr split_view(V base, Pattern pattern); // (2) C++20
```

## 概要

[`split_view`](../split_view.md)オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : 元となるviewとパターンを指定して構築

## 効果

- (1) : `base_`と`pattern_`をデフォルト構築する
- (2) : `base_`を`std::move(base)`で、`pattern_`を`std::move(pattern)`で初期化する

## 例
```cpp example
#include <iostream>
#include <ranges>
#include <string_view>

int main() {
  using namespace std::literals;
  
  std::string_view text = "hello,world,split";
  std::string_view delimiter = ",";

  std::ranges::split_view view{text, delimiter};
  
  for (auto subrange : view) {
    std::string_view sv{subrange.begin(), subrange.end()};
    std::cout << sv << '\n';
  }
}
```
* split_view[color ff0000]

### 出力
```
hello
world
split
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
