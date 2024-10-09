# `<=>`/`==`による比較演算子の自動定義 [P0515R3]
* cpp20[meta cpp]

<!-- start lang caution -->

このページはC++20に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
新しく三方比較演算子`<=>`が導入されることにより、順序付けと同値比較の6つの関係演算子（`<`, `<=`, `>`, `>=`, `==`, `!=`）を容易に実装することができるようになる。

```cpp example
#include <compare>  //<=>利用の場合必須
#include <iostream>

struct C {
  int x;
  int y;
  double v;
  char str[32];

  //<=>をpublicで定義しておくことで、その他の演算子が導出される
  auto operator<=>(const C&) const = default;
};


int main() {
  C c1 = {10, 20, 3.1415, "Three-way Comparison" };
  C c2 = {10, 20, 3.1415, "Spaceship Operator" };

  //三方比較演算子そのものによる比較
  std::cout << ((c1 <=> c2) == 0) << std::endl;
  std::cout << ((c1 <=> c2) <  0) << std::endl;
  std::cout << ((c1 <=> c2) >  0) << std::endl;

  //クラスCは6つの演算子による比較が可能
  std::cout << (c1 <  c2) << std::endl;
  std::cout << (c1 <= c2) << std::endl;
  std::cout << (c1 >  c2) << std::endl;
  std::cout << (c1 >= c2) << std::endl;
  std::cout << (c1 == c2) << std::endl;
  std::cout << (c1 != c2) << std::endl;
}
```

この様に、あるクラスに対して三方比較演算子`<=>`を定義しておくことで最大6つの比較演算子を導出し使用することができる。  
そして、そのような`<=>`は`default`実装で十分ならば実装を省略できる。

この様な三方比較の事を一貫比較（Consistent comparison）と言い、この演算子は三方比較演算子（Three-way comparison operator）と呼ぶ。また、演算子の見た目から宇宙船演算子（Spaceship operator）と呼ばれることもある。

この様に、三方比較演算子を用いれば比較演算子の定義が非常に容易になるため[`std::rel_ops`](/reference/utility/rel_ops.md)はその役割をほとんど失い、非推奨となった。

## 仕様

### 三方比較
ある型の値`a, b`についての`a <=> b`による比較の結果は単純な`bool`ではなく、未満・等しい・超える、という3つの関係を同時に表す値を返す。  
そこから`a, b`の関係を`bool`の形で得るには、`0`リテラルとの比較を用いる。

```cpp
int a = 10;
int b = 20;

auto comp = a <=> b;

if (comp < 0) {
  std::cout << "a < b";
} else if (0 < comp) {
  std::cout << "a > b";
} else if (comp == 0) {
  std::cout << "a = b";
}
```

この場合の結果は`a < b`が出力される。

戻り値の値は左辺に対する右辺の関係を表すので、引数順を入れ替えると順序の方向も逆転する（上記の例の場合、`comp = b <=> a`とすると`comp < 0 == false, 0 < comp == true`となり、`a > b`が出力される）。これは、数値型の場合は`左辺-右辺`の結果が`0`より大きいか？によって比較結果を表現していると見ることができる。

なお、三方比較演算子の戻り値の`0`リテラル以外との比較は未定義動作とされる。`1`だったり`0.0`であってはならない。

```cpp
int a = 10;
int b = 20;

auto comp = a <=> b;

//全て未定義動作
bool is_less = comp == 1;
bool is_greater = -1 < comp
bool is_equal = comp == 0.0;
```

### 比較カテゴリ型（Comparison category type）
三方比較演算子の戻り値型は`int`などの整数型ではなく、比較カテゴリ型と呼ばれる専用の型である。  
これは、比較対象となる型の満たしている同値や順序の関係についてを専用の型によって表明し、コンセプト等の機構によってその性質に応じた適切な処理へのディスパッチを行うことを出来るようにするためである（例えば、後で説明する`<=>`演算子の合成の際に利用されている。）。

以下の3つの比較カテゴリ型が提供される。

|比較カテゴリ型|対応する数学的な関係|導出される演算子|
|:---|:---:|:---:|
|[`partial_ordering`](/reference/compare/partial_ordering.md)|半順序|`== != < <= > >=`|
|[`weak_ordering`](/reference/compare/weak_ordering.md)|弱順序|`== != < <= > >=`|
|[`strong_ordering`](/reference/compare/strong_ordering.md)|全順序|`== != < <= > >=`|

表にあるように3つの比較カテゴリ型はそれぞれ数学的な2項関係（順序関係）の一つと対応している。

三方比較演算子による比較の結果となる値は、これら比較カテゴリ型のいずれかの`prvalue`オブジェクトとなる。  
全てのカテゴリにおいてそのようなオブジェクトの`0`リテラル以外との比較は未定義動作を引き起こす。

これらの比較カテゴリ型は新しく追加される[`<compare>`](/reference/compare.md)ヘッダにて定義されるが、`<=>`をコード中で使用したとしても自動でインクルードされないため、`<=>`の使用も含めて比較カテゴリ型を利用する際は`<compare>`を明示的にインクルードする必要がある。

#### 比較カテゴリ間の順序関係

各比較カテゴリ型はその条件の強いものから弱いものへの暗黙変換が定義される。この方向は各カテゴリに対応する数学的な関係の包含関係によって定義されている。  

![]( https://raw.githubusercontent.com/cpprefjp/image/master/lang/cpp20/consistent_comparison_01.png)  
図1 比較カテゴリ間の変換関係（[P0515R3](http://wg21.link/p0515)より引用； 最終的なC++20仕様では`weak_equality`/`strong_equality`は[削除されている](http://wg21.link/p1959)）

クラス型に対するdefaultな三方比較演算子の様に複数の型が参加する三方比較の結果の比較カテゴリは、比較に参加するすべての型の`<=>`による比較の結果となるカテゴリ型から共通して変換できる最も強い型となる。そのような型を共通比較カテゴリ型（common comparison category type）と呼ぶ。

比較に参加するすべての型の`<=>`による比較カテゴリ型をそれぞれ`Ti (0 <= i < N)`として、共通比較カテゴリ型`U`は以下のように決定される。

1. `Ti`の中に1つでも`partial_ordering`がある場合、`U = partial_ordering`
2. そうではなく、`Ti`の中に1つでも`weak_ordering`がある場合、`U = weak_ordering`
3. それ以外の場合、`U = strong_ordering`（`N == 0`の場合など）

この共通比較カテゴリ型を求めるのは場合によっては困難なので、それを求めるために`<compare>`ヘッダにて[`common_comparison_category<Ts...>`](/reference/compare/common_comparison_category.md)というメタ関数が提供される。


### operator==
`<=>`を利用する事で最大6つの比較演算子が導出されると説明したが、実際には同値比較演算子（`== !=`）は`<=>`から導出されず、`==`は定義されている必要があり`!=`は`==`から導出される。  
ただし、`<=>`をdefault宣言した場合は同じアクセス指定で`==`が暗黙的にdefault宣言され利用可能になる。また、明示的にdefaultで宣言することもできる。  
そのようなdefaultの`==`の戻り値型は`bool`であり、`!=`の導出に使用される`==`も戻り値型は`bool`でなければならない。

このため、異種型間比較や特殊な比較を実装するために`<=>`を独自に定義する場合、6×2個の比較演算子全てを導出するためには`==`も独自に定義しなければならない。

```cpp
//<=>を独自実装し==を実装していない型、４種類の比較演算子による比較が可能
struct not_eq_comparable {
  char str[5];

  auto operator<=>(const not_eq_comparable& that) const -> std::weak_ordering {
    //大文字小文字を同値として扱って比較
    for (std::size_t i = 0; i < sizeof(this->str); ++i) {
      char l1 = std::tolower(this->str[i]);
      char l2 = std::tolower(that.str[i]);
      if (l1 != l2) {
        return l1 <=> l2;
      }
    }
    return std::weak_ordering::equivalent;
  }
};

{
  not_eq_comparable str1 = {"test"}, str2 = {"TEST"};

  //<=>がdefaultでは無いので==は定義されていない
  bool eq1 = str1 == str2;         //error
  bool eq2 = (str1 <=> str2) == 0; //ok
  bool ne1 = str1 != str2;         //error
  bool ne2 = (str1 <=> str2) != 0; //ok
}

//<=>と==両方実装をした型、6種類全ての比較演算子を使用可能
struct eq_comparable {
  char str[5];

  auto operator<=>(const eq_comparable& that) const -> std::weak_ordering {
    //大文字小文字を同値として扱って比較
    for (std::size_t i = 0; i < sizeof(this->str); ++i) {
      char l1 = std::tolower(this->str[i]);
      char l2 = std::tolower(that.str[i]);
      if (l1 != l2) {
        return l1 <=> l2;
      }
    }
    return std::weak_ordering::equivalent;
  }

  bool operator==(const eq_comparable& that) const {
    //大文字小文字を同値として扱って比較
    for (std::size_t i = 0; i < sizeof(this->str); ++i) {
      if (std::tolower(this->str[i]) != std::tolower(that.str[i])) return false;
    }
    return true;
  }
};

{
  eq_comparable str1 = {"test"}, str2 = {"TEST"};

  //==を定義してあるので同値比較演算子を使用可能
  bool eq1 = str1 == str2;         //ok
  bool eq2 = (str1 <=> str2) == 0; //ok
  bool ne1 = str1 != str2;         //ok
  bool ne2 = (str1 <=> str2) != 0; //ok
}
```

また、`default`な`<=>`を宣言したうえで異種型間比較のために`==`を定義してしまうと、暗黙に宣言されていた`default`の`==`は宣言されなくなってしまうので注意が必要である。

```cpp
enum class category {
  A,
  B,
  C
};

struct enum_wrap {
  category cat{};
  
  auto operator<=>(const enum_wrap&) const = default;
  
  //この宣言が必要
  //bool operator==(const enum_wrap&) const = default;

  auto operator<=>(const category other_cat) const noexcept {
    return cat <=> other_cat;
  }
  
  bool operator==(const category other_cat) const noexcept {
    return cat == other_cat;
  }
};

enum_wrap a = {category::A};
enum_wrap b = {category::B};

auto comp1 a <=> b;           //ok
auto comp2 a <=> category::C; //ok
bool eq1 = a == b;            //ng
bool eq2 = a == category::C;  //ok
```

この場合でも、`default`の`==`を明示的に宣言することで利用可能となる。

このような仕様になっているのは、`<=>`を用いた同値比較において発生しうるオーバーヘッドを回避するためである（詳細は後述の「検討されたほかの選択肢」を参照）。

### 演算子の導出とオーバーロード候補
`<=>`及び`==`から導出される演算子は暗黙的に宣言され実装されているわけではなく、それらの演算子を呼び出した際のオーバーロード候補に、`<=> ==`を利用して生成した候補を入れることによって導出される。このため、導出された比較演算子のアドレスを取ることは出来ない。

詳細な手順は以下のようになる。

任意の演算子`@`を任意の型`T1, T2`のオブジェクト`a, b`に対して`a @ b`のように呼び出したとき

1. オーバーロード候補に、`a @ b`を加える
2. `@`が三方比較演算子ならば、そのオーバーロード候補に`<=>`を使って生成した逆順の式`b <=> a`を加える
3. `@`が関係演算子（`< <= > >=`）ならば、そのオーバーロード候補に`<=>`を使って生成した2種類の式`a <=> b, b <=> a`を加える
4. `@`が`!=`ならば、そのオーバーロード候補に`==`を使って生成した2種類の式`a == b, b == a`を加える
5. `@`が`==`ならば、そのオーバーロード候補に`==`を使って生成した逆順の式`b == a`を加える
6. オーバーロード解決では使用可能なメンバ・非メンバ・組み込みの`@ <=> ==`が考慮され、`@`→正順の式→逆順の式 の順で優先される。また、選択された演算子に対して式の生成は行われない。
7. それらの候補からのオーバーロード解決の結果生成された候補が選択された場合、その候補に応じて以下のように最終的な式を生成する
    - `@`が三方比較演算子ならば、`0 <=> (b <=> a)`
    - `@`が関係演算子（`< <= > >=`）ならば、`(a <=> b) @ 0`もしくは`0 @ (b <=> a)`
    - `@`が`!=`ならば、`!(a == b)`もしくは`!(b == a)`
8. 元の呼び出し`a @ b`を生成された式で書き換える（生成された式を元の呼び出し`a @ b`として実行する）

結果、各演算子を呼び出したときに考慮されるオーバーロード候補は以下のようになる。  

| 呼び出す演算子 `a @ b` | オーバーロード候補                                                           |
| :-------------: | :-----------------------------------------------------------------: |
| `a <=> b`       | `a <=> b` <br/> `0 <=> (b <=> a)`                                    |
| `a == b`        | `a == b`<br/>`(b == a)`                               |
| `a != b`        | `a != b`<br/>`!(a == b)`<br/> `!(b == a)` |
| `a < b`         | `a < b`<br/>`(a <=> b) < 0`<br/>`0 < (b <=> a)`                       |
| `a <= b`        | `a <= b`<br/>`(a <=> b) <= 0`<br/>`0 <= (b <=> a)`                    |
| `a > b`         | `a > b`<br/>`(a <=> b) > 0`<br/>`0 > (b <=> a)`                       |
| `a >= b`        | `a >= b`<br/>`(a <=> b) >= 0`<br/>`0 >= (b <=> a)`                    |

この様に、異種型間比較においても片方の`<=> ==`を定義しておけばその引数順を逆にした演算子も生成され、演算子の対称性が自動で補完される。

ただし、この時使用される`==`は戻り値型が`bool`（CV修飾は可）でなければならず、`<=>`は結果として`@ 0`もしくは`0 @`を適用可能な型を返さなければならない。そうでない場合はコンパイルエラーとなる（上記手順7以降に発生するエラーはコンパイルエラーとなる）。  
`== <=>`が使用可能ではない（定義されてない、曖昧、アクセスできない、削除されている）場合は、オーバーロード解決の過程で候補から外されコンパイルエラーとはならない（上記手順6以前のエラーはコンパイルエラーとならない）。

### default比較
ここまでにも説明せずに登場していたが、あるクラス型に対する`<=>`および`==`演算子は`default`指定することができる。  
そうした場合、コンパイラによってそのクラスの基底及び全メンバの宣言順の辞書式比較を行う実装が暗黙に定義される。

あるクラス`C`に対する`<=> ==`の`default`指定できる宣言は、`C`の関数テンプレートでないメンバとして宣言されていて、かつ`const C&`型の1つの引数をもつ非静的`const`メンバ関数（`volatile`および参照修飾は許可されない）であるか、`const C&`型か`C`型の2つの引数を持つ`C`の`friend`関数、である必要がある。  
つまり以下の様な宣言が有効である。

```cpp
struct C {
  //有効な<=>のdefault宣言例
  auto operator<=>(const C&) const = default;
  friend auto operator<=>(const C&, const C&) = default;
  friend auto operator<=>(C, C) = default;

  //有効な==のdefault宣言例
  bool operator==(const C&) const = default;
  friend bool operator==(const C&, const C&) = default;
  friend bool operator==(C, C) = default;

  //クラス外で定義することもできる
  auto operator<=>(const C&) const;
  bool operator== (const C&) const;
  friend auto operator<=>(const C&, const C&);
  friend bool operator== (const C&, const C&);
};

//クラス外定義は別の翻訳単位にあってもok
auto C::operator<=>(const C&) const = default;
bool C::operator== (const C&) const = default;
inline auto operator<=>(const C&, const C&) = default;
inline bool operator== (const C&, const C&) = default;
```

このような`default`宣言はその定義が`constexpr`関数の要件を満たしていれば暗黙的に`constexpr`指定され、呼び出す演算子が全て`noexcept`であるならば暗黙的に`noexcept`である。これらの指定（および`virtual, consteval`）は明示的に指定しておくこともできるが、明示的に`constexpr(consteval)`指定する場合は本体が`constexpr`関数の要件を満たしていなければコンパイルエラーとなる。また、あるクラスに対する最初の`default`宣言がクラス内部で行われている場合は暗黙的に`inline`指定される。

`default`指定された三方比較演算子の戻り値型は基底クラス及び全メンバの`<=>`の結果型の共通比較カテゴリ型となるが、その中に比較カテゴリ型を返さない`<=>`による比較がある場合は暗黙的に`delete`される。

`delete`されていない全ての`default`比較演算子は、通常の特殊メンバ関数と同様にODR使用された時あるいは定数式で評価された時に、最初の`default`宣言の位置で暗黙的に定義される（詳細は[「評価されない文脈での定数式評価によって特殊メンバ関数がインスタンス化されることを規定」](less_eager_instantiation_of_constexpr_functions.md)を参照）。

#### operator==の暗黙宣言

上記のように`<=>`が`default`宣言されていて`operator==`メンバ/`friend`関数が一つも宣言されていない場合、その`<=>`に対応する`==`の`default`宣言が暗黙的に行われる。

そのような暗黙宣言は対応する`<=>`の直後で、その`<=>`宣言の戻り値型を`bool`、名前を`operator==`に置き換えたように宣言される。すなわち、対応する`<=>`に指定されているあらゆるプロパティを全て継承する。ただし、結果的な例外指定だけは異なる可能性がある。

`<=>`の`default`宣言に伴う暗黙の`==`宣言の例。

```cpp
template<typename T>
struct X {
  friend constexpr std::partial_ordering operator<=>(X, X) requires (sizeof(T) != 1) = default;
  //対応する==の暗黙宣言は次のようになる
  //friend constexpr bool operator==(X, X) requires (sizeof(T) != 1) = default;

  [[nodiscard]] virtual std::strong_ordering operator<=>(const X&) const = default;
  //対応する==の暗黙宣言は次のようになる
  //[[nodiscard]] virtual bool operator==(const X&) const = default;
};
```

このような`==`の暗黙宣言は、対応する`<=>`が暗黙的に`delete`されている場合でも宣言される。

#### default実装
default宣言された`<=> ==`演算子はその基底クラスと非静的メンバを宣言順に比較していくことで実装される。

その手順は以下のようになる（演算子`@`は`<=> ==`のどちらか）。

1. 基底クラスの`@`を呼び出して比較を行う。その順番は継承順（`:`の後ろに書いてある型を左から右）、深さ優先で比較される。
2. 宣言された順番（上から下）で非静的メンバを`@`によって比較する。
    - この時、配列は要素ごとに比較する。
3. これらの比較の際、結果が`0`（`==`なら`true`）とならない時点でその結果を返して終了する。
4. 基底クラスもメンバも無い場合、`strong_ordering::equal`（`==`なら`true`）を返して終了する。

この手順を明示的に書くと以下の様な実装になる。

```cpp
class D : Base1, Base2 {
  int x;
  int y;
  char str[3];
  double v;

public:
  //auto operator<=>(const D&) const = default;
  auto operator<=>(const D& that) const {
    if (auto comp = static_cast<const Base1&>(*this) <=> static_cast<const Base1&>(that); comp !=0) return comp;
    if (auto comp = static_cast<const Base2&>(*this) <=> static_cast<const Base2&>(that); comp !=0) return comp;
    if (auto comp = x <=> that.x; comp !=0) return comp;
    if (auto comp = y <=> that.y; comp !=0) return comp;
    if (auto comp = str[0] <=> that.str[0]; comp !=0) return comp;
    if (auto comp = str[1] <=> that.str[1]; comp !=0) return comp;
    if (auto comp = str[2] <=> that.str[2]; comp !=0) return comp;
    return v <=> that.v;
   }

  //auto operator==(const D&) const = default;
  auto operator==(const D& that) const {
    if (bool comp = static_cast<const Base1&>(*this) == static_cast<const Base1&>(that); comp != true) return false;
    if (bool comp = static_cast<const Base2&>(*this) == static_cast<const Base2&>(that); comp != true) return false;
    if (bool comp = x == that.x; comp != true) return false;
    if (bool comp = y == that.y; comp != true) return false;
    if (bool comp = str[0] == that.str[0]; comp != true) return false;
    if (bool comp = str[1] == that.str[1]; comp != true) return false;
    if (bool comp = str[2] == that.str[2]; comp != true) return false;
    return v == that.v;
  }
};
```

ただし、次のいずれかに該当する場合には`<=> ==`の`default`宣言は暗黙的に`delete`される

- `<=>`は`delete`される
    - 使用可能な`<=>`演算子が見つからないペアがある
    - `<=>`による比較が比較カテゴリ型を返さないペアがある
- `==`は`delete`される
    - 使用可能な`==`演算子が見つからないペアがある
    - `==`による比較が`bool`に変換可能な型を返さないペアがある
- 両方とも`delete`される
    - 参照型メンバを持つ
    - 1つ以上のメンバ変数を持つ匿名共用体をメンバに含む
    - その型が1つ以上のメンバ変数を持つ共用体である

#### default実装における<=>の合成

`<=>`のdefault比較実装はメンバおよび基底クラスに`<=>`を持たない型があると暗黙deleteされる。しかし、これでは現在使われている多くの`<=>`を持たない型をメンバに持つ際にdefaultの`<=>`を提供できない。  
しかしその場合にも、`<=>`のdefault宣言に戻り値型を指定した上で`<=>`を持たないメンバ（基底）型が`< ==`の2つの演算子を実装していれば、それらを元にして`<=>`を合成した上でdefault実装を行うことができる。

```cpp
//C++17以前に作成された<=>を持たない型
struct legacy {
  int n = 10;

  //共に実装は省略
  bool operator==(const legacy&) const;
  bool operator< (const legacy&) const;
};

//C++20環境で作成された型、<=>を実装したい
struct newer {
  int m = 10;
  legacy l = {20}; //<=>を持っていない
  int n = 30;

  //こう宣言すると暗黙delete
  //auto operator<=>(const newer&) const = default;

  //legacyの比較に関しては指定した戻り値型とlegacyの持つ比較演算子< ==を用いて実装、使用可能
  std::strong_ordering operator<=>(const newer&) const = default;
};

newer n1{}, n2 = {20, {30}, 40};
auto comp = n1 <=> n2;  //ok
bool eq   = n1 ==  n2;  //ok
```

`<=>`の`default`宣言に指定された戻り値型を`R`、比較しようとしている対応するメンバの値を`a, b`として、それらの満たす条件によって以下のように`<=>`は合成される。

|条件|合成された`<=>`の式|
|:-------------|:-------------|
|`a <=> b`が使用可能|`static_cast<R>(a <=> b);`|
|`R`は`std::strong_ordering`であり、`a == b, a < b`がいずれも使用可能|`a == b ? std::strong_ordering::equal :`<br/>`a < b  ? std::strong_ordering::less :`<br/>`std::strong_ordering::greater;`|
|`R`は`std::weak_ordering`であり、`a == b, a < b`がいずれも使用可能|`a == b ? std::weak_ordering::equivalent :`<br/>`a < b  ? std::weak_ordering::less :`<br/>`std::weak_ordering::greater;`|
|`R`は`std::partial_ordering`であり、`a == b, a < b`がいずれも使用可能|`a == b ? std::partial_ordering::equivalent :`<br/>`a < b  ? std::partial_ordering::less :`<br/>`b < a  ? std::partial_ordering::greater;`<br/>`std::partial_ordering::unordered`|
|どれにも当てはまらない|定義されない|

この合成された式を用いて`<=>`の`default`実装を行う時、合成された式が定義されない（上記条件に当てはまらない）ペアがある場合はその`<=>`の`default`宣言は暗黙的に`delete`される。

先ほどの`newer`に対して明示的に書くと以下のようになる。
```cpp
struct newer {
  int m = 10;
  legacy l = {20}; //<=>を持っていない
  int n = 30;

  //std::strong_ordering operator<=>(const newer&) const = default;
  std::strong_ordering operator<=>(const newer& that) const {
    if (auto comp = static_cast<std::strong_ordering>(m <=> that.m); comp != 0) return comp;

    //legacy型に対する<=>の合成
    std::strong_ordering comp = (l == that.l) ? std::strong_ordering::equal :
                                (l <  that.l) ? std::strong_ordering::less
                                              : std::strong_ordering::greater;
    if (comp != 0) return comp;

    return static_cast<std::strong_ordering>(n <=> that.n);
  }
};
```

この合成において使用される`< ==`演算子の戻り値型の妥当性はチェックされない。仮に`bool`ではなかったとしても、合成された式においてコンパイルエラーが発生しなければ`<=>`の合成はつつがなく行われる。逆に言うと、合成された式がコンパイルエラーを起こす場合はハードエラーとなる。

#### その他の比較演算子のdefault宣言

`<=> ==`だけでなく、残りの比較演算子もdefault指定で宣言することができる。その有効な宣言は`==`に従う。  
そのようなdefault実装はオーバーロード解決時に生成される式と同様の式を使って`<=> ==`から実装される。

ただし次のいずれかの場合、演算子`@`（`< <= > >= !=`のいずれか）の`default`宣言は暗黙的に`delete`される（オーバーロード候補生成時はコンパイルエラーとなる場合でも単に`delete`される）。

- `x @ y`のオーバーロード解決の結果、使用可能な候補が見つからない
    - `@`の生成に使用する`<=> ==`演算子が使用可能ではない
    - `@`の生成に使用する`<=>`の戻り値型が比較カテゴリ型ではない
    - `@`（`!=`）の生成に使用する`==`の戻り値型が`bool`ではない
- `x @ y`のオーバーロード解決の結果、生成された式ではない演算子が見つかった
    - `operator@`がすでに定義されている

```cpp
struct C {
  // 戻り値型のおかしい<=>
  bool operator<=>(const C&) const { return true; }
  // 正常な==
  bool operator==(const C&) const = default;

  bool operator<(const C&) const = default;  //ok、暗黙的にdeleteされる

  bool operator!=(const C&) const = default;  //ok、使用可能（ただし、==が明示的に宣言されている必要がある）
};
```

これは、比較演算子のアドレスを取りたいときに使用する。

### 組み込み型の三方比較

三方比較演算子は`void`、`std::nullptr_t`、関数/メンバポインタ、および参照型を除く組み込みの型に対して、組み込みの物が提供される。  
その比較カテゴリ型は以下のようになる（以下、比較とは`<=>`によるものを指す）。

|型|カテゴリ|備考|
|:-------------|:-------------:|:-------------|
|`bool`|`std::strong_ordering`|`bool`同士でしか比較不可|
|[`整数型`](/reference/type_traits/is_integral.md)|`std::strong_ordering`|縮小変換が行われる場合は比較不可|
|[`浮動小数点型`](/reference/type_traits/is_floating_point.md)|`std::partial_ordering`|縮小変換が行われる場合は比較不可<br/>`NaN`や`±0.0`の存在のため半順序|
|オブジェクトポインタ|`std::strong_ordering`|あらゆるポインタ変換が施された後、同じポインタ型にならなければ比較不可<br/>配列と配列は比較不可<br/>どちらかの引数が整数型やヌルポインタ定数である場合も比較不可|
|列挙型|`std::strong_ordering`|スコープ有無に関わらず同じ列挙型同士でしか比較不可|

なお、参照型に対する`<=>`による比較は参照先の型による比較になる。

#### 従来の比較演算子との差異及び修正

三方比較演算子`<=>`による比較は、従来の比較演算子(`< > <= >= == !=`)の挙動とは異なるところがある（より安全な比較となっている）。
それに伴って、いくつかの比較演算子の挙動が修正された（C++20では非推奨とされ、禁止されてはいない）。

|比較するペア|`<=>`での比較の可否|C++17までの従来演算子での比較の可否|C++20からの非推奨化|
|:-------------|:-------------|:-------------|:-------------|
|符号なし整数型と符号付整数型|×<br/>ただし定数式で符号付きオペランドが正の値に評価されれば可能|〇| ― |
|列挙型と算術型|△<br/>スコープ無し列挙型と整数型のみ可能|〇<br/>例えば、列挙型と浮動小数点型の比較が可能| 列挙型と浮動小数点型の比較のみ非推奨 |
|異なる列挙型間|×|〇| 非推奨 |
|配列同士|×|△<br/>先頭要素へのポインタの比較になる| 非推奨 |
|ヌルポインタ定数とポインタ|×|△<br/>同値比較のみ可能| ― |

表中の記号の意味

- 〇 : 比較可能
- △ : 制限があるが比較可能
- × : 比較不可能
- ― : 変更なし

## C++17までの比較演算子実装の一例
```cpp example
#include <iostream>
#include <tuple>

struct S  {
  int x;
  double d;
  char str[4];

  constexpr bool operator<(const S& rhs) const {
    return std::tie(x, d, str[0], str[1], str[2], str[3])
         < std::tie(rhs.x, rhs.d, rhs.str[0], rhs.str[1], rhs.str[2], rhs.str[3]);
  }

  constexpr bool operator==(const S& rhs) const {
    return std::tie(x, d, str[0], str[1], str[2], str[3])
        == std::tie(rhs.x, rhs.d, rhs.str[0], rhs.str[1], rhs.str[2], rhs.str[3]);
  }

  constexpr bool operator!=(const S& rhs) const {
    return !(*this == rhs);
  }

  constexpr bool operator>(const S& rhs) const {
    return rhs < *this;
  }

  constexpr bool operator<=(const S& rhs) const {
    return !(*this > rhs);
  }

  constexpr bool operator>=(const S& rhs) const {
    return !(*this < rhs);
  }
};

int main()
{
  S s1 = {10, 0.1, "abc"};
  S s2 = {10, 0.1, "ABC"};

  std::cout << std::boolalpha;

  std::cout << (s1 <  s2) << std::endl;
  std::cout << (s1 <= s2) << std::endl;
  std::cout << (s1 >  s2) << std::endl;
  std::cout << (s1 >= s2) << std::endl;
  std::cout << (s1 == s2) << std::endl;
  std::cout << (s1 != s2) << std::endl;
}
```
* std::tie[link /reference/tuple/tie.md]

### 出力
```
false
false
true
true
false
true
```

## C++20での比較演算子実装例
```cpp example
#include <compare>
#include <iostream>

struct S {
  int x;
  double d;
  char str[4];

  auto operator<=>(const S&) const = default;
};

int main()
{
  S s1 = {10, 0.1, "abc"};
  S s2 = {10, 0.1, "ABC"};

  std::cout << std::boolalpha;

  std::cout << (s1 <  s2) << std::endl;
  std::cout << (s1 <= s2) << std::endl;
  std::cout << (s1 >  s2) << std::endl;
  std::cout << (s1 >= s2) << std::endl;
  std::cout << (s1 == s2) << std::endl;
  std::cout << (s1 != s2) << std::endl;
}
```
* <=>[color ff0000]

### 出力
```
false
false
true
true
false
true
```


## この機能が必要になった背景・経緯
C++17以前の例に示したように、従来のC++における比較演算子の実装は煩雑でボイラープレートの様なコードを大量にコピーアンドペーストすることになる。さらに、異種型間比較を加えるとその対称性のために同じ比較について引数型を逆にしたものを用意しなければならないため、そのようなボイラープレートは更に倍になることになる。  
この問題は以前から認識されており、比較演算子が実際には`< ==`の2つから残りのすべてを導出できることを利用して実装を簡易にする、[Boost Operators Library](https://boostjp.github.io/tips/operators.html)や[`std::rel_ops`](/reference/utility/rel_ops.md)等が提供されていた。しかし、これを用いても異種型間比較におけるボイラープレートを完全に取り除くことは出来ない。

また、比較演算子の実装に伴う別の問題として、クラスの全メンバが参加するような構造的な比較を提供する際にも、メンバの列挙方法が無いために全てのメンバを`<`や`==`で繋いで回るコードを書くことを強いられていた。  
比較演算子実装の多くの場合はこのような構造的な比較を提供すれば十分であり、その場合はクラスによってメンバ名等が違えど全メンバの辞書式比較を行うという点に変わりはない。

これらの問題の解決を言語機能によって提供するために、三方比較演算子が導入された。

上で示したように、任意のクラス型に対する比較演算子の実装は`<=>`を1つ定義するだけで完結する。その比較が構造的なものであるならば、`default`指定することで定義を書く必要すらない。  
そして、`default`指定された`<=>`と`==`は基底クラス及び全メンバの宣言順の辞書式比較を行う。  
異種型間比較においても、1つの引数順の`<=>`と`==`の2つを定義することで残りの11個の比較演算子を導出することができる。

## 検討されたほかの選択肢

### `<=> != ==` : 同値比較の分離

当初の三方比較演算子から導出される演算子は同値比較（`== !=`）のものも含めた最大6つであった。しかし、同値比較なら比較についての処理を短絡評価できる場合に、`<=>`を用いて`== !=`を導出すると短絡評価が行われず非効率になるケースがあったため、`<=>`から`==`を切り離し、`!=`は`==`から導出するように変更された。

例えば、[`std::vector`](/reference/vector/vector.md)で`<=>`を実装することを考えてみる。

```cpp
template<typename T>
strong_ordering operator<=>(const std::vector<T>& lhs, const std::vector<T>& rhs) {
  size_t min_size = std::min(lhs.size(), rhs.size());
  for (size_t i = 0; i != min_size; ++i) {
    if (auto const cmp = std::compare_three_way(lhs[i], rhs[i]); cmp != 0) {
      return cmp;
    }
  }
  return lhs.size() <=> rhs.size();
}
```
* std::min[link /reference/algorithm/min.md]
* lhs.size()[link /reference/vector/vector/size.md]
* rhs.size()[link /reference/vector/vector/size.md]
* size_t[link /reference/cstddef/size_t.md]
* std::compare_three_way[link /reference/compare/compare_three_way.md]

これは、保持する要素に対する辞書式比較を行う実装で既存の比較演算子と等価の処理である。  
実際の比較は[`compare_three_way`](/reference/compare/compare_three_way.md)に委譲しているが、これは`T`に`<=>`があればそれを利用し無ければ`<`と`==`を使って比較を行う関数である（C++20より利用可能）。

これは順序付けにおいては問題ないが、同値比較を行おうとすると非効率な点がある。それは、長さ（サイズ）を一番最後に比較していることで、同値比較の場合は一番最初に`vector`の長さをチェックし異なっていれば、その時点で結果が`false`になると分かり処理を終えることができる。  
従って、`vector`における`==`の効率的な実装は以下のようになる。

```cpp
template<typename T>
bool operator==(const std::vector<T>& lhs, const std::vector<T>& rhs)
{
  //サイズを先にチェックすることで比較をショートサーキット
  const size_t size = lhs.size();
  if (size != rhs.size()) {
    return false;
  }

  for (size_t i = 0; i != size; ++i) {
    //ネストする比較においても<=>ではなく==を使う（ようにしたい）
    if (lhs[i] != rhs[i]) {
      return false;
    }
  }

  return true;
}

template<typename T>
bool operator!=(const std::vector<T>& lhs, const std::vector<T>& rhs)
{
  return !(lhs == rhs);
}
```
* lhs.size()[link /reference/vector/vector/size.md]
* rhs.size()[link /reference/vector/vector/size.md]
* size_t[link /reference/cstddef/size_t.md]

この様にしておけば、`vector`のオブジェクト同士の同値比較においては常に効率的な実装が選択される。

ところで、当初の仕様では`== !=`も三方比較演算子から導出されており、その際に生成する式は以下のように規定されていた。

| 呼び出す演算子 `a @ b` | オーバーロード候補                                              |
| :-------------: | :-----------------------------------------------------------------: |
| `a == b`        | `a == b`<br/>`(a <=> b) == 0`<br/>`0 == (b <=> a)`  |
| `a != b`        | `a != b`<br/>`(a <=> b) != 0`<br/>`0 != (b <=> a)`  |

この前提の下で上記の効率的な`==`実装をした`vector`を保持する別の型を考えてみると困ったことが起こる。

```cpp
struct has_vector {
  std::vector<string> vec;

  auto operator<=>(const has_vector&) const = default;
};

has_vector hv1{}, hv2{};

//以下の二つの比較は当初提案の下では
bool eq = hv1 == hv2;
bool ne = hv1 != hv2;
//このように展開される
bool eq = (hv1 <=> hv2) == 0;
bool ne = (hv1 <=> hv2) != 0;
```

この`has_vector`クラスは以前の仕様の下でも`<=>`を利用して6つの比較演算子による比較が可能である。  
しかし、この`has_vector`クラスのオブジェクトに対して`== !=`による比較を行った時、呼び出されるのは`vector`に定義された`<=>`であって効率的に実装された`==`ではない。  
この`has_vector`の同値比較において、内部`vector`に実装された効率的な`==`を呼び出すには以下のようにしなければならない。

```cpp
struct has_vector {
  std::vector<string> vec;

  auto operator<=>(const has_vector&) const = default;

  bool operator==(const has_vector& that) const {
    return vec == that.vec;
  }

  bool operator!=(const has_vector& that) const {
    return vec != that.vec;
  }
};
```

内部`vector`の`== !=`を呼び出すように`has_vector`に対する`== !=`を独自に定義する。しかも、この`has_vector`をメンバに持つ別のクラスがある時も同様にしなければならない。  
また、この様な新たなボイラープレートのコピーアンドペーストが必要になるかどうかは、クラスのメンバ型の全ての`== !=`演算子の実装を再帰的に辿り判断する必要がある。

このような新たな煩雑さの導入は当初の一貫比較が目指した方向性とは真逆であり、RustやHaskell等の他言語においても同値比較と順序付けの演算子は区別されたうえで自動実装が行われていることから、C++においても同様に`<=>`から`== !=`が切り離されることとなった。

しかし、当初の一貫比較仕様の簡便さを損なわないために、default実装の`<=>`があれば暗黙的に`==`を宣言するという仕様を追加し、効率的な`==`の実装が必要ない型では当初の仕様にほぼ沿った形で恩恵を受けることができる。

### 同値関係を表す比較カテゴリの削除

当初の仕様では、`<=>`の比較が同値関係のみを満たすことを表明する2つの比較カテゴリ型が定義されていた。  
これらの型を返す`<=>`による比較においては、`== !=`演算子のみが（`==`演算子によって）導出されていた。

|比較カテゴリ型|対応する数学的な関係|導出される演算子|
|:---|:---:|:---:|
|`weak_equality`|同値関係|`== !=`|
|`strong_equality`|相等関係：最も細かい同値関係|`== !=`|

しかし、前項の変更によってこれらの型はほとんどその役割を失い、またそのカテゴリ付けにも問題があったため、残しておくのは混乱やバグのものとであるとして削除された。

また、これに伴いこれらの型を返していた組み込みの型の比較も削除された。

|型|カテゴリ|備考|
|:-------------|:-------------:|:-------------|
|関数/メンバポインタ|`std::strong_equality`|あらゆるポインタ変換が施された後、同じポインタ型にならなければ比較不可|
|[`std::nullptr_t`](/reference/cstddef/nullptr_t.md)|`std::strong_equality`||

## <a id="relative-page" href="#relative-page">関連項目</a>

- [`<compare>`](/reference/compare.md)
    - 比較カテゴリ型
        - [`partial_ordering`](/reference/compare/partial_ordering.md)
        - [`weak_ordering`](/reference/compare/weak_ordering.md)
        - [`strong_ordering`](/reference/compare/strong_ordering.md)
    - コンセプト
        - [`three_way_comparable`](/reference/compare/three_way_comparable.md)
        - [`three_way_comparable_with`](/reference/compare/three_way_comparable.md)
    - [`common_comparison_category`](/reference/compare/common_comparison_category.md)
    - 比較関数オブジェクト
        - [`strong_order`](/reference/compare/strong_order.md)
        - [`weak_order`](/reference/compare/weak_order.md)
        - [`partial_order`](/reference/compare/partial_order.md)
        - [`compare_three_way`](/reference/compare/compare_three_way.md)
- [`<algorithm>`](/reference/algorithm.md)
    - [`lexicographical_compare_three_way`](/reference/algorithm/lexicographical_compare_three_way.md)
- [C++26 非推奨となっていた列挙値から算術型への暗黙変換を削除](/lang/cpp26/remove_deprecated_arithmetic_conversion_on_enumerations.md.nolink)


## 参照

- C++20にて承認された提案文書
    1. [P0515R3 Consistent comparison](http://wg21.link/p0515)
        - 一貫比較仕様の追加 
    2. [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
        - 比較カテゴリ型の標準ライブラリへの導入
    3. [P0905R1 Symmetry for spaceship](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0905r1.html)
        - `<=>`そのものの対称性補完
    4. [P1120R0 Consistency improvements for <=> and other comparison operators](http://wg21.link/p1120)
        - `<=>`による比較を基にした従来の比較演算子の修正
    5. [P1185R2 <=> != ==](http://wg21.link/p1185)
        - `== !=`の`<=>`からの切り離し
    6. [P1186R3 When do you actually use <=>?](http://wg21.link/p1186)
        - メンバ変数に`<=>`を持たない型がある時、戻り値型と`< ==`を用いて`<=>`を合成する
    7. [P1630R1 Spaceship needs a tune-up](http://wg21.link/p1630)
        - `==`の戻り値型を`bool`限定にするなど、一貫比較仕様全般の細かいバグ修正
    8. [P1614R2 The Mothership has Landed (Adding <=> to the Library)](http://wg21.link/p1614)
        - 標準ライブラリで提供されるクラスへの一貫比較仕様をベースとした`<=> ==`導入
    9. [P1959R0 Remove `std::weak_equality` and `std::strong_equality`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1959r0.html)
        - 不要になった`_equality`な比較カテゴリ型の削除
    10. [P1946R0 Allow defaulting comparisons by value](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1946r0.html)
        - `<=> ==`の`friend`な`default`宣言の調整
    11. [P2085R0 Consistent defaulted comparisons](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2085r0.html)
        - `<=> ==`の`default`宣言をクラス外でも行えるようにする
    12. [P2002R1 Defaulted comparison specification cleanups](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p2002r1.html)
        - デフォルト比較についての仕様のクリーンアップ、暗黙`delete`されるときを明確にしたり仕様の空白を埋めるなどの調整
- 以前に検討されていた提案文書
    - [N3950 Defaulted comparison operators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3950.html)
    - [N4114 Defaulted comparison operators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4114.htm)
    - [N4126 Explicitly defaulted comparison operators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4126.htm)
    - [N4475 Default comparisons (R2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4475.pdf)
    - [N4476 Thoughts about Comparisons (R2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4476.pdf)
    - [P0221R2: Proposed wording for default comparisons, revision 4](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0221r2.html)
    - [P0100R2 Comparison in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0100r2.html)
    - [P0436R1 An Extensible Approach to Obtaining Selected Operators](http://wg21.link/P0436R1)
    - [P0474R0 Comparison in C++: Basic Facilities](http://wg21.link/P0474R0)
    - [P0481R0 T. Van Eerd. “Bravely Default](http://wg21.link/P0481R0)
    - [P0432R0 D. Stone. “Implicit and Explicit Default Comparison Operators](http://wg21.link/P0432R0)
