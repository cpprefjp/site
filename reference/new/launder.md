# launder
* new[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
    constexpr T* launder(T* p) noexcept; // c++17
  template<class T> 
    [[nodiscard]] constexpr T* launder(T* p) noexcept; // c++20
}
```


## 概要
`placement new`を使用して、参照型や`const`データメンバを含む構造体/クラスを置き換える際、オブジェクト生存期間(lifetime)に基づいた最適化の抑止をコンパイラに伝える関数`std::launder()`を用いることで、未定義動作となるような文脈で参照型や`const`データメンバへのアクセスができる。


## 要件
- ポインタの引数`p`は、メモリ内の1バイトのアドレス A を表す。
- オブジェクト X は、アドレス A にある。
- オブジェクト X は、生存期間(lifetime)内にある。
- オブジェクト X の型が T に類似している。
- 結果を通して到達可能であるであろう記憶域のすべてのバイトは`p`を通して到達可能である。

注：「類似している」については、[[conv.qual]/2](http://eel.is/c++draft/conv.qual#2)を参照。オブジェクトXの型がTと同じであれば問題ないと考えられる。なお、[std::launder - cppreference.com](https://ja.cppreference.com/w/cpp/utility/launder)では、この要件を「X の型が T と同じである (すべてのレベルにおける cv 修飾を無視します) 」としている。

注：「到達可能」について、ストレージの1バイトは、オブジェクトYがYによって占有されているストレージ内にある場合はオブジェクトYを指すポインタ値、Yが配列要素の場合は直接囲む配列オブジェクトを介して到達可能である。


## 戻り値
X を指す`T*`型の値。これは、引数の値と同じであると考えられる。


## 備考
この関数の呼び出しは、その引数の値がコア定数式で使用される場合はいつでもコア定数式で使用されることがある。また、T が関数型または cv void の場合、プログラムは不適格である。 

一般に、オブジェクトの存続期間が終了した後、そのオブジェクトが占有していたストレージが再利用または解放される前に元のオブジェクトが占有していた保管場所に新規オブジェクトが登録された場合（`placement new`を使った際）、元のオブジェクトを指すポインタ、元のオブジェクトを指す参照または元のオブジェクトの名前は自動的に新しいオブジェクトを参照する。新しいオブジェクトの有効期間が開始されると、次の場合に新しいオブジェクトを操作できる。それ以外の場合は未定義である。

- 新しいオブジェクト用の記憶域は、元のオブジェクトが占めていた記憶域を正確にオーバーレイする。
- 新しいオブジェクトは元のオブジェクトと同じ型である（最上位の cv 修飾子は無視される）。
- 元のオブジェクトの型が`const`修飾ではなく、クラス型の場合は、型が`const`修飾または参照型の非静的データメンバを含まない。
- 元のオブジェクトも新しいオブジェクトも、潜在的に重複するサブオブジェクト(potentially-overlapping subobject)ではない。

注：サブオブジェクトとは、メンバーサブオブジェクト、 基本クラスサブオブジェクト、または配列要素である。

注：潜在的に重複するサブオブジェクト(potentially-overlapping subobject)とは、基本クラスのサブオブジェクト、または no_unique_address 属性(C++20)で宣言された非静的データメンバのいずれかである。

注：基本クラスサブオブジェクトについて、以下の例ではクラス`Derived2`のオブジェクトは、クラス`Derived`のサブオブジェクトを持ち、そのサブオブジェクトはクラス`Base`のサブオブジェクトを持つ。

```cpp
struct Base {
  int a, b, c;
};

struct Derived : Base {
  int b;
};

struct Derived2 : Derived {
  int c;
};
```

以下は、新しいオブジェクトを操作できる場合の例である。

```cpp
struct C {
  int i;
  void f();
  const C& operator=( const C& );
};

const C& C::operator=( const C& other) {
  if ( this != &other ) {
    this->~C();                 // *this の生存期間(lifetime)の終了
    new (this) C(other);        // C型の新しいオブジェクトの生成
    f();                        // well-defined
  }
  return *this;
}

C c1;
C c2;
c1 = c2;                        // well-defined
c1.f();                         // well-defined; c1はC型の新しいオブジェクトを参照しています
```

そして、上記の条件が満たされていない場合、`std::launder`を呼び出すことによって、新しいオブジェクトへのポインタをそのストレージのアドレスを表すポインタから取得できる。

つまり、`placement new`使用時は、`std::launder`を使用することによって未定義動作を避けることができる。


## 例
```cpp example
#include <new>

int main() 
{
  struct X { const int n; };
  X *p = new X{3};
  const int a = p->n;
  new (p) X{5};                       // X::nがconstであるため、pは新しいオブジェクトを指さない
  const int b = p->n;                 // 未定義動作
  const int c = std::launder(p)->n;   // OK
}
```
* launder[color ff0000]

### 出力
```
```

メンバーサブオブジェクトについて、次に示した。サブオブジェクトに参照メンバまたは`const`サブオブジェクトが含まれる場合、元のサブオブジェクトの名前を使用して新しいオブジェクトにアクセスするためには、`std::launder`を使用する。

```cpp
struct X { const int n; };
union U { X x; float f; };
void tong() {
  U u = {{ 1 }};
  u.f = 5.f;                            // OK, u の新しいサブオブジェクトを生成
  X *p = new (&u.x) X {2};              // OK, u の新しいサブオブジェクトを生成
  assert(p->n == 2);                    // OK
  assert(*std::launder(&u.x.n) == 2);   // OK
  assert(u.x.n == 2);                   // 未定義動作, u.xは 新しいサブオブジェクトを指定しない
}
```
* launder[color ff0000]


## バージョン
### 言語
- C++17


### 処理系
- [Clang](/implementation.md#clang): 6.0.0
- [GCC](/implementation.md#gcc): 7.1.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [参照メンバをもつクラスの置き換え](/lang/cpp17/replacement_of_class_objects_containing_reference_members.md)


## 参照
- [P0137R1 Core Issue 1776: Replacement of class objects containing reference members](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0137r1.html)
- [std::launder関数 - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20170817/p1)
- [std::launder - cppreference.com](https://ja.cppreference.com/w/cpp/utility/launder)
- [Lifetime - cppreference.com](https://en.cppreference.com/w/cpp/language/lifetime)
