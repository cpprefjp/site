# range_adaptor_closure
* ranges[meta header]
* std::ranges[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std::ranges {
  template<class D>
    requires is_class_v<D> && same_as<D, remove_cv_t<D>>
  class range_adaptor_closure { };
}
```

## 概要
`range_adaptor_closure` は、Rangeアダプタクロージャオブジェクトの基底クラスとなる空のクラス。

以下の要件を満たす型`T`のオブジェクト`t`は、Rangeアダプタクロージャオブジェクトとなることが保証される。

- `t`はRangeを受け取る単項関数オブジェクトである
- `T`は[`derived_from`](/reference/concepts/derived_from.md)`<range_adaptor_closure<T>>`のモデルである
- `T`以外の型`U`に対して、`T`は`range_adaptor_closure<U>`の派生クラスではない
- `T`は[`range`](range.md)のモデルではない

テンプレートパラメーター`D`は不完全型であってもよい。
ただし、`D`が`|`演算子のオペランドとなる場合は、`D`は完全型かつ[`derived_from`](/reference/concepts/derived_from.md)`<range_adaptor_closure<D>>`のモデルでなければならない。

CV修飾を含む`D`を引数とする `|` 演算子を含む式の動作は、プログラム定義の`operator|`関数が選択された場合は未定義である。

`range_adaptor_closure`を特殊化するプログラムの動作は未定義である。

## この機能が必要になった背景・経緯

Rangeアダプタはその振る舞いだけが規定されていて、Rangeアダプタとなる要件や、具体的なRangeアダプタのクラスは規定されていなかったため、ユーザーが新たに定義することは困難であった。

各処理系がRangeアダプタを実装する際、どのRangeアダプタでも共通するコードを基底クラスにまとめることが行われ、パイプライン記法をサポートする`operator|`も基底クラスに対して実装された。
そのような経験を踏まえ、Rangeアダプタクロージャオブジェクトの基底クラスとして`range_adaptor_closure`が標準化された。

ユーザーは、以下のように`range_adaptor_closure`を継承することで、Rangeアダプタクロージャオブジェクトを定義することができる。

```cpp
class user_defined_closure_t : public std::ranges::range_adaptor_closure<user_defined_closure_t> {
public:
  template <std::ranges::viewable_range R>
  constexpr auto operator()(R&& r) const {
    // user_defined_viewを構築して返す
    return user_defined_view(std::forward<R>(r));
  }
};

inline constexpr user_defined_closure_t user_defined;
```

パイプライン記法をサポートする方法は規定されていないが、一般には処理系がRangeと`range_adaptor_closure`を引数とする`operator|`を定義することで行われる。

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
* std::ranges::range_adaptor_closure[color ff0000]
* std::bind_back[link /reference/functional/bind_back.md]
* std::invocable[link /reference/concepts/invocable.md]
* std::views::all[link all.md]
* std::ranges::range[link range.md]
* std::ranges::viewable_range[link viewable_range.md]
* std::ranges::join_view[link join_view.md]
* std::ranges::transform_view[link transform_view.md]

### 出力
```
[0, 1, 4, 9, 16, 25, 36]
```

## 例 ジェネレータを使用してRangeアダプタを定義する
```cpp example
#include <ranges>
#include <vector>
#include <print>
#include <generator>

class positive_impl : public std::ranges::range_adaptor_closure<positive_impl> {
public:
  template <std::ranges::range R>
  constexpr std::generator<std::ranges::range_value_t<R>> operator()(R&& r) const {
    for(auto&& n : r) {
      if(n > 0) {
        co_yield n;
      }
    }
  }
};

inline constexpr positive_impl positive;

int main() {
  std::vector v = {0, -1, 2, -3, 4, -5, 6, -7};

  std::println(v | positive);
}
```
* std::ranges::range_adaptor_closure[color ff0000]
* std::generator[link /reference/generator/generator.md]
* std::ranges::range[link range.md]
* std::ranges::range_value_t[link range_value_t.md]

### 出力
```
[2, 4, 6]
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
- [N4950 26 Ranges library](https://timsong-cpp.github.io/cppwp/n4950/ranges)
- [rangesのパイプにアダプトするには](https://onihusube.hatenablog.com/entry/2022/04/24/010041)
