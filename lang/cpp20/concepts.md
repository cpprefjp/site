# コンセプト [P0734R0]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++20から導入される「コンセプト (concepts)」は、テンプレートパラメータを制約する機能である。この機能を使用することで、以下のような面でプログラミングのしやすさが向上する：

- コンパイルエラーのメッセージが読みやすくなる
    - テンプレートパラメータの型およびそのオブジェクトに対する許可されていない操作をしようとした場合に発生するエラーメッセージが、「テンプレートパラメータ`T`がコンセプト`X`の要件を満たしません」のようなわかりやすいものになることが期待できる
- これまで自然言語で書いていた制約の仕様をプログラムで記述できる
    - `assert` / `static_assert`はどのような値になるべきかを表明するが、コンセプトは型が持つべきインタフェースや特性を表明する
- コンセプトによって関数オーバーロードやテンプレート特殊化ができる
    - これまでSFINAEと呼ばれる上級者向けの言語機能を使用していた制約によるオーバーロードが、コンセプトというわかりやすい機能で実現できる。これはたとえば、InputIteratorとRandomAccessIterator、整数と浮動小数点数でそれぞれに最適な実装を切り替えるような場合に必要となる


### コンセプトの基本的な定義方法
以下は、関数テンプレートのテンプレートパラメータ`T`に対して、`draw()`メンバ関数を持っていることを要求する制約の定義例である：

```cpp example
// 描画可能コンセプト。
// メンバ関数draw()を持つことを要求する
template <class T>
concept Drawable = requires (T& x) {
  x.draw(); // 型Tに要求する操作をセミコロン区切りで列挙する。
            // ここでは、メンバ関数draw()を呼び出せることを要求している。
};

// テンプレートパラメータTをコンセプトDrawableで制約する。
// Drawableの要件を満たさない型が渡された場合は制約エラーとなる
template <Drawable T>
void f(T& x) {
  x.draw();
}

struct Circle {
  void draw() {}
};

struct Box {
  void draw() {}
};

int main() {
  Circle c;
  f(c);      // OK

  Box b;
  f(b);      // OK

//int n = 0;
//f(n);      // コンパイルエラー！
             // 型intはDrawableコンセプトの要件を満たさず、
             // draw()メンバ関数を持っていない
}
```

`concept`キーワードを使用して、型に対する要求の集合であるコンセプトを定義する。コンセプトの定義では、型がどのような特性を持つのか (整数型なのか浮動小数点数型なのか、`==`で比較可能なのか`<`で順序付けられているか) や、型に対してどのような操作ができるべきか (メンバ関数呼び出し、非メンバ関数呼び出し、ほかの型との演算、特定のメンバ型を持っているか) などを列挙する。

```cpp
#include <type_traits>
#include <iterator>
#include <utility>
#include <concepts>

// bool型の定数式でコンセプトを定義できるため、
// 型特性としてすでに用意されている定数式をラップしてコンセプトを定義できる
template <class T>
concept Integral = std::is_integral_v<T>;

// 2つ以上のテンプレートパラメータをとるコンセプトも定義できる
template <class T, class U>
concept EqualityComparable = requires (T a, U b) {
  {a == b} -> std::convertible_to<bool>; // 式の戻り値型も制約できる (直接の戻り値型は指定できない)
};

// 戻り値型の要求には、直接の型だけでなくコンセプトも指定できる
template <class T, class U>
concept Addable = requires (T a, U b) {
  // 加算の結果として、型Tと型Uの共通の型が返ること
  {a + b} -> std::common_with<T>;
};

// セミコロン区切りで複数の要求を列挙できる
template <class T>
concept SequenceContainer = requires (T c) {
  typename T::size_type; // 型Tがメンバ型としてsize_typeを持っていること
  {c.size()} -> std::convertible_to<typename T::size_type>;     // 型Tのオブジェクトに対して特定のメンバ関数が呼び出せることを要求
  {std::size(c)} -> std::convertible_to<typename T::size_type>; // 非メンバ関数の呼び出しも要求できる

  typename T::value_type;
  c.push_back(std::declval<typename T::value_type>());
};

#include <string>
#include <vector>
int main() {
  // コンセプトはbool定数式として使用できる
  static_assert(Integral<int>);
  static_assert(EqualityComparable<int, int>);
  static_assert(Addable<std::string, char>);
  static_assert(SequenceContainer<std::vector<int>>);
}
```
* std::is_integral_v[link /reference/type_traits/is_integral.md]
* std::convertible_to[link /reference/concepts/convertible_to.md]
* std::common_with[link /reference/concepts/common_with.md]
* std::size[link /reference/iterator/size.md]
* std::declval[link /reference/utility/declval.md]


### コンセプトによるオーバーロードと特殊化
テンプレートパラメータを制約するためには`static_assert`を使うこともできるだろう。

`static_assert`とコンセプトの違いとしては、`static_assert`は要件を満たさない場合に即座にコンパイルエラーになるが、コンセプトの場合は、要件を満たさない場合にほかの候補を探しに行き、要件を満たす候補が見つからなかった時点でコンパイルエラーとする機能がある。

そのため、コンセプトは関数テンプレートのオーバーロード、クラステンプレートや変数テンプレートの特殊化に使用できる。

```cpp example
#include <concepts>
#include <cmath>
#include <limits>
#include <cassert>
#include <iostream>

// 数値の等値比較を行う関数を、整数型か浮動小数点数型かでオーバーロードする。
// 整数型の場合は、単純な==演算子による比較
template <std::integral T>
bool equal(T a, T b) {
  return a == b;
}

// 浮動小数点数型の場合は、計算誤差を許容する等値比較
template <std::floating_point T>
bool equal(T a, T b) {
  return std::abs(a - b) <= std::numeric_limits<T>::epsilon();
}

// 変数テンプレートを、整数型か浮動小数点数型かで特殊化する。
// 同じことはクラステンプレートでもできる
template <class T>
constexpr T pi;

template <std::floating_point T>
constexpr T pi<T> = static_cast<T>(3.141592653589793);

template <std::integral T>
constexpr T pi<T> = static_cast<T>(3); // 整数の円周率は3 (これはジョークです)

int main() {
  assert(equal(1 + 2, 3));
  assert(equal(0.1 + 0.2, 0.3)); // 計算誤差によって0.1 + 0.2 == 0.3にはならないが、誤差を許容することで等値と見なす
                                 // (0.1 + 0.2 は 0.30000000000000004 のような値になる)

  std::cout << pi<double> << std::endl; // 3.14159
  std::cout << pi<int> << std::endl;    // 3
}
```
* std::integral[link /reference/concepts/integral.md]
* std::floating_point[link /reference/concepts/floating_point.md]
* std::abs[link /reference/cmath/abs.md]
* epsilon()[link /reference/limits/numeric_limits/epsilon.md]
* 0.30000000000000004[link https://0.30000000000000004.com]

また、コンセプトは`bool`型の定数式でもあるため、`static_assert`と組み合わせてコンパイル時の表明としても使用できる。

```cpp
template <class T>
void f(T x) {
  // テンプレートパラメータTは整数型であること
  static_assert(std::integral<T>);
}
```
* std::integral[link /reference/concepts/integral.md]


### テンプレートパラメータを制約する複数の方法
テンプレートパラメータを制約する方法はいくつかある。ここまで紹介した方法は、`template <std::integral T>`のように`class`や`typename`といったキーワードを使用していたテンプレートパラメータの宣言部分にコンセプトを指定し、テンプレートパラメータ`T`を制約するものだった。この方法は簡易的な制約には便利だが、複数条件を指定できないというトレードオフがある。

制約の方法としては、以下の選択肢がある：

1. `class` / `typename`の代わりにコンセプトを指定する
2. `requires`節を使用する
3. 関数テンプレートの簡略構文を使用する


#### class / typenameの代わりにコンセプトを指定して制約する
`class` / `typename`キーワードの代わりにコンセプトを指定する方法は、これまでに紹介した。

もう少し詳細な仕様を紹介すると、この構文の場合、コンセプトの第1テンプレート引数がテンプレートパラメータで置き換えられる。`template <std::integral T>`の場合、`std::integral<T>`のようにテンプレートパラメータ`T`を`std::integral`コンセプトに自動的に指定される。

この方法では、複数のテンプレートパラメータをとるコンセプトを使用する場合に注意する必要がある。たとえば任意の引数型から型`T`を構築できることを要求する[`std::constructible_from`](/reference/concepts/constructible_from.md)コンセプトの場合、`template <std::constructible_from<int> T>`のように指定すると、`std::constructible_from<T, int>`を意味し、「型`T`が`int`から構築できること」を要求する制約となる。

```cpp example
#include <concepts>
#include <cassert>
#include <vector>

template <std::constructible_from<int> T>
T make_from_int(int x) {
  return T(x);
}

int main() {
  int a = make_from_int<int>(3);
  std::vector<int> b = make_from_int<std::vector<int>>(3);

  assert(a == 3);
  assert(b.size() == 3);
}
```
* std::constructible_from[link /reference/concepts/constructible_from.md]
* b.size()[link /reference/vector/vector/size.md]


#### requires節を使用して制約する
`requires`節を使用することで、以下のような制約ができる：

- ひとつのテンプレートパラメータを複数のコンセプトで制約 (AND / OR条件)
- クラステンプレートでメンバ関数ごとにクラステンプレートパラメータを制約

`requires`節は基本的に、テンプレートパラメータ宣言のあとに記述する。これは、関数テンプレート、クラステンプレート、エイリアステンプレート、変数テンプレートなど、どれでも共通である。また、`requires`では、ひとつのテンプレートパラメータに対して複数の制約を指定することができる。`&&`演算子によるAND条件、`||`演算子によるOR条件によって複数の制約を指定する。

```cpp example
#include <concepts>
#include <cassert>
#include <vector>

template <class T>
requires std::constructible_from<T, int> && std::move_constructible<T>
T make_from_int(int x) {
  return T(x);
}

int main() {
  int a = make_from_int<int>(3);
  std::vector<int> b = make_from_int<std::vector<int>>(3);

  assert(a == 3);
  assert(b.size() == 3);
}
```
* std::constructible_from[link /reference/concepts/constructible_from.md]
* std::move_constructible[link /reference/concepts/move_constructible.md]
* b.size()[link /reference/vector/vector/size.md]

また、requires節は、クラステンプレートのテンプレートパラメータを、メンバ関数ごとに制約するためにも使用できる。簡易的な[`std::vector`](/reference/vector/vector.md)の`push_back()`メンバ関数を実装してみよう。

```cpp example
#include <concepts>
#include <iostream>
#include <vector>
#include <algorithm>
#include <memory>
#include <stdexcept>

template <class T>
class MyVector {
  std::allocator<T> alloc_;
  T* data_ = nullptr;
  std::size_t capacity_ = 0;
  std::size_t size_ = 0;
public:
  // 簡易実装のため、事前にメモリ領域を確保して再確保はしない。
  // (std::vectorのコンストラクタとは効果が違う)
  explicit MyVector(std::size_t n)
    : data_{alloc_.allocate(n)},
      capacity_{n},
      size_{0}
  {}

  ~MyVector() {
    std::destroy_n(data_, size_);
    alloc_.deallocate(data_, size_);
  }

  // コピー版のpush_back
  void push_back(const T& x) requires std::copy_constructible<T>
  {
    if (size_ >= capacity_)
      throw std::out_of_range("over capacity");

    new (data_ + size_) T(x);
    size_ = size_ + 1;
  }

  // ムーブ版のpush_back
  void push_back(T&& x) requires std::move_constructible<T>
  {
    if (size_ >= capacity_)
      throw std::out_of_range("over capacity");

    new (data_ + size_) T(std::move(x));
    size_ = size_ + 1;
  }

  // 非テンプレートな関数に対するrequires節は、関数修飾の後ろに記述する
  T front() const& requires std::copy_constructible<T>
  {
    if (size_ < 1u)
      throw std::out_of_range("empty");
    return data_[0];
  }

  void print()
  {
    std::for_each_n(data_, size_, [](const T& x) {
      std::cout << x << std::endl;
    });
  }
};

int main() {
  std::string a = "Hello";
  std::string b = "World";

  MyVector<std::string> v(2);
  v.push_back(a);
  v.push_back(std::move(b));

  v.print();
}
```
* alloc_.allocate[link /reference/memory/allocator/allocate.md]
* alloc_.deallocate[link /reference/memory/allocator/deallocate.md]
* std::destroy_n[link /reference/memory/destroy_n.md]
* std::copy_constructible[link /reference/concepts/copy_constructible.md]
* std::move_constructible[link /reference/concepts/move_constructible.md]
* std::out_of_range[link /reference/stdexcept.md]
* std::move[link /reference/utility/move.md]
* std::for_each_n[link /reference/algorithm/for_each_n.md]

出力：

```
Hello
World
```


#### 関数テンプレートの簡略構文を使用する
ジェネリックラムダと同様に、関数テンプレートも`auto`プレースホルダーを使用して、簡易的にテンプレートを使用できる。その場合でも、各パラメータの型をコンセプトで制約できる。

```cpp
#include <concepts>
#include <cassert>
#include <limits>
#include <cmath>
#include <type_traits>

// template <std::integral A, std::integral B>
// bool equal(A a, B b); これと同じ
bool equal(std::integral auto a, std::integral auto b) {
  return a == b;
}

bool equal(std::floating_point auto a, std::floating_point auto b) {
  using T = std::common_type_t<decltype(a), decltype(b)>;
  return std::abs(a - b) <= std::numeric_limits<T>::epsilon();
}

int main() {
  assert(equal(1 + 2, 3));
  assert(equal(0.1 + 0.2, 0.3));
}
```
* std::integral[link /reference/concepts/integral.md]
* std::floating_point[link /reference/concepts/floating_point.md]
* std::abs[link /reference/cmath/abs.md]
* epsilon()[link /reference/limits/numeric_limits/epsilon.md]


## 仕様
### コンセプト定義
- 「コンセプト (concept)」は、テンプレート引数に対する制約を定義するテンプレートである。コンセプトは、以下の構文で定義する：
    ```cpp
    template <テンプレートパラメータ宣言>
    concept コンセプト名 = requires式;
    ```

- コンセプトは、`bool`型のprvalueを持つ定数式である：
    ```cpp
    template <class T>
    concept C = true;

    static_assert(C<int>);
    ```

- コンセプトは、関連制約を持ってはならない (条件によって定義が存在しないことは許可されない)
    ```cpp
    template <class T>
    concept A = true;

    template <A T> // コンパイルエラー！コンセプトは制約できない
    concept B = true;
    ```

- コンセプトはインスタンス化されない。コンセプトを明示的にインスタンス化、明示的に特殊化、部分的に特殊化した場合、プログラムは不適格となる


### requires式
- 「requires式 (Requires expressions)」は、「型`T`がメンバ関数`f()`を持っていなければならない」「型`T`がメンバ型`value_type`を持っていなければならない」といったテンプレートパラメータの型がもつプロパティを検査し、要件を定義するための機能である

- requires式の結果は、`bool`型のprvalueを持つ定数式である

- requires式のサンプルをいくつか示す：
    ```cpp
    template <typename T>
    concept R = requires (T i) {       // 型Tの値iがあるとして、
      typename T::type;                // 型Tがメンバ型typeを持つこと。
      {*i} -> std::convertible_to<const typename T::type&>; // 型Tの値に対して式*iが妥当であり、
                                                            // その式の戻り値型としてconst typename T::type&に変換可能な型が返ること
    };
    ```
    * std::convertible_to[link /reference/concepts/convertible_to.md]

    - ここでは、関数形式でローカルパラメータをひとつ (`T i`) とるrequires式によってコンセプト`R`を定義している
    - ローカルパラメータである`T i`の変数定義では、`T`型に対して「コピー構築可能であること」といった要求は行わず、そのような評価はコンパイル時にも行われない。これは[`std::declval()`](/reference/utility/declval.md)関数と同様に、「`T`型のなんらかの値」であることのみを表し、特定の値は持たず、構築もされない

- パラメータリスト後の波カッコ { } で囲まれた本体中には、要件のシーケンスをセミコロン区切りで記述する。各要件は、ローカルパラメータ、テンプレートパラメータ、およびその文脈から見えるほかの宣言を参照できる

- ローカルパラメータは、リンケージ、記憶域、生存期間をもたない

- ローカルパラメータのスコープは、名前が導入されてから本体の閉じカッコまでである

- ローカルパラメータはデフォルト引数を持ってはならず、パラメータリストの最後が `...` であってはならない

- 型`T`がrequires式で列挙された要件は定義順に検査され、全ての要件を満たす場合、`bool`型の定数`true`が返る。requires式内では、無効な型や式が形成されたり、意味論的な制約に違反する場合があるが、そういった場合はプログラムが不適格にはならず、`false`が返る
    - テンプレートパラメータに関わらず無効になる型や式が現れた場合、プログラムは不適格となる

- 対象となる型がひとつである場合でも、requires式のパラメータは複数とることができる：
    ```cpp
    template <typename T>
    concept C = requires (T a, T b) { // 型Tの値aとbがあるとして、
      a + b; // 式a + bが妥当であること
    };
    ```

- ローカルパラメータをとらないrequires式も定義できる：
    ```cpp
    template <typename T> concept C = requires {
      typename T::inner; // メンバ型innerの存在を要求
    };
    ```

- requires式で定義できる要件の種類は、以下である：
    - 単純要件
    - 型要件
    - 複合要件
    - 入れ子要件

#### 単純要件
- 「単純要件 (Simple requirements)」は、式の妥当性を表明する要件である。テンプレート引数で型を置き換えた結果として式が無効な場合、`false`に評価される
    ```cpp
    template <typename T>
    concept C = requires (T a, T b) { // 型Tの値aとbがあるとして、
      a + b; // 式a + bが妥当であること
    };
    ```

- この要件には、任意の定数式を含めることができるが、直接的にそのような方法をとったとしても、その定数式の評価された結果が`true`であること、というような要件にはできない。あくまで式が妥当であることの要件である


#### 型要件
- 「型要件 (Type requirements)」は、型の妥当性を表明する要件である。テンプレート引数で型を置き換えた結果として型が無効な場合、`false`に評価される

- 型要件の構文は以下のようになる：
    ```cpp
    typename 入れ子指定(省略可) 要求する型名;
    ```

    - つまり、先頭に`typename`が記述されていれば型要件である。テンプレートパラメータの型が保持するメンバ型を`typename T::nested_type;`のように要求することもできるが、特定のクラステンプレートにテンプレート引数を渡した結果が妥当であること、というような要求もできる

        ```cpp
        template <typename T, typename T::type = 0> struct S;
        template <typename T> using Ref = T&;

        template <typename T>
        concept C = requires {
          typename T::inner; // メンバ型innerの存在を要求
          typename S<T>;     // クラステンプレートの特殊化を要求
          typename Ref<T>;   // エイリアステンプレートRefに型Tを渡せることを要求
                             // (Tがvoidだったら失敗することを意図)
        };
        ```

- ただし特殊化の要求は、テンプレート引数を渡した結果として完全型になること、という要求ではない
    - そのため、宣言のみのプライマリテンプレートと、定義をもつ特殊化、という構成になっているクラステンプレートは、特殊化されていないテンプレート引数に対しては不完全型になるのみで非妥当ではない


#### 複合要件
- 「複合要件 (Compound requirements)」は、式のプロパティを表明する要件である。式の妥当性、`noexcept`、式の戻り値型に対する要件を順に検査する

- 複合要件の構文は以下のようになる：
    ```cpp
    { 妥当性を検査する式 } noexcept(省略可) -> 戻り値型の制約(省略可);
    ```

- この要件は、以下のように検査される：
    - テンプレート引数で型を置き換えて式を評価し、妥当でなければ`false`に評価される
    - `noexcept`を指定した場合、式は例外送出の可能性がある場合は`false`に評価される
    - 戻り値の型要件が指定された場合、
        - テンプレート引数で型を置き換えて型を評価し、妥当でなければ`false`に評価される
        - 戻り値型の制約が指定された場合、その要件を満たすこと。満たさなければ`false`に評価される。制約として制約名のみが指定された場合、`{E} -> Concept;`は`E; Concept<decltype((E))>;`と等価であり、唯一の制約引数として式の型が渡される。制約として引数付きの制約が指定された場合、`{E} -> Concept<Args...>;`は`E; Concept<decltype((E)), Args...>;`と等価となり、先頭の制約引数として式の型が渡される

- 例として、式のみを指定する場合、単純要件と等価である：
    ```cpp
    template <typename T>
    concept C1 = requires(T x) {
      {x++}; // 型Tの値xに対して式x++が妥当であること
    };
    ```

- 式と戻り値型を指定したい場合：
    ```cpp
    template <typename T>
    concept C2 = requires(T x) {
      {*x} -> std::same_as<typename T::inner>; // 型Tの値xに対して式*xが妥当であり、
                                               // その戻り値型がtypename T::inner型であること。
                                               // std::same_as<decltype(*x), typename T::inner>制約を意味する
    };
    ```
    * std::same_as[link /reference/concepts/same_as.md]

- 式と`noexcept`を指定した場合、指定した式`g(x)`が例外送出の可能性がないことが検査される：
    ```cpp
    template <typename T>
    concept C3 = requires(T x) {
      {g(x)} noexcept;
    };
    ```

- 式と戻り値型の制約を指定した場合、指定した式が妥当であることと、その戻り値型が指定した制約を満たすことが検査される：
    ```cpp
    template <typename T>
    concept C4 = requires(T x) {
      {x++} -> Incrementable;     // 式x++の戻り値型がIncrementable制約を満たすこと。
                                  // x; Incrementable<decltype((x++))>; と等価
      {*x} -> Constructible<int>; // 式*xの戻り値型がConstructible制約を満たすこと (intから構築可能であること)。
                                  // x; Constructible<decltype((*x)), int>; と等価
    }
    ```

#### 入れ子要件
- 「入れ子要件 (Nested requirements)」は、requires式内で`bool`型の定数式で制約する要件である。コンセプトには`bool`型の定数式を直接指定できるため入れ子要件と等価な指定ができるが、こちらは先に述べた単純要件、型要件、複合要件に対する追加の制約として使用する。要件は定義順に検査されるため、要件Aが成り立たなければ要件Bを検査しない、というような状況で入れ子要件を使用できるだろう

- 入れ子要件の構文は以下のようになる：
    ```cpp
    requires 制約式;
    ```

    - ここでの制約式とは、`concept C = 制約定数式;`のようになっているコンセプト定義に指定する`bool`型の定数式と同じである
        ```cpp
        template <typename U>
        concept C = sizeof(U) == 1;

        template <typename T>
        concept D = requires (T t) {
          requires C<decltype (+t)>;                   // コンセプトを指定できる
          requires std::is_default_constructible_v<T>; // 判定系の型特性も指定できる
        };
        ```
        * std::is_default_constructible_v[link /reference/type_traits/is_default_constructible.md]

- 入れ子要件では、requires式で導入したローカルパラメータを使用できる。ただし、ローカルパラメータは特定の値を意味しない「その型のなんらかの値をもつオブジェクト」でしかないため、ローカルパラメータの値を参照しようとする式は不適格となる。ローカルパラメータを使用できるのは、値が評価されない文脈のみである (`sizeof`、`decltype`、`alignof`など)
    ```cpp
    template <typename T>
    concept C = requires (T a) {
      requires sizeof(a) == 4; // OK : 値が評価されない文脈でローカルパラメータを使用
      //requires a == 0;       // コンパイルエラー！: 制約変数は値を評価できない
    }
    ```


### 制約テンプレート
- テンプレートは、クラス、関数、変数、エイリアスに加えて、コンセプトに対して宣言でき、その全てに対して制約を適用できる
    ```cpp
    template <パラメータリスト...>
    requires節
    宣言;
    ```

- テンプレートパラメータを「制約パラメータ (constrained parameter)」として宣言することで、requires節を指定することなくテンプレートパラメータを制約できる。制約パラメータを使用したテンプレートパラメータの宣言は、以下の構文である：
    ```cpp
    template <名前空間修飾付きのコンセプト名もしくはテンプレート引数付きコンセプト 識別子 デフォルトテンプレート引数(省略可)>
    ```

    - コンセプト名を指定した場合、指定されたテンプレート引数が自動的にコンセプトの第1テンプレート引数として渡される：
        ```cpp
        template <std::move_constructible T>
        class X;

        // 以下と等価
        template <class T>
        requires std::move_constructible<T>
        class X;
        ```
        * std::move_constructible[link /reference/concepts/move_constructible.md]

    - 第1テンプレート引数を除いたコンセプトを制約パラメータとして指定することで、第1テンプレート引数以外のテンプレート引数を任意に指定することができる：
        ```cpp
        // 2つのテンプレートパラメータをもつコンセプト
        template <class T, class U>
        concept Addable = requires(T x, U y) {
          x + y;
        };

        // Addableコンセプトの第1テンプレート引数としてTが渡され、
        // 第2テンプレート引数としてintが渡される
        template <Addable<int> T> // requires Addable<T, int> と等価
        struct X {};

        X<char> x; // requires Addable<char, int>
        ```

    - 制約パラメータに省略記号がついている場合、パラメータパックと見なされる。単一パラメータのコンセプトをパラメータパックにした場合、パラメータパックの各テンプレートパラメータがそのコンセプトを満たすべきという制約になる。複数パラメータをとるコンセプトをパラメータパックにした場合、そのパラメータパックに渡された引数列がコンセプトに渡される：
        ```cpp
        template<typename T> concept C1 = true;
        template<typename... Ts> concept C2 = true;
        template<typename T, typename U> concept C3 = true;

        template<C1 T> struct s1;      // requires C1<T>
        template<C1... T> struct s2;   // requires (C1<T> && ...)
        template<C2... T> struct s3;   // requires C2<T...>
        template<C3<int> T> struct s4; // requires C3<T, int>
        ```

- 制約された関数以外のテンプレート、もしくは制約されたテンプレートテンプレートパラメータ、ただし不明な特殊化のメンバテンプレート以外で、全てのテンプレート引数が依存名でない場合、その制約テンプレートの関連制約は全て満たされなければならない
    ```cpp
    template<typename T> concept C1 = sizeof(T) != sizeof(int);

    template<C1 T> struct S1 {};
    template<C1 T> using Ptr = T*;

    S1<int>* p; // コンパイルエラー！制約を満たさない
    Ptr<int> p; // コンパイルエラー！制約を満たさない

    template<typename T>
    struct S2 { Ptr<int> x; }; // コンパイルエラー！制約を満たさない
                               // intは依存名ではないので、この定義段階で制約チェックされる

    template<typename T>
    struct S3 { Ptr<T> x; }; // OK。Tは依存名なので、この段階では制約チェックされない

    S3<int> x; // コンパイルエラー！使用段階 (依存名でなくなった段階) で制約を満たさない

    template<template<C1 T> class X>
    struct S4 {
      X<int> x; // コンパイルエラー！制約を満たさない
    };

    template<typename T> concept C2 = sizeof(T) == 1;
    template<C2 T> struct S {};

    template struct S<char[2]>;      // コンパイルエラー！テンプレート引数が制約を満たさない
    template<> struct S<char[2]> {}; // コンパイルエラー！テンプレート引数が制約を満たさない
    ```

- クラステンプレートのメンバを宣言と定義で分ける場合、制約テンプレートの宣言は等価でなければならない：
    ```cpp
    template<typename T> concept C = true;
    template<typename T> concept D = true;

    template<C T>
    struct S {
      void f();
      void g();
      void h();
      template<D U> struct Inner;
    };

    template<C A> void S<A>::f() { }        // OK。テンプレート宣言が一致している
    template<typename T> void S<T>::g() { } // コンパイルエラー！S<T>の宣言と一致していない

    template<typename T>
    requires C<T>
    void S<T>::h() { }                      // コンパイルエラー！機能的には等価だが宣言が一致していない

    template<C X> template<D Y> struct S<X>::Inner { }; // OK
    ```

    - メンバテンプレートも同様に、テンプレート宣言が宣言と定義で等価でなければならない：
        ```cpp
        template<typename T> concept C1 = true;
        template<typename T> concept C2 = sizeof(T) <= 4;

        template<C1 T>
        struct S {
          template<C2 U> void f(U);
          template<C2 U> void g(U);
        };

        template<C1 T> template<C2 U>
        void S<T>::f(U) { } // OK。テンプレート宣言が一致している

        template<C1 T> template<typename U>
        void S<T>::g(U) { } // コンパイルエラー！テンプレート宣言が一致していない
        ```

- クラステンプレートおよび変数テンプレートの部分特殊化も制約できる：
    ```cpp
    template<typename T> concept C = true;

    template<typename T> struct X {};
    template<typename T> struct X<T*> {}; // #1
    template<C T> struct X<T> {};         // #2

    template<typename T>
    constexpr int value = 1;
    template<typename T>
    constexpr int value<T*> = 2;          // #1
    template<C T>
    constexpr int value<T> = 3;           // #2
    ```

    - この例において、#1 と #2 の部分特殊化はどちらも、プライマリテンプレートよりも特殊化されている。#1 の部分特殊化は成功するが、コンセプトによる制約の方がより特殊化されるため、`int*`型をテンプレート引数とした場合、#2 が選択される
        ```cpp
        template<typename T> concept C = requires (T t) { t.f(); };

        template<typename T> struct S { }; // #1
        template<C T> struct S<T> { };     // #2

        struct Arg { void f(); };

        S<int> s1; // #1 が選択される。#2 の制約を満たさない
        S<Arg> s2; // #2 が選択される。両方の制約を満たすが、#2 の方がより特殊化されている
        ```

- ラムダ式においても、テンプレートパラメータを個別に制約できる：
    ```cpp
    template<typename T> concept C = true;

    // テンプレート構文を使用したラムダ式のテンプレートパラメータを制約
    auto f = []<typename T1, C T2> requires C<T1> (T1 t1, T2 t2) {
        return t1 + t2;
    };

    // autoプレースホルダーによる簡略構文を使用したラムダ式のテンプレートパラメータを制約
    auto g = [](C auto t1, auto t2) requires C<decltype(t2)> {
        return t1 + t2;
    };
    ```

### requires節
- 「requires節 (Requires clauses)」は、テンプレートパラメータに対する制約を表明する構文である

- requires節は、`&&` (AND条件、conjunction、連言)、`||` (OR条件、disjunction、選言) の論理演算子によって複合的に制約を指定できる
    ```cpp
    template <class T>
    requires std::move_constructible<T> || std::copy_constructible<T>
    class MyVector;
    ```
    * std::move_constructible[link /reference/concepts/move_constructible.md]
    * std::copy_constructible[link /reference/concepts/copy_constructible.md]

- `&&`と`||`でつなげる個々の制約を「原子制約 (Atomic constraints)」という。制約単体、もしくは`&&`と`||`を含まない定数条件式が原子制約となる

- requires節は、非テンプレートの関数宣言にも記述できる。これは、クラステンプレートの非テンプレートメンバ関数に対する制約として使用できる
    - requires節は関数宣言のみに現れ、定義には現れてはならない
    - 戻り値の型を前置する構文では、CV修飾や`noexcept`のうしろに記述する
    - 戻り値の型を後置する構文では、戻り値型のうしろに記述する
        ```cpp
        void f1(int a) requires true;         // OK
        auto f2(int a) -> bool requires true; // OK
        auto f3(int a) requires true -> bool; // コンパイルエラー！requires節は戻り値型のうしろに記述すること

        void (*pf)() requires true;      // コンパイルエラー！変数は制約できない
        void g(int (*)() requires true); // コンパイルエラー！パラメータ宣言は制約できない

        auto* p = new void(*)(char) requires true; // コンパイルエラー！関数宣言ではない
                                                   // (関数シグニチャの一部ではないため関数ポインタの宣言には現れない)
        ```

    - 非テンプレートの関数宣言に対するrequires節は、仮想関数に対しては記述できない
        ```cpp
        struct A {
          virtual void f() requires true; // コンパイルエラー！仮想関数は制約できない
        };
        ```

    - 非テンプレートの関数宣言に対するrequires節は、クラステンプレートの非テンプレートメンバ関数に対する制約として使用する
        ```cpp
        template <class T>
        class MyVector {
        public:
          void push_back(const T&)
            requires std::is_copy_constructible_v<T>;

          void push_back(T&&)
            requires std::move_constructible<T>;
        };
        ```
        * std::is_copy_constructible_v[link /reference/type_traits/is_copy_constructible.md]
        * std::move_constructible[link /reference/concepts/move_constructible.md]

    - 関数宣言と関数定義を分ける場合、非テンプレートの関数宣言に対するrequires節は宣言と定義は等価でなければならない
        ```cpp
        template <class T>
        class MyVector {
        public:
          void push_back(const T&)
            requires std::copy_constructible<T>;

          void push_back(T&&)
            requires std::move_constructible<T>;
        };

        template <class T>
        void MyVector<T>::push_back(const T&)
          requires copy_constructible<T>
        {}                                    // OK

        template <class T>
        void MyVector<T>::push_back(T&&)
        {}                                    // コンパイルエラー！宣言と一致していない
        ```
        * std::copy_constructible[link /reference/concepts/copy_constructible.md]
        * std::move_constructible[link /reference/concepts/move_constructible.md]

- requires節は、requires式を持てる
    ```cpp
    template <typename T>
    requires requires (T x) { x + x; } // ひとつめのrequiresはrequires節
    T add(T a, T b) { return a + b; }  // ふたつめのrequiresはrequires式
    ```

- 非テンプレートのfriend宣言は、requires節を持ってはならない

### 関数オーバーロード
- 同じ名前の2つの関数宣言が、同じスコープ、等価なパラメータ宣言、等価なrequires節を持つ場合、同じ関数を参照するものとする
    - 同じ関数の再宣言と見なされ、オーバーロードにはならない
- 関数のオーバーロードとしては、より制約が強い関数が選択される：
    ```cpp
    template <class T>
    requires std::move_constructible<T>
    void f(T)
    {
      std::cout << "move" << std::endl;
    }

    template <class T>
    requires std::move_constructible<T> && std::copy_constructible<T>
    void f(T)
    {
      std::cout << "move&copy" << std::endl;
    }

    template <class T>
    requires std::move_constructible<T> && std::copy_constructible<T>
    void g(T)
    {
      std::cout << "move&copy" << std::endl;
    }

    template <class T>
    requires std::move_constructible<T>
    void g(T)
    {
      std::cout << "move" << std::endl;
    }

    f(0); // move&copy
    g(0); // move&copy
    ```
    * std::move_constructible[link /reference/concepts/move_constructible.md]
    * std::copy_constructible[link /reference/concepts/copy_constructible.md]

- オーバーロードの優先順は、以下のようになる：
    1. 非関数テンプレート
    2. より強い制約を満たすオーバーロード
    3. 関数テンプレート
- 満たされない制約を持つ全ての関数は、オーバーロード解決の候補から除外される


### autoに対する制約
- [ジェネリックラムダ](/lang/cpp14/generic_lambdas.md)では`[](auto a, auto b) { … }`のようにパラメータの型として`auto`を使用することで関数テンプレートとして関数呼び出し演算子が定義され、それぞれの変数にテンプレートパラメータが割り振られていた
- コンセプトの導入にともない、この仕様を以下のように拡大する：
    - ラムダ式以外の通常の関数もまたパラメータ型`auto`とすることで関数テンプレートを定義できるようにする
    - 関数の戻り値型として使用する`auto`、変数定義の`auto`、パラメータ型の`auto`をコンセプトで制約できるようにする構文を追加する

#### autoパラメータによる関数テンプレートの簡易定義
- パラメータ型を`auto`にすることにより、それぞれのパラメータにテンプレートパラメータが振り分けられる。
    ```cpp
    auto f(auto a, auto b) { return a + b; }

    // 以下と同じ
    // template <class T, class U>
    // auto f(T a, U b) { return a + b; }

    f(1, 2);     // パラメータaとbの型はint
    f(0.1, 0.2); // パラメータaとbの型はdouble
    ```

    - これはコンセプトによる制約がされない、単純な関数テンプレートの定義である

#### auto変数、autoパラメータ、auto戻り値に対する制約
- 変数定義のauto、関数パラメータのauto、戻り値型のautoをそれぞれ制約できる。単純な使い方は以下のようになる：
    ```cpp
    concept C = true;

    // 変数を制約する。制約を満たさない型が代入されようとしたらコンパイルエラー
    C auto a = 1;

    // パラメータ型を制約する
    // (constは制約の前)
    void f(const C auto& a, C auto b, C auto&& c) {}
    // 以下と同じ意味になる：
    // template <class T, class U, class V>
    // requires C<T> && C<U> && C<V>
    // void f(const T& a, U b, V&& c) {}

    // 戻り値型を制約する (decltype(auto)も同様)
    C auto g() { return 1; }

    // 非型テンプレート引数を制約する
    template <C auto N>
    struct X {};

    struct Y {
      // 型変換演算子の戻り値型を制約する
      operator C auto() const {
        return 1;
      }
    };
    ```

- テンプレート引数付きコンセプトを使用する場合、コンセプトの第1テンプレート引数として`auto`プレースホルダーで置き換わる型が自動的に渡される：
    ```cpp
    // std::copy_constructible<decltype(x)>を意味する
    void f(std::copy_constructible auto x);

    // std::constructible_from<decltype(x), int>を意味する
    void g(std::constructible_from<int> auto x);
    ```
    * std::copy_constructible[link /reference/concepts/copy_constructible.md]
    * std::constructible_from[link /reference/concepts/constructible_from.md]

## 備考
- GCC 9.1では、コンセプトが正式サポートされていないため、コンパイルオプションとして`-fconcepts`を付ける必要がある
- コンセプトに相当する型パラメータを制約する機能は、他の言語も持っている：
    - Haskell言語の型クラス (type class)
    - Scala言語のケースクラス (case class)


## この機能が必要になった背景・経緯
コンセプトは最初、テンプレートを使用した際のコンパイルエラーメッセージを読みやすいものにするため設計された。テンプレートは定義に使用された機能がそれぞれインスタンス化されるまで、型パラメータにその操作が適用できるかどうかわからない。そのため、テンプレートを使用したプログラムは、使い方を間違えたときに問題を解析しにくいエラーメッセージを出力した。

この問題を解決する方法として考えられたのが、テンプレートパラメータを制約するというものだ。定義ではなく宣言の段階でテンプレートパラメータが満たすべき要件を指定できるようにすることで、早い段階で型パラメータに適用できない操作を検出し、読みやすいエラーメッセージを出力できる。

C++11を策定する際、大きな目玉機能としてコンセプトの導入が予定されていた。そのときのコンセプトには、C++20で導入される機能に加え、以下のような機能が予定されていて、コンパイラが実験的に実装して試すこともできた：

- コンセプトマップ (concept map) : コンセプトの要求を直接的に満たさない型が、どのような形であればコンセプトの要求を満たせるのかを定義し、適用可能にする
- コンセプトのデフォルト実装 : 一部の要求を省略可能にし、型がその機能を持っていない場合に、要求されたインタフェースからデフォルト実装を定義する
- 制約外の機能を使用禁止 : コンセプトで制約した機能以外はテンプレート内で使用できない。Destructibleコンセプトで制約しなければオブジェクトの破棄すらできない
- 遅延チェック (late check) : 制約された機能以外が使用できないと不便であるため、`late_check {}`ブロック内では制約していない機能を使用できるようにし、従来のチェックが行われるようにした
- コンセプトの洗練 (refinement) : コンセプトにも継承相当の機能を導入し、あるコンセプトをベースにしてさらに強い制約をもつ新たなコンセプトを定義するもの。イテレータの分類などで使用する

C++11の会議において「コンセプトは本当にC++11に入れるんだな？」という投票を行い、コンセプトをC++11に入れる合意が得られてコンセプトが入った規格案であるCommittee Draft (CD) が公開された。しかしその後、コンセプトはやはり使うのが難しく複雑だということで取り下げられ、コンセプトが取り除かれたCommittee Draft (CD2) が再度公開された。ただしその際、コンセプトの策定で培った経験は活かすことになり、整理された自然言語としてテンプレートパラメータへの要求が規格に載ることとなった。

C++14の策定において、コンセプトの複雑さを回避して必要最小限の機能のみをまとめた「軽量コンセプト (Concept Lite)」という機能を入れることが計画された。これは、C++11で導入されたconstexprを使用し、`bool`型の定数式として制約を定義し、`requires`節に`bool`型定数式を指定して制約するというものだった。これはConcept TS (Technical Specification) として個別に各国承認が行われ、遅延したがC++17に導入される予定だった。

軽量コンセプトとしてなるべく早くプログラマにこの機能を導入するつもりだったが、その後コンセプトをさらに仕様拡張としていくことを考えると、最初の設計から大幅に違ったものになってしまう懸念があった。また、コンセプトは標準ライブラリの仕様に適用すべきものであるため、より完全なものが求められた。そのため、軽量コンセプトという予定はなくなり、より時間をかけて完全なコンセプトの仕様を策定することとなり、C++20で導入されることとなった。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [`<concepts>`](/reference/concepts.md)
- [`<iterator>`](/reference/iterator.md)
- [`<ranges>`](/reference/ranges.md)
- [C++20 autoパラメータによる関数テンプレートの簡易定義](function_templates_with_auto_parameters.md)


## 参照
- [P0734R0 Wording Paper, C++ extensions for Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0734r0.pdf)
- [P0857R0 Wording for "functionality gaps in constraints"](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0857r0.html)
- [P1084R2 Today's return-type-requirement s Are Insufcient](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1084r2.pdf)
- [P1141R2 Yet another approach for constrained declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1141r2.html)
- [P1452R2 On the non-uniform semantics of return-type-requirements](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1452r2.html)
- [P1616R1 Using unconstrained template template parameters with constrained templates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1616r1.html)
- [C++ Concepts - complete overview (Jakub Cislo)](http://programowaniezpasja.pl/wp-content/uploads/2019/05/Cpp_Concepts_-_complete_overview_-_Jakub_Cislo.pdf)
- [Multiple destructors with C++ concepts - Sandor Dargo's Blog](https://www.sandordargo.com/blog/2021/06/16/multiple-destructors-with-cpp-concepts)
