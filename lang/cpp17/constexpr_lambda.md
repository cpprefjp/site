# constexpr ラムダ [P0170R1]

* cpp17[meta cpp]

<!-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要

C++17から、ラムダ式をconstexpr関数として使えるようになった。

また、制限を満たすラムダ式が生成するクロージャオブジェクトがリテラルとして扱われるようになった。

## 仕様

ラムダ式のキャプチャが全てコンパイル時定数のとき、そのラムダ式をconstexprの文脈で使うことができる。

```cpp example
constexpr int add_one(int n){
  // nがコンパイル時定数ならラムダ式をconstexprの文脈で使える
  return [n]{ return n + 1; }();
}

int main(){
  static_assert( add_one(1) == 2 );
}
```

ラムダ式が生成するクロージャオブジェクトは、ラムダ式のキャプチャが全てコンパイル時定数のとき、リテラル型として扱われる。

```cpp example
constexpr auto add_one(int n){
  // nがコンパイル時定数ならラムダ式はリテラル型
  auto f = [n]{ return n + 1; };
  // nがコンパイル時定数ならfはリテラル型なのでgもリテラル型
  auto g = [f]{ return f(); };
  return g;
}

int main(){
  static_assert( add_one(1)() == 2 );
}
```

ラムダ式にconstexpr修飾をつけることができる。

修飾を書く場所はmutableを書いていたところである。

mutableとconstexprはどちらを先に書いてもよい。

constexpr修飾するとラムダ式のoperator()がconstexprとして扱われる。

```cpp example
int main(){
  // ラムダ式にconstexprをつけることができる
  auto f1 = []() constexpr {};
  // OK
  auto f2 = []() mutable constexpr {};
  // これもOK
  auto f3 = []() constexpr mutable {};
}
```

constexpr修飾されていないラムダ式のoperator()はラムダ式がconstexpr関数としての条件を満たす場合

（つまりラムダ式のキャプチャが全てコンパイル時定数のとき）

自動的にconstexpr指定される。

```cpp example
int main(){
  auto twice = [](int n){ return n*2; };
  // twiceのoperator()は自動的にconstexpr指定されているのでOK
  constexpr int x = twice(2);
}
```

ラムダ式の関数ポインタへの変換もコンパイル時に行える。

変換された関数ポインタもコンパイル時に呼び出せる。

```cpp example
int main(){
  auto twice = [](int n){ return n*2; };
  constexpr int (*func_pointer_to_twice)(int) = twice;
  static_assert(func_pointer_to_twice(2) == 4);
}
```

constexpr lambdaはSFINAEの文脈で用いる事はできない。

以下のような記述を許可してしまうとあらゆる文や式が実体化に成功するかをチェックできてしまうため、禁止されている。

```cpp
// エラー、SFINAEの文脈でconstexprラムダが使われている
template < typename T,
    bool b = []{
        T t;
        t.func();
        return true;
    }()>
void f()
{
    T t;
    t.func();
}
```

## 備考

[機能テストマクロ](../../lang/cpp17/feature_test_macros.md)は__cpp_constexprで、値は201603。

（__cpp_constexprマクロの値は、C++11では200704、C++14では201304だった。）

## 例

```cpp example
#include <array>
int main(){
  // static_assertでも使えるようになった
  static_assert([](int a, int b){ return a + b; }(1, 2) == 3);

  // ちょっと複雑なconstexpr変数の初期化にも使える
  constexpr auto arr = []{
    std::array<int,100> a{};
    int i{};
    for(auto& e: a) e = ++i;
    return a;
  }();

  static_assert(arr[99] == 100);
}
```

### 出力

```
0
```

## この機能が必要になった背景・経緯

C++14まではラムダ式をconstexprの文脈で使うことが出来なかった。

つまり、以下のようなコードが動かなかった。

```cpp
constexpr auto f1 = [](int i) { return i; }; // error!
auto f2 = [] { return 0; };
constexpr int value = f2(); // error!
```

しかし、無名クラスを使えば似たようなことはできた。

```cpp
// OK
constexpr struct {
  int operator()(int i) const { return i; }
} f1{};

struct {
  constexpr int operator()() const { return 0; }
} f2{};
constexpr int value = f2(); // OK
```

例えば、以下のような階乗を計算するコードを書いたとする。

C++17のconstexprラムダであれば定数伝播によって、
コンパイラが `factorial(4)` を `24` に置き換えることができる。

```cpp example
int main(){
  auto fact_impl = [=](auto fac, unsigned n) {
    if (n==0) return 1u;
    return n * fac(fac, n - 1);
  };
  auto factorial = [=](unsigned n) {
    return fact_impl(fact_impl, n);
  };
    
  constexpr int value = factorial(4);
  static_assert(value == 24);
}
```

C++14まではラムダ式がコンパイル時に呼び出せないため、
上記の無名クラスや他の冗長な方法でconstexprラムダをエミュレートする開発者が少なからずいた。

ラムダがconstexprでないことによって不要に複雑なコードを書くことは混乱のもとであるとして、C++17にconstexprラムダが提案された。

## 検討されたほかの選択肢

(執筆中)

## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 `constexpr`](/lang/cpp11/constexpr.md)

## 参照

(執筆中)
- [P0170R1 Wording for Constexpr Lambda](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0170r1.pdf)
