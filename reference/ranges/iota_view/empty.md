# empty
* ranges[meta header]
* std::ranges[meta namespace]
* iota_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr bool empty() const;
```

## 概要

[`iota_view`](../iota_view.md)が空かどうかを取得する

## 効果

```cpp
return value_ == bound_;
```

空の場合に`true`を返す。

## 備考

C++20当初、この関数は[`view_interface`](/reference/ranges/view_interface.md)を通じて提供されていた。しかし、[`size()`](size.md)の制約を満たさない様な型の範囲を生成しなおかつ`input_range`となる場合、その様な範囲は空ではないことが分かるにも関わらず`view_interface::empty()`は無効化されてしまっていた。

この問題を回避するために、本メンバ関数が追加された。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v;
  auto it = std::back_inserter(v);
  
  auto r = std::views::iota(it);
  std::cout << std::boolalpha << r.empty() << "\n";
}
```

### 出力
```
false
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): ?
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

## 参照

- [LWG Issue 4001. `iota_view` should provide `empty`](https://cplusplus.github.io/LWG/issue4001)
