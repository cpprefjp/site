# auto
* cpp11[meta cpp]

## 概要
C++11 から、変数宣言時に具体的な型名のかわりに `auto` �ーワードを指定する事によって、変数の型を初期化�から推論できるようになった。

```cpp
auto i = 0;                         // i は int 型
const auto l = 0L;                  // l は const long 型
auto& r = i;                        // r は int& 型
auto s = "";                        // s は const char* 型
auto p = std::make_pair(1, 'c');    // p は std::pair<int, char> 型
auto q = std::make_shared<int>(42); // q は std::shared_ptr<int> 型
auto z = { 1.0, 2.0, 3.0, };        // z は std::initializer_list<double> 型
auto f = []{};                      // f は 引数を取らずに値を返さない operator() を持つユニークなク�ージャ型
```
* auto[color ff0000]
* std::make_shared[link ../../reference/memory/make_shared.md]

型推論のための `auto` は、基本的には糖衣構文であり具体的な型で書き替えることが可能であるが、上記のク�ージャ型のように書き換えが不可能なケースも�在する。  
この機能の追加に伴って、C++03 までの `auto` に�在した、自動変数である事を意味する記憶クラス指定�としての使用はできなくなった。

なお、`auto` は[戻り値の型を後置する関数宣言構文](trailing_return_types.md)でも使用されるが、その場合の `auto` には型推論の意味は無い。  
さらに、C++14 では `auto` �ーワードを使用する機能として、[ユーザ定義変換関数の型推論](../cpp14/return_type_deduction_for_normal_functions.md)、[通常関数の戻り値型推論](../cpp14/return_type_deduction_for_normal_functions.md)、[後置戻り値型をプレースホルダーにすることを許可](../cpp14/placeholder_type_in_trailing_return_type.md)、[ジェネリックラムダ](../cpp14/generic_lambdas.md)、および、[`decltype(auto)`](../cpp14/decltype_auto.md) が追加されている。  
それぞれの機能については、各解説を参照。


## 仕様
### 使用可能な場所

`auto` による型推論は、以下の場所で初期化�がある場合のみ使用可能である。

- ブ�ックスコープでの変数宣言
- 名前空間スコープでの変数宣言
- `for` 文の初期化文部での変数宣言
- `if` 文、`switch` 文、`for` 文、`while` 文の条件部での変数宣言
- `new` 式の型名指定部
- クラス定義内での静的メンバ宣言

これら以外の場所では `auto` による型推論は使用できない。  
なお、C++14 ではこれらのほか、[ユーザ定義変換関数](../cpp14/return_type_deduction_for_normal_functions.md)、[通常関数の戻り値型](../cpp14/return_type_deduction_for_normal_functions.md)、[後置戻り値型](../cpp14/placeholder_type_in_trailing_return_type.md)、[ジェネリックラムダの引数](../cpp14/generic_lambdas.md)でも使用可能になっている。

`auto` は単独での指定だけではなく、CV修飾（`const`、`volatile`）やポインタ・参照修飾（`*`、`&`、`&&`）�と共に指定する事が可能である。

```cpp
auto i = 10;                // i は int 型
const auto& cri = i;        // cri は const int& 型
const auto* cpi = &i;       // cpi は const int* 型
```
* auto[color ff0000]

しかし、`auto` をテンプレート型引数や関数引数の型として使用する事はできない。

```cpp
template <typename T>
struct S {
  S(T m) : m(m) {}
  T m;
};

auto s1 = S<int>(10);       // OK! s1 は S<int> 型
S<auto> s2 = 10;            // NG! auto はテンプレート型引数には使用できない

void f(int);

auto pf1 = f;               // OK! pf1 は void(*)(int) 型
void(*pf2)(auto) = f;       // NG! auto は関数引数の型には使用できない
```
* auto[color ff0000]


### 型推論規則

`auto` による型推論は、基本的に関数テンプレートの引数での型推論と同様である。

例えば、`const auto& p = 初期化式;` のようなコピー初期化を伴う変数宣言の場合、`auto` をテンプレート型パラメータ `U` で置き換えた `const U& p` を引数とした以下のような関数 `f` を考える。

```cpp
template <typename U>
void f(const U& p);
```

この関数テンプレート `f` を `f(初期化式)` のように引数に`初期化式`を与えて呼び出した際の引数 `p` の型が、実際の変数 `p` の型となる。  
なお、`const auto& p(式リスト);` のような直接初期化を伴う変数宣言の場合の推論も同様であるが、変数の型を式リストから推論する関係で（当然ではあるが）式リストに複数の式を書くことはできない。  
（通常の直接初期化のような `auto s('c', 42);` といった書き方では型推論ができないのでエラーとなる）

変数宣言がコピーリスト初期化を伴う、例えば `auto p = { 初期化�1, 初期化�2, ... 初期化�n };` の場合、`auto` をテンプレート型パラメータ `U` そのものへ置き換えたものではなく、`std::`[`initializer_list`](../../reference/initializer_list/initializer_list.md)`<U>` へ置き換えた以下のような関数を考えて、上記と同様の型推論を行う。  

```cpp
template <typename U>
void f(std::initializer_list<U> p);
```

なお、`auto p{ 初期化�1, 初期化�2, ... 初期化�n };` のような直接リスト初期化の場合、C++11 ではコピーリスト初期化と同様とされている。  
しかし、この（直接リスト初期化の）挙動は C++17 で変更される予定であるため、注意が必要である。  
（gcc 5.1.0 以降、clang 3.8.0 以降では既に変更されており、たとえ C++11 モードを使用しても元の挙動にはならない）


## 例
### 例１（名前空間スコープ、new 式の型名指定部、for 文の初期化文、if 文の条件部）
```cpp example
#include <iostream>
#include <memory>
#include <initializer_list>

// 名前空間スコープでの変数宣言
auto v = { 1, 7, 3, 2, 0, 5, 0, 8, };                           // v は std::initializer_list<int> 型

std::unique_ptr<int> create_unique_ptr(int i)
{
  // new 式の型名指定部
  return std::unique_ptr<int>(i != 0 ? new auto(i) : nullptr);  // new auto(i) は int* 型
}

int main()
{
  // for 文の初期化文での変数宣言
  for (auto it = v.begin(), e = v.end(); it != e; ++it) {       // it と e は const int* 型
    // if 文の条件部での変数宣言
    if (auto ptr = create_unique_ptr(*it)) {                    // ptr は std::unique_ptr<int> 型
      std::cout << *ptr << ", ";
    } else {
      std::cout << "null, ";
    }
  }
  std::cout << '\n';
}
```
* begin[link ../../reference/initializer_list/initializer_list/begin.md]
* nullptr[link nullptr.md]
* auto[color ff0000]

#### 出力１
```
1, 7, 3, 2, null, 5, null, 8, 
```

### 例２（ブ�ックスコープ、for 文の初期化文、および、条件部）
```cpp example
#include <iostream>

int main()
{
  // ブ�ックスコープでの変数宣言
  static auto s = "C++";                                        // s は const char* 型

  // `for` 文の初期化文、および、条件部での変数宣言
  for (auto p = s; auto elem = *p; ++p) {                       // p は const char* 型、elem は char 型
    std::cout << elem << ", ";
  }
  std::cout << '\n';
}
```
* auto[color ff0000]

#### 出力２
```
C, +, +, 
```

### 例３（範囲 for 文の宣言部）
```cpp example
#include <iostream>
#include <initializer_list>

int main()
{
  // 範囲 for 文の宣言部
  for (auto&& elem : { 2, 3, 7, }) {                            // elem は const int& 型
    std::cout << elem << ", ";
  }
  std::cout << '\n';
}
```
* auto[color ff0000]

#### 出力３
```
2, 3, 7, 
```


### 例４（クラス定義内の静的メンバ、switch 文の条件部）

```cpp example
#include <iostream>

// リテラル型の定義
struct S {
  constexpr S(int i) : i(i) {}
  int i;
};

struct T {
  // クラス定義内の静的メンバ宣言
  static constexpr auto m = S(42);                              // m は S 型
};

// 静的メンバの定義（初期化�が無いため、auto は使えない）
S constexpr T::m;

void f(const S& s)
{
  // switch 文の条件部での変数宣言
  switch (auto i = s.i) {                                       // i は int 型
  case 42:
    std::cout << "answer\n";
    break;
  default:
    std::cout << i << '\n';
    break;
  }
}

int main()
{
  f(T::m);
}
```
* constexpr[link constexpr.md]
* auto[color ff0000]

#### 出力４
```
answer
```


## この機能が必要になった背景・経緯
C++ では、簡単な式の型がしばしば非常に複雑になりうる。それらの型を書いたりその型の変数を宣言するのは退屈で間違えやすい。  
よくあるのは、以下のようなコンテナのイテレータ用の変数宣言である：

```cpp
template <class T>
int foo(const std::unordered_map<T, std::unordered_map<T, T>>& m) {
  std::unordered_map<T, std::unordered_map<T, T>>::const_iterator it = m.begin();
  …
}
```
* begin[link ../../reference/unordered_map/unordered_map/begin.md]

C++11 で導入された [`decltype`](decltype.md) を使用すれば以下のように簡潔に書く事が出来る。

```cpp
template <class T>
int foo(const std::unordered_map<T, std::unordered_map<T, T>>& m) {
  decltype(m.begin()) it = m.begin();
}
```
* begin[link ../../reference/unordered_map/unordered_map/begin.md]
* decltype[link decltype.md]

しかし、[`decltype`](decltype.md) は変数宣言の用途にはあまり向かない事、および、式自体を二回書く必要があるためメンテナンス上の問題を引き起こす事から、関数テンプレート引数の型推論に基づいた `auto` を導入することとした。


## 検討されたほかの選択肢
### 記憶クラス指定�としての `auto`
自動変数である事を意味する記憶クラス指定�としての `auto` を残す案も考えられた。

- [N1706 Decltype and auto (revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1705.pdf)（「1.1 Changes from N1607」の 5 番目の項目）

しかし、その場合に発生する新たな曖昧性や混乱を回避するため、および、記憶クラス指定�としての `auto` の使用が非常に少ないとの調査結果などから、当該用途は直ちに廃�となった。

- [N2337 The Syntax of auto Declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2337.pdf)

### 暗黙テンプレート
テンプレートの宣言を簡潔にする目的で、以下のような文法が提案された。

```cpp
void f(auto lhs, auto rhs)
{
  …
}
```

これは、以下のようなテンプレート宣言と�価である。

```cpp
template <typename T, typename U>
void f(T lhs, U rhs)
{
  …
}
```

- [N1527 Mechanisms for querying types of expressions: Decltype and auto revisited](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1527.pdf)（4.2 Implicit templates）

しかし、この機能に対する支持が少なかったため、規格入りは見送られた。  

- [N1607 Decltype and auto (revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1607.pdf)（「1.1 Changes from N1478」の最初の項目、および、「5.3 Implicit templates」）
- [N1705 Decltype and auto (revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1705.pdf)（「1.1 Changes from N1607」の 7 番目の項目）

なお、C++14 で導入された[ジェネリックラムダ](../cpp14/generic_lambdas.md)は、この機能のサブセットとも考えられる。

### 関数の戻り値型の推論
変数宣言時の型推論だけでなく、関数の戻り値型についても同様に型推論できるようにする検討が行われた。

- [N1527 Mechanisms for querying types of expressions: Decltype and auto revisited](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1527.pdf)（4.3 Functions with implicit return types）
- [N1607 Decltype and auto (revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1607.pdf)（5.2 Functions with implicit return types）

しかし、C++11 でのこの機能の規格入りは見送られた。

- [N1705 Decltype and auto (revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1705.pdf)（「1.1 Changes from N1607」の 8 番目の項目）

なお、この機能は C++14 で規格入りした。（[通常関数の戻り値型推論](../cpp14/return_type_deduction_for_normal_functions.md)）

### 複数の変数宣言の禁�
`auto` を使用した場合に、以下のような複数の変数を同時に宣言することを禁�すべきではないかとの検討が行われた。

- [N1705 Decltype and auto (revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1705.pdf)（「1.1 Changes from N1607」の 4 番目の項目）

```cpp
auto i = 10, j = 20;
```

しかし、その場合以下のような利用方法を不可能にしてしまうため、通常の変数宣言と同様複数の変数宣言を許可することとした。

```cpp
std::unordered_map<std::string, int> m;
for (auto it = m.begin(), e = m.end(); it != e; ++it) {
  …
}
```
* begin[link ../../reference/unordered_map/unordered_map/begin.md]
* end[link ../../reference/unordered_map/unordered_map/end.md]

- [N1737 A Proposal to Restore Multi-declarator auto Declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1737.pdf)

### テンプレート引数としての `auto` の使用
以下のように、テンプレート引数として `auto` を使用することも検討された。

```cpp
std::pair<auto, auto>& p = foo();
```
* std::pair[link /reference/utility/pair.md]

この場合、`foo()` の戻り値型が `std::pair` のインスタンスでない時にはエラーとするような表明（アサーション）の役割を担うものとしていた。

しかし、この使用法は規格から落とされた。

### テンプレート引数を使用した変数宣言
テンプレート引数として `auto` を使用するケースの更なる特殊ケースとして、以下のような構文も検討された。

```cpp
template <typename T>
std::pair<T, T>& p = foo();
```
* std::pair[link /reference/utility/pair.md]

この場合、`foo()` の戻り値型が `std::pair` のインスタンスで、かつ、二つのテンプレート引数が同一でない時にはエラーとするような表明（アサーション）の役割を担うものとしていた。  
この文法を使用すると、テンプレート引数として `auto` を使用する場合の例は、以下と�価となる。

```cpp
template <typename T, typename U>
std::pair<T, U>& p = foo();
```
* std::pair[link /reference/utility/pair.md]

しかし、この使用法も規格から落とされた。


## 関連項目
- [C++11 戻り値の型を後置する関数宣言構文](trailing_return_types.md)
- [C++11 `decltype`](decltype.md)
- [C++11 ラムダ式](lambda_expressions.md)
- [C++14 `decltype(auto)`](../cpp14/decltype_auto.md)
- [C++14 後置戻り値型をプレースホルダーにすることを許可](../cpp14/placeholder_type_in_trailing_return_type.md)
- [C++14 通常関数の戻り値型推論（ユーザ定義変換関数の型推論を含む）](../cpp14/return_type_deduction_for_normal_functions.md)


## 参照
- [N1478 Decltype and auto](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1478.pdf)
- [N1527 Mechanisms for querying types of expressions: Decltype and auto revisited](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1527.pdf)
- [N1607 Decltype and auto (revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1607.pdf)
- [N1705 Decltype and auto (revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1705.pdf)
- [N1721 Deducing the type of variable from its initializer expression](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1721.pdf)
- [N1737 A Proposal to Restore Multi-declarator auto Declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1737.pdf)
- [N1794 Deducing the type of variable from its initializer expression (revision 2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1794.pdf)
- [N1894 Deducing the type of variable from its initializer expression (revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1894.pdf)
- [N1984 Deducing the type of variable from its initializer expression (revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1984.pdf)
- [N2337 The Syntax of auto Declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2337.pdf)
- [N2546 Removal of auto as a storage-class specifier](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2546.htm)
- [N2712 Non-static data member initializers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2712.html)
- [N2713 Allow auto for non-static data members](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2713.html)
