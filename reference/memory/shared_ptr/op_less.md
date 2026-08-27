# operator<
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  // operator<=>により、以下の演算子が使用可能になる (C++20)
  template <class T, class U>
  bool operator<(const shared_ptr<T>& a,
                 const shared_ptr<U>& b) noexcept; // (1) C++11

  template <class T>
  bool operator<(const shared_ptr<T>& x,
                 nullptr_t) noexcept;              // (2) C++11

  template <class T>
  bool operator<(nullptr_t,
                 const shared_ptr<T>& x) noexcept; // (3) C++11
}
```

## 概要
`shared_ptr`において、左辺が右辺より小さいかを判定する。

比較対象は、`shared_ptr`が指す値ではなく、`shared_ptr`が保持するポインタ値。これは「値ベース(value-based)な比較」と呼ばれる。「所有権ベース(ownership-based)な比較」は、[`owner_before()`](owner_before.md)を参照。


## 戻り値
- (1)
    - C++11 : [`std::common_type`](/reference/type_traits/common_type.md)`<T*, U*>::type`を、`a`と`b`が持つポインタの共通の型`CT`とし、[`std::less`](/reference/functional/less.md)`<CT>(a.`[`get()`](get.md)`, b.`[`get()`](get.md)`)`で比較した結果を返す。
    - C++17 :[`std::less`](/reference/functional/less.md)`<>(a.`[`get()`](get.md)`, b.`[`get()`](get.md)`)`で比較した結果を返す。
- (2)
    - C++11 : [`std::less`](/reference/functional/less.md)`<T*>()(x.`[`get()`](get.md)`, nullptr)`で比較した結果を返す。
    - C++17 : [`std::less`](/reference/functional/less.md)`<typename shared_ptr<T>::element_type*>()(x.`[`get()`](get.md)`, nullptr)`で比較した結果を返す。
- (3)
    - C++11 : [`std::less`](/reference/functional/less.md)`<T*>()(nullptr, x.`[`get()`](get.md)`)`で比較した結果を返す。
    - C++17 : [`std::less`](/reference/functional/less.md)`<typename shared_ptr<T>::element_type*>()(nullptr, x.`[`get()`](get.md)`)`で比較した結果を返す。


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::cout << std::boolalpha;

  std::shared_ptr<int> p1(new int(3));
  std::shared_ptr<int> p2(new int(3));

  bool r1 = p1 < p2;
  std::cout << r1 << std::endl;

  bool r2 = p1 < nullptr;
  std::cout << r2 << std::endl;

  bool r3 = nullptr < p1;
  std::cout << r3 << std::endl;
}
```

### 出力例
```
false
false
true
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.3.6 (`nullptr`バージョン以外) [mark verified], 4.7.4 [mark verified]
- [Clang](/implementation.md#clang): 3.0 (`nullptr`バージョン以外) [mark verified], 3.3 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1) [mark verified], 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
	- 2012までは`nullptr`バージョンがない。


## 参照
- [N2637 Revisiting `std::shared_ptr` comparison](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2637.pdf)
- [P0497R0 Fixes to `shared_ptr` support for arrays](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0497r0.html)
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
- [LWG Issue 1262. `std::less<std::shared_ptr<T>>` is underspecified](https://cplusplus.github.io/LWG/issue1262)
    - C++11で、戻り値が`a.get() < b.get()`から[`less`](/reference/functional/less.md)を用いた比較へ改められた。無関係なポインタ同士でも全順序となることを保証するため
- [LWG Issue 2908. The less-than operator for shared pointers could do more](https://cplusplus.github.io/LWG/issue2908)
    - C++17で、合成ポインタ型を用いる規定から`less<>`（透過的な`less`）を用いる形に規定が簡素化された。比較可能な組み合わせ自体は変わらない（コア言語の`operator<`が常に合成ポインタ型を形成するため、元の規定でも同等に一般的だった）
    - この修正は欠陥報告(DR)であり、C++11以降に遡及して適用される。観測可能な挙動を変えない規定の簡素化であるため
