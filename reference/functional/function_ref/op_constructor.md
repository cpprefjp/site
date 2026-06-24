# コンストラクタ
* functional[meta header]
* std[meta namespace]
* function_ref[meta class]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
template<class F> function_ref(F* f) noexcept;  // (1)

template<class F>
constexpr function_ref(F&& f) noexcept;  // (2)

template<auto f>
constexpr function_ref(constant_arg_t<f>) noexcept;  // (3)
template<auto f, class U>
constexpr function_ref(constant_arg_t<f>, U&& obj) noexcept;  // (4)
template<auto f, class T>
constexpr function_ref(constant_arg_t<f>, /*cv*/ T* obj) noexcept;  // (5)

constexpr function_ref(const function_ref&) noexcept = default;  // (6)
```
* constant_arg_t[link /reference/utility/constant_arg_t.md]

## 概要
`function_ref`オブジェクトを構築する。

`function_ref`クラステンプレートパラメータのnoexcept例外指定 *noex* に応じて、説明用の`bool`型テンプレート定数`is-invocable-using<T...>`を次のように定義する :

- *noex* が`true`のとき : [`is_nothrow_invocable_r_v`](/reference/type_traits/is_nothrow_invocable_r.md)`<R, T..., ArgTypes...>`
- *noex* が`false`のとき : [`is_invocable_r_v`](/reference/type_traits/is_invocable_r.md)`<R, T..., ArgTypes...>`

`function_ref`オブジェクトは、説明専用のメンバ変数`thunk-ptr`と`bound-entity`を保持する。

また、説明専用の変数テンプレート`is-convertible-from-specialization<F>`を次のように定義する。型`F`が、あるCV修飾 *cv2* とnoexcept例外指定 *noex2* に対する`function_ref<R(Args...) /*cv2*/ noexcept(/*noex2*/)>`の特殊化を表す場合、`is-convertible-from-specialization<F>`は次の値と等しい :

```cpp
is_convertible_v<R(&)(Args...) noexcept(/*noex2*/), R(&)(Args...) noexcept(/*noex*/)> &&
is_convertible_v<int /*cv*/&, int /*cv2*/&>
```
* is_convertible_v[link /reference/type_traits/is_convertible.md]

そうでない場合、`is-convertible-from-specialization<F>`は`false`である。


## テンプレートパラメータ制約
`function_ref`クラステンプレートパラメータのCV修飾子 *cv* に応じて

- (1) : [`is_function`](/reference/type_traits/is_function.md)`<F>`が`true`、かつ`is-invocable-using<F>`が`true`であること
- (2) : `T`を[`remove_reference_t`](/reference/type_traits/remove_reference.md)`<F>`としたとき
    - [`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<F>`が`function_ref`と同一型ではなく、かつ
    - [`is_member_pointer_v`](/reference/type_traits/is_member_pointer.md)`<T>`が`false`であり、かつ
    - `is-invocable-using</*cv*/ T&>`が`true`であること
- (3) : `F`を`decltype(f)`としたとき
    - `is-invocable-using<F>`が`true`であること
- (4) : `T`を[`remove_reference_t`](/reference/type_traits/remove_reference.md)`<F>`、`F`を`decltype(f)`としたとき
    - [`is_rvalue_reference_v`](/reference/type_traits/is_rvalue_reference.md)`<U&&>`が`false`であり、かつ
    - `is-invocable-using<F, /*cv*/ T&>`が`true`であること
- (5) : `F`を`decltype(f)`としたとき
    - `is-invocable-using<F, /*cv*/ T*>`が`true`であること


## 適格要件
- (3), (4), (5) : `F`を`decltype(f)`としたとき、[`is_pointer`](/reference/type_traits/is_pointer.md)`<F> ||` [`is_member_pointer`](/reference/type_traits/is_member_pointer.md)`<F>`が`true`ならば、`f`がヌルポインタでないこと。


## 事前条件
- (1) : `f`がヌルポインタでないこと。


## 効果
`function_ref`クラステンプレートパラメータのCV修飾子 *cv* に応じて

- (1) : `bound-entity`を`f`で、`thunk-ptr`を説明専用の関数`thunk`へのアドレスで初期化する。
    - [関数呼び出し`thunk(bound-entity, call-args...)`](op_call.md)は[`invoke_r`](/reference/functional/invoke_r.md)`<R>(f, call-args...)`と等価。
- (2) : `is-convertible-from-specialization<`[`remove_cv_t`](/reference/type_traits/remove_cv.md)`<T>>`が`false`の場合、`bound-entity`を[`addressof`](/reference/memory/addressof.md)`(f)`で、`thunk-ptr`を説明専用の関数`thunk`へのアドレスで初期化する。
    - [関数呼び出し`thunk(bound-entity, call-args...)`](op_call.md)は[`invoke_r`](/reference/functional/invoke_r.md)`<R>(static_cast</*cv*/ T&>(f), call-args...)`と等価。
    - `is-convertible-from-specialization<`[`remove_cv_t`](/reference/type_traits/remove_cv.md)`<T>>`が`true`の場合（`f`が互換するシグニチャ・CV修飾をもつ`function_ref`の特殊化であるとき）、`bound-entity`を`f`の`bound-entity`の値で、`thunk-ptr`を`f`の`thunk-ptr`の値で初期化する。これにより、`function_ref`から別の`function_ref`を構築する際に、本来不要な二重の間接呼び出しが回避される。
- (3) : `bound-entity`を未規定オブジェクトへのポインタまたはヌルポインタで、`thunk-ptr`を説明専用の関数`thunk`へのアドレスで初期化する。
    - [関数呼び出し`thunk(bound-entity, call-args...)`](op_call.md)は[`invoke_r`](/reference/functional/invoke_r.md)`<R>(f, call-args...)`と等価。
- (4) : `bound-entity`を[`addressof`](/reference/memory/addressof.md)`(obj)`で、`thunk-ptr`を説明専用の関数`thunk`へのアドレスで初期化する。
    - [関数呼び出し`thunk(bound-entity, call-args...)`](op_call.md)は[`invoke_r`](/reference/functional/invoke_r.md)`<R>(f, static_cast</*cv*/ T&>(obj), call-args...)`と等価。
- (5) : `bound-entity`を`obj`で、`thunk-ptr`を説明専用の関数`thunk`へのアドレスで初期化する。
    - [関数呼び出し`thunk(bound-entity, call-args...)`](op_call.md)は[`invoke_r`](/reference/functional/invoke_r.md)`<R>(f, obj, call-args...)`と等価。
- (6) : コピーコンストラクタ。


## 例外
投げない


## 例
```cpp example
#include <functional>
#include <iostream>
#include <utility>

int ident_func(int x)
{ return x; }

struct ident_functor {
  int operator()(int x) const
  { return x; }
};

struct X {
  int ident_func(int x) const
  { return x; }
};


int main()
{
  // (1) 関数ポインタ
  {
    std::function_ref<int(int)> f1 = &ident_func;
    std::cout << "(1) : " << f1(1) << std::endl;
  }
  // (2) 関数オブジェクト
  {
    ident_functor functor;
    std::function_ref<int(int)> f2 = functor;
    std::cout << "(2) : " << f2(2) << std::endl;
  }
  // (3) メンバ関数
  {
    std::function_ref<int(X&, int)> f3 = std::constant_arg<&X::ident>;
    X obj;
    std::cout << "(3) : " << f3(obj, 3) << std::endl;
  }
  // (4), (5) メンバ関数＋オブジェクト束縛
  {
    X obj;
    std::function_ref<int(int)> f4{std::constant_arg<&X::ident>, obj};
    std::cout << "(4) : " << f4(4) << std::endl;
    std::function_ref<int(int)> f5{std::constant_arg<&X::ident>, &obj};
    std::cout << "(5) : " << f5(5) << std::endl;
  }
  // (6) コピーコンストラクタ
  {
    std::function_ref<int(int)> f1 = &ident_func;
    std::function_ref<int(int)> f6 = f1;
    std::cout << "(6) : " << f6(6) << std::endl;
  }
}
```
* std::constant_arg[link /reference/utility/constant_arg_t.md]

### 出力
```
(1) : 1
(2) : 2
(3) : 3
(4) : 4
(5) : 5
(6) : 6
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0792R14 `function_ref`: a type-erased callable reference](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p0792r14.html)
- [P3774R1 Rename `std::nontype`, and make it broadly useful](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3774r1.html)
- [P3961R1 Less double indirection in `function_ref` (RU-220)](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3961r1.html)
    - 別の`function_ref`から構築する際の二重の間接呼び出しを回避するため、説明専用の`is-convertible-from-specialization`を追加し、(2)のコンストラクタの効果を変更した
