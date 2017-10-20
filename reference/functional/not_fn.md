# not_fn
* functional[meta header]
* std[meta namespace]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class F>
  unspecified not_fn(F&& f);
}
```
* unspecified[italic]

## 概要
任意個数の引数をとって`bool`型を返す関数オブジェクトを受け取り、戻り値を論理反転する関数オブジェクトに変換する。


## 効果
説明用の関数オブジェクト`call_wrapper`があるものとして、`call_wrapper(`[`std::forward`](/reference/utility/forward.md)`<F>(f))`を返す。

説明用の関数オブジェクト`call_wrapper`は、以下のようなクラスである：

```cpp
class call_wrapper {
  using FD = decay_t<F>;

  explicit call_wrapper(F&& f); // not_fnをfriendにして呼び出す

public:
  call_wrapper(call_wrapper&&) = default;
  call_wrapper(call_wrapper const&) = default;

  template <class... Args>
  auto operator()(Args&&...) & -> decltype(!declval<invoke_result_of_t<FD&, Args&&...>>());

  template <class... Args>
  auto operator()(Args&&...) const& -> decltype(!declval<invoke_result_of_t<FD const&, Args&&...>>());

  template <class... Args>
  auto operator()(Args&&...) && -> decltype(!declval<invoke_result_of_t<FD, Args&&...>>());

  template <class... Args>
  auto operator()(Args&&...) const&& -> decltype(!declval<invoke_result_of_t<FD const, Args&&...>>());

private:
  FD fd;
};
```
* decay_t[link /reference/type_traits/decay.md]
* declval[link /reference/utility/declval.md]
* invoke_result_of_t[link /reference/type_traits/invoke_result_of_t.md.nolink]

このクラスのコンストラクタは、式`fd =` [`std::forward`](/reference/utility/forward.md)`<F>(f)`を実行する。この式が例外を送出する可能性がある。

このクラスの関数オブジェクトは、以下の式を実行する：

- 左辺値参照版 : `return !`[`INVOKE`](/reference/concepts/Invoke.md)`(fd,` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`
- 右辺値参照版 : `return !`[`INVOKE`](/reference/concepts/Invoke.md)`(`[`std::move`](/reference/utility/move.md)`(fd),` [`std::forward`](/reference/utility/forward.md)`<Args>(args)...)`


## 例
```cpp
#include <iostream>
#include <functional>

bool pred_func(int, char, double)
{
  return true;
}

struct pred_functor {
  bool operator()(double, int)
  {
    return false;
  }
};

int main()
{
  std::cout << std::boolalpha;

  auto not_func = std::not_fn(pred_func);
  std::cout << not_func(1, 'a', 3.14) << std::endl;

  auto not_functor = std::not_fn(pred_functor{});
  std::cout << not_functor(3.14, 1) << std::endl;
}
```
* std::not_fn[color ff0000]

### 出力
```
false
true
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang, C++17 mode](/implementation.md#clang): 3.9.1
- [GCC, C++17 mode](/implementation.md#gcc): 7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


## 参照
- [P0005R4 Adopt `not_fn` from Library Fundamentals 2 for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0005r4.html)
- [LWG Issue 2767. `not_fn` `call_wrapper` can form invalid types](https://wg21.cmeerw.net/lwg/issue2767)
