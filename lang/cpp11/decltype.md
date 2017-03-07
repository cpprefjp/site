#decltype
* cpp11[meta cpp]

##概要
`decltype` は、オペランドで指定した式の型を取得する機能である。  
型を指定する必要のある個所で `decltype` を使用することによって、具体的な型名を指定する代わりに式から取得した型を指定できるようになった。

```cpp
int i = 0;
decltype(i) j = 0;                      // j は int 型
decltype(i)* p = &i;                    // p は int* 型
decltype((i)) k = i;                    // k は int& 型（変数名 i の周りの余分な丸括弧に注意）

template<typename T, typename U>
auto add(const T& lhs, const U& rhs)
  -> decltype(lhs + rhs);               // add の戻り値型は lhs + rhs の式の型

struct S {
  using U = decltype(add('a', 'b'));    // S::U は int 型の別名
} s;

decltype(s)::U l{};                     // l は S::U 型（つまり int 型）
```
* decltype[color ff0000]

なお、C++14 では特定の文脈において式のかわりに `auto` キーワードを使用する [`decltype(auto)`](../cpp14/decltype_auto.md) が追加されている。


##仕様

`e` を式とすると、`decltype(e)` が意味する型は以下のとおりである。

- `e` が丸括弧で囲まれていない識別子の場合、あるいは、丸括弧で囲まれていないクラスメンバアクセスの場合、`decltype(e)` は `e` で指定された実体の型である。  
	もしそのような実体が無いか、あるいは、`e` がオーバーロードされた複数の関数を指す場合、プログラムは不適格である。
- そうではなくて、もし `e` が xvalue の場合、`e` の型を `T` とすると、`decltype(e)` は `T&&` である。
- そうではなくて、もし `e` が lvalue の場合、`e` の型を `T` とすると、`decltype(e)` は `T&` である。
- 上記以外の場合、`decltype(e)` は `e` の型である。

`decltype` のオペランドは「評価されないオペランド」である。

ラムダ式の関数本体で、外部の自動変数に対して `decltype` を余分な丸括弧付きで使用した場合、クロージャ型のメンバ変数に対する `decltype` とみなされる。

`sizeof` とは異なり、`decltype` のオペランドには丸括弧が必須である。（`sizeof i` はＯＫだが、`decltype i` はＮＧ）


##例
###関数の戻り型での使用例
```cpp
#include <iostream>

template<typename T, typename U>
auto add(const T& lhs, const U& rhs)
  -> decltype(lhs + rhs)                // add の戻り値型は lhs + rhs の式の型
{
  return lhs + rhs;
}

int main()
{
  auto r = add(1, 2.0F);                // r の型は float 型
  std::cout << std::fixed << r << '\n';
}
```
* fixed[link ../../reference/ios/fixed.md]
* decltype[color ff0000]

####出力
```
3.000000
```

###変数の型としての使用例
```cpp
#include <iostream>

int main()
{
  int i = 10;
  decltype(i) j = i;                    // j は int 型
  decltype((i)) k = i;                  // k は int& 型（i は lvalue で丸括弧が付いているので）

  i = 42;
  std::cout << j << ", " << k << '\n';
}
```
* decltype[color ff0000]

####出力
```
10, 42
```

###ネストした名前の指定子としての使用例
```cpp
#include <iostream>

struct S {
  int i = 42;
};

int main()
{
  S s;
  auto mp = &decltype(s)::i;             // mp の型は int S::* 型（S の int 型のメンバへのポインタ）
  std::cout << s.*mp << '\n';
}
```
* decltype[color ff0000]

####出力
```
42
```

###new 式の型、キャスト、および、明示的デストラクタ呼び出しの一部としての使用例
```cpp
#include <iostream>

struct S {
  S() { std::cout << "S()\n"; }
  ~S() { std::cout << "~S()\n"; }
};

S f();

int main()
{
  std::cout << "allocate\n";
  void* p = ::operator new(sizeof(f()));

  std::cout << "construct\n";
  ::new(p) decltype(f());                       // 配置 new で p の指すメモリに S 型のオブジェクトを構築

  std::cout << "destruct\n";
  auto sp = static_cast<decltype(f())*>(p);     // デストラクタ呼び出しのため、S 型へのポインタにキャスト
  sp->~decltype(f())();                         // 明示的デストラクタ呼び出しで sp の指すメモリの S 型オブジェクトを破棄

  std::cout << "deallocate\n";
  ::operator delete(p);
}
```
* decltype[color ff0000]

####出力
```
allocate
construct
S()
destruct
~S()
deallocate
```

###変換演算子の型としての使用例
```cpp
#include <iostream>

struct S {
  int i;
  S(int i) : i(i) {}
  operator decltype(i)() { return i; }        // int 型への変換演算子
};

int main()
{
  S s(42);
  std::cout << s << '\n';
}
```
* decltype[color ff0000]

####出力
```
42
```

###template 型引数としての使用例（下記の例は C++14 以降でのみコンパイル可能）
```cpp
#include <iostream>
#include <utility>

template<typename T>
auto d(T&& x)
{
  return x + x;
}

struct S {
  static constexpr int g = 20;
};

constexpr int S::g;

int main()
{
  auto l = [](auto&& x) {
    std::cout << "start\n";
    auto ret = d(std::forward<decltype(x)>(x));     // x の型のままで転送
    std::cout << "end\n";
    return ret;
  };
  std::cout << l(S::g) << '\n';
}
```
* utility[link ../../reference/utility.md]
* forward[link ../../reference/utility/forward.md]
* decltype[color ff0000]

####出力
```
start
end
40
```


##この機能が必要になった背景・経緯
以下のような関数テンプレートの戻り値型を考える：

```cpp
template <class Func, class T>
??? trace(Func f, T t) { std::cout << "Calling f"; return f(t); }
```

C++03 まででは、このような関数テンプレートの戻り値型をあらゆるケースで正確に表現することは不可能だった。

C++11 では、本機能と[戻り値の型を後置する関数宣言構文](trailing_return_types.md)を使用することによって、以下のように書くことができるようになった。

```cpp
template <class Func, class T>
auto trace(Func f, T t) -> decltype(f(t)) { std::cout << "Calling f"; return f(t); }
```
* decltype[color ff0000]

なお、C++14 では [`decltype(auto)`](../cpp14/decltype_auto.md) が導入されたため、更に簡潔に以下のように書くことができるようになっている。

```cpp
template <class Func, class T>
decltype(auto) trace(Func f, T t) { std::cout << "Calling f"; return f(t); }
```
* decltype(auto)[color ff0000]

##検討されたほかの選択肢

GCC や Clang には `decltype` が導入される前から、同様の機能を持つ `typeof` が非標準の拡張機能として存在している。  
`decltype` もこれらの拡張機能を参考にしているが、大きく以下の 3 点において `typeof` とは異なる。  

- 参照の扱い。  
	`decltype` はオペランドの型にある参照を保存するが、`typeof` はオペランドの型から参照を外す。  
	ただし、上記の仕様に書かれているように `decltype` もオペランドが単なる識別子やクラスメンバアクセスだった場合には、当該識別子やメンバがたとえ lvalue であっても左辺値参照とはならない。  
	本機能の `decltype` という名称はここから来ている。（declared type：宣言された型）
- 使用可能な箇所。  
	`decltype` は型名が使用可能な箇所であれはほぼどこでも使用可能であるが、`typeof` は変数宣言でしか使用できない。
- オペランドの種類。  
	`decltype` のオペランドは式のみしか許されていないが、`typeof` は式だけでなく型そのものも許されている。


##関連項目
- [C++11 戻り値の型を後置する関数宣言構文](trailing_return_types.md)
- [C++11 `auto`](auto.md)
- [C++11 ラムダ式](lambda_expressions.md)
- [C++14 `decltype(auto)`](../cpp14/decltype_auto.md)


##参照
- [N1478 Decltype and auto](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1478.pdf)
- [N1527 Mechanisms for querying types of expressions: Decltype and auto revisited](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2003/n1527.pdf)
- [N1607 Decltype and auto (revision 3)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1607.pdf)
- [N1705 Decltype and auto (revision 4)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2004/n1705.pdf)
- [N1978 Decltype (revision 5)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n1978.pdf)
- [N2115 Decltype (revision 6): proposed wording](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2006/n2115.pdf)
- [N2343 Decltype (revision 7): proposed wording](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2343.pdf)
- [N2991 Core issue 743: decltype(...) name qualifiers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2991.pdf)
- [N3031 Core issues 743 and 950: Additional decltype(...) uses](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3031.pdf)
- [N3049 Core issues 743 and 950: Additional decltype(...) uses (revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2010/n3049.pdf)
- [N3233 US22/DE9 Revisited: Decltype and Call Expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3233.html)
- [N3276 US22/DE9 Revisited: Decltype and Call Expressions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3276.pdf)
- [CWG Issue 743. Use of decltype in a nested-name-specifier](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#743)
- [CWG Issue 950. Use of decltype as a class-name](http://www.open-std.org/jtc1/sc22/wg21/docs/cwg_defects.html#950)
