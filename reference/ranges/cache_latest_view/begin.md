# begin
* ranges[meta header]
* std::ranges[meta namespace]
* cache_latest_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto begin(); // (1) C++26
```

## 概要
先頭を指すイテレータを取得する。

`cache_latest_view`は[`input_range`](/reference/ranges/input_range.md)に限定されるため、`const`版は提供されない。


## 効果
以下と等価：

```cpp
return iterator(*this);
```

ここで、`iterator`は`cache_latest_view`の内部で定義される説明専用のイテレータクラスである。


## 備考
- このイテレータは[`input_iterator`](/reference/iterator/input_iterator.md)のモデルとなるが、[`forward_iterator`](/reference/iterator/forward_iterator.md)のモデルとはならない


## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::ranges::cache_latest_view view{v};

  auto it = view.begin();
  std::println("{}", *it);
}
```

### 出力
```
1
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]
