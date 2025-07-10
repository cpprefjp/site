# pred
* ranges[meta header]
* std::ranges[meta namespace]
* drop_while_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr const Pred& pred() const;
```

## 概要

メンバ変数として保持している述語を取得する。

## 戻り値

述語`Pred`のオブジェクトを[`movable-box`](../movable_box.md)(C++20は[`copyable-box`](../copyable_box.md))でラップした `pred_`というメンバに保持するとして

```cpp
return *pred_;
```

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::ranges::drop_while_view dwv{vec, [](int i) { return i < 6; }};

  std::cout << dwv.pred()(3) << '\n';
  std::cout << dwv.pred()(7) << '\n';
}
```
* pred[color ff0000]
* drop_while_view[link ../drop_while_view.md]

### 出力

```
1
0
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]
