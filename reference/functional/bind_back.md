# bind_back
* functional[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <class F, class... Args>
  constexpr unspecified bind_back(F&&, Args&&...);
}
```
* unspecified[italic]

## 概要
関数の引数を末尾から順に部分適用する。

先頭から適用する場合は[`bind_front`](bind_front.md)を用いる。

## テンプレートパラメータ制約
[`decay_t`](/reference/type_traits/decay.md)`<F>`を適用した型を`FD`、
[`std::decay_t`](/reference/type_traits/decay.md)`<Args>...`を適用した型パラメータパックを`BoundArgs`であるとして、

- `FD`が[`std::move_constructible`](/reference/concepts/move_constructible.md)要件を満たすこと
- `BoundArgs`のそれぞれの型`Ti`が[オブジェクト型](/reference/type_traits/is_object.md)である場合、[`std::move_constructible`](/reference/concepts/move_constructible.md)要件を満たすこと


## 適格要件
- [`conjunction_v`](/reference/type_traits/conjunction.md)`<`[`is_constructible`](/reference/type_traits/is_constructible.md)`<FD, F>,` [`is_move_constructible`](/reference/type_traits/is_move_constructible.md)`<FD>,` [`is_constructible`](/reference/type_traits/is_constructible.md)`<BoundArgs, Args>...,` [`is_move_constructible`](/reference/type_traits/is_move_constructible.md)`<BoundArgs>...>`が`true`であること


## 戻り値

呼び出し可能な`f`を[`std::invoke()`](invoke.md)で呼び出した時に必要な引数列に後方一致する`f`と`args...`を完全転送して保持し、後から残りの引数リストを渡すことで`f`を呼び出せる未規定の関数オブジェクトを返す。

返される関数オブジェクトは渡された引数（`f, args...`）を参照として保持せず、適切にコピー/ムーブして保持する。

## 例外
- 関数オブジェクト`f`のムーブによって任意の例外が送出される可能性がある

## この機能が必要になった背景・経緯

C++23で[`Rangeアダプタ`](/reference/ranges/range.md)のユーザー定義がサポートされた。

[`Rangeアダプタオブジェクト`](/reference/ranges/range.md)である`adaptor`が2つ以上の引数をとる場合、以下の3つの式は等しい。

```cpp
adaptor(range, args...)
adaptor(args...)(range)
range | adaptor(args...)
```

ここで、Rangeアダプタオブジェクトの第2引数以降を部分適用した結果が[`Rangeアダプタクロージャオブジェクト`](/reference/ranges/range.md)となる。
ユーザー定義するRangeアダプタオブジェクトの`operator()`において、この部分適用を行うためのユーティリティとして`bind_back`が提案された。

## 例
```cpp example
#include <ranges>
#include <vector>
#include <functional>
#include <print>

template <typename F>
class closure_t : public std::ranges::range_adaptor_closure<closure_t<F>> {
  F f;
public:
  constexpr closure_t(F f) : f(f) { }

  template <std::ranges::range R>
  requires std::invocable<F const&, R>
  constexpr auto operator()(R&& r) const {
    return f(std::views::all(std::forward<R>(r)));
  }
};

template <typename F>
class adaptor_t {
  F f;
public:
  constexpr adaptor_t(F f) : f(f) { }

  template <typename... Args>
  constexpr auto operator()(Args&&... args) const {
    if constexpr (std::invocable<F const&, Args...>) {
      return f(std::forward<Args>(args)...);
    } else {
      return closure_t(std::bind_back(f, std::forward<Args>(args)...));
    }
  }
};

inline constexpr closure_t user_defined_join
  = []<std::ranges::viewable_range R>
    (R&& r) {
      return std::ranges::join_view(std::forward<R>(r));
    };

inline constexpr adaptor_t user_defined_transform
  = []<std::ranges::viewable_range R, typename F>
    (R&& r, F&& f) {
      return std::ranges::transform_view(std::forward<R>(r), std::forward<F>(f));
    };

int main() {
  std::vector<std::vector<int>> vv = {{0, 1, 2}, {3, 4, 5}, {6}};

  std::println("{}", vv | user_defined_join | user_defined_transform([](int x){ return x * x; }));
}
```
* std::bind_back[color ff0000]
* std::ranges::range_adaptor_closure[link /reference/ranges/range_adaptor_closure.md]
* std::bind_back[link /reference/functional/bind_back.md]
* std::invocable[link /reference/concepts/invocable.md]
* std::views::all[link /reference/ranges/all.md]
* std::ranges::range[link /reference/ranges/range.md]
* std::ranges::viewable_range[link /reference/ranges/viewable_range.md]
* std::ranges::join_view[link /reference/ranges/join_view.md]
* std::ranges::transform_view[link /reference/ranges/transform_view.md]

### 出力
```
[0, 1, 4, 9, 16, 25, 36]
```

## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

## 参照
- [P2387R3 Pipe support for user-defined range adaptors](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2387r3.html#nanorange)
- [rangesのパイプにアダプトするには](https://onihusube.hatenablog.com/entry/2022/04/24/010041)
