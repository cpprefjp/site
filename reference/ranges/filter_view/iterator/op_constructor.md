# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* filter_view::iterator[meta class]
* function[meta id-type]
* cpp20[meta cpp]

```cpp
public:
  iterator() requires default_initializable<iterator_t<V>> = default;  // (1)

private:
  constexpr iterator(filter_view& parent, iterator_t<V> current);      // (2) 説明専用
```

## 概要

[`filter_view::iterator`](../iterator.md)オブジェクトを構築する。

- (1) : デフォルトコンストラクタ
- (2) : `private`な説明専用コンストラクタ。[`filter_view`](../../filter_view.md)の[`begin()`](../begin.md)から呼び出される


## 効果

- (1) : `current_`、`parent_`をデフォルト構築する
- (2) : `current_`を`std::move(current_)`で、`parent_`を[`addressof`](/reference/memory/addressof.md)`(parent_)`で初期化する

## 例
```cpp example
#include <ranges>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {0, 1, 2, 3, 4, 5};

  std::ranges::filter_view fv{vec, [](int x){ return x % 2 == 0; }};

  // begin()を経由してイテレータを取得する
  auto i = fv.begin();

  std::cout << *i << '\n';
  i++;
  std::cout << *i << '\n';
  i++;
  std::cout << *i << '\n';
}
```
* fv.begin()[link ../begin.md]

### 出力
```
0
2
4
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 13.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 10.1.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 10 [mark verified]

## 参照
- [N4861 24.7.4 Filter view](https://timsong-cpp.github.io/cppwp/n4861/range.filter)
- [N4950 26.7.8 Filter view](https://timsong-cpp.github.io/cppwp/n4950/range.filter)
- [P3059R2 Making user-defined constructors of view iterators/sentinels private](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3059r2.html)
    - C++26で、(2)のユーザー定義コンストラクタを`public`から`private`に移動
