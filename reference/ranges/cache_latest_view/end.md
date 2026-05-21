# end
* ranges[meta header]
* std::ranges[meta namespace]
* cache_latest_view[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
constexpr auto end(); // (1) C++26
```

## 概要
番兵を取得する。

`cache_latest_view`は[`input_range`](/reference/ranges/input_range.md)に限定されるため、`const`版は提供されない。


## 効果
以下と等価：

```cpp
return sentinel(*this);
```

ここで、`sentinel`は`cache_latest_view`の内部で定義される説明専用の番兵クラスである。


## 備考
- `cache_latest_view`は[`common_range`](/reference/ranges/common_range.md)のモデルとならないため、イテレータ型と番兵型は異なる型となる


## 例
```cpp example
#include <ranges>
#include <vector>
#include <print>

int main() {
  std::vector<int> v = {1, 2, 3, 4, 5};

  std::ranges::cache_latest_view view{v};

  int count = 0;
  for (auto it = view.begin(); it != view.end(); ++it) {
    ++count;
  }
  std::println("{}", count);
}
```

### 出力
```
5
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 21 [mark verified]
- [GCC](/implementation.md#gcc): 15.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]
