# yield_value
* generator[meta header]
* function template[meta id-type]
* std[meta namespace]
* generator::promise_type[meta class]
* cpp23[meta cpp]

```cpp
suspend_always yield_value(yielded val) noexcept; // (1)

auto yield_value(const remove_reference_t<yielded>& lval)
  requires is_rvalue_reference_v<yielded> &&
    constructible_from<remove_cvref_t<yielded>, const remove_reference_t<yielded>&>;  // (2)

template<class T2, class V2, class Alloc2, class Unused>
  requires same_as<typename generator<T2, V2, Alloc2>::yielded, yielded>
auto yield_value(ranges::elements_of<generator<T2, V2, Alloc2>&&, Unused> g) noexcept; // (3)

template<ranges::input_range Rng, class Alloc>
  requires convertible_to<ranges::range_reference_t<Rng>, yielded>
auto yield_value(ranges::elements_of<Rng, Alloc> r) noexcept; // (4)
```
* generator[link ../../generator.md]
* yielded[link ../../generator.md]
* suspend_always[link /reference/coroutine/suspend_always.md]
* ranges::input_range[link /reference/ranges/input_range.md]
* ranges::elements_of[link /reference/ranges/elements_of.md]
* ranges::range_reference_t[link /reference/ranges/range_reference_t.md]
* remove_reference_t[link /reference/type_traits/remove_reference.md]
* is_rvalue_reference_v[link /reference/type_traits/is_rvalue_reference.md]
* constructible_from[link /reference/concepts/constructible_from.md]
* convertible_to[link /reference/concepts/convertible_to.md]


## 概要
ジェネレータコルーチンにおける[co_yield式](/lang/cpp20/coroutines.md)の動作を制御する。
プログラマが本関数を直接利用することは想定されていない。


## 事前条件
- (2) : Promiseオブジェクトが`*this`となる[コルーチンへのハンドル](/reference/coroutine/coroutine_handle.md)が、ある[`generator`オブジェクト](../../generator.md)`x`のアクティブスタックのトップにあること。
- (3) : Promiseオブジェクトが`*this`となる[コルーチンへのハンドル](/reference/coroutine/coroutine_handle.md)が、ある[`generator`オブジェクト](../../generator.md)`x`のアクティブスタックのトップにあること。ジェネレータ`g.range`に対応するコルーチンが、初期サスペンドポイントにて中断されていること。


## 効果
(1) : 以下と等価
```cpp
value_ = addressof(val)
```
* value_[link ../promise_type.md]
* addressof[link /reference/memory/addressof.md]

(4) : 以下と等価
```cpp
auto nested = [](allocator_arg_t, Alloc, ranges::iterator_t<Rng> i,
                 ranges::sentinel_t<Rng> s)
  -> generator<yielded, ranges::range_value_t<Rng>, Alloc> {
    for (; i != s; ++i) {
      co_yield static_cast<yielded>(*i);
    }
  };  
return yield_value(ranges::elements_of(nested(
  allocator_arg, r.allocator, ranges::begin(r.range), ranges::end(r.range))));
```
* co_yield[link /lang/cpp20/coroutines.md]
* generator[link ../../generator.md]
* yielded[link ../../generator.md]
* allocator_arg_t[link /reference/memory/allocator_arg_t.md]
* allocator_arg[link /reference/memory/allocator_arg_t.md]
* ranges::iterator_t[link /reference/ranges/iterator_t.md]
* ranges::sentinel_t[link /reference/ranges/sentinel_t.md]
* ranges::range_value_t[link /reference/ranges/range_value_t.md]
* ranges::elements_of[link /reference/ranges/elements_of.md]
* r.range[link /reference/ranges/elements_of.md]
* r.allocator[link /reference/ranges/elements_of.md]
* ranges::begin[link /reference/ranges/begin.md]
* ranges::end[link /reference/ranges/end.md]


## 戻り値
- (1) : [`suspend_always{}`](/reference/coroutine/suspend_always.md)
- (2) : `lval`を用いて直接非リスト初期化(direct-non-list-initialized)された[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<`[`yielded`](../../generator.md)`>`型オブジェクトを保持し、[説明専用メンバ`value_`](../promise_type.md)が保持されたオブジェクトを指してコルーチンを中断(suspend)するメンバ関数をもつ、未規定の型の[Awaitableオブジェクト](/lang/cpp20/coroutines.md)。
- (3) : ジェネレータ`g.range`の所有権を受け取り、メンバ関数`await_ready`は`false`を返し、メンバ関数`await_suspend`は`x`のアクティブスタックに`g.range`に対応する[コルーチンハンドル](/reference/coroutine/coroutine_handle.md)をpushしてから`g.range`を再開(resume)し、メンバ関数`await_resume`は[説明専用メンバ`except_`](../promise_type.md)が例外を保持している場合に[`rethrow_exception`](/reference/exception/rethrow_exception.md)`(except_)`を行う、未規定の型の[Awaitableオブジェクト](/lang/cpp20/coroutines.md)。


## 例外
- (1) : 投げない。
- (2) : 格納されるオブジェクトの初期化によって送出された例外。


## 備考
この関数を呼び出す`co_yield`式は`void`型となる。


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`unhandled_exception`](unhandled_exception.md)
