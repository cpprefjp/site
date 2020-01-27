# 構造化束縛
* cpp17[meta cpp]

## 概要
「構造化束縛 (structured bindings)」は、組やタプル、配列や構造体を分解して各要素を取り出す機能である。

```cpp
std::pair<int, std::string> f()
{
  return {3, "Hello"};
}

// 関数f()の戻り値である整数と文�列の組を分解する。
// pairのfirstをid変数に代入し、secondをmessage変数に代入する。
// id変数の型はfirstの型(int)となり、message変数の型はsecondの型(string)となる。
auto [id, message] = f();

std::cout << id << std::endl;      // 「3」が出力される
std::cout << message << std::endl; // 「Hello」が出力される
```

この機能は、他の言語では「多重代入 (Multiple assignment, Python言語やRuby言語)」や「分割代入 (Destructuring assignment, JavaScript言語)」といった名称で知られている。

構造化束縛は、多値を返す関数の戻り値を、受け取りやすくするための機能である。構造の各要素を受け取るための変数宣言と構造の分解を同時に行う。

変数宣言は、`auto`を記述したあとに角カッコ内に変数名を列挙する。それぞれの変数に対する、型や修飾�の指定はできない。`auto`の部分を`const auto&`のように、全体に対してCV修飾や参照を付加することはできる。それぞれの変数の型は、各要素を`decltype`したものとなる。


## 仕様
- 「構造化束縛 (structured binding)」は宣言(declaration)に分類される機能である
- 構文は以下のようになる：
    ```
    宣言�構文 :  記憶域クラス(opt) インライン指定(opt) CV修飾(opt) 型(autoのみ指定可能)

    構造化束縛宣言1 : 属性リスト(opt) 宣言�構文 参照修飾(opt) [�別�リスト] = 初期化�;
    構造化束縛宣言2 : 属性リスト(opt) 宣言�構文 参照修飾(opt) [�別�リスト] {初期化�};
    ```

- �別�リストの変数には、左から右に順番に代入される。この順番は、構造体であれば宣言順、配列であれば要素順となる
- 右辺の型が配列である場合、�別�リストの要素数は、配列の要素と同じであること。配列の0番目の要素が�別�リストの0番目の要素に代入され、配列の1番目の要素が�別�の1番目の要素に代入され、それが配列の要素数 - 1の添�まで繰り返される
- 右辺の型が式[`std::tuple_size`](/reference/tuple/tuple_size.md)`<T>::value`が妥当である場合 (タプルとしてi番目の要素を参照できる型)、�別�の要素数はその式の値と同じであること
- 右辺の型がメンバ関数`get()`を持っている場合は式`x.get<i>()`の呼び出しで`i`番目の要素が�別�リストの`i`番目の要素に代入される。そうでなければ、名前空間修飾なしの`get<i>(x)`呼び出しの結果が�別�リストの`i`番目の要素に代入され (`get`関数はADLによって関連名前空間で探索される)、それがタプルの要素数 - 1の添�まで繰り返される
- 右辺の型がクラスで、非静的データメンバを直接持つ、あるいは非静的データメンバを曖昧さのない基底クラスが持つ場合、�別�リストの要素数は、非静的データメンバの数と同じであること。そのクラスは、無名共用体メンバを持ってはならない。そのクラスの非静的データメンバは、宣言順に�別�リストの変数に代入される
    - クラスの非静的データメンバがビットフィールドであった場合、分解された�別�の変数もまたビットフィールドとなる
- 右辺のオブジェクトの要素が参照である場合、宣言�全体が参照修飾されていない場合でも、対応する�別�の各変数は参照となる


## 備考
- 構造化束縛の導入に合わせて、[`std::tuple_size`](/reference/tuple/tuple_size.md)の仕様が見直され、SFINAEで使用できるよう改訂された。これにより、[`std::tuple_size`](/reference/tuple/tuple_size.md)に対して適用できない型が渡されても、直接的にコンパイルエラーにはならなくなった


## 例
### 組・タプルを分解する例
```cpp example
#include <iostream>
#include <utility>
#include <tuple>
#include <string>

std::pair<int, std::string> f()
{
  return {3, "Hello"};
}

std::tuple<int, std::string, double> g()
{
  return {1, "World", 3.14};
}

std::string global_message = "HELLO, WORLD";
std::tuple<int, std::string&, double> h()
{
  return std::forward_as_tuple(1, global_message, 3.14);
}

int main()
{
  // 組を分解する
  {
    // 関数f()の戻り値である整数と文�列の組を分解する。
    // pairのfirstをid変数に代入し、secondをmessage変数に代入する。
    // id変数の型はfirstの型(int)となり、message変数の型はsecondの型(string)となる。
    auto [id, message] = f();

    std::cout << id << std::endl;
    std::cout << message << std::endl;
  }
  std::cout << std::endl;

  // タプルを分解する
  {
    auto [id, message, value] = g();

    std::cout << id << std::endl;
    std::cout << message << std::endl;
    std::cout << value << std::endl;
  }
  std::cout << std::endl;

  // 一部の要素が参照だった場合
  {
    auto [id, message, value] = h();

    // message変数の参照元であるglobal_message変数を書き換える
    message = "hello, world";

    std::cout << global_message << std::endl;
  }
}
```
* std::tuple[link /reference/tuple/tuple.md]
* std::forward_as_tuple[link /reference/tuple/forward_as_tuple.md]

#### 出力
```
3
Hello

1
World
3.14

hello, world
```

### 配列を分解する
```cpp example
#include <iostream>

int main()
{
  {
    int ar[] = {3, 1, 4};

    // 配列を分解する。
    // ar[0]がaに代入され、
    // ar[1]がbに代入され、
    // ar[2]がcに代入される。
    // 分解する要素数は、配列の要素数と同じであること
    auto [a, b, c] = ar;

    std::cout << a << std::endl;
    std::cout << b << std::endl;
    std::cout << c << std::endl;
  }
  std::cout << std::endl;

  // 参照の例
  {
    int ar[] = {3, 1, 4};
    int (&rar)[3] = ar;
    auto [a, b, c] = rar;

    // ar[1]を値2に書き換える
    b = 2;

    std::cout << a << std::endl;
    std::cout << b << std::endl;
    std::cout << c << std::endl;
  }
}
```

#### 出力
```
3
1
4

3
2
4
```

### 非静的データメンバを持つクラスを分解する
```cpp example
#include <iostream>
#include <utility>
#include <tuple>
#include <string>

struct X {
  int id = 3;
  std::string message = "Hello";
  double value = 3.14;

  // 静的データメンバや定数は、構造化束縛宣言では無視される
  static int static_value;
  static const int constant_value = 456;

  X()
  {
    static_value = 123;
  }
};
int X::static_value;

int main()
{
  auto [id, message, value] = X();

  std::cout << id << std::endl;
  std::cout << message << std::endl;
  std::cout << value << std::endl;
}
```

#### 出力
```
3
Hello
3.14
```

### mapを範囲for文で走査する
```cpp example
#include <iostream>
#include <map>
#include <string>

int main()
{
  std::map<std::string, int> m = {
    {"Alice", 3},
    {"Bob", 1},
    {"Carol", 4}
  };

  // mapの各要素を�ーと値に分解する。
  // const auto&ではなくauto&にした場合は、
  // const std::string&型のkey変数と、
  // int&型のvalue変数に分解される。
  for (const auto& [key, value] : m) {
    std::cout << key << " : " << value << std::endl;
  }
}
```

#### 出力
```
Alice : 3
Bob : 1
Carol : 4
```

### map::insert()の戻り値を分解する
```cpp example
#include <iostream>
#include <map>
#include <string>

int main()
{
  std::map<std::string, int> m;

  // 単一要素をとるmap::insert()メンバ関数は、
  // 戻り値としてpair<iterator, bool>を返す。
  // firstは指定した�ーを保持する要素へのイテレータ、
  // secondは挿入に成功したかを表すbool値。
  m.insert({"Alice", 3});
  auto [it, inserted] = m.insert({"Alice", 1}); // �ーがすでに登録されていたら挿入に失敗する

  std::cout << it->second << std::endl;
  std::cout << std::boolalpha << inserted << std::endl;
}
```
* insert[link /reference/map/map/insert.md]

#### 出力
```
3
false
```


## この機能が必要になった背景・経緯
従来の手法では、組を返す関数があった場合、以下のように[`std::pair`](/reference/utility/pair.md)型の変数を用意してから`first`と`second`それぞれに名前を付けるために変数を用意して代入したり、

```cpp
std::pair<int, std::string> p = f();
int id = p.first;
std::string message = p.second;
```

もう少し代入が簡単になるように、[`std::tie()`](/reference/tuple/tie.md)関数を使用したりしていた。

```cpp
int id;
std::string message;
std::tie(id, message) = f();
```
* std::tie[link /reference/tuple/tie.md]

これらの問題は、変数宣言と構造の分解が同時にできないことで、その間にバグが入り込む余地があったということである。また、分解対象の型に対して「デフォルトコンストラクタを持っていること」という余分な要求をしてしまう問題もあった。

構造化束縛が導入されることで、変数宣言と構造の分解が同時になり、バグが混入する可能性が減るだろう。ただし、C++17時点での構造化束縛は、あらゆる状況のための完全な機能を備えてはいない。ひとつは、使用しない変数を指定する方法がない。

```cpp
// 真ん�の変数は使用しない
auto [a, unused, c] = f();
```

C++17時点の構造化束縛では、使用しない変数もコピーあるいはムーブされ、新たな変数が作られてしまう。

また、入れ�になった構造を同時に分解する機能も備えていないため、そのような状況では分解しにくいこともあるだろう。

```cpp
std::tuple<T1, std::pair<T2, T3>, T4> f();
auto { w, {x, y}, z } = f(); // このような、tuple内にあるpairを同時に分解はできない
```
* std::tuple[link /reference/tuple/tuple.md]


## 関連項目
- [C++20 friend指定された関数内から構造化束縛を使用して非公開メンバ変数にアクセスすることを許可](/lang/cpp20/allow_structured_bindings_to_accessible_members.md)
- [C++20 構造化束縛がカスタマイゼーションポイントを見つけるルールを緩和](/lang/cpp20/relaxing_the_structured_bindings_customization_point_finding_rules.md)


## 参照
- [P0144R0 Structured Bindings](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0144r0.pdf)
- [P0144R1 Structured Bindings](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0144r1.pdf)
- [P0217R0 Proposed wording for structured bindings](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0217r0.html)
- [P0217R1 Proposed wording for structured bindings](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0217r1.html)
- [P0217R2 Proposed wording for structured bindings](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0217r2.html)
- [P0217R3 Proposed wording for structured bindings](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0217r3.html)
- [P0615R0 Renaming for structured bindings](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0615r0.html)
- [LWG DR2770 `tuple_size<const T>` specialization breaks decomposition declarations](http://wg21.cmeerw.net/lwg/issue2770)
