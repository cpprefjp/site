# メンバ関数の第1パラメータとして`*this`を宣言できるようにする [P0847R7]
* cpp23[meta cpp]
* this[meta alias]

<!-- start lang caution -->

このページはC++23に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++23では、非静的メンバ関数の第1パラメータに`this`キーワードを付けることで、これまで暗黙に渡されていた自身のオブジェクト（`*this`）を、明示的なパラメータとして宣言できるようになった。これを「明示的オブジェクトパラメータ (explicit object parameter) 」と呼び、この機能は「deducing this (`this`の推論)」としても知られる。

```cpp
struct S {
  void f(this S& self);        // 自身のオブジェクトをselfという名前のパラメータで受け取る
  void g(this const S& self);  // 従来の void g() const; に相当する
};
```

このパラメータの型をテンプレートにして`Self&&`と書くと、通常の関数パラメータと同じく[転送参照 (forwarding reference)](/lang/cpp11/rvalue_ref_and_move_semantics.md)となり、自身のオブジェクトが`const`かどうか、左辺値か右辺値かを、1つの定義でまとめて扱える。

呼び出し側のオブジェクトが左辺値なら`Self`は左辺値参照に、右辺値なら参照ではない型に推論されるため、[`std::forward`](/reference/utility/forward.md)`<Self>(self)`によって、左辺値は左辺値のまま、右辺値は右辺値のまま転送できる。これによって、右辺値に対する呼び出しではメンバをムーブする、といった処理を分岐なしに書ける。

自身のオブジェクトを経由せずに値を返す場合（スマートポインタの参照先を返す場合など）は、`self`を転送しても`const`性と値カテゴリが伝わらない。この機能とあわせてC++23で導入された[`std::forward_like()`](/reference/utility/forward_like.md)を使うと、自身のオブジェクトの`const`性と値カテゴリを、任意のオブジェクトへ適用して転送できる。

```cpp
class Widget {
  std::string data_;
public:
  // 従来は data() &, data() const&, data() &&, data() const&& の
  // 4つのオーバーロードが必要だった処理を、1つにまとめられる
  template <class Self>
  auto&& data(this Self&& self) {
    return std::forward<Self>(self).data_;
  }
};

Widget w{"hello"};
std::string& a = w.data();               // 左辺値なのでSelfはWidget&に推論され、
                                         // data_は左辺値参照として返る
std::string b = Widget{"world"}.data();  // 右辺値なのでSelfはWidgetに推論され、
                                         // data_は右辺値参照として返り、ムーブされる
```
* std::forward[link /reference/utility/forward.md]

また、パラメータとして受け取った自身のオブジェクトの型を推論できることから、以下のことも簡潔に書けるようになる。

- 派生クラスの型を、CRTP（Curiously Recurring Template Pattern）のテンプレートパラメータなしで基底クラスから取得する
- ラムダ式が自分自身を呼び出す（再帰的なラムダ式）


## 仕様
### 構文
非静的メンバ関数の第1パラメータの宣言に、`this`キーワードを前置する。

```cpp
struct C {
  void f(this C& self);                          // 明示的オブジェクトパラメータをもつ
  template <class Self> void g(this Self&& self, int);
};
```

- 明示的オブジェクトパラメータをもつ非静的メンバ関数を、明示的オブジェクトメンバ関数 (explicit object member function) と呼ぶ。もたないものは暗黙的オブジェクトメンバ関数 (implicit object member function) と呼ぶ
- 明示的オブジェクトパラメータ以外のパラメータを、非オブジェクトパラメータ (non-object parameter) と呼ぶ。呼び出し時、実引数は非オブジェクトパラメータに対応付けられ、`x.f(args...)`の`x`が明示的オブジェクトパラメータの初期化に使われる

### 制限
- 明示的オブジェクトパラメータをもつ関数には、参照修飾 (`&`, `&&`) とCV修飾を指定できない。オブジェクトの値カテゴリとCV修飾は、パラメータの型自体で表現する
- `static`および`virtual`を指定できない
- コンストラクタとデストラクタには、明示的オブジェクトパラメータを指定できない
- 明示的オブジェクトパラメータを関数パラメータパックにできない
- ラムダ式では、明示的オブジェクトパラメータと`mutable`・`static`を同時に指定できない

```cpp
struct C {
  void h(this C) const;  // コンパイルエラー！ CV修飾は指定できない
};
```

### 関数内での`this`
明示的オブジェクトメンバ関数の中では、`this`ポインタを使用できない。また、メンバへの非修飾のアクセス（暗黙の`this->`）もできない。メンバへは、明示的オブジェクトパラメータを通してアクセスする。

```cpp
struct S {
  int value;
  void f(this S& self) {
    // std::println("{}", value);      // コンパイルエラー！ 暗黙のthis->は使用できない
    std::println("{}", self.value);    // OK
  }
};
```

### 関数ポインタ
明示的オブジェクトメンバ関数のアドレスは、メンバ関数ポインタではなく、通常の関数ポインタとなる。

```cpp
struct S {
  void f(this S& self);
};

void (*fp)(S&) = &S::f;  // OK: メンバポインタではない
```

### 機能テストマクロ
- `__cpp_explicit_this_parameter`が`202110L`として定義される


## 例
### const/非const・左辺値/右辺値のオーバーロードをまとめる
```cpp example
#include <print>
#include <string>
#include <utility>

class Widget {
  std::string data_;
public:
  Widget(std::string s) : data_(std::move(s)) {}

  // Selfは、呼び出し側のオブジェクトに応じて
  // Widget&・const Widget&・Widgetのいずれかに推論される
  template <class Self>
  auto&& data(this Self&& self) {
    return std::forward<Self>(self).data_;
  }
};

int main()
{
  Widget w{"hello"};
  std::println("{}", w.data());

  // 右辺値に対する呼び出しでは、メンバもムーブされる
  std::string moved = Widget{"world"}.data();
  std::println("{}", moved);
}
```
* std::forward[link /reference/utility/forward.md]

#### 出力
```
hello
world
```

### CRTPを使わずに派生クラスの型を取得する
```cpp example
#include <print>

// 派生クラスの機能を使う共通処理を、
// CRTPのテンプレートパラメータ (struct Printable<Derived>) なしで書ける
struct Printable {
  template <class Self>
  void print_twice(this const Self& self) {
    self.print();
    self.print();
  }
};

struct Message : Printable {
  void print() const { std::println("hello"); }
};

int main()
{
  Message m;
  m.print_twice();
}
```

#### 出力
```
hello
hello
```

### 再帰的なラムダ式
```cpp example
#include <print>

int main()
{
  // 明示的オブジェクトパラメータとして自分自身を受け取ることで、
  // ラムダ式が自分自身を呼び出せる
  auto fact = [](this auto self, int n) -> int {
    return n <= 1 ? 1 : n * self(n - 1);
  };

  std::println("{}", fact(5));
}
```

#### 出力
```
120
```

### メンバ以外の値に`const`性と値カテゴリを伝える
```cpp example
#include <print>
#include <string>
#include <memory>
#include <utility>

class Wrapper {
  std::unique_ptr<std::string> p_;
public:
  Wrapper(std::string s) : p_(std::make_unique<std::string>(std::move(s))) {}

  // *self.p_は、selfがconstでも右辺値でも、常に非constの左辺値になる。
  // std::forward_like()によって、自身のオブジェクトのconst性と値カテゴリを適用する
  template <class Self>
  auto&& value(this Self&& self) {
    return std::forward_like<Self>(*self.p_);
  }
};

int main()
{
  Wrapper w{"hello"};
  std::println("{}", w.value());

  // 右辺値に対する呼び出しでは、参照先の文字列がムーブされる
  std::string moved = Wrapper{"world"}.value();
  std::println("{}", moved);
}
```
* std::forward_like[link /reference/utility/forward_like.md]

#### 出力
```
hello
world
```

### 値渡しの明示的オブジェクトパラメータ
```cpp example
#include <print>
#include <string>

class Builder {
  std::string result_;
public:
  // 自身のオブジェクトを値で受け取る。
  // 右辺値に対する呼び出しではムーブされるため、連鎖呼び出しでコピーが発生しない
  Builder add(this Builder self, const std::string& s) {
    self.result_ += s;
    return self;
  }

  const std::string& get(this const Builder& self) { return self.result_; }
};

int main()
{
  std::println("{}", Builder{}.add("a").add("b").add("c").get());
}
```

#### 出力
```
abc
```


## この機能が必要になった背景・経緯
C++03の時点で、メンバ関数はCV修飾によってオーバーロードできたため、`const`版と非`const`版で同じ処理を2回書く必要があった。この重複は、片方から他方へ`const_cast`で委譲することで減らせたが、安全とはいえない記述だった。

C++11で参照修飾が導入されると、この軸が「`&`・`const&`・`&&`・`const&&`」の4通りに増えた。たとえば[`std::optional`](/reference/optional/optional.md)の`value()`は、4つのオーバーロードすべてで同じ処理を書くか、3つを4つ目へ委譲するか、privateな静的メンバ関数のヘルパへ全体を委譲するかのいずれかが必要になっていた。いずれの方法でも、本質的には同じ処理のために定型的なコードが増える。

自身のオブジェクトをパラメータとして書けるようにすれば、この軸はテンプレートパラメータの推論に置き換わり、1つの定義で済む。あわせて、これまで自身の型をテンプレートパラメータとして渡すCRTPが必要だった場面や、自分自身を参照する手段がなかったラムダ式の再帰も、素直に書けるようになる。


## 検討されたほかの選択肢
自身のオブジェクトの型を推論する手段として、`this`そのものをテンプレート的に扱う構文なども検討されたが、「非静的メンバ関数の第1パラメータとして宣言する」という形が、既存の関数パラメータの規則（型推論・`auto`・参照の折りたたみ）をそのまま利用できるため採用された。

一方で、この設計では明示的オブジェクトパラメータの型が派生クラスへ推論されうるため、基底クラスのメンバが派生クラスで隠蔽 (shadowing) されている場合には、意図しないメンバへアクセスしてしまう可能性がある。基底クラスの側でこれを避けたい場合は、`self.Base::member`のように修飾するか、`(like_t<Self, Base>&&)self`のようにキャストしてからアクセスする必要がある。


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 関数の左辺値／右辺値修飾](/lang/cpp11/ref_qualifier_for_this.md)
- [C++11 ラムダ式](/lang/cpp11/lambda_expressions.md)
- [`std::forward_like()`](/reference/utility/forward_like.md) (C++23。自身のオブジェクトの`const`性と値カテゴリを、任意のオブジェクトへ適用して転送する)
- [C++26 `std::meta::is_explicit_object_parameter()`](/reference/meta/is_explicit_object_parameter.md)


## 参照
- [P0847R7 Deducing this](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p0847r7.html)
