# 契約に基づくプログラミング
* future[meta cpp]

## 概要
将来のC++では、いわゆる[契約プログラミング](https://ja.wikipedia.org/wiki/%E5%A5%91%E7%B4%84%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9F%E3%83%B3%E3%82%B0)が検討されている。

この機能は一度はC++20のドラフトに取り込まれたが、実装が進む中で問題が見つかり最終的に取り除かれた。現在ではC++26以降を目標に議論されている。

以下の内容はC++20で予定されていた仕様に基づいており、最新の案とは異なる。

## 例
```cpp example
#include <iostream>
#include <cmath>

double sqrt_checked(double x)
  [[expects: x > 0]]   // 引数に対する事前条件
  [[ensures r: r > 0]] // 戻り値に対する事後条件
{
  return std::sqrt(x);
}

int main()
{
  double x;
  std::cin >> x;

  [[assert: x > 0]]; // アサーション

  double y = sqrt_checked(x);

  std::cout << y << '\n';
}
```

## 仕様

### 契約属性

契約は[属性](/lang/cpp11/attributes.md)として記述する。C++20では、次の3つの契約属性が導入された：

* `[[expect: 述語]]`：関数に入る際に期待する事前条件を定義する。
* `[[ensure: 述語]]`：関数から戻る際に期待する事後条件を定義する。
* `[[assert: 述語]]`：アサーションを定義する。

expectおよびensure属性の述語は、関数の最初の式文と同じセマンティクスで評価される。
より詳細に言えば、仮引数は見えるがローカル変数は見えない。

述語が例外を送出すると、[`std::terminate()`](/reference/exception/terminate.md)関数を呼び出してプログラムを終了させる。

述語が副作用を持つ場合、動作は未定義である。例えば、グローバル変数の変更、`volatile`変数の参照、変数を変更する可能性のある関数の呼び出しなどが該当する。

```cpp
// P0542R5より引用
int x;
volatile int y;

void f(int n) [[expects: n>x]]; // OK
void g(int n) [[expects: n>x++]]; // Undefined behavior
void h(int n) [[expects: n++>0]]; // Undefined behavior
void j() {
  int n=3;
  [[assert: ++n>3]]; // Undefined behavior
  //...
}
void k() [[expects: y>0]]; // Undefined behavior
```
* P0542R5[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0542r5.html]

```cpp
// P0542R5より引用
bool might_increment(int & x);

void f(int n) [[expects: might_increment(n)]]; // Undefined behavior

bool is_valid(int x) {
  std::cerr << "checking x\n";
  return x>0;
}

void g(int n) [[expects: is_valid(n)]]; // Undefined behavior
```
* P0542R5[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0542r5.html]

ただし、関数の中で閉じている局所的な副作用は問題ない。

```cpp
// P0542R5より引用
bool is_valid(int x) {
  int a=1;
  while (a<x) {
    if (x % a == 0) return true;
    a++;
  }
  return false;
}

void f(int n) [[expects: is_valid(x)]]
```
* P0542R5[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0542r5.html]

### 契約レベルとビルドレベル

契約属性には**契約レベル**を指定できる。

```c++
[[契約属性名 契約レベル: 述語]]
```

契約レベルによって契約がチェックされる条件が異なる。

契約レベルには次の3つがある：

* `default`: ビルドレベルが`off`でなければ常にチェックされる。契約レベルを省略した場合は`default`となる。
* `audit`: ビルドレベルが`audit`の場合のみチェックされる。パフォーマンスへの影響が大きい契約を`audit`にして、普段はチェックしないでおくことができる。
* `axiom`: チェックされない。主な用途は書式の定まったコメントとして使うことである。

```cpp
void f(int x)
  [[expects: x>0]]
  [[expects audit: is_prime(x)]];
```

C++20では、プログラムのコンパイルは次の3つのうちどれかの**ビルドレベル**で行われる：

* `off`: 契約はチェックされない。
* `default`: 契約レベルが`default`の契約がチェックされる。ビルドレベルが明示されない場合は`default`となる。
* `audit`: 契約レベルが`default`または`audit`の契約がチェックされる。

ビルドレベルを指定する方法は処理系定義である。ただし、ソースコード上で指定する方法は提供されない。

なお、契約がチェックされることと、評価されることは異なる。

* `constexpr`などの定数表現評価では、チェックされた契約のみが評価される。
* チェックされない契約が評価されるかは未規定である。チェックされない契約が評価され、結果が`false`となった場合の動作は未定義である。

### 違反ハンドラーと違反継続モード

違反ハンドラーは `void(const std::contract_violation&)` という型を持つ関数である(処理系によってはさらに`noexcept`が指定される)。

契約がチェックされ、しかも`false`に評価されたとき、違反ハンドラーが実行される。

プログラムは**違反継続モード**`off`または`on`でコンパイルされる。

* `off` (デフォルト): 違反ハンドラーの実行後、[`std::terminate()`](/reference/exception/terminate.md)関数を呼び出してプログラムを終了させる。
* `on`: 違反ハンドラーの実行後、プログラムはそのまま続行する。

違反ハンドラーおよび違反継続モードを指定する方法は処理系定義である。

### expect属性

```cpp
[[expect: 述語]]
```

この属性は関数宣言の関数型に対して指定する。

述語では、関数の引数を参照できる。

```cpp
void f(int x)
  [[expects: x>0]]
```

expect属性の述語は関数の本体を評価する直前に評価される。関数の本体には、関数tryブロックおよびコンストラクタのメンバ初期化子を含む。

1つの関数に複数のexpect属性がある場合、評価は記述した順になる。

### ensure属性

```cpp
[[ensure: 述語]]
[[ensure 識別子: 述語]]
```

この属性は関数宣言の関数型に対して指定する。

2番目の書式では、指定した識別子で関数の戻り値を参照できる。ただし、C++20の時点では[構造化束縛](/lang/cpp17/structured_bindings.md)はできない。

```cpp
// P0542R5より引用
std::tuple f() 
  [[ensures [x,y]: x>0 && y.size()>0]]; // エラー
std::tuple f() 
  [[ensures r: get<0>(r)>0 && get<1>(r).size()>0]]; // OK
```
* P0542R5[link http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0542r5.html]

ensure属性の述語は関数から戻る直前に評価される。このとき、ローカル変数や一時オブジェクトの寿命はすでに尽きている。

1つの関数に複数のensure属性がある場合、評価は記述した順になる。

### assert属性

```cpp
[[assert: 述語]]
```

この属性は空文`;`に対して指定する。結果として、文のように書くことができる。

```cpp
[[assert: x > 0]];
```

assert属性の述語は適用先の空文と共に評価される。

### 契約と継承 - Assertion Redeclaration rule

あるクラス内で契約されている関数がそのクラスを継承した別のクラスでオーバーライドされる場合、オーバーライドした関数は少なくとも元の関数になされた契約を遵守しなければならない。より詳細には

- 事前条件：継承元と同じかより弱い（緩い）ものである必要がある
- 事後条件：継承元と同じかより強い（厳しい）ものである必要がある

これを満たしていない場合、オーバーライドした関数の利用は危険なものになる。  
この原則はAssertion Redeclaration ruleと呼ばれる。

C++における契約と継承においてもこの原則に従う。  
契約条件をもつ関数をオーバーライドするとき、オーバーライドした関数にはオーバーライドされた関数と同じ契約条件を指定しなければならない。  
（この時、その条件が異なっていたとしても対応する契約条件が同じ値（`true or false`）に評価されるならば、診断されない。）

そのような契約条件の指定がされていない場合、オーバーライドされた関数が持つ契約条件が指定されているとみなされる。

すなわち、C++における契約の継承時はAssertion Redeclaration ruleを確実に満たすために常に同じ契約を派生先に要求する。  
事前条件を緩くしたり、事後条件を厳しくすることは認められない。

```cpp
struct base {
  virtual double f(int n)
    [[expects: n > 0]]
    [[ensures r: r > 0.0]] = 0;

  virtual int g(int n)
    [[expects: n < 0]]
    [[ensures r: r < 0]] = 0;
};

struct derived : base {
  //明示的にbase::f()と同じ契約をする
  double f(int n) override
    [[expects: n > 0]]
    [[ensures r: r > 0.0]]
  {
    return 1;
  }

  //暗黙的にbase::g()と同じ契約がされているとみなされる
  int g(int n) override {
    return -1;
  }
}
```

## この機能が必要になった背景・経緯

従来は実行時のアサーションとしては[`assert`マクロ](/reference/cassert/assert.md)があるのみだった。
契約属性はアサーションを含む契約を記述する、マクロを用いない新たな方法として導入された。

特に、戻り値に対する契約は従来の[`assert`マクロ](/reference/cassert/assert.md)では簡潔に書くことができなかった。

なお、[`assert`マクロ](/reference/cassert/assert.md)は関数形式のマクロなので、`[[assert]]`属性を置換してしまうことはない。

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 属性構文](/lang/cpp11/attributes.md)
- [C++11 コンパイル時アサート](/lang/cpp11/static_assert.md)
- [`assert`マクロ](/reference/cassert/assert.md)

## 参照
- [P0542R5 Support for contract based programming in C++](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0542r5.html)
- [ET: Inheritance Inheritance and contracts - Eiffel.org](https://www.eiffel.org/doc/eiffel/ET-_Inheritance#Inheritance_and_contracts)