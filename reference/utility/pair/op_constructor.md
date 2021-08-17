# コンストラクタ
* utility[meta header]
* std[meta namespace]
* pair[meta class]
* function[meta id-type]

```cpp
pair();                                                       // (1) C++03
constexpr pair();                                             // (1) C++11
EXPLICIT constexpr pair();                                    // (1) C++17
explicit(see below) constexpr pair();                         // (1) C++20

pair(const pair&) = default;                                  // (2)

pair(pair&&) = default;                                       // (3) C++11

pair(const T1& x, const T2& y);                               // (4) C++03
constexpr pair(const T1& x, const T2& y);                     // (4) C++14
EXPLICIT constexpr pair(const T1& x, const T2& y);            // (4) C++17
explicit(see below) constexpr pair(const T1& x, const T2& y); // (4) C++20

template <class U, class V>
pair(U&& x, V&& y);                                           // (5) C++11
template <class U, class V>
constexpr pair(U&& x, V&& y);                                 // (5) C++14
template <class U, class V>
EXPLICIT constexpr pair(U&& x, V&& y);                        // (5) C++17
template <class U, class V>
explicit(see below) constexpr pair(U&& x, V&& y);             // (5) C++20
template <class U = T1, class V = T2>
explicit(see below) constexpr pair(U&& x, V&& y);             // (5) C++23

template <class U, class V>
pair(const pair<U, V>& p);                                    // (6) C++03
template <class U, class V>
constexpr pair(const pair<U, V>& p);                          // (6) C++14
template <class U, class V>
EXPLICIT constexpr pair(const pair<U, V>& p);                 // (6) C++17
template <class U, class V>
explicit(see below) constexpr pair(const pair<U, V>& p);      // (6) C++20

template <class U, class V>
pair(pair<U, V>&& p);                                         // (7) C++11
template <class U, class V>
constexpr pair(pair<U, V>&& p);                               // (7) C++14
template <class U, class V>
EXPLICIT constexpr pair(pair<U, V>&& p);                      // (7) C++17
template <class U, class V>
explicit(see below) constexpr pair(pair<U, V>&& p);           // (7) C++20

template <class... Args1, class... Args2>
pair(piecewise_construct_t,
     tuple<Args1...> first_args,
     tuple<Args2...> second_args);                            // (8) C++11
template <class... Args1, class... Args2>
constexpr pair(piecewise_construct_t,
               tuple<Args1...> first_args,
               tuple<Args2...> second_args);                  // (8) C++20
```
* piecewise_construct_t[link /reference/utility/piecewise_construct_t.md]
* tuple[link /reference/tuple/tuple.md]
* see below[italic]

## 概要
`pair`オブジェクトを構築する。

- (1) : `first`と`second`を初期化して構築
- (2) : コピーコンストラクタ
- (3) : ムーブコンストラクタ
- (4) : `first`と`second`の初期値を受け取って構築
- (5) : `first`と`second`に変換可能な型の値を受け取ってムーブ構築
- (6) : `first`と`second`に変換可能な`pair`型の値を受け取って構築
- (7) : `first`と`second`に変換可能なpair型の右辺値を受け取って構築
- (8) : `first`と`second`のコンストラクタ引数を受け取り、`first_args`と`second_args`それぞれの要素から`first`と`second`をムーブ構築


## テンプレートパラメータ制約
- (1) :
    - `first_type`と`second_type`が[`is_default_constructible`](/reference/type_traits/is_default_constructible.md)`<T>::value == true`であること
- (4) :
    - `first_type`と`second_type`が[`is_copy_constructible`](/reference/type_traits/is_copy_constructible.md)`<T>::value == true`であること
- (5) :
    - [`is_constructible`](/reference/type_traits/is_constructible.md)`<first_type, U&&>::value &&` [`is_constructible`](/reference/type_traits/is_constructible.md)`<second_type, V&&>::value`であること
    - C++14まで : `U`が`first_type`に暗黙変換可能でない場合、もしくは`V`が`second_type`に暗黙変換可能でない場合、この関数はオーバーロード解決から除外される
- (6) :
    - [`is_constructible`](/reference/type_traits/is_constructible.md)`<first_type, const U&>::value &&` [`is_constructible`](/reference/type_traits/is_constructible.md)`<second_type, const V&>::value`であること
    - C++14まで : `const U&`が`first_type`に暗黙変換可能でない場合、もしくは`const V&`が`second_type`に暗黙変換可能でない場合、この関数はオーバーロード解決から除外される
- (7) :
    - [`is_constructible`](/reference/type_traits/is_constructible.md)`<first_type, U&&>::value &&` [`is_constructible`](/reference/type_traits/is_constructible.md)`<second_type, V&&>::value`であること
    - C++14まで : `U`が`first_type`に暗黙変換可能でない場合、もしくは`V`が`second_type`に暗黙変換可能でない場合、この関数はオーバーロード解決から除外される
- (8) :
    - `is_constructible<first_type, Args1&&...>::value && is_constructible<second_type, Args2&&...>::value`であること


## 備考
- (1) :
    - C++17 : `first_type`と`second_type`のどちらかが非暗黙にデフォルト構築できる場合、この関数は`explicit`となる
- (4) :
    - C++17 : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const first_type&, first_type> || !`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const second_type&, second_type>`である場合、この関数は`explicit`となる
- (5) :
    - C++17 : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U1, first_type> || !`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U2, second_type>`である場合、この関数は`explicit`になる
- (6) :
    - C++17 : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const U1&, first_type> || !`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<const U2&, second_type>`である場合、この関数は`explicit`となる
- (7) :
    - C++17 : `!`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U1, first_type> || !`[`is_convertible_v`](/reference/type_traits/is_convertible.md)`<U2, second_type>`である場合、この関数は`explicit`となる
- C++17では、コンストラクタの各オーバーロードが条件付きで`explicit`となるよう規定された。これは、以下のような初期化子リストを使用したC++17での初期化が不適格になっていたため、適格になるようにするための変更である：
    ```cpp
    std::tuple<int, int> pixel_coordinates()
    {
      return {10, -15};  // C++14でコンパイルエラー！
    }

    struct NonCopyable { NonCopyable(int); NonCopyable(const NonCopyable&) = delete; };
    std::pair<NonCopyable, double> pmd{42, 3.14};  // C++14でコンパイルエラー！
    ```
    * std::tuple[link /reference/tuple/tuple.md]

    - この変更はC++17に対するものであるが、コンパイラが早期に対応していたため、一部処理系ではC++14の段階から適格となっていた


## 例
```cpp example
#include <iostream>
#include <utility>
#include <string>
#include <tuple> // std::make_tuple

template <class T1, class T2>
void print(const std::string& name, const std::pair<T1, T2>& p)
{
  std::cout << name << " : (" << p.first << "," << p.second << ")" << std::endl;
}

struct X {
  int a, b, c;

  X() : a(0), b(0), c(0) {}
  X(int a, int b, int c) : a(a), b(b), c(c) {}
};

std::ostream& operator<<(std::ostream& os, const X& x)
{
  return os << "X(" << x.a << " " << x.b << " " << x.c << ")";
}

struct Y {
  int a, b;

  Y() : a(0), b(0) {}
  Y(int a, int b) : a(a), b(b) {}
};

std::ostream& operator<<(std::ostream& os, const Y& y)
{
  return os << "Y(" << y.a << " " << y.b << ")";
}

int main()
{
  // (1) デフォルト構築
  {
    constexpr std::pair<int, double> p1;
    print("p1", p1);
  }

  // (2) コピー構築
  {
    std::pair<int, std::string> p(1, "abc");
    std::pair<int, std::string> p2 = p;
     print("p2", p2);
  }

  // (3) ムーブ構築
  {
    std::pair<int, std::string> p(1, "abc");
    std::pair<int, std::string> p3 = std::move(p);
    print("p3", p3);
  }

  // (4) firstとsecondの初期値を受け取って構築
  {
    std::pair<int, std::string> p4(1, std::string("abc"));
    print("p4", p4);
  }

  // (5) firstとsecondの右辺値を受け取ってムーブ構築
  {
    int x = 1;
    std::string s = "abc";
    std::pair<int, std::string> p5(std::move(x), std::move(s));
    print("p5", p5);
  }

  // (6) 変換可能なpairから構築
  {
    std::pair<int, const char*> p(1, "abc");
    std::pair<int, std::string> p6 = p;
    print("p6", p6);
  }

  // (7) 変換可能なpairからムーブ構築
  {
    std::pair<int, const char*> p(1, "abc");
    std::pair<int, std::string> p7 = std::move(p);
    print("p7", p7);
  }

  // (8) first_typeとsecond_typeのコンストラクタ引数を受け取って構築
  {
    std::pair<X, Y> p8(std::piecewise_construct,
                       std::make_tuple(1, 2, 3),
                       std::make_tuple(4, 5));
    print("p8", p8);
  }
}
```
* std::ostream[link /reference/ostream/basic_ostream.md]
* std::move[link /reference/utility/move.md]
* std::piecewise_construct[link /reference/utility/piecewise_construct_t.md]
* std::make_tuple[link /reference/tuple/make_tuple.md]

### 出力
```
p1 : (0,0)
p2 : (1,abc)
p3 : (1,abc)
p4 : (1,abc)
p5 : (1,abc)
p6 : (1,abc)
p7 : (1,abc)
p8 : (X(1 2 3),Y(4 5))
```

## バージョン
### 言語
- C++11 : ムーブ構築とpiecewise構築

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015
	- C++03で規定されていたものは、2010より前のバージョンから実装されている。
	- 2010までは、(8) `std::piecewise_construct`版が実装されていない。
	- 2013までは、デフォルトコンストラクタに`constexpr`が付与されていない。


## 関連項目
- [C++20 関数を条件付きでexplicitにする構文を追加](/lang/cpp20/explicit_bool.md)


## 参照
- [N2345 Placement Insert for Containers (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2345.pdf)
    - (8)の最初の提案
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
- [N4387 Improving Pair and Tuple (Revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4387)
    - C++17での条件付き`explicit`の導入
- [P1032R1 Misc constexpr bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
- [P0892R2 `explicit(bool)`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0892r2.html)
    - C++20での`explicit(bool)`構文への対応
- [P1951R1 Default Arguments for `pair`'s Forwarding Constructor](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1951r1.html)
    - C++23での`{}`完全転送への対応
