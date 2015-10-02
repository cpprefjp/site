#コンストラクタ
* utility[meta header]
* std[meta namespace]
* pair[meta class]
* function[meta id-type]

```cpp
pair();                                   // (1) C++03
constexpr pair();                         // (1) C++11

pair(const pair&) = default;              // (2)
pair(pair&&) = default;                   // (3) C++11

pair(const T1& x, const T2& y);           // (4) C++03
constexpr pair(const T1& x, const T2& y); // (4) C++14

template <class U, class V>
pair(U&& x, V&& y);                       // (5) C++11

template <class U, class V>
constexpr pair(U&& x, V&& y);             // (5) C++14

template <class U, class V>
pair(const pair<U, V>& p);                // (6) C++03

template <class U, class V>
constexpr pair(const pair<U, V>& p);      // (6) C++14

template <class U, class V>
pair(pair<U, V>&& p);                     // (7) C++11

template <class U, class V>
constexpr pair(pair<U, V>&& p);           // (7) C++14

template <class... Args1, class... Args2>
pair(piecewise_construct_t,
     tuple<Args1...> first_args,
     tuple<Args2...> second_args);        // (8) C++11
```

##pairの構築

- (1) : `first`と`second`を初期化して構築
- (2) : コピーコンストラクタ
- (3) : ムーブコンストラクタ
- (4) : `first`と`second`の初期値を受け取って構築
- (5) : `first`と`second`に変換可能な型の値を受け取ってムーブ構築
- (6) : `first`と`second`に変換可能な`pair`型の値を受け取って構築
- (7) : `first`と`second`に変換可能なpair型の右辺値を受け取って構築
- (8) : `first`と`second`のコンストラクタ引数を受け取り、`first_args`と`second_args`それぞれの要素から`first`と`second`をムーブ構築


##要件
- (1) : `first_type`と`second_type`が[`is_default_constructible`](/reference/type_traits/is_default_constructible.md)`<T>::value == true`であること
- (4) : `first_type`と`second_type`が[`is_copy_constructible`](/reference/type_traits/is_copy_constructible.md)`<T>::value == true`であること
- (5) : [`is_constructible`](/reference/type_traits/is_constructible.md)`<first_type, U&&>::value && `[`is_constructible`](/reference/type_traits/is_constructible.md)`<second_type, V&&>::value`であること
- (6) : [`is_constructible`](/reference/type_traits/is_constructible.md)`<first_type, const U&>::value && `[`is_constructible`](/reference/type_traits/is_constructible.md)`<second_type, const V&>::value`であること
- (7) : [`is_constructible`](/reference/type_traits/is_constructible.md)`<first_type, U&&>::value && `[`is_constructible`](/reference/type_traits/is_constructible.md)`<second_type, V&&>::value`であること


##注記
- (5) : `U`が`first_type`に暗黙変換可能でない場合、もしくは`V`が`second_type`に暗黙変換可能でない場合、この関数はオーバーロード解決から除外される
- (6) : `const U&`が`first_type`に暗黙変換可能でない場合、もしくは`const V&`が`second_type`に暗黙変換可能でない場合、この関数はオーバーロード解決から除外される
- (7) : `U`が`first_type`に暗黙変換可能でない場合、もしくは`V`が`second_type`に暗黙変換可能でない場合、この関数はオーバーロード解決から除外される
- (8) : `is_constructible<first_type, Args1&&...>::value && is_constructible<second_type, Args2&&...>::value`であること

##例
```cpp
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

###出力
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

##バージョン
###言語
- C++11 : ムーブ構築とpiecewise構築

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.6.1
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0
	- C++03で規定されていたものは、10.0以前のバージョンから実装されている。
	- 10.0までは、(8) `std::piecewise_construct`版が実装されていない。
	- 12.0までは、デフォルトコンストラクタに`constexpr`が付与されていない。

##参照
- [N2345 Placement Insert for Containers (Revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2345.pdf)
    - (8)の最初の提案
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
