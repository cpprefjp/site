# 推論補助
* functional[meta header]
* std[meta namespace]
* function[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class R, class... ArgTypes>
  function(R(*)(ArgTypes...)) -> function<R(ArgTypes...)>; // (1)

  template <class F>
  function(F) -> function<Signature>;                      // (2)
}
```

## 概要
`std::function`クラステンプレートの型推論補助。

- (1) : 関数ポインタからの推論
- (2) : 関数オブジェクトからの推論。このオーバー�ードは、関数呼び出し演算�がひとつだけオーバー�ードされている場合に有効


## 備考
- (2) : 式`&F::operator()`が妥当な場合のみ、オーバー�ード解決に参加する。関数呼び出し演算�が複数オーバー�ードされていると、この方法では関数ポインタを取得できない。この式が妥当な場合、`decltype(&F::operator())`で関数ポインタのシグニチャを取得でき、`std::function`クラスのテンプレート引数に渡すシグニチャとして使用できる
- このクラスの推論補助は、将来のバージョンで変更される可能性がある

## 例
```cpp example
#include <functional>
#include <type_traits>

int foo(int, char) { return 0; }

struct Functor {
  void operator()(double) {}
};

int main()
{
  // (1)
  // 関数ポインタからの型推論
  std::function f = foo;
  static_assert(std::is_same_v<
    decltype(f),
    std::function<int(int, char)>
  >);

  // (2)
  // ラムダ式からの型推論。
  std::function g = [](int) { return 1; };
  static_assert(std::is_same_v<
    decltype(g),
    std::function<int(int)>
  >);

  // (2)
  // 関数オブジェクトからの型推論。
  // 関数呼び出し演算�がひとつだけオーバー�ードされていること
  std::function h = Functor();
  static_assert(std::is_same_v<
    decltype(h),
    std::function<void(double)>
  >);
}
```

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 7.1
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

