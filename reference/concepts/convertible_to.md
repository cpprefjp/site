# convertible_to
* concepts[meta header]
* concept[meta id-type]
* std[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class From, class To>
  concept convertible_to =
    is_convertible_v<From, To> &&
    requires(add_rvalue_reference_t<From> (&f)()) {
      static_cast<To>(f());
    };
}
```
* add_rvalue_reference_t[link /reference/type_traits/add_rvalue_reference.md]
* is_convertible_v[link /reference/type_traits/is_convertible.md]

## 概要

`convertible_to`は、`From`に指定された型および値カテゴリから型`To`へ変換可能であることを表すコンセプトである。

このコンセプトを満たすためには[`declval`](/reference/utility/declval.md)`<From>()`と同じ型と値カテゴリを持つオブジェクトが型`To`へ暗黙的にも明示的にも変換可能であり、それら暗黙的および明示的な変換は同じ結果とならなければならない。

## モデル

`FromR = add_rvalue_reference_t<From>`として、説明のための関数`test()`を以下のように定義する。

```cpp
To test(FromR (&f)()) {
  return f();
}
```

この`f`は引数をとらず`FromR`を返す関数であり、`f()`の呼び出しは[等しさを保持](/reference/concepts.md)する。

この`test()`と`FromR, To`について、以下の条件を満たす場合に限って型`From, To`は`convertible_to`のモデルである。

- 次のどちらかを満たす
    - `To`は[オブジェクト型](/reference/type_traits/is_object.md)でもオブジェクトへの参照型でもない
    - `static_cast<To>(f())`と`test(f)`は等しい
- `FromR`がオブジェクトへの参照型ではない場合、次のどちらかを満たす
    - `FromR`が非`const`右辺値参照型の場合、`f()`の呼び出しによって参照されるオブジェクトの状態は、上記の式の実行の後で有効だが未規定となる
        - 標準ライブラリの型のオブジェクトは特に指定がない場合、ムーブされた後の状態は有効だが未規定となる
    - それ以外の場合、`f()`の呼び出しによって参照されるオブジェクトは上記の式の実行によって変更されない

2つ目の条件内に出てくる「上記の式」とは、`static_cast<To>(f())`と`test(f)`のこと。

## 例
```cpp example
#include <iostream>
#include <concepts>

struct convert_int {
  operator int() { return 0; }
  convert_int(int){}
};

struct convert_double {
  explicit convert_double(double) {}
  explicit operator double() { return 0.0; }
};

// 明示的な変換と暗黙的な変換で結果が異なる例
struct vague_convert {
  operator int() { return -1; }
  explicit operator double() { return 1.0; }
};

int main()
{
  std::cout << std::boolalpha;

  std::cout << "--- fundamental type ---\n";
  std::cout << std::convertible_to<int, short> << std::endl;
  std::cout << std::convertible_to<short, int> << std::endl;
  std::cout << std::convertible_to<std::size_t, int> << std::endl;
  std::cout << std::convertible_to<int, std::size_t> << std::endl;
  std::cout << std::convertible_to<int, const int> << std::endl;
  std::cout << std::convertible_to<const int, int> << std::endl;
  std::cout << std::convertible_to<int, double> << std::endl;
  std::cout << std::convertible_to<double, int> << std::endl;
  std::cout << std::convertible_to<float, double> << std::endl;
  std::cout << std::convertible_to<double, float> << std::endl;
  std::cout << std::convertible_to<int*, const int*> << std::endl;
  std::cout << std::convertible_to<const int*, int*> << std::endl;

  std::cout << "\n--- program-defined type ---\n";
  std::cout << std::convertible_to<convert_int, int> << std::endl;
  std::cout << std::convertible_to<int, convert_int> << std::endl;
  std::cout << std::convertible_to<convert_double, double> << std::endl;
  std::cout << std::convertible_to<double, convert_double> << std::endl;
  std::cout << std::convertible_to<vague_convert, int> << std::endl;
  std::cout << std::convertible_to<vague_convert, double> << std::endl;
}
```
* std::convertible_to[color ff0000]

### 出力
```
--- fundamental type ---
true
true
true
true
true
true
true
true
true
true
true
false

--- program-defined type ---
true
true
false
false
true
true
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
- [LWG Issue 3194. `ConvertibleTo` prose does not match code](https://wg21.cmeerw.net/lwg/issue3194)
- [LWG Issue 3461. `convertible_to`'s description mishandles cv-qualified void](https://cplusplus.github.io/LWG/issue3461)
