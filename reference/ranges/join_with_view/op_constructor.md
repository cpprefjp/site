# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* join_with_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
join_with_view()
  requires default_initializable<V> && default_initializable<Pattern> = default; // (1) C++23

constexpr explicit join_with_view(V base, Pattern pattern);                      // (2) C++23
```

## 概要

[`join_with_view`](../join_with_view.md)オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : 元となるviewとデリミタパターンを指定して構築

## 効果

- (1) : `base_`と`pattern_`をデフォルト構築する
- (2) : `base_`を`std::move(base)`で、`pattern_`を`std::move(pattern)`で初期化する

## 例
```cpp example
#include <iostream>
#include <ranges>
#include <vector>
#include <string>

int main() {
  std::vector<std::string> words = {"hello", "world", "join"};
  std::string delimiter = "-";

  std::ranges::join_with_view view{words, delimiter};
  for (char c : view) {
    std::cout << c;
  }
  std::cout << std::endl;
}
```
* join_with_view[color ff0000]

### 出力
```
hello-world-join
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 13.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??
