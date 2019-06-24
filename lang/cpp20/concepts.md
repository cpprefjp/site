# コンセプト
* cpp20[meta cpp]

## 概要
(執筆中)

## 仕様
### concept
- `concept`キーワードによって定義されたコンセプトは、`bool`型のprvalueを持つ定数式である：
    ```cpp
    template <class T>
    concept C = true;

    static_assert(C<int>);
    ```

(執筆中)

### requires式
- 「requires式 (Requires expressions)」は、「型`T`がメンバ関数`f()`を持っていなければならない」「型`T`がメンバ型`value_type`を持っていなければならない」といったテンプレートパラメータの型がもつプロパティを検査し、要件を定義するための機能である
- requires式の結果は、`bool`型のprvalueを持つ定数式である
- requires式のサンプルをいくつか示す：
    ```cpp
    template <typename T>
    concept R = requires (T i) {       // 型Tの値iがあるとして、
      typename T::type;                // 型Tがメンバ型typeを持つこと。
      {*i} -> const typename T::type&; // 型Tの値に対して式*iが妥当であり、
                                       // その式の戻り値型としてconst typename T::type&が返ること
    };
    ```

    - ここでは、関数形式でローカルパラメータをひとつ (`T i`) とるrequires式によってコンセプト`R`を定義している
    - ローカルパラメータである`T i`の変数定義では、`T`型に対して「コピー構築可能であること」といった要求は行わず、そのような評価はコンパイル時にも行われない。これは[`std::declval()`](/reference/utility/declval.md)関数と同様に、「`T`型のなんらかの値」であることのみを表し、特定の値は持たず、構築もされない
- パラメータリスト後の波括弧 { } で囲まれた本体中には、要件のシーケンスをセミコロン区切りで記述する。各要件は、ローカルパラメータ、テンプレートパラメータ、およびその文脈から見えるほかの宣言を参照できる
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
    { 妥当性を検査する式 } noexcept(省略可) -> 戻り値型、もしくは戻り値型の制約(省略可);
    ```

- この要件は、以下のように検査される：
    - テンプレート引数で型を置き換えて式を評価し、妥当でなければ`false`に評価される
    - `noexcept`を指定した場合、式は例外送出の可能性がある場合は`false`に評価される
    - 戻り値の型要件が指定された場合、
        - テンプレート引数で型を置き換えて型を評価し、妥当でなければ`false`に評価される
        - 制約ではなく戻り値型が指定された場合、式の戻り値型が指定された戻り値型に変換可能であること。変換できなければ`false`に評価される
        - 制約が指定された場合、戻り値の型が制約の要件を満たすこと。満たさなければ`false`に評価される。制約として制約名のみが指定された場合、`{E} -> Concept;`は`E; Concept<decltype((E))>;`と等価であり、唯一の制約引数として式の型が渡される。制約として引数付きの制約が指定された場合、`{E} -> Concept<Args...>;`は`E; Concept<decltype((E)), Args...>;`と等価となり、先頭の制約引数として式の型が渡される
- 例として、式のみを指定する場合、単純要件と等価である：
    ```cpp
    template <typename T>
    concept C1 = requires(T x) {
      {x++}; // 型Tの値xに対して式x++が妥当であること
    };
    ```

- 式と戻り値型を指定した場合：
    ```cpp
    template <typename T>
    concept C2 = requires(T x) {
      {*x} -> typename T::inner; // 型Tの値xに対して式*xが妥当であり、
                                 // その戻り値型がtypename T::inner型に暗黙変換可能であること
    };
    ```

- 式と`noexcept`を指定した場合、指定した式`g(x)`が例外送出の可能性がないことが検査される：
    ```cpp
    template <typename T>
    concept C3 = requires(T x) {
      {g(x)} noexcept;
    };
    ```

- 式と制約を指定した場合、指定した式が妥当であることと、その戻り値型が指定した制約を満たすことが検査される：
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
    template <std::MoveConstructible T>
    class X;

    // 以下と等価
    template <class T>
    requires std::MoveConstructible<T>
    class X;
    ```
    * std::MoveConstructible[link /reference/concepts/MoveConstructible.md]

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

    - コンセプトのテンプレートパラメータが非型である場合、そのコンセプトを使用した制約テンプレートパラメータは非型になる：
    ```cpp
    template <int N>
    concept C = N >= 0;

    template <C N>
    struct X {};

    X<1> x;
    //X<-1> y; // コンパイルエラー！制約を満たさない
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

(執筆中)


### requires節
- 「requires節 (Requires clauses)」は、テンプレートパラメータに対する制約を表明する構文である
- requires節は、`&&` (AND条件)、`||` (OR条件) の論理演算子によって複合的に制約を指定できる
    ```cpp
    template <class T>
    requires std::MoveConstructible<T> || std::CopyConstructible<T>
    class MyVector;
    ```
    * std::MoveConstructible[link /reference/concepts/MoveConstructible.md]
    * std::CopyConstructible[link /reference/concepts/CopyConstructible.md]

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
        requires std::MoveConstructible<T>;
    };
    ```
    * std::is_copy_constructible_v[link /reference/type_traits/is_copy_constructible.md]
    * std::MoveConstructible[link /reference/concepts/MoveConstructible.md]

- requires節は、requires式を持てる
    ```cpp
    template <typename T>
    requires requires (T x) { x + x; } // ひとつめのrequiresはrequires節
    T add(T a, T b) { return a + b; }  // ふたつめのrequiresはrequires式
    ```

(執筆中)

### 関数オーバーロード
- 同じ名前の2つの関数宣言が、同じスコープ、等価なパラメータ宣言、等価なrequires節を持つ場合、同じ関数を参照するものとする
    - 同じ関数の再宣言と見なされ、オーバーロードにはならない
- 関数のオーバーロードとしては、より制約が強い関数が選択される：
    ```cpp
    template <class T>
    requires std::MoveConstructible<T>
    void f(T)
    {
      std::cout << "move" << std::endl;
    }

    template <class T>
    requires std::MoveConstructible<T> && std::CopyConstructible<T>
    void f(T)
    {
      std::cout << "move&copy" << std::endl;
    }

    template <class T>
    requires std::MoveConstructible<T> && std::CopyConstructible<T>
    void g(T)
    {
      std::cout << "move&copy" << std::endl;
    }

    template <class T>
    requires std::MoveConstructible<T>
    void g(T)
    {
      std::cout << "move" << std::endl;
    }

    f(0); // move&copy
    g(0); // move&copy
    ```
    * std::MoveConstructible[link /reference/concepts/MoveConstructible.md]
    * std::CopyConstructible[link /reference/concepts/CopyConstructible.md]

- 満たされない制約を持つ全ての関数は、オーバーロード解決の候補から除外される


## 備考
- GCC 9.1では、コンセプトが正式サポートされていないため、コンパイルオプションとして`-fconcepts`を付ける必要がある


## 例
```cpp example
```

### 出力
```
```


## この機能が必要になった背景・経緯


## 関連項目
- [`<concepts>`](/reference/concepts.md)
- [`<iterator>`](/reference/iterator.md)
- [`<ranges>`](/reference/ranges.md.nolink)


## 参照
- [P0734R0 Wording Paper, C++ extensions for Concepts](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0734r0.pdf)
- [P0857R0 Wording for "functionality gaps in constraints"](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0857r0.html)
- [P1084R2 Today's return-type-requirement s Are Insufcient](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1084r2.pdf)
- [P1141R2 Yet another approach for constrained declarations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1141r2.html)
