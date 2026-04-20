# 静的リフレクション [P2996R13]
* cpp26[meta cpp]

<!-- start lang caution -->

このページはC++26に採用される見込みの言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++26では、コンパイル時にプログラムの構造を検査・操作できる「静的リフレクション (static reflection)」機能を導入する。

この機能は以下の要素で構成される：

- **リフレクション演算子`^^`** : 型、名前空間、変数、関数、メンバなどのプログラム要素から、その情報を表すコンパイル時の値（リフレクション）を生成する
- **スプライス演算子`[: :]`** : リフレクションをプログラム要素（型、式、テンプレート引数など）に変換して挿入する
- **`std::meta::info`型** : リフレクションを表すスカラ型。構造的型 (structural type) であり、定数テンプレートパラメータとして使用できる
- **`<meta>`ヘッダ** : リフレクションを操作するためのメタ関数群を提供する新しいヘッダ
- **`consteval`ブロック** : `consteval { ... }`によるコンパイル時副作用の実行
- **アノテーション** : 宣言にコンパイル時定数を付加し、リフレクションで取得できる機構
- **関数パラメータのリフレクション** : 関数の仮引数の型、名前、デフォルト引数の有無などをリフレクションで取得できる

```cpp
#include <meta>
#include <print>

enum class Color { red, green, blue };

// 列挙値を文字列に変換する汎用関数
template <typename E>
  requires std::is_enum_v<E>
constexpr std::string_view to_string(E value) {
  template for (constexpr auto e : std::define_static_array(std::meta::enumerators_of(^^E)) { // 型から列挙子のリストを取得
    if (value == [:e:]) {
      return std::meta::identifier_of(e); // 列挙子の名前を文字列として取得
    }
  }
  return "<unknown>";
}

int main() {
  std::println("{}", to_string(Color::red));    // "red"
  std::println("{}", to_string(Color::green));  // "green"
  std::println("{}", to_string(Color::blue));   // "blue"
}
```
* std::is_enum_v[link /reference/type_traits/is_enum.md]
* std::meta::enumerators_of[link /reference/meta/enumerators_of.md]
* std::meta::identifier_of[link /reference/meta/identifier_of.md]


## リフレクション演算子`^^`
`^^`は前置の単項演算子であり、プログラム要素から[`std::meta::info`](/reference/meta/info.md)型の値を生成する。

```cpp
constexpr auto r1 = ^^int;           // 型のリフレクション
constexpr auto r2 = ^^std;           // 名前空間のリフレクション
constexpr auto r3 = ^^::;            // グローバル名前空間のリフレクション
constexpr auto r4 = ^^std::vector;   // テンプレートのリフレクション
```

リフレクションできる対象と、取得できる主な情報：

| 対象 | 構文例 | 取得できる情報 |
|------|--------|----------------|
| 型 | `^^int`, `^^std::string` | 名前、サイズ、アライメント、型特性、メンバ一覧、基底クラス一覧 |
| 名前空間 | `^^std`, `^^::` | 名前、メンバ一覧 |
| 変数 | `^^x` | 名前、型、記憶域期間、リンケージ |
| 関数 | `^^f` | 名前、戻り値型、パラメータ一覧、`noexcept`の有無 |
| 非静的データメンバ | `^^S::m` | 名前、型、オフセット、アクセス指定子、ビットフィールドの有無 |
| 列挙子 | `^^Color::red` | 名前、値、所属する列挙型 |
| テンプレート | `^^std::vector` | 名前、テンプレート引数の置換 |
| 基底クラス関係 | [`bases_of()`](/reference/meta/bases_of.md)経由 | 基底クラスの型、アクセス指定子、`virtual`の有無 |
| 関数パラメータ | [`parameters_of()`](/reference/meta/parameters_of.md)経由 | 名前、型、デフォルト引数の有無、明示的オブジェクトパラメータか |

### オーバーロードされた関数のリフレクション
`^^f`で関数`f`をリフレクションする場合、`f`がオーバーロードされていると不適格となる。`^^`はオーバーロード集合ではなく単一の関数を対象とする。

```cpp
void f(int);
void f(double);

// constexpr auto r = ^^f;  // エラー: fはオーバーロードされている
```

オーバーロードされた関数の個々のオーバーロードを取得するには、[`members_of()`](/reference/meta/members_of.md)を使用する。`members_of()`は各オーバーロードを個別のリフレクションとして返す。

```cpp
struct S {
  void f(int);
  void f(double);
};

consteval {
  // members_of()で個々のオーバーロードを取得
  auto members = std::meta::members_of(
      ^^S, std::meta::access_context::unchecked());
  // フィルタリングで特定のオーバーロードを選択できる
}
```
* std::meta::members_of[link /reference/meta/members_of.md]
* std::meta::access_context[link /reference/meta/access_context.md]
* unchecked[link /reference/meta/access_context/unchecked.md]

また、スプライスで関数のリフレクションを式に変換する場合、オーバーロード解決は行われず、そのリフレクションが表す特定の関数が直接使用される。


## スプライス演算子`[: :]`
スプライス演算子は、[`std::meta::info`](/reference/meta/info.md)型の値（リフレクション）を受け取り、それが表すプログラム要素（型、式、テンプレート、名前空間）に変換して挿入する。`[:`と`:]`の間には`std::meta::info`型に評価される式を記述する。

```cpp
// 型スプライス：リフレクションが表す型を挿入する
constexpr std::meta::info r = ^^int;
typename[:r:] x = 42; // int x = 42; と等価

// 式スプライス：リフレクションが表す変数や関数を式として挿入する
int value = 10;
constexpr std::meta::info rv = ^^value;
[:rv:] = 20; // value = 20; と等価
```

リフレクションが表す要素の種類に応じて、スプライスの構文が異なる：

| 種類 | 構文 | 用途 |
|------|------|------|
| 型スプライス | `typename[:r:]` | リフレクション`r`が表す型を挿入。型のみの文脈では`typename`を省略可能 |
| 式スプライス | `[:r:]` | リフレクション`r`が表す変数・関数・列挙子などを式として挿入 |
| テンプレートスプライス | `template[:r:]` | リフレクション`r`が表すテンプレートを挿入 |
| 名前空間スプライス | `namespace[:r:]` | リフレクション`r`が表す名前空間を挿入 |

メンバアクセスにもスプライスを使用できる。`obj.[:r:]`の形式で、リフレクション`r`が表す非静的データメンバや基底クラスにアクセスする：

```cpp
struct S { int x; int y; };

consteval void example() {
  S s{1, 2};

  auto members = std::meta::nonstatic_data_members_of(
    ^^S, std::meta::access_context::unchecked());

  int a = s.[:members[0]:];  // s.x と等価。a == 1
  int b = s.[:members[1]:];  // s.y と等価。b == 2
}
```
* std::meta::nonstatic_data_members_of[link /reference/meta/nonstatic_data_members_of.md]
* std::meta::access_context[link /reference/meta/access_context.md]
* unchecked[link /reference/meta/access_context/unchecked.md]

### 基底クラスのサブオブジェクトへのスプライス
基底クラスのリフレクションに対してもメンバアクセスのスプライスを使用できる。これにより、非静的データメンバと基底クラスを統一的に扱うことができる。

```cpp
struct Base { int b; };
struct Derived : Base { int d; };

consteval void example() {
  Derived obj{{42}, 100};
  auto bases = std::meta::bases_of(
    ^^Derived, std::meta::access_context::unchecked());
  Base& base_ref = obj.[:bases[0]:];  // 基底クラスのサブオブジェクトへの参照
}
```
* std::meta::bases_of[link /reference/meta/bases_of.md]
* std::meta::access_context[link /reference/meta/access_context.md]
* unchecked[link /reference/meta/access_context/unchecked.md]

## `std::meta::info`型
[`std::meta::info`](/reference/meta/info.md)型は、リフレクションを表す基本的な型である。

- [`<meta>`](/reference/meta.md)ヘッダで`using info = decltype(^^::);`として定義される。`^^::`はグローバル名前空間のリフレクションを生成する式であり、`decltype`でその型を取得している
- スカラ型であり、クラス型ではない
- `==`と`!=`をサポートするが、順序比較（`<`, `>`, `<=>`）はサポートしない
- 構造的型 (structural type) であり、定数テンプレートパラメータとして使用できる
- consteval-only型であり、実行時には存在できない

```cpp
// 定数テンプレートパラメータとして使用する例
template <std::meta::info R>
using type_of_reflection = typename[:R:];

type_of_reflection<^^int> x = 42;  // int x = 42;
```

2つのリフレクションは、同じエンティティを反映している場合に等値となる。型の別名は、元の型とは区別される：

```cpp
using MyInt = int;
static_assert(^^int != ^^MyInt);                       // 型の別名は区別される
static_assert(^^int == std::meta::dealias(^^MyInt));   // dealias()で元の型を取得
```
* std::meta::dealias[link /reference/meta/dealias.md]


## `<meta>`ヘッダのメタ関数
[`<meta>`](/reference/meta.md)ヘッダは、リフレクションを操作するための多数の`consteval`メタ関数を提供する。名前の取得、エンティティの分類・検査、メンバや基底クラスの列挙、型特性の判定と型変換、テンプレート操作、レイアウト情報の取得、集成体型の動的定義など、広範な機能を備える。

詳細は[`<meta>`ヘッダのリファレンス](/reference/meta.md)を参照。


## `consteval`ブロック
`consteval { ... }`構文により、コンパイル時に副作用のあるコードを実行できる。[`std::meta::define_aggregate()`](/reference/meta/define_aggregate.md)と組み合わせて型を動的に生成する際に使用する。

```cpp
struct S;

consteval {
  // Sを2つのintメンバを持つ集成体として定義
  std::meta::define_aggregate(^^S, {
    std::meta::data_member_spec(^^int, {.name = "x"}),
    std::meta::data_member_spec(^^int, {.name = "y"})
  });
}

S s{1, 2};  // s.x == 1, s.y == 2
```
* std::meta::define_aggregate[link /reference/meta/define_aggregate.md]
* std::meta::data_member_spec[link /reference/meta/data_member_spec.md]


## アノテーション
宣言にコンパイル時定数値を付加し、リフレクションで取得できる機構である。属性とは異なり、ユーザー定義の意味的データを運ぶ。

### 構文
`[[=定数式]]`の構文でアノテーションを付加する。`=`接頭辞により通常の属性と区別される。

```cpp
struct [[=1]] Annotated {
  [[=42, =24]] int value;
};
```

アノテーションの式は構造的型でなければならない。アノテーションの取得には[`annotations_of()`](/reference/meta/annotations_of.md)や[`annotations_of_with_type()`](/reference/meta/annotations_of_with_type.md)メタ関数を使用する。

```cpp
struct Name { const char* value; };

struct [[=Name{std::define_static_string("点")}]] Point {
  [[=Name{std::define_static_string("x座標")}]] int x;
  [[=Name{std::define_static_string("y座標")}]] int y;
};

// メンバのアノテーションを取得
template for (constexpr auto m :
    std::define_static_array(std::meta::nonstatic_data_members_of(^^Point,
        std::meta::access_context::unchecked()))) {
  auto annots = std::meta::annotations_of_with_type(m, ^^Name);
  if constexpr (annots.size() > 0) {
    std::println("{}: {}", [:annots[0]:].value,
                           std::meta::identifier_of(m));
  }
}
// 出力:
// x座標: x
// y座標: y
```
* std::meta::nonstatic_data_members_of[link /reference/meta/nonstatic_data_members_of.md]
* std::meta::access_context[link /reference/meta/access_context.md]
* unchecked[link /reference/meta/access_context/unchecked.md]
* std::meta::annotations_of_with_type[link /reference/meta/annotations_of_with_type.md]


## `define_static_string` / `define_static_array` / `define_static_object`
これらは、コンパイル時に計算した値を静的ストレージに配置し、実行時に使用可能にするための関数群である。[`std::define_static_string()`](/reference/meta/define_static_string.md)は文字列を、[`std::define_static_array()`](/reference/meta/define_static_array.md)は配列を、[`std::define_static_object()`](/reference/meta/define_static_object.md)はオブジェクトをそれぞれ静的ストレージに配置する。これらは`<meta>`ヘッダで提供されるが、`std`名前空間に定義される（`std::meta`名前空間ではない）。

```cpp
// コンパイル時に計算した文字列を実行時に使用する
template <typename E>
  requires std::is_enum_v<E>
constexpr std::string_view enum_to_string(E value) {
  template for (constexpr auto e : std::define_static_array(std::meta::enumerators_of(^^E))) {
    if (value == [:e:]) {
      return std::meta::identifier_of(e);
    }
  }
  return "<unknown>";
}
```
* std::meta::enumerators_of[link /reference/meta/enumerators_of.md]
* std::meta::identifier_of[link /reference/meta/identifier_of.md]


## リフレクションのエラー処理
リフレクションのメタ関数は、不正な入力に対して[`std::meta::exception`](/reference/meta/exception.md)を送出する。定数評価中の例外処理として動作するため、実行時のオーバーヘッドはない。


## 例
### 構造体のメンバを列挙する
```cpp example
#include <meta>
#include <print>
#include <string>

struct Point {
  int x;
  int y;
  std::string name;
};

int main() {
  Point p{10, 20, "origin"};

  template for (constexpr auto m :
      std::define_static_array(std::meta::nonstatic_data_members_of(^^Point,
          std::meta::access_context::unchecked()))) {
    std::println("{}: {}", std::meta::identifier_of(m), p.[:m:]);
  }
}
```
* std::meta::nonstatic_data_members_of[link /reference/meta/nonstatic_data_members_of.md]
* std::meta::access_context[link /reference/meta/access_context.md]
* unchecked[link /reference/meta/access_context/unchecked.md]
* std::meta::identifier_of[link /reference/meta/identifier_of.md]

#### 出力
```
x: 10
y: 20
name: origin
```


### 列挙値を文字列に変換する
```cpp example
#include <meta>
#include <print>
#include <string_view>

enum class Color { red, green, blue };

template <typename E>
  requires std::is_enum_v<E>
constexpr std::string_view to_string(E value) {
  template for (constexpr auto e : std::define_static_array(std::meta::enumerators_of(^^E))) {
    if (value == [:e:]) {
      return std::meta::identifier_of(e);
    }
  }
  return "<unknown>";
}

int main() {
  std::println("{}", to_string(Color::red));
  std::println("{}", to_string(Color::green));
  std::println("{}", to_string(Color::blue));
}
```
* std::is_enum_v[link /reference/type_traits/is_enum.md]
* std::meta::enumerators_of[link /reference/meta/enumerators_of.md]
* std::meta::identifier_of[link /reference/meta/identifier_of.md]

#### 出力
```
red
green
blue
```


### 関数パラメータの名前と型を列挙する
```cpp example
#include <meta>
#include <print>

void process(int id, double value, const char* name) {}

int main() {
  template for (constexpr auto p : std::define_static_array(std::meta::parameters_of(^^process))) {
    std::println("パラメータ: {} (型: {})",
      std::meta::identifier_of(p),
      std::meta::display_string_of(std::meta::type_of(p)));
  }
}
```
* std::meta::parameters_of[link /reference/meta/parameters_of.md]
* std::meta::identifier_of[link /reference/meta/identifier_of.md]
* std::meta::display_string_of[link /reference/meta/display_string_of.md]
* std::meta::type_of[link /reference/meta/type_of.md]

#### 出力
```
パラメータ: id (型: int)
パラメータ: value (型: double)
パラメータ: name (型: const char*)
```


## <a id="relative-page" href="#relative-page">関連項目</a>
- [`<meta>`ヘッダ](/reference/meta.md)
- [C++26 コンパイル時のタプルやリストを展開処理する`template for`文](/lang/cpp26/expansion_statements.md)
- [C++26 定数評価での例外送出を許可](/lang/cpp26/allowing_exception_throwing_in_constant-evaluation.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
    - C++26での静的リフレクションの基本機能。リフレクション演算子`^^`、スプライス演算子`[: :]`、`std::meta::info`型、`<meta>`ヘッダのメタ関数群を導入する。
- [P3394R4 Annotations for Reflection](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3394r4.html)
    - 宣言にコンパイル時定数を付加するアノテーション機能`[[=expr]]`と、それを取得するための`annotations_of()`メタ関数を追加する。
- [P3293R3 Splicing a base class subobject](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3293r3.html)
    - 基底クラスのリフレクションに対するメンバアクセスのスプライス`obj.[:base:]`と、基底クラスと非静的データメンバを統合取得する`subobjects_of()`を追加する。
- [P3096R12 Function Parameter Reflection in Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3096r12.pdf)
    - 関数パラメータのリフレクションを追加する。`parameters_of()`、`return_type_of()`、`has_default_argument()`などのメタ関数を導入する。
- [P3491R3 `define_static_{string,object,array}`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3491r3.html)
    - コンパイル時に計算した値を静的ストレージに配置するための`define_static_string()`、`define_static_array()`、`define_static_object()`を追加する。
- [P3560R2 Error Handling in Reflection](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3560r2.html)
    - リフレクションのメタ関数のエラー処理として`std::meta::exception`例外クラスを導入する。コンパイル時例外として動作する。
