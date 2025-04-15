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
constexpr function_ref(nontype_t<f>) noexcept;  // (3)
template<auto f, class U>
constexpr function_ref(nontype_t<f>, U&& obj) noexcept;  // (4)
template<auto f, class T>
constexpr function_ref(nontype_t<f>, /*cv*/ T* obj) noexcept;  // (5)

constexpr function_ref(const function_ref&) noexcept = default;  // (6)
```
* nontype_t[link /reference/utility/nontype_t.md]

## 概要
`function_ref`オブジェクトを構築する。

`function_ref`クラステンプレートパラメータのnoexcept例外指定 *noex* に応じて、説明用の`bool`型テンプレート定数`is-invocable-using<T...>`を次のように定義する :

- *noex* が`true`のとき : [`is_nothrow_invocable_r_v`](/reference/type_traits/is_nothrow_invocable_r.md)`<R, T..., ArgTypes...>`
- *noex* が`false`のとき : [`is_invocable_r_v`](/reference/type_traits/is_invocable_r.md)`<R, T..., ArgTypes...>`

`function_ref`オブジェクトは、説明専用のメンバ変数`thunk-ptr`と`bound-entity`を保持する。


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
- (2) : `bound-entity`を[`addressof`](/reference/memory/addressof.md)`(f)`で、`thunk-ptr`を説明専用の関数`thunk`へのアドレスで初期化する。
    - [関数呼び出し`thunk(bound-entity, call-args...)`](op_call.md)は[`invoke_r`](/reference/functional/invoke_r.md)`<R>(static_cast</*cv*/ T&>(f), call-args...)`と等価。
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
    std::function_ref<int(X&, int)> f3 = std::nontype<&X::ident>;
    X obj;
    std::cout << "(3) : " << f3(obj, 3) << std::endl;
  }
  // (4), (5) メンバ関数＋オブジェクト束縛
  {
    X obj;
    std::function_ref<int(int)> f4{std::nontype<&X::ident>, obj};
    std::cout << "(4) : " << f4(4) << std::endl;
    std::function_ref<int(int)> f5{std::nontype<&X::ident>, &obj};
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
* std::nontype[link /reference/utility/nontype_t.md]

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
