# end
* ranges[meta header]
* std::ranges[meta namespace]
* drop_while_view[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
constexpr auto end()
  requires (!simple-view<V>);       // (1) C++20

constexpr auto end() const
  requires range<const V> &&
           indirect_unary_predicate<
             const Pred,
             iterator_t<const V>
           >;                        // (2) C++20
```

## 概要
番兵を取得する。

## 戻り値
- (1), (2) : 以下と等価：
    ```cpp
    return ranges::end(base_);
    ```

ただし、`base_`は元の`view`を表すメンバ変数。

## 例

```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::ranges::drop_while_view r{vec, [](int x) { return x < 6; }};

  auto it = r.begin();
  auto end_it = r.end();
  while (it != end_it) {
    int x = *it;
    std::cout << x << " ";
    ++it;
  }
  std::cout << std::endl;
}
```
* end[color ff0000]
* begin[link begin.md]

### 出力

```
6 7 8 9 10 
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]