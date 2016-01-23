#overrideとfinal
* cpp11[meta cpp]

##概要
`override`と`final`はメンバ関数のオーバライドに制約をかけるキーワードである。


##仕様
- `override`を指定した仮想メンバ関数は、基底クラスにオーバライド可能なメンバ関数がないとき、コンパイルエラーつまり文法違反として扱われる。
- `final`を指定した仮想メンバ関数は、派生クラスにてオーバライドされたとき、文法違反として扱われる。
- `override`と`final`はコンテキスト依存キーワードである。
    - キーワード（例えば`return`や`new`など）は常にキーワードとして扱われるが、`override`と`final`は特定の場所に書かれたときだけキーワードとして扱われる。
    - 簡単に言えば、`final`はクラス名の後かメンバ関数名の後に限り、`override`はメンバ関数名の後に限って、キーワードとして扱われる。


##詳細な仕様
少し正確に書くとクラス名の宣言（class-head）は下記の文法となる：

```
class-head:
    class-key attribute-specifier-seq opt class-head-name class-virt-specifier opt base-clause opt
```

（説明、執筆中）

また、メンバ変数やメンバ関数の名前以降（member-declarator）は下記の文法となる：

```
member-declarator:
    declarator virt-specifier opt pure-specifier opt

declarator:
  ptr-declarator
  noptr-declarator parameters-and-qualifiers trailing-return-type

virt-specifier:
    override
    final

pure-specifier:
    = 0
```

（説明、執筆中）


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
  //NG, final メンバ関数はオーバライドできない
  void func_final();

  //OK、オーバライドできている
  void func_virt() override;

  //NG, 引数の個数、型が違っており、オーバライドできてない
  void func_virt_int(short a) override;

  //NG, 基底クラスの func_non_virt() は仮想関数では無いので、オーバライドできていない
  void func_non_virt() override;
};

//オーバライド不可の基底クラス
class base_f final {
  virtual void func_virt();
};

//派生クラス
class derived_f : public base_f {
  //NG、final 基底クラスのメンバ関数はオーバライドできない
  void func_virt();
};

int main()
{
  return 0;
}
```

##出力

clang++ 3.5.0によるエラー出力を示す。

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

オーバライドの間違いをコンパイル時に検知するためである。

- オーバライドしてはならない関数を、誤ってオーバライドする間違いを検知する。
    - 例えば、基底クラス`B`に`B::f()`というメンバ関数があることを知らず、`B`を継承したクラス`D`にメンバ関数`D::f()`を作成した場合である。
    - `B::f()`はオーバライドされるため、派生クラス`D`のインスタンスからは`B::f()`が呼び出されなくなる。この動作は基底クラス`B`の作者の意図とは異なる動作かもしれない。
    - C++11では`B::f()`を`final`と宣言することで、オーバライドの禁止を明示でき、意図しないオーバライドをした場合は文法違反として検知できる。

- オーバライドしたつもりで、オーバライドできていない間違いを検知する。
    - 例えば、メンバ関数名の間違い、引数の個数、型名の間違い、属性（`const`など）の間違いなどが挙げられる。
    - C++11では`D::f()`を`override`と宣言することで、オーバライドの意思を明示でき、オーバライドできていない場合は文法違反として検知できる。


##補足
(執筆中)

- なぜキーワードではなく、コンテキスト依存キーワードなのか？（N3163の提案）
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

文法上、無名クラスを`final`でオーバライド不可と宣言することはできない。`class final { ... }`と書いたとき、finalという名前のクラスと解釈しなければ、過去との互換性が保てないためである。

```cpp
//オーバライド不可の無名クラスでは無く、final という名前のクラスと解釈される
class final {
  ...
};
```


##検討されたほかの選択肢

`override`と`final`は紆余曲折を得て、現在の形になっている。

- N1827では`new`キーワードを使う案が提案された。

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

(執筆中)


- N2852では`[[override]]`と`[[hiding]]`と`[[check_name]]`を属性（attribute）として指定する案が提案された。

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

(執筆中)


- N3151では投票の結果、属性（attributes）が望ましくないとされ、キーワードとコンテキスト依存キーワードのどちらが良いか、検討が行われた。

|real keywords      | 6 SF | 10 WF | 5 WA |  0 SA |
|contextual keywords| 6 SF |  7 WF | 2 WA |  5 SA |
|attributes         | 1 SF |  6 WF | 3 WA | 10 SA |

- SF: Strongly Favor   : 強く賛成
- WF: Weakly Favor     : 弱く賛成
- WA: Weakly Against   : 弱く反対
- SA: Strongly Against : 強く反対


- N3163では`base_check`と`hiding`が提案された。

(執筆中)


- N3234では`explicit`の削除が提案された。

`explicit`と`hiding`は不要であるため。

（執筆中）


##参照
- [N1827 An Explicit Override Syntax for C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1827.htm)
- [N2852 Explicit Virtual Overrides](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2852.html)
- [N3151 Keywords for override control](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3151.html)
- [N3163 Override Control Using Contextual Keywords](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3163.pdf)
- [N3234 Remove explicit from class-head](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3234.pdf)
