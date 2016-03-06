#overrideとfinal
* cpp11[meta cpp]

##概要
`override`は仮想メンバ関数のオーバーライドを明示的に宣言するキーワードである。

`final`は派生クラスの仮想メンバ関数のオーバーライドを制約するキーワードである。


##仕様
- `override`を指定した仮想メンバ関数は、基底クラスにオーバーライド可能な仮想メンバ関数がないとき、コンパイルエラーつまり文法違反として扱われる。
- `final`を指定した仮想メンバ関数は、派生クラスにてオーバーライドされたとき、文法違反として扱われる。
- `override`と`final`はコンテキスト依存キーワードである。
    - キーワード（例えば`return`や`new`など）は常にキーワードとして扱われるが、`override`と`final`は特定の場所に書かれたときだけキーワードとして扱われる。
    - 簡単に言えば、`final`はクラス名の後かメンバ関数名の後に限り、`override`はメンバ関数名の後に限って、キーワードとして扱われる。


##詳細な仕様
正確ではないが、クラス名の宣言（class-head）は下記の文法となる：

```
class-head:
    class-key attribute-specifier opt class-head-name class-virt-specifier opt base-clause opt
```

- class-key：クラスのキーワード指定、`class`, `struct`, `union`のどれかが書ける
- attribute-specifier（省略可、複数可）：属性の指定、属性は`[[attribute]]`のように書く
- class-head-name: クラス名またはテンプレート名の指定
- class-virt-specifier（省略可）：オーバーライドの指定、`final`のみ書ける
- base-clause：省略可、継承元の指定、例えば`: public base_class`のように書く

すなわち`final`を書くことができる位置は、クラス名の後、継承元の指定の前となる。

```cpp
class derived_class final : public base_class {
  ...
}
```

また、メンバ変数やメンバ関数の名前以降（member-declarator）は下記の文法となる：

```
member-declarator:
    declarator virt-specifier opt pure-specifier opt

declarator:
  ptr-declarator
  noptr-declarator parameters-and-qualifiers trailing-return-type
```

- declarator：メンバの宣言、戻り値の型を前置するか、後置するかの 2つに大別できる
    - ptr-declarator, noptr-declarator：簡単に言うと、変数、関数の指定
    - parameters-and-qualifiers：引数リストの指定
    - trailing-return-type：[戻り値の型を後置する関数宣言構文](trailing_return_types.md)、`-> 型`のように書く
- virt-specifier（省略可）：オーバーライドの指定、`override`または`final`
- pure-specifier（省略可）：純粋仮想関数の指定、`= 0`のように書く

すなわち`override`または`final`を書くことができる位置は、戻り値の型の後置の後、純粋仮想関数の指定の前となる。

```cpp
class AAA {
  virtual auto func_virt(int a) const -> decltype(a) final = 0;
};
```

##例
```cpp
//基底クラス
class base {
  virtual void func_final() final;
  virtual void func_virt();
  virtual void func_virt_int(int a);
  void func_non_virt();
};

//派生クラス
class derived : public base {
  //NG, final メンバ関数はオーバーライドできない
  void func_final();

  //OK, オーバーライドできている
  void func_virt() override;

  //NG, 引数の個数、型が違っており、オーバーライドできてない
  void func_virt_int(short a) override;

  //NG, 基底クラスの func_non_virt() は仮想関数では無いので、オーバーライドできていない
  void func_non_virt() override;
};

//オーバーライド不可の基底クラス
class base_f final {
  virtual void func_virt();
};

//派生クラス
class derived_f : public base_f {
  //NG, final 基底クラスのメンバ関数はオーバーライドできない
  void func_virt();
};

int main()
{
  return 0;
}
```

###出力

例に挙げたコードをclang++ 3.5.0にてコンパイルした際のエラー出力を示す。

```
$ clang++ -std=c++0x -Wall override_final.cpp
override_final.cpp:12:8: error: declaration of 'func_final' overrides a 'final' function
  void func_final();
       ^
override_final.cpp:3:16: note: overridden virtual function is here
  virtual void func_final() final;
               ^
override_final.cpp:18:31: error: non-virtual member function marked 'override' hides virtual member function
  void func_virt_int(short a) override;
                              ^
override_final.cpp:5:16: note: hidden overloaded virtual function 'base::func_virt_int' declared here: type mismatch at 1st parameter ('int' vs 'short')
  virtual void func_virt_int(int a);
               ^
override_final.cpp:21:24: error: only virtual member functions can be marked 'override'
  void func_non_virt() override;
                       ^~~~~~~~
override_final.cpp:30:26: error: base 'base_f' is marked 'final'
class derived_f : public base_f {
                         ^
override_final.cpp:25:7: note: 'base_f' declared here
class base_f final {
      ^      ~~~~~
4 errors generated.
```


##この機能が必要になった背景・経緯

オーバーライドの間違いをコンパイル時に検知するためである。

- オーバーライドしてはならない関数を、誤ってオーバーライドする間違いを検知する。
    - 例えば、基底クラス`B`に`B::f()`というメンバ関数があることを知らず、`B`を継承したクラス`D`にメンバ関数`D::f()`を作成した場合である。
    - `B::f()`はオーバーライドされるため、派生クラス`D`のインスタンスからは`B::f()`が呼び出されなくなる。この動作は基底クラス`B`の作者の意図とは異なる動作かもしれない。
    - C++11では`B::f()`を`final`と宣言することで、オーバーライドの禁止を明示でき、意図しないオーバーライドをした場合は文法違反として検知できる。

- オーバーライドしたつもりで、オーバーライドできていない間違いを検知する。
    - 例えば、メンバ関数名の間違い、引数の個数、型の間違い、属性（`const`など）の間違いなどが挙げられる。
    - C++11では`D::f()`を`override`と宣言することで、オーバーライドの意思を明示でき、オーバーライドできていない場合は文法違反として検知できる。


##補足

- なぜキーワードではなく、コンテキスト依存キーワードが選ばれたか？（N3163の提案）
    - `final`や`override`のような簡潔で良い名前が使えて、なおかつ、過去との互換性を維持できるためである。
    - `final`や`override`をキーワードとした場合`final`や`override`を関数名や変数名として使っていたコードがC++11では文法違反となってしまう。しかしコンテキスト依存キーワードであれば文法違反にならない。

例えば下記のようなコードは`final`や`override`をキーワードとすると文法違反となる：

```cpp
//クラス名に使っている可能性がある
class override {
};

class hoge {
  //メンバ関数名に使っている可能性がある
  void final();
  //メンバ変数名に使っている可能性がある
  int override;
};

//関数名に使っている可能性がある
int final()
{
  //変数名に使っている可能性がある
  int override = 0;
  return override;
}
```

文法上、無名クラスを`final`でオーバーライド不可と宣言することはできない。`class final { ... }`と書いたとき、finalという名前のクラスと解釈しなければ、過去との互換性が保てないためである。

```cpp
//オーバーライド不可の無名クラスでは無く、final という名前のクラスと解釈される
class final {
  ...
};
```


##検討されたほかの選択肢

`override`と`final`は紆余曲折を得て、現在の形になっている。

- N1827にて`new`キーワードと明示的にオーバーライドを宣言する記法が提案された。
    - `new`を宣言したメンバ関数は必ずオーバーライドしなければならない。
    - この記法は基底クラスにおいて`new`の宣言を変更すると、全ての派生クラスに影響を及ぼしてしまう欠点がある。
    - 例えば、基底クラス`A`の`virtual void f();`を`virtual void f() : new;`に変更すると、派生クラス`B`の`virtual void f();`を`virtual void f() : A;`に変更しなければならない。これは`A`の派生クラス全てにおいて生じる。

```cpp
struct A {
  virtual void f();       // derived may explicitly override
  virtual void g();       // derived may explicitly override
  virtual void h() : new; // derived _must_ explicitly override
};

struct B : A {
  virtual void f();       // OK, backward compatibility 
  virtual void g() : A;   // OK, optionally explicit
  virtual void h(); // Error: requires overrider list
};
```


- N2108にて`new virtual`、`explicit`キーワードの追加と、`virtual`キーワードの意味の変更が提案された。
    - `new virtual`は新たな仮想メンバ関数を宣言する。
    - `virtual`は意味を変更し、メンバ関数の明示的なオーバーライドを宣言する。オーバーライドできていなければ文法違反となる。
```cpp
class B {
  virtual void f();
  virtual void h(int);
};

class D explicit : public B {
  virtual void f();          // ok: overrides B::f
  virtual void g(long);      // ill-formed: new virtual function introduced
  new virtual void g2(long); // ok: new virtual function introduced
  void h(int);               // ill-formed: overriding without "virtual"
  virtual void h(long);      // ill-formed: new virtual function introduced
  virtual int h(int);        // ill-formed: return type does not match B::h
};
```


- N2365では`[[check_names]]`、`[[new]]`、`[[hiding]]`属性（attribute）の追加と、`virtual`キーワードの意味の変更が提案された。
    - N2236にて属性が文法として提案されたため、それを使ったようだ。
    - `[[check_names]]`は明示的にオーバーライドのチェックを行う宣言である。
    - `[[check_names]]`を指定しなければ、C++03以前と同じ動作をする。
        - N2108では`[[check_names]]`の考え方がなかったため、過去との互換性が失われていた。
        - オーバーライドのチェックの有無を選べるようにすることで、C++03で正しかったコードを破壊しないように配慮された。
    - `[[new]]`は新たな仮想メンバ関数を宣言し、オーバーライドしていれば文法違反となる。
        - N2108の`new virtual`キーワードとほぼ同じアイデアである。
    - `[[hiding]]`は基底クラスの仮想メンバ関数をオーバーライドせず、同名の別関数で隠す（hiding）ことを宣言する。隠せていなければ文法違反となる。
    - `virtual`は意味を変更し、メンバ関数の明示的なオーバーライドを宣言する。オーバーライドできていなければ文法違反となる。
        - N2108同様である。

間違えてオーバーライドしてしまう例：

```cpp
struct base {
  virtual void some_func();
};

struct derived [[check_names]] {
  void some_func();  // error, accidental override with check_names attribute
  virtual void some_func(); // OK, override with virtual keyword
};
```

間違えてオーバーライドできていない例：

```cpp
struct base {
  virtual void some_func1();
  virtual void some_func2(float);
  virtual void some_func3() const;
  virtual long some_func4(int);
};

struct derived [[check_names]] {
  virtual void sone_func1();  // error, mis-spelled name
  virtual void some_func2(double); // error, no bad argument type
  virtual void some_func3(); // error, missing cv-qualification
  virtual int some_func4(int); // ill-formed: return type does not match B::h
};
```


- N2852では`[[override]]`、`[[hiding]]`、`[[check_names]]`属性の追加が提案された。
    - `[[override]]`は仮想メンバ関数のオーバーライドを宣言し、オーバーライドできていなければ文法違反となる。
        - N2365では`virtual`キーワードの意味を変更して同様の機能を実現していたが、N2852では`virtual`の意味は従来通りに留め、`[[override]]`に役割を譲った。
    - `[[hiding]]`、`[[check_names]]`はN2365と同様の意味である。

```cpp
struct base {
  virtual void some_func();
};

struct derived1 [[check_names]] : base {
  void some_func();  // error, accidental override with check_names attribute
};

struct derived2 [[check_names]] : base {
  void some_func [[override]] (); // OK, override with virtual keyword
};
```


- N2928にて`[[check_names]]`属性は`[[base_check]]`属性に名前が変えられた。
    - N2920にて`[[base_check]]`、`[[strict_names]]`が候補に挙がっていた。
    - なぜ名前を変えたのかわからなかった。加筆いただけると嬉しい。


- N3151では投票の結果、属性（attributes）は望ましくないとされ、残った2つの選択肢であるキーワードとコンテキスト依存キーワードのどちらが良いか、検討が行われた。

| 解決策             | 賛成 | やや賛成 | やや反対 | 反対 |
|--------------------|------|----------|----------|------|
| real keywords      | 6 SF | 10 WF | 5 WA |  0 SA |
| contextual keywords| 6 SF |  7 WF | 2 WA |  5 SA |
| attributes         | 1 SF |  6 WF | 3 WA | 10 SA |

注：表中のSFやWFという単語は、SF: Strongly Favor, WF: Weakly Favor, WA: Weakly Against, SA: Strongly Againstの略である。

コンテキスト依存キーワード（この例では`hides_name`という名前になっている）にはDaveed Vandevoordeが指摘した問題がある。この問題は`[[hiding]]`属性や`strictdecl`キーワードならば発生しない：

```cpp
struct Z {};
struct X
{
  // これはどういう意味？
  // 構造体の宣言？
  // それとも変数の宣言？
  struct Z hides_name;
};

struct C {};
struct A
{
  typedef int C;
};

struct B : A
{
  // 以前宣言した C という名前の構造体の名前を隠す？
  // それとも変数の宣言？
  struct C hides_name;
};

// これで解決する？
struct B : A
{
  hides_name struct hides_name C p;
};
```

- N3151では結論としてキーワードを提案した。
    - キーワードの場合はユーザが混乱するような変な名前を避け、なおかつ過去との互換性をできるだけ保つ名前を選ぶ必要があった。
    - そのため、既存のコードで使われていない、つまり既存のコードが文法違反となるケースが少ない名前が調査された。
- 最終的に下記の名前が提案された。

| 属性           | 対応するキーワード |
|----------------|--------------------|
| [[base_check]] | strictdecl |
| [[hiding]]     | hidedecl   |
| [[override]]   | ovrdecl    |
| [[final]]      | finaldecl  |


- N3163ではコンテキスト依存キーワードを使うことの利点と、`base_check`、`hiding`、`override`、`final`コンテキスト依存キーワードの追加が提案された。


- N3206では`[[base_check]]`、`[[hiding]]`、`[[override]]`、`[[final]]`属性を削除し、`explicit`、`new`、`override`、`final`コンテキスト依存キーワードの追加が提案された。
    - `new`は基底クラスの仮想メンバ関数をオーバーライドせず、同名の別関数で隠す（hiding）ことを宣言する。隠せていなければ文法違反となる。
    - N3163の提案にあった`hiding`という名前は採用されなかった。
        - N3206には`hiding`を採用しなかった理由は明示的に書いていない。
        - 正確な理由をご存じの方は加筆いただけると嬉しい。


- 仮想メンバ関数名を隠す（hiding）ことを宣言する方法は、今までにいくつか提案されてきたが、いずれも問題が残っている。
    - N3221の未解決課題リストが示す通り、`[[hiding]]`属性は、`[[hiding]]`を宣言したいが文法上不可能な問題がある。

```cpp
struct B1 {
  int N;
  int M;
};
struct B2 {
  int M;
};
struct [[base_check]] D: B1, B2 {
  enum { N };    // hides B1::N but cannot take an attribute
  using B1::M;   // hides B2::M but cannot take an attribute
};
```


- N3234にある通り、`new`コンテキスト依存キーワードはメンバ関数名の後にしか書けないため、メンバ関数をメンバ変数で隠した場合に`new`を宣言したいが文法上不可能な問題がある。

```cpp
struct B
{
  void f() { std::cout << "B::f()" << std::endl;}
};
struct D explicit : B
{
  struct foo { void operator()() { std::cout << "D::foo::operator()()" << std::endl; }};

  // B::f()を隠してしまうので文法違反
  foo f;
};
```


- N3234では`new`、`explicit`コンテキスト依存キーワードの削除が提案された。
    - `explicit`だけ残すと、メンバ関数以外でメンバ名のhidingを起こす既存のコードが破壊されるため、`new`とともに削除された。
    - N3272で提案が取り込まれた。


- 以上の経緯を経てC++11では、`override`と`final`コンテキスト依存キーワードの追加のみが行われた。


##参照
- [N1827 An Explicit Override Syntax for C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1827.htm)
- [N2108 Explicit Virtual Overrides](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2108.html)
- [N2365 Explicit Virtual Overrides](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2365.html)
- [N2852 Explicit Virtual Overrides](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2852.html)
- [N2928 Explicit Virtual Overrides](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2928.htm)
- [N3151 Keywords for override control](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3151.html)
- [N3163 Override Control Using Contextual Keywords](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3163.pdf)
- [N3206 Override control: Eliminating Attributes](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3206.htm)
- [N3234 Remove explicit from class-head](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3234.pdf)
- [N3272 Follow-up on override control](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3272.htm)
