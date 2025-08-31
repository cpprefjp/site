# assignable_from
* concepts[meta header]
* std[meta namespace]
* concept[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class LHS, class RHS>
  concept assignable_from =
    is_lvalue_reference_v<LHS> &&
    common_reference_with<const remove_reference_t<LHS>&, const remove_reference_t<RHS>&> &&
    requires(LHS lhs, RHS&& rhs) {
      { lhs = std::forward<RHS>(rhs) } -> same_as<LHS>;
    };
}
```
* is_lvalue_reference_v[link /reference/type_traits/is_lvalue_reference.md]

## 概要

`assignable_from`は、指定された型および値カテゴリ`RHS`から左辺値`LHS`へ代入可能であることを表すコンセプトである。

## モデル

まず、`lhs`を`decltype((lhs))`が`LHS`であるような`lcopy`オブジェクトを参照する左辺値（参照）、`rhs`を`decltype((rhs))`が`RHS`であるような式、`rcopy`を`rhs`と等値な別のオブジェクトとして定義する。

これらの`lhs, rhs, lcopy, rcopy`について、以下の条件を満たす場合に限って、型`LHS, RHS`は`assignable_from`のモデルである。

- [`addressof`](/reference/memory/addressof.md)`(lhs = rhs) ==` [`addressof`](/reference/memory/addressof.md)`(lcopy)`となる
- `lhs = rhs;`という式の評価の後で以下のことが成り立っている
    - `rhs`が`lcopy`を参照する非`const` *xvalue*でない（ムーブが起こる自己代入ではない）場合
        - `lhs`は`rcopy`と等値である
    - `rhs`が非`const` *xvalue*ならば
        - `rhs`が参照するオブジェクトの状態は有効だが未規定
    - それ以外の場合で、`rhs`が*glvalue*ならば
        - `rhs`が参照するオブジェクトは変更されない

`rhs`が*prvalue*の場合、2つめの条件のいずれにも該当しない。これはコピー省略等の最適化を考慮したものである。

## 備考

代入操作では、引数型の一部の値が本コンセプトが要求する構文・意味論的制約を必ずしも満たしていなくても構わない。特に、あるオブジェクト`x`への代入操作によって別のオブジェクト`y`が変更される時、`x, y`はその場合の`=`の定義域に含まれない事がある。

ある`LHS, RHS`についてそのような個別の値が存在していたとしても、そのことはその`LHS, RHS`が`assignable_from`のモデルとなることを妨げない。

## 例

```cpp example
#include <iostream>
#include <concepts>
#include <vector>
#include <memory>

template<typename LHS, typename RHS>
  requires std::assignable_from<LHS, RHS>
void f(const char* name, const char* arg) {
  std::cout << name << " is assignable from " << arg << std::endl;
}

template<typename LHS, typename RHS>
void f(const char* name, const char* arg) {
  std::cout << name << " is not assignable from " << arg << std::endl;
}

struct S {
  S& operator=(const S&) = default;
  S& operator=(S&&) = delete;
};

int main() {
  f<int&, short>("int&", "short");
  f<std::vector<int>&, std::vector<int>>("std::vector<int>&", "std::vector<short>");
  f<std::unique_ptr<int>&, std::unique_ptr<int>>("std::unique_ptr<int>&", "std::unique_ptr<int>");
  f<S&, S&>("S&", "S&");
  
  std::cout << "\n";

  f<std::unique_ptr<int>&, std::unique_ptr<int>&>("std::unique_ptr<int>&", "std::unique_ptr<short>&");
  f<S&, S>("S&", "S");
}
```
* std::assignable_from[color ff0000]

### 出力
```
int& is assignable from short
std::vector<int>& is assignable from std::vector<short>
std::unique_ptr<int>& is assignable from std::unique_ptr<int>
S& is assignable from S&

std::unique_ptr<int>& is not assignable from std::unique_ptr<short>&
S& is not assignable from S
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 3 [mark verified]

## 関連項目

- [C++20 コンセプト](/lang/cpp20/concepts.md)


## 参照
- [P0898R3 Standard Library Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0898r3.pdf)
- [P1754R1 Rename concepts to standard_case for C++20, while we still can](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1754r1.pdf)
