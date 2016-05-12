#右辺値参照・ムーブセマンティクス
* cpp11[meta cpp]

##概要
ムーブセマンティクスはコピーコストの削減を主な目的としており、また所有権の移動を実現する。  
右辺値参照はムーブされたオブジェクト（右辺値）を束縛するための言語機能である。

###右辺値（Rvalues）と左辺値（Lvalues）について

誤解を恐れずに言えば、右辺値とは名前をもたない一時的なオブジェクトである。  
また、左辺値とは明示的に実態のある名前付きオブジェクトである。  

```cpp
struct Foo{} ;
int f() { return 0 ; }

int main()
{
  int i = 0;

  i;      // 名前付きオブジェクトは左辺値
  0;      // リテラル値は右辺値

  Foo x ;

  x;      // 名前付きオブジェクトは左辺値
  Foo();  // コンストラクタの戻り値は右辺値

  f();    // 関数の戻り値は右辺値
}
```



###右辺値参照

右辺値参照は、右辺値を束縛する参照である。  
C++11からは、`&` で宣言される参照型を左辺値参照と呼ぶのに対して、`&&` で宣言される参照型を右辺値参照と呼ぶ。  
C++11 以前では、右辺値参照と左辺値参照を区別せず、右辺値はconst左辺値参照 (`const&`) に束縛するよう扱われていた。  
そのため、右辺値のみに対して特別な処理を記述することができなかった。  

```cpp
std::vector<int> v, vv;
v = vv;                  // 代入式1
v = std::vector<int>(100, 0); // 代入式2
```
* std::vector[link /reference/vector.md]

上記コードは C++11 以前では、代入式1,2とも右辺の型は `vector<int> const&` になる。  
代入処理の中では、右辺の値をコピーし、左辺の値と置き換えられる。  
しかし代入式2の右辺は一時オブジェクトであり、直後に破棄されるため、一時オブジェクトをコピーすることは無駄といえる。  
右辺値と左辺値が型として区別できるのであれば、右辺値の場合はコピーせず単に左辺と置き換えるといった処理が記述できる。  
  
右辺値参照は、右辺値と左辺値を型として区別するために導入された。  
C++11 以降では、代入式2の右辺の型は右辺値参照 `vector<int>&&` になり、左辺値参照とは区別して処理される。  
また、こうした処理のことを「ムーブ」と呼ぶ。  

右辺値参照と左辺値参照の挙動をまとめると以下のようになる

```cpp
int main()
{
  int x = 0;

  // lvalue reference
  int& lvalue_ref_1 = x;              // OK
  // int& lvalue_ref_2 = 0;           // Error 右辺値を左辺値参照で束縛している

  // rvalue reference
  // int&& rvalue_ref_1 = x;          // Error 左辺値を右辺値参照で束縛している
  int&& rvalue_ref_2 = 0;             // OK

  // const lvalue refere
  const int& const_lvalue_ref_1 = x;    // OK
  const int& const_lvalue_ref_2 = 0;    // OK constな左辺値参照は右辺値を束縛できる
}
```


右辺値参照で宣言された変数は右辺値ではなく、左辺値である。  
__右辺値参照であるということと、右辺値であるということは全く違うことである。__


```cpp
int main(){
  // xの型は int&& である
  // xは左辺値＝xは実体をを持ち名前のあるオブジェクト
  int&& x = 1;

  // xは左辺値なので右辺値参照できない！
  //int&& y = x; // Error!
}

```


###ムーブ
ムーブとはあるオブジェクトから他のオブジェクトにリソースを明け渡すということである。  
コピーが遅い場合、より高速に値を別の変数に移すことができる。  
リソースを明け渡した後のオブジェクトにはなにが入っているのか不明であり、値を参照した時の動作は未定義である。  

あるオブジェクトをムーブしたいときには、
[`std::move()`](/reference/utility/move.md)関数を使うことができる。
ムーブされた変数は右辺値となり、それ以降使える保証はなくなる。  
注意すべきことは[`std::move()`](/reference/utility/move.md)しただけでは  
「このオブジェクトはこれ以降使わないので好きに書き換えていい」  
ということを明示したにすぎないということである。  
ムーブは実際に[`std::move()`](/reference/utility/move.md)した変数を右辺値参照や後述するムーブコンストラクタ・ムーブ代入演算子に渡した際に行われる。

```cpp
#include <utility>

int main()
{
  int x = 0;
  // 何も起こらない
  std::move(x);

  // 実際に rvalue_ref に x がムーブされる
  int&& rvalue_ref = std::move(x);
}
```
* std::move[link /reference/utility/move.md]

####所有権の移動
クラスによってはコピーは禁止されているが、ムーブはできるということがある。  
そういったクラスではムーブが所有権の移動を表す。  
同じものが２つ存在してはいけないものが所有権の移動に対応しており、ムーブされた変数の中身は`nullptr`であることが保証される。  
例を挙げると、[`std::unique_ptr`](/reference/memory/unique_ptr.md)がそれに当たる。
[`std::unique_ptr`](/reference/memory/unique_ptr.md)はあるオブジェクトの唯一の所有権を持つことを表すスマートポインタである。
所有権は唯一であるので、コピーが禁止されている。
しかし、別の変数にムーブ代入することはできる。

```cpp
#include <utility>
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(1));

  // 所有権はqに移り
  // pはnullptrになる
  std::unique_ptr<int> q = std::move(p);
}
```
* std::unique_ptr[link /reference/memory/unique_ptr.md]
* std::move[link /reference/utility/move.md]

他には、[`<iostream>`](/reference/iostream.md)も所有権の移動に対応している。




###ムーブセマンティクス

ムーブセマンティクスが必要とされる場面として、コピーに高いコストがかかる場合をあげる。  
コピーコンストラクタ、コピー代入に高いコストがかかる以下のクラスで説明する。

```cpp
#include <memory>
#include <algorithm>

class large_class
{
private:
  char* ptr ;
public:
  large_class() {
    ptr = new char[1000];
    // バッファに対して、時間のかかる書き込みを実行
  }
  // コピーコンストラクタ
  large_class( const large_class& r ) {
      ptr = new char[1000] ;
      std::copy( &ptr[0], &ptr[1000], &r.ptr[0] );
  }
  // デストラクタ
  ~large_class() {
      delete[] ptr;
  }
};

int main()
{
  large_class x{};

  // とても時間がかかる
  large_class y(x);
}
```
* std::copy[link /reference/algorithm/copy.md]

コピーには時間がかかる。  
コピーをポインタの挿げ替えにしてしまえば、定数時間で処理が終わる。  
そうすると元のオブジェクトが参照できなくなる。  
しかし、そうなっても良い場合がある。  
一時変数からオブジェクトを作る場合などである。  

```cpp
  // 一時変数
  large_class tmp{};

  large_class x(tmp);
  // これ以降tmpは使わない
```

もう使わない変数とそうでない変数を区別する必要がある。  
そこで登場するのが右辺値と右辺値参照である。  
右辺値であるということが、変数をムーブしてもよいという意味となる。  
右辺値が渡された場合に、ポインタを挿げ替えるため、
右辺値参照を引数にするコンストラクタ・コピー代入演算子（ムーブ演算）を定義します。  


###ムーブコンストラクタ・ムーブ代入演算子

さきほどの`large_class`にムーブコンストラクタ（右辺値参照を引数とするコンストラクタ）を追加する。  
同様にムーブ代入演算子（右辺値参照を引数とする代入演算子）を追加する。  


```cpp
  // ムーブコンストラクタ
  large_class(large_class&& r)
  {
      // ポインタの挿げ替え
      ptr = r.ptr;
      // 元のオブジェクトはnullptrに
      r.ptr = nullptr;
  }
  // ムーブ代入演算子
  large_class& operator=(large_class&& r)
  {
      // ポインタの挿げ替え
      ptr = r.ptr;
      // 元のオブジェクトはnullptrに
      r.ptr = nullptr;
  }
```

左辺値に対して[`std::move()`](/reference/utility/move.md)を適用すると右辺値となり、ムーブコンストラクタが呼ばれる。  

```cpp
int main(){
  large_class tmp{};
  large_class y{};

  large_class x(std::move(tmp));   // tmpをムーブしてxを作る
  y = std::move(x);   // x をムーブして y に代入する
}
```
* std::move[link /reference/utility/move.md]

標準ライブラリで提供されるクラスのほとんどは、このようなムーブコンストラクタを用意している（[`mutex`](/reference/mutex/mutex.md])、[`atomic`](/reference/atomic/atomic.md)などを除く）。

ムーブコンストラクタ・ムーブ代入演算子は

- クラスがコピー演算を宣言していない
- クラスがムーブ演算を宣言していない
- クラスがデストラクタを宣言していない

の３つを満たす場合のみ自動生成される、特殊メンバ関数である。

また、`default`を指定することができる。

```cpp
class large_class {
  // ムーブ演算のデフォルト指定
  large_class(large_class&&) = default;
  large_class& operator=(large_class&&) = default;
};
```


###ユニヴァーサル参照
テンプレート変数や`auto`に`&&`をつけた場合には、通常の右辺値参照とは異なる動作をする。

```cpp
template <typename T>
void f(T&& x){};
```

とした場合、`f()`に渡された実引数が左辺値の場合には左辺値参照となり、右辺値の場合は右辺値参照となる。  
これは、次で説明する完全転送に関わる。

###完全転送（Perfect Forwarding）

ある関数内で引数を別の関数に渡したいことがある。  
引数を右辺値参照した場合は別の関数に渡すときにも右辺値として渡すことが自然である。  
一度右辺値参照すると、変数は左辺値であるのでもう一度ムーブする必要がある。  
しかし、引数をユニヴァーサル参照で宣言した場合安易にムーブできない。  
引数は右辺値参照の場合と左辺値参照の場合両方があり得るからである。  
左辺値地参照の場合はムーブせず、右辺値参照の場合はムーブして渡す機能が必要となる。  
そのような機能として、[`std::forward()`](/reference/utility/forward.md)関数が用意されている。  


```cpp
template <typename T>
void f(T&& a)
{
  // 実引数が右辺値参照型の場合のみムーブされる
  g( std::forward<T>(a) ) ;
}
```
* std::forward[link /reference/utility/forward.md]


##仕様

###式の分類
右辺値と左辺値は、明快な基準によって2つに分けることが難しい。  
厳密な分類は以下のようになっている。  

`expression`は、  
`glvalue`と`rvalue`に分類できる。  
`glvalue`と`rvalue`は、  
`lvalue`と`xvalue`と`prvalue`に分類できる。


__lvalue__  
lvalueは関数もしくはオブジェクトを指す。  

名前付きの変数が指し示すオブジェクトや。  
ポインタを通してアクセスできるオブジェクトが該当する。  
戻り値の型が左辺値参照型の関数の戻り値などもこれにあたる。  

__xvalue__  
xvalueも、オブジェクトを指す。  

xvalueのオブジェクトはその寿命が近いか、寿命に関心がないことを表現するために使われる。    
xvalueは、一部の式の結果や、rvalueリファレンスへの明示的なキャストなどが該当する。  
  
xvalueの名前の由来は、eXpiring value(期限切れ値)。  
xvalueは寿命が近いか、寿命に関心がなく、値を消してしまって問題がないという意味。  
オブジェクトがxvalueならば、ムーブしても問題はないことを表現するために使われる。  
__glvalue__  
glvalueは、lvalueとxvalueの総称。  

glvalueの名前の由来は、generalized lvalue(一般化されたlvalue)。  

__rvalue__  
rvalueは、prvalueとxvalueの総称。  

xvalueの他には、一時オブジェクトや、リテラル値(`10`, `3.14`, `true`など)や、特定のオブジェクトに関連付けられていない値などが該当する。  

__prvalue__  
prvalue(pure rvalue)は、rvalueのうちxvalueではないものである。  

一時オブジェクトやリテラル値や、オブジェクトに関連付けされていない値など。  
ほかには、関数の戻り値で、型がリファレンスではないものや、  
enumの列挙子などもこれにあたる。  


##この機能が必要になった背景・経緯
ムーブセマンティクスは、C++11以前でもNRVO（特定の文脈でのコンストラクタの省略）や、
C++11で非推奨となった`std::auto_ptr`で実現されていた。  
しかし、NRVOがいつでも機能するわけではなかった。  
また、`std::auto_ptr`にはコピーと同じ文法でムーブしていることなど、問題が多かった。  
そのため、コピーと区別でき、統一的にムーブを表す文法が言語機能として必要とされた。



##関連項目
- [`move`](/reference/utility/move.md)
- [`forward`](/reference/utility/forward.md)
- [`move_if_noexcept`](/reference/utility/move_if_noexcept.md)
- [`move` (範囲版)](/reference/algorithm/move.md)
- [`move_backward`](/reference/algorithm/move_backward.md)
- [`unique_ptr`](/reference/memory/unique_ptr.md)
- [`move_iterator`](/reference/iterator/move_iterator.md)


##参照
- [N1377 A Proposal to Add Move Semantics Support to the C++ Language](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1377.htm)
    - 必要になった経緯について
- [N1385 The Forwarding Problem: Arguments](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2002/n1385.htm)
    - 引数の転送問題
- [N1690 A Proposal to Add an Rvalue Reference to the C++ Language](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1690.html)
- [N1770 A Proposal to Add an Rvalue Reference to the C++ Language](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1770.html)
- [N1771 Impact of the rvalue reference on the Standard Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1771.html)
    - 標準ライブラリへの右辺値参照の対応。MoveConstructible、MoveAssignableといった要件もこの提案文書で追加された
- [N1855 A Proposal to Add an Rvalue Reference to the C++ Language - Revision 1](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2005/n1855.html)
- [N1952 A Proposal to Add an Rvalue Reference to the C++ Language - Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1952.html)
- [N2027 A Brief Introduction to Rvalue References](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2027.html)
    - 右辺値参照の入門
- [N2128 A Proposal to Add an Rvalue Reference to the C++ Language - Revision 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2118.html)
- [N2983 Allowing Move Constructors to Throw](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2983.html)
    - ムーブコンストラクタから例外を送出することを許可した経緯

