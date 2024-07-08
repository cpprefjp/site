# 範囲for文 [N2930]
* cpp11[meta cpp]

<-- start lang caution -->

このページはC++11に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<-- last lang caution -->

## 概要
範囲for文（The range-based for statement）は配列やコンテナを簡潔に扱うためのfor文の別表現である。

範囲for文が便利な例として、コンテナの各要素を処理するループを挙げる。

C++03のfor文では以下のように書ける：

```cpp
std::vector<int> v;

for (std::vector<int>::const_iterator it = v.begin(), e = v.end(); it != e; ++it) {
  std::cout << *it << std::endl;
}
```

ループ内の処理と直接関係のない変数（イテレータやポインタ）が出現し、ループ条件も加わりfor文が長くなりがちである。

C++11の範囲for文を使うと以下のように書ける：

```cpp
std::vector<int> v;

for (const auto& e : v) {
  std::cout << e << std::endl;
}
```

変数宣言には直接コンテナ内の要素の型（上記の例であれば`const int& e`など）を書いても良いし、型推論[`auto`][auto]を使うと、さらに簡潔に書ける。

変数宣言にconst参照`const auto& e`を書くとコンテナ内の要素の変更を禁止し、要素のコピーも行わない。参照`auto& e`を書くと、コンテナ内の要素を変更できる。実体`auto e`を書くと各要素がコピーコンストラクタによってコピーされてからfor文に渡される。

| 変数宣言        | e を変更可能か？ | コンテナ内の要素を変更可能か？ |
|-----------------|------------------|--------------------------------|
| `const auto& e` | No  | No  |
| `auto& e`       | Yes | Yes |
| `auto e`        | Yes | No  |

[auto]: /lang/cpp11/auto.md


## 仕様
範囲for文は配列または、`begin()`および`end()`で表されるイテレータ範囲に含まれる全ての要素に対して、処理を実行する。

範囲for文は以下の構文を持つ：

```cpp
for ( for-range-declaration : for-range-initializer ) statement
```

for-range-declarationには変数宣言を書く。ここで宣言した変数に範囲内の要素が先頭から終端まで順番に代入される。

for-range-initializerにはfor文が処理すべき範囲を表す値を書く。

値の型が配列の場合、配列のサイズが分かるものでなければエラーとなる。値の型が配列以外（クラスなど）の場合、`begin()`と`end()`でイテレータ範囲の先頭と終端が表せるものでなければエラーとなる。

語弊を恐れず言えば、メンバ関数に`begin()`および`end()`を持つクラスであれば、何でも範囲for文の範囲として指定できる。

従って標準コンテナのみならず、ユーザ定義のクラスに対しても範囲for文を適用可能である。

C++03のfor文と異なりセミコロンではなくコロンで区切ることに注意する。

### for文への展開

C++11、C++14において、範囲for文は以下のように通常のfor文へと展開される([C++17以降は展開のされ方が異なる](/lang/cpp17/generalizing_the_range-based_for_loop.md))。

```cpp
// for ( for-range-declaration : for-range-initializer ) statement
{
  auto && __range = for-range-initializer;
  for ( auto __begin = begin-expr, __end = end-expr;
        __begin != __end;
        ++__begin ) {
    for-range-declaration = *__begin;
    statement
  }
}
```
* for-range-initializer[italic]
* for-range-declaration[italic]
* statement[italic]
* begin-expr[italic]
* end-expr[italic]

展開後に現れる変数名は仮のものであり、実際に変数として見えるわけではない。しかし、デバッガーにこれらの変数が現れることがある。

begin-exprとend-exprの具体的な内容は、イテレータ範囲として何を渡すかによって3通りに分かれる。いずれの場合も、begin-exprとend-exprは同じ型でなければならない。

配列を範囲として渡したとき、以下のように展開される：

```cpp
{
  auto && __range = for-range-initializer;

  for (auto __begin = __range, __end = __range + __bound; __begin != __end; ++__begin) {
    for-range-declaration = *__begin;

    statement
  }
}
```
* for-range-initializer[italic]
* for-range-declaration[italic]
* statement[italic]

* ただし、`__bound`は配列の要素数(要素数が不明な場合はill-formed)。

範囲の型がクラスであって、メンバ`begin`と`end`が両方存在するとき、以下のように展開される：

```cpp
{
  auto && __range = for-range-initializer;

  for (auto __begin = __range.begin(), __end = __range.end(); __begin != __end; ++__begin) {
    for-range-declaration = *__begin;

    statement
  }
}
```
* for-range-initializer[italic]
* for-range-declaration[italic]
* statement[italic]

* メンバ`begin`、`end`が関数ではない場合でもこのように展開されるが、呼び出しができなければエラーとなる。
* 当初のC++11では、メンバ`begin`、`end`が片方しかなくてもこのように展開されていた。これは規格の不具合であり、[修正P0962R1がC++11に遡って適用された](/lang/cpp20/relaxing_the_range_for_loop_customization_point_finding_rules.md)。

範囲の型が配列でもメンバ`begin`、`end`のいずれかを持つクラスでもないとき、以下のように展開される：

```cpp
{
  auto && __range = for-range-initializer;

  for (auto __begin = begin(__range), __end = end(__range); __begin != __end; ++__begin) {
    for-range-declaration = *__begin;

    statement
  }
}
```
* for-range-initializer[italic]
* for-range-declaration[italic]
* statement[italic]

* 展開されたコード内の`begin()`と`end()`が正確に何を呼びだすかについては、引数依存の名前探索（argument-dependent name lookup; ADL）を参照のこと。

従って概要で挙げた例は以下のように展開される：

```cpp
for (const auto& e : vec) {
  std::cout << e << std::endl;
}
```

```cpp
{
  auto && __range = vec;

  for (auto __begin = __range.begin(), __end = __range.end(); __begin != __end; ++__begin) {
    const auto& e = *__begin;

    std::cout << e << std::endl;
  }
}
```


## 例
```cpp example
#include <iostream>
#include <vector>

class my_container {
public:
  int *begin() {
    return &buf[0];
  }
  int *end() {
    return &buf[5];
  }

private:
  int buf[5] = {21, 22, 23, 24, 25};
};

int main()
{
  //配列に対して範囲for文を使う
  int array[5] = {1, 2, 3, 4, 5};

  std::cout << "For int[5]: " << std::endl;
  for (auto& e : array) {
    std::cout << "  " << e << std::endl;
  }

  //標準コンテナに対して範囲for文を使う
  std::vector<int> vec = {10, 11, 12, 13};

  std::cout << "For std::vector<int>: " << std::endl;
  for (auto& e : vec) {
    std::cout << "  " << e << std::endl;
  }

  //ユーザ定義のクラスに対して範囲for文を使う
  my_container mc;

  std::cout << "For my_container: " << std::endl;
  for (auto& e : mc) {
    std::cout << "  " << e << std::endl;
  }

  return 0;
}
```

### 出力
```
For int[5]:
  1
  2
  3
  4
  5
For std::vector<int>:
  10
  11
  12
  13
For my_container:
  21
  22
  23
  24
  25
```

## 使用上の注意

範囲for文を使う際はイテレータが無効にならないように気をつけなければならない。  
なぜなら、範囲for文が展開されたときの`for-range-declaration = *__begin;`の部分で無効になったイテレータの間接参照が行われた場合、それは[未定義動作](/implementation-compliance.md#behavior)だからである。

### コンテナの要素追加/削除をしてしまう場合

例えば、範囲for文でまさにイテレートしているコンテナに要素を追加/削除するなどして、イテレータが無効となる場合がある。この場合は範囲for文を使ってはいけない。

```cpp example
#include <vector>
#include <iostream>
int main()
{
  std::vector<int> v{ 5, 5, 0, 5, 1 };
  //v.size() == v.capacity() にする
  v.shrink_to_fit();
  for(auto&& i : v) {
    std::cout << ' ' << i;
    if (5 == i) {
      //要素を追加するとき、capacityを超えるので再アロケーションが発生し、イテレータが無効になる
      v.emplace_back(123);
    }
  }
}
```
* capacity()[link /reference/vector/vector/capacity.md]
* shrink_to_fit()[link /reference/vector/vector/shrink_to_fit.md]
* emplace_back[link /reference/vector/vector/emplace_back.md]

```cpp example
#include <iostream>
#include <string>
#include <unordered_map>
int main()
{
  std::unordered_map<std::string, int> m{
    { "ajjnr", 3 },
    { "kjngs@mgg", 9 },
    { "sdjvnmwb", 12 },
    { "kgf", 64 }
  };

  for(auto&& kv : m) {
    std::cout << kv.first << ',' << kv.second << std::endl;
    if (kv.first.size() < 4) {
      // 現在の要素のkeyを使って削除
      // → 範囲forのイテレート中のイテレータが無効になる
      m.erase(kv.first);
    }
  }
}
```
* size()[link /reference/string/basic_string/size.md]
* erase[link /reference/unordered_map/unordered_map/erase.md]


### for-range-initializerに渡したものの寿命が切れてしまう場合

for-range-initializerに渡したものの寿命が切れてイテレータが無効になるケースもある。

下の例では`something { 1,2,3,4,5,6,7,8,9,0 }`のようにして生成された一時オブジェクトが`__range`によって束縛されていないため、直ちに寿命が尽きてしまう。このような場合、寿命が切れないようにしなければならない。

```cpp example
#include <initializer_list>
#include <iostream>
#include <vector>

struct something
{
  std::vector<int> v;

  something(const std::initializer_list<int>& l ) : v(l) {}
  std::vector<int>& get_vector() { return v; }
  ~something() noexcept { std::cout << "destructor" << std::endl; }
};

int main()
{
  // get_vectorは内部に持つvectorへの参照を返す
  for( auto e : something { 1,2,3,4,5,6,7,8,9,0 }.get_vector() )
  { // 破棄されたオブジェクトへの参照
    std::cout << e;
  }
  std::cout << std::endl;
}
```

ただしこのバグはコンテナの参照を返すメンバ関数(上記では`get_vector`)に[左辺値修飾](./ref_qualifier_for_this.md)することで防げる場合もある

```cpp example
#include <initializer_list>
#include <iostream>
#include <vector>

struct something
{
  std::vector<int> v;

  something(const std::initializer_list<int>& l ) : v(l) {}
  std::vector<int>& get_vector() & { return v; }
  // これを実装すれば実行効率を損なわず、安全にいつでもget_vectorを呼び出せる
  //std::vector<int> get_vector() && { return std::move(v); }
  ~something() noexcept { std::cout << "destructor" << std::endl; }
};

int main()
{
  // get_vectorを呼び出せないので不適格→バグに気がつく
  for( auto e : something { 1,2,3,4,5,6,7,8,9,0 }.get_vector() )
  {
    std::cout << e;
  }
  std::cout << std::endl;
}
```

また、C++23からは`for-range-initializer`の寿命が条件を満たせば延長されるようになったので([C++23 範囲for文が範囲初期化子内で生じた一時オブジェクトを延命することを規定](/lang/cpp23/lifetime_extension_in_range_based_for_loop.md))、この問題を踏みにくくなっている。

## <a id="relative-page" href="#relative-page">関連項目</a>

- [C++17 範囲forの制限緩和 — `begin` と `end` の型が異なることを許可](/lang/cpp17/generalizing_the_range-based_for_loop.md)
- [C++20 範囲for文がカスタマイゼーションポイントを見つけるルールを緩和](/lang/cpp20/relaxing_the_range_for_loop_customization_point_finding_rules.md)
- [C++23 範囲for文が範囲初期化子内で生じた一時オブジェクトを延命することを規定](/lang/cpp23/lifetime_extension_in_range_based_for_loop.md)
- [メンバ関数の左辺値／右辺値修飾](./ref_qualifier_for_this.md)

## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)
- [N3337 Working Draft, Standard for Programming Language C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3337.pdf)
- [一時オブジェクトの寿命と右辺値参照、ムーブセマンティクスのお話 - Qiita](https://qiita.com/rinse_/items/ad0cc7e351e836595c94)
- [c++ - Safe to erase from map inside range based for? - Stack Overflow](https://stackoverflow.com/questions/25246937/safe-to-erase-from-map-inside-range-based-for)