# end
* ranges[meta header]
* std::ranges[meta namespace]
* to_input_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<V>); // (1) C++26

constexpr auto end() const
  requires range<const V>;    // (2) C++26
```

## 概要
番兵を取得する。

## 効果
以下と等価：

```cpp
return ranges::end(base_);
```

## 備考
- `to_input_view`は[`common_range`](/reference/ranges/common_range.md)コンセプトを満たさないため、イテレータ型と番兵型は異なる型となる


## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};
  
  std::ranges::to_input_view view{v};
  
  auto it = view.begin();
  auto sentinel = view.end();
  static_assert(!std::same_as<decltype(it), decltype(sentinel)>);
  
  int count = 0;
  for (; it != sentinel; ++it) {
    ++count;
  }
  
  std::cout << "size: " << count << std::endl;
}
```

### 出力
```
size: 5
```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 14 [mark noimpl]