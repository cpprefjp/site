# 一貫比較
* cpp20[meta cpp]

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

この様に、あるクラスに対して三方比較演算子`<=>`を定義しておくことで最大6つの関係演算子を導出し使用することができる。  
そして、そのような`<=>`は`default`実装で十分ならば実装を省略できる。

この様な三方比較の事を一貫比較（Consistent comparison）と言い、この演算子は三方比較演算子（Three-way comparison operator）と呼ぶ。また、演算子の見た目から宇宙船演算子と呼ばれることもある。

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

戻り値の値は左辺に対する右辺の関係を表すので、引数順を入れ替えると順序の方向も逆転する。（上記の例の場合、`comp = b <=> a`とすると`comp < 0 == false, 0 < comp == true`となり、`a > b`が出力される）

なお、三方比較演算子の戻り値の`0`リテラル以外との比較は未定義動作とされる。`1`だったり`0.0`であってはならない。

```cpp
int a = 10;
int b = 20;

auto comp = a <=> b;

//全て未定義動作
bool is_less = comp == 1;
bool is_greator = -1 < comp
bool is_equal = comp == 0.0;
```

### 比較カテゴリ型（Comparison category type）
三方比較演算子の戻り値型は`int`などの整数型ではなく、比較カテゴリ型と呼ばれる専用の型である。  
これは、比較対象となる型の満たしている同値や順序の関係についてを専用の型によって表明し、コンセプト等の機構によってその性質に応じた適切な処理へのディスパッチを行うことを出来るようにするためである（例えば、以下で述べる比較カテゴリ型によって導出する演算子を変化させるのに利用されている）。

以下の5つの比較カテゴリ型が提供される。

|比較カテゴリ型|対応する数学的な関係|導出される演算子|
|:---|:---:|:---:|
|[`weak_equality`](/reference/compare/weak_equality.md.nolink)|同値関係|`== !=`|
|[`strong_equality`](/reference/compare/strong_equality.md.nolink)|相等関係：最も細かい同値関係|`== !=`|
|[`partial_ordering`](/reference/compare/partial_ordering.md.nolink)|半順序|`== != < <= > >=`|
|[`weak_ordering`](/reference/compare/weak_ordering.md.nolink)|弱順序|`== != < <= > >=`|
|[`strong_ordering`](/reference/compare/strong_ordering.md.nolink)|全順序|`== != < <= > >=`|

表にあるように5つの比較カテゴリ型はそれぞれ数学的な2項関係の一つと対応している。また、それによって（orderingでないカテゴリでは）、順序の4つの演算子が導出されない。

三方比較演算子による比較の結果となる値は、これら比較カテゴリ型のいずれかの`prvalue`オブジェクトとなる。  
全てのカテゴリにおいてそのようなオブジェクトの`0`リテラル以外との比較は未定義動作となる。

これらの比較カテゴリ型は新しく追加される[`<compare>`](/reference/compare.md.nolink)ヘッダにて定義されるが、`<=>`をコード中で使用したとしても自動でインクルードされないため、`<=>`の使用も含めて比較カテゴリ型を利用する際は`<compare>`を明示的にインクルードする必要がある。

#### 比較カテゴリ間の順序関係

各比較カテゴリ型はその条件の強いものから弱いものへの暗黙変換が定義される。この方向は各カテゴリに対応する数学的な関係の包含関係によって定義されている。  
ordering -> equalityに変換できてもequality -> orderingに変換できないのは、同値関係を満たしていても順序関係を満たさないような関係を考えることができるため。

![]( https://raw.githubusercontent.com/cpprefjp/image/master/lang/cpp20/consistent_comparison_01.png)  
図1 比較カテゴリ間の変換関係（[P0515R3](http://wg21.link/p0515)より引用）


これはつまり、各比較カテゴリ間の順序関係を示している。この順序は半順序となる。

クラス型に対するdefaultな三方比較演算子の戻り値型は比較に参加するすべての型の`<=>`による比較の結果となるカテゴリ型から共通して変換できる最も強い型となる。そのような型を共通比較カテゴリ型（common comparison category type）と呼ぶ。

比較に参加するすべての型の`<=>`による比較カテゴリ型をそれぞれ`Ti (0 <= i < N)`として、共通比較カテゴリ型`U`は以下のように決定される。

1. `Ti`の中に一つでも比較カテゴリ型でない型がある場合、`U = void`
2. `Ti`の中に1つでも`weak_equality`か`strong_equality`があり、それ以外の`Ti`の中に1つでも`partial_ordering`か`weak_ordering`がある場合、`U = weak_equality`
3. `Ti`の中に1つでも`strong_equality`がある場合、`U = strong_equality`
4. `Ti`の中に1つでも`partial_ordering`がある場合、`U = partial_ordering`
5. `Ti`の中に1つでも`weak_ordering`がある場合、`U = weak_ordering`
6. それ以外の場合、`U = strong_ordering`

この共通比較カテゴリ型を求めるのは場合によっては困難なので、それを求めるために`<compare>`ヘッダにて[`common_comparison_category<Ts...>`](/reference/compare/common_comparison_category.md.nolink)というメタ関数が提供される。


### operator==
`<=>`を利用する事で最大6つの関係演算子が導出されると説明したが、実際には同値比較演算子（`== !=`）は`<=>`から導出されず、`==`は定義されている必要があり`!=`は`==`から導出される。  
ただし、`<=>`をdefault宣言した場合は同じアクセス指定で`==`が暗黙的にdefault宣言され利用可能になる。また、明示的にdefaultで宣言することもできる。そのような`==`の戻り値型は`bool`である。

このため、異種型間比較や特殊な比較を実装するために`<=>`を独自に定義する場合、6×2個の関係演算子全てを導出するためには`==`も独自に定義しなければならない。

これは、`<=>`を用いた同値比較において発生しうるオーバーヘッドを回避するためである。

なお、`<=>`がdelete宣言されている場合でも`==`は暗黙的にdefault宣言されている。

```cpp
struct C {
  auto operator<=>(const C&) = delete;
};

int main() {
  C c1{}, c2{};

  //共にok
  bool eq = c1 == c2;
  bool ne = c1 != c2;
}
```

また、`<=>`を宣言せずに`==`だけをdefault指定で宣言することもでき、その場合でも`== !=`の2つの同値比較が可能である。

### 演算子の導出とオーバーロード候補
`<=>`及び`==`から導出される演算子は暗黙的に宣言され実装されているわけではなく、それらの演算子を呼び出した際のオーバーロード候補に、`<=> ==`を利用して生成した候補を入れることによって導出される。  
そのため、そのアドレスを取ることは出来ない。

詳細な手順は以下のようになる。

任意の演算子`@`を任意の型`T1, T2`のオブジェクト`a, b`に対して`a @ b`のように呼び出したとき

1. オーバーロード候補に、`a @ b`を加える
2. `@`が三方比較演算子ならば、そのオーバーロード候補に`<=>`を使って生成した逆順の式`0 @ (b <=> a)`を加える
3. `@`が関係演算子（`< <= > >=`）ならば、そのオーバーロード候補に`<=>`を使って生成した2種類の式`(a <=> b) @ 0, 0 @ (b <=> a)`を加える
4. `@`が同値比較演算子（`== !=`）ならば、そのオーバーロード候補に`==`を使って生成した式（後述）を加える
5. 式の生成は、その式が有効であるような`<=> ==`演算子のメンバー・非メンバー・組み込みのそれぞれの候補毎に行われ、それらの演算子に対して再帰的に式の生成を行わない。
6. それらの候補からのオーバーロード解決の結果、生成された候補が選択された場合、元の呼び出し`a @ b`をその生成された式で書き換える（生成された式を元の呼び出し`a @ b`として実行する）

結果、各演算子を呼び出したときに考慮されるオーバーロード候補は以下のようになる。  

| 呼び出す演算子 `a @ b` | オーバーロード候補                                                           |
| :-------------: | :-----------------------------------------------------------------: |
| `a <=> b`       | `a <=> b` <br/> `0 <=> (b <=> a)`                                    |
| `a == b`        | `a == b`<br/>`(b == a) ? true : false`                               |
| `a != b`        | `a != b`<br/>`(a == b) ? false : true`<br/> `(b == a) ? false : true` |
| `a < b`         | `a < b`<br/>`(a <=> b) < 0`<br/>`0 < (b <=> a)`                       |
| `a <= b`        | `a <= b`<br/>`(a <=> b) <= 0`<br/>`0 <= (b <=> a)`                    |
| `a > b`         | `a > b`<br/>`(a <=> b) > 0`<br/>`0 > (b <=> a)`                       |
| `a >= b`        | `a >= b`<br/>`(a <=> b) >= 0`<br/>`0 >= (b <=> a)`                    |

この様に、異種型間比較においても片方の`<=> ==`を定義しておけば、その引数順を逆にした演算子も生成され、演算子の対称性が自動で補完される。

ただし、表内オーバーロード候補の形式の1つに対して複数の候補が存在しうるため、表に書かれている数よりも候補は多くなる可能性がある。

どの演算子`@`においても、元々`@`が定義されている場合はその定義が優先される。

### default比較
ここまでにも説明せずに登場していたが、あるクラス型に対する`<=>`および`==`演算子は`default`指定することができる。  
そうした場合、コンパイラによってそのクラスの基底及び全メンバの宣言順の辞書式比較を行う実装が暗黙に定義される。

あるクラス`C`に対する`<=> ==`の`default`指定できる宣言は、`C`の関数テンプレートでないメンバとして宣言されていて、かつ`const C&`型の1つの引数をもつ非静的constメンバ関数であるか、`const C&`型の2つの引数を持つ`C`の`friend`関数、である必要がある。  
つまり以下の様な宣言が有効である。

```cpp
struct C {
  //有効な<=>のdefault宣言
  auto operator<=>(const C&) const = default;
  friend auto operator<=>(const C&, const C&) = default;

  //有効な==のdefault宣言
  auto operator==(const C&) const = default;
  friend auto operator==(const C&, const C&) = default;
};
```

`<=>`をdefault宣言した場合、対応する`==`が暗黙的にdefault宣言される。そのアクセス指定は同一であり、`friend`であるかも`<=>`に従う。  
また、これらのdefault宣言はその定義が`constexpr`関数の要件を満たしていれば、暗黙的に`constexpr`指定される。

`default`指定された三方比較演算子の戻り値型は基底クラス及び全メンバの`<=>`の結果型の共通比較カテゴリ型となるが、その型が`void`である場合は暗黙的に`delete`される。  
その際、暗黙宣言される`==`演算子は定義可能（比較に参加するすべての型について`==`の呼び出しが適格）ならば`default`で宣言される。

#### default実装
default宣言された`<=> ==`演算子はその基底クラスと非静的メンバを宣言順に比較していくことで実装される。

その手順は以下のようになる（演算子`@`は`<=> ==`のどちらかとする）。

1. 基底クラスの`@`を呼び出して比較を行う。その順番は継承順（`:`の後ろに書いてある型を左から右）、深さ優先で比較される。
    - この時、仮想基底クラスが複数回比較されるかは未規定。
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
    if (auto comp = static_cast<const Base1&>(*this) == static_cast<const Base1&>(that); comp != true) return false;
    if (auto comp = static_cast<const Base2&>(*this) == static_cast<const Base2&>(that); comp != true) return false;
    if (auto comp = x == that.x; comp != true) return false;
    if (auto comp = y == that.y; comp != true) return false;
    if (auto comp = str[0] == that.str[0]; comp != true) return false;
    if (auto comp = str[1] == that.str[1]; comp != true) return false;
    if (auto comp = str[2] == that.str[2]; comp != true) return false;
    return v == that.v;
  }
};
```

#### その他の比較演算子のdefault宣言
`<=> ==`だけでなく、残りの比較演算子もdefault指定で宣言することができる。  
有効な宣言は`<=> ==`に準ずるが、`friend`で宣言することは出来ない。

そのようなdefault実装は、オーバーロード解決時に生成される式と同様の式を使って実装される（すなわち、`<=> ==`から実装される）。

使用する`<=> ==`演算子が曖昧である、アクセスできない、削除されている場合や、`<=>`の戻り値型が対象の演算子を生成できないか`==`の戻り値型が文脈的に`bool`に変換できない場合は、そのdefault宣言は暗黙的に`delete`される。

```cpp
struct C {
  std::nullptr_t np = nullptr;


  std::strong_equality operator<=>(const C&) const = default;

  bool operator<(const C&) const = default;  //ok、暗黙的にdeleteされる

  bool operator!=(const C&) const = default;  //ok、使用可能
};

```

これは、比較演算子のアドレスを取りたいときに使用する。

### 組み込み型の三方比較

三方比較演算子は`void`と参照型を除く組み込みの型に対して、組み込みの物が提供される。  
その比較カテゴリ型は以下のようになる（以下、比較とは`<=>`によるものを指す）。

|型|カテゴリ|備考|
|:-------------|:-------------:|:-------------|
|`bool`|`std::strong_ordering`|`bool`同士でしか比較不可|
|[`整数型`](/reference/type_traits/is_integral.md)|`std::strong_ordering`|縮小変換が行われる場合は比較不可|
|[`浮動小数点型`](/reference/type_traits/is_floating_point.md)|`std::partial_ordering`|縮小変換が行われる場合は比較不可<br/>`NaN`や`±0.0`の存在のため半順序|
|オブジェクトポインタ|`std::strong_ordering`|あらゆるポインタ変換が施された後、同じポインタ型にならなければ比較不可<br/>配列と配列は比較不可|
|関数/メンバポインタ|`std::strong_equality`|あらゆるポインタ変換が施された後、同じポインタ型にならなければ比較不可|
|[`std::nullptr_t`](/reference/cstddef/nullptr_t.md)|`std::strong_equality`||
|列挙型|`std::strong_ordering`|スコープ有無に関わらず同じ列挙型同士でしか比較不可|

なお、参照型に対する`<=>`による比較は参照先の型による比較になる。

#### 従来の比較演算子との差異及び修正

三方比較演算子による比較は従来の比較演算子の挙動とは異なるところがある（より安全な比較となっている）。  
それに伴って、いくつかの比較演算子の挙動が修正された。

|比較するペア|従来演算子での比較の可否|`<=>`での比較の可否|従来演算子の修正（C++20より、非推奨扱い）|
|:-------------|:-------------|:-------------|:-------------|
|符号なし整数型と符号付整数型|〇|×<br/>ただし定数式で符号付きオペランドが正の値に評価されれば可能|━（従来通り）|
|列挙型と算術型|〇<br/>例えば、列挙型と浮動小数点型の比較が可能|△<br/>スコープ無し列挙型と整数型のみ可能|△<br/>列挙型と浮動小数点型間比較は不可<br/>それ以外は従来通り|
|異なる列挙型間|〇|×|×|
|配列同士|△<br/>標準は未規定だが多くの実装ではポインタに変換して比較する|×|×|
|`nullptr`とポインタ|△<br/>同値比較のみ可能|〇<br/>ただし、ポインタが`nullptr`でない場合の結果は未規定|━|
|関数ポインタ間|〇<br/>異なるポインタ間の順序付けの結果は未規定|〇|━|

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


当初の三方比較演算子から導出される演算子は同値比較（`== !=`）のものも含めた最大6つであった。しかし、同値比較なら比較についての処理を短絡評価できる場合に、`<=>`を用いて`== !=`を導出すると短絡評価が行われず非効率になるケースがあったため、`<=>`から`==`を切り離し、`!=`は`==`から導出するように変更された。

例えば、[`std::vector`](/reference/vector/vector.md)で`<=>`を実装することを考えてみる。

```cpp
template<typename T>
strong_ordering operator<=>(const std::vector<T>& lhs, const std::vector<T>& rhs) {
  size_t min_size = std::min(lhs.size(), rhs.size());
  for (size_t i = 0; i != min_size; ++i) {
    if (auto const cmp = std::compare_3way(lhs[i], rhs[i]); cmp != 0) {
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
* strong_ordering[link /reference/compare/strong_ordering.md.nolink]
* std::compare_3way[link /reference/algorithm/compare_3way.md.nolink]

これは、保持する要素に対する辞書式比較を行う実装で既存の比較演算子と等価の処理である。  
実際の比較は[`compare_3way`](/reference/algorithm/compare_3way.md.nolink)に移譲しているが、これは`T`に`<=>`があればそれを利用し無ければ`<`と`==`を使って比較を行う関数である（C++20より利用可能）。

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


## 関連項目

- [`<compare>`](/reference/compare.md.nolink)
    - 比較カテゴリ型
        - [`weak_equality`](/reference/compare/weak_equality.md.nolink)
        - [`strong_equality`](/reference/compare/strong_equality.md.nolink)
        - [`partial_ordering`](/reference/compare/partial_ordering.md.nolink)
        - [`weak_ordering`](/reference/compare/weak_ordering.md.nolink)
        - [`strong_ordering`](/reference/compare/strong_ordering.md.nolink)
    - [`common_comparison_category`](/reference/compare/common_comparison_category.md.nolink)
    - 比較関数
        - [`strong_order`](/reference/compare/strong_order.md.nolink)
        - [`weak_order`](/reference/compare/weak_order.md.nolink)
        - [`partial_order`](/reference/compare/partial_order.md.nolink)
        - [`strong_equal`](/reference/compare/strong_equal.md.nolink)
        - [`weak_equal`](/reference/compare/weak_equal.md.nolink)
- [`compare_3way`](/reference/algorithm/compare_3way.md.nolink)
- [`lexicographical_compare_3way`](/reference/algorithm/lexicographical_compare_3way.md.nolink)

## 参照

- C++20にて承認された提案文書
    - [P0515R3 Consistent comparison](http://wg21.link/p0515)
    - [P0768R1 Library support for the spaceship (comparison) operator](http://wg21.link/p0768)
    - [P1120R0 Consistency improvements for <=> and other comparison operators](http://wg21.link/p1120)
    - [P1185R2 <=> != ==](http://wg21.link/p1185)
    - [P1186R3 When do you actually use <=>?](http://wg21.link/p1186)
    - [P1630R1 Spaceship needs a tune-up](http://wg21.link/p1630)
- 以前に検討されていた提案文書
    - [N3950 Defaulted comparison operators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3950.html)
    - [N4114 Defaulted comparison operators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4114.htm)
    - [N4126 Explicitly defaulted comparison operators](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4126.htm)
    - [N4475 Default comparisons (R2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4475.pdf)
    - [N4476 Thoughts about Comparisons (R2)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4476.pdf)
    - [P0221R2: Proposed wording for default comparisons, revision 4](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0221r2.html)
    - [P0100R2 Comparison in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0100r2.html)
