# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* join_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
join_view()
  requires default_initializable<V> = default; // (1) C++20

constexpr explicit join_view(V base);          // (2) C++20
```

## 概要

[`join_view`](../join_view.md)オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : 元となるviewを指定して構築

## 効果

- (1) : `base_`をデフォルト構築する
- (2) : `base_`を`std::move(base)`で初期化する

## 例
```cpp example
#include <iostream>
#include <ranges>
#include <vector>
#include <string>

int main() {
  std::vector<std::string> words = {"hello", "world", "join"};

  std::ranges::join_view view{words};
  for (char c : view) {
    std::cout << c;
  }
  std::cout << std::endl;
}
```
* join_view[color ff0000]

### 出力
```
helloworldjoin
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
