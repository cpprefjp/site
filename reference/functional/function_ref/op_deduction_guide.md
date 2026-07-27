# 推論補助
* functional[meta header]
* std[meta namespace]
* function_ref[meta class]
* cpp26[meta cpp]

```cpp
namespace std {
  template<class F>
  function_ref(F*) -> function_ref<F>; // (1)

  template<auto c, class F0>
  function_ref(constant_wrapper<c, F0>) -> function_ref<see below>; // (2)

  template<auto c, class F, class T>
  function_ref(constant_wrapper<c, F>, T&&) -> function_ref<see below>; // (3)
}
```
* constant_wrapper[link /reference/utility/constant_wrapper.md]


## 概要
`std::function_ref`クラステンプレートの型推論補助。


## テンプレートパラメータ制約
- (1) : [`is_function`](/reference/type_traits/is_function.md)`<F>`が`true`であること。
- (2) : `F`を[`remove_pointer_t`](/reference/type_traits/remove_pointer.md)`<F0>`としたとき、[`is_function`](/reference/type_traits/is_function.md)`<F>`が`true`であること。
- (3) : 次のいずれかであること
    - 型`G`に対して`F`が`R(G::*)(A...) /*cv*/ & noexcept(E)`の形式（参照修飾子`&`は省略可、`E`は`bool`値）、または
    - 型`G`とオブジェクト型`M`に対して`F`が`M G::*`の形式、または
    - 型`G`に対して`F`が`R(*)(G, A...) noexcept(E)`の形式（`E`は`bool`値）であること


## 備考
- (2) : `F`を[`remove_pointer_t`](/reference/type_traits/remove_pointer.md)`<F0>`としたとき、型`function_ref<F>`に推論される。
- (3) : 型`function_ref<R(A...) noexcept(E)>`に推論される。
    - `F`が`M G::*`の形式のとき、`R`は[`invoke_result_t`](/reference/type_traits/invoke_result.md)`<F, T&>`、`A...`は空のパック、`E`は`true`とする。
    - それ以外の形式のときは、テンプレートパラメータ制約の説明を参照。


## 例
```cpp example
#include <functional>

int ident(int x) { return x; }

struct X {
  int data;
  int mf(int x) { return x; }
};

int fun(X& obj) { return obj.data; }

int main()
{
  // (1) 関数ポインタ
  std::function_ref f1{&ident};

  // (2) 関数ポインタ/NTTP
  std::function_ref f2{std::cw<&ident>};

  // (3a) メンバ関数＋オブジェクト束縛
  X obj{42};
  std::function_ref f3a{std::cw<&X::mf>, obj};
  // (3b) メンバ変数＋オブジェクト束縛
  std::function_ref f3b{std::cw<&X::data>, obj};
  // (3c) 関数ポインタ＋第1引数束縛
  std::function_ref f3c{std::cw<&fun>, obj};
}
```
* std::function_ref[color ff0000]
* std::cw[link /reference/utility/constant_wrapper.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 24 [mark verified]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0792R14 `function_ref`: a type-erased callable reference](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p0792r14.html)
- [P3774R1 Rename `std::nontype`, and make it broadly useful](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3774r1.html)
    - `std::nontype`を`std::constant_arg`に改名した。この設計はのちにP3948R1で置き換えられた
- [P3948R1 `constant_wrapper` is the only tool needed for passing constant expressions via function arguments](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3948r1.pdf)
    - (2), (3)の推論補助が受け取るタグを`constant_arg_t`から`constant_wrapper`（変数テンプレート`std::cw`）へ置き換えた
- [LWG Issue 4425 CTAD `function_ref` of data member pointer should produce noexcept signature](https://cplusplus.github.io/LWG/issue4425)
    - (3)でメンバ変数ポインタを渡した場合の推論結果が`noexcept`シグニチャ（`E`が`true`）になるよう修正された
