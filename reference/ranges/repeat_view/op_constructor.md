# コンストラクタ
* ranges[meta header]
* std::ranges[meta namespace]
* repeat_view[meta class]
* function[meta id-type]
* cpp23[meta cpp]

```cpp
repeat_view()
  requires default_initializable<T> = default;       // (1) C++23

constexpr explicit
  repeat_view(const T& value, Bound bound = Bound())
    requires copy_constructible<T>;                  // (2) C++23

constexpr explicit
  repeat_view(T&& value, Bound bound = Bound());     // (3) C++23

template <class... TArgs, class... BoundArgs>
  requires constructible_from<T, TArgs...> &&
           constructible_from<Bound, BoundArgs...>
constexpr explicit
  repeat_view(piecewise_construct_t,
              tuple<TArgs...> value_args,
              tuple<BoundArgs...> bound_args = tuple<>{}); // (4) C++23
```

## 概要
[`repeat_view`](../repeat_view.md)オブジェクトを構築する。

- (1) : デフォルト構築
- (2) : `value`と`bound`をコピーして、`*this`に保持する
- (3) : `value`をムーブし、`bound`をコピーして、`*this`に保持する
- (4) : 値型`T`のコンストラクタ引数をタプルにまとめた`value_args`と、繰り返し回数を表す型`Bound`のコンストラクタ引数をタプルにまとめた`bound_args`を転送して、オブジェクトを内部で構築して`*this`に保持する


## 事前条件
- (1), (2) :
    - 型`Bound`が型[`unreachable_sentinel_t`](/reference/iterator/unreachable_sentinel_t.md)でないこと
    - `bound >= 0`であること


## 効果

- (2) : `value_`を`value`で初期化する
- (3) : `value_`を[`std::move`](/reference/utility/move.md)`(value)`で初期化する
- (4) :
    - `value_`を[`make_from_tuple`](/reference/tuple/make_from_tuple.md)`<T>(`[`std::move`](/reference/utility/move.md)`(value_args))`で初期化する
    - `bound_`を[`make_from_tuple`](/reference/tuple/make_from_tuple.md)`<Bound>(`[`std::move`](/reference/utility/move.md)`(bound_args))`で初期化する
    - `bound`が型`unreachable_sentinel_t`である場合、もしくは`bound < 0`である場合、未定義動作を引き起こす


## 例
```cpp example
#include <iostream>
#include <ranges>
#include <string>

int main() {
  // (2) コピー構築
  {
    std::string s1 = "hello";
    for (const std::string& x : std::views::repeat(s1, 3)) {
      std::cout << x << std::endl;
    }
  }
  std::cout << std::endl;

  // (3) ムーブ構築
  {
    std::string s1 = "hello";
    for (const std::string& x : std::views::repeat(std::move(s1), 3)) {
      std::cout << x << std::endl;
    }
  }
  std::cout << std::endl;

  // (4) コンストラクタ引数から構築
  {
    auto r = std::ranges::repeat_view<std::string, int>{
        std::piecewise_construct,
        std::make_tuple(3, 'a'),
        std::make_tuple(3)
    };
    for (const std::string& x : r) {
      std::cout << x << std::endl;
    }
  }
}
```
* std::ranges::repeat_view[color ff0000]
* std::views::repeat[color ff0000]

### 出力
```
hello
hello
hello

hello
hello
hello

aaa
aaa
aaa
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): 17 [mark verified]
- [GCC](/implementation.md#gcc): 13 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2022 Update 6 [mark verified]
